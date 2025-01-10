import { conectaApi } from "./conectaApi.js";

// Seleção do elemento para adicionar a lista de produtos
const lista = document.querySelector('[data-lista]');
const formulario = document.querySelector('[data-formulario]');

// Função para construir o card do produto
function constroiCard(url, titulo, valor, id) {
    const item = document.createElement('li');
    item.classList.add('produto');
    item.innerHTML = `
        <div class="item_produto">
            <img src="${url}" alt="${titulo}" class="produto__imagem">
            <h3>${titulo}</h3>
            <p>R$ ${valor}</p>
            <div class="botoes">
                <button class="botao-editar" data-id="${id}">Editar</button>
                <button class="botao-excluir" data-id="${id}">Excluir</button>
            </div>
        </div>
    `;

    const botaoExcluir = item.querySelector(".botao-excluir");
    botaoExcluir.addEventListener("click", async () => {
        try {
            await conectaApi.excluiProduto(id);
            item.remove(); // Remove o item da lista sem recarregar tudo
        } catch (erro) {
            alert("Erro ao excluir produto.");
            console.error("Erro ao excluir produto:", erro);
        }
    });

    const botaoEditar = item.querySelector(".botao-editar");
    botaoEditar.addEventListener("click", () => {
        preencherFormularioParaEdicao(id, titulo, valor, url);
    });

    return item;
}

// Função para carregar os produtos da API
async function carregarListaProdutos() {
    try {
        const listaApi = await conectaApi.listaProdutos();

        // Verificar se a lista está vazia antes de adicionar novos itens
        if (listaApi.length === 0) {
            lista.innerHTML = "<h2 class='mensagem__titulo'>Nenhum produto encontrado</h2>";
        } else {
            // Limpa a lista antes de recarregar
            lista.innerHTML = "";

            // Adiciona os produtos na lista
            listaApi.forEach(elemento => {
                lista.appendChild(
                    constroiCard(elemento.url, elemento.titulo, elemento.valor, elemento.id)
                );
            });
        }
    } catch (erro) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de Produtos</h2>`;
        console.error("Erro ao carregar produtos:", erro);
    }
}

// Função para preencher o formulário de edição
function preencherFormularioParaEdicao(id, titulo, valor, url) {
    // Preenche o formulário com os dados do produto
    formulario.querySelector('[data-titulo]').value = titulo;
    formulario.querySelector('[data-valor]').value = valor.replace(",", "."); // Converte vírgula para ponto
    formulario.querySelector('[data-url]').value = url;

    // Altera o botão de submit para "Salvar Alterações"
    const botaoSubmit = formulario.querySelector('[type="submit"]');
    botaoSubmit.value = "Salvar Alterações";

    // Quando o formulário for enviado, salva as alterações
    formulario.onsubmit = async (event) => {
        event.preventDefault(); // Evita o envio do formulário

        const tituloNovo = formulario.querySelector('[data-titulo]').value;
        const valorNovo = formulario.querySelector('[data-valor]').value.replace(",", ".");
        const urlNovo = formulario.querySelector('[data-url]').value;

        try {
            await conectaApi.editaProduto(id, tituloNovo, valorNovo, urlNovo);

            // Após a edição, retorna o formulário para o estado inicial
            botaoSubmit.value = "Cadastrar Produto";
            formulario.reset();
            carregarListaProdutos(); // Recarrega a lista com os dados atualizados
        } catch (erro) {
            alert("Erro ao editar produto.");
            console.error("Erro ao editar produto:", erro);
        }
    };
}

// Inicializa a lista de produtos
carregarListaProdutos();

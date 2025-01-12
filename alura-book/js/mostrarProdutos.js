import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector('[data-lista]');
const formulario = document.querySelector('[data-formulario]');
let idProdutoEditando = null;

// Função para construir o card do produto
function constroiCard(url, titulo, valor, id) {
    const item = document.createElement('li');
    item.classList.add('produto');
    item.dataset.id = id;
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

    // Evento de exclusão
    item.querySelector(".botao-excluir").addEventListener("click", async () => {
        try {
            await conectaApi.excluiProduto(id);
            item.remove();
        } catch (erro) {
            alert("Erro ao excluir produto.");
            console.error("Erro ao excluir produto:", erro);
        }
    });

    // Evento de edição
    item.querySelector(".botao-editar").addEventListener("click", () => {
        preencherFormularioParaEdicao(id, titulo, valor, url);
    });

    return item;
}

// Função para carregar os produtos da API
async function carregarListaProdutos() {
    try {
        const listaApi = await conectaApi.listaProdutos();
        lista.innerHTML = listaApi.length
            ? "" // Limpa a lista antes de recarregar
            : "<h2 class='mensagem__titulo'>Nenhum produto encontrado</h2>";

        listaApi.forEach(produto => {
            lista.appendChild(constroiCard(produto.url, produto.titulo, produto.valor, produto.id));
        });
    } catch (erro) {
        lista.innerHTML = "<h2 class='mensagem__titulo'>Erro ao carregar produtos</h2>";
        console.error("Erro ao carregar produtos:", erro);
    }
}

// Preenche o formulário para edição
function preencherFormularioParaEdicao(id, titulo, valor, url) {
    formulario.querySelector('[data-titulo]').value = titulo;
    formulario.querySelector('[data-valor]').value = valor.replace(",", ".");
    formulario.querySelector('[data-url]').value = url;

    formulario.querySelector('[type="submit"]').value = "Salvar Alterações";
    idProdutoEditando = id; // Define o ID do produto sendo editado
}

// Evento de submissão do formulário
formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titulo = formulario.querySelector('[data-titulo]').value;
    const valor = formulario.querySelector('[data-valor]').value.replace(",", ".");
    const url = formulario.querySelector('[data-url]').value;

    try {
        if (idProdutoEditando) {
            // Edição de produto
            await conectaApi.editaProduto(idProdutoEditando, titulo, valor, url);

            const produtoAtualizado = constroiCard(url, titulo, valor, idProdutoEditando);
            const itemAntigo = lista.querySelector(`[data-id="${idProdutoEditando}"]`);
            lista.replaceChild(produtoAtualizado, itemAntigo); // Substitui no DOM

            // Reseta o formulário após edição
            formulario.reset();
            formulario.querySelector('[type="submit"]').value = "Cadastrar Produto";
            idProdutoEditando = null;
        } else {
            // Criação de produto
            await conectaApi.criaProduto(titulo, valor, url);
            carregarListaProdutos(); // Recarrega a lista após criar
            formulario.reset();
        }
    } catch (erro) {
        alert("Erro ao salvar produto.");
        console.error("Erro ao salvar produto:", erro);
    }
});

// Inicializa a lista de produtos
carregarListaProdutos();

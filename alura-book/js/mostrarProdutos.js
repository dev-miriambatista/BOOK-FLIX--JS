import { conectaApi } from "./conectaApi.js";

// No arquivo mostrarProdutos.js
export async function carregarProdutos(produtos = null) {
    const lista = document.querySelector('[data-lista]');
    
    if (!produtos) {
        produtos = await conectaApi.listaProdutos();
    }

    lista.innerHTML = produtos.length
        ? "" // Limpa a lista antes de recarregar
        : "<h2 class='mensagem__titulo'>Nenhum produto encontrado</h2>";

    produtos.forEach((produto) => {
        lista.appendChild(constroiCard(produto.url, produto.titulo, produto.valor, produto.id));
    });
}


const lista = document.querySelector('[data-lista]');
const formulario = document.querySelector('[data-formulario]');
let idProdutoEditando = null;

/**
 * Função para criar notificações no DOM (sucesso ou erro)
 * @param {string} mensagem - Mensagem para o usuário.
 * @param {string} tipo - Tipo de notificação ('sucesso' ou 'erro').
 */
function criarNotificacao(mensagem, tipo = "sucesso") {
    const notificacao = document.createElement("div");
    notificacao.className = `notificacao notificacao--${tipo}`;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);

    setTimeout(() => notificacao.remove(), 3000);
}

/**
 * Função para construir o card do produto.
 */
function constroiCard(url, titulo, valor, id) {
    const item = document.createElement('li');
    item.classList.add('produto');
    item.dataset.id = id;
    item.innerHTML = `
        <div class="item_produto">
            <img src="${url}" alt="${titulo}" class="produto__imagem">
            <h3 class="titulo">${titulo}</h3>
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
            if (confirm("Tem certeza que deseja excluir este produto?")) {
                await conectaApi.excluiProduto(id);
                item.remove();
                criarNotificacao("Produto excluído com sucesso!", "sucesso");
            }
        } catch (erro) {
            criarNotificacao("Erro ao excluir produto.", "erro");
            console.error("Erro ao excluir produto:", erro);
        }
    });

    // Evento de edição
    item.querySelector(".botao-editar").addEventListener("click", () => {
        preencherFormularioParaEdicao(id, titulo, valor, url);
    });

    return item;
}

/**
 * Função para carregar os produtos da API no DOM.
 */
export async function carregarListaProdutos(produtos = null) {  // Adicionando o async aqui
    const lista = document.querySelector('[data-lista]');
    
    if (!produtos) {
        produtos = await conectaApi.listaProdutos();
    }

    lista.innerHTML = produtos.length
        ? "" // Limpa a lista antes de recarregar
        : "<h2 class='mensagem__titulo'>Nenhum produto encontrado</h2>";

    produtos.forEach((produto) => {
        lista.appendChild(constroiCard(produto.url, produto.titulo, produto.valor, produto.id));
    });
}

/**
 * Preenche o formulário para edição de produtos.
 */
function preencherFormularioParaEdicao(id, titulo, valor, url) {
    formulario.querySelector('[data-titulo]').value = titulo;
    formulario.querySelector('[data-valor]').value = valor.replace(",", ".");
    formulario.querySelector('[data-url]').value = url;

    formulario.querySelector('[type="submit"]').value = "Salvar Alterações";
    idProdutoEditando = id; // Define o ID do produto sendo editado
}

/**
 * Evento de submissão do formulário.
 */
formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titulo = formulario.querySelector('[data-titulo]').value.trim();
    const valor = formulario.querySelector('[data-valor]').value.trim().replace(",", ".");
    const url = formulario.querySelector('[data-url]').value.trim();

    // Validação básica de entrada
    if (!titulo || !valor || !url) {
        criarNotificacao("Todos os campos são obrigatórios.", "erro");
        return;
    }

    try {
        if (idProdutoEditando) {
            // Edição de produto
            await conectaApi.editaProduto(idProdutoEditando, titulo, valor, url);

            const produtoAtualizado = constroiCard(url, titulo, valor, idProdutoEditando);
            const itemAntigo = lista.querySelector(`[data-id="${idProdutoEditando}"]`);
            lista.replaceChild(produtoAtualizado, itemAntigo); // Substitui no DOM

            criarNotificacao("Produto editado com sucesso!", "sucesso");

            // Reseta o formulário após edição
            formulario.reset();
            formulario.querySelector('[type="submit"]').value = "Cadastrar Produto";
            idProdutoEditando = null;
        } else {
            // Criação de produto
            await conectaApi.criaProduto(titulo, valor, url);
            criarNotificacao("Produto criado com sucesso!", "sucesso");

            carregarListaProdutos(); // Recarrega a lista após criar
            formulario.reset();
        }
    } catch (erro) {
        criarNotificacao("Erro ao salvar produto.", "erro");
        console.error("Erro ao salvar produto:", erro);
    }
});

// Inicializa a lista de produtos ao carregar o script
carregarListaProdutos();

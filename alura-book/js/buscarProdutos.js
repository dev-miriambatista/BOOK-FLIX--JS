import { editarProduto, excluirProduto, carregarProdutos as carregarProdutosDoMostrar } from './mostrarProdutos.js';

document.addEventListener("DOMContentLoaded", () => {
    carregarProdutosDoMostrar();
    configurarBotoes();
});

// Configura o modal para edição dos produtos
function configurarModalEditar(produtoId, tituloAtual, valorAtual, urlAtual) {
    const modal = document.getElementById("modal-edicao");
    const inputTitulo = document.querySelector("[data-modal-titulo]");
    const inputValor = document.querySelector("[data-modal-valor]");
    const inputUrl = document.querySelector("[data-modal-url]");
    const botaoSalvar = modal.querySelector(".botao-salvar");
    const botaoCancelar = modal.querySelector(".botao-cancelar");

    // Preenche os campos do modal com os valores atuais
    inputTitulo.value = tituloAtual;
    inputValor.value = valorAtual;
    inputUrl.value = urlAtual;

    // Exibe o modal
    modal.style.display = "block";

    // Configura o botão "Salvar" para editar o produto
    botaoSalvar.onclick = () => {
        const novoTitulo = inputTitulo.value.trim();
        const novoValor = inputValor.value.trim();
        const novaUrl = inputUrl.value.trim();

        if (novoTitulo && novoValor && novaUrl) {
            editarProduto(produtoId, novoTitulo, novoValor, novaUrl);
            modal.style.display = "none"; // Fecha o modal após salvar
        } else {
            alert("Todos os campos são obrigatórios!");
        }
    };

    // Configura o botão "Cancelar" para fechar o modal sem salvar
    botaoCancelar.onclick = () => {
        modal.style.display = "none";
    };
}

// Configura os botões de editar e excluir
function configurarBotoes() {
    document.addEventListener("click", (event) => {
        const botao = event.target;

        if (botao.classList.contains("editar-btn")) {
            const produtoId = botao.dataset.id;
            const card = botao.closest(".produto__card");
            const tituloAtual = card.querySelector("h3").innerText;
            const valorAtual = card.querySelector("p").innerText.replace("R$ ", "");
            const urlAtual = card.querySelector("iframe").src;

            configurarModalEditar(produtoId, tituloAtual, valorAtual, urlAtual);
        }

        if (botao.classList.contains("excluir-btn")) {
            const produtoId = botao.dataset.id;
            if (confirm("Tem certeza que deseja excluir este produto?")) {
                excluirProduto(produtoId);
            }
        }
    });
}

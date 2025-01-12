import { conectaApi } from "./conectaApi.js";
import { constroiCard, carregarListaProdutos } from "./mostrarProdutos.js";

const formulario = document.querySelector('[data-formulario]');
let idProdutoEditando = null;

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titulo = formulario.querySelector('[data-titulo]').value;
    const valor = formulario.querySelector('[data-valor]').value.replace(",", ".");
    const url = formulario.querySelector('[data-url]').value;

    try {
        if (idProdutoEditando) {
            // Edição de produto
            await conectaApi.editaProduto(idProdutoEditando, titulo, valor, url);

            // Atualiza o produto no DOM
            const produtoEditado = constroiCard(url, titulo, valor, idProdutoEditando);
            const itemAntigo = document.querySelector(`[data-id="${idProdutoEditando}"]`);
            lista.replaceChild(produtoEditado, itemAntigo);

            // Reseta o formulário após edição
            formulario.reset();
            formulario.querySelector('[type="submit"]').value = "Cadastrar Produto";
            idProdutoEditando = null;
        } else {
            // Criação de produto
            await conectaApi.criaProduto(titulo, valor, url);

            // Recarrega a lista
            carregarListaProdutos();
            formulario.reset();
        }
    } catch (erro) {
        alert("Erro ao salvar produto.");
        console.error("Erro ao salvar produto:", erro);
    }
});

// Exemplo: Preencher o formulário para edição
export function preencherFormularioParaEdicao(id, titulo, valor, url) {
    formulario.querySelector('[data-titulo]').value = titulo;
    formulario.querySelector('[data-valor]').value = valor.replace(",", ".");
    formulario.querySelector('[data-url]').value = url;

    formulario.querySelector('[type="submit"]').value = "Salvar Alterações";
    idProdutoEditando = id;
}

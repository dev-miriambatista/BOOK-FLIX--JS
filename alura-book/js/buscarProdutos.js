import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarProdutos.js";

async function buscarProduto(evento) {
    evento.preventDefault();

    const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
    const busca = await conectaApi.buscaProduto(dadosDePesquisa);

    const lista = document.querySelector("[data-lista]");

    // Remove todos os filhos existentes na lista
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    // Adiciona os produtos encontrados
    busca.forEach(elemento =>
        lista.appendChild(constroiCard(elemento.url, elemento.titulo, elemento.valor))
    );

    // Mensagem caso não haja resultados
    if (busca.length === 0) {
        lista.innerHTML = `<h2 class="mensagem_titulo">Não existe produto com este termo</h2>`;
    }
}

// Adiciona evento ao botão de pesquisa
const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");

botaoDePesquisa.addEventListener("click", evento => buscarProduto(evento));

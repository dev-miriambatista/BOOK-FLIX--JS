import { carregarProdutos } from "./mostrarProdutos.js";

// Função para buscar produtos
async function buscarProdutos(termoDeBusca) {
    try {
        const response = await fetch(`http://localhost:3000/produtos?q=${termoDeBusca}`);
        const produtos = await response.json();
        
        // Carrega os produtos filtrados
        carregarProdutos(produtos);  // Passa os produtos filtrados para a função
    } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
    }
}

// Evento de captura do termo de busca
document.querySelector('[data-pesquisa]').addEventListener('input', (event) => {
    const termoDeBusca = event.target.value.trim();
    buscarProdutos(termoDeBusca); // Chama a função de busca
});

// Carrega todos os produtos inicialmente
document.addEventListener("DOMContentLoaded", () => {
    // Você precisa garantir que os dados sejam passados para carregarProdutos
    fetch('http://localhost:3000/produtos')  // Aqui buscamos todos os produtos
        .then(response => response.json())
        .then(produtos => {
            carregarProdutos(produtos);  // Passa todos os produtos para a função
        })
        .catch(erro => console.error("Erro ao carregar todos os produtos:", erro));
});

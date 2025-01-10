import { conectaApi } from './conectaApi.js';

// Função para construir o card do produto
function constroiCard(url, titulo, valor) {
    const item = document.createElement('li');
    item.classList.add('produto');
    item.innerHTML = `
        <div class="item_produto">
            <img src="${url}" alt="${titulo}" class="produto__imagem">
            <h3>${titulo}</h3>
            <p>R$ ${valor}</p>
        </div>
    `;
    return item;
}

// Função para listar os produtos no DOM
async function mostrarProdutos() {
    try {
        const lista = document.querySelector('[data-lista]');
        const produtos = await conectaApi.listaProdutos(); // Busca os produtos da API

        console.log(produtos); // Verifique a resposta da API

        if (!produtos.length) {
            lista.innerHTML = '<h2>Nenhum produto encontrado</h2>';
            return;
        }

        produtos.forEach(produto => {
            const card = constroiCard(produto.url, produto.titulo, produto.valor);
            lista.appendChild(card);
        });
    } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
    }
}

mostrarProdutos(); // Executa a função ao carregar o script

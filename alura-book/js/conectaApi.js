// conectaApi.js
const API_URL = "http://localhost:3000/Produtos";

// Função para listar produtos
async function listaProdutos() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao listar produtos");
    return await response.json();
}

// Função para criar um produto
async function criaProduto(titulo, valor, url) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, valor, url }),
    });
    if (!response.ok) throw new Error("Erro ao criar produto");
    return await response.json();
}

// Função para editar um produto
async function editaProduto(id, titulo, valor, url) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, valor, url }),
    });
    if (!response.ok) throw new Error("Erro ao editar produto");
    return await response.json();
}

// Função para excluir um produto
async function excluiProduto(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erro ao excluir produto");
    return;
}

// Exporta as funções
export const conectaApi = { listaProdutos, criaProduto, editaProduto, excluiProduto };

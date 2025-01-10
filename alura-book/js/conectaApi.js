// Função para listar os produtos
async function listaProdutos() {
    try {
        const resposta = await fetch("http://localhost:3000/Produtos");
        if (!resposta.ok) {
            throw new Error("Erro ao listar produtos");
        }
        return await resposta.json();
    } catch (erro) {
        console.error("Erro na listagem de produtos:", erro.message);
        return [];
    }
}

// Função para criar um novo produto
async function criaProduto(titulo, valor, url) {
    try {
        const resposta = await fetch("http://localhost:3000/Produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url, titulo, valor })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao criar produto");
        }

        return await resposta.json();
    } catch (erro) {
        console.error("Erro na criação de produto:", erro.message);
        throw erro;
    }
}

// Função para excluir um produto
async function excluiProduto(id) {
    try {
        const resposta = await fetch(`http://localhost:3000/Produtos/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir produto");
        }

        console.log(`Produto com ID ${id} excluído com sucesso.`);
    } catch (erro) {
        console.error("Erro ao excluir produto:", erro.message);
        throw erro;
    }
}

// Função para editar um produto
async function editaProduto(id, titulo, valor, url) {
    try {
        const resposta = await fetch(`http://localhost:3000/Produtos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ titulo, valor, url })
        });

        if (!resposta.ok) {
            throw new Error("Erro ao editar produto");
        }

        return await resposta.json();
    } catch (erro) {
        console.error("Erro ao editar produto:", erro.message);
        throw erro;
    }
}

// Exportando as funções como um objeto
export const conectaApi = {
    listaProdutos,
    criaProduto,
    excluiProduto,
    editaProduto
};

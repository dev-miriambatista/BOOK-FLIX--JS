// Objeto para gerenciar as chamadas à API
export const conectaApi = {
    // Função para listar os produtos
    async listaProdutos() {
        const resposta = await fetch("http://localhost:3000/Produtos");
        if (!resposta.ok) {
            throw new Error("Erro ao carregar a lista de produtos.");
        }
        return await resposta.json();
    },

    // Função para criar um novo produto
    async criaProduto(titulo, valor, url) {
        try {
            const resposta = await fetch("http://localhost:3000/Produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: url,
                    titulo: titulo,
                    valor: valor
                })
            });

            if (!resposta.ok) {
                throw new Error("Erro ao criar produto");
            }

            return await resposta.json();
        } catch (erro) {
            console.error("Erro na criação de produto:", erro.message);
            throw erro; // Repassa o erro para ser tratado onde a função for chamada
        }
    },

    // Função para buscar produtos por termo de busca
    async buscaProduto(termoDeBusca) {
        try {
            const resposta = await fetch(`http://localhost:3000/Produtos?q=${encodeURIComponent(termoDeBusca)}`);
            if (!resposta.ok) {
                throw new Error("Erro ao buscar produto");
            }
            return await resposta.json();
        } catch (erro) {
            console.error("Erro na busca de produto:", erro.message);
            return [];
        }
    }
};

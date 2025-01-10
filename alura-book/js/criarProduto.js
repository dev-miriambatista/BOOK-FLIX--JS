import { conectaApi } from "./conectaApi.js";

const formulario = document.querySelector("[data-formulario]");

async function criarProduto(evento) {
    evento.preventDefault();

    const url = document.querySelector("[data-url]").value;
    const titulo = document.querySelector("[data-titulo]").value;
    const valor = document.querySelector("[data-valor]").value;

    console.log('Dados do formulário:', { titulo, valor, url }); // Verificação dos dados enviados

    try {
        await conectaApi.criaProduto(titulo, valor, url); // Ordem corrigida
        console.log('Produto criado com sucesso!');
        window.location.href = "pages/envio-concluido.html"; 
// Redireciona após o envio
    } catch (e) {
        console.error('Erro ao criar produto:', e); // Log do erro
        alert("Erro ao criar produto: " + e.message);
    }
}

formulario.addEventListener("submit", evento => criarProduto(evento));
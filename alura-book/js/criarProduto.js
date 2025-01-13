import { conectaApi } from './conectaApi.js';

document.addEventListener('DOMContentLoaded', () => {
    const listaProdutos = document.querySelector('[data-lista]');

    // Evento para delegar a edição
    listaProdutos.addEventListener('click', async (event) => {
        if (event.target.classList.contains('botao-editar')) {
            const id = event.target.getAttribute('data-id');
            const produtoCard = event.target.closest('.produto__card');
            const tituloAtual = produtoCard.querySelector('h3').textContent;
            const valorAtual = produtoCard.querySelector('p').textContent.replace('R$ ', '');
            const urlAtual = produtoCard.querySelector('iframe').src;

            // Exibir um modal para edição
            const novoTitulo = prompt('Digite o novo título:', tituloAtual);
            const novoValor = prompt('Digite o novo valor:', valorAtual);
            const novaUrl = prompt('Digite o novo URL da imagem:', urlAtual);

            if (novoTitulo && novoValor && novaUrl) {
                try {
                    await conectaApi.editaProduto(id, novoTitulo, novoValor, novaUrl);

                    // Atualizar o DOM diretamente
                    produtoCard.querySelector('h3').textContent = novoTitulo;
                    produtoCard.querySelector('p').textContent = `R$ ${novoValor}`;
                    produtoCard.querySelector('iframe').src = novaUrl;

                    alert('Produto editado com sucesso!');
                } catch (error) {
                    console.error('Erro ao editar o produto:', error);
                    alert('Não foi possível editar o produto.');
                }
            } else {
                alert('Todos os campos devem ser preenchidos.');
            }
        }
    });
});

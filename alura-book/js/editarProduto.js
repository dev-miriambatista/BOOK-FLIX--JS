import { conectaApi } from './conectaApi.js';

document.addEventListener('DOMContentLoaded', () => {
    const listaProdutos = document.querySelector('[data-lista]');

    // Delegação de evento para os botões de edição
    listaProdutos.addEventListener('click', async (event) => {
        if (event.target.classList.contains('botao-editar')) {
            const id = event.target.getAttribute('data-id');

            // Exemplo: Solicitar novas informações
            const novoTitulo = prompt('Digite o novo título:');
            const novoValor = prompt('Digite o novo valor:');
            const novaUrl = prompt('Digite o novo URL da imagem:');

            if (novoTitulo && novoValor && novaUrl) {
                try {
                    await conectaApi.editaProduto(id, novoTitulo, novoValor, novaUrl);
                    alert('Produto editado com sucesso!');
                    location.reload(); // Atualiza a página para mostrar os dados atualizados
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

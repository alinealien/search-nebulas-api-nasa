// Aguarda até que o DOM esteja completamente carregado antes de executar a função
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o elemento de input de busca pelo ID 'search-input'
    const searchInput = document.getElementById('search-input');
    // Seleciona o botão de busca pelo ID 'search-btn'
    const searchBtn = document.getElementById('search-btn');
    // Seleciona o elemento que exibirá as informações da imagem pelo ID 'image-info'
    const imageInfo = document.getElementById('image-info');

    // Adiciona um evento de clique ao botão de busca
    searchBtn.addEventListener('click', async () => { // Adiciona 'async' para tornar a função assíncrona
        // Obtém o termo de busca do input e remove espaços em branco do início e do fim
        const searchTerm = searchInput.value.trim();
        // Verifica se o termo de busca não está vazio
        if (searchTerm !== '') {
            try {
                // Faz uma requisição para a API da NASA buscando por imagens de nebulas
                // 'await' faz com que a execução da função pause até que a promessa do 'fetch' seja resolvida
                const response = await fetch(`https://images-api.nasa.gov/search?q=nebulas`);
                // Converte a resposta para JSON, 'await' pausa até que o JSON esteja pronto
                const data = await response.json();
                // Extrai os itens de imagem da resposta JSON
                const items = data.collection.items;

                // Verifica se há itens retornados
                if (items.length > 0) {
                    // Converte o termo de busca em um número (índice)
                    const index = parseInt(searchTerm);
                    // Verifica se o índice é um número válido dentro dos limites dos itens retornados
                    if (!isNaN(index) && index >= 0 && index < items.length) {
                        // Obtém o item de imagem com base no índice fornecido
                        const item = items[index];

                        // Obtém a URL única da imagem
                        const uniqueImageUrl = item.links[0].href;
                        // Obtém o título da imagem
                        const imageTitle = item.data[0].title;
                        // Obtém o ID da imagem
                        const imageId = item.data[0].nasa_id;

                        // Define a imagem de fundo do corpo da página
                        document.body.style.backgroundImage = `url('${uniqueImageUrl}')`;
                        document.body.style.backgroundSize = 'contain';
                        document.body.style.backgroundPosition = 'center center';

                        // Atualiza as informações da imagem no elemento 'image-info'
                        imageInfo.innerHTML = `Título: ${imageTitle}<br>ID: ${imageId}`;
                    } else {
                        // Informa que o índice fornecido é inválido
                        imageInfo.innerHTML = 'Índice inválido';
                    }
                } else {
                    // Informa que não foram encontradas imagens
                    imageInfo.innerHTML = 'Nenhuma imagem encontrada';
                }
            } catch (error) {
                // Captura e loga qualquer erro ocorrido na requisição
                console.error('Erro ao buscar dados:', error);
                // Informa que houve um erro ao buscar imagens
                imageInfo.innerHTML = 'Erro ao buscar imagens';
            }
        }
    });
});

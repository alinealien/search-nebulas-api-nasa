document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const gridContainer = document.getElementById('grid-container');

    async function fetchImages() {
        try {
            const response = await fetch('https://images-api.nasa.gov/search?q=nebulas');
            const data = await response.json();
            return data.collection.items;
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            return [];
        }
    }

    async function displayImages() {
        const items = await fetchImages();

        if (items.length > 0) {
            gridContainer.innerHTML = ''; // Limpa o grid antes de inserir novas imagens
            items.forEach((item, index) => {
                const imageUrl = item.links[0].href;
                const title = item.data[0].title;

                // Cria o elemento da imagem
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                gridItem.innerHTML = `<img src="${imageUrl}" alt="${title}" data-index="${index}">`;
                gridContainer.appendChild(gridItem);
            });

            // Adiciona evento de clique para abrir uma nova página ao clicar na imagem
            document.querySelectorAll('.grid-item img').forEach(img => {
                img.addEventListener('click', (e) => {
                    const index = e.target.getAttribute('data-index');
                    openImagePage(index);
                });
            });
        } else {
            gridContainer.innerHTML = 'Nenhuma imagem encontrada';
        }
    }

    // Abre uma nova página com os detalhes da imagem
    function openImagePage(index) {
        window.location.href = `image.html?index=${index}`;
    }

    searchBtn.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();
        const index = parseInt(searchTerm);

        if (!isNaN(index)) {
            openImagePage(index);
        }
    });

    displayImages();
});

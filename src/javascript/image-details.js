document.addEventListener('DOMContentLoaded', async () => {
    const imageContainer = document.getElementById('image-container');
    const selectedImage = document.getElementById('selected-image');
    const imageInfo = document.getElementById('image-info');
    const exploreMoreContainer = document.getElementById('explore-more');

    // Obtém o parâmetro 'index' da URL
    const urlParams = new URLSearchParams(window.location.search);
    const imageIndex = urlParams.get('index');

    // Função para buscar imagens da API da NASA
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

    

    // Função para exibir os detalhes da imagem selecionada
    async function displaySelectedImage() {
        const items = await fetchImages();

        if (items.length > 0 && imageIndex !== null && !isNaN(imageIndex)) {
            const item = items[imageIndex];
            const imageUrl = item.links[0].href;
            const title = item.data[0].title;
            const Description = item.data[0].description;
            const imageId = item.data[0].nasa_id;

            selectedImage.src = imageUrl;

            
            imageInfo.innerHTML = `<strong>Título:</strong>${title}  <br> <strong>Description:</strong>${Description} ${imageId}`;
        } else {
            imageInfo.innerHTML = 'Imagem não encontrada';
        }
    }

    // Função para exibir os detalhes da imagem selecionada
async function displaySelectedImage() {
    const items = await fetchImages();

    if (items.length > 0 && imageIndex !== null && !isNaN(imageIndex)) {
        const item = items[imageIndex];
        const imageUrl = item.links[0].href;
        const title = item.data[0].title;
        const description = item.data[0].description;
        const imageId = item.data[0].nasa_id;

        selectedImage.src = imageUrl;

        let displayDescription = description;
        let readMoreLink = '';

        if (description.length > 900) {
            displayDescription = description.substring(0, 900) + '...';
            readMoreLink = `<a href="#" id="read-more">Leia mais</a>`;
        }

        imageInfo.innerHTML = `
        <div class="image-details">
            <strong>Título:</strong> <span class="title">${title}</span><br><br>
            <strong>Descrição:</strong> <span id="description" class="description">${displayDescription}</span> ${readMoreLink}
        </div>
    `;

        if (readMoreLink) {
            document.getElementById('read-more').addEventListener('click', function(event) {
                event.preventDefault();
                document.getElementById('description').innerText = description;
                this.style.display = 'none';
            });
        }
    } else {
        imageInfo.innerHTML = 'Imagem não encontrada';
    }
}

// Função para exibir imagens adicionais no grid "Mais para explorar"
async function displayExploreMore() {
    const items = await fetchImages();

    if (items.length > 0) {
        exploreMoreContainer.innerHTML = ''; // Limpa o grid
        // Adicione aqui o código para exibir as imagens adicionais
    }
}

    // Função para exibir imagens adicionais no grid "Mais para explorar"
    async function displayExploreMore() {
        const items = await fetchImages();

        if (items.length > 0) {
            exploreMoreContainer.innerHTML = ''; // Limpa o grid
            items.forEach((item, index) => {
                if (index != imageIndex) {  // Não exibe a imagem atual
                    const imageUrl = item.links[0].href;
                    const title = item.data[0].title;

                    const gridItem = document.createElement('div');
                    gridItem.classList.add('grid-item');
                    gridItem.innerHTML = `<img src="${imageUrl}" alt="${title}" data-index="${index}">`;
                    exploreMoreContainer.appendChild(gridItem);

                    // Adiciona evento de clique para abrir outra imagem ao clicar
                    gridItem.querySelector('img').addEventListener('click', (e) => {
                        const index = e.target.getAttribute('data-index');
                        window.location.href = `image.html?index=${index}`;
                    });
                }
            });
        }
    }

    // Exibe a imagem selecionada e a seção "Mais para explorar"
    await displaySelectedImage();
    await displayExploreMore();
});

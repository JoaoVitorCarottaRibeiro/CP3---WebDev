document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const TextodoPost = document.getElementById('TextodoPost').value
    const postCategoria = document.getElementById('postCategoria').value;
    const urlPost1 = document.getElementById('urlPost1').value;
    const urlPost2 = document.getElementById('urlPost2').value
    const urlPost3 = document.getElementById('urlPost3').value;
    const Data = new Date().toLocaleString()

    const ElementodoPost = document.createElement('div');
    ElementodoPost.className = `post ${postCategoria}`

    ElementodoPost.innerHTML = `
        <h3>${postCategoria}</h3>
        <p>${TextodoPost}</p>
        <div class="DatadoPost">${Data}</div>
        <div class="carousel">
            <div class="carousel-images">
                ${urlPost1 ? `<img src="${urlPost1}" alt="Imagem do post">` : ''}
                ${urlPost2 ? `<img src="${urlPost2}" alt="Imagem do post">` : ''}
                ${urlPost3 ? `<img src="${urlPost3}" alt="Imagem do post">` : ''}
            </div>
            <button class="carousel-button prev">&lt;</button>
            <button class="carousel-button next">&gt;</button>
        </div>
        <div class="post-actions">
            <button type="button" class="btnPost btnEdit">Editar</button>
            <button type="button" class="btnPost btnDelete">Apagar</button>
        </div>
    `;

    document.getElementById('postsContainer').appendChild(ElementodoPost);

    document.getElementById('postForm').reset();

    ElementodoPost.querySelector('.btnEdit').addEventListener('click', function() {
        editPost(ElementodoPost, TextodoPost, postCategoria, urlPost1, urlPost2, urlPost3);
    });

    ElementodoPost.querySelector('.btnDelete').addEventListener('click', function() {
        ElementodoPost.remove();
    });

    setupCarousel(ElementodoPost.querySelector('.carousel'));
});

function editPost(ElementodoPost, TextodoPost, postCategoria, urlPost1, urlPost2, urlPost3) {
    document.getElementById('TextodoPost').value = TextodoPost;
    document.getElementById('postCategoria').value = postCategoria;
    document.getElementById('urlPost1').value = urlPost1;
    document.getElementById('urlPost2').value = urlPost2;
    document.getElementById('urlPost3').value = urlPost3;

    ElementodoPost.remove();
}

function setupCarousel(carousel) {
    const imagensContainer = carousel.querySelector('.carousel-images');
    const imagens = imagensContainer.querySelectorAll('img');
    let currentIndex = 0;

    carousel.querySelector('.next').addEventListener('click', function() {
        if (currentIndex < imagens.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    carousel.querySelector('.prev').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = imagens.length - 1;
        }
        updateCarousel();
    });

    function updateCarousel() {
        const offset = -currentIndex * 50;
        imagensContainer.style.transform = `translateX(${offset}%)`;
    }
}
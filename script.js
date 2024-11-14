let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}


let swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    loop:true,
});


let swiper1 = new Swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },

    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});

// Adicionar o evento de clique para remover comentários usando event delegation
document.querySelector('.swiper.review-slider .swiper-wrapper').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-comment')) {
        const review = event.target.closest('.swiper-slide');
        
        if (review) {
            review.remove();
        }
    }
});

document.getElementById('submitReview').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const rating = document.querySelector('input[name="rating"]:checked');
    const comment = document.getElementById('comment').value;

    if (name && rating && comment) {
        // Obter o valor do rating selecionado
        const ratingValue = parseFloat(rating.value);

        // Criar a estrutura de estrelas
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (ratingValue >= i) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else if (ratingValue >= i - 0.5) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }

        // Criar o novo slide de review
        const newReviewHTML = `
            <div class="swiper-slide slide">
                <i class="fas fa-quote-right"></i>
                <i class="fas fa-times remove-comment"></i>
                <div class="user">
                    <img src="images/user.jfif" alt="">
                    <div class="user-info">
                        <h3>${name}</h3>
                        <div class="starts">
                            ${starsHTML}
                        </div>
                    </div>
                </div>
                <p>${comment}</p>
            </div>
        `;

        // Adicionar a nova review ao swiper-wrapper dentro da review-slider
        document.querySelector('.swiper.review-slider .swiper-wrapper').innerHTML += newReviewHTML;

        // Limpar os campos do formulário
        document.getElementById('name').value = '';
        document.querySelectorAll('input[name="rating"]').forEach(input => input.checked = false);
        document.getElementById('comment').value = '';
    } else {
        alert('Please fill in all fields');
    }
});



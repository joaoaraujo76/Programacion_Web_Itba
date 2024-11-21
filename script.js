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
        Swal.fire({
            title: 'Success',
            text: 'Review submitted successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Please fill all the fields',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    const cartContainer = document.getElementById('cart');

    cartIcon.addEventListener('click', () => {
        cartContainer.classList.toggle('hidden');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart');
    const emptyMessage = cartContainer.querySelector('span#empty-card');
    const totalContainer = document.createElement('div');
    totalContainer.classList.add('total-price');
    totalContainer.textContent = 'Total: $0.00';
    cartContainer.appendChild(totalContainer);

    const checkoutButton = document.createElement('button');
    checkoutButton.classList.add('checkout-btn');
    checkoutButton.textContent = 'Confirm Purchase';
    cartContainer.appendChild(checkoutButton);

    function checkCartEmpty() {
        const remainingItems = cartContainer.querySelectorAll('.product-item');
        if (remainingItems.length === 0) {
            emptyMessage.style.display = 'block';
            totalContainer.style.display = 'none';
            checkoutButton.style.display = 'none'; 
        } else {
            emptyMessage.style.display = 'none';
            totalContainer.style.display = 'block';
            checkoutButton.style.display = 'block'; 
            cartContainer.appendChild(checkoutButton); 
        }
    }

    function updateTotalPrice() {
        let total = 0;
        cartContainer.querySelectorAll('.product-item').forEach(item => {
            const price = parseFloat(item.querySelector('.product-price').textContent.replace('$', ''));
            total += price;
        });
        totalContainer.textContent = `Total: $${total.toFixed(2)}`;
    }

    checkoutButton.addEventListener('click', () => {
        Swal.fire({
            title: 'Purchase Confirmed',
            text: 'Thank you for your purchase!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            cartContainer.querySelectorAll('.product-item').forEach(item => item.remove());
            checkCartEmpty();
            updateTotalPrice();
            cartContainer.classList.toggle('hidden');
        });      
    });


    checkCartEmpty();

    document.querySelectorAll('.box .btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const productBox = button.closest('.box');
            const productName = productBox.querySelector('h3').textContent;
            const productImageSrc = productBox.querySelector('img').src;
            const productPrice = parseFloat(productBox.querySelector('span').textContent.replace('$', ''));

            let existingProduct = Array.from(cartContainer.querySelectorAll('.product-item'))
                .find(item => item.querySelector('.product-name').textContent === productName);

            if (existingProduct) {
                let quantitySpan = existingProduct.querySelector('.quantity');
                let priceSpan = existingProduct.querySelector('.product-price');
                let originalPrice = parseFloat(existingProduct.dataset.price);

                let quantity = parseInt(quantitySpan.textContent, 10) + 1;
                quantitySpan.textContent = quantity;
                priceSpan.textContent = `$${(originalPrice * quantity).toFixed(2)}`;
            } else {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.setAttribute('data-price', productPrice);
                productItem.innerHTML = `
                    <img src="${productImageSrc}" alt="${productName}" class="product-photo">
                    <div class="product-details">
                        <p class="product-name">${productName}</p>
                        <div class="product-quantity">
                            <button class="quantity-btn">-</button>
                            <span class="quantity">1</span>
                            <button class="quantity-btn">+</button>
                        </div>
                    </div>
                    <span class="product-price">$${productPrice.toFixed(2)}</span>
                `;

                cartContainer.appendChild(productItem);
                cartContainer.appendChild(checkoutButton); // Garante que o botão é o último elemento após adicionar um item

                const minusButton = productItem.querySelector('.quantity-btn:first-child');
                const plusButton = productItem.querySelector('.quantity-btn:last-child');
                const quantitySpan = productItem.querySelector('.quantity');
                const priceSpan = productItem.querySelector('.product-price');

                minusButton.addEventListener('click', () => {
                    let quantity = parseInt(quantitySpan.textContent, 10);
                    if (quantity > 1) {
                        quantity -= 1;
                        quantitySpan.textContent = quantity;
                        priceSpan.textContent = `$${(productPrice * quantity).toFixed(2)}`;
                        updateTotalPrice();
                    } else if (quantity === 1) {
                        productItem.remove();
                        checkCartEmpty();
                        updateTotalPrice();
                    }
                });

                plusButton.addEventListener('click', () => {
                    let quantity = parseInt(quantitySpan.textContent, 10) + 1;
                    quantitySpan.textContent = quantity;
                    priceSpan.textContent = `$${(productPrice * quantity).toFixed(2)}`;
                    updateTotalPrice();
                });
            }

            updateTotalPrice();
            checkCartEmpty();
        });
    });
});


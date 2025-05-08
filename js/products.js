// Products Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 'prod-1',
            name: 'Diamond Eternity Ring',
            price: 1299.00,
            originalPrice: 1599.00,
            image: 'images/products/product1.jpg',
            category: 'rings',
            rating: 4.5,
            new: true,
            description: 'This stunning eternity ring features a continuous line of sparkling diamonds set in 18k white gold.'
        },
        {
            id: 'prod-2',
            name: 'Pearl Drop Earrings',
            price: 299.00,
            originalPrice: 349.00,
            image: 'images/products/product2.jpg',
            category: 'earrings',
            rating: 4.2,
            description: 'Elegant pearl drop earrings with diamond accents in 14k gold.'
        },
        {
            id: 'prod-3',
            name: 'Gold Link Bracelet',
            price: 599.00,
            image: 'images/products/product3.jpg',
            category: 'bracelets',
            rating: 4.7,
            description: 'Classic gold link bracelet with secure lobster clasp.'
        },
        {
            id: 'prod-4',
            name: 'Sapphire Pendant Necklace',
            price: 899.00,
            originalPrice: 1099.00,
            image: 'images/products/product4.jpg',
            category: 'necklaces',
            rating: 4.8,
            new: true,
            description: 'Beautiful blue sapphire pendant on a delicate gold chain.'
        },
        {
            id: 'prod-5',
            name: 'Diamond Stud Earrings',
            price: 799.00,
            image: 'images/products/product5.jpg',
            category: 'earrings',
            rating: 4.9,
            description: 'Classic diamond stud earrings in 14k white gold.'
        },
        {
            id: 'prod-6',
            name: 'Rose Gold Bangle',
            price: 449.00,
            image: 'images/products/product6.jpg',
            category: 'bracelets',
            rating: 4.3,
            description: 'Elegant rose gold bangle with a smooth, polished finish.'
        },
        {
            id: 'prod-7',
            name: 'Emerald Cut Diamond Ring',
            price: 2499.00,
            image: 'images/products/product7.jpg',
            category: 'rings',
            rating: 5.0,
            new: true,
            description: 'Stunning emerald cut diamond solitaire ring in platinum.'
        },
        {
            id: 'prod-8',
            name: 'Diamond Tennis Necklace',
            price: 1999.00,
            originalPrice: 2499.00,
            image: 'images/products/product8.jpg',
            category: 'necklaces',
            rating: 4.7,
            description: 'Luxurious diamond tennis necklace in 18k white gold.'
        }
    ];

    // Display products
    function displayProducts(filteredProducts = products) {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) return;

        productsGrid.innerHTML = '';

        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = '<p class="no-products">No products match your filters.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const discount = product.originalPrice ? 
                Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

            const productCard = document.createElement('div');
            productCard.className = 'product-card fade-in';
            productCard.innerHTML = `
                ${product.new ? '<span class="product-badge">New</span>' : ''}
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" class="zoom-effect">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="rating">
                        ${renderRatingStars(product.rating)}
                        <span>(${product.rating})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `
                            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                            <span class="discount">${discount}% off</span>
                        ` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="quick-view-btn" data-id="${product.id}">Quick View</button>
                        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;

            productsGrid.appendChild(productCard);
        });

        // Initialize Intersection Observer for new elements
        const newFadeElements = document.querySelectorAll('.fade-in:not(.visible)');
        newFadeElements.forEach(element => {
            fadeObserver.observe(element);
        });

        // Add event listeners to quick view buttons
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.getAttribute('data-id');
                const product = products.find(p => p.id === productId);
                showQuickView(product);
            });
        });

        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.getAttribute('data-id');
                const product = products.find(p => p.id === productId);
                addToCart(product);
            });
        });
    }

    // Render rating stars
    function renderRatingStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }

    // Show quick view modal
    function showQuickView(product) {
        const modal = document.querySelector('.quick-view-modal');
        const modalBody = document.querySelector('.modal-body');
        
        if (!modal || !modalBody) return;

        const discount = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        modalBody.innerHTML = `
            <div class="modal-product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-product-info">
                <h2>${product.name}</h2>
                <div class="modal-product-price">
                    <span>$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `
                        <span style="text-decoration: line-through; color: #aaa; margin-left: 10px;">$${product.originalPrice.toFixed(2)}</span>
                        <span style="background: var(--primary-color); color: white; padding: 3px 8px; border-radius: var(--border-radius); margin-left: 10px; font-size: 0.9rem;">${discount}% off</span>
                    ` : ''}
                </div>
                <div class="modal-product-description">
                    <p>${product.description}</p>
                </div>
                <div class="modal-product-options">
                    <div class="option-group">
                        <label for="modal-size">Size:</label>
                        <select id="modal-size" class="size-select">
                            <option value="">Select size</option>
                            <option value="5">Size 5</option>
                            <option value="6">Size 6</option>
                            <option value="7">Size 7</option>
                            <option value="8">Size 8</option>
                            <option value="9">Size 9</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label for="modal-quantity">Quantity:</label>
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" value="1" min="1" id="modal-quantity" class="quantity-input">
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                </div>
                <div class="modal-product-actions">
                    <button class="btn btn-gold add-to-cart-modal ripple" data-id="${product.id}">Add to Cart</button>
                    <button class="btn btn-outline-gold wishlist ripple"><i class="far fa-heart"></i> Wishlist</button>
                </div>
                <div class="modal-product-meta">
                    <p><i class="fas fa-truck"></i> Free shipping on orders over $500</p>
                    <p><i class="fas fa-undo"></i> 30-day return policy</p>
                </div>
            </div>
        `;

        // Add event listeners to quantity buttons in modal
        const minusBtn = modalBody.querySelector('.quantity-btn.minus');
        const plusBtn = modalBody.querySelector('.quantity-btn.plus');
        const quantityInput = modalBody.querySelector('.quantity-input');

        minusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });

        // Add to cart from modal
        const addToCartBtn = modalBody.querySelector('.add-to-cart-modal');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const size = modalBody.querySelector('.size-select').value;
                const quantity = parseInt(modalBody.querySelector('.quantity-input').value);
                
                const cartItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size: size,
                    quantity: quantity
                };

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cart));

                updateCartCount();
                showToast('Item added to cart', 'success');
                modal.classList.remove('active');
            });
        }

        modal.classList.add('active');

        // Close modal
        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Add to cart
    function addToCart(product) {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
        showToast('Item added to cart', 'success');
    }

    // Filter products
    function filterProducts() {
        const categoryFilter = document.getElementById('category-filter').value;
        const priceFilter = document.getElementById('price-filter').value;
        const sortBy = document.getElementById('sort-by').value;
        const searchQuery = document.getElementById('product-search').value.toLowerCase();

        let filteredProducts = [...products];

        // Apply category filter
        if (categoryFilter !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
        }

        // Apply price filter
        if (priceFilter !== 'all') {
            const [min, max] = priceFilter.split('-').map(Number);
            if (priceFilter.endsWith('+')) {
                filteredProducts = filteredProducts.filter(product => product.price >= min);
            } else {
                filteredProducts = filteredProducts.filter(product => product.price >= min && product.price <= max);
            }
        }

        // Apply search filter
        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchQuery) || 
                product.description.toLowerCase().includes(searchQuery)
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => (b.new || false) - (a.new || false));
                break;
            default:
                // Default sorting (original order)
                break;
        }

        displayProducts(filteredProducts);
    }

    // Initialize filters
    if (document.getElementById('category-filter')) {
        // Set initial filter from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            document.getElementById('category-filter').value = categoryParam;
        }

        // Add event listeners to filters
        document.getElementById('category-filter').addEventListener('change', filterProducts);
        document.getElementById('price-filter').addEventListener('change', filterProducts);
        document.getElementById('sort-by').addEventListener('change', filterProducts);
        document.getElementById('product-search').addEventListener('input', filterProducts);
        document.querySelector('.search-btn').addEventListener('click', filterProducts);

        // Initial display
        displayProducts();
    }

    // Related products (for product details page)
    if (document.querySelector('.related-products-grid')) {
        const relatedProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
        const relatedProductsGrid = document.querySelector('.related-products-grid');

        relatedProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card fade-in';
            productCard.innerHTML = `
                ${product.new ? '<span class="product-badge">New</span>' : ''}
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" class="zoom-effect">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="rating">
                        ${renderRatingStars(product.rating)}
                        <span>(${product.rating})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `
                            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        ` : ''}
                    </div>
                    <div class="product-actions">
                        <a href="product-details.html" class="btn btn-outline-gold ripple">View Details</a>
                    </div>
                </div>
            `;

            relatedProductsGrid.appendChild(productCard);
        });

        // Initialize Intersection Observer for new elements
        const newFadeElements = document.querySelectorAll('.fade-in:not(.visible)');
        newFadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    }
});
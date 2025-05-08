// Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart if not exists
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Display cart items
    displayCartItems();

    // Update cart count
    updateCartCount();

    // Continue shopping button
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.back();
        });
    }

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            showToast('Proceeding to checkout', 'info');
            // In a real app, this would redirect to a checkout page
        });
    }

    // Apply coupon button
    const applyCouponBtn = document.querySelector('.apply-coupon');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const couponInput = document.querySelector('.coupon-code input');
            if (couponInput.value.trim() === '') {
                showToast('Please enter a coupon code', 'error');
            } else {
                showToast('Coupon applied successfully', 'success');
                couponInput.value = '';
            }
        });
    }
});

// Display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('.cart-table-body');
    const cartEmpty = document.querySelector('.cart-empty');
    const subtotalElement = document.querySelector('.subtotal');
    const estimatedTotalElement = document.querySelector('.estimated-total');

    if (cart.length === 0) {
        if (cartTableBody) cartTableBody.innerHTML = '';
        if (cartEmpty) cartEmpty.style.display = 'flex';
        if (subtotalElement) subtotalElement.textContent = '$0.00';
        if (estimatedTotalElement) estimatedTotalElement.textContent = '$0.00';
        return;
    }

    if (cartEmpty) cartEmpty.style.display = 'none';

    let subtotal = 0;
    let html = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-col product">
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h3 class="cart-item-title">${item.name}</h3>
                        <div class="cart-item-meta">
                            ${item.size ? `<span>Size: ${item.size}</span>` : ''}
                            ${item.color ? `<span>Color: ${item.color}</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="cart-col price">
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-col quantity">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
                <div class="cart-col total">
                    <span class="cart-item-total">$${itemTotal.toFixed(2)}</span>
                </div>
                <div class="cart-col action">
                    <button class="remove-item"><i class="fas fa-times"></i></button>
                </div>
            </div>
        `;
    });

    if (cartTableBody) cartTableBody.innerHTML = html;

    // Update subtotal and total
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (estimatedTotalElement) estimatedTotalElement.textContent = `$${subtotal.toFixed(2)}`;

    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                updateCartItem(this);
            }
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            input.value = parseInt(input.value) + 1;
            updateCartItem(this);
        });
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            if (parseInt(this.value) < 1) this.value = 1;
            updateCartItem(this);
        });
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            removeCartItem(cartItem);
        });
    });
}

// Update cart item quantity
function updateCartItem(element) {
    const cartItem = element.closest('.cart-item');
    const itemId = cartItem.getAttribute('data-id');
    const quantity = parseInt(cartItem.querySelector('.quantity-input').value);
    const cart = JSON.parse(localStorage.getItem('cart'));

    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
        showToast('Cart updated', 'info');
    }
}

// Remove item from cart
function removeCartItem(cartItem) {
    const itemId = cartItem.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart'));

    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    displayCartItems();
    updateCartCount();
    showToast('Item removed from cart', 'error');
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(count => {
        count.textContent = totalItems;
    });
}

// Add to cart functionality
function addToCart(product, quantity = 1, size = null, color = null) {
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        size: size,
        color: color
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.size === size && 
        item.color === color
    );

    if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Item added to cart', 'success');
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.querySelector('.toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}
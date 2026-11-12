/* Client Interactivity */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Load cart items from localStorage
    loadCartItems();
});

function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show feedback to user
    alert(`${productName} added to cart!`);
    
    // Update cart immediately if on cart page
    if (window.location.pathname.includes('cart.html')) {
        loadCartItems();
    }
}

function addToCartAndRedirect(productName, price) {
    addToCart(productName, price);
    // Redirect to cart page after adding item
    window.location.href = 'cart.html';
}

function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let totalPrice = 0;
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            totalPrice += item.price;
            let itemElement = document.createElement('div');
            itemElement.className = 'mb-4';
            itemElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <span class="text-gray-800">${item.productName}</span>
                    <span class="text-gray-600">₹${item.price}</span>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Add total price display
        if (cart.length > 0) {
            let totalElement = document.createElement('div');
            totalElement.className = 'mt-4 pt-4 border-t border-gray-200';
            totalElement.innerHTML = `
                <div class="flex justify-between items-center font-semibold">
                    <span class="text-gray-800">Total</span>
                    <span class="text-gray-800">₹${totalPrice}</span>
                </div>
            `;
            cartItemsContainer.appendChild(totalElement);
        } else {
            cartItemsContainer.innerHTML = '<p class="text-gray-600">Your cart is empty</p>';
        }
    }
}
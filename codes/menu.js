let orders = JSON.parse(localStorage.getItem('orders')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orderId = orders.length > 0 ? orders[orders.length - 1].orderId + 1 : 1;
updateCart();

// Clear local storage if needed
localStorage.removeItem('orders');
localStorage.removeItem('cart');

// Event listener for checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const paymentMethodSelected = document.querySelector('input[name="paymentMethod"]:checked');
    
    if (!name || !address || !city || !zip || !paymentMethodSelected) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const paymentMethod = paymentMethodSelected.value;
    let upiId = document.getElementById('upiId').value.trim();
    let cardNumber = document.getElementById('cardNumber').value.trim();
    let cardExpiry = document.getElementById('cardExpiry').value.trim();
    let cardCvc = document.getElementById('cardCvc').value.trim();
    
    if (paymentMethod === 'UPI' && !upiId) {
        alert('Please enter your UPI ID.');
        return;
    }
    if (paymentMethod === 'Card' && (!cardNumber || !cardExpiry || !cardCvc)) {
        alert('Please fill in all card details.');
        return;
    }

    const order = {
        orderId: orderId++,
        name, address, city, zip, paymentMethod,
        items: cart.map(item => ({ name: item.name, price: item.price, quantity: item.quantity }))
    };

    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    displayOrder(order);
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();

    document.getElementById("order_badge").style.display = "block";

    
    document.getElementById("checkoutForm").style.display = "none";
    document.getElementById("thankYouMessage").style.display = "block";
    
    setTimeout(() => {
        document.getElementById("thankYouMessage").style.display = "none";
        document.getElementById("checkoutForm").style.display = "block";
        document.getElementById("checkoutPopover").style.display = "none";
    }, 4000);

    toggleCart();
    
});

// Display order details in history
function displayOrder(order) {
    const orderSummary = document.getElementById('orderSummary');
    
    let itemsHtml = order.items.map(item => 
        `<p>${item.name} - ${item.quantity} ${item.quantity > 1 ? 'items' : 'item'}</p>`
    ).join('');

    orderSummary.innerHTML += `
        <div class="order-history">
            <p><strong id="order_id">Order ID:</strong> ${order.orderId}</p>
            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>City:</strong> ${order.city}</p>
            <p><strong>Zip:</strong> ${order.zip}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Items Ordered:</strong></p>
            ${itemsHtml}
            <hr>
        </div>`;
}

// Function to handle checkout popover
document.getElementById("PopBtn").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    document.getElementById("checkoutPopover").style.display = "block";
    updateCheckoutSummary();
});

// Function to update checkout summary
function updateCheckoutSummary() {
    const checkoutCartItems = document.getElementById('checkoutCartItems');
    const checkoutCartTotal = document.getElementById('checkoutCartTotal');
    checkoutCartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        checkoutCartItems.innerHTML += `<div class="cart_item">
            <img src="${item.img}" alt="${item.name}" width="50">
            <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
        </div>`;
    });
    checkoutCartTotal.innerHTML = `Total: ₹${total}`;
}

// Update cart UI and item count
function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalDiv = document.getElementById('cartTotal');
    const cartIconBadge = document.getElementById('cartItemCount');
    
    cartItemsDiv.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;
        cartItemsDiv.innerHTML += `
            <div class="cart_item">
                <img class="cart_img" src="${item.img}" alt="${item.name}">
                <div class="flex">
                    <span class="name">${item.name}</span><br>
                    <span class="price">₹${(item.price * item.quantity)}</span>
                    <div class="item_option">
                        <a class="item_delete" onclick="removeFromCart('${item.name}')"><img src="../fonts/delete.svg"/></a>
                        <button class="remove" onclick="changeQuantity('${item.name}', -1)">−</button>
                        <p class="item_quantity">${item.quantity}</p>
                        <button class="add" onclick="changeQuantity('${item.name}', 1)">+</button>
                    </div>
                </div>
            </div><hr>`;
    });

    cartTotalDiv.innerHTML = `Total: ₹${total}`;
    cartIconBadge.innerText = itemCount > 0 ? itemCount : '';
    cartIconBadge.style.display = itemCount > 0 ? "block" : "none";
}


// Toggle cart visibility
function toggleCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.style.display = cartDiv.style.display === 'none' ? 'block' : 'none';
    updateCart();
}

// Reset form fields
function resetForm() {
    document.getElementById("checkoutForm").reset();
    document.getElementById("thankYouMessage").style.display = "none";
    document.getElementById("checkoutForm").style.display = "block";
}

// Payment method selection logic
const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('upiDetails').style.display = this.value === 'UPI' ? 'block' : 'none';
        document.getElementById('cardDetails').style.display = this.value === 'Card' ? 'block' : 'none';
    });
});

// Card number formatting
function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '').match(/.{1,4}/g);
    input.value = value ? value.join(' ') : '';
}

document.getElementById('cardNumber').addEventListener('input', function (e) {
    formatCardNumber(e.target);
});

// Card expiry formatting
function formatCardExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d+)/, '$1/$2');
    }
    input.value = value;
}

document.getElementById('cardExpiry').addEventListener('input', function (e) {
    formatCardExpiry(e.target);
});

// Toggle CVC visibility
function toggleCvcVisibility() {
    const cvcInput = document.getElementById('cardCvc');
    const cvcBtn = document.getElementById("cvcBtn");
    cvcInput.type = cvcInput.type === "password" ? "text" : "password";
    cvcBtn.innerText = cvcInput.type === "password" ? "Show" : "Hide";
}

// Toggle dish category items
function toggleDishItems(category) {
    document.querySelectorAll('.dish_item').forEach(item => item.style.display = 'none');
    document.querySelectorAll(`#${category} .dish_item`).forEach(item => item.style.display = 'block');
}

// Handle category selection
let category_titles = document.querySelectorAll(".category_title");
category_titles.forEach(category_title => {
    category_title.addEventListener("click", function() {
        category_titles.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Change item quantity in cart
function changeQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeFromCart(name);
        else updateCart();
    }
}

// Add item to cart
function addToCart(name, price, img) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, img, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Load previous orders on page load
window.onload = function() {
    toggleDishItems('coldBeverages');
    loadPreviousOrders();
};
function loadPreviousOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.forEach(order => {
        displayOrder(order);
    });
}

// Function to buy items
function buyItems() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    updateCart();
}

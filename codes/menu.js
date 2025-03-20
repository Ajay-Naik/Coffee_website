let orderId = 1; // Ensure this ID is incrementing correctly

document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    // Gather form data
    const paymentMethodSelected = document.querySelector('input[name="paymentMethod"]:checked');
    if (!paymentMethodSelected) {
        alert('Please select a payment method.');
        return; // Stop the function if no payment method is selected
    }
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const paymentMethod = paymentMethodSelected.value;
    // Optionally, reset the form
    let upiId = '';
    let cardNumber = '';
    let cardExpiry = '';
    let cardCvc = '';
    upiId = document.getElementById('upiId').value.trim();
    cardNumber = document.getElementById('cardNumber').value.trim();
    cardExpiry = document.getElementById('cardExpiry').value.trim();
    cardCvc = document.getElementById('cardCvc').value.trim();
    // Check if required fields are filled
    if (!name || !address || !city || !zip) {
        alert('Please fill in all required fields.');
        return; // Stop the function if any required field is empty
    } 
    if (paymentMethod === 'UPI') {
        if (!upiId) {
            alert('Please enter your UPI ID.');
            return; 
        }
    } else if (paymentMethod === 'Card') {
        if (!cardNumber || !cardExpiry || !cardCvc) {
            alert('Please fill in all card details.');
            return;
        }
    }
    if (name && address && city && zip || 
        (paymentMethod === 'UPI' && upiId) ||
        (paymentMethod === 'Card' && cardNumber && cardExpiry && cardCvc)) {
            // Hide the checkout form and show the thank you message
            document.getElementById("checkoutForm").style.display = "none";
            document.getElementById("thankYouMessage").style.display = "block";
            // Create order summary
    displayOrder();
    saveOrder(orderId,name, address, city, zip, paymentMethod);
}
});
function displayOrder(order) {
    
    
        const orderSummary = document.getElementById('orderSummary');
        orderSummary.innerHTML = `  
            <strong>Order:</strong> ${order.orderId++}<br>
            <strong>Name:</strong> ${order.name}<br>
            <strong>Address:</strong> ${order.address}<br>
            <strong>City:</strong> ${order.city}<br>
            <strong>Zip Code:</strong> ${order.zip}<br>
            <strong>Payment Method:</strong> ${order.paymentMethod}<br>
            <strong>Items:</strong> ${order.items}<br>        `;
            console.log(orderSummary);
            // Save order details to order history
       
        
    }
  
function saveOrder(name, address, city, zip, paymentMethod) {
    // const ordersList = document.getElementById('ordersList');
    // Create a new order entry
    const orderEntry = {
        orderId: orderId++,
        name: name,
        address: address,
        city: city,
        zip: zip,
        paymentMethod: paymentMethod,
        items: cart.map(item => `${item.name} (${item.quantity})`).join(', ')
    };
    // Get existing orders from localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderEntry); // Add the new order
    localStorage.setItem('orders', JSON.stringify(orders)); // Save back to localStorage
    // Display the new order in the orders list
    displayOrder(orderEntry);
    // Show the order history
    document.getElementById('orderHistory').style.display = 'block';
}
  

let popBtn1 = document.getElementById("PopBtn");
popBtn1.addEventListener("click", function() {
    updateCheckoutSummary(); // Update the summary with cart items
    resetForm(); // Reset the form fields

});

// Function to update the checkout summary
function updateCheckoutSummary() {
    const checkoutCartItems = document.getElementById('checkoutCartItems');
    const checkoutCartTotal = document.getElementById('checkoutCartTotal');
    checkoutCartItems.innerHTML = ''; // Clear previous items
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        checkoutCartItems.innerHTML += `
            <div class="cart_item">
                <img class="cart_img" src="${item.img}" alt="${item.name}">
                <span class="name">${item.name}</span>
                <span class="price">₹${(item.price * item.quantity)}</span>
            </div>
        `;
    });
    checkoutCartTotal.innerHTML = `Total: ₹${total.toFixed(2)}`;
    resetForm(); // Reset the form fields
}



const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
   paymentMethodRadios.forEach(radio => {
       radio.addEventListener('change', function() {
           const upiDetails = document.getElementById('upiDetails');
           const cardDetails = document.getElementById('cardDetails');
           // Reset visibility
           upiDetails.style.display = 'none';
           cardDetails.style.display = 'none';
           if (this.value === 'UPI') {
               upiDetails.style.display = 'block';
           } else if (this.value === 'Card') {
               cardDetails.style.display = 'block';
           }
       });
   });


function toggleCvcVisibility() {
    const cvcInput = document.getElementById('cardCvc');
    const cvcBtn=document.getElementById("cvcBtn");
    if (cvcInput.type === "password") {
        cvcInput.type = "text"; // 
    cvcBtn.innerText="Hide";
    // Show CVC
    } else {
        cvcInput.type = "password"; // Hide CVC
    cvcBtn.innerText="Show";

    } 
}
document.getElementById('cardNumber').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '').match(/.{1,4}/g);
    e.target.value = value ? value.join(' ') : '';
});
document.getElementById('cardExpiry').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d+)/, '$1/$2');
    }
    e.target.value = value;
});

        let cart = [];
        function toggleDishItems(category) {
            // Hide all dish items
            const allItems = document.querySelectorAll('.dish_item');
            allItems.forEach(item => {
                item.style.display = 'none';
            });
            // Show only the selected category's items
            const itemsToShow = document.querySelectorAll(`#${category} .dish_item`);
            itemsToShow.forEach(item => {
                item.style.display = 'block';
            });
        }

      window.onload = function() {
    toggleDishItems('coldBeverages');
    loadPreviousOrders(); // Function to load previous orders
};
function loadPreviousOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.forEach(order => {
        displayOrder(order);
    });
}
        
        let category_titles = document.querySelectorAll(".category_title");
        category_titles.forEach(function(category_title) {
            category_title.addEventListener("click", function() {
                category_titles.forEach(function(link) {
                    link.classList.remove('active');
                }); 
                this.classList.add('active');
            });
        });
        function toggleCart() {
            const cartDiv = document.getElementById('cart');
            cartDiv.style.display = cartDiv.style.display === 'block' ? 'none' : 'block';
            updateCart();
        }function closeCart() {
            const cartDiv = document.getElementById('cart');
            cartDiv.style.display = cartDiv.style.display === 'block' ? 'none' : 'block';
            updateCart();
        }
        
        function addToCart(name, price, img) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, img, quantity: 1 });
    }
    updateCart();
    resetForm(); // Reset the form after adding to cart
}

// Function to reset the form fields
function resetForm() {
    document.getElementById('btn').addEventListener('click', function() {
        document.getElementById('cartItems').textContent=""; // Reset checkout form
        document.getElementById('cartTotal').textContent=""; // Reset checkout form
        toggleCart(); // Close the cart after adding to cart
        document.getElementById('cart_icon').addEventListener('click', function() {
    
    document.getElementById('checkoutForm').reset(); // Reset checkout form
    document.getElementById('checkoutPopover').value=""; // Reset checkout form
    document.getElementById('upiDetails').style.display = 'none'; // Hide UPI details
    document.getElementById('cardDetails').style.display = 'none'; // Hide card details
    document.getElementById('cod').checked = true; // Example: set COD as default
    document.getElementById("checkoutForm").style.display = "block";
    document.getElementById("thankYouMessage").style.display = "none";
    });
    });  
}
        function updateCart() {
            const cartItemsDiv = document.getElementById('cartItems');
            const cartTotalDiv = document.getElementById('cartTotal');
            cartItemsDiv.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
                cartItemsDiv.innerHTML += `
                    <div class="cart_item">
                        <img class="cart_img" src="${item.img}" alt="${item.name}">
                        <div class="flex">
                        <span class="name">${item.name}</span>
                           <span class="price">₹${(item.price * item.quantity)}</span>
                           <div class="item_option">
                               <a class="item_delete" onclick="removeFromCart('${item.name}')"><img src="../fonts/delete.svg"/></a>
                               <button class="remove" onclick="changeQuantity('${item.name}', -1)"><p>−</p></button>
                               <p class="item_quantity">${item.quantity}</p>
                               <button class="add" onclick="changeQuantity('${item.name}', 1)"><p>+</p></button>
                           </div>    
                        </div>
                    </div>
                `;
            });
            cartTotalDiv.innerHTML = `Total: ₹${total.toFixed(2)}`;        }
        function removeFromCart(name) {
            cart = cart.filter(item => item.name !== name);
            updateCart();
        }
        function changeQuantity(name, change) {
            const item = cart.find(item => item.name === name);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(name);
                } else {
                    updateCart();
                }
            }
        }
        function buyItems() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            updateCart();
        }

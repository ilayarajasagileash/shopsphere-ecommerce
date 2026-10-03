/* =================================
   ShopSphere - Shopping Cart
================================= */

// Get cart from localStorage
let cart = getFromStorage("shopsphere-cart", []);


// Save cart
function saveCart() {
    saveToStorage("shopsphere-cart", cart);
}


// Add product to cart
function addToCart(productId) {

    const product = getProductById(productId);

    if (!product) {
        return;
    }

    const existingItem = cart.find(
        item => item.id === product.id
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }

    saveCart();

    alert(`${product.name} added to cart!`);
}


// Remove product from cart
function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== Number(productId)
    );

    saveCart();

    renderCart();
}


// Change quantity
function changeQuantity(productId, change) {

    const item = cart.find(
        item => item.id === Number(productId)
    );

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(
            cartItem => cartItem.id !== Number(productId)
        );
    }

    saveCart();

    renderCart();
}


// Calculate total
function getCartTotal() {

    return cart.reduce((total, item) => {

        return total + (item.price * item.quantity);

    }, 0);
}


// Display cart
function renderCart() {

    const cartContainer =
        document.getElementById("cart-container");

    if (!cartContainer) {
        return;
    }

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-state">

                <h3>Your cart is empty</h3>

                <p>
                    Add some products to your cart.
                </p>

                <br>

                <a href="#/products" class="btn">
                    Browse Products
                </a>

            </div>
        `;

        return;
    }


    cartContainer.innerHTML = `

        <div class="cart-items">

            ${cart.map(item => `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ${formatPrice(item.price)}
                        </p>

                        <div>

                            <button
                                class="btn btn-secondary"
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                −
                            </button>

                            <strong>
                                ${item.quantity}
                            </strong>

                            <button
                                class="btn btn-secondary"
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        class="btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            `).join("")}

        </div>


        <div class="cart-total">

            Total:
            ${formatPrice(getCartTotal())}

        </div>

    `;
}
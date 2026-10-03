/* =================================
   ShopSphere - Main Application
================================= */


// ================================
// Home Page
// ================================

function renderHome() {

    const app = document.getElementById("app");

    app.innerHTML = `

        <section class="hero">

            <div class="container">

                <h1>
                    Welcome to
                    <span>ShopSphere</span>
                </h1>

                <p>
                    Discover quality products at great prices.
                    Shop easily from one place.
                </p>

                <a
                    href="#/products"
                    class="btn"
                >
                    Explore Products
                </a>

            </div>

        </section>


        <section class="section">

            <div class="container">

                <div class="section-title">

                    <h2>
                        Featured Products
                    </h2>

                    <p>
                        Check out some of our popular products.
                    </p>

                </div>


                <div
                    id="product-grid"
                    class="product-grid"
                ></div>

            </div>

        </section>
    `;


    // Show first 4 products
    renderProducts(products.slice(0, 4));
}



// ================================
// Products Page
// ================================

function renderProductsPage() {

    const app = document.getElementById("app");

    app.innerHTML = `

        <section class="section">

            <div class="container">

                <div class="section-title">

                    <h2>
                        All Products
                    </h2>

                    <p>
                        Find the right product for you.
                    </p>

                </div>


                <!-- Search -->

                <div class="search-container">

                    <input
                        type="text"
                        id="search-input"
                        class="search-input"
                        placeholder="Search products..."
                    >

                </div>


                <!-- Filters -->

                <div class="filters">

                    <select
                        id="category-filter"
                        class="filter-select"
                    >

                        <option value="all">
                            All Categories
                        </option>

                        <option value="Electronics">
                            Electronics
                        </option>

                        <option value="Fashion">
                            Fashion
                        </option>

                        <option value="Home">
                            Home
                        </option>

                    </select>


                    <select
                        id="sort-select"
                        class="filter-select"
                    >

                        <option value="default">
                            Sort Products
                        </option>

                        <option value="low-high">
                            Price: Low to High
                        </option>

                        <option value="high-low">
                            Price: High to Low
                        </option>

                        <option value="name">
                            Name: A-Z
                        </option>

                    </select>

                </div>


                <!-- Products -->

                <div
                    id="product-grid"
                    class="product-grid"
                ></div>

            </div>

        </section>
    `;


    renderProducts();


    // Search event

    const searchInput =
        document.getElementById("search-input");

    searchInput.addEventListener(
        "input",
        function () {

            searchProducts(this.value);

        }
    );


    // Category event

    const categoryFilter =
        document.getElementById("category-filter");

    categoryFilter.addEventListener(
        "change",
        function () {

            filterProducts(this.value);

        }
    );


    // Sort event

    const sortSelect =
        document.getElementById("sort-select");

    sortSelect.addEventListener(
        "change",
        function () {

            sortProducts(this.value);

        }
    );
}



// ================================
// Product Details
// ================================

function renderProductDetails(productId) {

    const product =
        getProductById(productId);

    const app =
        document.getElementById("app");


    if (!product) {

        renderNotFound();

        return;

    }


    app.innerHTML = `

        <section class="section">

            <div class="container">

                <div class="product-card">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-image"
                    >

                    <div class="product-info">

                        <span class="product-category">
                            ${product.category}
                        </span>

                        <h1 class="product-name">
                            ${product.name}
                        </h1>

                        <p class="product-description">
                            ${product.description}
                        </p>

                        <h2 class="product-price">
                            ${formatPrice(product.price)}
                        </h2>

                        <br>

                        <button
                            class="btn"
                            onclick="addToCart(${product.id})"
                        >
                            Add to Cart
                        </button>

                        <a
                            href="#/products"
                            class="btn btn-secondary"
                        >
                            Back to Products
                        </a>

                    </div>

                </div>

            </div>

        </section>
    `;
}



// ================================
// Cart Page
// ================================

function renderCartPage() {

    const app =
        document.getElementById("app");

    app.innerHTML = `

        <section class="cart-container">

            <div class="section-title">

                <h2>
                    Your Shopping Cart
                </h2>

                <p>
                    Review your selected products.
                </p>

            </div>


            <div id="cart-container"></div>

        </section>
    `;


    renderCart();
}



// ================================
// About Page
// ================================

function renderAboutPage() {

    const app =
        document.getElementById("app");

    app.innerHTML = `

        <section class="section">

            <div class="container">

                <div class="section-title">

                    <h2>
                        About ShopSphere
                    </h2>

                    <p>
                        A modern e-commerce product catalog.
                    </p>

                </div>


                <div class="hero">

                    <p>
                        ShopSphere is a frontend web application
                        created to demonstrate modern web
                        development concepts such as
                        responsive design, client-side routing,
                        product filtering, shopping cart
                        functionality and performance optimization.
                    </p>

                </div>

            </div>

        </section>
    `;
}



// ================================
// 404 Page
// ================================

function renderNotFound() {

    const app =
        document.getElementById("app");

    app.innerHTML = `

        <section class="hero">

            <div class="container">

                <h1>
                    404
                </h1>

                <p>
                    Sorry, the page you're looking for
                    doesn't exist.
                </p>

                <a
                    href="#/"
                    class="btn"
                >
                    Go Home
                </a>

            </div>

        </section>
    `;
}



// ================================
// Dark Mode
// ================================

function setupTheme() {

    const themeButton =
        document.getElementById("theme-toggle");


    const savedTheme =
        localStorage.getItem("shopsphere-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeButton.textContent = "☀️";

    }


    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            if (isDark) {

                localStorage.setItem(
                    "shopsphere-theme",
                    "dark"
                );

                themeButton.textContent = "☀️";

            } else {

                localStorage.setItem(
                    "shopsphere-theme",
                    "light"
                );

                themeButton.textContent = "🌙";

            }

        }
    );
}



// ================================
// Start Application
// ================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupTheme();

        router();

    }
);
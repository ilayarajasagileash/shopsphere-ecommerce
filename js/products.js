/* =================================
   ShopSphere - Products
================================= */

// Create a product card
function createProductCard(product) {
    return `
        <article class="product-card">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
                loading="lazy"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <a
                        href="#/products/${product.id}"
                        class="btn"
                    >
                        View
                    </a>

                </div>

            </div>

        </article>
    `;
}


// Display products
function renderProducts(productList = products) {

    const productGrid = document.getElementById("product-grid");

    if (!productGrid) {
        return;
    }

    if (productList.length === 0) {

        productGrid.innerHTML = `
            <div class="empty-state">
                <h3>No products found</h3>
                <p>Try a different search or category.</p>
            </div>
        `;

        return;
    }

    productGrid.innerHTML = productList
        .map(createProductCard)
        .join("");
}


// Search products
function searchProducts(searchText) {

    const searchTerm = searchText
        .toLowerCase()
        .trim();

    const filteredProducts = products.filter(product => {

        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

    });

    renderProducts(filteredProducts);
}


// Filter products by category
function filterProducts(category) {

    if (category === "all") {
        renderProducts(products);
        return;
    }

    const filteredProducts = products.filter(product => {
        return product.category === category;
    });

    renderProducts(filteredProducts);
}


// Sort products
function sortProducts(sortType) {

    const sortedProducts = [...products];

    if (sortType === "low-high") {

        sortedProducts.sort((a, b) => {
            return a.price - b.price;
        });

    } else if (sortType === "high-low") {

        sortedProducts.sort((a, b) => {
            return b.price - a.price;
        });

    } else if (sortType === "name") {

        sortedProducts.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

    }

    renderProducts(sortedProducts);
}
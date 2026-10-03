/* =================================
   ShopSphere - Client Side Router
================================= */

function router() {

    const hash = window.location.hash || "#/";

    const path = hash.substring(1);

    const app = document.getElementById("app");

    if (!app) {
        return;
    }


    // Home
    if (path === "/" || path === "") {

        renderHome();

    }

    // Products
    else if (path === "/products") {

        renderProductsPage();

    }

    // Product details
    else if (path.startsWith("/products/")) {

        const productId =
            path.split("/")[2];

        renderProductDetails(productId);

    }

    // Cart
    else if (path === "/cart") {

        renderCartPage();

    }

    // About
    else if (path === "/about") {

        renderAboutPage();

    }

    // Page not found
    else {

        renderNotFound();

    }
}


// Listen for URL changes
window.addEventListener("hashchange", router);
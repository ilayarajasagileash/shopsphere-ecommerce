/* =================================
   ShopSphere - Utility Functions
================================= */

// Format price
function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
}


// Find product by ID
function getProductById(id) {
    return products.find(product => product.id === Number(id));
}


// Save data to localStorage
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


// Get data from localStorage
function getFromStorage(key, defaultValue = null) {
    const data = localStorage.getItem(key);

    if (data === null) {
        return defaultValue;
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        return defaultValue;
    }
}
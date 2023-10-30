import axios from 'axios';

const API_BASE_URL = 'https://my-json-server.typicode.com/rahulgupta24/typicodeDemo';

// Function to fetch products from the API and local storage
export const fetchProductsFromAPI = async () => {
    try {
        console.log('Fetching products from API...');

        // Fetch products from the API
        const response = await axios.get(`${API_BASE_URL}/products`);
        const apiProducts = response.data;
        console.log("apiProducts", apiProducts)
        // Fetch products from local storage
        const localProducts = JSON.parse(localStorage.getItem('products')) || [];
        console.log("localProducts", localProducts)
        console.log("mergeProducts(apiProducts, localProducts)", mergeProducts(apiProducts, localProducts))
        // Merge and return the products
        return mergeProducts(apiProducts, localProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// Function to merge products from the API and local storage, removing duplicates
const mergeProducts = (apiProducts, localProducts) => {
    const productMap = new Map();

    // Add API products to the map
    for (const product of apiProducts) {
        productMap.set(product.id, product);
    }

    // Add local products to the map, overwriting any duplicates from the API
    for (const product of localProducts) {
        productMap.set(product.id, product);
    }
    console.log("araay", Array.from(productMap.values()));
    // Convert the map back to an array of products
    return Array.from(productMap.values());
};

// Function to edit a product by sending a PUT request to the API
export const editProduct = async (productId, updatedProduct) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/products/${productId}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error('Error editing product:', error);
        throw error;
    }
};

// Function to delete a product by sending a DELETE request to the API
export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Function to add a new product by sending a POST request to the API and saving it to local storage
export const addProductToAPI = async (newProduct) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/products`, newProduct);
        // After successfully adding the product to the API, save it to local storage
        saveProductToLocalstorage(response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

// Function to save a product to local storage
const saveProductToLocalstorage = (product) => {
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    existingProducts.push(product);
    localStorage.setItem('products', JSON.stringify(existingProducts));
};

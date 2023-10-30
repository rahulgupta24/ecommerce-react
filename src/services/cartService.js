// cartService.js
const CART_STORAGE_KEY = 'cart';

// Simulate getting the current cart from local storage
const getCartFromLocalStorage = () => {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
};

// Simulate saving the cart to local storage
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Simulate adding a product to the cart
export const addToCart = (product) => {
    console.log("product", product)
    const cart = getCartFromLocalStorage();
    cart.push(product);
    saveCartToLocalStorage(cart);

    return Promise.resolve({ status: 'success' });
};

// Simulate removing a product from the cart
export const removeFromCart = (productId) => {
    const cart = getCartFromLocalStorage();
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCartToLocalStorage(updatedCart);

    return Promise.resolve({ status: 'success' });
};

// Simulate fetching the current cart
export const getCart = () => {
    return Promise.resolve(getCartFromLocalStorage());
};

// Simulate clearing the entire cart
export const clearCart = () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    return Promise.resolve({ status: 'success' });
};

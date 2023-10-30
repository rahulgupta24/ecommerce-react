//productActions.js
// Action types
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";

// Action creators
export const fetchProducts = (products) => {
    return {
        type: FETCH_PRODUCTS,
        payload: products,
    };
};

export const editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        payload: product,
    };
};

export const deleteProduct = (productId) => {
    return {
        type: DELETE_PRODUCT,
        payload: productId,
    };
};

export const addProduct = (product) => {
    console.log("product------", product)
    return {
        type: ADD_PRODUCT,
        payload: product,
    };
};


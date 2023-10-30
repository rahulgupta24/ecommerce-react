// productReducer.js
import { FETCH_PRODUCTS, EDIT_PRODUCT, DELETE_PRODUCT, ADD_PRODUCT } from '../actions/productActions';

const initialState = {
    products: [], // Array to store the list of products
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            if (!action.payload) {
                return state; // No products, return the current state
            }
            return {
                ...state,
                products: action.payload.map((product) => ({
                    ...product,
                    isEditing: false, // Initialize isEditing to false for each product
                })),
            };
        case EDIT_PRODUCT:
            const editedProduct = action.payload;
            if (!editedProduct) {
                return state; // No edited product, return the current state
            }
            const updatedProducts = state.products.map((product) => {
                if (product && product.id === editedProduct.id) {
                    return {
                        ...editedProduct,
                        isEditing: product.isEditing, // Preserve the isEditing flag
                    };
                }
                return product;
            });
            return {
                ...state,
                products: updatedProducts,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product) => product.id !== action.payload),
            };
        case ADD_PRODUCT:
            if (!action.payload) {
                return state; // No product to add, return the current state
            }
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        default:
            return state;
    }
};

export default productReducer;

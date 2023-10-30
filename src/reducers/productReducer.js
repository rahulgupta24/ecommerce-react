// productReducer.js
import { FETCH_PRODUCTS, EDIT_PRODUCT, DELETE_PRODUCT, ADD_PRODUCT } from '../actions/productActions';

const initialState = {
    products: [], // Array to store the list of products
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case EDIT_PRODUCT:
            const editedProduct = action.payload;
            const updatedProducts = state.products.map((product) => {
                if (product && product.id === editedProduct.id) {
                    return editedProduct;
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
            console.log("check>>>>")
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        default:
            return state;
    }
};

export default productReducer;

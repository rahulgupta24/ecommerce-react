import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/cartActions';

const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            if (!state || !state.cartItems) {
                return {
                    ...state,
                    cartItems: [action.payload],
                };
            }

            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

            if (existingItem) {
                return state;
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                };
            }
        case REMOVE_FROM_CART:
            if (!state || !state.cartItems) {
                return state;
            }

            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };
        case CLEAR_CART:
            return {
                ...state,
                cartItems: [],
            };
        default:
            return state;
    }
};

export default cartReducer;


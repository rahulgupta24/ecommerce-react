// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import cartReducer from '../reducers/cartReducer';
import productReducer from '../reducers/productReducer';
import thunk from 'redux-thunk';
import { persistConfig } from './persistConfig'; // Import the persistConfig without destructuring

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // Wrap the rootReducer

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };

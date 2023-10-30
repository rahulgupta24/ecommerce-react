// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { persistor } from './store/store'; // Import the store and persistor
import Navbar from './components/common/Navbar';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import AddProduct from './components/pages/AddProduct';
import ProductDetails from './components/pages/ProductDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </PersistGate>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;


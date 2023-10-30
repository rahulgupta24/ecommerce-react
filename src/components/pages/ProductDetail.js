import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { toast } from 'react-toastify'; // Import the toast library
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetail.css';

const ProductDetails = ({ products, cartItems, addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const selectedProduct = products.find((p) => p.id === id);
        setProduct(selectedProduct);
    }, [id, products]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCartClick = () => {
        // Check if the item is already in the cart
        const isItemInCart = cartItems.some((item) => item.id === product.id);

        if (isItemInCart) {
            // Display a notification using toastify
            toast.error('Product is already in the cart', {
                position: 'top-right',
                autoClose: 3000,
            });
        } else {
            addToCart(product);
            toast.success('Product added to the cart!', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button className="add-to-cart-button" onClick={handleAddToCartClick}>
                Add to Cart
            </button>
            <Link to="/" className="back-to-product-card-button">
                Back to Product Card
            </Link>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        cartItems: state.cart.cartItems,
    };
};

export default connect(mapStateToProps, { addToCart })(ProductDetails);

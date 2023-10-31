// ProductCard.js
import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { Link } from 'react-router-dom';
import './productCard.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onEdit, onDelete, cartItems, addToCart, onInputChange, onSave, onCancelEdit }) => {
    const handleDeleteClick = () => {
        if (product && product.id) {
            onDelete(product.id);
            toast.success(`${product.name} is deleted`, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    const handleAddToCartClick = () => {
        if (product && product.id) {
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
        }
    };

    const handleStartEditing = () => {
        onEdit(product);
    };

    const handleCancelEditing = () => {
        onCancelEdit(product);
    };

    return (
        <div className="product-card">
            <div className="product-details-container">
                <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-description-container">
                    {product.isEditing ? (
                        // Check if the product is in edit mode
                        // Display the editable fields
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={(e) => onInputChange('name', e.target.value)}
                            />
                            <input
                                type="text"
                                name="image"
                                value={product.image}
                                onChange={(e) => onInputChange('image', e.target.value)}
                            />
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={(e) => onInputChange('price', e.target.value)}
                            />
                            <button onClick={onSave}>Save</button>
                            <button onClick={handleCancelEditing}>Cancel</button>
                        </div>
                    ) : (
                        // Display the product details and buttons
                        <div>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <span className="product-price">${product.price}</span>
                            <div className="buttons-container">
                                <button className="edit-button" onClick={handleStartEditing}>
                                    <FontAwesomeIcon icon={faEdit} /> <br/>Edit
                                </button>
                                <button className="delete-button" onClick={handleDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                                <button className="add-to-cart-button" onClick={handleAddToCartClick}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                                </button>
                            </div>
                            <div className="view-details-container">
                                <Link to={`/product/${product.id}`} className="view-details-button">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
    };
};

export default connect(mapStateToProps, { addToCart })(ProductCard);

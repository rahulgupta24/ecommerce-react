import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart, clearCart } from '../../actions/cartActions';
import './Cart.css'
const Cart = ({ cartItems, removeFromCart, clearCart }) => {
    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        <div className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="cart-item-details">
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                          
                        </div>
                    </li>
                ))}
            </ul>
            <p>
                Total Price: ${cartItems.reduce((total, item) => total + item.price, 0)}
            </p>
            <button onClick={() => clearCart()}>Clear Cart</button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
    };
};

export default connect(mapStateToProps, { removeFromCart, clearCart })(Cart);

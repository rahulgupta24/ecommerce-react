// EditProduct.js
import React, { useState } from 'react';
import './EditProduct.css'; // Import the associated CSS file

const EditProduct = ({ product, onSave, onCancel }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedProduct);
        
    };

    return (
        <div className="edit-product">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={editedProduct.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={editedProduct.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={editedProduct.image}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="buttons">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;

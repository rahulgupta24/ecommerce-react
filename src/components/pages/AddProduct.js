import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct } from '../../actions/productActions'; // Import the addProduct action
import { addProductToAPI } from '../../services/productService';
import './AddProduct.css';

const AddProduct = ({ addProduct }) => {
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0 });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting new product:', newProduct);

        // Call addProductToAPI to add the new product to the API
        addProductToAPI(newProduct)
            .then((response) => {
                console.log('Product added:', response);

                // Dispatch the addProduct action to update the store
                addProduct(response); // Use response directly, no need to access response.data
            })
            .catch((error) => {
                console.error('Error adding product:', error);
            });
    };

    return (
        <div className="add-product">
            <h2>Add a New Product</h2>
            <form onSubmit={handleSubmit}>
                {/* id: '14', name: 'Speakers', image: 'https://images.pexels.com/photos/6368902/pexels-ph…jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', price: 2999, category: 'electric' */}
                <input type="text" name="name" placeholder="Product Name" onChange={handleInputChange} />
                <input type="text" name="image" placeholder="image url" onChange={handleInputChange} />
                <input type="number" name="price" placeholder="Price" onChange={handleInputChange} />
                <input type="text" name="category" placeholder="Category" onChange={handleInputChange} />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default connect(null, (dispatch) => bindActionCreators({ addProduct }, dispatch))(AddProduct);

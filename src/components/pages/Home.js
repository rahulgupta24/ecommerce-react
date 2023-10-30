// Home.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProductCard from '../common/productCard';
import { fetchProducts, editProduct, deleteProduct } from '../../actions/productActions';
import { fetchProductsFromAPI, editProduct as editProductAPI, deleteProduct as deleteProductAPI } from '../../services/productService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const Home = ({ products, fetchProducts, editProduct, deleteProduct }) => {
    const [sorting, setSorting] = useState(false);
    const [sortedProducts, setSortedProducts] = useState(products);
    const [editing, setEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});


        useEffect(() => {
            console.log('Fetching products...');
            fetchProductsFromAPI()
                .then((response) => {
                    console.log('API Response:', response);
                    fetchProducts(response); // Pass the array of products directly
                    // Additional logging to check products data
                    console.log('Products:', response);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }, [fetchProducts]);

    const handleEditClick = (product) => {
        setEditing(true);
        setEditedProduct(product);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setEditedProduct({});
    };

    const handleInputChange = (name, value) => {
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
    };

    const handleEdit = () => {
        editProductAPI(editedProduct.id, editedProduct)
            .then((response) => {
                toast.success('Product is Edited', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                console.log('Product edited:', response);
                editProduct(response.data);
                setEditing(false);
                setEditedProduct({});
            })
            .catch((error) => {
                console.error('Error editing product:', error);
            });
    };

    function handleDelete(productId) {
        deleteProductAPI(productId)
            .then((response) => {
                console.log('Product deleted:', response);
                deleteProduct(productId);
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
            });
    }

    useEffect(() => {
        if (sorting) {
            const sorted = [...products].sort((a, b) => a.price - b.price);
            setSortedProducts(sorted);
        } else {
            setSortedProducts([...products]); // Create a new copy of the original products array
        }
    }, [products, sorting]);


    // Additional logging to check the contents of sortedProducts
    console.log('Sorted Products:', sortedProducts);

    return (
        <div className="home">
            <h1>Welcome to the E-commerce Store</h1>
            {sorting ? (
                <button onClick={() => setSorting(false)} className="close-button">
                    &#10005; Close Sorting
                </button>
            ) : (
                <button onClick={() => setSorting(true)}>
                    {sorting ? 'Close Sorting' : 'Sort Products'}
                </button>
            )}
            <div className="product-list">
                {sortedProducts &&
                    sortedProducts.map((product) => (
                       
                        <ProductCard
                            key={product.id}
                            product={product} // Pass the product, not editedProduct
                            onEdit={handleEditClick}
                            onDelete={() => handleDelete(product.id)}
                            editing={editing}
                            onInputChange={handleInputChange}
                            onSave={handleEdit}
                            onCancelEdit={handleCancelEdit}
                        />

                    ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
    };
};

export default connect(mapStateToProps, { fetchProducts, editProduct, deleteProduct })(Home);

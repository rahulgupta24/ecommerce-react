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
        const updatedProducts = sortedProducts.map((p) => {
            if (p.id === product.id) {
                return { ...p, isEditing: true };
            } else {
                return { ...p, isEditing: false };
            }
        });
        setSortedProducts(updatedProducts);
    };

    const handleCancelEdit = (product) => {
        const updatedProducts = sortedProducts.map((p) => {
            if (p.id === product.id) {
                return { ...p, isEditing: false };
            }
            return p;
        });
        setSortedProducts(updatedProducts);
    };

    const handleInputChange = (name, value, product) => {
        const updatedProducts = sortedProducts.map((p) => {
            if (p.id === product.id) {
                return { ...p, [name]: value };
            }
            return p;
        });
        setSortedProducts(updatedProducts);
    };

    const handleEdit = (product) => {
        editProductAPI(product.id, product)
            .then((response) => {
                toast.success('Product is Edited', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                console.log('Product edited:', response);
                editProduct(response.data);
                handleCancelEdit(product);
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

    // Sort the products when sorting changes
    useEffect(() => {
        if (sorting) {
            const sorted = [...products].sort((a, b) => a.price - b.price);
            setSortedProducts(sorted);
        } else {
            setSortedProducts(products); // Reset the sortedProducts when sorting is turned off
        }
    }, [sorting, products]); // Include products as a dependency


    return (
        <div className="home">
            <h1>Welcome to the E-commerce Store</h1>
            {sorting ? (
                <button onClick={() => setSorting(false)} className="close-button">
                    &#10005; Close Sorting
                </button>
            ) : (
                <button onClick={() => setSorting(true)}>Sort Products</button>
            )}
            <div className="product-list">
                {sortedProducts &&
                    sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={handleEditClick}
                            onDelete={() => handleDelete(product.id)}
                            onInputChange={(name, value) => handleInputChange(name, value, product)}
                            onSave={() => handleEdit(product)}
                            onCancelEdit={() => handleCancelEdit(product)}
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

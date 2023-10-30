import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import './ProductDetail.css';

const ProductDetails = ({ products }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const selectedProduct = products.find((p) => p.id === id);
        setProduct(selectedProduct);
    }, [id, products]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Add more product details here */}
            <Link to="/" className="back-to-product-card-button">
                Back to Product Card
            </Link>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
    };
};

export default connect(mapStateToProps)(ProductDetails);

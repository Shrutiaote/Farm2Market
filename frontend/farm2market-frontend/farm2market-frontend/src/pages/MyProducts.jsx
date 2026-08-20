import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./MyProducts.css";

function MyProducts() {

    const navigate = useNavigate();

    const defaultProducts = [
        {
            id: 1,
            name: "Fresh Tomatoes",
            category: "Vegetables",
            price: 40,
            quantity: 50,
            image: "/products/tomatoes.webp",
            status: "AVAILABLE"
        },
        {
            id: 2,
            name: "Organic Wheat",
            category: "Grains",
            price: 45,
            quantity: 100,
            image: "/products/wheat1.jpg",
            status: "AVAILABLE"
        },
        {
            id: 3,
            name: "Red Apples",
            category: "Fruits",
            price: 120,
            quantity: 30,
            image: "/products/apples.jpg",
            status: "AVAILABLE"
        },
        {
            id: 4,
            name: "Fresh Potatoes",
            category: "Vegetables",
            price: 35,
            quantity: 80,
            image: "/products/potatoes.webp",
            status: "AVAILABLE"
        }
    ];


    // Load products from localStorage
    const [products, setProducts] = useState(() => {

        const savedProducts =
            localStorage.getItem("farm2market_products");

        if (savedProducts) {
            return JSON.parse(savedProducts);
        }

        localStorage.setItem(
            "farm2market_products",
            JSON.stringify(defaultProducts)
        );

        return defaultProducts;
    });


    const availableProducts = products.filter(
        product => product.status === "AVAILABLE"
    );


    const totalQuantity = products.reduce(
        (total, product) => total + product.quantity,
        0
    );


    return (

        <div className="my-products-page">


            {/* Header */}

            <div className="products-header">

                <div>

                    <h1>
                        My Products
                    </h1>

                    <p>
                        Manage the products you are selling on Farm2Market.
                    </p>

                </div>


                <Link
                    to="/farmer/add-product"
                    className="add-product-button"
                >
                    + Add Product
                </Link>

            </div>


            {/* Statistics */}

            <div className="product-statistics">


                <div className="product-stat-card">

                    <span className="stat-icon">
                        📦
                    </span>

                    <div>

                        <p>
                            Total Products
                        </p>

                        <h2>
                            {products.length}
                        </h2>

                    </div>

                </div>


                <div className="product-stat-card">

                    <span className="stat-icon">
                        🌱
                    </span>

                    <div>

                        <p>
                            Available
                        </p>

                        <h2>
                            {availableProducts.length}
                        </h2>

                    </div>

                </div>


                <div className="product-stat-card">

                    <span className="stat-icon">
                        ⚖️
                    </span>

                    <div>

                        <p>
                            Total Quantity
                        </p>

                        <h2>
                            {totalQuantity} kg
                        </h2>

                    </div>

                </div>

            </div>


            {/* Products */}

            <div className="products-grid">

                {products.map(product => (

                    <div
                        className="product-card"
                        key={product.id}
                    >


                        {/* Product Image */}

                        <div className="product-card-image">

                            <img
                                src={product.image}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />

                            <span className="product-status">
                                {product.status}
                            </span>

                        </div>


                        {/* Product Information */}

                        <div className="product-card-content">


                            <span className="product-category">
                                {product.category}
                            </span>


                            <h2>
                                {product.name}
                            </h2>


                            <div className="product-price">

                                ₹{product.price}

                                <span>
                                    / kg
                                </span>

                            </div>


                            <p className="product-quantity">

                                Available Quantity:

                                <strong>
                                    {product.quantity} kg
                                </strong>

                            </p>


                            {/* Buttons */}

                            <div className="product-actions">


                                {/* Edit */}

                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        navigate(
                                            "/farmer/edit-product",
                                            {
                                                state: {
                                                    product: product
                                                }
                                            }
                                        )
                                    }
                                >
                                    ✏ Edit
                                </button>


                                {/* Delete */}

                                <button
                                    className="delete-button"
                                    onClick={() => {

                                        const updatedProducts =
                                            products.filter(
                                                item =>
                                                    item.id !== product.id
                                            );

                                        setProducts(updatedProducts);

                                        localStorage.setItem(
                                            "farm2market_products",
                                            JSON.stringify(
                                                updatedProducts
                                            )
                                        );

                                    }}
                                >
                                    🗑 Delete
                                </button>


                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default MyProducts;
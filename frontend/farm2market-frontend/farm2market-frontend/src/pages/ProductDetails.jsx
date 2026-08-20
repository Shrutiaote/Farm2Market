import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ProductDetails.css";

function ProductDetails() {

    const location = useLocation();
    const navigate = useNavigate();

    const product = location.state?.product;

    const [quantity, setQuantity] = useState(1);

    // If product was not passed
    if (!product) {

        return (
            <div className="product-details-empty">

                <h2>Product not found</h2>

                <button
                    onClick={() => navigate("/buyer/marketplace")}
                >
                    ← Back to Marketplace
                </button>

            </div>
        );
    }


    const increaseQuantity = () => {

        if (quantity < product.quantity) {
            setQuantity(quantity + 1);
        }

    };


    const decreaseQuantity = () => {

        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    };


    const totalPrice = product.price * quantity;


    const handleAddToCart = () => {

        const existingCart =
            JSON.parse(
                localStorage.getItem("farm2market_cart")
            ) || [];


        const existingProductIndex =
            existingCart.findIndex(
                item => item.id === product.id
            );


        if (existingProductIndex !== -1) {

            existingCart[existingProductIndex].quantity += quantity;

        } else {

            existingCart.push({
                    ...product,
                   quantity: quantity,
                 availableQuantity: product.quantity
           });

        }


        localStorage.setItem(
            "farm2market_cart",
            JSON.stringify(existingCart)
        );


        alert("Product added to cart!");

    };


    return (

        <div className="product-details-page">

            {/* Header */}

            <div className="product-details-header">

                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/buyer/marketplace")
                    }
                >
                    ← Back to Marketplace
                </button>

            </div>


            {/* Product */}

            <div className="product-details-container">


                {/* Image */}

                <div className="product-details-image">

                    <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />

                </div>


                {/* Information */}

                <div className="product-details-info">

                    <span className="details-category">
                        {product.category}
                    </span>


                    <h1>
                        {product.name}
                    </h1>


                    <div className="details-price">

                        ₹{product.price}

                        <span>
                            / kg
                        </span>

                    </div>


                    <p className="details-description">

                        {product.description ||
                            "Fresh agricultural product directly from the farmer. Quality produce carefully grown and supplied through Farm2Market."}

                    </p>


                    {/* Availability */}

                    <div className="availability">

                        <span className="availability-dot">
                            ●
                        </span>

                        {product.quantity} kg available

                    </div>


                    {/* Quantity */}

                    <div className="quantity-section">

                        <label>
                            Quantity
                        </label>


                        <div className="quantity-control">

                            <button
                                onClick={decreaseQuantity}
                            >
                                −
                            </button>


                            <span>
                                {quantity}
                            </span>


                            <button
                                onClick={increaseQuantity}
                            >
                                +
                            </button>

                        </div>

                    </div>


                    {/* Total */}

                    <div className="purchase-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹{totalPrice}
                        </strong>

                    </div>


                    {/* Buttons */}

                    <div className="product-details-actions">

                        <button
                            className="add-cart-button"
                            onClick={handleAddToCart}
                        >
                            🛒 Add to Cart
                        </button>


                        <button
                            className="buy-now-button"
                            onClick={() => {

                                handleAddToCart();

                                navigate("/buyer/cart");

                            }}
                        >
                            Buy Now
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default ProductDetails;
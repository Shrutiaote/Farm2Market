import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    // Load cart from localStorage
    useEffect(() => {

        const savedCart =
            JSON.parse(
                localStorage.getItem("farm2market_cart")
            ) || [];

        setCart(savedCart);

    }, []);


    // Update localStorage
    const updateCart = (updatedCart) => {

        setCart(updatedCart);

        localStorage.setItem(
            "farm2market_cart",
            JSON.stringify(updatedCart)
        );

    };


    // Increase quantity
    const increaseQuantity = (id) => {

        const updatedCart = cart.map(item => {

            if (item.id === id) {

                if (item.quantity < item.availableQuantity) {

                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };

                }

            }

            return item;

        });

        updateCart(updatedCart);

    };


    // Decrease quantity
    const decreaseQuantity = (id) => {

        const updatedCart = cart.map(item => {

            if (item.id === id) {

                if (item.quantity > 1) {

                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };

                }

            }

            return item;

        });

        updateCart(updatedCart);

    };


    // Remove product
    const removeProduct = (id) => {

        const updatedCart =
            cart.filter(item => item.id !== id);

        updateCart(updatedCart);

    };


    // Calculate subtotal
    const subtotal = cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );


    const deliveryCharge =
        cart.length > 0 ? 0 : 0;


    const total =
        subtotal + deliveryCharge;


    return (

        <div className="cart-page">

            {/* Header */}

            <header className="cart-header">

                <div>

                    <h1>
                        🛒 My Cart
                    </h1>

                    <p>
                        Review your selected products before checkout.
                    </p>

                </div>


                <Link
                    to="/buyer/marketplace"
                    className="continue-shopping"
                >
                    ← Continue Shopping
                </Link>

            </header>


            {/* Empty Cart */}

            {cart.length === 0 ? (

                <div className="empty-cart">

                    <div className="empty-cart-icon">
                        🛒
                    </div>

                    <h2>
                        Your cart is empty
                    </h2>

                    <p>
                        Add some fresh products from the marketplace.
                    </p>

                    <Link
                        to="/buyer/marketplace"
                        className="shop-now-button"
                    >
                        Shop Now →
                    </Link>

                </div>

            ) : (

                <div className="cart-container">


                    {/* Cart Items */}

                    <div className="cart-items">

                        <div className="cart-items-header">

                            <h2>
                                Cart Items
                            </h2>

                            <span>
                                {cart.length} product(s)
                            </span>

                        </div>


                        {cart.map(item => (

                            <div
                                className="cart-item"
                                key={item.id}
                            >


                                {/* Image */}

                                <div className="cart-item-image">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                </div>


                                {/* Information */}

                                <div className="cart-item-info">

                                    <span className="cart-category">
                                        {item.category}
                                    </span>

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        ₹{item.price} / kg
                                    </p>


                                    {/* Quantity */}

                                    <div className="cart-quantity">

                                        <button
                                            onClick={() =>
                                                decreaseQuantity(item.id)
                                            }
                                        >
                                            −
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(item.id)
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                </div>


                                {/* Price */}

                                <div className="cart-item-right">

                                    <strong>
                                        ₹{item.price * item.quantity}
                                    </strong>

                                    <button
                                        className="remove-cart-button"
                                        onClick={() =>
                                            removeProduct(item.id)
                                        }
                                    >
                                        🗑 Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* Summary */}

                    <div className="cart-summary">

                        <h2>
                            Order Summary
                        </h2>


                        <div className="summary-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹{subtotal}
                            </strong>

                        </div>


                        <div className="summary-row">

                            <span>
                                Delivery
                            </span>

                            <strong className="free">
                                FREE
                            </strong>

                        </div>


                        <div className="summary-divider"></div>


                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹{total}
                            </strong>

                        </div>


                        <button
                            className="checkout-button"
                            onClick={() =>
                                navigate("/buyer/checkout")
                            }
                        >
                            Proceed to Checkout →
                        </button>


                        <Link
                            to="/buyer/marketplace"
                            className="summary-shopping"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Cart;
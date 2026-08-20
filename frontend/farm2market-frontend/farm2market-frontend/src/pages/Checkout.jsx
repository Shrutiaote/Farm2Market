import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {

    const navigate = useNavigate();

    const cart =
        JSON.parse(
            localStorage.getItem("farm2market_cart")
        ) || [];

    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {

        setCustomer({
            ...customer,
            [event.target.name]: event.target.value
        });

    };


    const subtotal = cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );


    const deliveryCharge = 0;

    const total =
        subtotal + deliveryCharge;


    const handlePlaceOrder = (event) => {

        event.preventDefault();

        if (cart.length === 0) {

            setMessage("Your cart is empty.");

            return;
        }


        const existingOrders =
            JSON.parse(
                localStorage.getItem("farm2market_buyer_orders")
            ) || [];


        const newOrder = {

            id: Date.now(),

            customer: customer,

            products: cart,

            subtotal: subtotal,

            deliveryCharge: deliveryCharge,

            total: total,

            status: "Pending",

            date: new Date().toLocaleDateString(),

            time: new Date().toLocaleTimeString()

        };


        existingOrders.push(newOrder);


        localStorage.setItem(
            "farm2market_buyer_orders",
            JSON.stringify(existingOrders)
        );


        // Clear cart

        localStorage.removeItem(
            "farm2market_cart"
        );


        alert("Order placed successfully!");


        navigate("/buyer/orders");

    };


    if (cart.length === 0) {

        return (

            <div className="checkout-empty">

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add products before proceeding to checkout.
                </p>

                <Link
                    to="/buyer/marketplace"
                    className="checkout-shop-button"
                >
                    Go to Marketplace
                </Link>

            </div>

        );

    }


    return (

        <div className="checkout-page">


            {/* Header */}

            <div className="checkout-header">

                <div>

                    <h1>
                        Checkout
                    </h1>

                    <p>
                        Enter your delivery details and place your order.
                    </p>

                </div>


                <Link
                    to="/buyer/cart"
                    className="back-cart-button"
                >
                    ← Back to Cart
                </Link>

            </div>


            <div className="checkout-container">


                {/* Delivery Details */}

                <div className="checkout-card">

                    <h2>
                        Delivery Details
                    </h2>

                    <p className="checkout-subtitle">
                        Where should we deliver your order?
                    </p>


                    <form
                        className="checkout-form"
                        onSubmit={handlePlaceOrder}
                    >


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={customer.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={customer.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required
                                />

                            </div>

                        </div>


                        <div className="form-group">

                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={customer.address}
                                onChange={handleChange}
                                placeholder="Enter your complete address"
                                rows="4"
                                required
                            />

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={customer.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Pincode
                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    value={customer.pincode}
                                    onChange={handleChange}
                                    placeholder="Enter pincode"
                                    required
                                />

                            </div>

                        </div>


                        {message && (

                            <p className="checkout-message">
                                {message}
                            </p>

                        )}


                        <button
                            type="submit"
                            className="place-order-button"
                        >
                            Place Order →
                        </button>

                    </form>

                </div>


                {/* Order Summary */}

                <div className="checkout-summary">

                    <h2>
                        Order Summary
                    </h2>


                    <div className="checkout-products">

                        {cart.map(item => (

                            <div
                                className="checkout-product"
                                key={item.id}
                            >

                                <div>

                                    <h4>
                                        {item.name}
                                    </h4>

                                    <p>
                                        {item.quantity} kg × ₹{item.price}
                                    </p>

                                </div>

                                <strong>
                                    ₹{item.price * item.quantity}
                                </strong>

                            </div>

                        ))}

                    </div>


                    <div className="checkout-divider"></div>


                    <div className="checkout-summary-row">

                        <span>
                            Subtotal
                        </span>

                        <strong>
                            ₹{subtotal}
                        </strong>

                    </div>


                    <div className="checkout-summary-row">

                        <span>
                            Delivery
                        </span>

                        <strong className="free">
                            FREE
                        </strong>

                    </div>


                    <div className="checkout-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹{total}
                        </strong>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Checkout;
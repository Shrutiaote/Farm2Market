import { useState } from "react";
import { Link } from "react-router-dom";
import "./BuyerOrders.css";

function BuyerOrders() {

    const [orders, setOrders] = useState(() => {

        return JSON.parse(
            localStorage.getItem("farm2market_buyer_orders")
        ) || [];

    });


    const getStatusClass = (status) => {

        return status
            .toLowerCase()
            .replace(" ", "-");

    };


    return (

        <div className="buyer-orders-page">


            {/* Header */}

            <div className="buyer-orders-header">

                <div>

                    <h1>
                        My Orders
                    </h1>

                    <p>
                        Track the products you have ordered.
                    </p>

                </div>


                <Link
                    to="/buyer/marketplace"
                    className="orders-marketplace-button"
                >
                    ← Marketplace
                </Link>

            </div>


            {/* Orders */}

            {orders.length === 0 ? (

                <div className="no-orders">

                    <div className="no-orders-icon">
                        📦
                    </div>

                    <h2>
                        No Orders Yet
                    </h2>

                    <p>
                        You haven't placed any orders yet.
                    </p>

                    <Link
                        to="/buyer/marketplace"
                        className="start-shopping-button"
                    >
                        Start Shopping →
                    </Link>

                </div>

            ) : (

                <div className="buyer-orders-list">

                    {orders.map(order => (

                        <div
                            className="buyer-order-card"
                            key={order.id}
                        >


                            {/* Order Header */}

                            <div className="buyer-order-top">

                                <div>

                                    <h2>
                                        Order #{order.id}
                                    </h2>

                                    <p>
                                        {order.date} • {order.time}
                                    </p>

                                </div>


                                <span
                                    className={`buyer-order-status ${getStatusClass(order.status)}`}
                                >
                                    {order.status}
                                </span>

                            </div>


                            {/* Products */}

                            <div className="buyer-order-products">

                                {order.products.map((product, index) => (

                                    <div
                                        className="buyer-order-product"
                                        key={`${product.id}-${index}`}
                                    >

                                        <div className="buyer-order-image">

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                            />

                                        </div>


                                        <div className="buyer-order-product-info">

                                            <h3>
                                                {product.name}
                                            </h3>

                                            <p>
                                                {product.category}
                                            </p>

                                            <span>
                                                {product.quantity} kg × ₹{product.price}
                                            </span>

                                        </div>


                                        <strong>
                                            ₹{product.quantity * product.price}
                                        </strong>

                                    </div>

                                ))}

                            </div>


                            {/* Delivery */}

                            <div className="buyer-order-delivery">

                                <div>

                                    <span>
                                        📍 Delivery Address
                                    </span>

                                    <p>
                                        {order.customer.address},
                                        {" "}
                                        {order.customer.city}
                                        {" - "}
                                        {order.customer.pincode}
                                    </p>

                                </div>

                            </div>


                            {/* Bottom */}

                            <div className="buyer-order-bottom">

                                <span>
                                    Total Amount
                                </span>

                                <strong>
                                    ₹{order.total}
                                </strong>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default BuyerOrders;
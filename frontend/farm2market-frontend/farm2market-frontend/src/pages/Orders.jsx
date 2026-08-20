import { Link } from "react-router-dom";
import "./Orders.css";

function Orders() {

    const orders = [
        {
            id: "1001",
            customer: "Rahul Sharma",
            product: "Fresh Tomatoes",
            quantity: 20,
            price: 40,
            total: 800,
            date: "2 Apr 2024",
            time: "10:30 AM",
            status: "Delivered"
        },
        {
            id: "1002",
            customer: "Priya Patil",
            product: "Organic Wheat",
            quantity: 30,
            price: 45,
            total: 1350,
            date: "2 Apr 2024",
            time: "11:45 AM",
            status: "Processing"
        },
        {
            id: "1003",
            customer: "Amit Joshi",
            product: "Red Apples",
            quantity: 5,
            price: 120,
            total: 600,
            date: "1 Apr 2024",
            time: "04:20 PM",
            status: "Shipped"
        },
        {
            id: "1004",
            customer: "Sneha Deshmukh",
            product: "Fresh Potatoes",
            quantity: 25,
            price: 35,
            total: 875,
            date: "1 Apr 2024",
            time: "02:15 PM",
            status: "Pending"
        }
    ];


    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        order => order.status === "Pending"
    ).length;

    const processingOrders = orders.filter(
        order => order.status === "Processing"
    ).length;

    const totalRevenue = orders.reduce(
        (total, order) => total + order.total,
        0
    );


    return (

        <div className="orders-page">

            {/* Header */}

            <div className="orders-header">

                <div>

                    <h1>
                        Orders
                    </h1>

                    <p>
                        Manage orders received from customers.
                    </p>

                </div>

                <Link
                    to="/farmer/dashboard"
                    className="back-dashboard-button"
                >
                    ← Dashboard
                </Link>

            </div>


            {/* Statistics */}

            <div className="orders-statistics">

                <div className="order-stat-card">

                    <span>
                        🛍
                    </span>

                    <div>

                        <p>Total Orders</p>

                        <h2>
                            {totalOrders}
                        </h2>

                    </div>

                </div>


                <div className="order-stat-card">

                    <span>
                        ⏳
                    </span>

                    <div>

                        <p>Pending</p>

                        <h2>
                            {pendingOrders}
                        </h2>

                    </div>

                </div>


                <div className="order-stat-card">

                    <span>
                        📦
                    </span>

                    <div>

                        <p>Processing</p>

                        <h2>
                            {processingOrders}
                        </h2>

                    </div>

                </div>


                <div className="order-stat-card">

                    <span>
                        ₹
                    </span>

                    <div>

                        <p>Total Revenue</p>

                        <h2>
                            ₹{totalRevenue}
                        </h2>

                    </div>

                </div>

            </div>


            {/* Orders Table */}

            <div className="orders-card">

                <div className="orders-card-header">

                    <div>

                        <h2>
                            Recent Orders
                        </h2>

                        <p>
                            Orders received from your customers
                        </p>

                    </div>

                </div>


                <div className="orders-table-wrapper">

                    <table className="orders-table">

                        <thead>

                            <tr>

                                <th>
                                    Order
                                </th>

                                <th>
                                    Customer
                                </th>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Quantity
                                </th>

                                <th>
                                    Total
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {orders.map(order => (

                                <tr key={order.id}>

                                    <td>
                                        <strong>
                                            #{order.id}
                                        </strong>
                                    </td>


                                    <td>
                                        {order.customer}
                                    </td>


                                    <td>
                                        {order.product}
                                    </td>


                                    <td>
                                        {order.quantity} kg
                                    </td>


                                    <td>
                                        <strong className="order-total">
                                            ₹{order.total}
                                        </strong>
                                    </td>


                                    <td>

                                        <div className="order-date">

                                            <span>
                                                {order.date}
                                            </span>

                                            <small>
                                                {order.time}
                                            </small>

                                        </div>

                                    </td>


                                    <td>

                                        <span
                                            className={`order-status ${order.status.toLowerCase()}`}
                                        >
                                            {order.status}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default Orders;
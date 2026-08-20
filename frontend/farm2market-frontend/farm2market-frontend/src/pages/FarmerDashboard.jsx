import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function FarmerDashboard() {

    const navigate = useNavigate();

const [farmer] = useState(() => {

    const savedFarmer =
        localStorage.getItem("farm2market_farmer");

    if (savedFarmer) {
        return JSON.parse(savedFarmer);
    }

    return {
        name: "Farmer",
        email: "farmer@example.com",
        phone: "9876543210",
        address: "Nagpur, Maharashtra"
    };

});

    const [products] = useState(() => {

    const savedProducts =
        localStorage.getItem("farm2market_products");

    if (savedProducts) {
        return JSON.parse(savedProducts);
    }

    return [];
});

const activeProducts = products.filter(
    product => product.status === "AVAILABLE"
);

    return (

        <div className="farmer-dashboard">

            {/* ================= SIDEBAR ================= */}

            <aside className="dashboard-sidebar">

                <div className="brand">

                    <div className="brand-icon">
                        🌱
                    </div>

                    <div>
                        <h2>Farm2Market</h2>
                        <p>Bringing Farmers to the Market</p>
                    </div>

                </div>


                <nav className="sidebar-menu">

                    <Link
                        to="/farmer/dashboard"
                        className="sidebar-link active"
                    >
                        <span>⌂</span>
                        Dashboard
                    </Link>


                    <Link
                        to="/farmer/my-products"
                        className="sidebar-link"
                    >
                        <span>▣</span>
                        My Products
                    </Link>


                    <Link
                        to="/farmer/add-product"
                        className="sidebar-link"
                    >
                        <span>＋</span>
                        Add Product
                    </Link>


                   <Link to="/farmer/orders" className="sidebar-link">
                    <span>🛍</span> Orders
                   </Link>


                   <Link to="/farmer/settings" className="sidebar-link">
                     <span>⚙</span>
                       Settings
                   </Link>

                </nav>


                {/* Farmer profile */}

                <div className="sidebar-bottom">

                    <div className="farmer-profile">

                        <div className="farmer-avatar">
                            👨‍🌾
                        </div>

                        <div>
                            <p>Welcome,</p>
                            <h4>{farmer.name}</h4>
                            <span>Farmer</span>
                        </div>

                    </div>


                    <button className="logout-button" onClick={() => {

                       localStorage.removeItem("farm2market_loggedIn");

                        navigate("/login");

          }}>

                   <span>↪</span>

                     Logout

                   </button>

                </div>

            </aside>



            {/* ================= MAIN CONTENT ================= */}

            <main className="dashboard-main">


                {/* Top bar */}

                <header className="dashboard-header">

                    <div className="search-box">

                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search products, orders, customers..."
                        />

                    </div>


                    <div className="header-right">

                        <button className="notification-button">
                            🔔
                            <span className="notification-count">
                                3
                            </span>
                        </button>


                        <div className="header-profile">

                            <div className="header-avatar">
                                👨‍🌾
                            </div>

                            <div>
                               <strong>{farmer.name}</strong>
                               <small>Farmer</small>
                            </div>

                            <span>⌄</span>

                        </div>

                    </div>

                </header>



                {/* ================= SUMMARY CARDS ================= */}

                <section className="summary-cards">


                   <Link to="/farmer/my-products" className="summary-card">

                   <div className="summary-icon green">
                     🌱
                   </div>

                  <div className="summary-info">

                  <p> My Products </p>

                  <h2> {products.length} </h2>

                <span> Active Products </span>

             </div>

             <div className="summary-arrow">
                →
            </div>

            </Link>



                    <div className="summary-card">

                        <div className="summary-icon orange">
                            🛍
                        </div>

                        <div className="summary-info">

                            <p>Orders</p>

                            <h2>18</h2>

                            <span className="orange-text">
                                Total Orders
                            </span>

                        </div>

                        <div className="summary-arrow">
                            →
                        </div>

                    </div>



                    <div className="summary-card">

                        <div className="summary-icon green">
                            ₹
                        </div>

                        <div className="summary-info">

                            <p>Revenue</p>

                            <h2>₹24,500</h2>

                            <span>
                                Total Earnings
                            </span>

                        </div>

                        <div className="summary-arrow">
                            →
                        </div>

                    </div>



                    <div className="summary-card">

                        <div className="summary-icon blue">
                            👥
                        </div>

                        <div className="summary-info">

                            <p>Customers</p>

                            <h2>15</h2>

                            <span className="blue-text">
                                Total Customers
                            </span>

                        </div>

                        <div className="summary-arrow">
                            →
                        </div>

                    </div>

                </section>



                {/* ================= FARMER QUOTE ================= */}

                <section className="farmer-quote">

                    <div className="quote-decoration">
                        🌾
                    </div>


                    <div className="quote-farmer">
                        👨‍🌾
                    </div>


                    <div className="quote-content">

                        <div className="quote-mark">
                            “
                        </div>

                        <h1>
                            A farmer doesn't just grow crops,
                            <br />
                            he grows our future.
                        </h1>

                        <p>
                            Let's respect, support and empower
                            <br />
                            those who feed the world.
                        </p>

                    </div>


                    <div className="quote-decoration right">
                        🌿
                    </div>

                </section>



                {/* ================= LOWER DASHBOARD ================= */}

                <section className="dashboard-grid">


                    {/* Recent Products */}

                    <div className="dashboard-card">

                        <div className="card-header">

                            <div>
                                <h3>Recent Products</h3>
                                <p>Recently added products</p>
                            </div>

                            <Link to="/farmer/my-products">
                                View All →
                            </Link>

                        </div>


                        <div className="recent-products">


                            <div className="recent-product">

                                <div className="product-image tomato">
                                    🍅
                                </div>

                                <div className="product-info">

                                    <h4>Fresh Tomatoes</h4>

                                    <p>Vegetables</p>

                                    <span>
                                        ₹40 / kg &nbsp; • &nbsp; 50 kg
                                    </span>

                                </div>

                                <span className="available">
                                    AVAILABLE
                                </span>

                            </div>



                            <div className="recent-product">

                                <div className="product-image wheat">
                                    🌾
                                </div>

                                <div className="product-info">

                                    <h4>Organic Wheat</h4>

                                    <p>Grains</p>

                                    <span>
                                        ₹45 / kg &nbsp; • &nbsp; 100 kg
                                    </span>

                                </div>

                                <span className="available">
                                    AVAILABLE
                                </span>

                            </div>



                            <div className="recent-product">

                                <div className="product-image apple">
                                    🍎
                                </div>

                                <div className="product-info">

                                    <h4>Red Apples</h4>

                                    <p>Fruits</p>

                                    <span>
                                        ₹120 / kg &nbsp; • &nbsp; 30 kg
                                    </span>

                                </div>

                                <span className="available">
                                    AVAILABLE
                                </span>

                            </div>

                        </div>


                        <Link
                            to="/farmer/my-products"
                            className="view-products"
                        >
                            View All Products →
                        </Link>

                    </div>



                    {/* Recent Orders */}

                    <div className="dashboard-card">

                        <div className="card-header">

                            <div>
                                <h3>Recent Orders</h3>
                                <p>Latest customer orders</p>
                            </div>

                            <Link to="/farmer/orders">
                               View All →
                            </Link>

                        </div>


                        <div className="recent-orders">


                            <div className="recent-order">

                                <div className="order-icon green-order">
                                    🛍
                                </div>

                                <div className="order-info">

                                    <h4>Order #1001</h4>

                                    <p>Fresh Tomatoes</p>

                                    <small>
                                        2 Apr 2024 • 10:30 AM
                                    </small>

                                </div>

                                <div className="order-price">

                                    <strong>₹800</strong>

                                    <span className="delivered">
                                        Delivered
                                    </span>

                                </div>

                            </div>



                            <div className="recent-order">

                                <div className="order-icon orange-order">
                                    🛍
                                </div>

                                <div className="order-info">

                                    <h4>Order #1002</h4>

                                    <p>Organic Wheat</p>

                                    <small>
                                        2 Apr 2024 • 11:45 AM
                                    </small>

                                </div>

                                <div className="order-price">

                                    <strong>₹1,350</strong>

                                    <span className="processing">
                                        Processing
                                    </span>

                                </div>

                            </div>



                            <div className="recent-order">

                                <div className="order-icon blue-order">
                                    🛍
                                </div>

                                <div className="order-info">

                                    <h4>Order #1003</h4>

                                    <p>Red Apples</p>

                                    <small>
                                        1 Apr 2024 • 04:20 PM
                                    </small>

                                </div>

                                <div className="order-price">

                                    <strong>₹600</strong>

                                    <span className="shipped">
                                        Shipped
                                    </span>

                                </div>

                            </div>

                        </div>


                       <Link to="/farmer/orders"
                         className="view-products">
                           View All Orders →
                       </Link>

                    </div>

                </section>



                {/* ================= BOTTOM BANNER ================= */}

                <section className="dashboard-banner">

                    <div className="banner-icon">
                        🌱
                    </div>

                    <div>

                        <h2>
                            Together We Grow, Together We Prosper
                        </h2>

                        <p>
                            Empowering farmers. Connecting markets.
                            Building a better tomorrow.
                        </p>

                    </div>

                    <Link to="/">
                        Explore Marketplace →
                    </Link>

                    <div className="banner-decoration">
                        🚜
                    </div>

                </section>


            </main>

        </div>
    );
}

export default FarmerDashboard;
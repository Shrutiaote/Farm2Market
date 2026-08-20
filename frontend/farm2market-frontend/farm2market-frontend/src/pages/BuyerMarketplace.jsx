import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyerMarketplace.css";

function BuyerMarketplace() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");


    // Load products
    useEffect(() => {

        const savedProducts =
            localStorage.getItem("farm2market_products");

        if (savedProducts) {

            setProducts(JSON.parse(savedProducts));

        }

    }, []);


    // Categories
    const categories = [
        "All",
        ...new Set(
            products.map(product => product.category)
        )
    ];


    // Filter products
    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const isAvailable =
            product.status === "AVAILABLE";

        return (
            matchesSearch &&
            matchesCategory &&
            isAvailable
        );

    });


    return (

        <div className="marketplace-page">


            {/* ================= HEADER ================= */}

            <header className="marketplace-header">

                <div className="marketplace-logo">

                    <div className="marketplace-logo-icon">
                        🌱
                    </div>

                    <div>
                        <h2>Farm2Market</h2>

                        <p>
                            Fresh from Farmers
                        </p>
                    </div>

                </div>


                <nav className="marketplace-nav">

                    <button
                        onClick={() =>
                            navigate("/buyer/marketplace")
                        }
                        className="marketplace-nav-link active"
                    >
                        Marketplace
                    </button>

                    <button
                        onClick={() =>
                            navigate("/buyer/cart")
                        }
                        className="marketplace-nav-link"
                    >
                        🛒 Cart
                    </button>

                    <button
                        onClick={() =>
                            navigate("/buyer/orders")
                        }
                        className="marketplace-nav-link"
                    >
                        My Orders
                    </button>

                    <button
                        onClick={() =>
                            navigate("/buyer/settings")
                        }
                        className="marketplace-nav-link"
                    >
                        ⚙ Settings
                    </button>

                </nav>

            </header>


            {/* ================= HERO ================= */}

            <section className="marketplace-hero">

                <div>

                    <h1>
                        Fresh Products
                        <br />
                        Directly From Farmers 🌾
                    </h1>

                    <p>
                        Buy fresh and quality agricultural
                        products directly from local farmers.
                    </p>

                </div>

                <div className="hero-decoration">
                    🚜
                </div>

            </section>


            {/* ================= SEARCH ================= */}

            <section className="marketplace-controls">

                <div className="marketplace-search">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                </div>


                <div className="category-buttons">

                    {categories.map(category => (

                        <button
                            key={category}
                            className={
                                selectedCategory === category
                                    ? "category-button active"
                                    : "category-button"
                            }
                            onClick={() =>
                                setSelectedCategory(category)
                            }
                        >
                            {category}
                        </button>

                    ))}

                </div>

            </section>


            {/* ================= PRODUCTS ================= */}

            <section className="marketplace-products-section">

                <div className="marketplace-section-header">

                    <div>

                        <h2>
                            Available Products
                        </h2>

                        <p>
                            {filteredProducts.length} products available
                        </p>

                    </div>

                </div>


                {filteredProducts.length === 0 ? (

                    <div className="no-products">

                        <div>
                            🌱
                        </div>

                        <h3>
                            No products found
                        </h3>

                        <p>
                            Try searching for another product.
                        </p>

                    </div>

                ) : (

                    <div className="marketplace-products-grid">

                        {filteredProducts.map(product => (

                            <div
                                className="marketplace-product-card"
                                key={product.id}
                            >

                                {/* Image */}

                                <div className="marketplace-product-image">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        onError={(event) => {
                                            event.target.style.display =
                                                "none";
                                        }}
                                    />

                                    <span className="marketplace-status">
                                        AVAILABLE
                                    </span>

                                </div>


                                {/* Information */}

                                <div className="marketplace-product-content">

                                    <span className="marketplace-category">
                                        {product.category}
                                    </span>


                                    <h3>
                                        {product.name}
                                    </h3>


                                    <div className="marketplace-price">

                                        ₹{product.price}

                                        <span>
                                            / kg
                                        </span>

                                    </div>


                                    <p className="marketplace-quantity">

                                        Available:

                                        <strong>
                                            {product.quantity} kg
                                        </strong>

                                    </p>


                                   <button className="view-product-button"
                                     onClick={() => navigate("/buyer/product-details", {
                                     state: {
                                      product: product
                                     }
                                  })
                               }> View Product →
                            </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>

    );

}

export default BuyerMarketplace;
import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="home-page">

      {/* Navbar */}

      <nav className="navbar">

        <div className="logo">
          Farm2Market
        </div>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>

      </nav>


      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            Fresh Products Directly From Farmers
          </h1>

          <p>
            Farm2Market connects farmers directly
            with buyers, making agricultural products
            easier to sell and purchase.
          </p>

          <div className="hero-buttons">

            <Link
              to="/login"
              className="primary-button"
            >
              Shop Products
            </Link>

            <Link
              to="/register"
              className="secondary-button"
            >
              Sell Your Products
            </Link>

          </div>

        </div>

      </section>


      {/* Features */}

      <section className="features">

        <h2>
          Why Farm2Market?
        </h2>

        <div className="feature-container">

          <div className="feature-card">

            <h3>👨‍🌾 For Farmers</h3>

            <p>
              Farmers can list their agricultural
              products and reach more buyers.
            </p>

          </div>


          <div className="feature-card">

            <h3>🛒 For Buyers</h3>

            <p>
              Buyers can discover fresh products
              directly from farmers.
            </p>

          </div>


          <div className="feature-card">

            <h3>🌱 Fresh Products</h3>

            <p>
              Find fresh agricultural products
              at competitive prices.
            </p>

          </div>

        </div>

      </section>

    </div>

  );

}

export default Home;
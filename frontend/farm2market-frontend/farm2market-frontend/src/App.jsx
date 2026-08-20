import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerDashboard from "./pages/FarmerDashboard";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import ProductDetails from "./pages/ProductDetails";
import BuyerMarketplace from "./pages/BuyerMarketplace";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BuyerOrders from "./pages/BuyerOrders";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/farmer/dashboard"
          element={<FarmerDashboard />}
        />

        <Route
          path="/farmer/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/farmer/my-products"
          element={<MyProducts />}
        />

        <Route
    path="/farmer/edit-product"
    element={<EditProduct />}
/>

<Route
    path="/farmer/orders"
    element={<Orders />}
/>

<Route
    path="/farmer/settings"
    element={<Settings />}
/>

<Route
    path="/buyer/product-details"
    element={<ProductDetails />}
/>

<Route
    path="/buyer/marketplace"
    element={<BuyerMarketplace />}
/>

<Route
    path="/buyer/cart"
    element={<Cart />}
/>

<Route
    path="/buyer/checkout"
    element={<Checkout />}
/>

<Route
    path="/buyer/orders"
    element={<BuyerOrders />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
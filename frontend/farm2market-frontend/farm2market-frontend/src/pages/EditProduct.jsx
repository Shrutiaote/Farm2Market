import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./EditProduct.css";

function EditProduct() {

    const location = useLocation();
    const navigate = useNavigate();

    // Get product sent from MyProducts.jsx
    const product = location.state?.product;

    // If no product was selected
    if (!product) {

        return (
            <div className="edit-product-page">

                <h2>Product Not Found</h2>

                <p>
                    Please go back to My Products and select a product to edit.
                </p>

                <button
                    onClick={() => navigate("/farmer/my-products")}
                >
                    ← Back to My Products
                </button>

            </div>
        );
    }


    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);


   const handleSubmit = (e) => {

    e.preventDefault();

    const savedProducts =
        localStorage.getItem("farm2market_products");

    if (!savedProducts) {
        return;
    }

    const products =
        JSON.parse(savedProducts);

    const updatedProducts = products.map((item) => {

        if (item.id === product.id) {

            return {
                ...item,
                name: name,
                category: category,
                price: Number(price),
                quantity: Number(quantity)
            };

        }

        return item;

    });

    localStorage.setItem(
        "farm2market_products",
        JSON.stringify(updatedProducts)
    );

    navigate("/farmer/my-products");
};


    return (

        <div className="edit-product-page">

            <div className="edit-product-container">

                <div className="edit-product-header">

                    <h1>
                        Edit Product
                    </h1>

                    <p>
                        Update your product information.
                    </p>

                </div>


                <form onSubmit={handleSubmit}>


                    {/* Product Name */}

                    <div className="form-group">

                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Category */}

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            required
                        >

                            <option value="Vegetables">
                                Vegetables
                            </option>

                            <option value="Fruits">
                                Fruits
                            </option>

                            <option value="Grains">
                                Grains
                            </option>

                            <option value="Pulses">
                                Pulses
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* Price */}

                    <div className="form-group">

                        <label>
                            Price (₹ / kg)
                        </label>

                        <input
                            type="number"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                            min="1"
                            required
                        />

                    </div>


                    {/* Quantity */}

                    <div className="form-group">

                        <label>
                            Available Quantity (kg)
                        </label>

                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                            min="1"
                            required
                        />

                    </div>


                    {/* Buttons */}

                    <div className="edit-product-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() =>
                                navigate("/farmer/my-products")
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="save-button"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default EditProduct;
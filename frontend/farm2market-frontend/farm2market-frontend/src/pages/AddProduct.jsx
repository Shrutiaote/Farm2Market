import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddProduct() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    categoryId: "",
    price: "",
    quantity: "",
    description: ""
  });

  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  /* ===============================
     LOAD CATEGORIES
  =============================== */

  useEffect(() => {

    fetch("http://localhost:8080/api/categories")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to load categories");
        }

        return response.json();

      })
      .then((data) => {

        setCategories(data);

      })
      .catch((error) => {

        console.error(error);

        setMessage("Unable to load categories");

      });

  }, []);


  /* ===============================
     HANDLE INPUT
  =============================== */

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  };


  /* ===============================
     HANDLE IMAGE
  =============================== */

  const handleImageChange = (event) => {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    /*
      Convert image to Base64 so that it can
      be stored in localStorage.
    */

    const reader = new FileReader();

    reader.onloadend = () => {

      setImage(reader.result);

    };

    reader.readAsDataURL(file);

  };


  /* ===============================
     HANDLE SUBMIT
  =============================== */

  const handleSubmit = async (event) => {

    event.preventDefault();

    setMessage("");


    try {

      /* ===============================
         SEND PRODUCT TO BACKEND
      =============================== */

      const response = await fetch(
        "http://localhost:8080/api/products",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            productName: formData.productName,

            categoryId: Number(formData.categoryId),

            farmerId: 1,

            price: Number(formData.price),

            quantity: Number(formData.quantity),

            description: formData.description,

            status: "AVAILABLE"

          })
        }
      );


      const data = await response.json();


      /* ===============================
         IF PRODUCT SAVED SUCCESSFULLY
      =============================== */

      if (response.ok) {

        /*
          Find selected category name
        */

        const selectedCategory = categories.find(
          category =>
            Number(category.categoryId) ===
            Number(formData.categoryId)
        );


        /*
          Create product for My Products page
        */

        const newProduct = {

          id:
            data.productId ||
            data.id ||
            Date.now(),

          name: formData.productName,

          category:
            selectedCategory
              ? selectedCategory.categoryName
              : "Other",

          price: Number(formData.price),

          quantity: Number(formData.quantity),

          image: image || "/products/default-product.jpg",

          status: "AVAILABLE",

          description: formData.description

        };


        /* ===============================
           GET EXISTING PRODUCTS
        =============================== */

        const savedProducts =
          localStorage.getItem(
            "farm2market_products"
          );


        let existingProducts = [];


        if (savedProducts) {

          try {

            existingProducts =
              JSON.parse(savedProducts);

          } catch (error) {

            console.error(
              "Error reading saved products:",
              error
            );

            existingProducts = [];

          }

        }


        /* ===============================
           ADD NEW PRODUCT
        =============================== */

        const updatedProducts = [
          ...existingProducts,
          newProduct
        ];


        /* ===============================
           SAVE TO LOCAL STORAGE
        =============================== */

        localStorage.setItem(
          "farm2market_products",
          JSON.stringify(updatedProducts)
        );


        /* ===============================
           SUCCESS MESSAGE
        =============================== */

        setMessage(
          "Product added successfully!"
        );


        /* ===============================
           CLEAR FORM
        =============================== */

        setFormData({

          productName: "",
          categoryId: "",
          price: "",
          quantity: "",
          description: ""

        });

        setImage("");


        /* ===============================
           GO TO MY PRODUCTS
        =============================== */

        setTimeout(() => {

          navigate("/farmer/my-products");

        }, 800);


      } else {

        setMessage(
          data.message ||
          "Failed to add product"
        );

      }


    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to connect to the server"
      );

    }

  };


  /* ===============================
     UI
  =============================== */

  return (

    <div className="add-product-page">


      {/* ===============================
          NAVBAR
      =============================== */}

      <nav className="navbar">

        <div className="logo">
          Farm2Market
        </div>


        <div className="nav-links">

          <Link to="/farmer/dashboard">
            Dashboard
          </Link>

          <Link to="/farmer/my-products">
            My Products
          </Link>

          <Link to="/">
            Home
          </Link>

        </div>

      </nav>


      {/* ===============================
          FORM CONTAINER
      =============================== */}

      <div className="add-product-container">

        <h1>
          Add Product
        </h1>

        <p>
          Add a new agricultural product
        </p>


        <form
          className="product-form"
          onSubmit={handleSubmit}
        >


          {/* PRODUCT NAME */}

          <div className="form-group">

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Example: Tomatoes"
              required
            />

          </div>


          {/* CATEGORY */}

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Category
              </option>


              {categories.map((category) => (

                <option
                  key={category.categoryId}
                  value={category.categoryId}
                >

                  {category.categoryName}

                </option>

              ))}

            </select>

          </div>


          {/* PRICE */}

          <div className="form-group">

            <label>
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
            />

          </div>


          {/* QUANTITY */}

          <div className="form-group">

            <label>
              Quantity (kg)
            </label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              min="1"
              required
            />

          </div>


          {/* IMAGE */}

          <div className="form-group">

            <label>
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

          </div>


          {/* IMAGE PREVIEW */}

          {image && (

            <div className="image-preview">

              <p>
                Image Preview
              </p>

              <img
                src={image}
                alt="Product Preview"
              />

            </div>

          )}


          {/* DESCRIPTION */}

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product"
              rows="4"
            />

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="product-submit-button"
          >

            Add Product

          </button>


        </form>


        {/* MESSAGE */}

        {message && (

          <p className="product-message">
            {message}
          </p>

        )}

      </div>

    </div>

  );

}

export default AddProduct;
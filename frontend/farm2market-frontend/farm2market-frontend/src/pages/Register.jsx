import { useState } from "react";

function Register() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "FARMER"
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setMessage("");

    try {

      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMessage("Registration successful!");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          role: "FARMER"
        });

      } else {

        setMessage(
          data.message || "Registration failed"
        );

      }

    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to connect to the server"
      );

    }
  };

  return (

    <div className="register-page">

      <div className="register-card">

        <h1>Farm2Market</h1>

        <h2>Create Account</h2>

        <p className="register-subtitle">
          Register as a farmer
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-row">

            <div className="form-group">

              <label>First Name</label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />

            </div>

            <div className="form-group">

              <label>Last Name</label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />

            </div>

          </div>


          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />

          </div>


          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />

          </div>


          <div className="form-group">

            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />

          </div>


          <div className="form-group">

            <label>Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              rows="3"
              required
            />

          </div>


          <div className="form-group">

            <label>Register As</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >

              <option value="FARMER">
                Farmer
              </option>

              <option value="BUYER">
                Buyer
              </option>

            </select>

          </div>


          <button
            type="submit"
            className="register-submit"
          >
            Create Account
          </button>

        </form>


        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

      </div>

    </div>

  );
}

export default Register;
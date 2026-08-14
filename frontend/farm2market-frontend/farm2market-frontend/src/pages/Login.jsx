import { useState } from "react";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
        "http://localhost:8080/api/auth/login",
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

        setMessage("Login successful!");

        console.log("Logged in user:", data);

      } else {

        setMessage(
          data.message || "Invalid email or password"
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

    <div className="login-page">

      <div className="login-card">

        <h1>Farm2Market</h1>

        <h2>Login</h2>

        <p className="login-subtitle">
          Login to your account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              required
            />

          </div>

          <button
            type="submit"
            className="login-submit"
          >
            Login
          </button>

        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

      </div>

    </div>

  );
}

export default Login;
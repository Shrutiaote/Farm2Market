import { useState } from "react";
import { Link } from "react-router-dom";
import "./Settings.css";

function Settings() {

    const [farmer, setFarmer] = useState(() => {

        const savedFarmer = localStorage.getItem("farm2market_farmer");

        if (savedFarmer) {
            return JSON.parse(savedFarmer);
        }

        const defaultFarmer = {
            name: "Farmer",
            email: "farmer@example.com",
            phone: "9876543210",
            address: "Nagpur, Maharashtra"
        };

        localStorage.setItem(
            "farm2market_farmer",
            JSON.stringify(defaultFarmer)
        );

        return defaultFarmer;
    });

    const [message, setMessage] = useState("");


    const handleChange = (event) => {

        setFarmer({
            ...farmer,
            [event.target.name]: event.target.value
        });

    };


    const handleSubmit = (event) => {

        event.preventDefault();

        localStorage.setItem(
            "farm2market_farmer",
            JSON.stringify(farmer)
        );

        setMessage("Profile updated successfully!");

    };


    return (

        <div className="settings-page">


            {/* Header */}

            <div className="settings-header">

                <div>

                    <h1>
                        Settings
                    </h1>

                    <p>
                        Manage your farmer profile and account settings.
                    </p>

                </div>


                <Link
                    to="/farmer/dashboard"
                    className="back-dashboard-button"
                >
                    ← Dashboard
                </Link>

            </div>


            <div className="settings-container">


                {/* Farmer Profile */}

                <div className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-icon">
                            👨‍🌾
                        </div>

                        <div>

                            <h2>
                                Farmer Profile
                            </h2>

                            <p>
                                Update your personal information.
                            </p>

                        </div>

                    </div>


                    <form
                        className="settings-form"
                        onSubmit={handleSubmit}
                    >


                        {/* Name */}

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={farmer.name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Email */}

                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={farmer.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Phone */}

                        <div className="form-group">

                            <label>
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={farmer.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Address */}

                        <div className="form-group">

                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={farmer.address}
                                onChange={handleChange}
                                rows="4"
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="save-settings-button"
                        >
                            Save Changes
                        </button>


                        {message && (

                            <p className="settings-message">
                                {message}
                            </p>

                        )}

                    </form>

                </div>


                {/* Account Information */}

                <div className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-icon">
                            ⚙️
                        </div>

                        <div>

                            <h2>
                                Account Information
                            </h2>

                            <p>
                                Information about your Farm2Market account.
                            </p>

                        </div>

                    </div>


                    <div className="account-info">

                        <div className="account-row">

                            <span>
                                Account Type
                            </span>

                            <strong>
                                Farmer
                            </strong>

                        </div>


                        <div className="account-row">

                            <span>
                                Account Status
                            </span>

                            <strong className="active-account">
                                Active
                            </strong>

                        </div>


                        <div className="account-row">

                            <span>
                                Member Since
                            </span>

                            <strong>
                                2026
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Settings;
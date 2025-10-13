import React, { useState } from "react";
import "./UserForm.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // simple validation for phone (numbers only)
    if (name === "phone") {
      if (value === "" || /^[0-9\b]+$/.test(value)) {
        setFormData({ ...formData, [name]: value });
        setError("");
      } else {
        setError("Phone must be numeric");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email
    ) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitted(true);
    setError("");
  };

  // handle reset
  const handleReset = () => {
    setFormData({ firstName: "", lastName: "", phone: "", email: "" });
    setSubmitted(false);
    setError("");
  };

  return (
    <div className="userform-container">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Welcome !</h2>
          <p>Please provide your information below.</p>

          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>

          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="submitted-data">
          <h2>Your Submitted Data</h2>
          <p>
            <strong>First Name:</strong> {formData.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {formData.lastName}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default UserForm;
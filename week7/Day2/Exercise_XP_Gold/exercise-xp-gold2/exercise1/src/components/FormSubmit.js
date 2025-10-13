import React, { useState } from "react";
import "./FormSubmit.css"; // Optionnel si tu veux ajouter du style

const FormSubmit = () => {
  // State pour stocker les valeurs du formulaire
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    email: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  // Gérer les changements des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gérer le submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation simple
    if (!formData.username || !formData.age || !formData.email) {
      alert("Please fill in all fields");
      return;
    }

    // Envoyer les données dans la console
    console.log("Form Data Submitted:", formData);

    // Afficher message de succès sur la page
    setSuccessMessage("Form submitted successfully!");

    // Réinitialiser le formulaire si souhaité
    setFormData({
      username: "",
      age: "",
      email: "",
    });
  };

  return (
    <div className="form-submit-container">
      <h2>React Form Submit</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>

        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formData.age}
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

        <button type="submit">Submit</button>
      </form>

      {/* Message de succès */}
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
    </div>
  );
};

export default FormSubmit;
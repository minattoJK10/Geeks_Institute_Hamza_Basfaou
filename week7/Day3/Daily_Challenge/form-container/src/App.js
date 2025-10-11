import React, { useState } from "react";
import FormComponent from "./components/FormComponent";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    destination: "",
    nutsFree: false,
    lactoseFree: false,
    vegan: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) params.append(key, formData[key]);
    });
    window.location.href = `http://localhost:3000/?${params.toString()}`;
  };

  return (
    <div>
      <FormComponent
        data={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;

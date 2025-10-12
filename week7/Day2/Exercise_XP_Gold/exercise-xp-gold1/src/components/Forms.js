import React, { useState } from "react";
import "./Forms.css"; // <-- importer le CSS

const Forms = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const [textareaValue, setTextareaValue] = useState("Some initial content...");
  const [selectedCar, setSelectedCar] = useState("Volvo");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "age") {
      if (value === "" || /^[0-9\b]+$/.test(value)) {
        setAge(value);
        setErrormessage("");
      } else setErrormessage("Age must be numeric");
    }
  };

  const mySubmitHandler = (e) => {
    e.preventDefault();
    alert(`Username: ${username}\nAge: ${age}`);
  };

  let header = null;
  if (username || age) {
    header = (
      <h2>
        {username ? `Hello, ${username}` : ""}{" "}
        {age ? `(Age: ${age})` : ""}
      </h2>
    );
  }

  return (
    <div className="forms-container">
      {header}

      <form onSubmit={mySubmitHandler}>
        <label>
          Name:
          <input type="text" name="username" value={username} onChange={handleChange} />
        </label>

        <label>
          Age:
          <input type="text" name="age" value={age} onChange={handleChange} />
          {errormessage && <div className="error-message">{errormessage}</div>}
        </label>

        <button type="submit">Submit</button>
      </form>

      <div className="textarea-container">
        <label>
          Message:
          <textarea value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)} rows="4" />
        </label>
      </div>

      <div className="select-container">
        <label>
          Select Car:
          <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
            <option value="Volvo">Volvo</option>
            <option value="Saab">Saab</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
          </select>
        </label>
        <p>Selected Car: {selectedCar}</p>
      </div>
    </div>
  );
};

export default Forms;
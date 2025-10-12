import React, { Component } from "react";
import data from "../data/data.json";

class Example2 extends Component {
  render() {
    const { Skills } = data;
    return (
      <div
        style={{
          width: "400px",
          margin: "20px auto",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <h3 style={{ textAlign: "left" }}>Example2 Component</h3>

        <h4>Programming Language</h4>
        <ul style={{ textAlign: "left" }}>
          {Skills.ProgrammingLanguage.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>

        <h4>Web-Based Application Development</h4>
        <ul style={{ textAlign: "left" }}>
          {Skills.WebBasedApplicationDevelopment.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example2;
import React, { Component } from "react";
import data from "../data/data.json";

class Example3 extends Component {
  render() {
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
        <h3 style={{ textAlign: "left" }}>Example3 Component</h3>

        {data.Experiences.map((exp, index) => (
          <div key={index} style={{ marginBottom: "25px", textAlign: "center" }}>
            <img
              src={exp.image}
              alt="No Image Available"
              style={{
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                objectFit: "cover"
              }}
            />
            <h4>
              <a
                href=""
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                {exp.company}
              </a>
            </h4>
            <p style={{ margin: "5px 0" }}>
              {exp.company === "Xeniel Technologies" && exp.position === "Web Developer" 
                ? "Full Stack Developer" 
                : exp.position}
            </p>
            <p style={{ margin: "5px 0", fontSize: "13px", color: "#555" }}>
              {exp.location}
            </p>
            <p style={{ margin: "5px 0", fontSize: "13px" }}>{exp.period}</p>
            <p style={{ fontSize: "13px", color: "#333" }}>{exp.details}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
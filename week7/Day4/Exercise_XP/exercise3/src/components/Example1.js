import React, { Component } from "react";
import data from "../data/data.json";

class Example1 extends Component {
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
        <h3 style={{ textAlign: "left" }}>Example1 Component</h3>
        <ul style={{ textAlign: "left" }}>
          {data.SocialMedias.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example1;
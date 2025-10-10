import React, { Component } from "react";

class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: "red",
    };
  }

  shouldComponentUpdate() {
    console.log("➡️ shouldComponentUpdate called");
    return true;
  }

  componentDidMount() {
    console.log("🎨 componentDidMount called");
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("📸 in getSnapshotBeforeUpdate");
    console.log("Previous color:", prevState.favoriteColor);
    return null;
  }

  componentDidUpdate() {
    console.log("✅ after update");
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  render() {
    console.log("🎨 render called");
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ color: this.state.favoriteColor }}>
          My Favorite Color is {this.state.favoriteColor}
        </h1>
        <button
          onClick={this.changeColor}
          style={{
            background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          Change Color
        </button>
      </div>
    );
  }
}

export default Color;
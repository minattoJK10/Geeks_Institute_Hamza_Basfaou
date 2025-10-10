import React, { Component } from "react";
class Child extends Component {
  componentWillUnmount() {
    alert("The component named Child is about to be unmounted!");
  }
  render() {
    return <h2>Hello World!</h2>;
  }
}
export default class LifecycleUnmount extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true };
  }
  deleteChild = () => {
    this.setState({ show: false });
  };
  render() {
    let comp;
    if (this.state.show) {
      comp = <Child />;
    }
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        {comp}
        <button onClick={this.deleteChild}>Delete Child Component</button>
      </div>
    );
  }
}
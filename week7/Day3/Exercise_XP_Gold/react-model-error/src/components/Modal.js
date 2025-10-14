import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal-background">
        <div className="modal-body">
          <div className="modal-content">
            <div className="error-title">Error: Something went wrong!</div>
            <div className="error-details">
              <div>Details</div>
              <div className="error-stack">
                <div>in r</div>
                <div>in div</div>
                <div>in r</div>
                <div>in StrictMode</div>
              </div>
            </div>
            <div className="suggestion">Please try it again</div>
            <div className="button-container">
              <button className="btn btn-close" onClick={this.props.onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
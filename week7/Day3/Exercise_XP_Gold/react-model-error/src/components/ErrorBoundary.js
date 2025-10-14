import React from "react";
import Modal from "./Modal";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  occurError = () => {
    // Simuler une erreur avec une stack trace similaire à l'image
    this.setState({ 
      hasError: true,
      errorInfo: {
        componentStack: `
          in r
          in div
          in r
          in StrictMode
        `
      }
    });
  };

  handleCloseModal = () => {
    this.setState({ hasError: false, errorInfo: null });
  };

  render() {
    return (
      <>
        {this.state.hasError && (
          <Modal
            show={this.state.hasError}
            onClose={this.handleCloseModal}
          />
        )}
        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
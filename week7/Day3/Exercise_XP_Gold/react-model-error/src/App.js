import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  let errorBoundaryRef = React.createRef();

  return (
    <div className="App">
      <div className="container text-center my-5">
        <ErrorBoundary ref={errorBoundaryRef}>
          <button
            className="btn btn-danger"
            onClick={() => errorBoundaryRef.current.occurError()}
          >
            Occur an error
          </button>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
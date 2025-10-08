import logo from './logo.svg';
import './App.css';

function App() {
  
    // JSX variable
  const myelement = <h1>I Love JSX!</h1>;

  // Simple sum
  const sum = 5 + 5;

  return (
    <div className="App">
      {/* Display Hello World */}
      <p>Hello World!</p>

      {/* Render JSX variable */}
      {myelement}

      {/* Render expression */}
      <p>React is {sum} times better with JSX</p>
    </div>
  );
  
}

export default App;

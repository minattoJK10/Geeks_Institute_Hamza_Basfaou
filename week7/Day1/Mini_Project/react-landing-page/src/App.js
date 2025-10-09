import React from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Contact from './components/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="row">
          <Card
            icon="fa-cog"
            title="Feature One"
            description="Description of feature one."
          />
          <Card
            icon="fa-heart"
            title="Feature Two"
            description="Description of feature two."
          />
          <Card
            icon="fa-star"
            title="Feature Three"
            description="Description of feature three."
          />
        </div>
      </div>
      <Contact />
    </div>
  );
}

export default App;
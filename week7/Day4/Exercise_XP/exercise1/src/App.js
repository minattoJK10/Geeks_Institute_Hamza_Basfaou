import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./components/ErrorBoundary";

function HomeScreen() {
  return <h1 className="text-center mt-5 text-primary">🏠 Welcome Home</h1>;
}

function ProfileScreen() {
  return <h1 className="text-center mt-5 text-success">👤 Your Profile</h1>;
}

function ShopScreen() {
  throw new Error("Shop crashed!");
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <NavLink className="navbar-brand fw-bold text-white" to="/">My App</NavLink>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
          <NavLink className="nav-link" to="/shop">Shop</NavLink>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <HomeScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/profile"
          element={
            <ErrorBoundary>
              <ProfileScreen />
            </ErrorBoundary>
          }
        />
        <Route
          path="/shop"
          element={
            <ErrorBoundary>
              <ShopScreen />
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

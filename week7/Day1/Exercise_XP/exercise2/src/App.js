import logo from './logo.svg';
import './App.css';
import UserFavoriteAnimals from './UserFavoriteAnimals';

function App() {
  const user = {
    firstName: "Bob",
    lastName: "Dylan",
    favAnimals: ["Horse", "Turtle", "Elephant", "Monkey"],
  };

  return (
    <div className="App">
      <h3>{user.firstName}</h3>
      <h3>{user.lastName}</h3>

      {/* Pass the favAnimals array as props */}
      <UserFavoriteAnimals animals={user.favAnimals} />
    </div>
  );
}

export default App;

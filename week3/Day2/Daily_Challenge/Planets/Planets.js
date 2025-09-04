// Step 1: Array of planets with name, color, and moons (reasonable counts)
const planets = [
  { name: "Mercury", color: "gray", moons: 0 },
  { name: "Venus", color: "yellow", moons: 0 },
  { name: "Earth", color: "blue", moons: 1 },
  { name: "Mars", color: "red", moons: 2 },
  { name: "Jupiter", color: "orange", moons: 4 },
  { name: "Saturn", color: "goldenrod", moons: 3 },
  { name: "Uranus", color: "lightblue", moons: 2 },
  { name: "Neptune", color: "darkblue", moons: 1 },
];

// Step 2: Select the <section>
const section = document.querySelector(".listPlanets");

// Step 3: Create planets
planets.forEach((planet) => {
  const planetDiv = document.createElement("div");
  planetDiv.classList.add("planet");
  planetDiv.style.backgroundColor = planet.color;
  planetDiv.textContent = planet.name;

  // Create moons
  for (let i = 0; i < planet.moons; i++) {
    const moonDiv = document.createElement("div");
    moonDiv.classList.add("moon");

    // Position each moon randomly
    moonDiv.style.top = `${Math.random() * 80}px`;
    moonDiv.style.left = `${Math.random() * 80}px`;

    planetDiv.appendChild(moonDiv);
  }

  section.appendChild(planetDiv);
});

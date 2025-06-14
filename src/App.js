import "./App.css";
import Hero from "./Components/Hero/Hero";
import { Routes, Route } from "react-router";
import Wall from "./Components/Wall/Wall";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/wall" element={<Wall />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import Hero from "./Components/Hero/Hero";
import { Routes, Route } from "react-router";
import Wall from "./Components/Wall/Wall";
import Flash from "./Components/flash/Flash";
import Float from "./Components/float/Float";
import InlineSlider from "./Components/InlineSlider/InlineSlider";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/wall" element={<Wall />} />
        <Route path="/flash" element={<Flash />} />
        <Route path="/float" element={<Float />} />
        <Route path="/inlineslider" element={<InlineSlider />} />


      </Routes>
    </div>
  );
}

export default App;

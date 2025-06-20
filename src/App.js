import "./App.css";
import Hero from "./Components/Hero/Hero";
import { Routes, Route } from "react-router";
import Wall from "./Components/Wall/Wall";
import Flash from "./Components/flash/Flash";
import Float from "./Components/float/Float";
import InlineSlider from "./Components/InlineSlider/InlineSlider";
import List from "./Components/List/List";
import WidgetDetails from "./Components/WidgetDetails/WidgetDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/wall" element={<Wall />} />
        <Route path="/flash" element={<Flash />} />
        <Route path="/float" element={<Float />} />
        <Route path="/inlineslider" element={<InlineSlider />} />
        <Route path="/list" element={<List />} />
        <Route path="/widget-details/:widgetName" element={<WidgetDetails />} />
      </Routes>
    </div>
  );
}

export default App;

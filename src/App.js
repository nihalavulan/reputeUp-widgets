import "./App.css";
import Hero from "./Components/Hero/Hero";
import { Routes, Route } from "react-router";
import Wall from "./Components/Wall/Wall";
import Flash from "./Components/flash/Flash";
import Float from "./Components/float/Float";
import InlineSlider from "./Components/InlineSlider/InlineSlider";
import List from "./Components/List/List";
import WidgetDetails from "./Components/WidgetDetails/WidgetDetails";
import Grid from "./Components/Grid";
import ReviewBlock from "./Components/ReviewBlock/ReviewBlock";
import VideoWall from "./Components/VideoWall/VideoWall";
import Photoset from './Components/Photoset/Photoset';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/wall" element={<Wall />} />
        <Route path="/flash" element={<Flash />} />
        <Route path="/float" element={<Float />} />
        <Route path="/inlineslider" element={<InlineSlider />} />
        <Route path="/list" element={<List />} />
        <Route path="/grid" element={<Grid />} />
        <Route path="/reviewblock" element={<ReviewBlock />} />
        <Route path="/videowall" element={<VideoWall />} />
        <Route path="/photoset" element={<Photoset />} />
        
        <Route path="/widget-details/:widgetName" element={<WidgetDetails />} />
      </Routes>
    </div>
  );
}

export default App;

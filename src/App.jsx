import React from "react";
import { SpotlightPage } from "./components/spotlightPage";
import "./App.css";
import { SpotlightPageBottom } from "./components/spotlightPageBottom";

const App = () => {
  return (
  <>
  <body>
    <div className="relative block overflow-hidden w-full h-full">
    <SpotlightPage/>
    <SpotlightPageBottom/>
    </div>
    </body>
  </>
  );
};

export default App;

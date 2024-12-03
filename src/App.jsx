import React from "react";
import { SpotlightPage } from "./components/spotlightPage";
import "./App.css";
import { SpotlightPageBottom } from "./components/spotlightPageBottom";

const App = () => {
  return (
  <>
  <body>
    <div className="block">
    <SpotlightPage/>
    <SpotlightPageBottom/>
    </div>
    </body>
  </>
  );
};

export default App;

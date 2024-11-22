import "./App.css";

import React from "react";
import DataFetcher from "./DataFetcher";
import { atom } from "jotai";
import Weather from "./weather";
import Veckomeny from "./veckomeny.jsx";
import Bubbles from "./Bubbles.jsx";

export const ScanCount = atom(0);

const App = () => {
  return (
    <div className="App">
      <div className="bg-transparent min-h-screen flex justify-between items-start p-8">
        <Weather />
        <div className="w-96 h-96 flex flex-col gap-5 ml-5">
          <DataFetcher />
        </div>

        <Veckomeny />
      </div>
      <Bubbles />
    </div>
  );
};

export default App;

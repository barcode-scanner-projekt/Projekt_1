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
      <div className="bg-transparent min-h-screen grid grid-cols-3 grid-rows-1 gap-4 p-8">
        <div className="w-auto h-screen flex flex-col gap-5 ml-5">
          <DataFetcher />
        </div>
        <Weather />

        <Veckomeny />
      </div>
      <Bubbles />
    </div>
  );
};

export default App;

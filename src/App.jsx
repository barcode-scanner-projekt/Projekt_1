import "./App.css";
import React from "react";
import DataFetcher from "./DataFetcher";
import Weather from "./weather";

const App = () => {
  return (
    <div className="App">
      <Weather />
      <h1>Streckkodsläsare App</h1>
      <DataFetcher />
      <h2>Scannade ID:n:</h2>
    </div>
  );
};

export default App;

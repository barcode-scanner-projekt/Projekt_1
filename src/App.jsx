
import './App.css';

import React, { useState, useEffect } from 'react';
import DataFetcher from './DataFetcher';





const App = () => {



  
  return (
    <div className="App">
      <h1>Streckkodsläsare App</h1>
      
      <DataFetcher/>
      <h2>Scannade ID:n:</h2>
    </div>
  );
}
export default App;

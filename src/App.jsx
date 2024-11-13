
import './App.css';

import React, { useState, useEffect } from 'react';
import DataFetcher from './DataFetcher';
import { atom } from 'jotai'
import { useAtom } from 'jotai'
import Weather from './weather';

export const ScanCount = atom(0);




const App = () => {
	const [scanCount, setScanCount] = useAtom(ScanCount)



  
  return (
    <div className="App">
      <h1>Streckkodsläsare App</h1>
	  <p>{scanCount}</p>
      <DataFetcher />
      <h2>Scannade ID:n:</h2>
      <Weather />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';

const BarcodeScanner = ({ onScan }) => {
  const [scanResult, setScanResult] = useState(null);

 
  const handleScan = (data) => {
    if (data) {
      setScanResult(data); 
      onScan(data);  
    }
  };


  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <h2>Test</h2>
      <BarcodeReader
        onScan={handleScan}
        onError={handleError}
        delay={500}  
      />
      <p>{scanResult ? `Scannad ID: ${scanResult}` : 'Skanna en streckkod'}</p>
    </div>
  );
};

export default BarcodeScanner;

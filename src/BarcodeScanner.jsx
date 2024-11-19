import React from "react";
import BarcodeReader from "react-barcode-reader";

const BarcodeScanner = ({ onScan }) => {
	const handleScan = (data) => {
		if (data) {
			onScan(data);
		}
	};

	const handleError = (err) => {
		console.error("Barcode error: ", err);
	};

	return (
		<div>
			<BarcodeReader
				onScan={handleScan}
				onError={handleError}
				delay={500}
			/>
		</div>
	);
};

export default BarcodeScanner;

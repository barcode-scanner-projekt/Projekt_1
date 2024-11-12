import React, { useEffect, useState } from "react";
import BarcodeScanner from "./BarcodeScanner";
import { ScanCount } from "./App";
import { useAtom } from 'jotai'


async function fetchStudents(studentId) {
	const response = await fetch(`https://ntifoodpeople.vercel.app/api/users/${studentId}`);

	const json = await response.json();
	return json;
}

const DataFetcher = () => {
	const [studentArray, setStudentArray] = useState([]);
	const [scanCount, setScanCount] = useAtom(ScanCount)

	async function onScan(data) {
		const result = await fetchStudents(data.toLowerCase());
		if (studentArray.some((e) => e._id === result[0]._id)) {
			return;
		} 
		setStudentArray([...studentArray, result[0]])

		setScanCount(scanCount + 1);
	}

	return (
		<div>
			<BarcodeScanner onScan={onScan} />
			<h1 className="text-green-400">Student Data</h1>
			{studentArray.map((element) => {
				return <h1 style={{color: !element.teacher ? "#ff0000" : "#fff"}}>{element.username}</h1>;
			})}
		</div>
	);
};

export default DataFetcher;

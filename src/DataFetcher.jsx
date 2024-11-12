import React, { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";
import { ScanCount } from "./App";
import { useAtom } from "jotai";

function capitalizeString(input) {
	return input.split(" ").map((str) => {
		return str[0].toUpperCase() + str.substring(1) + " ";
	});
}

async function fetchStudents(studentId) {
	const response = await fetch(
		`https://ntifoodpeople.vercel.app/api/users/${studentId}`
	);

	const json = await response.json();
	return json;
}

const DataFetcher = () => {
	const [studentArray, setStudentArray] = useState([
		{
			username: "ludvig wannstedt von reis",
			teacher: false,
			studentId: "sod210051",
		},
		{ username: "simon wandel", teacher: false, studentId: "sod210053" },
		{ username: "lukas eifrem", teacher: false, studentId: "sod210052" },
		{ username: "frank efternamn", teacher: true, studentId: "sod210052" },
	]);
	const [scanCount, setScanCount] = useAtom(ScanCount);

	async function onScan(data) {
		const result = await fetchStudents(data.toLowerCase());
		if (studentArray.some((e) => e._id === result[0]._id)) {
			return;
		}
		setStudentArray([...studentArray, result[0]]);

		setScanCount(scanCount + 1);
	}

	return (
		<div
			className="w-2/5 flex flex-col backdrop-blur-xl
			bg-black/35 outline outline-4 
			outline-purple-600 rounded-lg p-5"
		>
			<BarcodeScanner onScan={onScan} />
			<div className="flex flex-col transition-all">
				{studentArray
					.slice(
						Math.max(studentArray.length - 9, 0),
						studentArray.length
					)
					.map((element, idx) => {
						return (
							<h1 key={element.studentId}
								className={`text-bold text-4xl ${
									element.teacher
										? "text-purple-500"
										: "text-white"
								}`}
							>
								{capitalizeString(element.username)}{" "}
								{!element.teacher
									? ` | ${element.studentId.slice(3, 5)}`
									: ""}
							</h1>
						);
					})}
			</div>
		</div>
	);
};

export default DataFetcher;

/*
	style={{
		fontSize: Math.max(
		10 + idx * idx * (0.5 * idx),
		10
		),
	}}
*/

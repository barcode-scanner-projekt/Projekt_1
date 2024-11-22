import React, { useEffect, useState } from "react";
import BarcodeScanner from "./BarcodeScanner";
import { ScanCount } from "./App";
import { useAtom } from "jotai";
import { SecretHook } from "./Secret";

async function fetchStudents(studentId) {
  const response = await fetch(
    `https://ntifoodpeople.vercel.app/api/users/${studentId}`
  );

  const json = await response.json();
  return json;
}

const DataFetcher = () => {
  const [studentArray, setStudentArray] = useState([]);
  const [bestClass, setBestClass] = useState(undefined);
  const [scanCount, setScanCount] = useAtom(ScanCount);
  SecretHook();

  async function onScan(data) {
    let result = await fetchStudents(data.toLowerCase());
    if (result.message) {
      result = [
        {
          _id: Math.floor(Math.random() * 10),
          username: "Unknown",
          scanId: "sodukn",
          teacher: false,
        },
      ];
    }

    console.log(result);
    if (studentArray.some((e) => e._id === result[0]._id)) {
      return;
    }
    setStudentArray([...studentArray, result[0]]);

    setScanCount(scanCount + 1);
  }
  useEffect(() => {
    function calculateBestClass() {
      const counts = {};

      studentArray.forEach((obj) => {
        // Extract the first two characters from studentId
        const prefix = obj.scanId.substring(3, 5);

        // Check if it's numeric
        if (!isNaN(prefix)) {
          // Increment the count for this prefix
          counts[prefix] = (counts[prefix] || 0) + 1;
        }
      });

      const total = Object.values(counts).reduce(
        (sum, count) => sum + count,
        0
      );

      return Object.entries(counts) // Convert to [key, value] pairs
        .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
        .map(([key, count]) => ({
          prefix: key,
          count,
          percentage: ((count / total) * 100).toFixed(0),
        }))[0];
    }

    const best = calculateBestClass();
    setBestClass(best);

    setScanCount(Math.max(scanCount, studentArray.length));
  }, [studentArray, scanCount, setScanCount]);

  const fixedArray = studentArray.slice(
    Math.max(studentArray.length - 5, 0),
    studentArray.length
  );

  return (
    <>
      <div className="w-full h-1/2 rounded-3xl text-white shadow-2xl p-5 backdrop-blur-md bg-gradient-to-b from-fuchsia-950/40 to-fuchsia-950/50 shadow-fuchsia-950">
        <h1 className="text-4xl font-bold">Skanna För Att Äta</h1>
        <p>
          Antal skannad: <span className="font-bold">{scanCount}</span>
        </p>
        <p>
          Mest skannad klass:{" "}
          <span className="font-bold">
            {bestClass !== undefined ? bestClass.prefix : "Inga"}
          </span>
          <span className="font-bold text-lg">{bestClass && " · "}</span>
          <span className="font-bold">
            {bestClass !== undefined ? `${bestClass.percentage}%` : ""}
          </span>
        </p>
      </div>
      <BarcodeScanner onScan={onScan} />
      <div className="rounded-3xl text-white shadow-2xl p-5 h-64 backdrop-blur-md bg-gradient-to-b from-fuchsia-800/50 to-black/50 shadow-fuchsia-950">
        {fixedArray.map((element) => {
          return (
            <h1
              key={element._id}
              className={`text-2xl  ${
                !element.teacher ? "text-white" : "text-cyan-500"
              }`}
            >
              {element.username}
            </h1>
          );
        })}
      </div>
    </>
  );
};

export default DataFetcher;

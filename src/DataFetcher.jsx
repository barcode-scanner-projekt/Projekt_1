import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import BarcodeScanner from './BarcodeScanner';

const apiKey = process.env.REACT_APP_AIRTABLE_API

const base = new Airtable({apiKey: apiKey}).base("app6KPRj9WClvok0d")


const DataFetcher = () => {
  const [studentsData, setStudentsData] = useState([]); 
  const [namnArray, setNamnArray] = useState([])
  const [listItems, setListItems] = useState([])
  const [scans, setScans] = useState("");  
  const handleScan = (scanResult) => {
    setScans((prevScans) => [...prevScans, scanResult]);  
  };

  function addItem(record){
    const namn = record.get("Namn");

    if(!namnArray.includes(namn)){
      const newItem = {
        namn: namn,
        isPersonal: record.get("isPersonal"),

      }
      setNamnArray((prev) => [...prev, namn]);
      setListItems((prev) => [...prev, newItem])
    }else return;
  }
useEffect(() => {

    base("data").select({ fields: ["Id" , "Namn", "isPersonal"]}).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        if (record.get("Id") === scans){
          addItem(record);
          setScans("")
        }
      });
      fetchNextPage();
    },
  (err) => {
    if (err) console.error(err);
  })
  }, [scans])

  return (
    <div>
      <BarcodeScanner onScan={handleScan} />
      <h1>Student Data</h1>
      {studentsData.length === 0 ? (
        <p>Ingen studentdata tillgänglig</p>
      ) : (
        <ul>
          {studentsData.map((student) => (
            <li key={student.student_id}>
              {student.name} (ID: {student.student_id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataFetcher;

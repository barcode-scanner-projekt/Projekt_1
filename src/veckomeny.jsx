import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "./veckomeny.css";

const Veckomeny = () => {
  const [meals, setMeals] = useState({
    Måndag: "Laddar...",
    Tisdag: "Laddar...",
    Onsdag: "Laddar...",
    Torsdag: "Laddar...",
    Fredag: "Laddar..."
  });

  
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("https://ntifoodpeople.vercel.app/api/food/week"); 
        const apiData = response.data.items;
        const formattedMeals = {};

        
        apiData.forEach((item) => {
          const day = item.title.split(" - ")[0];
          formattedMeals[day] = item.description;
        });

        setMeals(formattedMeals);
      } catch (error) {
        console.error("Fel vid hämtning av API-data:", error);
      }
    };

    fetchMeals();
  }, []); 

  return (
    <div className="menu-container">
      <div className="title">Veckans Lunch</div>
      <div className="menu">
        {["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"].map((day) => (
          <div className="day" key={day}>
            <span className="day-name">{day}</span>
            <span className="meal">{meals[day] || "Ingen data"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Veckomeny;

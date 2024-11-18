import React from "react";
import "./veckomeny.css";

const Veckomeny = () => {
  return (
    <div className="menu-container">
      <div className="title">Veckans Lunch</div>
      <div className="menu">
        <div className="day">
          <span className="day-name">Måndag</span>
          <span className="meal">...</span>
        </div>
        <div className="day">
          <span className="day-name">Tisdag</span>
          <span className="meal">...</span>
        </div>
        <div className="day">
          <span className="day-name">Onsdag</span>
          <span className="meal">...</span>
        </div>
        <div className="day">
          <span className="day-name">Torsdag</span>
          <span className="meal">...</span>
        </div>
        <div className="day">
          <span className="day-name">Fredag</span>
          <span className="meal">...</span>
        </div>
      </div>
    </div>
  );
};




export default Veckomeny;
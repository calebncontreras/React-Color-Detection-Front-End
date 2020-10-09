import React from "react";
import "./ColorRow.css";
const ColorRow = ({ name, hex }) => {
  return (
    <div className="color-row flex align-center justify-center" style={{ backgroundColor: hex }}>
      {`${name}: ${hex}`}
    </div>
  );
};

export default ColorRow;

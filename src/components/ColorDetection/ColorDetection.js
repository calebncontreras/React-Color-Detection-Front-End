import React from "react";
import "./ColorDetection.css";

const ColorDetection = ({ imageURL, colorPallete }) => {
  return (
    <div className="center">
      {/* <img alt="" src="./brain.png" /> */}
      <div className="absolute mt2 box color-detection">
        <img
          id="inputimage"
          alt=""
          src={imageURL}
          width="500px"
          height="auto"
        />
        {colorPallete}
        <button className="button">Save in Library</button>
        <button className="button">Preview Colors</button>
      </div>
    </div>
  );
};

export default ColorDetection;

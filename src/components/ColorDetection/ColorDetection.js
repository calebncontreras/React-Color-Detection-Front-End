import React from "react";
import "./ColorDetection.css";
import ColorPallet from "../ColorPallet/ColorPallet";
const ColorDetection = ({ imageURL, colors, primaryColor }) => {
  return (
    <div className="center">
      <div className="absolute mt2 color-detection">
        <img
          id="inputimage"
          alt=""
          src={imageURL}
          width="500px"
          height="auto"
        />
        <div className="container fl w-40 ba br2 bw2 b--black-60">
          <ColorPallet colors={colors} />
          <button className="button link f4 pa2 dim white bg-light-purple">
            Save in Library
          </button>
          <button className="button link f4 pa2 dim white bg-light-purple ">
            Preview Colors
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorDetection;

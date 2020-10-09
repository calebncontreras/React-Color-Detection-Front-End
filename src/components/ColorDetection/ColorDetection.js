import React from "react";
import "./ColorDetection.css";
import ColorRow from "../ColorRow/ColorRow.js";


const ColorDetection = ({ imageURL, colors, deleteResults }) => {
  return (
      <div className="w-100 pa4 db flex flex-row justify-center">
        
        <img
          id="inputimage"
          alt=""
          src={imageURL}
          height="500px"
          className="mw-100 ma2"
        />
        
        <div className="mw-50 ma2 flex flex-row" style={{height: '500px'}}>
          
          <div className="color-col w-100">
              {colors.map((color) => {
                return <ColorRow {...color} />;
              })}
          </div>

          <div id="menu-buttons" className="flex flex-column">
            <button className="button link ma2 f5 pa2 dim white bg-light-purple">
              Save in Library
            </button>
            <button className="button link ma2 f5 pa2 dim white bg-light-purple ">
              Preview Colors
            </button>
            <button onClick={deleteResults} className="button link ma2 f5 pa2 dim white bg-red ">
              Discard
            </button>
          </div>
        
        </div>
      </div>
  );
};

export default ColorDetection;

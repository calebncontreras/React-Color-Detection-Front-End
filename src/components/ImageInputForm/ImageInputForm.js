import React from "react";
import "./ImageInputForm.css";

const ImageInputForm = ({ onInputChange, onSubmitForm }) => {
  return (
    <div>
      <p className="f4 pa4">
        {
          "This Magic Brain will detect the primary colors in any picture. Give it a try."
        }
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f5 pa2 w-70 center"
            type="tex"
            onChange={onInputChange}
            placeholder="paste an image url..."
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onSubmitForm}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageInputForm;

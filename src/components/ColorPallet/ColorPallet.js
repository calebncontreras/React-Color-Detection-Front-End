import React from "react";
import ColorRow from "../ColorRow/ColorRow";
import "./ColorPallet.css";
class ColorPallete extends React.Component {
  render() {
    const { colors } = this.props;

    return (
      <div className="color-col">
        {colors.map((color), () => {
          return <ColorRow />
        })}
      </div>
    );
  }
}

export default ColorPallete;

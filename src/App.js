import React from "react";
import Clarifai from "clarifai";
import Particles from "react-particles-js";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import ImageInputForm from "./components/ImageInputForm/ImageInputForm";
import ColorDetection from "./components/ColorDetection/ColorDetection";
import "./App.css";

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "f3ead08f7e894e55a0e723694069ef13",
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      ImageURL: "",
    };
  }

  onInputChange = (event) => this.setState({ input: event.target.value });

  onSubmitForm = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.COLOR_MODEL, this.state.input)
      .then((response) => {
        this.createColorPallete(this.extractColorData(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  extractColorData = (data) => {
    // Debug
    // console.log(data);
    // console.log(data.outputs[0].data.colors);
    const colorsArr = data.outputs[0].data.colors.map((color) => {
      console.log(color);
      return color["w3c"];
    });
    // console.log(colorsArr);
    return colorsArr;
  };

  createColorPallete = (data) => {
    const colorPallete = data.map((color) => {
      const { hex, name } = color;
      const elemStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hex,
        width: "200px",
        height: "50px",
        color: "white",
      };
      return (
        <div
          style={elemStyle}
          className="color-element"
        >{`${name}: ${hex}`}</div>
      );
    });

    this.setState({
      colorPallete: <div className="color-pallete">{colorPallete}</div>,
    });
  };

  render() {
    const { input, imageURL, colorPallete } = this.state;
    console.log(input);
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <ImageInputForm
          onInputChange={this.onInputChange}
          onSubmitForm={this.onSubmitForm}
        />
        <ColorDetection imageURL={imageURL} colorPallete={colorPallete} />
      </div>
    );
  }
}

export default App;

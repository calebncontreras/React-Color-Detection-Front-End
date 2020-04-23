import React from "react";
import Clarifai from "clarifai";
import Particles from "react-particles-js";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import ImageInputForm from "./components/ImageInputForm/ImageInputForm";
import ColorDetection from "./components/ColorDetection/ColorDetection";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

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
      imageURL: "",
      colors: [],
      loaded: false,
      isSignedIn: false,
      route: "signin",
    };
    console.log("constructor");
  }

  onInputChange = (event) => this.setState({ input: event.target.value });

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  onSubmitForm = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.COLOR_MODEL, this.state.input)
      .then((response) => {
        this.extractColorData(response);
        this.setState({ loaded: true });
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
    const color = colorsArr[0]["hex"];

    this.setState({ primaryColor: color });
    this.setState({
      colors: colorsArr,
    });
    return colorsArr;
  };

  render() {
    const { imageURL, colors, primaryColor, isSignedIn, route } = this.state;
    // const primaryColor = colorPallete[0]["hex"];
    console.log("state:", this.state);
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <ImageInputForm
              onInputChange={this.onInputChange}
              onSubmitForm={this.onSubmitForm}
            />
            <ColorDetection
              colors={colors}
              imageURL={imageURL}
              primaryColor={primaryColor}
            />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;

import React from "react";
import Clarifai from "clarifai";
import Particles from "react-particles-js";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import ImageInputForm from "./components/ImageInputForm/ImageInputForm";
import ColorDetection from "./components/ColorDetection/ColorDetection";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";
import Rank from "./components/Rank/Rank";

import "./App.css";

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "72e02b44ed5943c4b2bc5e1cf6a80c4c",
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

const initialState = {
  input: "",
  imageURL: "",
  colors: [],
  detectSuccess: false,
  isSignedIn: false,
  route: "signin",
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
    console.log(this.state.user);
  };

  onInputChange = (event) => this.setState({ input: event.target.value });

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ initialState });
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
        this.onColorDetectSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  IncrementScore = () => {
    fetch("http://localhost:3000/detectSuccess", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  onColorDetectSuccess = () => {
    this.setState({ detectSuccess: true });
    this.IncrementScore();
  };

  extractColorData = (data) => {
    const colorsArr = data.outputs[0].data.colors.map((color) => {
      console.log(color);
      return color["w3c"];
    });

    this.setState({
      colors: colorsArr,
    });
    return colorsArr;
  };

  render() {
    const { imageURL, colors, isSignedIn, route, detectSuccess } = this.state;
    const { entries, name } = this.state.user;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div className="body">
            <Logo />
            <Rank className="center" name={name} entries={entries} />
            <ImageInputForm
              onInputChange={this.onInputChange}
              onSubmitForm={this.onSubmitForm}
            />
            {detectSuccess === true ? (
              <ColorDetection colors={colors} imageURL={imageURL} />
            ) : (
              <p className="pa5 f4">No Image Detected</p>
            )}
            <Footer />
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;

import React from "react";
import Clarifai from "clarifai";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "f3ead08f7e894e55a0e723694069ef13",
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <div className="App"></div>;
  }
}

export default App;

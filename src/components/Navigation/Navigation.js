import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="ba bw" style={{ display: "flex", justifyContent: "center" }}>
        <p
          onClick={() => onRouteChange("signout")}
          className="f3 link dim black pa4 pointer"
        >
          Signout
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="ba bw1"style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="self-center">Smart Brains AI</h1>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black pa4 pointer"
        >
          SignIn
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black pa4 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};
export default Navigation;

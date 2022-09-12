import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <App/>
// );
ReactDOM.render(
  <Auth0Provider
    domain="elgoh.us.auth0.com"
    clientId="3CVQjahdc8e1z1cUdqsZMw15FfhqylxW"
    redirectUri={window.location.origin + "/dashboard"}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

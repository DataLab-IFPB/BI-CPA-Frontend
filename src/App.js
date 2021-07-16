import React from "react";

import "./assets/styles/global.css";

import Routes from "./routes";

import Loading from "./components/Loading";

function App() {
  return <div><Routes /><Loading /></div>;
}

export default App;

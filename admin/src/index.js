import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

ReactDOM.render(

  <AuthContextProvider>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </AuthContextProvider>,

  document.getElementById("root")
);

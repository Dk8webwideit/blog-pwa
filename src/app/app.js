import React from "react";
import { render } from "react-dom";
import { checkAuthuser } from "services/authService";

import Main from "./Main";

const aiRoot = document.getElementById("aiRoot");
const renderApp = () => {
  render(<Main />, aiRoot);
};

//renderApp();
window.addEventListener("DOMContentLoaded", function() {
  renderApp(checkAuthuser());
});

import React from "react";

import "./Button.scss";

const Button = props => (
  <button className="button" disabled={props.disabled}>
    {props.children}
  </button>
);

export default Button;

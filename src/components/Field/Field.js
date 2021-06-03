import React from "react";

import "./Field.scss";

const Input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = <input className="field__input" {...props.elementConfig} value={props.value} />;
      break;

    case "select":
      inputElement = (
        <select className="field__select" value={props.value}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      return inputElement;
  }

  return inputElement;
};

export default Input;

import React from "react";

import "./Field.scss";

const Field = props => {
  const fieldTemplates = {
    input: () => (
      <input className="field__input" {...props.elementConfig} value={props.value} onChange={props.changed} required />
    ),
    select: () => (
      <select className="field__input field__input--select" value={props.value} onChange={props.changed}>
        {props.elementConfig.options.map(option => (
          <option className="field__option" key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
    ),
  };

  let fieldElement = fieldTemplates[props.elementType]();

  return fieldElement;
};

export default Field;

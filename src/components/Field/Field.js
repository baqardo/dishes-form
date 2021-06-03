import React from "react";

import "./Field.scss";

const Field = props => {
  const fieldTemplates = {
    input: () => (
      <input className="field__input" {...props.elementConfig} value={props.value} onChange={props.changed} />
    ),
    select: () => (
      <select className="field__select" value={props.value} onChange={props.changed}>
        {props.elementConfig.options.map(option => (
          <option key={option.value} value={option.value}>
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

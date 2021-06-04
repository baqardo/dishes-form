import React from "react";

import "./Field.scss";

const Field = props => {
  let classes = "field__input";

  if (props.invalid) classes += " field__input--invalid";

  const fieldTemplates = {
    input: () => (
      <input
        className={classes}
        id={props.id}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        required
      />
    ),
    select: () => (
      <select className="field__input field__input--select" id={props.id} value={props.value} onChange={props.changed}>
        {props.elementConfig.options.map(option => (
          <option className="field__option" key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
    ),
  };

  console.log(props);

  let fieldElement = (
    <>
      <label className="field__label" for={props.id}>
        {props.elementConfig.placeholder}
      </label>
      {fieldTemplates[props.elementType]()}
    </>
  );

  return fieldElement;
};

export default Field;

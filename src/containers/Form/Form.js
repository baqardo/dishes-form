import React, { Component } from "react";
import Field from "../../components/Field/Field";

import "./Form.scss";

class Form extends Component {
  state = {
    dishForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Dish Name",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
        isVisible: true,
      },
      preparation_time: {
        elementType: "input",
        elementConfig: {
          type: "time",
          placeholder: "Dish Name",
          step: "1",
        },
        value: "00:00:00",
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
        isVisible: true,
      },
      type: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "pizza", displayValue: "Pizza" },
            { value: "soup", displayValue: "Soup" },
            { value: "sandwich", displayValue: "Sandwich" },
          ],
        },
        value: "pizza",
        validation: {
          required: true,
        },
        isValid: true,
        isTouched: false,
        isVisible: true,
      },
      no_of_slices: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Number of Slices",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
        isVisible: false,
      },
      diameter: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Diameter",
          step: "0.01",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
        isVisible: false,
      },
      spiciness_scale: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Spiciness Scale",
          min: "1",
          max: "10",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
        isVisible: false,
      },
      slices_of_bread: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Slices of Bread ",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
        isVisible: false,
      },
    },
  };

  render() {
    const formElements = [];

    for (const key in this.state.dishForm) {
      formElements.push({
        id: key,
        config: this.state.dishForm[key],
      });
    }

    const elementsToRender = formElements.map(formElement => {
      const { elementType, elementConfig, value } = formElement.config;
      return <Field key={formElement.id} elementType={elementType} elementConfig={elementConfig} value={value} />;
    });

    return <form className="form">{elementsToRender}</form>;
  }
}

export default Form;

import React, { Component } from "react";
import Field from "../../components/Field/Field";

import "./Form.scss";

class Form extends Component {
  state = {
    isValid: false,
    globalCategory: "pizza",
    dishForm: {
      name: {
        elementCategory: "default",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Dish Name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
        },
        isValid: false,
        isTouched: false,
      },
      preparation_time: {
        elementCategory: "default",
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
      },
      type: {
        elementCategory: "default",
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
      },
      no_of_slices: {
        elementCategory: "pizza",
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Number of Slices",
          min: 1,
        },
        value: "",
        validation: {
          required: true,
          min: 1,
        },
        isValid: false,
        isTouched: false,
      },
      diameter: {
        elementCategory: "pizza",
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Diameter",
          step: "0.01",
          min: "0.01",
        },
        value: "",
        validation: {
          required: true,
          min: 0.01,
        },
        isValid: false,
        isTouched: false,
      },
      spiciness_scale: {
        elementCategory: "soup",
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
          min: 1,
          max: 10,
        },
        isValid: false,
        isTouched: false,
      },
      slices_of_bread: {
        elementCategory: "sandwich",
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Slices of Bread ",
          min: "1",
        },
        value: "",
        validation: {
          required: true,
          min: 1,
        },
        isValid: false,
        isTouched: false,
      },
    },
  };

  inputChangeHandler = (event, fieldID) => {
    const updatedDishForm = { ...this.state.dishForm };
    const updatedFormElement = { ...updatedDishForm[fieldID] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedDishForm[fieldID] = updatedFormElement;

    this.setState({ dishForm: updatedDishForm });
    console.log(updatedFormElement.isValid);
  };

  selectChangeHandler = (event, fieldID) => {
    const updatedDishForm = { ...this.state.dishForm };
    const updatedFormElement = { ...updatedDishForm[fieldID] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedDishForm[fieldID] = updatedFormElement;

    const updatedGlobalCategory = updatedFormElement.value;

    this.setState({ dishForm: updatedDishForm, globalCategory: updatedGlobalCategory });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.min) {
      isValid = value >= rules.min && isValid;
    }

    if (rules.max) {
      isValid = value <= rules.max && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  render() {
    const formElements = [];

    for (const key in this.state.dishForm) {
      const elementCategory = this.state.dishForm[key].elementCategory;
      const globalCategory = this.state.globalCategory;

      if (elementCategory === "default" || elementCategory === globalCategory)
        formElements.push({
          id: key,
          config: this.state.dishForm[key],
        });
    }

    const elementsToRender = formElements.map(formElement => {
      const { elementType, elementConfig, value } = formElement.config;
      return (
        <Field
          key={formElement.id}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          inputChanged={event => this.inputChangeHandler(event, formElement.id)}
          selectChanged={event => this.selectChangeHandler(event, formElement.id)}
        />
      );
    });

    return <form className="form">{elementsToRender}</form>;
  }
}

export default Form;

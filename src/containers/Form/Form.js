import React, { Component } from "react";
import Button from "../../components/Button/Button";
import Field from "../../components/Field/Field";

import "./Form.scss";

class Form extends Component {
  state = {
    isValid: false,
    globalCategory: "pizza",
    dishForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Dish Name",
        },
        value: "",
        validation: {
          isRequired: true,
          minLength: 2,
        },
        isValid: false,
        isTouched: false,
        category: "default",
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
          isRequired: true,
        },
        isValid: false,
        isTouched: false,
        category: "default",
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
          isRequired: true,
        },
        isValid: true,
        isTouched: false,
        category: "default",
      },
      no_of_slices: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Number of Slices",
          min: 1,
        },
        value: "",
        validation: {
          isRequired: true,
          isNumeric: true,
          min: 1,
        },
        isValid: false,
        isTouched: false,
        category: "pizza",
      },
      diameter: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Diameter",
          step: "0.01",
          min: "0.01",
        },
        value: "",
        validation: {
          isRequired: true,
          isNumeric: true,
          min: 0.01,
        },
        isValid: false,
        isTouched: false,
        category: "pizza",
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
          isRequired: true,
          isNumeric: true,
          min: 1,
          max: 10,
        },
        isValid: false,
        isTouched: false,
        category: "soup",
      },
      slices_of_bread: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Slices of Bread ",
          min: "1",
        },
        value: "",
        validation: {
          isRequired: true,
          isNumeric: true,
          min: 1,
        },
        isValid: false,
        isTouched: false,
        category: "sandwich",
      },
    },
  };

  fieldChangeHandler = (event, editedFieldID) => {
    const updatedDishForm = { ...this.state.dishForm };
    const updatedFormElement = { ...updatedDishForm[editedFieldID] };

    updatedFormElement.isValid = this.checkValidity(event.target.value, updatedFormElement.validation);

    if (updatedFormElement.elementConfig.type === "number") {
      updatedFormElement.value = Number(event.target.value);
    } else {
      updatedFormElement.value = event.target.value;
    }

    updatedFormElement.isTouched = true;
    updatedDishForm[editedFieldID] = updatedFormElement;

    let updatedGlobalCategory = this.state.globalCategory;
    if (editedFieldID === "type") updatedGlobalCategory = updatedFormElement.value;

    let isFormValid = true;
    for (let fieldID in updatedDishForm) {
      const fieldCategory = this.state.dishForm[fieldID].category;

      if (!this.isProperCategory(fieldCategory, updatedGlobalCategory)) continue;
      isFormValid = updatedDishForm[fieldID].isValid && isFormValid;
    }
    this.setState({ dishForm: updatedDishForm, globalCategory: updatedGlobalCategory, isValid: isFormValid });
  };

  submitHandler = event => {
    event.preventDefault();

    const dataToSend = {};

    for (const fieldID in this.state.dishForm) {
      const field = this.state.dishForm[fieldID];
      const fieldCategory = field.category;

      if (!this.isProperCategory(fieldCategory)) continue;

      dataToSend[fieldID] = field.value;
    }

    fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", {
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(answer => answer.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.isRequired) {
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

  isProperCategory(category, globalCategory = this.state.globalCategory) {
    if (category === "default" || category === globalCategory) return true;

    return false;
  }

  render() {
    const formElements = [];

    for (const fieldID in this.state.dishForm) {
      const field = this.state.dishForm[fieldID];
      const fieldCategory = field.category;

      if (!this.isProperCategory(fieldCategory)) continue;

      formElements.push({
        id: fieldID,
        config: field,
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
          changed={event => this.fieldChangeHandler(event, formElement.id)}
        />
      );
    });

    return (
      <form className="form" onSubmit={this.submitHandler}>
        {elementsToRender}
        <Button>Submit</Button>
      </form>
    );
  }
}

export default Form;

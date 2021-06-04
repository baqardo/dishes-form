import React, { Component } from "react";
import Button from "../../components/Button/Button";
import Field from "../../components/Field/Field";
import Spinner from "../../components/Spinner/Spinner";

import "./Form.scss";

import logoImage from "../../assets/svg/logo.svg";
import waveImage from "../../assets/svg/wave.svg";

class Form extends Component {
  state = {
    isLoading: false,
    isValid: false,
    globalCategory: "pizza",
    error: null,
    dishForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Dish Name",
          minLength: "2",
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
          placeholder: "Preparation Time",
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
          placeholder: "Dish Type",
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
          isFloat: true,
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

  fieldChangeHandler = (event, formElementID) => {
    const updatedDishForm = { ...this.state.dishForm };
    const updatedFormElement = { ...updatedDishForm[formElementID] };

    const fieldType = updatedFormElement.elementConfig.type;
    const fieldValue = this.formatFieldValue(event.target.value, fieldType);

    updatedFormElement.isValid = this.isFieldValid(fieldValue, updatedFormElement.validation);
    updatedFormElement.value = fieldValue;
    updatedFormElement.isTouched = true;

    updatedDishForm[formElementID] = updatedFormElement;

    let updatedGlobalCategory = this.state.globalCategory;
    if (formElementID === "type") updatedGlobalCategory = updatedFormElement.value;

    this.setState({
      dishForm: updatedDishForm,
      globalCategory: updatedGlobalCategory,
      isValid: this.isFormValid(updatedDishForm, updatedGlobalCategory),
    });
  };

  submitHandler = event => {
    event.preventDefault();
    if (!this.state.isValid) return;

    this.setState({ isLoading: true });

    let dataToSend = this.giveDataToSend();
    this.sendDishData(dataToSend);
  };

  isFieldValid(value, rules) {
    let isValid = true;

    if (rules.isRequired) {
      isValid = value.toString().trim() !== "" && isValid;
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

    if (rules.isFloat) {
      const testedValue = parseFloat(value);
      isValid = !isNaN(testedValue) && isValid;
    }

    return isValid;
  }

  isFormValid(form, globalCategory) {
    let isFormValid = true;
    for (let fieldID in form) {
      const fieldCategory = this.state.dishForm[fieldID].category;

      if (!this.isProperCategory(fieldCategory, globalCategory)) continue;

      isFormValid = form[fieldID].isValid && isFormValid;
    }

    return isFormValid;
  }

  isProperCategory(category, globalCategory = this.state.globalCategory) {
    if (category === "default" || category === globalCategory) return true;

    return false;
  }

  formatTimeInput(time) {
    if (time.length < 8) return time + ":00";
    else return time;
  }

  convertToNumber(input) {
    return Number(input);
  }

  formatFieldValue(value, type) {
    let formattedValue = value;

    if (type === "number") formattedValue = this.convertToNumber(value);
    if (type === "time") formattedValue = this.formatTimeInput(value);

    return formattedValue;
  }

  giveDataToSend() {
    const dataToSend = {};

    for (const fieldID in this.state.dishForm) {
      const field = this.state.dishForm[fieldID];
      const fieldCategory = field.category;

      if (!this.isProperCategory(fieldCategory)) continue;

      dataToSend[fieldID] = field.value;
    }

    return dataToSend;
  }

  async sendDishData(data) {
    try {
      const response = await fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      let error = null;

      if (response.ok) {
        const responseData = await response.json();
        this.resetFieldsValue();
        console.log("Success", responseData);
      } else {
        const responseData = await response.json();

        for (const key in responseData) {
          const name = this.state.dishForm[key].elementConfig.placeholder;
          error = { name: name, message: responseData[key] };
        }
      }

      this.setState({ isLoading: false, error: error });
    } catch (fetchError) {
      console.log(fetchError);

      this.setState({ isLoading: false, error: { name: "server", message: "Unknown Error" } });
    }
  }

  resetFieldsValue() {
    const form = { ...this.state.dishForm };

    for (const fieldID in this.state.dishForm) {
      const field = { ...form[fieldID] };

      if (fieldID === "type") continue;

      if (fieldID === "preparation_time") field.value = "00:00:00";
      else field.value = "";

      form[fieldID] = field;
    }

    this.setState({ dishForm: form });
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
          id={formElement.id}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          changed={event => this.fieldChangeHandler(event, formElement.id)}
          invalid={!formElement.config.isValid && formElement.config.isTouched}
        />
      );
    });

    return (
      <div className="form-wrapper">
        <form className="form" onSubmit={this.submitHandler}>
          <div className="form__decorations">
            <img className="form__wave" src={waveImage} alt="logo" />
            <img className="form__logo" src={logoImage} alt="" />
          </div>
          <h1 className="form__title">Dishes</h1>
          {elementsToRender}
          {this.state.error && (
            <p className="form__error">
              {this.state.error.name}: {this.state.error.message}
            </p>
          )}
          {this.state.isLoading ? <Spinner /> : <Button disabled={!this.state.isValid}>Submit</Button>}
        </form>
      </div>
    );
  }
}

export default Form;

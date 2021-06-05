export const checkFieldValidity = (value, rules) => {
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
};

export const convertToNumber = input => {
  return Number(input);
};

export const formatTime = time => {
  if (time.length < 8) return time + ":00";
  else return time;
};

export const isProperCategory = (category, globalCategory) => {
  if (category === "default" || category === globalCategory) return true;

  return false;
};

export const formatFieldValue = (value, type) => {
  let formattedValue = value;

  if (type === "number") formattedValue = convertToNumber(value);

  return formattedValue;
};

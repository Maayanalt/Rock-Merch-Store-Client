function validate(name, value, validation) {
  const errors = [];
  if (validation.required && !value) {
    errors.push(`${name} is required`);
  }

  if (validation.minLength && value.length < validation.minLength) {
    errors.push(`${name} must be at least ${validation.minLength} characters.`);
  }

  if (validation.pattern && !validation.pattern.test(value)) {
    errors.push(`${name} is invalid`);
  }

  if (validation.value && validation.value !== value) {
    errors.push(`${name} is not the same`);
  }

  return errors;
}

export default validate;

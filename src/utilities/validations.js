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

  if (validation.MatchValue && validation.MatchValue.value !== value) {
    errors.push(`${validation.MatchValue.property}'s do not match`);
  }

  return errors;
}

export default validate;

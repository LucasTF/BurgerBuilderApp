export const validationHandler = (value, rules) => {
	let isValid = true;

	if (rules.required) isValid = value.trim() !== '';
	if (isValid && rules.minLength) isValid = value.length >= rules.minLength;
	if (isValid && rules.maxLength) isValid = value.length <= rules.maxLength;

	return isValid;
};

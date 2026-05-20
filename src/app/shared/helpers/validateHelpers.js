export const isNotEmpty = (value) => {
  return value !== null && value !== undefined && value !== '';
};


export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};


export const isInteger = (value) => {
  return isNumber(value) && parseInt(value) === parseFloat(value);
};


export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return regex.test(email);
};


export const isPositiveNumber = (value) => {
  return isNumber(value) && parseFloat(value) > 0;
};


export const isValidId = (id) => {
  return id && id !== -1 && isPositiveNumber(id);
};


export const hasMinLength = (value, minLength = 1) => {
  if (!value) return false;
  return value.toString().length >= minLength;
};


export const hasMaxLength = (value, maxLength = 255) => {
  if (!value) return true;
  return value.toString().length <= maxLength;
};


export const isValidDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};


export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};


export const isEmptyArray = (arr) => {
  return !arr || !Array.isArray(arr) || arr.length === 0;
};


export default {
  isNotEmpty,
  isNumber,
  isInteger,
  isValidEmail,
  isPositiveNumber,
  isValidId,
  hasMinLength,
  hasMaxLength,
  isValidDate,
  isEmptyObject,
  isEmptyArray,
};
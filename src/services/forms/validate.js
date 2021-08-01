import validators from './validators'

export default function validate(value, options = null) {
  let isValid = true

  if (!options) return { isValid }

  if (!options.required && validators.empty(value)) return { isValid }

  Object.keys(options).forEach(key => {
    isValid = validators[key](value, options[key]) && isValid
  })
  
  for (const key in options) {
    isValid = validators[key](value)
    if (!isValid) return { isValid, errorMessage: options[key] }
  }

  return { isValid }
}

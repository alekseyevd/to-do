import { useState } from "react"
import validate from "./validate"
import { validateForm } from "./validateForm"

export const useForm = (params) => {
  const initialState = {
    valid: false,
    controls: params.controls
  }

  const [state, setState] = useState(initialState)

  const handleOnChange = (e) => {
    const controlName = e.target.name
    const controls = { ...state.controls }
    const control = { ...controls[controlName] }

    control.value = e.target.value
    control.touched = true

    const { isValid, errorMessage } = validate(control.value, control.validation)
    control.valid = isValid
    control.errorMessage = errorMessage || ''
    
    controls[controlName] = control

    let valid = validateForm(controls)
    setState({
      ...state, controls, valid
    })   
  }

  const handleOnFormSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    for (let key in state.controls) {
      formData.append(key, state.controls[key].value)
    }

    let response = await fetch('https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Name', {
      method: 'POST',
      body: formData
    })
    let result = await response.json()
    console.log(result);
  }

  const setError = (error) => {
    setState({
      ...state, error
    })
  }

  const clear = () => {
    setState(initialState)
  }

  return {
    state,
    setError,
    handleOnChange,
    handleOnFormSubmit,
    clear
  }
}

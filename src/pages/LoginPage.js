import { useForm } from "../services/forms"
import Api from '../core/api/Api'
import { useContext, useEffect } from "react"
import { Context } from "../core/context"
import { Link, useHistory  } from "react-router-dom"

export const LoginPage = () => {
  const { login, user, clearErrorMessage } = useContext(Context)
  const history = useHistory()
  const form = useForm({
    controls: {
      username: {
        type: 'text',
        value: '',
        label: 'username',
        valid: false,
        touched: false,
        validation: {
          required: 'Поле является обязательным для заполнения',
        }
      },
      password: {
        type: 'password',
        value: '',
        label: 'password',
        valid: false,
        touched: false,
        validation: {
          required: 'Поле является обязательным для заполнения',
        }
      }
    }
  })

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    try {
      let result = await Api.login(form.state.controls)
      login({
        user: form.state.controls.username.value,
        token: result.message.token
      })
      form.clear()
    } catch (error) {
      form.setError(error.message)
    }
  }

  const handleResetForm = (e) => {
    e.preventDefault()
    form.clear()
  }

  useEffect(() => {
    clearErrorMessage()
    if (user) history.push('/')
  }, [history, user])

  return (
    <div>
      <Link to='/'>back to main</Link>
      <h1>LoginPage</h1>
      {
        form.state.error && <div>{form.state.error}</div>
      }
      <form id="login">
        <div>
          <input 
            type="text"
            value={form.state.controls.username.value} 
            name="username" 
            placeholder="username" 
            onChange={form.handleOnChange} 
            data-error={!form.state.controls.username.valid && form.state.controls.username.touched }
          />
        </div>
        <div>
          <input 
            type="password"
            value={form.state.controls.password.value} 
            name="password" 
            placeholder="password" 
            onChange={form.handleOnChange} 
            data-error={!form.state.controls.password.valid && form.state.controls.password.touched }
          />
        </div>
        <button onClick={handleSubmitForm} disabled={!form.state.valid}>Login</button><button onClick={handleResetForm}>Reset</button>
      </form>
    </div>
  )
}

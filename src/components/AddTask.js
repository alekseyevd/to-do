import { useContext } from "react"
import Api from "../core/api/Api"
import { Context } from "../core/context"
import { useForm } from "../services/forms"

export const AddTask = () => {
  const { addTask } = useContext(Context)
  const form = useForm({
    controls: {
      username: {
        type: 'text',
        value: '',
        label: 'name',
        valid: false,
        touched: false,
        validation: {
          required: 'Поле является обязательным для заполнения',
        }
      },
      email: {
        type: 'text',
        value: '',
        label: 'email',
        valid: false,
        touched: false,
        validation: {
          required: 'Поле является обязательным для заполнения',
          email: 'Неверный email',
        }
      },
      text: {
        type: 'text',
        value: '',
        label: 'text',
        valid: false,
        touched: false,
        validation: {
          required: 'Поле является обязательным для заполнения',
        }
      },
    }
  })

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    try {
      let result = await Api.createTask(form.state.controls)
      addTask(result.message)
      form.clear()
    } catch (error) {
      form.setError(error.message)
    }
  }

  const handleResetForm = (e) => {
    e.preventDefault()
    form.clear()
  }

  return (
    <form id="tasks">
      <h1>Add new task</h1>
      {
        form.state.error && <div>{form.state.error}</div>
      }
      <div>
        <input 
          value={form.state.controls.username.value} 
          name="username" 
          placeholder="username" 
          onChange={form.handleOnChange} 
          data-error={!form.state.controls.username.valid && form.state.controls.username.touched }
        />
      </div>
      <div>
        <input 
          value={form.state.controls.email.value} 
          name="email" 
          placeholder="email" 
          onChange={form.handleOnChange}
          data-error={!form.state.controls.email.valid && form.state.controls.email.touched }
        />
      </div>
      <div>
        <textarea 
          name="text"
          placeholder="text"
          onChange={form.handleOnChange}
          value={form.state.controls.text.value}
          data-error={!form.state.controls.text.valid && form.state.controls.text.touched }
        />
      </div>
      <div>
        <button onClick={handleSubmitForm}>Insert</button>
        <button onClick={handleResetForm}>Reset</button>
      </div>
    </form>
  )
}

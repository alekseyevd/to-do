import { useContext, useState } from "react"
import { Context } from "../core/context"
import { withTags } from "../helpers"

export const EditTask = ({ task }) => {
  const text = withTags(task.text)
  const { changeText, token } = useContext(Context)
  const [value, setValue] = useState(text)
  const [isButtonsVisible, setVisible] = useState(false)

  const changeHandler = (e) => {
    setValue(e.target.value)
    setVisible(true)
  }

  const cancelHandler = () => {
    setValue(text)
    setVisible(false)
  }

  const saveHandler = () => {
    changeText(task.id, value, task.status, token)
  }

  return (
    <>
      <textarea value={value} onChange={changeHandler}></textarea>
      {
        isButtonsVisible && 
        <div>
          <button onClick={saveHandler} disabled={!value}>save</button>
          <button onClick={cancelHandler}>cancel</button>
        </div>
      }
    </>
  )
}
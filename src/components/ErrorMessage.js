import { useContext } from "react"
import { Context } from "../core/context"

export const ErrorMessage = () => {
  const {errorMessage} = useContext(Context)

  if (!errorMessage) return null

  return (
    <div>{errorMessage}</div>
  )
}
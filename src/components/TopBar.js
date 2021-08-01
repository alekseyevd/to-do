import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../core/context"

export const TopBar = () => {
  const { logout, user } = useContext(Context)
  return (
    <div>
      { 
        user
          ? <>
              <button onClick={logout}>logout</button>
              <span>{user}</span>
            </>
          : <Link to='login'>login page</Link>
      }
    </div>
  )
}

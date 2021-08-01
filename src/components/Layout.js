import { useContext, useEffect } from "react"
import { Context } from "../core/context"
import { useRoutes } from "../services/routes"
import { BrowserRouter } from 'react-router-dom'
import { ErrorMessage } from "./ErrorMessage"
import stateProcessor from "../services/stateProcessor"


export const Layout = () => {
  const { ready, page, sortDirection, sortField } = useContext(Context)
  const Router = useRoutes()

  useEffect(() => {
    stateProcessor.saveState({ page, sortDirection, sortField })
  }, [page, sortDirection, sortField])

  if (!ready) return <div>loading...</div>

  return (
    <BrowserRouter>
      <ErrorMessage />
      {Router}
    </BrowserRouter>
  )
}

import { Redirect, Route, Switch } from 'react-router-dom' 
import { MainPage } from '../pages/MainPage'
import { LoginPage } from '../pages/LoginPage'

export const useRoutes = () => {
  const pages = [
    { path: '/', component: MainPage },
    { path: '/login', component: LoginPage}
  ]
  
  return (
    <Switch>
      {
        pages.map(page => {
          return (
            <Route path={page.path} component={page.component} exact key={page.path}/>
          )
        })
      }
      <Redirect to="/" />
    </Switch>
  )
}

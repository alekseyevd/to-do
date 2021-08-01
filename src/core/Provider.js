import { useReducer } from 'react'
import { useAuth } from '../services/auth'
import stateProcessor from '../services/stateProcessor'
import { fetchTasks, fetchStatus, fetchText } from './actions'
import { 
  SHOW_NEXT_PAGE, SHOW_FIRST_PAGE, SHOW_PREV_PAGE, SHOW_LAST_PAGE,
  SORT, ADD_TASK, CLEAR_ERROR
} from './actionsTypes'
import { Context } from './context'
import { reducer } from './reducer'

export const Provider = ({children}) => {
  const { token, user, login, logout, ready } = useAuth()
  const [state, dispatch] = useReducer(reducer, {
    tasks: [],
    count: 0,
    page: stateProcessor.get('page') || 1,
    sortField: stateProcessor.get('sortField') || 'id',
    sortDirection: stateProcessor.get('sortDirection') || 'asc',
    errorMessage: null
  })
  const nextPage = () => dispatch({ type: SHOW_NEXT_PAGE })
  const firstPage = () => dispatch({ type: SHOW_FIRST_PAGE })
  const prevPage = () => dispatch({ type: SHOW_PREV_PAGE })
  const lastPage = () => dispatch({ type: SHOW_LAST_PAGE })
  const setTasks = fetchTasks(dispatch)
  const changeStatus = fetchStatus(dispatch)
  const changeText = fetchText(dispatch)
  const addTask = (task) => dispatch({ type: ADD_TASK, task})
  const sortBy = (field) => dispatch( {type: SORT, field })
  const clearErrorMessage = () => dispatch({ type: CLEAR_ERROR })

  return (
    <Context.Provider value={{
      login, logout,
      token, user, ready,
      tasks: state.tasks,
      count: state.count,
      page: state.page,
      errorMessage: state.errorMessage,
      sortDirection: state.sortDirection,
      sortField: state.sortField,
      nextPage, firstPage, prevPage, lastPage,
      setTasks, changeStatus, changeText, sortBy, addTask, clearErrorMessage
    }}>
      {children}
    </Context.Provider>
  )
}
import { 
  SHOW_NEXT_PAGE, SHOW_FIRST_PAGE, SHOW_PREV_PAGE, SHOW_LAST_PAGE,
  SET_TASKS, SORT, ADD_TASK, CHANGE_STATUS, CHANGE_TEXT, SHOW_ERROR,
  CLEAR_ERROR
} from './actionsTypes'
import { PAGINATION_LIMIT } from '../config'

export const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_NEXT_PAGE: return { ...state, page: state.page + 1 }
    case SHOW_FIRST_PAGE: return {...state, page: 1 }
    case SHOW_PREV_PAGE: {
      return { ...state, page: (state.page > 1) ? state.page - 1 : 1 }
    }
    case SHOW_LAST_PAGE: {
      const page = Math.ceil(state.count / PAGINATION_LIMIT) || 1
      return {...state, page }
    }
    case SET_TASKS: {
      return { 
        ...state, 
        tasks: action.payload.tasks,
        count: +action.payload.total_task_count 
      }
    }
    case SORT: {
      if (state.sortField === action.field) {
        return { ...state, sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc' }
      } else return { ...state, sortField: action.field }
    }
    case ADD_TASK: {
      let tasks = [ action.task, ...state.tasks ]
      if (tasks.length > PAGINATION_LIMIT) tasks.pop()
      return { ...state, tasks, count: state.count + 1 }
    }
    case CHANGE_STATUS: {
      let tasks = [...state.tasks]
      let index = tasks.findIndex(task => task.id === action.payload.id)
      if (index >= 0) tasks[index].status = action.payload.status
      return { ...state, tasks }
    }
    case CHANGE_TEXT: {
      let tasks = [...state.tasks]
      let index = tasks.findIndex(task => task.id === action.payload.id)
      if (index >= 0) {
        tasks[index].text = action.payload.text
        tasks[index].status = action.payload.status
      }
      return { ...state, tasks }
    }
    case SHOW_ERROR: {
      return { ...state, errorMessage: action.message }
    }
    case CLEAR_ERROR: {
      return { ...state, errorMessage: null }
    }
    default: return state
  }
}

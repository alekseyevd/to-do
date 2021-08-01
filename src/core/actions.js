import { SET_TASKS, SHOW_ERROR, CHANGE_STATUS, CHANGE_TEXT } from './actionsTypes'
import Api from './api/Api'

export const fetchTasks = (dispatch) => {
  return async (page, sortField, sortDirection) => {
    try {
      const fetched = await Api.get({ page, sort_field: sortField, sort_direction: sortDirection})
      dispatch({
        type: SET_TASKS,
        payload: fetched.message
      }) 
    } catch (error) {
      dispatch({
        type: SHOW_ERROR,
        message: error.message
      })
    }
  }
}

export const fetchStatus = (dispatch) => {
  return async (id, currentStatus, token) => {
    let status
    switch (currentStatus) {
      case 0: 
        status = 10
        break;
      case 1:
        status = 11
        break
      case 10:
        status = 0
        break
      default:
        status = 1
        break
    }

    try {
      await Api.update(id, { status, token })
      dispatch({
        type: CHANGE_STATUS,
        payload: { id, status }
      })
    } catch (error) {
      dispatch({
        type: SHOW_ERROR,
        message: error.message
      })
    }
  }
}

export const fetchText = (dispatch) => {
  return async (id, text, currentStatus, token) => {
    let status
    switch (currentStatus) {
      case 0:
        status = 1
        break
      case 10:
        status = 11
        break
      default:
        status = currentStatus
        break
    }
    try {
      await Api.update(id, { text, status, token})
      dispatch({
        type: CHANGE_TEXT,
        payload: { id, text, status }
      })
    } catch (error) {
      dispatch({
        type: SHOW_ERROR,
        message: error.message
      })
    }
  }
}
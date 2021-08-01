import { useEffect, useContext } from "react"
import { PAGINATION_LIMIT } from "../config"
import { Context } from "../core/context"
import { withTags } from "../helpers"
import { EditTask } from "./EditTask"

export const TasksList = () => {
  const { user } = useContext(Context)
  const { 
    tasks, 
    setTasks, 
    page, 
    nextPage, 
    firstPage, 
    prevPage, 
    lastPage, 
    count,
    sortField,
    sortDirection,
    sortBy,
    changeStatus,
    token
  } = useContext(Context)

  useEffect( () => {
    setTasks(page, sortField, sortDirection)
  }, [page, sortField, sortDirection])

  const isSorted = (field) => {
    if (field !== sortField) return null
    return sortDirection === 'desc' ? '↑' : '↓'

  }

  const statusToText = (n) => {
    switch (n) {
      case 0: return 'задача не выполнена' 
      case 1: return 'задача не выполнена, отредактирована админом' 
      case 10: return 'задача выполнена' 
      case 11: return 'задача отредактирована админом и выполнена' 
      default: return ''
    }
  }

  const pagesCount = Math.ceil(count / PAGINATION_LIMIT)

  return (
    <>
      { count > PAGINATION_LIMIT && <span>page {page} of {pagesCount}, </span> }
      <span>total amount: {count}</span>
      <table>
        <thead>
          <tr>
            <td width="40">
              <span onClick={() => sortBy('id')}>
                id {isSorted('id')}
              </span>
            </td>
            <td width="150">
            <span onClick={() => sortBy('username')}>
              username {isSorted('username')}
              </span>
            </td>
            <td width="150">
              <span onClick={() => sortBy('email')}>
                email {isSorted('email')}
              </span>
            </td>
            <td width="300">text</td>
            <td width="200">
              <span onClick={() => sortBy('status')}>
                status {isSorted('status')}
              </span>
            </td>
            { user && <td></td>}
          </tr>
        </thead>
        <tbody>
          {
            tasks.map(task => {
              return (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.username}</td>
                  <td>{task.email}</td>
                  <td>
                  {
                    user
                      ? <EditTask task={task} />
                      : withTags(task.text)
                  }
                   
                  </td>
                  <td>{statusToText(task.status)}</td>
                  { 
                    user &&
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => changeStatus(task.id, task.status, token)}
                        checked={task.status === 10 || task.status === 11}/>
                    </td>
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      { count > PAGINATION_LIMIT && <div>
        <button onClick={firstPage}>first</button>
        <button onClick={prevPage}>prev</button>
        <button onClick={nextPage}>next</button>
        <button onClick={lastPage}>last</button>
      </div> }
    </>
  )
}

import { AddTask } from "../components/AddTask"
import { TasksList } from "../components/TasksList"
import { TopBar } from "../components/TopBar"

export const MainPage = () => {
  return (
    <>
      <TopBar />
      <AddTask />
      <TasksList />
    </>
  )
}

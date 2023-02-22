import addToDB from "../../db/add.js"
import printTodo from "../utils/printTodo.js"

const add = async (title, description) => {
  const todo = await addToDB(title, description)

  printTodo(todo)
}

export default add

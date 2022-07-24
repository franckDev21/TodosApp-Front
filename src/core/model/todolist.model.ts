import Todo from "./todo.model"

export default interface TodoList {
  created_at ?: string
  id ?: number
  todos ?: Todo[]
  updated_at ?: string
  user_id ?: number
}
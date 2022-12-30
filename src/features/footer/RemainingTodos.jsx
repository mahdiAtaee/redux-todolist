import { useSelector } from 'react-redux'

function RemainingTodos() {
  const todosRemaining = useSelector((state) => {
    const todos = state.todos.entities
    const count = Object.values(todos).filter((todo) => !todo.completed)
    return count.length
  })
  const todosLength = useSelector((state) => Object.values(state.todos.entities).length)

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{todosRemaining}</strong> item {todosLength} left
    </div>
  )
}

export default RemainingTodos

/* eslint-disable indent */
import { shallowEqual, useSelector } from 'react-redux'
import TodoListItems from './TodoListItems'
import { selectFilteredTodoIds } from './todosSlice'
import loader from '../header/loading-2.svg'
function TodoList() {
  const todosId = useSelector(selectFilteredTodoIds, shallowEqual)
  const loading = useSelector((state) => state.todos.status)

  const rendredTodos = todosId
    ? todosId.map((id) => {
        return <TodoListItems id={id} key={id} />
      })
    : null

  return (
    <div className="todolist" style={{ textAlign: loading === 'pending' ? 'center' : null }}>
      {loading === 'pending' ? <img src={loader} className="mainLoader" /> : [rendredTodos]}
    </div>
  )
}

export default TodoList

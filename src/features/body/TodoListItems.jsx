/* eslint react/prop-types: 0 */
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as TimesSolid } from './times-solid.svg'
import { todoDelete, todoOptionChanged, toggletodoCompleted } from './todosSlice'

export const stateAvailable = ['important', 'normal']
const capitalize = (s) => s[0].toUpperCase() + s.slice(1)
function TodoListItems({ id }) {
  const dispatch = useDispatch()
  const todo = useSelector((state) => state.todos.entities[id])
  const { completed, state, text } = todo
  const stateOptions = stateAvailable.map((state) => {
    const color = state === 'important' ? 'red' : 'green'
    return (
      <option key={state} value={state} style={{ color }}>
        {capitalize(state)}
      </option>
    )
  })
  const handleChange = () => {
    dispatch(toggletodoCompleted(todo.id))
  }

  const handleChangeOption = (e) => {
    dispatch(todoOptionChanged(todo.id, e.target.value))
  }

  const handleDeleteTodo = () => {
    dispatch(todoDelete(todo.id))
  }
  return (
    <li className="todoItem">
      <div className="view">
        <div className="segment label">
          <input type="checkbox" className="toggle" checked={completed} onChange={handleChange} />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="stateOption"
            defaultValue={state}
            onChange={handleChangeOption}
            style={{ color: state === 'important' ? 'red' : 'green' }}>
            <option value=""></option>
            {stateOptions}
          </select>
          <button className="destroy" onClick={handleDeleteTodo}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItems

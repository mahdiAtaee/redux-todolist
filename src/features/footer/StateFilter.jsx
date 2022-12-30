import { useDispatch, useSelector } from 'react-redux'
import { stateAvailable } from '../body/TodoListItems'
import { changeStatesFilter } from './filterSlice'

function StateFilter() {
  const dispatch = useDispatch()
  const states = useSelector((state) => state.filters.states)
  const handleChange = (todoState, changeType) => {
    dispatch(changeStatesFilter(todoState, changeType))
  }
  const renderedStates = stateAvailable.map((state) => {
    const checked = states.includes(state)
    const changeType = checked ? 'removed' : 'added'

    return (
      <label key={state}>
        <input
          type="checkbox"
          name={state}
          defaultChecked={checked}
          onChange={() => handleChange(state, changeType)}
        />
        {state}
      </label>
    )
  })
  return (
    <div className="filters StateFilters">
      <h5>Filter by State</h5>
      <form className="StateSelection">{renderedStates}</form>
    </div>
  )
}

export default StateFilter

import { useDispatch, useSelector } from 'react-redux'
import { changeStatusFilter, StatusFilters } from './filterSlice'

function StatusFilter() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.filters.status)

  const FilteredStates = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const className = value === status ? 'selected' : ''

    const handleClick = (e) => {
      dispatch(changeStatusFilter(value))
    }
    return (
      <li value={value} key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{FilteredStates}</ul>
    </div>
  )
}

export default StatusFilter

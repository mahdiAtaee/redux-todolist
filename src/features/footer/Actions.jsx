import React from 'react'
import { useDispatch } from 'react-redux'
import { clearAll, completeAll } from '../body/todosSlice'

function Actions() {
  const dispitch = useDispatch()
  const handleMarkAll = () => {
    dispitch(completeAll())
  }
  const handleClearAll = () => {
    dispitch(clearAll())
  }

  return (
    <div className="actions">
      <h5>Actions</h5>
      <button className="button" onClick={handleMarkAll}>
        Mark All Completed
      </button>
      <button className="button" onClick={handleClearAll}>
        Clear Completed
      </button>
    </div>
  )
}

export default Actions

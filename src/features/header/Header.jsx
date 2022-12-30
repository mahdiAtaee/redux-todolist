import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewTodo } from '../body/todosSlice'
import Loading from './loading-2.svg'

function Header() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')
  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleKeyDown = async (e) => {
    const trimmedText = text.trim()
    if (e.which === 13 && trimmedText) {
      setStatus('pending')
      await dispatch(addNewTodo(trimmedText))
      setText('')
      setStatus('idle')
    }
  }
  return (
    <div className="header">
      {status === 'idle'
        ? (
        <input
          type="text"
          className="addTodo"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="What's in your mind?"></input>
          )
        : (
        <img src={Loading} alt="loading..." />
          )}
    </div>
  )
}

export default Header

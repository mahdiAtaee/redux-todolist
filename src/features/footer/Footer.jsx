import Actions from './Actions'
import RemainingTodos from './RemainingTodos'
import StateFilter from './StateFilter'
import StatusFilter from './StatusFilter'

function Footer() {
  return (
    <div className="footer">
      <Actions />
      <RemainingTodos />
      <StateFilter />
      <StatusFilter />
    </div>
  )
}

export default Footer

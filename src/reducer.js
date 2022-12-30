import { todosReducer } from './features/body/todosSlice'
import { filterSlice } from './features/footer/filterSlice'

const rootReducer = {
  todos: todosReducer.reducer,
  filters: filterSlice.reducer
}

export default rootReducer

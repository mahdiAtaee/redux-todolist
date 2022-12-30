import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { getRequest, postRequest } from '../../client/client-api'
import { StatusFilters } from '../footer/filterSlice'

export const initialState = {
  status: 'idle',
  entities: {
    1: { id: 1, text: 'task 1', completed: false, state: 'important' },
    2: { id: 2, text: 'task 2', completed: false }
  }
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (param, thunkApi) => {
  return await getRequest('todos')
})

export const getTodos = createAsyncThunk('todos/getTodos', async (param, thunkApi) => {
  return await getRequest('todos')
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (text) => {
  const initTodo = {
    text,
    completed: false,
    state: 'normal'
  }
  const todo = await postRequest('todos', initTodo)
  return todo
})

export const todosReducer = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      const todo = action.payload
      state.entities[todo.id] = todo
    },
    toggletodoCompleted(state, action) {
      const todoID = action.payload
      state.entities[todoID].completed = !state.entities[todoID].completed
    },
    todoOptionChanged: {
      reducer: (state, action) => {
        const { todoID, todoState } = action.payload
        state.entities[todoID].state = todoState
      },
      prepare: (todoID, todoState) => {
        return {
          payload: {
            todoID,
            todoState
          }
        }
      }
    },
    todoDelete(state, action) {
      const todoID = action.payload
      delete state.entities[todoID]
    },
    completeAll(state, action) {
      Object.values(state.entities).forEach((todo) => {
        state.entities[todo.id].completed = true
      })
    },
    clearAll(state, action) {
      Object.values(state.entities).forEach((todo) => {
        state.entities[todo.id].completed = false
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = 'pending'
    })
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      const todos = action.payload
      const newEntities = {}
      todos.forEach((todo) => {
        newEntities[todo.id] = todo
      })
      state.entities = newEntities
      state.status = 'idle'
    })
    builder.addCase(addNewTodo.pending, (state, action) => {
      state.status = 'pending'
    })
    builder.addCase(addNewTodo.fulfilled, (state, action) => {
      const todo = action.payload
      state.entities = {
        ...state.entities,
        [todo.id]: todo
      }
      state.status = 'idle'
    })
    builder.addCase(fetchTodos.rejected, (state, action) => {
      console.log('some think was wrong!')
    })
    builder.addCase(getTodos.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectTodoEntities = (state) => state.todos.entities
export const selectTodoIds = (state) => Object.keys(state.todos.entities)
const selectTodos = createSelector(selectTodoEntities, (todoEntities) => {
  return Object.values(todoEntities)
})

const selectFilteredTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const { status, states } = filters
    const showAll = status === StatusFilters.ALL
    if (showAll && states.length === 0) {
      return todos
    }
    const showCompleted = status === StatusFilters.COMPLETED

    return todos.filter((todo) => {
      const statusFilter = showAll || todo.completed === showCompleted
      const statesFilter = states.length === 0 || states.includes(todo.state)
      return statusFilter && statesFilter
    })
  }
)

export const selectFilteredTodoIds = createSelector(selectFilteredTodos, (filterTodos) => {
  return filterTodos.map((todo) => todo.id)
})

export const {
  todoAdded,
  toggletodoCompleted,
  todoOptionChanged,
  todoDelete,
  completeAll,
  clearAll
} = todosReducer.actions

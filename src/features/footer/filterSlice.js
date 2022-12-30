import { createSlice } from '@reduxjs/toolkit'

export const StatusFilters = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
}
export const initialState = {
  status: StatusFilters.ALL,
  states: []
}
export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeStatusFilter(state, action) {
      state.status = action.payload
    },
    changeStatesFilter: {
      reducer(state, action) {
        const { states } = state
        const { todoState, changeType } = action.payload

        switch (changeType) {
          case 'added':
            if (states.includes(todoState)) {
              return state
            }
            state.states.push(todoState)
            break
          case 'removed':
            state.states = states.filter((item) => item !== todoState)
            break
          default:
            return state
        }
      },
      prepare(todoState, changeType) {
        return {
          payload: {
            todoState,
            changeType
          }
        }
      }
    }
  }
})

export const { changeStatusFilter, changeStatesFilter } = filterSlice.actions

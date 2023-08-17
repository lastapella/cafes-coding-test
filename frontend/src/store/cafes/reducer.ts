
import { createAction, createReducer } from '@reduxjs/toolkit'

export type Cafe = {
  id: string;
  name: string;
  description: string;
  location: string;
  logo: string;
}

const reset = createAction('cafes/reset')
const add = createAction<Cafe>('cafes/add')
const addMultiple = createAction<Cafe[]>('cafes/addMultiple')
const remove = createAction<string>('cafes/remove')
const update = createAction<Cafe>('cafes/update')


const initialState = [] as Cafe[]

const cafesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(reset, (state) => {
      state = initialState
    })
    .addCase(add, (state, action) => {
      state.push(action.payload)
    })
    .addCase(addMultiple, (state, action) => {
      state.push(...action.payload)
    }).addCase(remove, (state, action) => {
      const index = state.findIndex((employee) => employee.id === action.payload)
      state.splice(index, 1)
    }).addCase(update, (state, action) => {
      const index = state.findIndex((employee) => employee.id === action.payload.id)
      state[index] = action.payload
    })
})

export { cafesReducer, reset, add, addMultiple, remove, update }


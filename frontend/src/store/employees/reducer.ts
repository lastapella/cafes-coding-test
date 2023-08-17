import { createAction, createReducer } from '@reduxjs/toolkit'

export type Employee = {
  id: string;
  name: string;
  email_address: string;
  phone_number: string;
  gender: string;
}

const reset = createAction('employees/reset')
const add = createAction<Employee>('employees/add')
const addMultiple = createAction<Employee[]>('employees/addMultiple')
const remove = createAction<string>('employees/remove')
const update = createAction<Employee>('employees/update')


const initialState = [] as Employee[]

const employeesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(reset, (state) => {
      state = initialState
    })
    .addCase(add, (state, action) => {
      state.push(action.payload)
    })
    .addCase(addMultiple, (state, action) => {
      state.push(...action.payload)
    }).addCase (remove, (state, action) => {
      const index = state.findIndex((employee) => employee.id === action.payload)
      state.splice(index, 1)
    }).addCase(update, (state, action) => {
      const index = state.findIndex((employee) => employee.id === action.payload.id)
      state[index] = action.payload
    })
})

export { employeesReducer, reset, add, addMultiple, remove, update }


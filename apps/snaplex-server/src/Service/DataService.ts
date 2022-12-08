import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        todoAdded(state, action) {

        },
        todoToggled(state, action) {

        }
    }
})

export const { todoAdded, todoToggled } = todosSlice.actions
export default todosSlice.reducer
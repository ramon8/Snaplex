import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './Service/DataService'

export const store = configureStore({
    reducer: {
        todos: todosReducer,
    }
})
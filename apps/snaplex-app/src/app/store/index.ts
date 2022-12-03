import { configureStore } from '@reduxjs/toolkit'
import game from './slices/game/gameSlice'
import player from './slices/player/playerSlice'

export const store = configureStore({
    reducer: {
        game,
        player
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
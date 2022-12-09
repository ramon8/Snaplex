import { configureStore } from '@reduxjs/toolkit'
import game from './slices/game/gameSlice'
import player from './slices/player/playerSlice'
import actions from './slices/actions/actionsSlice'
import playground from './slices/playground/playgroundSlice'

export const store = configureStore({
  reducer: {
    game,
    player,
    actions,
    playground
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

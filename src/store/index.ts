import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './slices/userDataSlice'
import sidebarReducer from './slices/sidebarSlice'

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    sidebar: sidebarReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
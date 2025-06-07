import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface sidebarState {
  value: boolean
}

// Define the initial state using that type
const initialState: sidebarState = {
  value: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    handleToggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

export const { handleToggleSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
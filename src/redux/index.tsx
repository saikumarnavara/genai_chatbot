import { configureStore } from '@reduxjs/toolkit'
import chatSlice from './slices/chat-slice'
const store = configureStore({
  reducer: {
    chat : chatSlice.reducer
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store
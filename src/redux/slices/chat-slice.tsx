import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

// Define the ChatState interface to specify the state shape and types
interface ChatState {
    current_message: string;
  isLoading: boolean;
  error: string | null;
  prompts: string[] | null
}

const initialState: ChatState = {
  current_message: 'Welcome to Support Chatbot powered by Growmore!',
  isLoading: false,
  error: null,
  prompts : null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentMessage(state, action: PayloadAction<string>) {
      state.current_message = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setCurrentMessage, setLoading, setError } = chatSlice.actions;

export default chatSlice;

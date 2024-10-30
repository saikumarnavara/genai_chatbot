import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

// Define the ChatState interface to specify the state shape and types
interface ChatState {
  current_message: string;
  isLoading: boolean;
  error: string | null;
  prompts: string[] | null;
  messages: {
    message: string;
    sender: string;
  }[];
}

const initialState: ChatState = {
  current_message: "",
  isLoading: false,
  error: null,
  prompts: null,
  messages: [
    {
      message: "Welcome to Support Chatbot powered by Growmore!",
      sender: "bot",
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
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
    addMessage(
      state,
      action: PayloadAction<{ message: string; sender: string }>
    ) {
      state.messages.push(action.payload);
      state.isLoading = false;
    },
  },
});

export const { setCurrentMessage, setLoading, setError, addMessage } =
  chatSlice.actions;

export default chatSlice;

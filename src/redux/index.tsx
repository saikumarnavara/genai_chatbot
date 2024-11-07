import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slices/chat-slice";
import DocumentsListSlice from "./slices/documents-list-slice";
import searchTypeSlice from "./slices/search-type-slice";
const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    doc_list: DocumentsListSlice.reducer,
    search_type: searchTypeSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;

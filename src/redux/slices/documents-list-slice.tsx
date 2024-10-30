import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the ChatState interface to specify the state shape and types
interface DocumentsState {
  documents: string[] | null;
  isLoading: boolean;
  error: string | null;
  totalDocuments: number;
}

const initialState: DocumentsState = {
  documents: [],
  isLoading: false,
  error: null,
  totalDocuments: 0,
};

const DocumentsListSlice = createSlice({
  name: "list-doc",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setDocuments(
      state,
      action: PayloadAction<{ total_documents: number; document_ids: string[] }>
    ) {
      state.documents = action.payload.document_ids;
      state.totalDocuments = action.payload.total_documents;
      state.isLoading = false;
    },
  },
});

export const { setDocuments, setLoading, setError } =
  DocumentsListSlice.actions;

export default DocumentsListSlice;

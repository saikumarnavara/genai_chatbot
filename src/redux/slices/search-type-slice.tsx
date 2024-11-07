import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchTypeState {
  searchType: string;
  multimodalImage: { url: string; name: string } | null;
}

const initialState: SearchTypeState = {
  searchType: "textsearch",
  multimodalImage: null,
};

const SearchTypeSlice = createSlice({
  name: "searchType",
  initialState,
  reducers: {
    setSearchType(state, action: PayloadAction<string>) {
      state.searchType = action.payload;
    },
    setMultimodalImage(
      state,
      action: PayloadAction<{ url: string; name: string } | null>
    ) {
      state.multimodalImage = action.payload;
    },
  },
});

export const { setSearchType, setMultimodalImage } = SearchTypeSlice.actions;

export default SearchTypeSlice;

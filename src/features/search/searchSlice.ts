import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
export const SEARCH_SLICE = "serachSlice";

export interface ISerachSlice {
  value: string;
}
const initialState: ISerachSlice = {
    value: '',
};
export const searchSlice = createSlice({
  name: SEARCH_SLICE,
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;

export const searchReduser = searchSlice.reducer;
export const searchSelector = (state: any): string => state.serachSlice.value;

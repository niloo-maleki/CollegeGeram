import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";


export const MODAL_SLICE = "modalSlice";

export interface ModalInterface {
  showModal: boolean;
  componentName: string;
  id?: any;
}
const initialState: ModalInterface = {
  showModal: false,
  componentName: "",
};

export const modalSlice = createSlice({
  name: MODAL_SLICE,
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.showModal = true;
      state.componentName = action.payload.name;
      state.id = action.payload.id;
    },
    closeModal: (state) => {
      state.showModal = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReduser = modalSlice.reducer;

export const modalSelector = (state:RootState): boolean => state.modalSlice.showModal;
export const modalComponentSelector = (state:RootState): string => state.modalSlice.componentName;

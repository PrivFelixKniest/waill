import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { wellType } from "../../types/chat";

export interface ChatState {
  openaiKey: string;
  wells: wellType[];
  selectedWellId: number | null;
}

const initialState: ChatState = {
  openaiKey: "",
  wells: [],
  selectedWellId: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOpenaiKey: (state, action: PayloadAction<string>) => {
      state.openaiKey = action.payload;
    },
    setWells: (state, action: PayloadAction<wellType[]>) => {
      state.wells = action.payload;
    },
    setSelectedWellId: (state, action: PayloadAction<number | null>) => {
      state.selectedWellId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenaiKey, setWells, setSelectedWellId } = chatSlice.actions;

export default chatSlice.reducer;

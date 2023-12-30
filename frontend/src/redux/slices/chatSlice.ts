import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { wellType } from "../../types/chat";

export interface ChatState {
  openaiKey: string;
  wells: wellType[];
}

const initialState: ChatState = {
  openaiKey: "",
  wells: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOpenaiKey: (state, action: PayloadAction<string>) => {
      state.openaiKey = action.payload;
    },
    setWells: (state, action: PayloadAction<any[]>) => {
      state.wells = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenaiKey, setWells } = chatSlice.actions;

export default chatSlice.reducer;

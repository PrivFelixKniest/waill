import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChatState {
  openaiKey: string;
}

const initialState: ChatState = {
  openaiKey: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOpenaiKey: (state, action: PayloadAction<string>) => {
      state.openaiKey = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenaiKey } = chatSlice.actions;

export default chatSlice.reducer;

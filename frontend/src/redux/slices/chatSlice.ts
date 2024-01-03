import { fileType, messageType } from "./../../types/chat";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { wellType } from "../../types/chat";

interface addFileToWellProps {
  wellId: number;
  file: fileType;
}

interface addMessageToWellProps {
  wellId: number;
  message: messageType;
}

export interface ChatState {
  openaiKey: string;
  wells: wellType[];
  selectedWellId: number | null;
  promptLoadingWellId: number | null;
}

const initialState: ChatState = {
  openaiKey: "",
  wells: [],
  selectedWellId: null,
  promptLoadingWellId: null,
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
    addWell: (state, action: PayloadAction<wellType>) => {
      state.wells.push(action.payload);
    },
    removeWell: (state, action: PayloadAction<wellType>) => {
      state.wells = state.wells.filter((well) => well.id !== action.payload.id);
    },
    addFileToWell: (state, action: PayloadAction<addFileToWellProps>) => {
      state.wells = state.wells.map((well) => {
        if (well.id === action.payload.wellId) {
          return {
            ...well,
            files: [...well.files, action.payload.file],
          };
        }
        return well;
      });
    },
    removeFileFromWell: (state, action: PayloadAction<addFileToWellProps>) => {
      state.wells = state.wells.map((well) => {
        if (well.id === action.payload.wellId) {
          return {
            ...well,
            files: well.files.filter(
              (file) => file.id !== action.payload.file.id
            ),
          };
        }
        return well;
      });
    },
    setSelectedWellId: (state, action: PayloadAction<number | null>) => {
      state.selectedWellId = action.payload;
    },
    addMessageToWell: (state, action: PayloadAction<addMessageToWellProps>) => {
      state.wells = state.wells.map((well) => {
        if (well.id === action.payload.wellId) {
          return {
            ...well,
            messages: [action.payload.message, ...well.messages],
          };
        }
        return well;
      });
    },
    setPromptLoadingWellIdWellId: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.promptLoadingWellId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setOpenaiKey,
  setWells,
  setSelectedWellId,
  addMessageToWell,
  addWell,
  removeWell,
  addFileToWell,
  removeFileFromWell,
  setPromptLoadingWellIdWellId,
} = chatSlice.actions;

export default chatSlice.reducer;

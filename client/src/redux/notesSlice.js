import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export const { setNotes } = notesSlice.actions;
export const selectNotes = (state) => state.notes.notes;
export default notesSlice.reducer;

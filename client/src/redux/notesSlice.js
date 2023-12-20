import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  currentNote: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
    },
    updateNote: (state, action) => {
      const { id, note } = action.payload;
      state.notes = state.notes.map((n) =>
        n._id === id ? { ...n, note: note } : n
      );
      state.currentNote = { ...state.currentNote, note: note };
    },
  },
});

export const fetchNoteById = (noteId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `https://serverofnotesapp.onrender.com/api/getnote/${noteId}`,
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
    dispatch(setCurrentNote(response.data.note));
  } catch (error) {
    console.error('Error fetching note by ID:', error);
  }
};

export const { setNotes, setCurrentNote, updateNote } = notesSlice.actions;
export const selectNotes = (state) => state.notes.notes;
export const selectCurrentNote = (state) => state.notes.currentNote;
export default notesSlice.reducer;

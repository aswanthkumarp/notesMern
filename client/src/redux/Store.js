import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import notesReducer from './notesSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});
export default store;

import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {preferenceService} from '../PreferenceService';

const initialState = {
  allPreference: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const getAllPreference = createAsyncThunk(
  'profile/get-all-preference',
  async thunkAPI => {
    try {
      return await preferenceService.getAllPreference();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAllPreferenceSlice = createSlice({
  name: 'getAllPreference',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get All Preference -------------------------------
      .addCase(getAllPreference.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllPreference.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.allPreference = action.payload.data;
      })
      .addCase(getAllPreference.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default getAllPreferenceSlice.reducer;

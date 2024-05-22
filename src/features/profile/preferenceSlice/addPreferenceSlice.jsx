import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {preferenceService} from '../PreferenceService';

const initialState = {
  addPreference: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingSingle: false,
  statusCode: 0,
  message: '',
};

export const addPreference = createAsyncThunk(
  'profile/add-preference',
  async (prefData, thunkAPI) => {
    try {
      return await preferenceService.addPreference(prefData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addPreferenceSlice = createSlice({
  name: 'addPreference',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Add Preference -------------------------------
      .addCase(addPreference.pending, state => {
        state.isLoading = true;
      })
      .addCase(addPreference.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
      })
      .addCase(addPreference.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default addPreferenceSlice.reducer;

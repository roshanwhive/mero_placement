import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {preferenceService} from '../PreferenceService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingSingle: false,
  statusCode: 0,
  message: '',
};
export const updatePreference = createAsyncThunk(
  'profile/update-preference',
  async (prefData, thunkAPI) => {
    try {
      return await preferenceService.updatePreference(prefData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updatePreferenceSlice = createSlice({
  name: 'updatePreference',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Update preference -------------------------------
      .addCase(updatePreference.pending, state => {
        state.isLoading = true;
      })
      .addCase(updatePreference.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.singlePreference = action.payload.data;
      })
      .addCase(updatePreference.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default updatePreferenceSlice.reducer;

import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {preferenceService} from '../PreferenceService';

const initialState = {
  singlePreference: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingSingle: false,
  statusCode: 0,
  message: '',
};
export const getSinglePreference = createAsyncThunk(
  'profile/get-single-preference',
  async (id, thunkAPI) => {
    try {
      return await preferenceService.getSinglePreference(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getSinglePreferenceSlice = createSlice({
  name: 'getSinglePreference',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get Single Preference -------------------------------
      .addCase(getSinglePreference.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSinglePreference.fulfilled, (state, action) => {
        console.log('tghud', state.singlePreference);
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.singlePreference = action.payload.data;
      })
      .addCase(getSinglePreference.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default getSinglePreferenceSlice.reducer;

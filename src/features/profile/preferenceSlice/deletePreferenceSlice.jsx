import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {preferenceService} from '../PreferenceService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const delPreference = createAsyncThunk(
  'profile/del-single-preference',
  async (id, thunkAPI) => {
    try {
      return await preferenceService.delPreference(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deletePreferenceSlice = createSlice({
  name: 'deletePreference',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Delete Preference -------------------------------
      .addCase(delPreference.pending, state => {
        state.isLoading = true;
      })
      .addCase(delPreference.fulfilled, (state, action) => {
        console.log('delete', action.payload.message);
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action?.payload?.message;
        state.statusCode = action.payload.status_code;
      })
      .addCase(delPreference.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default deletePreferenceSlice.reducer;

import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {preferenceService} from '../PreferenceService';

const initialState = {
  isErrorUpdate: false,
  isSuccessUpdate: false,
  isLoadingUpdate: false,

  statusCodeUpdate: 0,
  messageUpdate: '',
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
        state.isLoadingUpdate = true;
      })
      .addCase(updatePreference.fulfilled, (state, action) => {
        state.isLoadingUpdate = false;
        state.isErrorUpdate = !action.payload.success;
        state.isSuccessUpdate = action.payload.success;
        state.messageUpdate = action.payload.message;
        state.statusCodeUpdate = action.payload.status_code;
        state.singlePreferenceUpdate = action.payload.data;
      })
      .addCase(updatePreference.rejected, (state, action) => {
        state.isErrorUpdate = true;
        state.isLoadingUpdate = false;
        state.isSuccessUpdate = false;
      });
  },
});

export default updatePreferenceSlice.reducer;

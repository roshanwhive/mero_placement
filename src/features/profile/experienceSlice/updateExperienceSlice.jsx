import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {experienceService} from '../ExperienceService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const updateExperience = createAsyncThunk(
  'profile/update-Experience',
  async (experienceData, thunkAPI) => {
    try {
      return await experienceService.updateExperience(experienceData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateExperienceSlice = createSlice({
  name: 'updateExperience',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Update Experience -------------------------------
      .addCase(updateExperience.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        console.log('first', action.payload.message);
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default updateExperienceSlice.reducer;

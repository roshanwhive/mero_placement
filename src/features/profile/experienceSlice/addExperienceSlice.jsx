import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {experienceService} from '../ExperienceService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingSingle: false,
  statusCode: 0,
  message: '',
};

export const addExperience = createAsyncThunk(
  'profile/add-Experience',
  async (experienceData, thunkAPI) => {
    try {
      return await experienceService.addExperience(experienceData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addExperienceSlice = createSlice({
  name: 'addExperience',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Add Experience -------------------------------
      .addCase(addExperience.pending, state => {
        state.isLoading = true;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default addExperienceSlice.reducer;

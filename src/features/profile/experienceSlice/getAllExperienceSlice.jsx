import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {experienceService} from '../ExperienceService';

const initialState = {
  allExperience: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const getAllExperience = createAsyncThunk(
  'profile/get-all-experience',
  async thunkAPI => {
    try {
      return await experienceService.getAllExperience();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAllExperienceSlice = createSlice({
  name: 'getAllExperience',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get All Experience -------------------------------
      .addCase(getAllExperience.pending, state => {
        state.isLoading = true;
        state.allExperience = [];
      })
      .addCase(getAllExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.allExperience = action.payload.data;
      })
      .addCase(getAllExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default getAllExperienceSlice.reducer;

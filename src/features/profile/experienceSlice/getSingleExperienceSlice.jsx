import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {experienceService} from '../ExperienceService';

const initialState = {
  singleExperience: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingSingle: false,
  statusCode: 0,
  message: '',
};

export const getSingleExperience = createAsyncThunk(
  'profile/get-single-experience',
  async (id, thunkAPI) => {
    try {
      return await experienceService.getSingleExperience(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getSingleExperienceSlice = createSlice({
  name: 'getSingleExperience',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get Single Experience -------------------------------
      .addCase(getSingleExperience.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSingleExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
        state.statusCode = action.payload?.status_code;
        state.singleExperience = action.payload?.data;
      })
      .addCase(getSingleExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default getSingleExperienceSlice.reducer;

import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {educationService} from '../EducationService';

const initialState = {
  singleEducation: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingSingle: false,
  statusCode: 0,
  message: '',
};

export const getSingleEducation = createAsyncThunk(
  'profile/get-single-educations',
  async thunkAPI => {
    try {
      return await educationService.getSingleEducation();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getSingleEducationSlice = createSlice({
  name: 'getSingleEducation',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get Single Education -------------------------------
      .addCase(getSingleEducation.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSingleEducation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.singleEducation = action.payload.data;
      })
      .addCase(getSingleEducation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default getSingleEducationSlice.reducer;

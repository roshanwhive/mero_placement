import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {educationService} from '../EducationService';

const initialState = {
  allEducation: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingSingle: false,
  statusCode: 0,
  message: '',
};

export const getAllEducation = createAsyncThunk(
  'profile/get-all-educations',
  async thunkAPI => {
    try {
      return await educationService.getAllEducation();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAllEducationSlice = createSlice({
  name: 'getAllEducation',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get All Education -------------------------------
      .addCase(getAllEducation.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllEducation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.allEducation = action.payload.data;
      })
      .addCase(getAllEducation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default getAllEducationSlice.reducer;

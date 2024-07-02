import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { trainingService } from './TrainingService';
const initialState = {
    singleTraining: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
  };

  export const getSingleTraining = createAsyncThunk(
    'training/get-single-training',
    async (slug, thunkAPI) => {
      try {
        return await trainingService.getSingleTraining(slug);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );

  export const getSingleTrainingSlice = createSlice({
    name: 'singleTraining',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        // ------------------------------------Get Single Training -------------------------------
        .addCase(getSingleTraining.pending, state => {
          state.isLoading = true;
        })
        .addCase(getSingleTraining.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = !action.payload?.success;
          state.isSuccess = action.payload?.success;
          state.message = action.payload?.message;
          state.statusCode = action.payload?.status_code;
          state.singleTraining = action.payload?.data?.detail;
        })
        .addCase(getSingleTraining.rejected, (state, action) => {
          state.isError = true;
          state.isLoading = false;
          state.isSuccess = false;
        })
    },
  });
  
  export default getSingleTrainingSlice.reducer;
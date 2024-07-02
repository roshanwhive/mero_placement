import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { trainingService } from './TrainingService';

const initialState = {
    allTrainings: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
  };

  export const getAllTrainings = createAsyncThunk(
    'training/get-all-training',
    async thunkAPI => {
      try {
        return await trainingService.getAllTraining();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );

  
export const getAllTrainingSlice = createSlice({
    name: 'getAllTraining',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        // ------------------------------------Get ALL Training -------------------------------
        .addCase(getAllTrainings.pending, state => {
          state.isLoading = true;
        })
        .addCase(getAllTrainings.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = !action.payload.success;
          state.isSuccess = action.payload.success;
          state.message = action.payload.message;
          state.statusCode = action.payload.status_code;
          state.allTrainings = action.payload.data;
        })
        .addCase(getAllTrainings.rejected, (state, action) => {
          state.isError = true;
          state.isLoading = false;
          state.isSuccess = false;
        })
    },
  });

  
export default getAllTrainingSlice.reducer;
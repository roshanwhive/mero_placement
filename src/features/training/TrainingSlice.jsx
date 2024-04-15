import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {trainingService} from './TrainingService';

const initialState = {
  allTrainings: [],
  singleTraining: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const getAllTrainings = createAsyncThunk(
  'job/get-all-training',
  async thunkAPI => {
    try {
      return await trainingService.getAllTraining();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getSingleTraining = createAsyncThunk(
  'job/get-single-training',
  async (slug, thunkAPI) => {
    try {
      return await trainingService.getSingleTraining(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Reset State
export const resetTrainingState = createAction('Reset_all_Training_State');

export const traningSlice = createSlice({
  name: 'training',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get ALl Jobs -------------------------------
      .addCase(getAllTrainings.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllTrainings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.allJobs = action.payload.data;
      })
      .addCase(getAllTrainings.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      // ------------------------------------Get single Jobs -------------------------------
      .addCase(getSingleTraining.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSingleTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.singleJob = action.payload.data;
      })
      .addCase(getSingleTraining.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Reset State
      .addCase(resetTrainingState, state => {
        state.message = '';
        state.isSuccess = false;
        state.statusCode = 0;
        state.isError = false;
      });
  },
});

export default traningSlice.reducer;

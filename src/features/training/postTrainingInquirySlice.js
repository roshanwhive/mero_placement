import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { trainingService } from './TrainingService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
 
};

export const postTrainingInquiry = createAsyncThunk(
  'home/training-enquiry',
  async (trainingData, thunkAPI) => {
    try {
      return await trainingService.postTrainingInquiry(trainingData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);


export const postTrainingInquirySlice = createSlice({
  name: 'trainingInquiry',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------post Training inquiry -------------------------------
      .addCase(postTrainingInquiry.pending, state => {
        state.isLoading = true;
      })
      .addCase(postTrainingInquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
        state.statusCode = action.payload?.status_code;
      
      })
      .addCase(postTrainingInquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
  },
});

export default postTrainingInquirySlice.reducer;

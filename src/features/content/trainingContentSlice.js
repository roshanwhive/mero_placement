import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { allcontentService } from './AllContentService';

const initialState = {
   trainingContent: {},
  isError: false,
  isSuccess: false,
  statusCode: 0,
  message: '',
};


export const getContentTraining = createAsyncThunk(
  'home/get-single-content',
  async (slug, thunkAPI) => {
    try {
      return await allcontentService.getSingleContent(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getContentTrainingSlice = createSlice({
  name: 'getContentTraining',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      
      // ------------------------------------Get Single hot job -------------------------------
      .addCase(getContentTraining.pending, state => {
        state.isLoading = true;
      })
      .addCase(getContentTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
        state.statusCode = action.payload?.status_code;
        state.trainingContent = action.payload?.data;
      })
      .addCase(getContentTraining.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default getContentTrainingSlice.reducer;

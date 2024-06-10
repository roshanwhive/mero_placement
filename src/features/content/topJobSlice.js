import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { allcontentService } from './AllContentService';

const initialState = {
topJobContent: {},
  isError: false,
  isSuccess: false,
  statusCode: 0,
  message: '',
};


export const getContentTopjob = createAsyncThunk(
  'home/get-single-content',
  async (slug, thunkAPI) => {
    try {
      return await allcontentService.getSingleContent(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getContentTopSlice = createSlice({
  name: 'getContentTopJob',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      
      // ------------------------------------Get Single top job -------------------------------
      .addCase(getContentTopjob.pending, state => {
        state.isLoading = true;
      })
      .addCase(getContentTopjob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
        state.statusCode = action.payload?.status_code;
        state.topJobContent = action.payload?.data;
      })
      .addCase(getContentTopjob.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default getContentTopSlice.reducer;

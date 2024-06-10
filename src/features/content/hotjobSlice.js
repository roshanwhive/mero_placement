import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { allcontentService } from './AllContentService';

const initialState = {
   hotJobContent: {},
  isError: false,
  isSuccess: false,
  statusCode: 0,
  message: '',
};


export const getContentHotjob = createAsyncThunk(
  'home/get-single-content',
  async (slug, thunkAPI) => {
    try {
      return await allcontentService.getSingleContent(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getContentHotSlice = createSlice({
  name: 'getContentHotJob',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      
      // ------------------------------------Get Single hot job -------------------------------
      .addCase(getContentHotjob.pending, state => {
        state.isLoading = true;
      })
      .addCase(getContentHotjob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
        state.statusCode = action.payload?.status_code;
        state.hotJobContent = action.payload?.data;
      })
      .addCase(getContentHotjob.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default getContentHotSlice.reducer;

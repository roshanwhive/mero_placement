import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { allcontentService } from './AllContentService';

const initialState = {
  singleContent: {},
  isError: false,
  isSuccess: false,
  statusCode: 0,
  message: '',
};

export const getSingleContent = createAsyncThunk(
  'home/get-single-content',
  async (slug, thunkAPI) => {
    try {
      return await allcontentService.getSingleContent(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);


export const getSingleContentSlice = createSlice({
  name: 'getSingleContent',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get Single content -------------------------------
      .addCase(getSingleContent.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSingleContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
        state.statusCode = action.payload?.status_code;
        state.singleContent = action.payload?.data;
      })
      .addCase(getSingleContent.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
     
  },
});

export default getSingleContentSlice.reducer;

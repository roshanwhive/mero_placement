import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { allcontentService } from './AllContentService';

const initialState = {
  allContent: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const getAllContent = createAsyncThunk(
  'home/all-content',
  async thunkAPI => {
    try {
      return await allcontentService.getAllContent();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAllContentSlice = createSlice({
  name: 'getAllContent',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get All content -------------------------------
      .addCase(getAllContent.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.allContent = action.payload.data;
      })
      .addCase(getAllContent.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
      
  },
});

export default getAllContentSlice.reducer;

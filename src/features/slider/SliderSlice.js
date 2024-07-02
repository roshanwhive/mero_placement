import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import { sliderService } from './SliderService';
const initialState = {
    sliderData: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
  };

  export const getSliderImage = createAsyncThunk(
    'home/get-slider-image',
    async ( thunkAPI) => {
      try {
        return await sliderService.getSliderImage();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );

  export const getSliderImageSlice = createSlice({
    name: 'sliderImage',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        // ------------------------------------Get Slide Image -------------------------------
        .addCase(getSliderImage.pending, state => {
          state.isLoading = true;
        })
        .addCase(getSliderImage.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = !action.payload?.success;
          state.isSuccess = action.payload?.success;
          state.message = action.payload?.message;
          state.statusCode = action.payload?.status_code;
          state.sliderData = action.payload?.data?.detail;
        })
        .addCase(getSliderImage.rejected, (state, action) => {
          state.isError = true;
          state.isLoading = false;
          state.isSuccess = false;
        })
    },
  });
  
  export default getSliderImageSlice.reducer;
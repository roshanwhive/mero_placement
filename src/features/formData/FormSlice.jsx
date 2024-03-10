import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {formService} from './FormService';

const initialState = {
  allCategoriesData: [],
  allGenderData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: '',
  message: '',
};

export const getAllCategories = createAsyncThunk(
  'form/categories',
  async thunkAPI => {
    try {
      return await formService.getAllCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAllGender = createAsyncThunk('form/gender', async thunkAPI => {
  try {
    return await formService.getGender();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction('Reset_all');

export const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      //Login User
      .addCase(getAllGender.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllGender.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getAllGender.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Reset State
      .addCase(resetState, state => {
        state.message = '';
        state.isAuthenticated = false;
        state.isSuccess = false;
      });
  },
});

export default formSlice.reducer;

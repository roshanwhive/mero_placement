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

export const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Register User
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Login User
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Logout User
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
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

export default authSlice.reducer;

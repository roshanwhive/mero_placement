import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../AuthService";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
  };

  export const forgotPassword = createAsyncThunk(
    'auth/forgot-password',
    async (emailData, thunkAPI) => {
      try {
        return await authService.forgotPassword(emailData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );
  

  export const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
      //Update User Profile
      .addCase(forgotPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

    },
  });
  export default forgotPasswordSlice.reducer;
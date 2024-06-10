import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../AuthService";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
  };

  export const verifyOTP = createAsyncThunk(
    'auth/otp-check',
    async (formData, thunkAPI) => {
      try {
        return await authService.postVerifyOtp(formData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );
  

  export const verifyOtpSlice = createSlice({
    name: 'verifyotp',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
      //set New Password
      .addCase(verifyOTP.pending, state => {
        state.isLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

    },
  });
  export default verifyOtpSlice.reducer;
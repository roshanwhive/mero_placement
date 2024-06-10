import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../AuthService";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
  };

  export const resendOTP = createAsyncThunk(
    'auth/resendOtp-forget-password',
    async (otpData, thunkAPI) => {
      try {
        return await authService.postResendOtp(otpData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );
  

  export const resendOtpSlice = createSlice({
    name: 'resendotp',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
      //resend OTP
      .addCase(resendOTP.pending, state => {
        state.isLoading = true;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

    },
  });
  export default resendOtpSlice.reducer;
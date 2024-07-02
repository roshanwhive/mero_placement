import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../AuthService";

const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
    data: '',
  };

export const emailVerification = createAsyncThunk(
    'auth/email_verification',
    async (emailData, thunkAPI) => {
      try {
        return await authService.emailVerification(emailData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );



  export const emailVerificationSlice = createSlice({
    name: 'emailVerification',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        //Email Verification
        .addCase(emailVerification.pending, state => {
          state.isLoading = true;
        })
        .addCase(emailVerification.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = !action.payload?.success;
          state.isSuccess = action.payload?.success;
          state.message = action.payload?.message;
          state.statusCode = action.payload?.status_code;
        })
        .addCase(emailVerification.rejected, (state, action) => {
          state.isError = true;
          state.isLoading = false;
          state.isSuccess = false;
          state.statusCode = action.payload?.status_code;
        })

    
    },
  });

  export default emailVerificationSlice.reducer;
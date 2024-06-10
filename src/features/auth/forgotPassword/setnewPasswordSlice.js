import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../AuthService";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
  };

  export const setNewPassword = createAsyncThunk(
    'auth/set-new-password',
    async (formData, thunkAPI) => {
      try {
        return await authService.setNewPassword(formData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );
  

  export const setNewPasswordSlice = createSlice({
    name: 'setNewPassword',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
      //set New Password
      .addCase(setNewPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

    },
  });
  export default setNewPasswordSlice.reducer;
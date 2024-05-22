import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../AuthService";

const initialState = {
    userProfile: {},
    isError: false,
    isAuthenticated: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
    token: '',
    data: '',
  };

  export const logoutUser = createAsyncThunk('auth/logout', async thunkAPI => {
    try {
      return await authService.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });
  export const logOutSlice = createSlice({
    name: 'logout',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
     //Logout User
     .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = false;
        state.userProfile = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
    },
  });
  export default logOutSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../AuthService";

const initialState = {
    userProfile: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
  };

  export const getUserProfile = createAsyncThunk(
    'auth/get-user-profile',
    async thunkAPI => {
      try {
        return await authService.getUserProfile();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );
  

  export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
       //Get User Profile
       .addCase(getUserProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.userProfile = action.payload?.data;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

    },
  });
  export default userProfileSlice.reducer;
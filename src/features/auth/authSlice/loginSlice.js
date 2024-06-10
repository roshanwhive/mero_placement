import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../AuthService";

const initialState = {
    user: [],
    isError: false,
    isAuthenticated: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
    token: '',
    data: '',
  };

export const loginUser = createAsyncThunk(
    'auth/login',
    async (loginData, thunkAPI) => {
      try {
        return await authService.login(loginData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );

  export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
      return await authService.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

  export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        //Login User
        .addCase(loginUser.pending, state => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = !action.payload?.success;
          state.isSuccess = action.payload?.success;
          state.message = action.payload?.message;
          state.isAuthenticated = action.payload?.success;
          state.user = action.payload?.data;
          state.statusCode = action.payload?.status_code;
          state.token = action.payload?.data?.token;
          state.data = action.payload?.data;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isError = true;
          state.isLoading = false;
          state.isSuccess = false;
          state.message = action.payload?.message || 'An error occurred';
          state.statusCode = action.payload?.status_code;
        })

         //Logout User
     .addCase(logoutUser.pending, state => {
      state.isLoading = true;
    })
    .addCase(logoutUser.fulfilled, (state, action) => {
       console.log("logout slice",state.isAuthenticated)
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.isAuthenticated = false;
      state.message = action.payload?.message;
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
    })
    },
  });

  export default loginSlice.reducer;
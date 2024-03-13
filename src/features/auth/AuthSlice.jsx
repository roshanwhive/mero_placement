import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {authService} from './AuthService';

const initialState = {
  user: [],
  isError: false,
  isAuthenticated: false,
  isSuccess: false,
  isLoading: false,
  statusCode: '',
  message: '',
  token: '',
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (registerData, thunkAPI) => {
    try {
      return await authService.register(registerData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

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

export const logoutUser = createAsyncThunk('auth/logout', async thunkAPI => {
  try {
    return await authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//Reset State
export const resetState = createAction('Reset_all');

export const authSlice = createSlice({
  name: 'auth',
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
        state.message = action.payload.message;
        state.isAuthenticated = action.payload.success;
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

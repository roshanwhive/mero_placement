import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {authService} from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isError: false,
  isAuthenticatedlog: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
  token: '',
  data: '',
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

export const updateUserAccountInformation = createAsyncThunk(
  'auth/update-user-profile',
  async (formData, thunkAPI) => {
    try {
      return await authService.updateUserAccount(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Reset State
export const resetState = createAction('Reset_all');

//Logout
export const logout = createAction('Logout');

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
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action?.payload?.message;
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
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticatedlog = false;
        state.userProfile = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Get User Profile
      .addCase(getUserProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.userProfile = action.payload.data;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Update User Profile
      .addCase(updateUserAccountInformation.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateUserAccountInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(updateUserAccountInformation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Logout
      .addCase(logout, state => {
        state.message = 'Logged out successfully';
        state.isSuccess = true;
        state.statusCode = 200;
        state.isAuthenticated = false;
        state.userProfile = [];
        state.token = '';
        AsyncStorage.removeItem('USER_TOKEN');
        AsyncStorage.removeItem('isLoggedIn');
      })

      //Reset State
      .addCase(resetState, state => {
        state.message = '';
        state.isSuccess = false;
        state.statusCode = 0;
        state.isError = false;
      });
  },
});

export default authSlice.reducer;

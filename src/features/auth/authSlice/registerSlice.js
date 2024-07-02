import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../AuthService";

const initialState = {
    isError: false,
    isSignupSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
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
  
export const resetRegisterState = createAction('Reset_all_register_state');


  export const registerSlice = createSlice({
    name: 'register',
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
        state.isSignupSuccess = action.payload?.success;
        state.message = action?.payload?.message;
        state.statusCode = action?.payload?.status_code;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSignupSuccess = false;
      })

        //Reset State
        .addCase(resetRegisterState, state => {
          state.message = '';
          state.isSignupSuccess = false;
          state.statusCode = 0;
          state.isError = false;
        });

    },
  });
  export default registerSlice.reducer;
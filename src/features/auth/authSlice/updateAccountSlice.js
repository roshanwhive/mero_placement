import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../AuthService";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
  };

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
  

  export const updateAccountSlice = createSlice({
    name: 'updateAccount',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
      builder
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

    },
  });
  export default updateAccountSlice.reducer;
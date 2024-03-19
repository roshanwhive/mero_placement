import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {jobCategoryService} from './JobCategoryService';

const initialState = {
  allJobs: [],
  jobCategories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const getALlJobs = createAsyncThunk(
  'job/get-all-job',
  async thunkAPI => {
    try {
      return await jobCategoryService.getAllJobs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getJobCategories = createAsyncThunk(
  'job/categories',
  async thunkAPI => {
    try {
      return await jobCategoryService.getJobCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// Get job
export const getJobByCategory = createAsyncThunk(
  'job/job-by-category',
  async (id, thunkAPI) => {
    try {
      return await jobCategoryService.getJobByCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Reset State
export const resetJobCategoryState = createAction('Reset_all_Job_Category');

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
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
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
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
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
        state.isSuccess = false;
        state.statusCode = 0;
        state.isError = false;
      });
  },
});

export default authSlice.reducer;

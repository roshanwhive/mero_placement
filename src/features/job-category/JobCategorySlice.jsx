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
  'job/get-categories',
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
  name: 'job',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getALlJobs.pending, state => {
        state.isLoading = true;
      })
      .addCase(getALlJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.allJobs = action.payload.data;
      })
      .addCase(getALlJobs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      .addCase(getJobCategories.pending, state => {
        state.isLoading = true;
      })
      .addCase(getJobCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.jobCategories = action.payload.data;
      })
      .addCase(getJobCategories.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      .addCase(getJobByCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(getJobByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.allJobs = action.payload.data;
      })
      .addCase(getJobByCategory.rejected, (state, action) => {
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

import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {jobService} from './JobService';

const initialState = {
  allJobs: [],
  singleJob: {},
  jobCategories: [],
  mainCategories: [],
  companyTypes: [],
  employmentTypes: [],
  jobTypes: [],
  jobByTpes: [],
  savedJobs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const getAllJobs = createAsyncThunk(
  'job/get-all-job',
  async thunkAPI => {
    try {
      return await jobService.getAllJobs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getSingleJob = createAsyncThunk(
  'job/get-single-job',
  async (slug, thunkAPI) => {
    try {
      return await jobService.getSingleJob(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// --------------------------------------Job Categories---------------------------------
export const getJobCategories = createAsyncThunk(
  'job/get-categories',
  async thunkAPI => {
    try {
      return await jobService.getJobCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getMainCategories = createAsyncThunk(
  'job/get-main-categories',
  async thunkAPI => {
    try {
      return await jobService.getMainCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getJobByCategory = createAsyncThunk(
  'job/get-job-by-category',
  async (id, thunkAPI) => {
    try {
      return await jobService.getJobByCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// --------------------------------------Company---------------------------------
export const getCompanyTypes = createAsyncThunk(
  'job/get-company-types',
  async thunkAPI => {
    try {
      return await jobService.getCompanyTypes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getJobByCompanyTypes = createAsyncThunk(
  'job/get-job-by-company-types',
  async (id, thunkAPI) => {
    try {
      return await jobService.getJobByCompanyTypes(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// --------------------------------------Employment---------------------------------
export const getEmploymentTypes = createAsyncThunk(
  'job/get-employement-types',
  async thunkAPI => {
    try {
      return await jobService.getEmploymentTypes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getJobByEmploymentTypes = createAsyncThunk(
  'job/get-job-by-employment-types',
  async (id, thunkAPI) => {
    try {
      return await jobService.getJobByEmploymentTypes(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// --------------------------------------Job Type---------------------------------
export const getJobTypes = createAsyncThunk(
  'job/get-job-types',
  async thunkAPI => {
    try {
      return await jobService.getJobTypes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getJobByJobTypes = createAsyncThunk(
  'job/get-job-by-job-types',
  async (id, thunkAPI) => {
    try {
      return await jobService.getJobByJobTypes(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//--------------------------------------Saved Job---------------------------------
export const getSavedJob = createAsyncThunk('job/saved-job', async thunkAPI => {
  try {
    return await jobService.getSavedJob();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//Reset State
export const resetJobCategoryState = createAction('Reset_all_Job_Category');

export const jobCategorySlice = createSlice({
  name: 'job',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get ALl Jobs -------------------------------
      .addCase(getAllJobs.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.allJobs = action.payload.data;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      // ------------------------------------Get single Jobs -------------------------------
      .addCase(getSingleJob.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSingleJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.singleJob = action.payload.data;
      })
      .addCase(getSingleJob.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      // ------------------------------------Job Category -------------------------------
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

      .addCase(getMainCategories.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMainCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.mainCategories = action.payload.data;
      })
      .addCase(getMainCategories.rejected, (state, action) => {
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

      // ------------------------------------Company----------------------------------
      .addCase(getCompanyTypes.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCompanyTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.jobCategories = action.payload.data;
      })
      .addCase(getCompanyTypes.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      .addCase(getJobByCompanyTypes.pending, state => {
        state.isLoading = true;
      })
      .addCase(getJobByCompanyTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.allJobs = action.payload.data;
      })
      .addCase(getJobByCompanyTypes.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      // ------------------------------------Employment-------------------------------
      .addCase(getEmploymentTypes.pending, state => {
        state.isLoading = true;
      })
      .addCase(getEmploymentTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.jobCategories = action.payload.data;
      })
      .addCase(getEmploymentTypes.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      .addCase(getJobByEmploymentTypes.pending, state => {
        state.isLoading = true;
      })
      .addCase(getJobByEmploymentTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.allJobs = action.payload.data;
      })
      .addCase(getJobByEmploymentTypes.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      // ------------------------------------Job Types-------------------------------
      .addCase(getJobTypes.pending, state => {
        state.isLoading = true;
      })
      .addCase(getJobTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.jobCategories = action.payload.data;
      })
      .addCase(getJobTypes.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      .addCase(getJobByJobTypes.pending, state => {
        state.isLoading = true;
      })
      .addCase(getJobByJobTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.jobByTpes = action.payload.data;
      })
      .addCase(getJobByJobTypes.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      // ------------------------------------Get Saved Jobs -------------------------------
      .addCase(getSavedJob.pending, state => {
        state.isLoading = true;
      })
      .addCase(getSavedJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.savedJobs = action.payload.data;
      })
      .addCase(getSavedJob.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Reset State
      .addCase(resetJobCategoryState, state => {
        state.message = '';
        state.isSuccess = false;
        state.statusCode = 0;
        state.isError = false;
      });
  },
});

export default jobCategorySlice.reducer;

import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { StatusService } from './StatusService';

const initialState = {
    savedJobs: [],
    matchedJobs: [],
    appliedJobs: [],
    followedJob: [],
    followedCompany: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
};

//--------------------------------------Saved Job---------------------------------
export const getSavedJob = createAsyncThunk('job/saved-job', async thunkAPI => {
    try {
        return await StatusService.getSavedJob();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//--------------------------------------Matched Job---------------------------------
export const getMatchedJob = createAsyncThunk('job/matched-job', async thunkAPI => {
    try {
        return await StatusService.getMatchedJob();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//--------------------------------------Applied Job---------------------------------
export const getAppliedJob = createAsyncThunk('job/applied-job', async thunkAPI => {
    try {
        return await StatusService.getAppliedJob();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//--------------------------------------Followed Job---------------------------------
export const getFollowedJob = createAsyncThunk('job/followed-job', async thunkAPI => {
    try {
        return await StatusService.getFollowedJob();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

//--------------------------------------Followed Company---------------------------------
export const getFollowedCompany = createAsyncThunk('job/followed-company', async thunkAPI => {
    try {
        return await StatusService.getFollowedCompany();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


//Reset State
export const resetStatusState = createAction('Reset_all_Job_Category');

export const statusSlice = createSlice({
    name: 'status',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // ------------------------------------Get Saved Jobs -------------------------------
            .addCase(getSavedJob.pending, state => {
                state.isLoading = true;
            })
            .addCase(getSavedJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = !action.payload?.success;
                state.isSuccess = action.payload?.success;
                state.message = action.payload?.message;
                state.statusCode = action.payload?.status_code;
                state.savedJobs = action.payload?.data;
            })
            .addCase(getSavedJob.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            // ------------------------------------Get Matched Jobs -------------------------------
            .addCase(getMatchedJob.pending, state => {
                state.isLoading = true;
            })
            .addCase(getMatchedJob.fulfilled, (state, action) => {
  console.log("this is matched job",state.matchedJobs);

                state.isLoading = false;
                state.isError = !action.payload?.success;
                state.isSuccess = action.payload?.success;
                state.message = action.payload?.message;
                state.statusCode = action.payload?.status_code;
                state.matchedJobs = action.payload?.data;
            })
            .addCase(getMatchedJob.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            // ------------------------------------Get Applied Jobs -------------------------------
            .addCase(getAppliedJob.pending, state => {
                state.isLoading = true;
            })
            .addCase(getAppliedJob.fulfilled, (state, action) => {
                state.isLoading = false;
                
                state.isError = !action.payload?.success;
                state.isSuccess = action.payload?.success;
                state.message = action.payload?.message;
                state.statusCode = action.payload?.status_code;
                state.appliedJobs = action.payload?.data;
            })
            .addCase(getAppliedJob.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            // ------------------------------------Get followed Jobs -------------------------------
            .addCase(getFollowedJob.pending, state => {
                state.isLoading = true;
            })
            .addCase(getFollowedJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.statusCode = action.payload.status_code;
                state.followedJob = action.payload.data;
            })
            .addCase(getFollowedJob.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            // ------------------------------------Get followed company -------------------------------
            .addCase(getFollowedCompany.pending, state => {
                state.isLoading = true;
            })
            .addCase(getFollowedCompany.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.statusCode = action.payload.status_code;
                state.followedCompany = action.payload.data;
            })
            .addCase(getFollowedCompany.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            //Reset State
            .addCase(resetStatusState, state => {
                state.message = '';
                state.isSuccess = false;
                state.statusCode = 0;
                state.isError = false;
            });
    },
});

export default statusSlice.reducer;

import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { applyJobService } from './applyJobService'
const initialState = {
  jobApplyData: [],
  lead: [],
  vacancy: [],
  resume: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const getapplyJobData = createAsyncThunk(
  'apply_job/get-applyjob-data',
  async (slug, thunkAPI) => {
    try {
      return await applyJobService.getapplyJobData(slug)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getapplyJobConfirm = createAsyncThunk(
  'apply_job/get-applyjob-confirm',
  async (data, thunkAPI) => {
    console.log("I am slice", data)
    try {
      return await applyJobService.getapplyJobConfirm(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Reset State
export const resetapplyJobState = createAction('Reset_all_Job_apply');

export const applyJobSlice = createSlice({
  name: 'jobApply',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get job apply data -------------------------------
      .addCase(getapplyJobData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getapplyJobData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.jobApplyData = action.payload.data;
        state.lead = action.payload.data.lead;
        state.vacancy = action.payload.data.vacancy;
        state.resume = action.payload.data.lead_resume;

      })
      .addCase(getapplyJobData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      // ------------------------------------Get job apply confirm -------------------------------
      .addCase(getapplyJobConfirm.pending, state => {
        state.isLoading = true;
      })
      .addCase(getapplyJobConfirm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isErrorConfirm = !action.payload.success;
        state.isSuccessConfirm = action.payload.success;
        state.messageConfirm = action.payload.message;
        state.statusCodeConfirm = action.payload.status_code;

      })
      .addCase(getapplyJobConfirm.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Reset State
      .addCase(resetapplyJobState, state => {
        state.message = '';
        state.isSuccess = false;
        state.statusCode = 0;
        state.isError = false;
        state.isSuccessConfirm = false;
        state.statusCodeConfirm = 0;


      });
  },
});

export default applyJobSlice.reducer;
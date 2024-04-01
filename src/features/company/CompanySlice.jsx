import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {companyService} from './CompanyService';

const initialState = {
  companyProfile: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const getCompanyProfile = createAsyncThunk(
  'company/get-company-profile',
  async (slug, thunkAPI) => {
    try {
      return await companyService.companyProfile(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//Reset State
export const resetCompanyState = createAction('Reset_all_company_state');

export const companySlice = createSlice({
  name: 'company',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Get Company Profile -------------------------------
      .addCase(getCompanyProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCompanyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.companyProfile = action.payload.data;
      })
      .addCase(getCompanyProfile.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Reset State
      .addCase(resetCompanyState, state => {
        state.message = '';
        state.isSuccess = false;
        state.statusCode = 0;
        state.isError = false;
      });
  },
});

export default companySlice.reducer;

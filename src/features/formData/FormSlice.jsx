import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { formService } from './FormService';
import { getAllPreference } from '../profile/PreferenceSlice';

const initialState = {
  allCategoriesData: [],
  allGenderData: [],
  prefFormData: {},
  category: [],
  available_type: [],
  level: [],
  locaton: [],
  skill: [],
  expFormData: {},
  organization_type: [],
  job_level: [],
  job_category: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: '',
  message: '',
};

export const getAllCategories = createAsyncThunk(
  'form/categories',
  async thunkAPI => {
    try {
      return await formService.getAllCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAllGender = createAsyncThunk('form/gender', async thunkAPI => {
  try {
    return await formService.getGender();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getPrefFormData = createAsyncThunk('form/prefForm', async thunkAPI => {
  try {
    return await formService.getPrefFormData();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getExpFormData = createAsyncThunk('form/expForm', async thunkAPI => {
  try {
    return await formService.getExpFormData();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction('Reset_all');

export const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      //Login User
      .addCase(getAllGender.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllGender.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allGenderData = action.payload.data;

      })
      .addCase(getAllGender.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Pref form Data
      .addCase(getPrefFormData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getPrefFormData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.prefFormData = action.payload.data;
        state.category = action.payload.data.category;
        state.available_type = action.payload.data.available_type;
        state.level = action.payload.data.level;
        state.locaton = action.payload.data.locaton;
        state.skill = action.payload.data.skill;

      })
      .addCase(getPrefFormData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      //Exp form Data
      .addCase(getExpFormData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getExpFormData.fulfilled, (state, action) => {
        console.log("expForm res", action.payload.data.category)
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.expFormData = action.payload.data;
        state.organization_type = action.payload.data.organization_type;
        state.job_level = action.payload.data.job_level;
        state.job_category = action.payload.data.job_category;
      })
      .addCase(getExpFormData.rejected, (state, action) => {
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

export default formSlice.reducer;

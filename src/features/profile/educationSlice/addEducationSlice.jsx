import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {educationService} from '../EducationService';

const initialState = {
  addEducationArray: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const addEducation = createAsyncThunk(
  'profile/add-education',
  async (eduData, thunkAPI) => {
    try {
      return await educationService.addEducation(eduData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addEducationSlice = createSlice({
  name: 'addEducation',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Add Education -------------------------------
      .addCase(addEducation.pending, state => {
        state.isLoading = true;
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
        state.statusCode = action.payload?.status_code;
        // state.addEducation = action.payload?.data;
        state.addEducationArray = [
          action.payload[0],
          ...state.addEducationArray,
        ];
      })
      .addCase(addEducation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default addEducationSlice.reducer;

import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {educationService} from '../EducationService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingSingle: false,
  statusCode: 0,
  message: '',
};

export const updateEducation = createAsyncThunk(
  'profile/update-education',
  async (eduUpdateData, thunkAPI) => {
    try {
      return await educationService.updateEducation(eduUpdateData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateEducationSlice = createSlice({
  name: 'updateEducation',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Update Education -------------------------------
      .addCase(updateEducation.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        console.log('update', action.payload.data);
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default updateEducationSlice.reducer;

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

export const delEducation = createAsyncThunk(
  'profile/del-single-education',
  async (id, thunkAPI) => {
    try {
      return await educationService.delEducation(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteEducationSlice = createSlice({
  name: 'deleteEducation',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Delete Education -------------------------------
      .addCase(delEducation.pending, state => {
        state.isLoading = true;
      })
      .addCase(delEducation.fulfilled, (state, action) => {
        state.isLoading = false;

        state.isError = !action.payload.success;

        state.isSuccess = action.payload.success;

        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
      })
      .addCase(delEducation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default deleteEducationSlice.reducer;

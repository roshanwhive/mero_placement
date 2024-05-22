import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {experienceService} from '../ExperienceService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
};

export const delExperience = createAsyncThunk(
  'profile/del-single-experience',
  async (id, thunkAPI) => {
    try {
      return await experienceService.delExperience(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteExperienceSlice = createSlice({
  name: 'deleteExperience',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ------------------------------------Delete Experience -------------------------------
      .addCase(delExperience.pending, state => {
        state.isLoading = true;
      })
      .addCase(delExperience.fulfilled, (state, action) => {
        console.log('delete', action.payload.message);
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
      })
      .addCase(delExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default deleteExperienceSlice.reducer;

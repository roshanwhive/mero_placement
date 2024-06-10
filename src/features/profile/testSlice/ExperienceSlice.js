import {createSlice, createAsyncThunk, createAction, current} from '@reduxjs/toolkit';
import { experienceService } from '../ExperienceService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
  allExperience: [],
};

export const addExperience = createAsyncThunk(
  'profile/add-Experience',
  async (experienceData, thunkAPI) => {
    try {
      return await experienceService.addExperience(experienceData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
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

export const updateExperience = createAsyncThunk(
  'profile/update-Experience',
  async (experienceData, thunkAPI) => {
    try {
      return await experienceService.updateExperience(experienceData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAllExperience = createAsyncThunk(
  'profile/get-all-experience',
  async thunkAPI => {
    try {
      return await experienceService.getAllExperience();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const experienceSliceTest = createSlice({
    name: 'experienceTest',
    initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
       // ------------------------------------Add Experience -------------------------------
       .addCase(addExperience.pending, state => {
        state.isLoading = true;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.allExperience = [
          action.payload?.data[0],
          ...state.allExperience,
        ];
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      // ------------------------------------Delete Experience -------------------------------
    .addCase(delExperience.pending, state => {
      state.isLoading = false;
})
.addCase(delExperience.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false
  state.isSuccess = true
  state.statusCode = action.payload.status_code;
  state.allExperience = state.allExperience.filter(item => item.experience_id != action?.payload)
})
.addCase(delExperience.rejected, (state, action) => {
  state.isError = true;
  state.isLoading = false;
  state.isSuccess = false;
})

      // ------------------------------------Get All Experience -------------------------------
      .addCase(getAllExperience.pending, state => {
        state.isLoading = true;
        state.allExperience = [];
      })
      .addCase(getAllExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.allExperience = action.payload.data;
      })
      .addCase(getAllExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
       // ------------------------------------Update Experience -------------------------------
       .addCase(updateExperience.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        const [updatedItem] = action.payload.data
        const updatedList = current(state).allExperience?.map((item) =>
          item.experience_id === updatedItem.experience_id ? updatedItem : item
        )
        state.allExperience = updatedList
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });

  },
});

export default experienceSliceTest.reducer;

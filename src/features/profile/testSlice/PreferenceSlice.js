import {createSlice, createAsyncThunk, createAction, current} from '@reduxjs/toolkit';
import { preferenceService } from '../PreferenceService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
  allPreference: [],
};

export const addPreference = createAsyncThunk(
  'profile/add-preference',
  async (prefData, thunkAPI) => {
    try {
      return await preferenceService.addPreference(prefData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const delPreference = createAsyncThunk(
  'profile/del-single-preference',
  async (id, thunkAPI) => {
    try {
      return await preferenceService.delPreference(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAllPreference = createAsyncThunk(
  'profile/get-all-preference',
  async thunkAPI => {
    try {
      return await preferenceService.getAllPreference();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updatePreference = createAsyncThunk(
  'profile/update-preference',
  async (prefData, thunkAPI) => {
    try {
      return await preferenceService.updatePreference(prefData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);


export const preferenceSliceTest = createSlice({
  name: 'preferenceTest',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
       // ------------------------------------Add Preference -------------------------------
       .addCase(addPreference.pending, state => {
        state.isLoading = true;
      })
      .addCase(addPreference.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.allPreference = [
          action.payload?.data[0],
          ...state.allPreference,
        ];
      })
      .addCase(addPreference.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      // ------------------------------------Delete Preference -------------------------------
      .addCase(delPreference.pending, state => {
      state.isLoading = false;
  })
  .addCase(delPreference.fulfilled, (state, action) => {
    console.log('delete', action.payload.message);
    state.isLoading = false
       state.isError = false
       state.isSuccess = true
    state.message = action?.payload?.message;
    state.statusCode = action.payload.status_code;
    state.allPreference = state.allPreference.filter(item => item.id != action?.payload)
  
  })
  .addCase(delPreference.rejected, (state, action) => {
    state.isError = true;
    state.isLoading = false;
    state.isSuccess = false;
  })


     // ------------------------------------Get All Preference -------------------------------
     .addCase(getAllPreference.pending, state => {
      state.isLoading = true;
      state.allPreference = [];
    })
    .addCase(getAllPreference.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = !action.payload.success;
      state.isSuccess = action.payload.success;
      state.message = action.payload.message;
      state.statusCode = action.payload.status_code;
      state.allPreference = action.payload.data;
    })
    .addCase(getAllPreference.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
    })
      // ------------------------------------Update preference -------------------------------
      .addCase(updatePreference.pending, state => {
        state.isLoading = true;
      })
      .addCase(updatePreference.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        const [updatedItem] = action.payload.data
        const updatedList = current(state).allPreference?.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
        state.allPreference = updatedList
      })
      .addCase(updatePreference.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
  },
});

export default preferenceSliceTest.reducer;

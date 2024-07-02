import {createSlice, createAsyncThunk, createAction, current} from '@reduxjs/toolkit';
import { educationService } from '../EducationService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusCode: 0,
  message: '',
  allEducation: [],
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

  export const getAllEducation = createAsyncThunk(
    'profile/get-all-educations',
    async thunkAPI => {
      try {
        return await educationService.getAllEducation();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    },
  );

export const educationSliceTest = createSlice({
  name: 'educationTest',
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
        state.allEducation = [
          action.payload?.data[0],
          ...state.allEducation,
        ];
      })
      .addCase(addEducation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

       // ------------------------------------Get All Education -------------------------------
       .addCase(getAllEducation.pending, state => {
        state.isLoading = true;
        state.allEducation = [];
      })
      .addCase(getAllEducation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload.success;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.statusCode = action.payload.status_code;
        state.allEducation = action.payload.data;
      })
      .addCase(getAllEducation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
       // ------------------------------------Update Education -------------------------------
       .addCase(updateEducation.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = !action.payload?.success;
        state.isSuccess = action.payload?.success;
        state.message = action.payload?.message;
        state.statusCode = action.payload?.status_code;
        const [updatedItem] = action.payload.data
        const updatedList = current(state).allEducation?.map((item) =>
          item.education_id === updatedItem.education_id ? updatedItem : item
        )
        state.allEducation = updatedList

      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

       // ------------------------------------Delete Education -------------------------------
       .addCase(delEducation.pending, state => {
        state.isLoading = false;
      })
      .addCase(delEducation.fulfilled, (state, action) => {
       // console.log('delete',  state.allEducation);
       state.isLoading = false
       state.isError = false
       state.isSuccess = true
       // const updatedList = current(state).addEducationArray?.filter((item)=>item?.education_id!=action.payload.data)
       state.allEducation = state.allEducation.filter(item => item.education_id != action?.payload)
      })
      .addCase(delEducation.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export default educationSliceTest.reducer;

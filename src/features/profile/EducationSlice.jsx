import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { educationService } from './EducationService';

const initialState = {
    allEducation: [],
    singleEducation: {},
    addEducation: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
};

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

export const getSingleEducation = createAsyncThunk(
    'job/get-single-education',
    async (id, thunkAPI) => {
        try {
            return await educationService.getSingleEducation(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

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
    async (eduData, thunkAPI) => {
        try {
            return await educationService.updateEducation(eduData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

//Reset State
export const resetEducationState = createAction('Reset_all_Education');

export const educationSlice = createSlice({
    name: 'education',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // ------------------------------------Get All Education -------------------------------
            .addCase(getAllEducation.pending, state => {
                state.isLoading = true;
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

            // ------------------------------------Get Single Education -------------------------------
            .addCase(getSingleEducation.pending, state => {
                state.isLoading = true;
            })
            .addCase(getSingleEducation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.statusCode = action.payload.status_code;
                state.singleEducation = action.payload.data;
            })
            .addCase(getSingleEducation.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            // ------------------------------------Save Education -------------------------------
            .addCase(addEducation.pending, state => {
                state.isLoading = true;
            })
            .addCase(addEducation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.statusCode = action.payload.status_code;
                state.addEducation = action.payload.data;
            })
            .addCase(addEducation.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            // ------------------------------------Delete Education -------------------------------
            .addCase(delEducation.pending, state => {
                state.isLoading = true;
            })
            .addCase(delEducation.fulfilled, (state, action) => {
                console.log("delete", action.payload.message)
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
            })

            // ------------------------------------Update Education -------------------------------
            .addCase(updateEducation.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateEducation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.statusCode = action.payload.status_code;
                state.singleEducation = action.payload.data;
            })
            .addCase(updateEducation.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            //Reset State
            .addCase(resetEducationState, state => {
                state.message = '';
                state.isSuccess = false;
                state.statusCode = 0;
                state.isError = false;
            });
    },
});

export default educationSlice.reducer;
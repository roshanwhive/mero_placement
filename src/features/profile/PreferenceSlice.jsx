import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { preferenceService } from './PreferenceService';

const initialState = {
    allPreference: [],
    singlePreference: {},
    addPreference: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
};

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

export const getSinglePreference = createAsyncThunk(
    'job/get-single-preference',
    async (id, thunkAPI) => {
        try {
            return await preferenceService.getSinglePreference(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

//Reset State
export const resetPreferenceState = createAction('Reset_all_Preference');

export const preferenceSlice = createSlice({
    name: 'preference',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // ------------------------------------Get All Preference -------------------------------
            .addCase(getAllPreference.pending, state => {
                state.isLoading = true;
            })
            .addCase(getAllPreference.fulfilled, (state, action) => {
                console.log("allpref response", action.payload.message)
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

            // ------------------------------------Get Single Education -------------------------------
            .addCase(getSinglePreference.pending, state => {
                state.isLoading = true;
            })
            .addCase(getSinglePreference.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.statusCode = action.payload.status_code;
                state.singlePreference = action.payload.data;
            })
            .addCase(getSinglePreference.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            // // ------------------------------------Save Education -------------------------------
            // .addCase(addEducation.pending, state => {
            //     state.isLoading = true;
            // })
            // .addCase(addEducation.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = !action.payload.success;
            //     state.isSuccess = action.payload.success;
            //     state.message = action.payload.message;
            //     state.statusCode = action.payload.status_code;
            //     state.addEducation = action.payload.data;
            // })
            // .addCase(addEducation.rejected, (state, action) => {
            //     state.isError = true;
            //     state.isLoading = false;
            //     state.isSuccess = false;
            // })

            //Reset State
            .addCase(resetPreferenceState, state => {
                state.message = '';
                state.isSuccess = false;
                state.statusCode = 0;
                state.isError = false;
            });
    },
});

export default preferenceSlice.reducer;
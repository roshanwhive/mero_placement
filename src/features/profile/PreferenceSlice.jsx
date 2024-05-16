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
    messageAdd: '',
    messageDel: '',
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
    'profile/get-single-preference',
    async (id, thunkAPI) => {
        try {
            return await preferenceService.getSinglePreference(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

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

            // ------------------------------------Get Single Preference -------------------------------
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

            // ------------------------------------Add Preference -------------------------------
            .addCase(addPreference.pending, state => {
                state.isLoading = true;
            })
            .addCase(addPreference.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.messageAdd = action.payload.message;
                state.statusCode = action.payload.status_code;
            })
            .addCase(addPreference.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            // ------------------------------------Delete Preference -------------------------------
            .addCase(delPreference.pending, state => {
                state.isLoading = true;
            })
            .addCase(delPreference.fulfilled, (state, action) => {
                console.log("delete", action.payload.message)
                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.messageDel = action?.payload?.message;
                state.statusCode = action.payload.status_code;
            })
            .addCase(delPreference.rejected, (state, action) => {
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
                state.singlePreference = action.payload.data;
            })
            .addCase(updatePreference.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            //Reset State
            .addCase(resetPreferenceState, state => {
                state.message = '';
                state.messageAdd = '';
                state.messageDel = '';
                state.isSuccess = false;
                state.statusCode = 0;
                state.isError = false;
            });
    },
});

export default preferenceSlice.reducer;
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { experienceService } from './ExperienceService';

const initialState = {
    allExperience: [],
    singleExperience: {},
    addExperience: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
    messageAdd: '',
    messageDel: '',
};

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

export const getSingleExperience = createAsyncThunk(
    'profile/get-single-experience',
    async (id, thunkAPI) => {
        try {
            return await experienceService.getSingleExperience(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

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


//Reset State
export const resetExperienceState = createAction('Reset_all_Experience');

export const experienceSlice = createSlice({
    name: 'experience',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // ------------------------------------Get All Experience -------------------------------
            .addCase(getAllExperience.pending, state => {
                state.isLoading = true;
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

            // ------------------------------------Get Single Experience -------------------------------
            .addCase(getSingleExperience.pending, state => {
                state.isLoading = true;
            })
            .addCase(getSingleExperience.fulfilled, (state, action) => {
                console.log("first", action.payload.message)
                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.statusCode = action.payload.status_code;
                state.singleExperience = action.payload.data;
            })
            .addCase(getSingleExperience.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            // ------------------------------------Add Education -------------------------------
            .addCase(addExperience.pending, state => {
                state.isLoading = true;
            })
            .addCase(addExperience.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.messageAdd = action.payload.message;

            })
            .addCase(addExperience.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            // ------------------------------------Delete Experience -------------------------------
            .addCase(delExperience.pending, state => {
                state.isLoading = true;
            })
            .addCase(delExperience.fulfilled, (state, action) => {
                console.log("delete", action.payload.message)
                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.messageDel = action.payload.message;
                state.statusCode = action.payload.status_code;
            })
            .addCase(delExperience.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            // ------------------------------------Update Experience -------------------------------
            .addCase(updateExperience.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateExperience.fulfilled, (state, action) => {
                console.log("first", action.payload.message)
                state.isLoading = false;
                state.isError = !action.payload.success;
                state.isSuccess = action.payload.success;
                state.message = action.payload.message;
                state.statusCode = action.payload.status_code;
                state.singleExperience = action.payload.data;
            })
            .addCase(updateExperience.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
            })

            //Reset State
            .addCase(resetExperienceState, state => {
                state.message = '';
                state.messageAdd = '';
                state.messageDel = '';
                state.isSuccess = false;
                state.statusCode = 0;
                state.isError = false;
            });
    },
});

export default experienceSlice.reducer;
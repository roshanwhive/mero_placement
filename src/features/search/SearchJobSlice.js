import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { SearchJobService } from './SearchService';

const initialState = {
    searchJob: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    statusCode: 0,
    message: '',
};

//--------------------------------------Search Job---------------------------------
export const getSearchJob = createAsyncThunk(
    'search/search-job', 
    async (searchData,thunkAPI) => {
    try {
        return await SearchJobService.getSearchJob(searchData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});



export const searchJobSlice = createSlice({
    name: 'searchJob',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // ------------------------------------Get Search Jobs -------------------------------
            .addCase(getSearchJob.pending, state => {
                state.isLoading = true;
                state.searchJob = [];

            })
            .addCase(getSearchJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = !action.payload?.success;
                state.isSuccess = action.payload?.success;
                state.message = action.payload?.message;
                state.statusCode = action.payload?.status_code;
                state.searchJob = action.payload?.data?.data;
            })
            .addCase(getSearchJob.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.searchJob = [];
            });
    },
});

export default searchJobSlice.reducer;

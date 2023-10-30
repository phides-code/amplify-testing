import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Person } from '../../types';

const PEOPLE_URL = process.env.REACT_APP_PEOPLE_URL as string;

interface FetchResponseType {
    data?: Person[];
    errorMessage?: string;
}

interface PeopleState {
    people: Person[];
    errorMessage: string;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: PeopleState = {
    people: [],
    status: 'idle',
    errorMessage: '',
};

export const fetchPeople = createAsyncThunk('people/fetchPeople', async () => {
    const rawFetchResponse = await fetch(PEOPLE_URL);

    const fetchResponse: FetchResponseType = await rawFetchResponse.json();

    if (fetchResponse.errorMessage || !fetchResponse.data) {
        throw new Error(fetchResponse.errorMessage);
    }

    return fetchResponse;
});

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPeople.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPeople.fulfilled, (state, action) => {
                state.status = 'idle';
                state.people = action.payload.data as Person[];
            })
            .addCase(fetchPeople.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.error.message as string;
            });
    },
});

export const selectPeople = createSelector(
    (state: RootState) => state.people,
    (people) => people
);

export default peopleSlice.reducer;

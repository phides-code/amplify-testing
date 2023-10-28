import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';

const PEOPLE_URL = process.env.REACT_APP_PEOPLE_URL as string;

export interface Person {
    id: string;
    name: string;
}

interface FetchResponseType {
    people?: Person[] | null;
    message?: string | null;
}

interface PeopleState extends FetchResponseType {
    status: 'idle' | 'loading' | 'failed';
}

const initialState: PeopleState = {
    people: null,
    status: 'idle',
    message: null,
};

export const fetchPeople = createAsyncThunk('people/fetchPeople', async () => {
    const rawFetchResponse = await fetch(PEOPLE_URL);

    const fetchResponse: FetchResponseType = await rawFetchResponse.json();

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
                state.people = action.payload.people;
            })
            .addCase(fetchPeople.rejected, (state, action) => {
                state.status = 'failed';
                state.message = action.error.message;
            });
    },
});

// export const selectPeople = createSelector(

// )

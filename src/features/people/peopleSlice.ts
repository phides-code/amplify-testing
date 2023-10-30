import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const PEOPLE_URL = process.env.REACT_APP_PEOPLE_URL as string;

export interface Person {
    id: string;
    name: string;
}

interface ErrorMessage {
    message: string;
}

interface FetchReturnType {
    people?: Person[] | null;
    errorMessage?: string | null;
}

type FetchResponseType = Person[] | ErrorMessage;

// type PostError = string;

interface PeopleState extends FetchReturnType {
    status: 'idle' | 'loading' | 'failed';
}

const initialState: PeopleState = {
    people: null,
    status: 'idle',
    errorMessage: null,
};

// export const postPerson = createAsyncThunk('people/postPerson', async () => [
//     const rawPostResponse = await fetch(PEOPLE_URL)
// ])

export const fetchPeople = createAsyncThunk('people/fetchPeople', async () => {
    const rawFetchResponse = await fetch(PEOPLE_URL);

    const fetchResponse: FetchResponseType = await rawFetchResponse.json();

    if (Array.isArray(fetchResponse)) {
        return { people: fetchResponse } as FetchReturnType; // Successful response with people array
    } else {
        const errorMessage: string =
            fetchResponse.message || 'Failed to fetch people data';

        return { errorMessage } as FetchReturnType; // Error response with an error message
    }
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
                state.errorMessage = action.error.message;
            });
    },
});

export const selectPeople = createSelector(
    (state: RootState) => state.people,
    (people) => people
);

export default peopleSlice.reducer;

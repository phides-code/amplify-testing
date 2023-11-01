import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import { Person } from '../../types';
import { RootState } from '../../app/store';

const PEOPLE_URL = process.env.REACT_APP_PEOPLE_URL as string;

interface FetchResponseType {
    data?: Person;
    errorMessage?: string;
}

interface PersonState {
    person: Person | null;
    errorMessage: string;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: PersonState = {
    person: null,
    errorMessage: '',
    status: 'idle',
};

export const createPerson = createAsyncThunk(
    'person/createPerson',
    async (newPerson: Partial<Person>) => {
        const rawFetchResponse = await fetch(PEOPLE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPerson),
        });

        const fetchResponse: FetchResponseType = await rawFetchResponse.json();

        if (fetchResponse.errorMessage || !fetchResponse.data) {
            throw new Error(fetchResponse.errorMessage);
        }

        return fetchResponse;
    }
);

export const deletePerson = createAsyncThunk(
    'person/deletePerson',
    async (personToDelete: Partial<Person>) => {
        const rawfetchResponse = await fetch(
            PEOPLE_URL + '/' + personToDelete.id,
            {
                method: 'DELETE',
            }
        );

        const fetchResponse: FetchResponseType = await rawfetchResponse.json();

        if (fetchResponse.errorMessage || !fetchResponse.data) {
            throw new Error(fetchResponse.errorMessage);
        }

        return fetchResponse;
    }
);

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createPerson.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createPerson.fulfilled, (state, action) => {
                state.status = 'idle';
                state.person = action.payload.data as Person;
            })
            .addCase(createPerson.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.error.message as string;
            })
            .addCase(deletePerson.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deletePerson.fulfilled, (state) => {
                state.status = 'idle';
            })
            .addCase(deletePerson.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.error.message as string;
            });
    },
});

export const selectPersonStatus = createSelector(
    (state: RootState) => state.person.status,
    (status) => status
);

export default personSlice.reducer;

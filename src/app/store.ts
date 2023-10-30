import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import peopleReducer from '../features/people/peopleSlice';
import personReducer from '../features/person/personSlice';

export const store = configureStore({
    reducer: {
        people: peopleReducer,
        person: personReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

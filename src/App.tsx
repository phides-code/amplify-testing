import styled from 'styled-components';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import PeopleList from './components/PeopleList';
import PersonAdder from './components/PersonAdder';
import { fetchPeople, selectPeople } from './features/people/peopleSlice';
import { useSelector } from 'react-redux';

const App = () => {
    const dispatch = useAppDispatch();
    const peopleState = useSelector(selectPeople);
    const isLoading = peopleState.status === 'loading';
    const errorState =
        peopleState.errorMessage !== '' || peopleState.status === 'failed';

    useEffect(() => {
        dispatch(fetchPeople());
    }, [dispatch]);

    if (isLoading) return <Wrapper>...</Wrapper>;
    if (errorState) return <Wrapper>Something went wrong.</Wrapper>;

    return (
        <Wrapper>
            <PeopleList />
            <PersonAdder />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 0.8rem;
`;

export default App;

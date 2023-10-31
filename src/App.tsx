import styled from 'styled-components';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import PeopleList from './components/PeopleList';
import PersonAdder from './components/PersonAdder';
import { fetchPeople, selectPeople } from './features/people/peopleSlice';
import { useSelector } from 'react-redux';
import { selectPersonStatus } from './features/person/personSlice';

const App = () => {
    const dispatch = useAppDispatch();
    const peopleState = useSelector(selectPeople);
    const personStatus = useSelector(selectPersonStatus);
    const isLoading = peopleState.status === 'loading';
    const fetchPeopleErrorState =
        peopleState.errorMessage !== '' || peopleState.status === 'failed';

    const personErrorState = personStatus === 'failed';

    useEffect(() => {
        dispatch(fetchPeople());
    }, [dispatch]);

    const ErrorMessage = () => {
        return <ErrorMessageText>Something went wrong.</ErrorMessageText>;
    };

    if (isLoading) return <Wrapper>...</Wrapper>;
    if (fetchPeopleErrorState)
        return (
            <Wrapper>
                <ErrorMessage />
            </Wrapper>
        );

    return (
        <Wrapper>
            <PeopleList />
            <PersonAdder />
            {personErrorState && <ErrorMessage />}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 0.8rem;
`;

const ErrorMessageText = styled.div`
    color: red;
    margin-top: 0.4rem;
`;

export default App;

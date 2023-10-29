import styled from 'styled-components';
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import { fetchPeople, selectPeople } from '../features/people/peopleSlice';
import { useEffect } from 'react';

const PeopleList = () => {
    const dispatch = useAppDispatch();

    const peopleState = useSelector(selectPeople);
    const people = peopleState.people;
    const isLoading = peopleState.status === 'loading';
    const errorState =
        peopleState.errorMessage !== null || peopleState.status === 'failed';

    useEffect(() => {
        dispatch(fetchPeople());
    }, [dispatch]);

    if (isLoading) return <Wrapper>...</Wrapper>;
    if (errorState) return <Wrapper>Something went wrong.</Wrapper>;

    return (
        <Wrapper>
            {people &&
                people?.map((person) => (
                    <div key={person.id}>{person.name}</div>
                ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 1rem;
`;

export default PeopleList;

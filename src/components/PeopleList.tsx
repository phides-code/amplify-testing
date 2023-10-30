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
        <Table>
            <thead>
                <TableRow>
                    <TableHeader>ID</TableHeader>
                    <TableHeader>Name</TableHeader>
                </TableRow>
            </thead>
            <tbody>
                {people &&
                    people?.map((person, i) => (
                        <TableRow key={person.id}>
                            <TableCell>{person.id.slice(0, 8)}</TableCell>
                            <TableCell key={person.id}>{person.name}</TableCell>
                        </TableRow>
                    ))}
            </tbody>
        </Table>
    );
};

const Table = styled.table`
    padding: 0.4rem 0 0.4rem 0.4rem;
    margin: 0.4rem;
    border: 1px solid;
    border-radius: 8px;
`;

const TableHeader = styled.th`
    text-align: left;
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
    padding-right: 0.6rem;
`;

const Wrapper = styled.div``;

export default PeopleList;

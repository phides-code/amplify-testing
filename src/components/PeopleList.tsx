import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectPeople } from '../features/people/peopleSlice';

const PeopleList = () => {
    const peopleState = useSelector(selectPeople);
    const people = peopleState.people;

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

export default PeopleList;

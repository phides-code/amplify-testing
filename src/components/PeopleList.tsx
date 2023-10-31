import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectPeople } from '../features/people/peopleSlice';
import PersonRow from './PersonRow';

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
                        <PersonRow key={person.id} person={person} />
                    ))}
            </tbody>
        </Table>
    );
};

const Table = styled.table`
    padding: 0.4rem 0 0.4rem 0.4rem;
    border: 1px solid;
    border-radius: 8px;
    margin-bottom: 0.4rem;
`;

const TableHeader = styled.th`
    text-align: left;
`;

const TableRow = styled.tr``;

export default PeopleList;

import styled from 'styled-components';
import { Person } from '../types';
import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { deletePerson } from '../features/person/personSlice';
import { fetchPeople } from '../features/people/peopleSlice';

interface PersonRowProps {
    person: Person;
}

const PersonRow = ({ person }: PersonRowProps) => {
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        await dispatch(deletePerson({ id: person.id }));
        dispatch(fetchPeople());
    };

    return (
        <TableRow>
            <TableCell>{person.id.slice(0, 8)}</TableCell>
            <TableCell>{person.name}</TableCell>
            <TableCell>
                <DeleteButton onClick={handleDelete} disabled={isDeleting}>
                    Delete
                </DeleteButton>
            </TableCell>
        </TableRow>
    );
};

const DeleteButton = styled.button`
    border-radius: 8px;
    background-color: darkred;
    color: white;
    &[disabled] {
        border: 1px solid;
        background-color: black;
        color: darkgrey;
    }
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
    padding-right: 0.6rem;
`;

export default PersonRow;

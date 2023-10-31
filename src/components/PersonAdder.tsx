import { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../app/hooks';
import {
    createPerson,
    selectPersonStatus,
} from '../features/person/personSlice';
import { useSelector } from 'react-redux';
import { fetchPeople } from '../features/people/peopleSlice';

const PersonAdder = () => {
    const dispatch = useAppDispatch();
    const [isSubmittimg, setIsSubmitting] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const createPersonStatus = useSelector(selectPersonStatus);

    const isLoading = createPersonStatus === 'loading';
    const disableButton = isSubmittimg || nameInput === '' || isLoading;

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setIsSubmitting(true);

        await dispatch(
            createPerson({
                name: nameInput,
            })
        );

        await dispatch(fetchPeople());

        setNameInput('');
        setIsSubmitting(false);
    };

    return (
        <Wrapper>
            <AddAPerson>Add a Person</AddAPerson>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name: </label>
                <StyledInput
                    id='name'
                    name='name'
                    type='text'
                    value={nameInput}
                    onChange={(ev) => setNameInput(ev.target.value)}
                    autoComplete='name'
                />
                <StyledButton disabled={disableButton} type='submit'>
                    Submit
                </StyledButton>
            </form>
        </Wrapper>
    );
};

const StyledButton = styled.button`
    border-radius: 8px;
    background-color: darkgreen;
    color: white;
    &[disabled] {
        border: 1px solid;
        background-color: black;
        color: darkgrey;
    }
`;

const Wrapper = styled.div`
    width: max-content;
    padding: 0.4rem 0.4rem 0.4rem 0.4rem;
    border: 1px solid;
    border-radius: 8px;
`;

const AddAPerson = styled.div`
    font-weight: bold;
    margin-bottom: 0.4rem;
`;

const StyledInput = styled.input`
    width: 8rem;
    border: 1px solid;
    border-radius: 8px;
    margin-right: 0.4rem;
`;

export default PersonAdder;

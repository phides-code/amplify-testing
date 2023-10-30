import { useState } from 'react';
import styled from 'styled-components';

const PersonAdder = () => {
    const [isSubmittimg, setIsSubmitting] = useState(false);
    const [nameInput, setNameInput] = useState('');

    const disableButton = isSubmittimg || nameInput === '';

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setIsSubmitting(true);
        console.log('nameInput:' + nameInput);
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
                <button disabled={disableButton} type='submit'>
                    Submit
                </button>
            </form>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: max-content;
    margin: 0.4rem;
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

import styled from 'styled-components';

const FormContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 55vh;
    width: 100%;
    position: absolute;
    top: 7rem;
    border-radius: 2rem;
`;
const Form = ({children}) => {
    return (
        <FormContainer>
            {children}
        </FormContainer>
    )
}

export default Form;

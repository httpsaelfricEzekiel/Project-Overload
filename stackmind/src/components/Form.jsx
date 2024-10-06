import styled from 'styled-components';

const FormContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 57vh;
    width: 99%;
    position: absolute;
    top: 7rem;
    ${'' /* border: 1px solid red; */}
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

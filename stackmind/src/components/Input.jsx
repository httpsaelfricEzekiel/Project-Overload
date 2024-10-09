import styled from 'styled-components';

const InputBox = styled.input`
    width: 25rem;
    padding: 0.80rem 0.90rem;
    box-sizing: border-box;
    border-radius: 1rem;
    background-color: white;
    color: black;
    cursor: pointer;
    border: none;
`;

const InputEmail = ({type, placeholder}) => {
    return (
        <InputBox
            type={type}
            placeholder={placeholder}
        />
    )
}

export default InputEmail;
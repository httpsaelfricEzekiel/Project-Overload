import styled from 'styled-components';

const InputBox = styled.input`
    width: 25rem;
    padding: 0.80rem 0.90rem;
    box-sizing: border-box;
    border-radius: 1rem;
    background-color: white;
    color: black;
    border: none;
    position: absolute;
    left: 2rem;
`;

const InputPassword = ({type, placeholder}) => {
    return (
        <InputBox
            type={type}
            placeholder={placeholder}
        />
    )
}

export default InputPassword;
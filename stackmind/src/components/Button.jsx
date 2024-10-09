import styled from 'styled-components';
import '../style.css';

const ButtonBox  = styled.button`
    padding: 1rem 9rem;
    border: none;
    border-radius: 2rem;
    box-shadow: 0.40rem 0.40rem 0.1rem gray;
    cursor: pointer;
`;


function Button() {
    return (
        <ButtonBox className='btn'>
            Login
        </ButtonBox>
    )
}

export default Button;
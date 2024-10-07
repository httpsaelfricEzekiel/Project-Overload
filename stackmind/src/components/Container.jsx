import styled from "styled-components";

const MyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    height: 100vh;
    background-color: #FFB199;
`

const Container = ({children}) => {
    return (
        <MyContainer>
            {children}
        </MyContainer>
    )
}

export default Container;
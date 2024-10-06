import styled from "styled-components";

const MyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    min-height: 99.75vh;
`

const Container = ({children}) => {
    return (
        <MyContainer>
            {children}
        </MyContainer>
    )
}

export default Container;

import styled, {keyframes }from "styled-components"

export default function Spinner(){
    return(
        <Container>
            <SpinnerRing/>
        </Container>
    )
}

const spin = keyframes`
0%{
    transform: rotate(0deg);
}
100%{
    transform: rotate(360deg);
}
`;
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const SpinnerRing= styled.div`
width: 32px;
height: 32px;
border-radius: 50%;

border: 4px solid #e2e8f0; 
border-top-color: #3b5998;
animation: ${spin} 0.8s linear infinite;

`;
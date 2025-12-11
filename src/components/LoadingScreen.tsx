import styled from "styled-components";

const Wrapper = styled.div`
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const Spinner = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid rgba(0, 0, 0, 0.12);
    border-top-color: rgba(0, 0, 0, 0.65);
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

function LoadingScreen() {
    return (
        <Wrapper>
            <Spinner />
        </Wrapper>
    );
}

export default LoadingScreen;

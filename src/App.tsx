import GlobalStyle from "./styles/GlobalStyles.tsx";
import { RouterProvider } from "react-router";
import router from "./router/router.tsx";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen.tsx";
import { auth } from "./firebase.ts";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 100dvh;
    display: flex;
    justify-content: center;
`;

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const init = async () => {
        await auth.authStateReady();
        setIsLoading(false);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <Wrapper>
            <GlobalStyle />
            {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
        </Wrapper>
    );
}

export default App;

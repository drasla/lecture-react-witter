import GlobalStyle from "./styles/GlobalStyles.tsx";
import { RouterProvider } from "react-router";
import router from "./router/router.tsx";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen.tsx";
import { auth } from "./firebase.ts";

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
        <>
            <GlobalStyle />
            {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
        </>
    );
}

export default App;

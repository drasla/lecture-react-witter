import GlobalStyle from "./styles/GlobalStyles.tsx";
import { RouterProvider } from "react-router";
import router from "./router/router.tsx";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen.tsx";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const init = async () => {
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

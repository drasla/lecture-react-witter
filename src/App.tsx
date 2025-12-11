import GlobalStyle from "./styles/GlobalStyles.tsx";
import { RouterProvider } from "react-router";
import router from "./router/router.tsx";

function App() {
    return (
        <>
            <GlobalStyle />
            <RouterProvider router={router} />
        </>
    );
}

export default App;

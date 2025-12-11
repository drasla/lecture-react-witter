import type { PropsWithChildren } from "react";
import {auth} from "../firebase.ts";
import {Navigate} from "react-router";

function ProtectedRoute({ children }: PropsWithChildren) {
    const user = auth.currentUser;

    if (user === null) {
        return <Navigate to={"/login"} />;
    }
    return children;
}

export default ProtectedRoute;

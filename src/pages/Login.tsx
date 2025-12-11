import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form, Input, Title, Wrapper, Switcher, ErrorText } from "../styles/AuthStyles.tsx";

type FormValues = {
    email: string;
    password: string;
};

function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate("/");
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError("root", { message: e.message });
            }
        }
    };

    return (
        <Wrapper>
            <Title>Log into 𝕏</Title>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    placeholder="Email"
                    type="email"
                    {...register("email", { required: "Email is required." })}
                />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

                <Input
                    placeholder="Password"
                    type="password"
                    {...register("password", { required: "Password is required." })}
                />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

                <Input type="submit" value={isSubmitting ? "Loading..." : "Log in"} />
            </Form>

            {errors.root && <ErrorText>{errors.root.message}</ErrorText>}

            <Switcher>
                Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
            </Switcher>
        </Wrapper>
    );
}

export default Login;

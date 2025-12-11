import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.ts";
import { ErrorText, Form, Input, Switcher, Title, Wrapper } from "../styles/AuthStyles.tsx";

type FormValues = {
    name: string;
    email: string;
    password: string;
};

function CreateAccount() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        clearErrors();

        try {
            const credentials = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
            await updateProfile(credentials.user, {
                displayName: data.name,
            });
            navigate("/");
        } catch (error) {
            console.log(error);
            setError("root", { message: "계정 생성에 실패하였습니다." });
        }
    };
    return (
        <Wrapper>
            <Title>Join 𝕏</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("name", { required: "이름을 입력해주세요." })}
                    placeholder="Name"
                    type="text"
                    required
                />
                {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                <Input
                    {...register("email", { required: "이메일을 입력해주세요." })}
                    placeholder="Email"
                    type="email"
                    required
                />
                {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                <Input
                    {...register("password", { required: "비밀번호를 입력해주세요." })}
                    placeholder="Password"
                    type="password"
                    required
                />
                {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                <Input type="submit" value={isSubmitting ? "Loading..." : "Create Account"} />
            </Form>
            {errors.root && <ErrorText>{errors.root.message}</ErrorText>}
            <Switcher>
                Already have an account? <Link to="/login">Log in &rarr;</Link>
            </Switcher>
        </Wrapper>
    );
}

export default CreateAccount;

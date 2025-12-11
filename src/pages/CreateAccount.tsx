import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

const Title = styled.h1`
    font-size: 42px;
`;

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

type FormValues = {
    name: string;
    email: string;
    password: string;
};

function CreateAccount() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        try {
            // 회원 가입 처리를 할 코드 작성
        } catch (error) {
            console.log(error);
            setError("root", { message: "계정 생성에 실패하였습니다." });
        } finally {
        }
    };
    return (
        <Wrapper>
            <Title>Log into 𝕏</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("name", { required: "이름을 입력해주세요." })}
                    placeholder="Name"
                    type="text"
                    required
                />
                {errors.name && <Error>{errors.name.message}</Error>}
                <Input
                    {...register("email", { required: "이메일을 입력해주세요." })}
                    placeholder="Email"
                    type="email"
                    required
                />
                {errors.email && <Error>{errors.email.message}</Error>}
                <Input
                    {...register("password", { required: "비밀번호를 입력해주세요." })}
                    placeholder="Password"
                    type="password"
                    required
                />
                {errors.password && <Error>{errors.password.message}</Error>}
                <Input type="submit" value={isSubmitting ? "Loading..." : "Create Account"} />
            </Form>
            {errors.root && <Error>{errors.root.message}</Error>}
        </Wrapper>
    );
}

export default CreateAccount;

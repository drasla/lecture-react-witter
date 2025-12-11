import styled from "styled-components";
import { useForm } from "react-hook-form";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    font-family:
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        "Open Sans",
        "Helvetica Neue",
        sans-serif;
    &::placeholder {
        font-size: 16px;
    }
    &:focus {
        outline: none;
        border-color: #1d9bf0;
    }
`;

const AttachFileButton = styled.label`
    padding: 10px 0;
    color: #1d9bf0;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #1d9bf0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;

const AttachFileInput = styled.input`
    display: none;
`;

const SubmitBtn = styled.input`
    background-color: #1d9bf0;
    color: white;
    border: none;
    padding: 10px 0;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.9;
    }
`;

type TweetFormValues = {
    tweet: string;
    file: FileList;
};

function PostTweetForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm<TweetFormValues>();

    const fileList = watch("file");
    const file = fileList && fileList.length === 1 ? fileList[0] : null;

    const onSubmit = async (data: TweetFormValues) => {
        // tweet 내용
        const tweet = data.tweet;

        // 파일
        const image = data.file?.[0] ?? null;

        // 여기서 Firebase storage upload 또는 DB write 등 수행
        console.log("Tweet:", tweet);
        console.log("File:", image);

        await new Promise(r => setTimeout(r, 1000));
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <TextArea
                rows={5}
                maxLength={180}
                placeholder="What is happening?!"
                {...register("tweet", { required: true })}
            />
            <AttachFileButton htmlFor="file">
                {file ? "Photo added ✅" : "Add photo"}
            </AttachFileButton>
            <AttachFileInput id="file" type="file" accept="image/*" {...register("file")} />
            <SubmitBtn type="submit" value={isSubmitting ? "Posting..." : "Post Tweet"} />
        </Form>
    );
}

export default PostTweetForm;

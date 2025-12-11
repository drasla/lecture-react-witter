import styled from "styled-components";
import { useForm } from "react-hook-form";
import { auth, db, storage } from "../firebase.ts";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    file: FileList | null;
};

function PostTweetForm() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { isSubmitting },
    } = useForm<TweetFormValues>();

    const fileList = watch("file");
    const file = fileList && fileList.length === 1 ? fileList[0] : null;

    const onSubmit = async (data: TweetFormValues) => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            const tweet = data.tweet;
            const image = data.file?.[0] ?? null;

            const doc = await addDoc(collection(db, "tweets"), {
                tweet,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid,
            });

            if (image) {
                const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
                const result = await uploadBytes(locationRef, image);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url,
                });
            }
            setValue("tweet", "");
            setValue("file", null);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <TextArea
                rows={5}
                maxLength={180}
                placeholder="What is happening?!"
                required
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

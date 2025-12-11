import styled from "styled-components";
import PostTweetForm from "../components/PostTweetForm.tsx";
import Timeline from "../components/Timeline.tsx";

const Wrapper = styled.div`
    display: grid;
    gap: 50px;
    overflow-y: scroll;
    grid-template-rows: 1fr 5fr;
`;
function Home() {
    return (
        <Wrapper>
            <PostTweetForm />
            <Timeline />
        </Wrapper>
    );
}

export default Home;

import styled from "styled-components";
import { useEffect, useState } from "react";
import Tweet from "./Tweet.tsx";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {db} from "../firebase.ts";

export type TweetType = {
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

function Timeline() {
    const [tweets, setTweet] = useState<TweetType[]>([]);
    const fetchTweets = async () => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAt", "desc")
        );
        const spanshot = await getDocs(tweetsQuery);
        const tweets = spanshot.docs.map((doc) => {
            const { tweet, createdAt, userId, username, photo } = doc.data();
            return {
                tweet,
                createdAt,
                userId,
                username,
                photo,
                id: doc.id,
            };
        });
        setTweet(tweets);
    };
    useEffect(() => {
        fetchTweets();
    }, []);

    return (
        <Wrapper>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} {...tweet} />
            ))}
        </Wrapper>
    );
}

export default Timeline;

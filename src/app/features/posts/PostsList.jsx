import { useSelector, useDispatch } from "react-redux";
import {
    getPosts,
    getPostsError,
    getPostsStatus,
    fetchPosts,
} from "./postSlice";
import { useEffect } from "react";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

const PostsList = () => {
    const posts = useSelector(getPosts);
    const postsStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostsError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (postsStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch]);

    if (postsStatus === "loading") {
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    if (postsStatus === "failed") {
        return <div className="text-red-500">{postsError}</div>;
    }

    const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post) => (
        <article
            key={post.id}
            className="border border-gray-300/30 w-[400px] min-h-[100px] p-2 bg-black/75 rounded-2xl gap-4 flex flex-col hover:scale-[1.02] transition-transform cursor-pointer"
        >
            <h3 className="text-lg text-white/80">{post.title}</h3>
            <p className="text-sm text-white/60 mb-2">{post.body}</p>
            <ReactionButton post={post} />
            <div className="flex justify-between relative bottom-0">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </div>
        </article>
    ));
    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-3xl text-shadow-white">Posts</h2>
            {renderedPosts}
        </section>
    );
};

export default PostsList;

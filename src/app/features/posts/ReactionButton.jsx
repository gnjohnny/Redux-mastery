import { useDispatch } from "react-redux";
import { postReactionAdded } from "./postSlice";

const reactionEmoji = {
    thumbsup: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
};

const ReactionButton = ({ post }) => {
    const dispatch = useDispatch();

    const handleReaction = (reaction) => {
        dispatch(postReactionAdded(post.id, reaction));
    };

    return (
        <div className="w-full flex gap-2 justify-between my-4">
            {Object.entries(reactionEmoji).map(([key, emoji]) => (
                <button key={key} onClick={() => handleReaction(key)}>
                    {emoji} {post.reactions[key]}
                </button>
            ))}
        </div>
    );
};

export default ReactionButton;

import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers);
    const author = users.find((user) => user.id === Number(userId));
    return (
        <span className="font-light italic text-sm text-white/50 absolute bottom-1 right-2">
            by: {author ? author.name : "Unknown author"}
        </span>
    );
};

export default PostAuthor;

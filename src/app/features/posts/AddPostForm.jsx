import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");

    // Get all users for the author dropdown

    const users = useSelector(selectAllUsers);

    const onTitleChange = (e) => setTitle(e.target.value);
    const onBodyChange = (e) => setBody(e.target.value);
    const onAuthorChange = (e) => setUserId(e.target.value);

    const canSave =
        [title, body, userId].every(Boolean) && addRequestStatus === "idle";

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                await dispatch(createPost({ title, body, userId })).unwrap();
                setTitle("");
                setBody("");
                setUserId("");
            } catch (error) {
                console.error("Failed to save the post: ", error);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    };

    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section className="flex flex-col justify-center items-center gap-2 w-[400px] p-2">
            <h1 className="text-lg font-bold text-gray-300 self-start">
                Add new Post
            </h1>
            <form className="space-y-4 w-full">
                <label className="floating-label">
                    <span>Title</span>
                    <input
                        type="text"
                        placeholder="Your title..."
                        value={title}
                        onChange={onTitleChange}
                        className="input input-md w-full"
                    />
                </label>

                <label className="select">
                    <span className="label">Author</span>
                    <select value={userId} onChange={onAuthorChange}>
                        <option value="">Select an author</option>
                        {userOptions}
                    </select>
                </label>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Content</legend>
                    <textarea
                        className="textarea h-24 w-full"
                        placeholder="content..."
                        value={body}
                        onChange={onBodyChange}
                    ></textarea>
                </fieldset>

                <button
                    type="button"
                    className="btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;

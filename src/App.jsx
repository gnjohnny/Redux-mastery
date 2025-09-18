import React from "react";
import PostsList from "./app/features/posts/PostsList";
import AddPostForm from "./app/features/posts/AddPostForm";

const App = () => {
    return (
        <main className="w-full min-h-screen bg-black/90 flex flex-col justify-center items-center text-white py-7">
            <AddPostForm />
            <PostsList />
        </main>
    );
};

export default App;

import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const reactions = {
    thumbsup: 0,
    wow: 0,
    heart: 0,
    rocket: 0,
    coffee: 0,
};

const initialState = {
    posts: [],
    status: "idle",
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
});

export const createPost = createAsyncThunk(
    "posts/createPost",
    async (initialPost) => {
        const response = await axios.post(POSTS_URL, initialPost);
        return response.data;
    },
);

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.posts.push(action.payload);
            },
            prepare: (title, body, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
                        date: new Date().toISOString(),
                        userId: userId ? userId : null,
                        reactions: { ...reactions },
                    },
                };
            },
        },
        postReactionAdded: {
            reducer: (state, action) => {
                const { postId, reaction } = action.payload;
                const post = state.posts.find((post) => post.id === postId);
                if (post) {
                    post.reactions[reaction] += 1;
                }
            },
            prepare: (postId, reaction) => {
                return {
                    payload: {
                        postId,
                        reaction,
                    },
                };
            },
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), {
                        minutes: min++,
                    }).toISOString();
                    post.reactions = { ...reactions };
                    return post;
                });
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = { ...reactions };
                console.log(action.payload);
                state.posts.push(action.payload);
            });
    },
});

export const { postAdded, postReactionAdded } = postSlice.actions;
export default postSlice.reducer;

export const getPosts = (state) => state.posts.posts;
export const getPostsError = (state) => state.posts.error;
export const getPostsStatus = (state) => state.posts.status;

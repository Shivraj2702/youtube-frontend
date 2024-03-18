import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axoisIstance";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    tweets: [],
};

export const createTweet = createAsyncThunk("createTweet", async (content) => {
    try {
        const response = await axiosInstance.post("/tweets", content);
        toast.success(response.data?.message);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const editTweet = createAsyncThunk(
    "editTweet",
    async ({ tweetId, content }) => {
        try {
            const response = await axiosInstance.patch(
                `/tweets/${tweetId}`,
                {content}
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const deleteTweet = createAsyncThunk("deleteTweet", async (tweetId) => {
    try {
        const response = await axiosInstance.delete(`/tweets/${tweetId}`);
        toast.success(response.data.message);
        return response.data.data.tweetId;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const getUserTweets = createAsyncThunk( "getUserTweets", async (userId) => {
        try {
            const response = await axiosInstance.get(`/tweets/user/${userId}`);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase( getUserTweets.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(getUserTweets.fulfilled, (state, action) => {
            state.loading = false;
            state.tweets = action.payload;
        });
        builder.addCase(createTweet.fulfilled, (state, action) => {
            state.tweets.unshift(action.payload);
        })
        builder.addCase(deleteTweet.fulfilled, (state, action) => {
            state.tweets = state.tweets.filter((tweet) => tweet._id !== action.payload);
        })
    },
});

export const {addTweet} = tweetSlice.actions;

export default tweetSlice.reducer;

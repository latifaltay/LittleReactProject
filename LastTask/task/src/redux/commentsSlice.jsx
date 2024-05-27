import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostDetail } from '../api/api';

export const getComments = createAsyncThunk('comments/getComments', async (postId) => {
    const response = await getPostDetail(postId);
    return response.data;
});

export const addComment = createAsyncThunk('comments/addComment', async (comment) => {
    return comment;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId) => {
    return commentId;
});

export const updateComment = createAsyncThunk('comments/updateComment', async ({ id, body }) => {
    return { id, body };
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter((comment) => comment.id !== action.payload);
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const { id, body } = action.payload;
                const existingComment = state.comments.find((comment) => comment.id === id);
                if (existingComment) {
                    existingComment.body = body;
                }
            });
    },
});

export default commentsSlice.reducer;

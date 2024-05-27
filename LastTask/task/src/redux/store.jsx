import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postsReducer from './postsSlice';
import commentsReducer from './commentsSlice';
import viewModeReducer from './viewModeSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        comments: commentsReducer,
        viewMode: viewModeReducer,
    },
});

export default store;

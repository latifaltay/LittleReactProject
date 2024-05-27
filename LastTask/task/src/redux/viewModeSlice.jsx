import { createSlice } from '@reduxjs/toolkit';

const initialState = 'list';

const viewModeSlice = createSlice({
    name: 'viewMode',
    initialState,
    reducers: {
        setViewMode: (state, action) => {
            return action.payload || initialState;
        }
    }
});

export const { setViewMode } = viewModeSlice.actions;

export default viewModeSlice.reducer;

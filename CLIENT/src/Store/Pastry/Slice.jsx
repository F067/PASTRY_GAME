import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    pastry: [],
};

const pastrySlice = createSlice({
    name:'pastry',
    initialState,
    reducers: {
        setPastry(state, action) {
            state.pastry = action.payload;
        }
    },
});

export const {setPastry} = pastrySlice.actions;
export default pastrySlice.reducer;
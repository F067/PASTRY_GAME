import { configureStore } from '@reduxjs/toolkit';
import pastryReducer from './Pastry/Slice';
import userReducer from './User/Slice'

export const store = configureStore({
    reducer: {
        pastry: pastryReducer,
        user: userReducer
    }
})

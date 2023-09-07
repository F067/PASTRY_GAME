import {configureStore} from '@reduxjs/toolkit';
import pastryReducer from './Pastry/Slice';

export const store = configureStore({
    reducer: {
        pastry: pastryReducer
    }
})

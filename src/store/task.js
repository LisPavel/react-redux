import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, title: "task 1", completed: false },
    { id: 2, title: "task 2", completed: false },
];

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        update(state, action) {
            const index = state.findIndex((t) => t.id === action.payload.id);
            state[index] = { ...state[index], ...action.payload };
        },

        remove(state, action) {
            return state.filter((t) => t.id !== action.payload.id);
        },
    },
});

const {
    actions: { update, remove },
    reducer,
} = taskSlice;

export const taskCompleted = (id) => {
    return update({ id, completed: true });
};

export const titleChanged = (id) => {
    return update({ id, title: `new task ${id}` });
};

export const taskDeleted = (id) => {
    return remove({ id });
};

export default reducer;

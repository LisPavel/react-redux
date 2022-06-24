import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, title: "task 1", completed: false },
    { id: 2, title: "task 2", completed: false },
];

const update = createAction("task/updated");
const remove = createAction("task/removed");

export const taskCompleted = (id) => {
    return update({ id, completed: true });
};

export const titleChanged = (id) => {
    return update({ id, title: `new task ${id}` });
};

export const taskDeleted = (id) => {
    return remove({ id });
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(update, (state, action) => {
            const index = state.findIndex((t) => t.id === action.payload.id);
            state[index] = { ...state[index], ...action.payload };
        })
        .addCase(remove, (state, action) => {
            return state.filter((t) => t.id !== action.payload.id);
        });
});

export default reducer;

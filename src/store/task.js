import { createSlice, createAction } from "@reduxjs/toolkit";
import todoService from "../services/todoService";

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

        received(state, action) {
            return action.payload;
        },
    },
});

const {
    actions: { update, remove, received },
    reducer,
} = taskSlice;

const taskRequested = createAction("task/requested");
const taskRequestFailed = createAction("task/requestFiled");

export const completeTask = (id) => (dispatch) => {
    dispatch(update({ id, completed: true }));
};

export const getTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todoService.fetch();
        dispatch(received(data));
    } catch (error) {
        dispatch(taskRequestFailed(error.message ?? error.error));
        // console.error(error);
    }
};

export const titleChanged = (id) => {
    return update({ id, title: `new task ${id}` });
};

export const taskDeleted = (id) => {
    return remove({ id });
};

export default reducer;

import { createSlice } from "@reduxjs/toolkit";
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

        set(state, action) {
            return action.payload;
        },
    },
});

const {
    actions: { update, remove, set },
    reducer,
} = taskSlice;

export const completeTask = (id) => (dispatch) => {
    dispatch(update({ id, completed: true }));
};

export const getTasks = () => async (dispatch) => {
    try {
        const data = await todoService.fetch();
        dispatch(set(data));
    } catch (error) {
        console.error(error);
    }
};

export const titleChanged = (id) => {
    return update({ id, title: `new task ${id}` });
};

export const taskDeleted = (id) => {
    return remove({ id });
};

export default reducer;

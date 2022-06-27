import { createSlice, createAction } from "@reduxjs/toolkit";
import todoService from "../services/todoService";

const initialState = { entities: [], isLoading: true, error: null };

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        update(state, action) {
            const index = state.entities.findIndex(
                (t) => t.id === action.payload.id,
            );
            state.entities[index] = {
                ...state.entities[index],
                ...action.payload,
            };
        },

        remove(state, action) {
            state.entities = state.entities.filter(
                (t) => t.id !== action.payload.id,
            );
        },

        received(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },

        requested(state) {
            state.isLoading = true;
        },

        requestFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const {
    actions: { update, remove, received, requestFailed, requested },
    reducer,
} = taskSlice;

// const taskRequested = createAction("task/requested");
// const taskRequestFailed = createAction("task/requestFiled");

export const completeTask = (id) => (dispatch) => {
    dispatch(update({ id, completed: true }));
};

export const getTasks = () => async (dispatch) => {
    dispatch(requested());
    try {
        const data = await todoService.fetch();
        dispatch(received(data));
    } catch (error) {
        dispatch(requestFailed(error.message ?? error.error));
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

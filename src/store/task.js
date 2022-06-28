import { createSlice } from "@reduxjs/toolkit";
import todoService from "../services/todoService";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true, inProgress: false };

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

        create(state, action) {
            state.entities.push(action.payload);
            state.inProgress = false;
        },

        received(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },

        requested(state) {
            state.isLoading = true;
        },

        requestFailed(state) {
            state.isLoading = false;
            state.inProgress = false;
        },

        pending(state) {
            state.inProgress = true;
        },
    },
});

const {
    actions: {
        update,
        remove,
        received,
        requestFailed,
        requested,
        create,
        pending,
    },
    reducer,
} = taskSlice;

// const taskRequested = createAction("task/requested");
// const taskRequestFailed = createAction("task/requestFiled");

export const completeTask = (id) => (dispatch) => {
    dispatch(update({ id, completed: true }));
};

export const loadTasks = () => async (dispatch) => {
    dispatch(requested());
    try {
        const data = await todoService.fetch();
        dispatch(received(data));
    } catch (error) {
        dispatch(requestFailed());
        dispatch(setError(error.message ?? error.error));
        // console.error(error);
    }
};

export const titleChanged = (id) => {
    return update({ id, title: `new task ${id}` });
};

export const taskDeleted = (id) => {
    return remove({ id });
};

export const taskCreated = () => async (dispatch) => {
    dispatch(pending());
    try {
        const data = await todoService.create({
            userId: 1,
            title: "delectus aut autem " + Date.now(),
            completed: false,
        });
        dispatch(create(data));
    } catch (error) {
        dispatch(requestFailed());
        dispatch(setError(error.message ?? error.error));
    }
};

export const getTasks = () => (state) => {
    return state.tasks.entities;
};
export const getTasksLoadingStatus = () => (state) => {
    return state.tasks.isLoading;
};
export const getTasksProgressStatus = () => (state) => {
    return state.tasks.inProgress;
};

export default reducer;

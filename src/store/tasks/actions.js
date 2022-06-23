import * as actionTypes from "./actionTypes";

export const taskCompleted = (id) => {
    return {
        type: actionTypes.taskUpdated,
        payload: { id, completed: true },
    };
};

export const titleChanged = (id) => {
    return {
        type: actionTypes.taskUpdated,
        payload: { id, title: `new task ${id}` },
    };
};

export const taskDeleted = (id) => {
    return { type: actionTypes.taskDeleted, payload: { id } };
};

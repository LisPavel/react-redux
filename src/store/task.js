const TASK_UPDATED = "task/updated";
const TASK_DELETED = "task/deleted";

export const taskCompleted = (id) => {
    return {
        type: TASK_UPDATED,
        payload: { id, completed: true },
    };
};

export const titleChanged = (id) => {
    return {
        type: TASK_UPDATED,
        payload: { id, title: `new task ${id}` },
    };
};

export const taskDeleted = (id) => {
    return { type: TASK_DELETED, payload: { id } };
};

function reducer(state, action) {
    switch (action.type) {
        case TASK_UPDATED: {
            const newArr = [...state];
            const index = newArr.findIndex(
                (task) => task.id === action.payload.id,
            );
            newArr[index] = { ...newArr[index], ...action.payload };
            return newArr;
        }
        case TASK_DELETED: {
            const newArr = state.filter((t) => t.id !== action.payload.id);
            return newArr;
        }

        default:
            return state;
    }
}

export default reducer;

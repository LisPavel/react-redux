import { taskUpdated } from "./actionTypes";

export function taskReducer(state, action) {
    switch (action.type) {
        case taskUpdated: {
            const newArr = [...state];
            const index = newArr.findIndex(
                (task) => task.id === action.payload.id,
            );
            newArr[index] = { ...newArr[index], ...action.payload };
            return newArr;
        }

        default:
            return state;
    }
}

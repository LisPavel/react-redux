import { createStore } from "redux";
import { taskReducer } from "./tasks/reducer";

const initialState = [
    { id: 1, title: "task 1", completed: false },
    { id: 2, title: "task 2", completed: false },
];

function configureStore() {
    return createStore(taskReducer, initialState);
}

export default configureStore;

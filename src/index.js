import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createStore } from "./store/createStore";
import { taskReducer } from "./store/taskReducer";
import * as actions from "./store/actionTypes";

const initialState = [
    { id: 1, title: "task 1", completed: false },
    { id: 2, title: "task 2", completed: false },
];
// import { compose, pipe } from "lodash/fp";

const store = createStore(taskReducer, initialState);

const App = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        return store.subscribe(() => setState(store.getState()));
    }, []);

    const completeTask = (taskId) => {
        store.dispatch({
            type: actions.taskUpdated,
            payload: { id: taskId, completed: true },
        });
    };

    const changeTitle = (taskId) => {
        store.dispatch({
            type: actions.taskUpdated,
            payload: { id: taskId, title: `new task ${taskId}` },
        });
    };
    return (
        <>
            <h1>REDUX</h1>
            {state.map((t) => (
                <li key={t.id}>
                    <p>{t.title}</p>
                    <input checked={t.completed} type="checkbox" />
                    <button onClick={() => completeTask(t.id)}>complete</button>
                    <button onClick={() => changeTitle(t.id)}>change</button>
                    <hr />
                </li>
            ))}
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

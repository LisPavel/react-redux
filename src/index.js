import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import { taskCompleted, taskDeleted, titleChanged } from "./store/task";

// import { compose, pipe } from "lodash/fp";

const store = configureStore();

const App = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        return store.subscribe(() => setState(store.getState()));
    }, []);

    const completeTask = (taskId) => {
        store.dispatch(taskCompleted(taskId));
    };

    const changeTitle = (taskId) => {
        store.dispatch(titleChanged(taskId));
    };

    const deleteTask = (taskId) => {
        store.dispatch(taskDeleted(taskId));
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
                    <button onClick={() => deleteTask(t.id)}>delete</button>
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

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as actions from "./store/actions";
import { initializeState } from "./store/store";

// import { compose, pipe } from "lodash/fp";

const store = initializeState();

const App = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        return store.subscribe(() => setState(store.getState()));
    }, []);

    const completeTask = (taskId) => {
        store.dispatch(actions.taskCompleted(taskId));
    };

    const changeTitle = (taskId) => {
        store.dispatch(actions.titleChanged(taskId));
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

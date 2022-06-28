import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getErrors } from "./store/errors";
import createStore from "./store/store";
import {
    completeTask,
    getTasksLoadingStatus,
    getTasks,
    loadTasks,
    taskDeleted,
    titleChanged,
    taskCreated,
    getTasksProgressStatus,
} from "./store/task";

const store = createStore();

const App = () => {
    const state = useSelector(getTasks());
    const errors = useSelector(getErrors());
    const isLoading = useSelector(getTasksLoadingStatus());
    const inProgress = useSelector(getTasksProgressStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTasks());
    }, [dispatch]);

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    };

    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (errors.length > 0) {
        return <h3>{errors.join(", ")}</h3>;
    }

    return (
        <>
            <h1>REDUX</h1>
            <button onClick={() => dispatch(taskCreated())}>
                {!inProgress ? "create task" : "creating"}
            </button>
            <ul>
                {state.map((t) => (
                    <li key={t.id}>
                        <p>{t.title}</p>
                        <input checked={t.completed} type="checkbox" />
                        <button onClick={() => dispatch(completeTask(t.id))}>
                            complete
                        </button>
                        <button onClick={() => changeTitle(t.id)}>
                            change
                        </button>
                        <button onClick={() => deleteTask(t.id)}>delete</button>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

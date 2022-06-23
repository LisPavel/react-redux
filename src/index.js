import React from 'react';
import ReactDOM from "react-dom";
// import { compose, pipe } from "lodash/fp";

function taskReducer(state, action) {
    switch (action.type) {
        case "task/completed":
            const newArr = [...state];
            const index = newArr.findIndex(
                (task) => task.id === action.payload.id,
            );
            newArr[index].completed = true;
            return newArr;

        default:
            return state;
    }
}

const createStore = (reducer, initialState) => {
    let state = initialState;
    const getState = () => {
        return state;
    };
    const dispatch = (action) => {
        console.log(action);
        state = reducer(state, action);
    };
    return { getState, dispatch };
};

const App = () => {
    const store = createStore(taskReducer, [
        { id: 1, description: "task 1", completed: false },
        { id: 2, description: "task 2", completed: false },
    ]);
    console.log(store.getState());

    const state = store.getState();

    const completeTask = (taskId) => {
        store.dispatch({
            type: "task/completed",
            payload: { id: taskId },
        });
        console.log(store.getState());
    };
    // const x = 2;
    // const double = (n) => n * 2;
    // const square = (n) => n * n;
    // const half = (n) => n / 2;
    // const divide = (n2) => (n1) => n1 / n2;
    // const mathCalculate = pipe(double, square, half, divide(3));
    return (
        <>
            <h1>REDUX</h1>
            {state.map((t) => (
                <li key={t.id}>
                    <p>{t.description}</p>
                    <input checked={t.completed} type="checkbox" />
                    <button onClick={() => completeTask(t.id)}>complete</button>
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

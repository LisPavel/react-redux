import React from 'react';
import ReactDOM from "react-dom";
import { compose, pipe } from "lodash/fp";

const App = () => {
    const x = 2;
    const double = (n) => n * 2;
    const square = (n) => n * n;
    const half = (n) => n / 2;
    const mathCalculate = pipe(double, square, half);
    return <h1>REDUX {mathCalculate(x)}</h1>;
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

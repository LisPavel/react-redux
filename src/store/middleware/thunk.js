export function thunk({ getState, dispatch }) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            if (typeof action === "function") {
                console.log("function");
                action(dispatch, getState);
                return;
            }
            return next(action);
        };
    };
}

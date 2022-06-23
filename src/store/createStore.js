export const createStore = (reducer, initialState) => {
    let state = initialState;
    let listeners = [];
    const getState = () => {
        return state;
    };
    const dispatch = (action) => {
        console.log(action);
        state = reducer(state, action);
        for (const listener of listeners) {
            listener();
        }
    };
    const subscribe = (listener) => {
        const idx = listeners.length;
        listeners.push(listener);
        return () => delete listeners[idx];
    };
    return { getState, dispatch, subscribe };
};

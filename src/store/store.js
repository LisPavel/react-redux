import { configureStore } from "@reduxjs/toolkit";
import { logger } from "./middleware/logger";
import taskReducer from "./task";

// const middlewareEnhancer = applyMiddleware(logger, thunk);

function createStore() {
    return configureStore({
        reducer: taskReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production",
    });
}

export default createStore;

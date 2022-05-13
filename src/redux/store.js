import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware, compose, createStore, combineReducers} from "redux";
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducers";

// const rootReducer = combineReducers({
//   blockchain: blockchainReducer,
// });

// const middleware = [thunk];
// const composeEnhancers = compose(applyMiddleware(...middleware));

// const configureStore = () => {
//   return createStore(rootReducer, composeEnhancers);
// }

// const store = configureStore();
const store = configureStore({
  reducer: { blockchain: blockchainReducer },
  middleware: [thunk],
});

export default store;

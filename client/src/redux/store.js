import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from './reducers';
//import thunkMiddleware from "redux-thunk";

//const composeEnhancer = window._REDUX_DEVTOOLS_EXTEMSION_COMPOSE_ || compose;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
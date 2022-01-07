import {
	applyMiddleware,
	combineReducers,
	compose,
	createStore,
	StoreEnhancer,
} from 'redux';
import thunk from 'redux-thunk';
import { userSessionReducer } from './userSession';
import { RESET_STORE_ACTION } from './userSession/actionTypes';


const appReducer = combineReducers({
	userSession: userSessionReducer,

});

const rootReducer = (state: any, action: any) => {
	if (action.type === RESET_STORE_ACTION) state = undefined;

	return appReducer(state, action);
};

const storeEnhancers: StoreEnhancer = compose(
	applyMiddleware(thunk),
);

const store = createStore(rootReducer, storeEnhancers);

export default store;

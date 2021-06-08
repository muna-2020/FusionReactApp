
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '@shared/Framework/DataService/ArcadixCacheData/Redux/Reducer/Reducer';
//const store = createStore(reducer, composeWithDevTools(applyMiddleware( logger)));
const store = createStore(reducer, composeWithDevTools());
//composeWithDevTools()
export default store;




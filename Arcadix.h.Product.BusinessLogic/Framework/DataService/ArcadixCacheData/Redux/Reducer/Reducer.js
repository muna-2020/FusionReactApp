import { combineReducers } from 'redux';
import EntityReducer from '@shared/Framework/DataService/ArcadixCacheData/Redux/Reducer/EntityReducer';
import ApplicationStateReducer from '@shared/Framework/DataService/ArcadixCacheData/Redux/Reducer/ApplicationStateReducer';
import PerformanceLogReducer from '@shared/Framework/DataService/ArcadixCacheData/Redux/Reducer/PerformanceLogReducer';
import EditorStateReducer from '@shared/Framework/DataService/ArcadixCacheData/Redux/Reducer/EditorStateReducer';
export default combineReducers({
    Entity: EntityReducer,
    ApplicationState: ApplicationStateReducer,
    PerformanceLog: PerformanceLogReducer,
    EditorState: EditorStateReducer
});


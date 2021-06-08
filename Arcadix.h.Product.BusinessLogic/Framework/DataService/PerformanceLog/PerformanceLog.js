import store from '@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store';
import { AddPerformanceLogProperty } from '@shared/Framework/DataService/ArcadixCacheData/Redux/Actions/PerformanceLogActionCreators';

export default class PerformanceLog {

    static GetProperty(Key) {
        var currentState = store.getState();
        return currentState.PerformanceLog[Key];
    }
    static SetProperty(Key, data) {
        store.dispatch(AddPerformanceLogProperty(Key, data));
    }
}
import store from '@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store';
import { AddAppStateProperty, InitializeApplicationState, RemoveAppStateProperty } from '@shared/Framework/DataService/ArcadixCacheData/Redux/Actions/ApplicationStateActionCreators';

let ServerStore;

export default class ApplicationState {
 
     static SetStore(NewStore){
          ServerStore=NewStore;
     }

    static GetProperty(Key, callback) {
        var currentState =ServerStore?ServerStore.getState(): store.getState();
        return currentState.ApplicationState[Key];
    }
    static SetProperty(Key, data, callback) {
      ServerStore? ServerStore.dispatch(AddAppStateProperty(Key, data, callback)):store.dispatch(AddAppStateProperty(Key, data, callback));
    }

    static InitializeApplicationState(data) {
       ServerStore?ServerStore.dispatch(InitializeApplicationState(data)): store.dispatch(InitializeApplicationState(data));
    }
    static GetApplicationStateData() {
        return store.getState()["ApplicationState"];
    }
    static RemoveProperty(Key, callback){
         ServerStore?ServerStore.dispatch(RemoveAppStateProperty(Key,callback)):store.dispatch(RemoveAppStateProperty(Key,callback));
    }

    static GetReference(Key, callback) {
        var currentState = ServerStore?ServerStore.getState(): store.getState();
        return currentState.ApplicationState[Key];
    }
    static SetReference(Key, data, callback) {
        ServerStore? ServerStore.dispatch(AddAppStateProperty(Key, data, callback)):store.dispatch(AddAppStateProperty(Key, data, callback));
    }
}
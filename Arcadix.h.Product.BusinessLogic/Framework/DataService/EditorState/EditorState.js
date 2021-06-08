import store from '@shared/Framework/DataService/ArcadixCacheData/Redux/Store/Store';

let ServerStore;
class EditorState {

    static SetStore(NewStore) {
        ServerStore = NewStore;
    }

 
    static SetReference(strEntity, objValue) {
        let objStore = ServerStore ? ServerStore : store;
        objStore.dispatch({
            type: "set_property",
            payload: {
                Entity: strEntity,
                Value: objValue
            }
        });
    }
    static SetProperty(strEntity, objValue) {
        let objStore = ServerStore ? ServerStore : store;
        objStore.dispatch({
            type: "set_property",
            payload: {
                Entity: strEntity,
                Value: objValue
            }
        });
    }
    static RemoveReference(strEntity) {
        let objStore = ServerStore ? ServerStore : store;
        objStore.dispatch({
            type: "remove_property",
            payload: {
                Entity: strEntity
            }
        });
    }
    static RemoveProperty(strEntity) {
        let objStore = ServerStore ? ServerStore : store;
        objStore.dispatch({
            type: "remove_property",
            payload: {
                Entity: strEntity
            }
        });
    }
    static GetReference(strEntity) {
        let objCurrentState = ServerStore ? ServerStore.getState() : store.getState();
        return objCurrentState.EditorState[strEntity];
    }
    static GetProperty(strEntity) {
        let objCurrentState = ServerStore ? ServerStore.getState():store.getState();
        return objCurrentState.EditorState[strEntity];
    }

}

export default EditorState;

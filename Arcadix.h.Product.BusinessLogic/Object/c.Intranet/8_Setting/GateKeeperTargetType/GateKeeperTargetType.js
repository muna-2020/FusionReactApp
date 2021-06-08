import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

var Object_Intranet_Setting_GateKeeperTargetType = {
    URL: "API/Object/Intranet/Setting/GateKeeperTargetType",
    InitialDataCallParam: null,
    Initialize: function (objParam) {
        Object_Intranet_Setting_GateKeeperTargetType.InitialDataCallParam = objParam;
        ArcadixCacheData.AddEntityObject("Object_Intranet_Setting_GateKeeperTargetType", Object_Intranet_Setting_GateKeeperTargetType);
    },

    GetInitialDataCall: function () {
        return {
            "URL": Object_Intranet_Setting_GateKeeperTargetType.URL,
            "Params": Object_Intranet_Setting_GateKeeperTargetType.InitialDataCallParam,
            "MethodType": "Get",
            "UseFullName": true
        };
    },

    GetData: (objParams, fnCallback) => {
        (new ArcadixFetchAndCacheData()).ExecuteSingle(Object_Intranet_Setting_GateKeeperTargetType.URL, objParams, "Get", fnCallback);
    }
};

export default Object_Intranet_Setting_GateKeeperTargetType;

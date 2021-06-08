import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            textresource: state.Entity["textresource"]
        };
    }
    else {
        return {};
    }
}

export function InitialDataParams(JConfiguration, props) {
    var objParamsProfileData = {
        "ForeignKeyFilter": {},
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "uSchoolId": props.ClientUserDetails.UserId
                    }
                }]
        },
        "SortKeys": {},
        "OutputColumns": {}
    };
    var objResourceParams = {
        "ForeignKeyFilter": {},
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Contact"
                    }
                }
            ]
        }
    };
    var arrDataRequest = [
        {
            "URL": "API/Object/Extranet/School",
            "Params": objParamsProfileData,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Blocks/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        }
    ];
    return {
        "DataCalls": arrDataRequest, "ResourceCalls": [{
            "URL": "API/Object/Blocks/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        }]
    };
}

export function Datacall(arrParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    return new Promise(function (resolve, reject) {
        objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
            resolve({ success: true });
        });
    });
}

export function UseDataLoader(props) {
    const GetRequiredData = () => {
        Datacall(InitialDataParams(props.JConfiguration, props).DataCalls)
            .then(json => {
                if (json.success) {
                    return true;
                }
            });
    };
    useLayoutEffect(GetRequiredData, []);
}
export function UseResourceLoader(props) {
    const GetResourceData = (props) => {
        Datacall(InitialDataParams(props.JConfiguration, props).ResourceCalls)
            .then(json => {
                if (json.success) {
                    return true;
                }
            });
    }
    useLayoutEffect(GetResourceData(props), []);
}
export function SaveData(props, data, fnCallback) {
    let blnIsDataSavedAndReceived = false;
    let objParams = {
        "ForeignKeyFilter": {},
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "uSchoolId": "AB9B70E9-A89D-4B87-991D-018178934614"
                    }
                }]
        },
        "vEditData": data,
        "uUserId": "AB9B70E9-A89D-4B87-991D-018178934614"
    };


    let arrDataRequest = [
        {
            "URL": "API/Object/Extranet/School",
            "Params": objParams,
            "MethodType": "Put"
        }];


    Datacall(arrDataRequest)
        .then(json => {
            if (json.success) {
                blnIsDataSavedAndReceived = true;
                fnCallback(blnIsDataSavedAndReceived);
            }
        });
    return blnIsDataSavedAndReceived;
}

export function HandleChange(e){
    switch (e.currentTarget.id) {
        case "ToEmail":
            SetToEmail(e.currentTarget.value);
            break;
        case "Emailtext":
            SetEmailText(e.currentTarget.value);
            break;
    }
}

export function OnClickEmailSend(){
    alert('send????');
}





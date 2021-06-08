
/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state)
{
    if (!global["mode"]) {
        Logger.Log("Mapping");
        return {
            frameworknavigation: DataRef(state.Entity, "frameworknavigation", true)
        };
    }
    else {
        Logger.Log("not mapping");
        return {};
    }
};

/**
 * 
 * @param {*} arrParams 
 * @param {*} strToggleExecute 
 * @summary   Call 'Execute' method to make the api call.
 */
export function DataCall(objContext, arrParams, strToggleExecute = 'FetchAndCacheExecute'){
    switch(strToggleExecute)
    {
        case 'FetchAndCacheExecute':
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                let strUserPreferenceFilterKey = "userpreference;uuserid;" + objContext.props.ClientUserDetails.UserId;
                let arrUserPreference = objReturn[strUserPreferenceFilterKey.toLowerCase()];
                let objUserPreference = {};
                if(arrUserPreference.length > 0)
                {
                    objUserPreference = arrUserPreference[0];
                    let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(objTempUserPreferenceValue => objTempUserPreferenceValue["vKey"] === "ShowManualLearningTestIntroPopup");
                    if(arrUserPreferenceValue.length > 0)
                    {
                      ApplicationState.SetProperty("UserPreferenceObject", objUserPreference);
                      objContext.props.ChangeTab();
                    }
                }
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        break;
    }
};

export function SaveData(objContext)
{
    if(objContext.state.blnIsChecked)
    {
        let objUserPreferenceDetails = ApplicationState.GetProperty("UserPreferenceObject");
        let objEditData = {...objUserPreferenceDetails, ["t_Framework_UserPreference_PreferenceValue"]: [...objUserPreferenceDetails["t_Framework_UserPreference_PreferenceValue"], { "vKey": "ShowManualLearningTestIntroPopup", "vValue": "N" }]};
        let objEditDataParams = {
            "ForeignKeyFilter":{
                "uUserId": objContext.props.ClientUserDetails.UserId
            },
            "vEditData": objEditData
        }
        let arrParams = [
            {
                "URL": "API/Object/Framework/UserPreference/UserPreference",
                "Params": objEditDataParams,
                "MethodType": "PUT",
            }
        ];
        ApplicationState.SetProperty("blnShowAnimation", true);
        DataCall(objContext, arrParams);
    }
    else
    {
        objContext.props.HandleClosePopup();
    }
};

export function OnChangeCheckBoxSelection(objContext, blnIsChecked)
{
    objContext.dispatch({type: "SET_STATE_VALUES", payload:{ "blnIsChecked": blnIsChecked }})
};

/**
 * @summary   returns the component initial state
 */
export function GetInitialState()
{
    return {
        blnIsChecked: false
    };
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets the component state
 */
export function Reducer(state, action)
{
    switch(action.type)
    {
        case 'SET_STATE_VALUES':
        return{
            ...state,
            ...action.payload
        };
        case 'DATA_LOAD_COMPLETE':
        return{
            ...state,
            ["isLoadComplete"]: action.payload
        };
    }
};

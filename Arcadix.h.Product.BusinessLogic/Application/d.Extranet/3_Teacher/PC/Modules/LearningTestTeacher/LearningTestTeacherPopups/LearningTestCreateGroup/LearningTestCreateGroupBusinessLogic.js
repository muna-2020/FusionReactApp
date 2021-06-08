import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp
        };
    }
    else {
        return {};
    }
}

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
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
        break;
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Forms and Returns the data to save.
 */
function GetSaveData(objContext)
{
    let arrPupilIds = objContext.props.Data.SelectedPupilIds.map(strTempId => {
        return {
            "uPupilId": strTempId
        };
    });
    let strUserId = objContext.props.Data.ClientUserDetails.UserId;
    let objAddData = {
        "uUserId": strUserId,
        "uClassId": objContext.props.Data.SelectedClass["uClassId"],
        "t_TestDrive_LearningTest_PupilGroup_Data": [
            {
                "iLanguageId": parseInt(objContext.props.JConfiguration.InterfaceLanguageId),
                "vPupilGroupName": objContext.state.strGroupName
            }
        ],
        "t_TestDrive_LearningTest_PupilGroup_Pupils": arrPupilIds
    };
    return objAddData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Makes an API call and saves the data to DB.
 */
export function SavePupilGroup(objContext)
{
    let strGroupName = objContext.state.strGroupName ? objContext.state.strGroupName.trim() : "";
    if(strGroupName !== "")
    {
        let objAddData = GetSaveData(objContext);
        let strUserId = objContext.props.Data.ClientUserDetails.UserId;
        Logger.Log("objAddData", objAddData);
        let objLearningTestPupilGroup = {
            "ForeignKeyFilter": {
                "uUserId": strUserId
            },
            "vAddData": objAddData
        };
        let arrParams = [
            {
                "URL": "API/Object/Extranet/Teacher/LearningTest/LearningTestPupilGroup",
                "Params": objLearningTestPupilGroup,
                "MethodType": "POST"
            }
        ];
        DataCall(objContext, arrParams);
        objContext.props.closePopup(objContext.props.objModal);
    }
};

/**
 * 
 * @param {*} objContext 
 * @param {*} strValue 
 * @summary   Trigerred when the TestName is entered.
 */
export function OnChangeGroupNameInput(objContext, strValue)
{
    objContext.dispatch({type:"SET_STATE_VALUES", payload:{ "strGroupName": strValue }});
};

/**
 * @summary   returns the component initial state
 */
export function GetInitialState()
{
    return {
        strGroupName: ""
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

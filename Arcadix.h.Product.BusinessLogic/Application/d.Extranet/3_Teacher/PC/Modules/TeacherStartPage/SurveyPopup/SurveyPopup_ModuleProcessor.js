
/**
* @name SurveyPopup_ModuleProcessor
* @summary Class for Teacher module display and manipulate.
*/
class SurveyPopup_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_Shared_SurveyQuestion"];
    }


    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
   * @name InitialDataParams
   * @param {object} props Passes props
   * @summary Get initial request params for the component.
   * @returns {Array} return arrays of initial request params
   */
    InitialDataParams(props) { return []; }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @summary Required for css
    * @returns {object} arrStyles
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherStartPage/SurveyPopup/SurveyPopup.css"
        ];
    }

    /**
    * @name OnListClick
    * @param {object} objContext Context object
    * @param {Integer} intCheckboxSelectionCount Gives the count of the selected radio. By default is 0. 1st radio button -> count is 1 and so on...
    * @summary Updates the radio lists selection on click of the radio buttons
    */
    OnListClick(objContext, intCheckboxSelectionCount) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intCheckboxSelectionCount": intCheckboxSelectionCount } });
    }

    /**
    * @name HandleCommentChange
    * @param {object} objContext Context object
    * @param {String} strValue Text value
    * @summary Handles text changes of the textboxes for both "Yes" and "No" options.
    */
    HandleCommentChange(objContext, strValue) {
        if (objContext.state.strFeedbackTab == "Yes") {
            objContext.dispatch({ type: "SET_STATE", payload: { "strYesComment": strValue } });
        } else {
            objContext.dispatch({ type: "SET_STATE", payload: { "strNoComment": strValue } });
        }
    }

    /**
    * @name SendFeedback
    * @param {object} objContext Context object
    * @summary Sends the survey feedback
    */
    SendFeedback(objContext) {
        let strTeacherId = ClientUserDetails.UserId;
        let objRequest = {
            "uMemberSurveyQuestionId": objContext.props.Data.objSurveyQuestionData["uMemberSurveyQuestionId"],
            "cIsSurveyAnswered": "Y",
            "iSurveyResponseNoCheckboxSelection": 0,
            "uUserId": strTeacherId
        };
        if (objContext.state.strFeedbackTab == "Yes") {
            objRequest = {
                ...objRequest,
                "cSurveyResponse": "Y",
                "vComments": objContext.state.strYesComment
            };

        } else {
            objRequest = {
                ...objRequest,
                "uMemberSurveyQuestionId": objContext.props.Data.objSurveyQuestionData["uMemberSurveyQuestionId"],
                "iSurveyResponseNoCheckboxSelection": objContext.state.intCheckboxSelectionCount,
                "cSurveyResponse": "N",
                "vComments": objContext.state.strNoComment
            };
        }

        let objRequestData = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uUserId": ClientUserDetails.UserId
                        }
                    }
                ]
            },
            "vAddData": [{ ...objRequest }]
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.Data.Object_Extranet_Shared_Survey.AddData(objRequestData, (objResponse) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            Popup.ClosePopup(objContext.props.Id);
        });
    }


    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }
}

export default SurveyPopup_ModuleProcessor;
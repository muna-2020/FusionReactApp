//Module objects.
import Object_TaskContent_Text from '@shared/Object/e.Editor/TaskContent/7_Text/Text';

//Application state Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

/**
 * @name SpellCheckPage
 * @summary this check the spelling of all the text and mark the wrong text.
 * */
export const SpellCheckPage = async () => {
    /* develblock:start */
    global.ApplicationLog.Log("SpellCheck.SpellCheckPage: Entered");
    /* develblock:end */
    let ActivePageContentRef = EditorState.GetReference("ActivePageContentRef");
    ApplicationState.SetProperty("blnShowAnimation", true);
    let objContext = ActivePageContentRef.current.GetLatestContext(); // get active cmspagecontent latest objContext.
    let objPageJson = await objContext.CMSPageContent_Editor_ModuleProcessor.GetUpdatedPageJson(objContext);
    let objClientUserDetails = ApplicationState.GetProperty("ClientUserDetails") ? ApplicationState.GetProperty("ClientUserDetails") : ClientUserDetails;
    if (objPageJson && objPageJson != null) {
        let objParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iPageId": objPageJson["iPageId"]
                        }
                    }
                ]
            },
            "vEditData": objPageJson,
            "UserId": objClientUserDetails["UserId"]
        };
        Object_TaskContent_Text.SpellCheckPage(objParams).then((objCheckedPageConted) => {
           ActivePageContentRef.current.SpellCheckUpdate(objCheckedPageConted);
           ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }
    /* develblock:start */
    global.ApplicationLog.Log("SpellCheck.SpellCheckPage: Exited");
    /* develblock:end */
};

/**
 * @name GetSuggestions
 * @summary this returns the suggestions for the bad word.
 * @returns {Promise} returns promise object which resolves the server getsuggestion request. 
 */
export const GetSuggestions = (strBadWord) => {
    /* develblock:start */
    global.ApplicationLog.Log("SpellCheck.GetSuggestions: Entered");
    /* develblock:end */
    let objClientUserDetails = ApplicationState.GetProperty("ClientUserDetails") ? ApplicationState.GetProperty("ClientUserDetails") : ClientUserDetails;
    let objParams = {
        "vBadWord": strBadWord,
        "UserId": objClientUserDetails["UserId"]
    };
    /* develblock:start */
    global.ApplicationLog.Log("SpellCheck.GetSuggestions: Exited");
    /* develblock:end */
    return Object_TaskContent_Text.GetSuggestions(objParams);

}

/**
 * @name IgnoreAll
 * @summary this remove all BadWord marking for spell check from the task.
 */
export const IgnoreAll = () => {
    /* develblock:start */
    global.ApplicationLog.Log("SpellCheck.IgnoreAll: Entered");
    /* develblock:end */
    let ActivePageContentRef = EditorState.GetReference("ActivePageContentRef");
    ActivePageContentRef.current.SpellCheckUpdate(null);
    /* develblock:start */
    global.ApplicationLog.Log("SpellCheck.IgnoreAll: Exited");
    /* develblock:end */
}

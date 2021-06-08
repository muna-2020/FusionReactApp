//Objects required.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';
import ReactDOM from 'react-dom'

//Helper classes.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name LanguageCultureSwitch
 * @param {*} strMessageDivName - Html Element that shows the validation details
 * @param {*} objValidationMessages -Object with Validation Details (key - ColumnName, Value - Validation Error Message)
 * @param {*} strColumnName - Key to take the Text from the objValidationMessages
 * @param {*} strImagePath - Image path for Image shown with validation Message
 * @summary To assign value(Validation Error Message) to the Html Element based on the ColumnName passed as the key
 */
export const LanguageSwitch = (objChangeData) => {
    let arrDataCalls = ApplicationState.GetProperty("ModuleAPICalls");
    //let arrTextResoureDataCalls = arrDataCalls.filter(obj => obj.URL == "API/Object/Framework/Services/TextResource");
    //let arrResourceParams = arrTextResoureDataCalls.map(objTextResoureDataCall => {
    //    let strResourceParams = objTextResoureDataCall.Params.SearchQuery.must[0].match.Id;
    //    return strResourceParams.substring(strResourceParams.indexOf("/"));
    //}) 
    //let arrMasterResourceParams = ["/c.Intranet/LoginAndMaster/Master", "/c.Intranet/LoginAndMaster/Navigation"];
    //Object_Framework_Services_TextResource.Initialize([...arrResourceParams,...arrMasterResourceParams], strLanguage);
    //let arrDataRequest = [Object_Framework_Services_TextResource];
    (new ObjectQueue()).QueueAndExecute(arrDataCalls);
    ApplicationState.SetProperty("InterfaceLanguage", objChangeData["vLanguageCultureInfo"]);
    JConfiguration.InterfaceLanguageId = objChangeData.iFrameworkLanguageId;
    JConfiguration.LanguageCultureInfo = objChangeData["vLanguageCultureInfo"];
    ReactDOM.unmountComponentAtNode(document.getElementById('ModuleContainer'));
};
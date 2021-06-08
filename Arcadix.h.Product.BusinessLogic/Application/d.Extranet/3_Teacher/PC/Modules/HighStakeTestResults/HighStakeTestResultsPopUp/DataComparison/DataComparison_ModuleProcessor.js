//Objects required for module.
import Extranet_Teacher_TeacherDataComparison_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResultsPopUp/DataComparison/DataComparison_Module';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name DataComparison_ModuleProcessor
* @summary Class for SchoolDataComparison module display.
*/
class DataComparison_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * strCycleTypeId holds the cycle type id value. based cycle type id server cycle object will be used.
    * blnArchive it holds is archive or not.
    **/
    constructor() {
        super();
        this.strCycleTypeId = "6";
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/DataComparison"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
       // (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name GetDynamicStyles
     * @summary Css files specific to this module
     * @param {any} props
     * @returns {Array}
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/DataComparison/DataComparison.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/ProgressBar/ProgressBar.css"
        ];
    }

    /**
     * @name InitialDataParams.
     * @param {any} props props
     * @summary Returns initial load requests
     * @returns {Array} array
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        //TextResource
        let arrResourcePath = ["/d.Extranet/2_School/Modules/DataComparison"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetGenerationData
     * @param {any} objContext objContext
     * @param {any} strProgressBarId strProgressBarId
     * @param {any} strCycleId strCycleId
     * @summary Gets the generation data without caching.
     */
    GetGenerationData(objContext, strProgressBarId, strCycleId = undefined) {
        let objParams = {
            objSearchData: {
                iCycleTypeId: this.blnArchive ? this.strCycleTypeId : undefined,
                iStateId: GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId), //objContext.props.ClientUserDetails.SchoolDetails.iStateId,
                uSchoolId: ClientUserDetails.TeacherDetails.uSchoolId,
                blnLoadData: true,
                ProgressBarId: strProgressBarId,
                uCycleId: strCycleId
            }
        };

        Extranet_Teacher_TeacherDataComparison_Module.GetData(objParams, response => {
            let objData = DataRef(response.Extranet_Teacher_TeacherDataComparison_Module)[0];
            objContext.dispatch({
                type: "SET_STATE",
                payload: { objData: objData, showMessage: objData.length <= 0 }
            });
        });
    }

    /**
     * @name OpenProgressBarPopup
     * @param {any} objContext objContext
     * @param {any} objTextResource objTextResource
     * @param {any} strCycleId strCycleId
     * @summary opens ProgressBarPopup
     */
    OpenProgressBarPopup(objContext, objTextResource, strCycleId = undefined) {
        let TextResource = {
            "SchoolDataComparisonProgressBarPopup_TitleText": Localization.TextFormatter(objTextResource, 'TitleText'),
            "SchoolDataComparisonProgressBarPopup_Total": Localization.TextFormatter(objTextResource, 'Total'),
            "SchoolDataComparisonProgressBarPopup_Posted": Localization.TextFormatter(objTextResource, 'Posted'),
            "SchoolDataComparisonProgressBarPopup_Failed": Localization.TextFormatter(objTextResource, 'Failed'),
            "SchoolDataComparisonProgressBarPopup_CancelButtonText": Localization.TextFormatter(objTextResource, 'Cancel'),
            "SchoolDataComparisonProgressBarPopup_CloseButtonText": Localization.TextFormatter(objTextResource, 'Close'),
            "SchoolDataComparisonProgressBarPopup_StartButtonText": Localization.TextFormatter(objTextResource, 'Start')

        };
        Popup.ShowProgressBarPopup({
            "Data": {},
            "Meta": {
                "ShowProgressStatus": "Y",
                "HasCloseButton": "N",
                "StartProgressOnLoad": true
            },
            "Resource": {
                "Text": { ...TextResource },
                "TextResourcesKey": "SchoolDataComparisonProgressBarPopup",
                "SkinPath": objContext.props.JConfiguration.ExtranetSkinPath
            },
            "Events": {
                StartProgress: (strProgressBarId) => { objContext.DataComparison_ModuleProcessor.GetGenerationData(objContext, strProgressBarId, strCycleId); }
            },
            "CallBacks": {}
        });
    }

    /**
     * @name OpenPrintToPdfProgressBarPopup
     * @summary open progressbar popup
     * @param {any} objContext objContext
     * @param {any} objTextResource objTextResource
     * @param {any} strCycleId strCycleId
     */
    OpenPrintToPdfProgressBarPopup(objContext, objTextResource, strCycleId = undefined) {
        let TextResource = {
            "SchoolDataComparisonProgressBarPopup_TitleText": Localization.TextFormatter(objTextResource, 'TitleText'),
            "SchoolDataComparisonProgressBarPopup_Total": Localization.TextFormatter(objTextResource, 'Total'),
            "SchoolDataComparisonProgressBarPopup_Posted": Localization.TextFormatter(objTextResource, 'Posted'),
            "SchoolDataComparisonProgressBarPopup_Failed": Localization.TextFormatter(objTextResource, 'Failed'),
            "SchoolDataComparisonProgressBarPopup_CancelButtonText": Localization.TextFormatter(objTextResource, 'Cancel'),
            "SchoolDataComparisonProgressBarPopup_CloseButtonText": Localization.TextFormatter(objTextResource, 'Close'),
            "SchoolDataComparisonProgressBarPopup_StartButtonText": Localization.TextFormatter(objTextResource, 'Start')

        };
        Popup.ClosePopup(objContext.props.Id);
        setTimeout(() => {
            Popup.ShowProgressBarPopup({
                "Data": {},
                "Meta": {
                    "ShowProgressStatus": "Y",
                    "HasCloseButton": "N",
                    "StartProgressOnLoad": true
                },
                "Resource": {
                    "Text": {
                        ...objTextResource
                    },
                    "TextResourcesKey": "SchoolDataComparisonProgressBarPopup",
                    "SkinPath": JConfiguration.ExtranetSkinPath
                },
                "Events": {
                    StartProgress: (strProgressBarId) => { objContext.DataComparison_ModuleProcessor.GeneratePrintToPdf(objContext, strProgressBarId, strCycleId); }
                },
                "CallBacks": {}
            });
        }, 1000);
    }

    /**
     * @name GeneratePrintToPdf
     * @summary calls the api for generate pdf.
     * @param {any} objContext
     * @param {any} strProgressBarId
     * @param {any} strCycleId
     */
    GeneratePrintToPdf(objContext, strProgressBarId, strCycleId = undefined) {
        let objParams = {
            ModuleName: "SchoolDataComparisonPrintToPdf",
            objSearchData: {
                iCycleTypeId: this.blnArchive ? this.strCycleTypeId : undefined,
                iStateId: GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId),
                uSchoolId: ClientUserDetails.TeacherDetails.uSchoolId,
                blnLoadData: true,
                uCycleId: strCycleId
            },
            ProgressBarId: strProgressBarId
        };
        objParams = { ...objParams, ...objContext.props };
        objParams["ComponentName"] = "SchoolDataComparisonPrintToPdf";

        Extranet_Teacher_TeacherDataComparison_Module.PrintToPDF(objParams, (objResponse) => {
            console.log("PrintToPDF objResponse", objResponse);
        });
    }

    /**
     * @name GetMetaDataFillheightSchoolDataComparison
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
     */
    GetMetaDataFillheightDataComparison() {
        return {
            HeaderIds: ["Header"],
            FooterIds: ["FooterDataComparison"]
        };
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

export default DataComparison_ModuleProcessor;
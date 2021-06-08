//Objects required for module.
import Extranet_School_SchoolDataComparison_Module from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDataComparison/SchoolDataComparison_Module';
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';

/**
* @name SchoolDataComparison_ModuleProcessor
* @summary Class for SchoolDataComparison module display.
*/
class SchoolDataComparison_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * strCycleTypeId holds the cycle type id value. based cycle type id server cycle object will be used.
    * blnArchive it holds is archive or not.
    **/
    constructor() {
        super();
        this.strCycleTypeId = "6";
        this.blnArchive = QueryString.GetQueryStringValue("IsArchive") == "Y";
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/DataComparison", "Extranet_School_SchoolDataComparison_Module", "Object_Intranet_Cycle_Cycle"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
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
        Object_Framework_Services_TextResource.Initialize(arrResourcePath, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //SchoolDataComparison
        let objDataComparisonParams = {
            objSearchData: {
                iCycleTypeId: !this.blnArchive ? this.strCycleTypeId : undefined,
                iStateId: props.ClientUserDetails.SchoolDetails.iStateId,
                uSchoolId: props.ClientUserDetails.SchoolDetails.uSchoolId,
                blnLoadData: false
            }
        };
        Extranet_School_SchoolDataComparison_Module.Initialize(objDataComparisonParams, 'Y');
        arrDataRequest = [...arrDataRequest, Extranet_School_SchoolDataComparison_Module];

        //Cycle (In Archive mode.)
        if (this.blnArchive) {
            let objCycleParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iCycleTypeId": this.strCycleTypeId
                            }
                        },
                        {
                            "match": {
                                "cIsArchiveTeacher": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsActive": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
                },
                "SortKeys": [
                    {
                        "iCycleOrder": {
                            "order": "desc"
                        }
                    }
                ]
            };

            Object_Intranet_Cycle_Cycle.Initialize(objCycleParams, 'Y');
            arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];
        }

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        //return [ //DataComparison
        //    props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/DataComparison/DataComparison.css",
        //    props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css"
        //];
        //return [ //DataComparisonArchieve
        //    props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/DataComparison/DataComparison.css",
        //    props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/ProgressBar/ProgressBar.css",
        //    props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/DataComparisonArchive/DataComparisonArchive.css"
        //];

        return [ //DataComparisonArchieve
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/DataComparison/DataComparison.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/ProgressBar/ProgressBar.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/DataComparisonArchive/DataComparisonArchive.css"
        ];
    }

    /**
  * @name GetPrefetchFiles
  * @param {object} props props
  * @returns {object} PrefetchFiles
  */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"],
            "Files": []
        }
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
                iStateId: objContext.props.ClientUserDetails.SchoolDetails.iStateId,
                uSchoolId: objContext.props.ClientUserDetails.SchoolDetails.uSchoolId,
                blnLoadData: true,
                ProgressBarId: strProgressBarId,
                uCycleId: strCycleId
            }
        };

        Extranet_School_SchoolDataComparison_Module.GetData(objParams, response => {
            let objData = DataRef(response.Extranet_School_SchoolDataComparison_Module)["Data"][0];
            objContext.dispatch({
                type: "SET_STATE",
                payload: { objData: objData, showMessage: objData.length <= 0, blnGenerationClicked: true }
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
            "SchoolDataComparisonProgressBarPopup_TitleText": Localization.TextFormatter(objTextResource, 'SchoolDataComparisonProgressBarPopup_TitleText'),
            "SchoolDataComparisonProgressBarPopup_Total": Localization.TextFormatter(objTextResource, 'Total'),
            "SchoolDataComparisonProgressBarPopup_Posted": Localization.TextFormatter(objTextResource, 'Posted'),
            "SchoolDataComparisonProgressBarPopup_Failed": Localization.TextFormatter(objTextResource, 'Failed'),
            "SchoolDataComparisonProgressBarPopup_CancelButtonText": Localization.TextFormatter(objTextResource, 'Cancel'),
            "SchoolDataComparisonProgressBarPopup_CloseButtonText": Localization.TextFormatter(objTextResource, 'Close'),
            "SchoolDataComparisonProgressBarPopup_StartButtonText": Localization.TextFormatter(objTextResource, 'Start')

        }
        Popup.ShowProgressBarPopup({
            "Data": {},
            "Meta": {
                Height: "auto",
                "ShowProgressStatus": "N",
                "ShowFileToDownload": "Y",
                "HasCloseButton": "N",
                "StartProgressOnLoad": true,
                "CloseProgessBarOnComplete": "Y"
            },
            "Resource": {
                "Text": { ...TextResource, TitleText: "welcome" },
                "TextResourcesKey": "SchoolDataComparisonProgressBarPopup",
                "SkinPath": objContext.props.JConfiguration.ExtranetSkinPath
            },
            "Events": {
                StartProgress: (strProgressBarId) => { objContext.SchoolDataComparison_ModuleProcessor.GetGenerationData(objContext, strProgressBarId, strCycleId); }
            },
            "CallBacks": {}
        });
    }

    /**
     * @name CheckDataLoadedForArchive
     * @param {any} objContext objContext
     * @summary checks the whether the data is loaded is not not i archive mode.
     * @return {*} boolean value
     */
    CheckDataLoadedForArchive(objContext) {
        let blnDataLoaded = false;
        if (this.blnArchive) {
            if (DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + this.strCycleTypeId + ";cIsArchiveTeacher;Y;cIsActive;Y;cIsDeleted;N")) {
                blnDataLoaded = true;
            }
        } else {
            blnDataLoaded = true;
        }
        return blnDataLoaded;
    }

    /**
     * @name OnChangeCycleDropDown
     * @param {any} objContext objContext
     * @param {any} objCycleItem objCycleItem
     * @param {any} objTextResource objTextResource
     * @summary opens the progress bar popup and calls the api.
     */
    OnChangeCycleDropDown(objContext, objCycleItem, objTextResource) {
        this.OpenProgressBarPopup(objContext, objTextResource, objCycleItem["uCycleId"]);
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
            "SchoolDataComparisonProgressBarPopup_TitleText": Localization.TextFormatter(objTextResource, 'PrintToPdfProgressBarPopup_TitleText'),
            "SchoolDataComparisonProgressBarPopup_Total": Localization.TextFormatter(objTextResource, 'Total'),
            "SchoolDataComparisonProgressBarPopup_Posted": Localization.TextFormatter(objTextResource, 'Posted'),
            "SchoolDataComparisonProgressBarPopup_Failed": Localization.TextFormatter(objTextResource, 'Failed'),
            "SchoolDataComparisonProgressBarPopup_CancelButtonText": Localization.TextFormatter(objTextResource, 'SchoolDataComparisonProgressBarPopup_CancelButtonText'),
            "SchoolDataComparisonProgressBarPopup_CloseButtonText": Localization.TextFormatter(objTextResource, 'SchoolDataComparisonProgressBarPopup_CloseButtonText'),
            "SchoolDataComparisonProgressBarPopup_StartButtonText": Localization.TextFormatter(objTextResource, 'SchoolDataComparisonProgressBarPopup_StartButtonText')
        }

        Popup.ShowProgressBarPopup({
            "Data": {},
            "Meta": {
                Height: "auto",
                "ShowProgressStatus": "N",
                "ShowFileToDownload": "Y",
                "HasCloseButton": "N",
                "HasCancelButton": "Y",
                "ShowCloseButtonOnComplete": "Y",
                "HideFileIcon": "Y",
                "StartProgressOnLoad": true
            },
            "Resource": {
                Text: {
                    ...TextResource
                },
                "TextResourcesKey": "SchoolDataComparisonProgressBarPopup",
                "SkinPath": objContext.props.JConfiguration.ExtranetSkinPath
            },
            "Events": {
                StartProgress: (strProgressBarId) => { objContext.SchoolDataComparison_ModuleProcessor.GeneratePrintToPdf(objContext, strProgressBarId, strCycleId); }
            },
            "CallBacks": {}
        });
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
                iStateId: objContext.props.ClientUserDetails.SchoolDetails.iStateId,
                uSchoolId: objContext.props.ClientUserDetails.SchoolDetails.uSchoolId,
                blnLoadData: objContext.state.blnGenerationClicked,
                uCycleId: strCycleId
            },
            ProgressBarId: strProgressBarId
        };
        objParams = {
            ...objParams, ...objContext.props
        };
        delete objParams["Extranet_School_SchoolDataComparison_Module"];
        objParams["ComponentName"] = "SchoolDataComparisonPrintToPdf";
        objContext.props.Extranet_School_SchoolDataComparison_Module.PrintToPDF(objParams, (objResponse) => {

        });
    }

    /**
     * @name GetMetaDataFillheightSchoolDataComparison
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
     */
    GetMetaDataFillheightSchoolDataComparison() {
        return {
            HeaderIds: ["Header", "TopSpacing"],
            FooterIds: ["FooterDataComparison"]
        };
    }

    /**
     * @name GetMetaDataSchoolDataComparisonDropdown
     * @summary It returns the object metadata
     * @returns {object} MetaData
     */
    GetMetaDataSchoolDataComparisonDropdown() {
        return {
            DisplayColumn: "vCycleName",
            ValueColumn: "uCycleId"
        };
    }

    /**
     * @name GetResourceDataSchoolDataComparisonDropdown
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceDataSchoolDataComparisonDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
     * @name GetEventsDataSchoolDataComparisonDropdown
     * @param {object} objContext Context object
     * @param {object} objTextResource objTextResource
     * @summary Returns object that contains all the Event methods.
     * @return {object} objEventBasics
     */
    GetEventsDataSchoolDataComparisonDropdown(objContext, objTextResource) {
        return {
            OnChangeEventHandler: (objItem) => objContext.SchoolDataComparison_ModuleProcessor.OnChangeCycleDropDown(objContext, objItem, objTextResource)
        };
    }
}

export default SchoolDataComparison_ModuleProcessor;
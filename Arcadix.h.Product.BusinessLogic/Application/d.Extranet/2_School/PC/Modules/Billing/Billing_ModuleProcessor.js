//Objects required for module.
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Extranet_School_Billing_Module from '@shared/Application/d.Extranet/2_School/PC/Modules/Billing/Billing_Module';

/**
* @name Billing_ModuleProcessor
* @summary Class for Billing module display and manipulate.
*/
class Billing_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Billing", "Object_Extranet_Teacher_SchoolYearPeriod", "Extranet_School_Billing_Module"];
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
    InitialDataParams(props) {
        let arrDataRequest = [];

        //Billing
        var objParams = {
            "cIsEmptyData": "Y",
            "iStateId": props.ClientUserDetails.SchoolDetails.iStateId,
            "uSchoolId": props.ClientUserDetails.SchoolDetails.uSchoolId
        };
        Extranet_School_Billing_Module.Initialize(objParams, 'Y');
        arrDataRequest = [...arrDataRequest, Extranet_School_Billing_Module];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/2_School/Modules/Billing"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //School Year Period.
        let objSchoolYearPeriodParams = {
            "SearchQuery": {
                "must":
                    [
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        return arrDataRequest;
    }

    /**
   * @name GetDynamicStlyes
   * @param {object} props props
   * @returns {object} DynamicStlyes
   */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/Billing/Billing.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css"
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
    * @name LoadData
    * @param {object} objContext Passes context object
    * @summary Loads data on button click
    */
    LoadData(objContext) {
        console.log("LoadData ", objContext.state.objSchoolYearDropdown);
        ApplicationState.SetProperty("blnShowAnimation", true);

        var objParams = {
            "cIsEmptyData": "N",
            "iStateId": objContext.props.ClientUserDetails.SchoolDetails.iStateId,
            "uSchoolId": objContext.props.ClientUserDetails.SchoolDetails.uSchoolId,
            "uSchoolYearPeriodId": objContext.state.objSchoolYearDropdown["uSchoolYearPeriodId"]
        };

        let strUseQuerystring = QueryString.GetQueryStringValue('UseQueryString');
        if (strUseQuerystring === "Y") {
            objParams["strFromDate"] = QueryString.GetQueryStringValue('From');
            objParams["strToDate"] = QueryString.GetQueryStringValue('To');
        }

        objContext.props.Extranet_School_Billing_Module.GetData(objParams, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn.Extranet_School_Billing_Module["Data"], blnEmptyData: "N" } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
    * @name OnChangeSchoolYearPeriodDropdown
    * @param {object} objContext Context object
    * @param {object} objItem Item object
    * @summary Updates state on School year period dropdown change
    */
    OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSchoolYearDropdown": objItem } });
        var objParams = {
            "cIsEmptyData": "N",
            "iStateId": objContext.props.ClientUserDetails.SchoolDetails.iStateId,
            "uSchoolId": objContext.props.ClientUserDetails.SchoolDetails.uSchoolId,
            "uSchoolYearPeriodId": objItem["uSchoolYearPeriodId"]
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        objContext.props.Extranet_School_Billing_Module.GetData(objParams, (objReturn) => {
            objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn.Extranet_School_Billing_Module["Data"], blnEmptyData: "N" } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name OpenPrintToPdfProgressBarPopup
     * @param {Object} objContext Context Object
     * @param {Object} objTextResource Text Resource 
     * @param {String} strCycleId Cycle Id
     * @summary open progressbar popup
     */
    OpenPrintToPdfProgressBarPopup(objContext, objTextResource, strCycleId = undefined) {
        Popup.ShowProgressBarPopup({
            "Data": {},
            "Meta": {
                "ShowProgressStatus": "N",
                "HasCloseButton": "N",
                "ShowCloseButtonOnComplete": "Y",
                "HasCancelButton": "Y",
                "StartProgressOnLoad": true,
                "CloseProgessBarOnComplete": false,
                "ShowFileToDownload": true,
                "Height": "auto"
            },
            "Resource": {
                "Text": {
                    ...objTextResource
                },
                "TextResourcesKey": "ProgressBarPopup",
                "SkinPath": JConfiguration.ExtranetSkinPath
            },
            "Events": {
                "StartProgress": (strProgressBarId) => {
                    objContext.Billing_ModuleProcessor.GeneratePrintToPdf(objContext, strProgressBarId, strCycleId);
                }
            },
            "CallBacks": {}
        });
    }

    /**
    * @name GeneratePrintToPdf
    * @summary calls the api for generate pdf.
    * @param {Object} objContext Context Object
    * @param {String} strProgressBarId Progress Bar Id
    * @param {String} strCycleId Cycle Id
    */
    GeneratePrintToPdf(objContext, strProgressBarId, strCycleId = undefined) {
        let objParams = {
            //objSearchData: {
            //    iCycleTypeId: this.blnArchive ? this.strCycleTypeId : undefined,
            //    iStateId: objContext.props.ClientUserDetails.SchoolDetails.iStateId,
            //    uSchoolId: objContext.props.ClientUserDetails.SchoolDetails.uSchoolId,
            //    blnLoadData: true,
            //    uCycleId: strCycleId,
            //    "uSchoolYearPeriodId": objContext.state.objSchoolYearDropdown["uSchoolYearPeriodId"]
            //},
            iCycleTypeId: this.blnArchive ? this.strCycleTypeId : undefined,
            "cIsEmptyData": objContext.state.blnEmptyData,
            "iStateId": objContext.props.ClientUserDetails.SchoolDetails.iStateId,
            "uSchoolId": objContext.props.ClientUserDetails.SchoolDetails.uSchoolId,
            "uSchoolYearPeriodId": objContext.state.objSchoolYearDropdown["uSchoolYearPeriodId"],
            ProgressBarId: strProgressBarId,
            uCycleId: strCycleId,
        };

        objParams = { ...objParams, ...objContext.props };
        delete objParams["Extranet_School_Billing_Module"];
        objParams["ComponentName"] = "BillingPrintToPDF",
            objContext.props.Extranet_School_Billing_Module.PrintToPDF(objParams, (objResponse) => {

            });
    }

    /**
    * @name GetMetaDataFillheightBilling
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetMetaDataFillheightBilling() {
        return {
            HeaderIds: ["Header", "BillingTopHead", "BillingHeader", "TopSpacing"],
            FooterIds: ["FooterBilling"]
        };
    }

    /**
     * @name GetMetaDataBillingDropdown
     * @summary It returns the object metadata
     * @returns {object} MetaData
    */
    GetMetaDataBillingDropdown() {
        return {
            DisplayColumn: "vSchoolYearName",
            ValueColumn: "uSchoolYearPeriodId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Member_Class_SchoolYearPeriod_Data"
        };
    }

    /**
     * @name GetResourceDataBillingDropdown
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceDataBillingDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
    * @name GetEventsDataBillingDropdown
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} objEventBasics
   */
    GetEventsDataBillingDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.Billing_ModuleProcessor.OnChangeSchoolYearPeriodDropdown(objContext, objItem)
        };
    }

    /**
     * @name GetExcelGenerationLink
     * @param {any} objContext
     * @param {any} objRow
     * @summary Generates Billing Excel Generation Link
     * @returns Link for Biling Excel Generation
     */
    GetExcelGenerationLink(objContext, objRow, objTextResources) {
        let objParams = {
            strSchoolId: objContext.props.ClientUserDetails.UserId,
            strTeacherId: objRow["TeacherId"],
            strClassId: objRow["ClassId"],
            strExcludeFromDate: "",
            strExcludeToDate: "",
            uSchoolYearPeriodId: objContext.state.objSchoolYearDropdown["uSchoolYearPeriodId"]
        }
        let strUseQuerystring = QueryString.GetQueryStringValue('From');
        if (strUseQuerystring.length > 0) {
            objParams["strFromDate"] = QueryString.GetQueryStringValue('From');
            objParams["strToDate"] = QueryString.GetQueryStringValue('To');
        } else {
            objParams["strFromDate"] = objContext.state.objSchoolYearDropdown.dtFromDateBilling;
            objParams["strToDate"] = objContext.state.objSchoolYearDropdown.dtToDateBilling;
        }

        let strExcludeFromDate = QueryString.GetQueryStringValue("ExcludeFrom");
        if (strExcludeFromDate.length > 0) {
            objParams["strExcludeFromDate"] = strExcludeFromDate;
            objParams["strExcludeToDate"] = QueryString.GetQueryStringValue("ExcludeTo");
        }
        let strExcelFileName = objTextResources["ExcelFileNameForAllClasses"] + ".xlsx";//Klassen
        if (objRow["ClassId"] != "") {
            strExcelFileName = objTextResources["ExcelFileName"] + "_" + objRow["Klassen"] + "_" + objRow["Lehrpersonen"] + ".xlsx";
        }
        let strExcelGenerationLink = JConfiguration.BaseUrl + "API/Framework/Services/StreamFile/?ClassName=Arcadix.Extranet.School.Billing_Module,Arcadix.Extranet&"
            + "MethodName=GenerateBillingExcelDetails&MethodParams=" + JSON.stringify(objParams) + "&sessionkey=" + global.JConfiguration.SessionKey
            + "&FileName=BillingExcel.xlsx&DisplayFileName=" + strExcelFileName;
        return strExcelGenerationLink;
    }

}

export default Billing_ModuleProcessor;
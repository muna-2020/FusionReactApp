//Objects required for module.

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * @name OnlineHelpView_ModuleProcessor
 * @summary Processor file for OnlineHelpView.
 */
class ModulePerformance_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { StoreKey: "PerformanceLog", DataKey: "PerformanceLog" },
            { StoreKey: "PerformanceLog", DataKey: "Entity" },
            { StoreKey: "ApplicationState", DataKey: "arrProcList" }
        ];
    }

    /**
     * @name OnClickNavigation
     * @param {any} strTabType
     * @param {any} objEvent
     * @summary event to switch tabs
     */
    OnClickNavigation(objContext, strTabType, objEvent) {

        let strCurrentTab = objContext.state.strTabName;
        document.getElementById(strCurrentTab).classList.remove("active");
        document.getElementById(strTabType).classList.add("active");

        objContext.dispatch({ type: "SET_STATE", payload: { strTabName: strTabType } });
    }

    /**
     * @name OnClickObject
     * @param {string} strObject
     */
    OnClickObject(objContext, strObject, strType) {
        let iApplicationTypeId = typeof JConfiguration.ApplicationTypeId === "string" ? parseInt(JConfiguration.ApplicationTypeId) : JConfiguration.ApplicationTypeId;
        let strPath = this.FormatPath(objContext, strObject, strType);
        let strFilePath = "";
        if ((strType.includes("Cs") && !strType.includes("Css")) || strType == "JsObject") {
            strFilePath = JConfiguration.BasePhysicalPath + strPath;
        }
        else {
            strFilePath = strObject;
        }

        this.GetFileContent(objContext, strFilePath, strType);
    }

    FormatPath(objContext, strObject, strType) {
        let strObjectPath = "";
        let strApplicationName = strObject.split("_")[1];
        let strApplicationFolderNameForExtranet = strObject.includes("School") ?
            "/Arcadix.b.Object/d.Extranet/2_School" : strObject.includes("Teacher") ?
                "/Arcadix.b.Object/d.Extranet/3_Teacher" : strObject.includes("Pupil") ?
                    "/Arcadix.b.Object/d.Extranet/4_Pupil" : strObject.includes("Shared") ?
                        "/Arcadix.b.Object/d.Extranet/5_Shared" : "";

        let strApplicationFolderNameForIntranet = strObject.includes("Task") ?
            "/Arcadix.b.Object/c.Intranet/2_Task" : strObject.includes("Test") ?
                "/Arcadix.b.Object/c.Intranet/3_Test" : strObject.includes("Cycle") ?
                    "/Arcadix.b.Object/c.Intranet/4_Cycle" : strObject.includes("Member") ?
                        "/Arcadix.b.Object/c.Intranet/5_Member" : strObject.includes("Taxonomy") ?
                            "/Arcadix.b.Object/c.Intranet/6_Taxonomy" : strObject.includes("Settings") ?
                                "/Arcadix.b.Object/c.Intranet/7_Settings" : "";

        switch (strApplicationName) {
            case "Framework":
                strObjectPath = "/Arcadix.b.Object/a.Framework";
                break;
            case "Cockpit":
                strObjectPath = "/Arcadix.b.Object/c.Cockpit";
                break;
            case "Intranet":
                strObjectPath = strApplicationFolderNameForIntranet;
                break;
            case "ProductManagement":
                strObjectPath = "/Arcadix.b.Object/c.ProductManagement";
                break;
            case "Extranet":
                strObjectPath = strApplicationFolderNameForExtranet;
                break;
            case "Editor":
                strObjectPath = "/Arcadix.b.Object/e.Editor/";
                break;
            case "TestApplication":
                strObjectPath = "/Arcadix.b.Object/f.TestApplication";
                break;
            default:
        }

        let strBaseObjectPath = strObjectPath;
        let strFileName = "";
        let blnIsSameModule = strObjectPath.includes(JConfiguration.ApplicationFolderName.split("/")[JConfiguration.ApplicationFolderName.split("/").length - 2]);
        switch (strType) {
            case "CsController":
                if (strObject.split("_")[0] == "Object") {
                    strObjectPath = strObjectPath.replace("/Arcadix.b.Object/", "/Arcadix.i.Product.Core/Controllers/API/b.Object/");
                }

                //forming Object path
                strObject.split("_").map((strFile, index) => {
                    if (index != 0 && index != 1 && index != strObject.split("_").length - 1 && !strBaseObjectPath.includes(strFile)) {
                        strObjectPath += "/" + strFile;
                    }
                    else if (index != 0 && index != 1 && index != strObject.split("_").length - 1 && !blnIsSameModule) {
                        strObjectPath += "/" + strFile;
                    }
                    else if (index == strObject.split("_").length - 1 && strFile != strFileName) {
                        strObjectPath += "/" + strFile + "/" + strFile + "Controller.cs";
                    }
                    else if (index == strObject.split("_").length - 1 && strFile == strFileName) {
                        strObjectPath += "/" + strFile + "Controller.cs";
                    }
                    strFileName = strFile;

                })
                break;
            case "Cs":
                strObjectPath = strObjectPath.replace("//", "/");

                //forming Object path
                strObject.split("_").map((strFile, index) => {
                    if (index != 0 && index != 1 && index != strObject.split("_").length - 1 && (!strBaseObjectPath.includes(strFile))) {
                        strObjectPath += "/" + strFile;
                    }
                    else if (index != 0 && index != 1 && index != strObject.split("_").length - 1 && !blnIsSameModule) {
                        strObjectPath += "/" + strFile;
                    }
                    else if (index == strObject.split("_").length - 1 && strFile != strFileName) {
                        strObjectPath += "/" + strFile + "/" + strFile + ".cs";
                    }
                    else if (index == strObject.split("_").length - 1 && strFile == strFileName) {
                        strObjectPath += "/" + strFile + ".cs";
                    }
                    strFileName = strFile;
                })
                break;
            case "JsObject":

                strObjectPath = strObjectPath.replace("/Arcadix.b.Object/", "/Arcadix.h.Product.BusinessLogic/Object/");

                //forming Object path
                strObject.split("_").map((strFile, index) => {
                    if (index != 0 && index != 1 && index != strObject.split("_").length - 1 && !strBaseObjectPath.includes(strFile)) {
                        strObjectPath += "/" + strFile;
                    }
                    else if (index != 0 && index != 1 && index != strObject.split("_").length - 1 && !blnIsSameModule) {
                        strObjectPath += "/" + strFile;
                    }
                    else if (index == strObject.split("_").length - 1 && strFile != strFileName) {
                        strObjectPath += "/" + strFile + "/" + strFile + ".js";
                    }
                    else if (index == strObject.split("_").length - 1 && strFile == strFileName) {
                        strObjectPath += "/" + strFile + ".js";
                    }
                    strFileName = strFile;
                })
                break;
            default:
        }

        return strObjectPath;

    }

    /**
     * @name GetProcedureList
     * @param {any} objContext
     * @param {any} objCsObjects
     */
    GetProcedureList(objContext, objCsObjects) {
        let arrProcs = [];

        objCsObjects.Object.map((strObject) => {
            let strPath = this.FormatPath(objContext, strObject, "Cs");
            strPath = JConfiguration.BasePhysicalPath + strPath;
            this.GetFileContent(objContext, strPath, "Cs", (objJson) => {
                if (objJson.FileContent[0].Status == "Found") {
                    let strContent = objJson.FileContent[0].Content;
                    if (strContent.includes("Proc_")) {
                        let arrStrProcs = objJson.FileContent[0].Content.split(";").filter((x) => { return x.includes("Proc_") });
                        arrStrProcs.map((strProc) => {
                            let strDBName = this.GetDBName(strProc);
                            let IntStartIndex = strProc.indexOf("\"");
                            let IntLastIndex = strProc.lastIndexOf("\"");
                            let strProcName = strProc.substring(IntStartIndex, IntLastIndex);
                            let arrProcLists = ApplicationState.GetProperty("arrProcList");
                            arrProcLists = arrProcLists ? arrProcLists : [];
                            let arrProcsPresent = [];
                            if (arrProcLists.length > 0) {
                                arrProcsPresent = arrProcLists.filter((x) => { return Object.keys(x)[0] == strObject && Object.values(x)[0] == strProcName })
                            }
                            if (arrProcsPresent.length == 0) {
                                arrProcLists = [...arrProcLists, { [strObject]: strProcName, "DBName": strDBName }];
                                ApplicationState.SetProperty("arrProcList", arrProcLists);
                            }
                        })
                    }
                }
            })
        })
    }

    /**
     * @name GetDBName
     * @param {any} strProc
     */
    GetDBName(strProc) {
        strProc = strProc.toUpperCase();
        if (strProc.includes("CMS")) {
            return "CMS";
        }
        if (strProc.includes("SERVICE")) {
            return "Service";
        }
        if (strProc.includes("EXTRANET")) {
            return "Extranet";
        }
        if (strProc.includes("RESULT")) {
            return "Result";
        }
    }

    /**
     * @name GetConnectionString
     * @param {any} objContext
     */
    GetConnectionString(objContext) {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/GetDbConnectionStrings", "Post", {}).then(response => response.json()).then(objReturn => {
            let objDbConnectionStrings = objReturn[Object.keys(objReturn)[0]] ? objReturn[Object.keys(objReturn)[0]] : {};
            objContext.dispatch({ type: "SET_STATE", payload: { objDbConnectionStrings: objDbConnectionStrings } });
        });
    }

    /**
     * @name OnClickProceures
     * @param {any} objEvent
     * @param {any} objContext
     * @param {any} strTable
     * @summary to open popup for Procedures 
     */
    OnClickProcedures(objContext, strProcName, strDbName,strProviderType) {
        let strConnectionString = objContext.state.objDbConnectionStrings["SourceDataBase"][strDbName];
        let iApplicationTypeId = typeof JConfiguration.ApplicationTypeId === "string" ? parseInt(JConfiguration.ApplicationTypeId) : JConfiguration.ApplicationTypeId;
        let objParams =
        {
            'Params': {
                'ConnectionString': strConnectionString,
                'vProcName': strProcName,
                "DbName": strDbName
            }
        }       

        Popup.ShowPopup({
            Data: {
                ModuleName: "ShowProcedureDefinition",
                IsEdit: false,
                objParentContext: objContext,
                objParams: objParams,
            },
            Meta: {
                PopupName: "ShowProcedureDefinition",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                HeaderData: [],
                IsPerformance: iApplicationTypeId === 6 || iApplicationTypeId === 1 || iApplicationTypeId === 16 ? true : false
            },
            Resource: {
                Text: {},
                ClientUserDetails: objContext.props.ClientUserDetails,
                SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
            },
            Events: {
            },
            CallBacks: {
            },
            IsForceClientRender: true
        });

        
    }

    /**
     * @name GetFileContent
     * @param {any} strPath
     */
    GetFileContent(objContext, strPath, strType, fnCallback = null) {
        let objParams = {
            "Url": "API/Framework/Services/FileContentReader/GetFileContent",
            "Params": { "FilePath": strPath }
        }

        let blnIsFilesReadStarted = false;
        let arrFileReading = ApplicationState.GetProperty("FilesReading");
        arrFileReading ? arrFileReading.map(objFileName => {
            if (Object.keys(objFileName)[0] == strPath) {
                blnIsFilesReadStarted = true;
            }
        }) : "";

        if (!blnIsFilesReadStarted) {

            let arrFileReading = ApplicationState.GetProperty("FilesReading") ? ApplicationState.GetProperty("FilesReading"):[];
            arrFileReading = [...arrFileReading, { [strPath]: true }];
            ApplicationState.SetProperty("FilesReading", arrFileReading);

            ArcadixFetchData.ExecuteCustom("API/Framework/Services/FileContentReader/GetFileContent", "Post", objParams)
                .then(response => response.json()).then(json => {
                    if (strType == "ComponentController") {
                        let iApplicationTypeId = typeof JConfiguration.ApplicationTypeId === "string" ? parseInt(JConfiguration.ApplicationTypeId) : JConfiguration.ApplicationTypeId;

                        let Path = "";
                        if (json.FileContent[0].Content) {
                            json.FileContent[0].Content.split(";").map((strContent) => {
                                if (strContent.includes("/* webpackChunkName: \"" + objContext.state.ModuleName + "\" */")) {
                                    let intStartIndex = strContent.indexOf("@root/");
                                    let intEndIndex = strContent.lastIndexOf(")");
                                    if (intStartIndex != -1) {
                                        Path = strContent.substring(intStartIndex, intEndIndex).replace("@root/", "").replace(")", "");
                                        Path = Path.replace("/" + Path.split("/")[Path.split("/").length - 1], "").replace("'", "");
                                    }
                                }
                            })
                        }

                        if (Path != "") {
                            let strJsModuleFolderPath = JConfiguration.BasePhysicalPath + "/Arcadix.i.Product.React/" + Path;


                            objContext.dispatch({ type: "SET_STATE", payload: { ModulePath: strJsModuleFolderPath } });

                            if (iApplicationTypeId != 6 && iApplicationTypeId != 1 && iApplicationTypeId != 16) {
                                Path = Path.replace(JConfiguration.DeviceType + "/", "");
                            }

                            let strJsBusinessLogicFolderPath = JConfiguration.BasePhysicalPath + "/Arcadix.h.Product.BusinessLogic/" + Path;

                            objContext.dispatch({ type: "SET_STATE", payload: { ModuleBusninessLogicPath: strJsBusinessLogicFolderPath } });

                            //get Jsx FilePath
                            objContext.ModulePerformance_ModuleProcessor.GetFolderContent(objContext, strJsModuleFolderPath, "JsModule");

                            //Get BusinessLogic File path
                            objContext.ModulePerformance_ModuleProcessor.GetFolderContent(objContext, strJsBusinessLogicFolderPath, "BusinessLogic");
                        }
                    }
                    else {
                        if (fnCallback == null) {
                            let iApplicationTypeId = typeof JConfiguration.ApplicationTypeId === "string" ? parseInt(JConfiguration.ApplicationTypeId) : JConfiguration.ApplicationTypeId;
                            Popup.ShowPopup({
                                Data: {
                                    ModuleName: "ViewFileContent",
                                    IsEdit: false,
                                    strContent: json.FileContent[0].Content,
                                    StrType: strType,
                                    Id: "ViewFileContent"
                                },
                                Meta: {
                                    PopupName: "ViewFileContent",
                                    ShowHeader: true,
                                    ShowCloseIcon: true,
                                    ShowToggleMaximizeIcon: true,
                                    HeaderData: [],
                                    IsPerformance: iApplicationTypeId === 6 || iApplicationTypeId === 1 || iApplicationTypeId === 16 ? true : false
                                },
                                Resource: {
                                    Text: {},
                                    ClientUserDetails: objContext.props.ClientUserDetails,
                                    SkinPath: JConfiguration.ExtranetSkinPath //JConfiguration.IntranetSkinPath,
                                },
                                Events: {
                                },
                                CallBacks: {
                                },
                                IsForceClientRender: true
                            })
                        }
                        else {
                            fnCallback(json);
                        }
                    }

                    let arrFileReading = ApplicationState.GetProperty("FilesReading");
                    if (arrFileReading) {
                        arrFileReading = arrFileReading.filter(objData => Object.keys(objData)[0] != strPath)
                        ApplicationState.SetProperty("FilesReading", arrFileReading);
                    }
                });
        }
    }

    /**
     * @name GetFolderContent
     * @param {any} strPath
     */
    GetFolderContent(objContext, strFolderPath, strType) {
        let objParams = {
            "Url": "API/Framework/Services/FolderContentReader/GetFolderContent",
            "Params": { "FolderPath": strFolderPath }
        }
        let blnIsFolderReadStarted = false;
        let arrFoldersReading = ApplicationState.GetProperty("FoldersReading");
        arrFoldersReading ? arrFoldersReading.map(objFolderName => {
            if (Object.keys(objFolderName)[0] == strFolderPath) {
                blnIsFolderReadStarted = true;
            }
        }) : "";

        if (!blnIsFolderReadStarted) {
            let arrFolderReading = ApplicationState.GetProperty("FoldersReading") ? ApplicationState.GetProperty("FoldersReading") : [];
            arrFolderReading = [...arrFolderReading, { [strFolderPath]: true }];
            ApplicationState.SetProperty("FoldersReading", arrFolderReading);

            ArcadixFetchData.ExecuteCustom("API/Framework/Services/FolderContentReader/GetFolderContent", "Post", objParams)
                .then(response => response.json()).then(objJson => {
                    if (objJson && objJson.FilePath[0].Status == "Found") {
                        if (strType == "BusinessLogic") {
                            let arrJsFileList = objContext.state.BusinessLogicFileList ? objContext.state.BusinessLogicFileList : [];

                            arrJsFileList = [...arrJsFileList, ...objJson.FilePath[0]["Path"]];
                            arrJsFileList.map((strPath) => {
                                if (strPath.includes("\\" + objContext.state.ModuleName + "_ModuleProcessor")) {
                                    this.GetFileContent(objContext, strPath, "Any", (objJson) => {
                                        if (objJson.FileContent[0].Content) {
                                            let strContent = objJson.FileContent[0].Content;
                                            strContent.split("/**").map(strFunction => {
                                                if (strFunction.includes("GetDynamicStyles(props)")) {
                                                    let intStartIndex = strFunction.indexOf("[");
                                                    let intEndIndex = strFunction.indexOf("]") == -1 ? strFunction.length - 1 : strFunction.indexOf("]");

                                                    let CSSList = strFunction.substring(intStartIndex, intEndIndex);
                                                    objContext.dispatch({ type: "SET_STATE", payload: { CSSList: CSSList } });
                                                }
                                                if (strFunction.includes("StoreMapList() {")) {
                                                    let intStartIndex = strFunction.indexOf("[");
                                                    let intEndIndex = strFunction.indexOf("]") == -1 ? strFunction.length - 1 : strFunction.indexOf("]");
                                                    let ResourceList = strFunction.substring(intStartIndex, intEndIndex);
                                                    objContext.dispatch({ type: "SET_STATE", payload: { ResourceList: ResourceList } });
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                            objContext.dispatch({ type: "SET_STATE", payload: { BusinessLogicFileList: arrJsFileList } });
                        }
                        else {
                            let arrJsFileList = objContext.state.FileList ? objContext.state.FileList : [];
                            arrJsFileList = [...arrJsFileList, ...objJson.FilePath[0]["Path"]];
                            objContext.dispatch({ type: "SET_STATE", payload: { FileList: arrJsFileList } });
                        }
                    }

                    let arrFolderReading = ApplicationState.GetProperty("FoldersReading");                    
                    if (arrFolderReading) {
                        arrFolderReading = arrFolderReading.filter(objData => Object.keys(objData)[0] != strFolderPath)
                        ApplicationState.SetProperty("FoldersReading", arrFolderReading);
                    }
                });

        }
    }

    /**
    * @name GetCsObjectList
    * 
    */
    GetCsObjectList(objContext) {
        let arrAllObject = [];
        let arrCsObject = [];
        if (objContext.state.arrPerformanceLogs && objContext.state.arrPerformanceLogs.length > 1) {
            objContext.state.arrPerformanceLogs.map((objData) => {
                let strKey = Object.keys(objData)[0];
                if ((strKey == "Multi" || strKey == "Api Call") && objData[strKey].APICalls) {
                    Object.keys(objData[strKey].APICalls).map((objKeys) => {
                        let strObjectName = objKeys.split(";")[0];
                        if (strObjectName.split("_")[0] == "Object") {
                            arrCsObject = [...arrCsObject, strObjectName];
                        }
                        else {
                            arrAllObject = [...arrAllObject, strObjectName];
                        }
                    })
                }
            })
        }
        return {
            "Object": arrCsObject,
            "ModuleObject": arrAllObject
        };
    }
}

export default ModulePerformance_ModuleProcessor;

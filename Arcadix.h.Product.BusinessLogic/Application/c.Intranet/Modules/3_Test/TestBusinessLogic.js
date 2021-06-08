import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            intranettest: DataRef(state.Entity, "intranettest", true),
            testfolder: DataRef(state.Entity, "testfolder", true),
            textresource: DataRef(state.Entity, "textresource", true),
            mainclientlanguage: DataRef(state.Entity, "mainclientlanguage", true),
            language: DataRef(state.Entity, "language", true),
            subject: DataRef(state.Entity, "subject", true),
            category: DataRef(state.Entity, "category", true),
            categorycompetency: DataRef(state.Entity, "categorycompetency", true),
            testprogressdisplay: DataRef(state.Entity, "testprogressdisplay", true),
            testalgorithm: DataRef(state.Entity, "testalgorithm", true),
            FolderId: state.ApplicationState.FolderId,
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
 * @param {*} objContext 
 * @summary   Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    const getRequiredData = () => {
        Logger.Log("getting required data");
        if (!objContext.state.isLoadComplete && objContext.props.FolderId) {
            dataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
        }
    }
    useLayoutEffect(getRequiredData, [objContext.props.FolderId]);
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (
            DataRef(objContext.props.textresource, "textresource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/Test") &&
            DataRef(objContext.props.mainclientlanguage)["Data"] &&
            DataRef(objContext.props.language)["Data"] &&
            DataRef(objContext.props.subject)["Data"] &&
            DataRef(objContext.props.category)["Data"] &&
            DataRef(objContext.props.categorycompetency)["Data"] 
        ) {
            //ApplicationState.SetProperty("blnShowAnimation", false);
           //To set the data from API in the local state
           SetLocalStateData(objContext);
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
        }
        else {
            Logger.Log("data is loading")
        }
    },
        [
            objContext.props.textresource,
            objContext.props.mainclientlanguage,
            objContext.props.language,
            objContext.props.subject,
            objContext.props.category,
            objContext.props.categorycompetency,
        ]);
}

/**
* @param {*} objContext
* @summary Set RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("RibbonData", GetTestRibbonData(objContext.state.objTextResource, objContext))
    }, [objContext.state, objContext.props])
}

//calls only the Test api to get the Tests when the other folder is selected
export function useLoadTheSelecedFolderTest(objContext) {
    const LoadTestData = () => {
        if (objContext.props.FolderId) {
            if (objContext.props.FolderId == 0 && objContext.props.testfolder){
                LoadParentFolders(objContext);
            }
            else if(IsDataPresentInRedux(objContext)){
                SetLocalStateOnFolderSelection(objContext);
            }
            else
            {                
                dataCall(GetTestDataParams(objContext));
            }
        }        
    }
    useEffect(LoadTestData, [objContext.props.FolderId, objContext.props.intranettest]);
}

function LoadParentFolders(objContext){
    let arrtestfolder = DataRef(objContext.props.testfolder)["Data"];
    var arrData = arrtestfolder.filter(item=> {return item.iTestParentFolderID == 0});
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrTestData": GetNonDeletedData(arrData)} });
}

export function useSetGridOnFolderSelection(objContext) {
    useEffect(()=>{
        if(objContext.props.FolderId){
            InitializeGrid(objContext);
        }
    }, [objContext.props.FolderId]);
}

function InitializeGrid(objContext){
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrCheckedRowIndices" : []} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"intSelectedRowIndex" : 0} });
    //objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"objSelectedTest" : arrData[0]} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"blnAllRowsSelected" : false} }); 
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"blnSearchMode": false} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"strSearchText": ""} });
}

function SetLocalStateOnFolderSelection(objContext){
    var arrData = GetTestData(objContext);
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrTestData": GetNonDeletedData(arrData)} });    
}

function GetTestData(objContext){
    let arrTestData = DataRef(objContext.props.intranettest, "intranettest;iFolderId;" + objContext.props.FolderId).Data;
    let arrtestfolder = DataRef(objContext.props.testfolder)["Data"];
    //arrtestfolder = GetSortedData(arrtestfolder, "vTestFolderName");
    var arrFirstChildFolders = arrtestfolder.filter(item=> {return item.iTestParentFolderID == objContext.props.FolderId});
    var arrData = [...(arrFirstChildFolders?arrFirstChildFolders:[]), ...(arrTestData?arrTestData:[])]; 
    return arrData;
}

function GetTestDataParams(objContext){
    let objTestParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iFolderId": objContext.props.FolderId// '18123'//
                    }
                },
            ]
        },
    };
    let arrDataRequest = [
        {
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objTestParams,
            "MethodType": "Get",
        }];
    return arrDataRequest;
}


export function GetTestRibbonData(objTextResource, objContext) {
    return (
        [
            {//Group2
                "vGroupName": objTextResource.Course,
                "t_GroupData": [
                    {
                        "vTextName": objTextResource.Course,
                        "uImageUrl": "Presentation.svg",//"down.svg",
                        "type": "single",
                        "OnClick": () => OpenAddEditPopup(objContext, "Presentation")
                    }
                ]
            },
            {//Group2
                "vGroupName": objTextResource.Demo,
                "t_GroupData": [
                    {
                        "vTextName": objTextResource.Demo,
                        "uImageUrl": "Demo_32.svg",//"down.svg",
                        "type": "single",
                        "OnClick": () => OpenAddEditPopup(objContext, "Demo")
                    }
                ]
            },
            {//Group3
                "vGroupName": objTextResource.Exercise_Exam,
                "t_GroupData": [
                    {
                        "vTextName": objTextResource.Learn,
                        "uImageUrl": "TestLerntest_32.svg",//"down.svg",
                        "type": "single",
                        "OnClick": () => OpenAddEditPopup(objContext, "Learning")
                    },
                    {
                        "vTextName": objTextResource.Check,
                        "uImageUrl": "TestPruefung_32.svg",//"down.svg",
                        "type": "single",
                        "OnClick": () => OpenAddEditPopup(objContext, "Test")
                    }
                ]
            },

            {//Group4
                "vGroupName": objTextResource.Test,
                "t_GroupData": [
                    {
                        "vTextName": objTextResource.Test,
                        "uImageUrl": "HighStake_32.svg",
                        "type": "single",
                        "OnClick": () => OpenAddEditPopup(objContext, "HighStake")
                    },
                    {
                        "vTextName": objTextResource.Shell,
                        "uImageUrl": "WrapperSmall.svg",
                        "type": "inverted",
                        "OnClick": () => OpenAddEditPopup(objContext, "Wrapper")
                    },
                    {
                        "vTextName": objTextResource.Adaptive,
                        "uImageUrl": "HighStakeAdaptive.svg",
                        "type": "single",
                        "OnClick": () => OpenAddEditPopup(objContext, "HighStakeAdaptive")
                    },
                    {
                        "vTextName": objTextResource.Paper,
                        "uImageUrl": "TestEssay_32.svg",
                        "type": "single",
                        "OnClick": () => OpenAddEditPopup(objContext, "Essay")
                    },
                    {
                        "vTextName": objTextResource.External,
                        "uImageUrl": "TestExternal_32.svg",
                        "type": "single",
                        "OnClick": () => OpenAddEditPopup(objContext, "External")
                    }
                ]
            },
            {//Group5
                "vGroupName": objTextResource.Survey,
                "t_GroupData": [
                    {
                        "vTextName": objTextResource.Survey,
                        "uImageUrl": "Survey_32.svg",
                        "type": "single",
                        "OnClick": () => OpenAddEditPopup(objContext, "Survey")
                    }
                ]
            },
            {//Group6
                "vGroupName": objTextResource.To_Edit,
                "t_GroupData": [
                    {
                        "vTextName": objTextResource.To_Edit,
                        "uImageUrl": "Edit_Large.svg",
                        "type": "single",
                        "OnClick": () => OpenAddEditPopup(objContext, "", false)
                    },
                    {
                        "type": "multiple",
                        "t_MultipleData": [
                            {
                                "vTextName": objTextResource.Copy,
                                "uImageUrl": "Copy.svg",
                                "type": "single"
                            },
                            {
                                "vTextName": objTextResource.Cut_Out,
                                "uImageUrl": "Cut.svg",
                                "type": "single"
                            },
                            {
                                "vTextName": objTextResource.Insert,
                                "uImageUrl": "Paste.svg",
                                "type": "single"
                            },
                        ]
                    },
                    {
                        "vTextName": objTextResource.Clear,
                        "uImageUrl": "Delete_Large.svg",
                        "type": "single",
                        "OnClick": () => DeletePopup(objContext)
                    },
                    {
                        "vTextName": objTextResource.Abort,
                        "uImageUrl": "Cancel_Large.svg",
                        "type": "single"
                    },
                ]
            },
            {//Group7
                "vGroupName": objTextResource.Dates,
                "t_GroupData": [
                    {
                        "vTextName": objTextResource.Back_to_the_search_result,
                        "uImageUrl": "BackToSearchView.svg",
                        "type": "single"
                    },

                ]
            }
        ]
    )
}

function IsDataPresentInRedux(objContext){
    return DataRef(objContext.props.intranettest, "intranettest;iFolderId;" + objContext.props.FolderId).Data ? true : false;
}

export function OnRowClick(intRowIndex, objSelectedRow, strTargetType, objContext){
    var arrCheckedRowIndices = [];
    if(strTargetType == "checkbox"){
        if(objContext.state.arrCheckedRowIndices.includes(intRowIndex)){
            arrCheckedRowIndices = objContext.state.arrCheckedRowIndices.filter(item => {return item != intRowIndex});
        }
        else{
            arrCheckedRowIndices = [intRowIndex,...objContext.state.arrCheckedRowIndices];
        }        
    }
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"blnAllRowsSelected": false} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrCheckedRowIndices":arrCheckedRowIndices} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"objSelectedTest":objSelectedRow} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"intSelectedRowIndex":intRowIndex} });
    console.log(strTargetType);
}

export function OnContextMenuClick(intClientX, intClientY, objContext, objSelectedRow){
    event.preventDefault();
    //objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objSelectedTest": objSelectedRow } });
    console.log("objContext ", objContext)
    console.log("objSelectedRow ", objSelectedRow)
    var ContextMenuData;
    if (objSelectedRow.uTestId) {
        ContextMenuData = GetContextMenuTaskData(objContext, objSelectedRow)
    }
    else if (objSelectedRow.iTestFolderID) {
        ContextMenuData = GetContextMenuFolderData(objContext, objSelectedRow)
    }
    var objContext = {
        Data: ContextMenuData,
        objEvent:{
            clientX: intClientX,
            clientY: intClientY
        }
    }


    ApplicationState.SetProperty("objContext", objContext);
}

export function GetContextMenuFolderData(objContext, objSelectedRow){
    var arrContextListSample = [
        {
            ParentId: 0,
            Id: 1,
            Text:objContext.state.objTextResource.ContextMenu1,
            Event: () => OnAssignTaskClick(objContext, objSelectedRow), //console.log('menu clicked'),
            mouseMoved: false,
  
        },
        {
            ParentId: 1,
            Id: 1.1,
            Text:objContext.state.objTextResource.ContextMenu1_1,
            Event : () => console.log('menu clicked'),
            mouseMoved: false,
  
        },
        {
            ParentId: 1.1,
            Id: '1.1.1',
            Text:objContext.state.objTextResource.ContextMenu1_1_1,
            Event : () => console.log('menu clicked'),
            mouseMoved: false,
  
        },
        {
            ParentId: 1.1,
            Id: '1.1.2',
            Text:objContext.state.objTextResource.ContextMenu1_1_2,
            Event : () => OpenAddEditPopup(objContext,"Survey"),
            mouseMoved: false,
  
        },
        {
            ParentId: 1,
            Id: 1.2,
            Text:objContext.state.objTextResource.ContextMenu1_2,
            Event : () => OpenAddEditPopup(objContext,"Presentation"),
            mouseMoved: false,
  
        },
        {
            ParentId: 1,
            Id: 1.3,
            Text:objContext.state.objTextResource.ContextMenu1_3,
            Event : () => OpenAddEditPopup(objContext,"Learning"),
            mouseMoved: false,
  
        },
        {
            ParentId: 1,
            Id: 1.4,
            Text:objContext.state.objTextResource.ContextMenu1_4,
            Event : () => OpenAddEditPopup(objContext,"LowStake"),
            mouseMoved: false,
  
        },
        {
            ParentId: 1,
            Id: 1.5,
            Text:objContext.state.objTextResource.ContextMenu1_5,
            Event : () => console.log('menu clicked'),
            mouseMoved: false,
  
        },
        {
            ParentId: 0,
            Id: 2,
            Text: objContext.state.objTextResource.ContextMenu2,
            Event : () => console.log('menu clicked'),
            mouseMoved: false
  
        },
        {
            ParentId: 0,
            Id: 5,
            Text: objContext.state.objTextResource.ContextMenu3,
            Event : () => OpenAddEditTestFolderPopup(objContext,""),
            mouseMoved: false
  
        },
        {
            ParentId: 0,
            Id: 1,
            Text:objContext.state.objTextResource.ContextMenu4,
            Event : () => console.log('menu clicked'),
            mouseMoved: false,
  
        },
        {
            ParentId: 0,
            Id: 2,
            Text: objContext.state.objTextResource.ContextMenu5,
            Event : () => console.log('menu clicked'),
            mouseMoved: false
  
        },
        {
            ParentId: 0,
            Id: 5,
            Text: objContext.state.objTextResource.ContextMenu6,
            Event : () => console.log('menu clicked'),
            mouseMoved: false
  
        },
        {
            ParentId: 0,
            Id: 1,
            Text:objContext.state.objTextResource.ContextMenu7,
            Event : () => console.log('menu clicked'),
            mouseMoved: false,
  
        },
        {
            ParentId: 0,
            Id: 2,
            Text: objContext.state.objTextResource.ContextMenu8,
            Event : () => console.log('menu clicked'),
            mouseMoved: false

        },
        
    ];   
    return arrContextListSample;
}

export function GetContextMenuTaskData(objContext, objSelectedRow) {
    var arrContextListSample = [
        {
            ParentId: 0,
            Id: 1,
            Text: objContext.state.objTextResource.AssingnTasksToTest,
            Event: () => OnAssignTaskClick(objContext, objSelectedRow), //console.log('menu clicked'),
            mouseMoved: false,

        },
        {
            ParentId: 0,
            Id: 2,
            Text: objContext.state.objTextResource.ContextMenu9,
            Event: () => OpenTestTaskPropertiesPopup(objContext, "TestTaskProperties", objSelectedRow),
            mouseMoved: false

        }
    ];
    return arrContextListSample;
}

function OnAssignTaskClick(objContext, objSelectedRow) {
    //console.log("OnAssignTestClick objSelectedRow", objContext.state.objSelectedRow)
    //let arrIntranetTestData = DataRef(objContext.props.intranettest, "intranettest;ucycleid;" + objContext.state.objSelectedRow.uCycleId)["Data"]
    //console.log(arrIntranetTestData)
    
    console.log("objSelectedTest ", objSelectedRow)
    objContext.props.showPopup({
        MaxHeight: "662px",
        MaxWidth: "950px",
        popUpMinHeight: "662px",
        popUpMinWidth: "950px",
        showHeader: false,
        popUpName: 'masteraddedit',
        passedEvents: {            
        },
        headerTitle: '',
        popupClassName: "master-add-edit",
        Data: {
            isSSRDisabled: true,
            ModuleName: "assigntasktotest",           
            strTestId: objSelectedRow.uTestId,
            strSubjectId: objSelectedRow.iSubjectId,
            objTextResource: objContext.state.objTextResource,
            JConfiguration: JConfiguration,
            ClientUserDetails: objContext.props.ClientUserDetails,
        },
        isSSRDisabled: true
    })
}

export function OpenAddEditTestFolderPopup(objContext, strType, blnIsAdd = true) {
    objContext.props.showPopup({
        MaxHeight: "662px",
        MaxWidth: "950px",
        popUpMinHeight: "662px",
        popUpMinWidth: "950px",
        showHeader: false,
        popUpName: 'masteraddedit', //name of the component to be displayed inside the popup. must be present in ComponentController
        passedEvents: {
        },
        headerTitle: '',
        popupClassName: "master-add-edit",
        Data: {
            isSSRDisabled: true,
            ModuleName: "addedittestfolder",
            Title:"TestFolder",
            blnIsAdd,
            Type : strType, //Required When adding the task
            objSelectedRow : objContext.state.objSelectedRow, //Required When editing the task
            arrHeaderData : GetHeaderDataForAddEditTestFolder(),
            objTextResource : objContext.state.objTextResource,
            MainClientLanguageData: objContext.state.arrMainClientlanguageData,
            LanguageData: objContext.state.arrLanguageData,
            JConfiguration: objContext.props.JConfiguration,            
            ClientUserDetails: objContext.props.ClientUserDetails         
        },
        isSSRDisabled: true
    })
}

export function HandleAllCheck(objContext){
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"blnAllRowsSelected": !objContext.state.blnAllRowsSelected} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrCheckedRowIndices":[]} });
}

function GetSelectedRow(objContext){
    return objContext.state.objSelectedTest || objContext.state.arrTestData[0];
}

function GetHeaderDataForTestTaskProperties() {
    return [
        {
            "vColumnName": "iAdditionalTaskPropertyId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
        }
    ]
}

function OpenTestTaskPropertiesPopup(objContext, strType, objSelectedRow) {
    console.log("objRow", objSelectedRow);
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"]==="Y");

    objContext.props.showPopup({
        MaxHeight: "662px",
        MaxWidth: "950px",
        popUpMinHeight: "662px",
        popUpMinWidth: "950px",
        showHeader: false,
        popUpName: 'masteraddedit', //name of the component to be displayed inside the popup. must be present in ComponentController
        passedEvents: {
            //objTextResource: {},
            ClientUserDetails: objContext.props.ClientUserDetails,
        },
        headerTitle: '',
        popupClassName: "master-add-edit",
        Data: {
            uTestId: objSelectedRow.uTestId,
            isSSRDisabled: true,
            ModuleName: "testtaskproperties_popup",
            //arrHeaderData:GetHeaderDataForTestTaskProperties(),
            //objTextResource: objContext.state.objTextResource,   
            JConfiguration: objContext.props.JConfiguration,
            MainClientLanguageData: arrMainClientlanguageData,
            ClientUserDetails: objContext.props.ClientUserDetails,
            LanguageData: arrLanguageData,
            Type: strType, //Required When adding the task
            objSelectedRow: objSelectedRow, //Required When editing the task
        },
        isSSRDisabled: true
    })
}

function OpenAddEditPopup(objContext, strType, blnIsAdd = true) {

    var objSelectedRow = GetSelectedRow(objContext);
    let objDropDownData = {
        arrSubjectData : objContext.state.arrSubjectData,
        arrCategoryData : objContext.state.arrCategoryData,
        arrCategoryCompetencyData : objContext.state.arrCategoryCompetencyData,
    };

    var objDataForTest = {
        isSSRDisabled: true,
        ModuleName: "addedittest",
        Title:"Test",
        blnIsAdd,
        Type : strType, //Required When adding the Test
        objSelectedTest : objSelectedRow, //Required When editing the Test
        arrHeaderData : GetHeaderDataForAddEdit(),
        objTextResource : objContext.state.objTextResource,
        MainClientLanguageData: objContext.state.arrMainClientlanguageData,
        LanguageData: objContext.state.arrLanguageData,
        arrTestProgressDisplayData: DataRef(objContext.props.testprogressdisplay)["Data"],
        arrTestAlgorithm: DataRef(objContext.props.testalgorithm)["Data"],
        objDropDownData,
        JConfiguration: objContext.props.JConfiguration,
        ClientUserDetails: objContext.props.ClientUserDetails,
    };

    var objDataForTestFolder = {
        isSSRDisabled: true,
        ModuleName: "addedittestfolder",
        Title:"TestFolder",
        blnIsAdd,
        objSelectedRow : objContext.state.objSelectedRow, //Required When editing the TestFolder
        arrHeaderData : GetHeaderDataForAddEditTestFolder(),
        objTextResource : objContext.state.objTextResource,
        MainClientLanguageData: objContext.state.arrMainClientlanguageData,
        LanguageData: objContext.state.arrLanguageData,
        objDropDownData,            
        JConfiguration: objContext.props.JConfiguration,            
        ClientUserDetails: objContext.props.ClientUserDetails         
    }

    var objData;
    if(blnIsAdd){
        objData = objDataForTest;
    }
    else{
        objData = objSelectedRow.vTestName ? objDataForTest : objDataForTestFolder;
    }
    

    
    objContext.props.showPopup({
        MaxHeight: "662px",
        MaxWidth: "950px",
        popUpMinHeight: "662px",
        popUpMinWidth: "950px",
        showHeader: false,
        popUpName: 'masteraddedit', //name of the component to be displayed inside the popup. must be present in ComponentController
        passedEvents: {},
        headerTitle: '',
        popupClassName: "master-add-edit",
        Data: objData,
        isSSRDisabled: true

    })
}

//Header data for the Test DisplayGrid
function GetHeaderDataForTest(){
    return [
        {
            "vColumnName":"Type",
            "vDataType":"string",
            // "iDisplayOrder":3,
            "vTextResourcePage":"Test",
            "vTextResourceKey":"Type",
            "vControlType":"Image",
            "IsMandatory":"Y",
            "vValidationType":null,
            "iWidth":null,
            "cShowMultiLanguage":null
        },     
        {
            "vColumnName":"vTestName,vTestFolderName",
            "vDataType":"string",
            "iDisplayOrder":1,
            "vTextResourcePage":"Test",
            "vTextResourceKey":"Name",
            "vControlType":"textbox",
            "IsMandatory":"Y",
            "vValidationType":null,
            "iWidth":null,
            "cShowMultiLanguage":null
        },
        {
            "vColumnName":"dtModifiedOn",
            "vDataType":"string",
            "iDisplayOrder":3,
            "vTextResourcePage":"Test",
            "vTextResourceKey":"LastModified",
            "vControlType":"textbox",
            "IsMandatory":"Y",
            "vValidationType":"date",
            "iWidth":null,
            "cShowMultiLanguage":null
        }
    ]; 
}

//Heder data for the AddEdit
function GetHeaderDataForAddEdit(){
    return [        
        {
            "vColumnName":"uTestId",
            "vDataType":"int",
            "vTextResourcePage":"Test",
            "vTextResourceKey":"ID",
            "vControlType":"textbox",
            "IsMandatory":"Y",
            "vValidationType":null,
            "iWidth":null,
            "cShowMultiLanguage":null
        },
        {
            "vColumnName":"vTestName",
            "vDataType":"string",
            // "iDisplayOrder":2,
            "vTextResourcePage":"Test",
            "vTextResourceKey":"Name",
            "vControlType":"textbox",
            "IsMandatory":"Y",
            "vValidationType":null,
            "iWidth":null,
            "cShowMultiLanguage":null
        },
        ...GetHeaderDataForTimeKeeping()
    ];   
}

function GetHeaderDataForTimeKeeping() {
    return [
        {
            "vColumnName": "iDurationOfTestInMinutes",
            "vDataType": "string",
            // "iDisplayOrder":2,
            "vTextResourcePage": "TestProgress",
            "vTextResourceKey": "DurationOfTestInMinutes",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iMinimumTasksBeforeTestLimitIsConsidered",
            "vDataType": "string",
            // "iDisplayOrder":2,
            "vTextResourcePage": "TestProgress",
            "vTextResourceKey": "MinimumTasksBeforeTestLimitIsConsidered",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
    ];
}

//Heder data for the AddEditTestFolder
function GetHeaderDataForAddEditTestFolder(){
    return [        
        {
            "vColumnName":"vTestFolderName",
            "vDataType":"int",
            "vTextResourcePage":"Test",
            "vTextResourceKey":"ID",
            "vControlType":"textbox",
            "IsMandatory":"Y",
            "vValidationType":null,
            "iWidth":null,
            "cShowMultiLanguage":null
        },
        {
            "vColumnName":"vTestFolderDescription",
            "vDataType":"string",
            // "iDisplayOrder":2,
            "vTextResourcePage":"Test",
            "vTextResourceKey":"Name",
            "vControlType":"textbox",
            "IsMandatory":"Y",
            "vValidationType":null,
            "iWidth":null,
            "cShowMultiLanguage":null
        }            
    ];   
}

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props) {
  
    let objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/Test"
                    }
                }
            ]
        },
    };
    let arrDataRequest = [
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Framework/SystemObjects/MainClientLanguage",
            "Params": {},
            "MethodType": "Get",
        },
        {
            "URL": "API/Object/Framework/SystemObjects/Language",
            "Params": {},
            "MethodType": "Get",
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": {},
            "MethodType": "Get",
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/Category",
            "Params": {},//objCategoryParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/CategoryCompetency",
            "Params": {},//objCategoryCompetencyParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/TestProgressDisplay",
            "Params": {},//objCategoryCompetencyParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/TestAlgorithm",
            "Params": {},//objCategoryCompetencyParams,
            "MethodType": "Get"
        }

    ]
    return { "DataCalls": arrDataRequest };
};

/**
 * 
 * @param {*} arrParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function dataCall(arrParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams);
    //ApplicationState.SetProperty("blnShowAnimation", true);
}

function SetLocalStateData(objContext){
    let objTextResource = DataRef(objContext.props.textresource, "textresource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/Test").Data["0"].Test
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2)
    let arrLanguageData = DataRef(objContext.props.language)["Data"];
    let arrSubjectData = DataRef(objContext.props.subject)["Data"];
    let arrCategoryData = DataRef(objContext.props.category)["Data"];
    let arrCategoryCompetencyData = DataRef(objContext.props.categorycompetency)["Data"];

    LoadParentFolders(objContext)
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrHeaderData": GetHeaderDataForTest()} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"objTextResource": objTextResource} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrMainClientlanguageData": arrMainClientlanguageData} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrLanguageData": arrLanguageData} });         
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrSubjectData":arrSubjectData} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrCategoryData":arrCategoryData} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrCategoryCompetencyData":arrCategoryCompetencyData} });   
   
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrCheckedRowIndices" : []} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"intSelectedRowIndex" : 0} });
    //objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"objSelectedTest" : arrData[0]} });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"blnAllRowsSelected" : false} }); 

    ApplicationState.SetProperty("blnShowAnimation", false);
}

function GetNonDeletedData(arrData){
    return arrData.filter(objItem => {
        return objItem.cIsDeleted == "N"
    })
}

function GetSortedData(arrData, strSortTextId) {
    return arrData.sort((a,b) => {
        return a[strSortTextId].toLowerCase() < b[strSortTextId].toLowerCase() ? -1 : 1;
    })
}

function DeletePopup(objContext) {
    let objTextResource = objContext.state.objTextResource;
    objContext.props.showPopup({
        MaxHeight: "222px",
        MaxWidth: "390px",
        popUpMinHeight: "222px",
        popUpMinWidth: "390px",
        popUpName: 'confirmationpopup',
        showHeader: true,
        passedEvents: {},
        headerTitle: '',
        popupClassName: 'delete-popup-parent',
        Data: {
            HeaderText: objTextResource["DeletePopupHeaderText"],
            SubheaderText: objTextResource["DeletePopupSubheaderText"],
            ConfirmationText: objTextResource["DeletePopupWarningText"],
            ConfirmButtonText: objTextResource["DeletePopupConfirmButtonText"],
            OkText: objTextResource["OK"],
            OnConfirmationClick: (objModal) => {
                if (objContext.state.objSelectedTest.vTestName)
                    DeleteTest(objContext, objModal)
                    else
                    DeleteTestFolder(objContext, objModal)
            }
        },
    });
}

function DeleteTest(objContext, objModal){

    var objSelectedRow = GetSelectedRow(objContext);
    let objParams = {
        "ForeignKeyFilter": {},
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iFolderId": objContext.props.FolderId
                    }
                },
            ]
        },
        "vDeleteData": [objSelectedRow],
        "uUserId": objContext.props.ClientUserDetails.UserId
    };
    let arrDataRequest = [
        {
            "URL": "API/Object/Intranet/IntranetTest/IntranetTest",
            "Params": objParams,
            "MethodType": "Delete"
        }];

    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrDataRequest, function (objReturn, blnIsDeleted) {
        if (blnIsDeleted) {
            objContext.props.closePopup(objModal);
            SetStateAfterDeletion(objContext)
        }
    });
}

function DeleteTestFolder(objContext, objModal){

    var objSelectedRow = GetSelectedRow(objContext);
    let objParams = {
        "ForeignKeyFilter": {},
        "SearchQuery":{},
        "vDeleteData": [objSelectedRow],
        "uUserId": objContext.props.ClientUserDetails.UserId
    };
    let arrDataRequest = [
        {
            "URL": "API/Object/Intranet/Test/TestFolder",
            "Params": objParams,
            "MethodType": "Delete"
        }];
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrDataRequest, function (objReturn, blnIsDeleted) {
        if (blnIsDeleted) {
            objContext.props.closePopup(objModal);
            SetStateAfterDeletion(objContext)
        }
    });
}

function SetStateAfterDeletion(objContext){
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"objSelectedTest":objContext.state.arrTaskData[objContext.state.intSelectedRowIndex + 1]} });        
}

export function Search(objContext){
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"blnSearchMode": true} });        
    var objWildcard = {
        "wildcard": {
          "vTestName": "*" + objContext.state.strSearchText.toLowerCase() + "*"
        }
    };
    var objMatch = {
        "match": {
            "iFolderId": objContext.props.FolderId// '18123'//
        }
    }
    let objSearchParamsSamefolder = {
        "SearchQuery": {
            "must": [objWildcard,objMatch]
        }        
    };
    let objSearchParams = {
        "SearchQuery": {
            "must": [objWildcard]
        }        
    };
    
    let arrDataRequest = [
        {
            "URL": "API/Object/Intranet/IntranetTest/IntranetTest",
            "Params": objContext.state.blnSearchFromSameFolder ? objSearchParamsSamefolder : objSearchParams,
            "MethodType": "Get",
        }];
    ArcadixFetchData.Execute(arrDataRequest, function (objReturn, blnIsDataPresent) {
        if (blnIsDataPresent) {
            console.log(objReturn);
            var arrFilterdTestData = objContext.state.blnSearchFromSameFolder ? Object.values(objReturn.intranettest)[0].Data : objReturn.intranettest.Data;
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"arrFilterdTestData":arrFilterdTestData} });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"strSearchText": ""} });
        }
    });     
}

export function SearchCancel(objContext){
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"blnSearchMode": false} });        
}

export function HandleChange(objContext, strValue, strType){
    switch (strType){
        case "SearchInput":
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"strSearchText": strValue} });  
        break;
        case "SearchOption":
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"blnSearchFromSameFolder": Boolean(Number(strValue))} });  
        break;
        case "SearchInput":
        break;

    }
}

export function GetSearchDropDownData(){
    var arrDropDownData = [
        {
            "OptionId" : 1,
            "OptionText" : "Dieser Ordner"
        },
        {
            "OptionId" : 0,
            "OptionText" : "Alle Ordner"
        }
    ]
    return arrDropDownData;
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Maintain component state
 */
export function Reducer(state, action) {
    switch (action.type) {
        case 'DATA_LOAD_COMPLETE': {
            return { ...state, ["isLoadComplete"]: action.payload }
        }
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };

    }
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        objTextResource:{},
        arrMainClientlanguageData : [],
        arrLanguageData:[],
        objSelectedTest: {},
        blnToggleToLoadDataFromRedux:true,

        //Grid Data
        arrTestData: [],
        arrFilterdTestData : [],
        arrHeaderData:[],
        arrCheckedRowIndices:[],
        blnAllRowsSelected:false,
        intSelectedRowIndex : 0,

         //Search
         blnSearchMode : false,
         strSearchText : "",
         blnSearchFromSameFolder : true,

        //Dropdown Data
        arrSubjectData:[],
        arrCategoryData:[],
        arrCategoryCompetencyData:[],
    };
}






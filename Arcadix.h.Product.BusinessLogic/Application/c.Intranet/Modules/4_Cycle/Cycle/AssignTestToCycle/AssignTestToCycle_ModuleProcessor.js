//Base classes.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';

//Objects required for module.
import Object_Intranet_Test_TestFolder from '@shared/Object/c.Intranet/3_Test/TestFolder/TestFolder';
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';


/**
* @name AssignTaskToTest_ModuleProcessor
* @param NA
* @summary Class for Subject module display.
* @return NA
*/
class AssignTaskToTest_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Test_IntranetTest",
            "Object_Intranet_Test_TestFolder",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/4_Cycle/Cycle/AssignTestToCycle",
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
    * @name InitialDataParams
    * @param {object} props passes props
    * @summary Get initial request params for the component.
    * @returns {object} return objDataCalls
    */
    InitialDataParams(props) {
        let arrDataRequest = [];
        let objTestParams = {
            ["OutputColumns"]: ["uTestId", "iFolderId", "vTestName", "t_TestDrive_Cycle_AssignedTest", "dtModifiedOn","cIsDeleted"]
        };
        Object_Intranet_Test_IntranetTest.Initialize([objTestParams]);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_IntranetTest];

        var objTestFolderParams = {
            "SortKeys": [
                {
                    "vTestFolderName": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Intranet_Test_TestFolder.Initialize(objTestFolderParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_TestFolder];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/4_Cycle/Cycle/AssignTestToCycle"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    LoadAssignedTests(objContext) {
        let arrTests = DataRef(objContext.props.Object_Intranet_Test_IntranetTest)["Data"];
        let arrTestListData = arrTests.filter(obj => obj["t_TestDrive_Cycle_AssignedTest"].find(obj => obj["uCycleId"] == objContext.props.Data.CycleId ));
        let arrTestsToAssign = arrTests.filter(obj => !obj["t_TestDrive_Cycle_AssignedTest"].find(obj => obj["uCycleId"] == objContext.props.Data.CycleId));
        objContext.dispatch({ type: "SET_STATE", payload: { arrTestListData: arrTestListData } });
        objContext.dispatch({ type: "SET_STATE", payload: { arrAssignedTests: arrTestListData } });
        objContext.dispatch({ type: "SET_STATE", payload: { arrTestsToAssign: arrTestsToAssign } });
        objContext.dispatch({ type: "SET_STATE", payload: { blnAssignedTestsLoaded: true } });
        
    }
    /**
     * @name GetTreeData
     * @param {any} objContext
     * @summary Forms the tree data
     * @return {object}
     */
    GetTreeData(objContext) {
        const objMeta = {
            IdField: "uTestId", //Id field of the Node
            ParentIdField: "iFolderId", //Parent Id field of the Node.
            TextField: "vTestName", //The value with the this key from the node object will be diplayed.
            RootNodeId: "ROOT", //The value of the Node to be taken as the parent folder.
            "ShowExpandCollapseIcon": true,
            "cIsDeleted":"N"
        };
        const objData = {
            NodeData: [
                { uTestId: "0", iFolderId: "ROOT", vTestName: "Tests", expanded: true, ImageType: "FOLDER", "cIsDeleted": "N" },                
                ...DataRef(objContext.props.Object_Intranet_Test_TestFolder)["Data"].map(obj => {
                    return {
                        uTestId: obj.iTestFolderId, //Id field of the Node
                        iFolderId: obj.iTestParentFolderId, //Parent Id field of the Node.
                        vTestName: obj.vTestFolderName,
                        ImageType: "FOLDER",
                        cIsDeleted: obj.cIsDeleted
                    }
                }),
                ...objContext.state.arrTestsToAssign
            ]
        };
        let objEvents = {
            OnSelectNode: (objNode) => {
                objContext.dispatch({ type: "SET_STATE", payload: { objSelectedTestInTree: objNode } });
            }
        }
        let objCallBacks = {
            OnBeforeShowNode: (objNode) => {
                return objNode["cIsDeleted"] =="N"? {
                    ...objNode,
                    "ImageType": objNode.ImageType ? objNode.ImageType : "TEST"
                } : null;
            }
        }
        let objResource = {
            SkinPath: JConfiguration.IntranetSkinPath,
            ImagePathDetails: { "FOLDER": "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png", "TEST": "/Images/Application/Modules/Test/AssignTaskToTest/Base.gif" }
        }
        return {
            Data: objData,
            Meta: objMeta,
            Events: objEvents,
            CallBacks: objCallBacks,
            Resource: objResource
        }

    }

    /**
     * @name GetTreeData
     * @param {any} objtask
     * @param {any} intIndex
     * @param {any} objContext
     * @summary Sets the selected task in the state 
     */
    OnSelectListNode(objtask, intIndex, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { objSelectedTestInList: objtask } });
        objContext.dispatch({ type: "SET_STATE", payload: { intIndex: intIndex } });
    }

    /**
     * @name GetTreeData
     * @param {any} objContext
     * @summary Adds the selected task to the list 
     */
    AddToList(objContext) {        
        let objTestToAdd = objContext.state.objSelectedTestInTree;
        objContext.dispatch({ type: "SET_STATE", payload: { arrTestListData: [...objContext.state.arrTestListData, objTestToAdd] } });
        objContext.dispatch({
            type: "SET_STATE", payload: { arrTestsToAssign: objContext.state.arrTestsToAssign.filter(obj => obj["uTestId"] != objTestToAdd["uTestId"]) }
        });
        if (!objContext.state.arrAssignedTests.find(obj => obj["uTestId"] == objTestToAdd["uTestId"])) {
            objContext.dispatch({ type: "SET_STATE", payload: { arrNewAssignedTests: [...objContext.state.arrNewAssignedTests, objTestToAdd] } });
        }
        objContext.dispatch({
            type: "SET_STATE", payload: { arrRemovedTests: objContext.state.arrRemovedTests.filter(obj => obj["uTestId"] != objTestToAdd["uTestId"]) }
        });
    }

    /**
     * @name GetTreeData
     * @param {any} objContext
     * @summary Removes the selected task to the list
     */
    RemoveFromList(objContext) {
        let objTaskToRemove = objContext.state.objSelectedTestInList;
        if (objContext.state.arrAssignedTests.find(obj => obj["uTestId"] == objTaskToRemove["uTestId"])) {
            objContext.dispatch({ type: "SET_STATE", payload: { arrRemovedTests: [...objContext.state.arrRemovedTests, objTaskToRemove] } });
        }
        objContext.dispatch({ type: "SET_STATE", payload: { arrTestsToAssign: [...objContext.state.arrTestsToAssign, objTaskToRemove] } });
        objContext.dispatch({
            type: "SET_STATE", payload: { arrTestListData: objContext.state.arrTestListData.filter(obj => obj["uTestId"] != objTaskToRemove["uTestId"]) }
        });
        objContext.dispatch({
            type: "SET_STATE", payload: { arrNewAssignedTests: objContext.state.arrNewAssignedTests.filter(obj => obj["uTestId"] != objTaskToRemove["uTestId"]) }
        });
    }

    /**
     * @name AssignTestsToCycle
     * @param {any} objContext
     * @param {any} blnSaveAndClose
     * @summary Performs the Save action
     */
    AssignTestsToCycle(objContext, blnSaveAndClose = false) {
        let arrRemovedTests = objContext.state.arrRemovedTests.map(objTest => {
            return { ...objTest, ["t_TestDrive_Cycle_AssignedTest"]: objTest["t_TestDrive_Cycle_AssignedTest"].map(obj => obj["uCycleId"] == objContext.props.Data.CycleId ? { ...obj, ["vAction"] : "Delete"} : obj)}
        })
        let arrNewAssignedTests = objContext.state.arrNewAssignedTests.map(objTest => {
            return { ...objTest, ["t_TestDrive_Cycle_AssignedTest"]: [...objTest["t_TestDrive_Cycle_AssignedTest"], {["uTestId"] : objTest["uTestId"], ["uCycleId"]: objContext.props.Data.CycleId, ["vAction"]: "Add" }] }
        })
        let objEditParams = { "vEditData": [...arrRemovedTests, ...arrNewAssignedTests] };
        Object_Intranet_Test_IntranetTest.EditData(objEditParams, ((objReturn) => {
            if (blnSaveAndClose) {
                Popup.ClosePopup(objContext.props.Id);
            }

        }));
    }

    /**
     * @name AssignTestsToCycle
     * @param {any} objContext
     * @summary Moves the selected task up
     */
    OnListUp(objContext) {
        if (objContext.state.intIndex > 0) {
            let arrNewTaskLists = objContext.state.arrTestListData.map((obj, intIndex) => {
                if (intIndex == objContext.state.intIndex - 1) {
                    return objContext.state.arrTestListData[objContext.state.intIndex]
                }
                if (intIndex == objContext.state.intIndex) {
                    return objContext.state.arrTestListData[objContext.state.intIndex - 1]
                }
                else return obj
            })
            objContext.dispatch({ type: "SET_STATE", payload: { arrTestListData: arrNewTaskLists } });
            objContext.dispatch({ type: "SET_STATE", payload: { intIndex: objContext.state.intIndex - 1 } });
        }        
    }

    /**
     * @name AssignTestsToCycle
     * @param {any} objContext
     * @summary Moves the selected task down
     */
    OnListDown(objContext) {
        if (objContext.state.intIndex < objContext.state.arrTestListData.length - 1) {
            let arrNewTaskLists = objContext.state.arrTestListData.map((obj, intIndex) => {
                if (intIndex == objContext.state.intIndex + 1) {
                    return objContext.state.arrTestListData[objContext.state.intIndex]
                }
                if (intIndex == objContext.state.intIndex) {
                    return objContext.state.arrTestListData[objContext.state.intIndex + 1]
                }
                else return obj
            })
            objContext.dispatch({ type: "SET_STATE", payload: { arrTestListData: arrNewTaskLists } });
            objContext.dispatch({ type: "SET_STATE", payload: { intIndex: objContext.state.intIndex + 1 } });
        }
    }
    
}

export default AssignTaskToTest_ModuleProcessor;
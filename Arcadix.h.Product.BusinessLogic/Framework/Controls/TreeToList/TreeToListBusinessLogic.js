import { useEffect } from 'react';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @param {*} objContext
* @summary Setting up objData state and objValidationColumnTabMapping state
*/
export function useInitializeData(objContext) {
    useEffect(() => {
        //first filter out the any node from the NodeData if any nodes matches the items from the ListData.
        //The insert the FilteredNodeData to the tree
        let arrListDataIds = [];
        objContext.props.ListData.map(objListData => {
            arrListDataIds = [...arrListDataIds, objListData[objContext.props.NodeFields.Id]];
        })
        let arrFilterNodeData = objContext.props.NodeData//.filter((objNodeField) => !arrListDataIds.includes(objNodeField[objContext.props.NodeFields.Id]));
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrNodeData": arrFilterNodeData, "objNodeFields": objContext.props.NodeFields, "arrListData": objContext.props.ListData, "arrAssignedData": objContext.props.AssignedData} });
        objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
    },
        []);
}

/**
* @param {*} objSelectedNode
* @param {*} arrNewNodes
* @param {*} objContext
* @summary sets the appropriate states when ever a node is selected in the tree
*/
export const OnSelectNode = (objSelectedNode, objRootNode, objContext) => {
    //console.log("OnSingleClick objSelectedNode ", objSelectedNode)
    //console.log("OnSingleClick objRootNode ", objRootNode)
    let arrLeafNodes = [];
    arrLeafNodes = GetLeafNodes(objSelectedNode, objContext, arrLeafNodes);
    let arrSiblingNodes = objContext.state.arrNodeData.filter(item => item[objContext.props.NodeFields.ParentId] === objSelectedNode[objContext.props.NodeFields.ParentId] && item["movable"]);

    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objSelectedNode": objSelectedNode, "arrLeafNodes": arrLeafNodes, "arrSiblingNodes": arrSiblingNodes } });
}

/**
* @param {*} objContext
* @summary Hooks to Get the leafnodes for the selected node and the sibling nodes if the selected node is a leaf node itself
*/
export const useOnSelectedNodeChange = (objContext) => {
    useEffect(() => {
        let arrLeafNodes = [];
        arrLeafNodes = GetLeafNodes(objContext.state.objSelectedNode, objContext, arrLeafNodes);
        let arrSiblingNodes = objContext.state.arrNodeData.filter(item => item[objContext.props.NodeFields.ParentId] === objContext.state.objSelectedNode[objContext.props.NodeFields.ParentId] && item["movable"]);
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: {  "arrLeafNodes": arrLeafNodes, "arrSiblingNodes": arrSiblingNodes } });
    },
        [objContext.state.objSelectedNode]);
}

/**
* @param {*} objRootNode
* @param {*} objContext
* @param {*} arrLeafNodes
* @summary recursion function to find all the leafNodes and return
*/
export const GetLeafNodes = (objRootNode, objContext, arrLeafNodes) => {

    let arrFilterNodeData = objContext.state.arrNodeData.filter(objNodeData => objNodeData[objContext.props.NodeFields.ParentId] === objRootNode[objContext.props.NodeFields.Id]);
    if (arrFilterNodeData.length === 0) {
        return [...arrLeafNodes, objRootNode];
    } else {
        arrFilterNodeData.map(objNodeData => {
            arrLeafNodes = GetLeafNodes(objNodeData, objContext, arrLeafNodes);
        });
        return arrLeafNodes;
    }
} 

/**
* @param {*} objListData
* @param {*} objContext
* @summary set state when any node in the tree is selected.
*/
export const OnSelectListNode = (objListData, objContext) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objSelectedListData": objListData } });
}

/**
* @param {*} objContext
* @summary Removes the array of nodes from the tree and adds them to the list.
*/
export const AddToList = (objContext) => {
    let arrNodeData = [...objContext.state.arrNodeData];
    let arrLeafNodeIds = [];

    objContext.state.arrLeafNodes.map(objLeafNode => {
        arrLeafNodeIds = [...arrLeafNodeIds, objLeafNode[objContext.props.NodeFields.Id]];
    });
    arrNodeData = arrNodeData.filter((el) => !arrLeafNodeIds.includes(el[objContext.props.NodeFields.Id]));
    //remove selected node from arrSiblingNodes and return the first element from arrSiblingNodes (if any sibling node exists).
    //This is done to set the next sibling node as the selected node
    let objNewSelectedNode = {};
    let arrFilteredSiblingNodes = objContext.state.arrSiblingNodes.filter(objSiblingNode => objSiblingNode[objContext.props.NodeFields.Id] !== objContext.state.objSelectedNode[objContext.props.NodeFields.Id])
    if (arrFilteredSiblingNodes.length > 0 && objContext.state.objSelectedNode["movable"]) {
        objNewSelectedNode = { ...arrFilteredSiblingNodes[0] }
    } else {
        objNewSelectedNode = { ...objContext.state.objSelectedNode}
    }
    if (objContext.state.arrLeafNodes.length > 1 || (objContext.state.arrLeafNodes.length === 1 && objContext.state.arrLeafNodes[0].movable)) {
        let arrNewListData = [];
        let arrListDataId = [];
        objContext.state.arrListData.map(objListData => {
            arrListDataId = [...arrListDataId, objListData[objContext.props.NodeFields.Id]];
        });
        let arrModifiedListData = objContext.state.arrListData; 
        objContext.state.arrLeafNodes.map(objLeafNodes => {
            if (arrListDataId.includes(objLeafNodes[objContext.props.NodeFields.Id])) {
                arrModifiedListData = arrModifiedListData.map(objModifiedListData => {
                    return objModifiedListData[objContext.props.NodeFields.Id] == objLeafNodes[objContext.props.NodeFields.Id] ? { ...objModifiedListData, "Visible": true } : objModifiedListData;
                })
            } else {
                arrNewListData = [...arrNewListData, { ...objLeafNodes, "Visible": true }]
            }
        }); 

        arrNewListData = [...arrModifiedListData, ...arrNewListData ];
        ApplicationState.SetProperty("SelectedNode", objNewSelectedNode);
        objContext.dispatch({
            type: "SET_STATE_VALUES", payload: {
                //"arrListData": [...objContext.state.arrListData, ...objContext.state.arrLeafNodes],
                "arrListData": [...arrNewListData],
                "arrNodeData": arrNodeData,
                "arrLeafNodes": [],
                //"objSelectedListData": objContext.state.arrLeafNodes[objContext.state.arrLeafNodes.length - 1],
                "objSelectedListData": arrNewListData[arrNewListData.length - 1],
                "objSelectedNode": objNewSelectedNode
            }
        });
    } 
}

export const OnDoubleClickAddToList = (objSelectedNode, objContext) => {
    let arrLeafNodes = [];
    arrLeafNodes = GetLeafNodes(objSelectedNode, objContext, arrLeafNodes);
    let arrSiblingNodes = objContext.state.arrNodeData.filter(item => item[objContext.props.NodeFields.ParentId] === objSelectedNode[objContext.props.NodeFields.ParentId] && item["movable"]);

    //objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objSelectedNode": objSelectedNode, "arrLeafNodes": arrLeafNodes, "arrSiblingNodes": arrSiblingNodes } });

    let arrNodeData = [...objContext.state.arrNodeData];
    let arrLeafNodeIds = [];

    arrLeafNodes.map(objLeafNode => {
        arrLeafNodeIds = [...arrLeafNodeIds, objLeafNode[objContext.props.NodeFields.Id]];
    });
    arrNodeData = arrNodeData.filter((el) => !arrLeafNodeIds.includes(el[objContext.props.NodeFields.Id]));
    //remove selected node from arrSiblingNodes and return the first element from arrSiblingNodes (if any sibling node exists).
    //This is done to set the next sibling node as the selected node
    let objNewSelectedNode = {};
    let arrFilteredSiblingNodes = arrSiblingNodes.filter(objSiblingNode => objSiblingNode[objContext.props.NodeFields.Id] !== objContext.state.objSelectedNode[objContext.props.NodeFields.Id])
    if (arrFilteredSiblingNodes.length > 0 && objContext.state.objSelectedNode["movable"]) {
        objNewSelectedNode = { ...arrFilteredSiblingNodes[0] }
    } else {
        objNewSelectedNode = { ...objContext.state.objSelectedNode }
    }
    if (arrLeafNodes.length > 1 || (arrLeafNodes.length === 1 && arrLeafNodes[0].movable)) {
        let arrNewListData = [];

        //arrLeafNodes.map(objLeafNodes => {
        //    arrNewListData = [...arrNewListData, { ...objLeafNodes, "t_TestDrive_Cycle_AssignedTest": [{ "uTestId": objLeafNodes[objContext.props.NodeFields.Id], "uCycleId": objContext.props.CycleId, "Action": "add" }] }]
        //});
        let arrListDataId = [];
        objContext.state.arrListData.map(objListData => {
            arrListDataId = [...arrListDataId, objListData[objContext.props.NodeFields.Id]];
        });
        let arrModifiedListData = objContext.state.arrListData;
        objContext.state.arrLeafNodes.map(objLeafNodes => {
            if (arrListDataId.includes(objLeafNodes[objContext.props.NodeFields.Id])) {
                arrModifiedListData = arrModifiedListData.map(objModifiedListData => {
                    return objModifiedListData[objContext.props.NodeFields.Id] == objLeafNodes[objContext.props.NodeFields.Id] ? { ...objModifiedListData, "Visible": true } : objModifiedListData;
                })
            } else {
                arrNewListData = [...arrNewListData, { ...objLeafNodes, "Visible": true }]
            }
        });

        arrNewListData = [...arrModifiedListData, ...arrNewListData];
        ApplicationState.SetProperty("SelectedNode", objNewSelectedNode);
        objContext.dispatch({
            type: "SET_STATE_VALUES", payload: {
                //"arrListData": [...objContext.state.arrListData, ...arrLeafNodes],
                "arrListData": [...arrNewListData],
                "arrNodeData": arrNodeData,
                "arrLeafNodes": [],
                //"objSelectedListData": arrLeafNodes[arrLeafNodes.length - 1],
                "objSelectedListData": arrNewListData[arrNewListData.length - 1],
                "objSelectedNode": objNewSelectedNode
            }
        });
    } 
}

/**
* @param {*} objContext
* @summary Removes the selected list item and places it back to the tree
*/
export const RemoveFromList = (objContext) => {
    let blnIsObjSelectedListDataEmpty = Object.keys(objContext.state.objSelectedListData).length === 0 && objContext.state.objSelectedListData.constructor === Object

    if (!blnIsObjSelectedListDataEmpty) {
        let arrNewNodeData = [...objContext.state.arrNodeData, objContext.state.objSelectedListData];
        //let arrNewNodeData = [objContext.state.objSelectedListData, ...objContext.state.arrNodeData];

        //let arrNewListData = objContext.state.arrListData.filter(objListData => objListData[objContext.props.NodeFields.Id] !== objContext.state.objSelectedListData[objContext.props.NodeFields.Id]);
        let arrNewListData = objContext.state.arrListData.map(objListData => {
            return objListData[objContext.props.NodeFields.Id] == objContext.state.objSelectedListData[objContext.props.NodeFields.Id] ? { ...objListData, "Visible": false} : objListData;
        });

        let objNewSelectedListData = {};
        let intNextIndex = 0;
        objContext.state.arrListData.map((objListData, intIndex) => {
            if (objListData[objContext.props.NodeFields.Id] === objContext.state.objSelectedListData[objContext.props.NodeFields.Id]) {
                if (intIndex === objContext.state.arrListData.length - 1)
                    intNextIndex = intIndex - 1;
                else
                    intNextIndex = intIndex;
            }
        });
        objNewSelectedListData = arrNewListData[intNextIndex];

        objContext.dispatch({
            type: "SET_STATE_VALUES", payload: {
                "arrNodeData": arrNewNodeData,
                "arrListData": arrNewListData,
                "objSelectedListData": objNewSelectedListData
            }
        });
    }
}

export const OnDoubleClickRemoveFromList = (objSelectedListData, objContext) => {
    console.log("objSelectedListData ", objSelectedListData);
    let blnIsObjSelectedListDataEmpty = Object.keys(objSelectedListData).length === 0 && objSelectedListData.constructor === Object

    if (!blnIsObjSelectedListDataEmpty) {
        let arrNewNodeData = [...objContext.state.arrNodeData, objSelectedListData];
        //let arrNewNodeData = [objContext.state.objSelectedListData, ...objContext.state.arrNodeData];

        //let arrNewListData = objContext.state.arrListData.filter(objListData => objListData[objContext.props.NodeFields.Id] !== objSelectedListData[objContext.props.NodeFields.Id]);
        let arrNewListData = objContext.state.arrListData.map(objListData => {
            return objListData[objContext.props.NodeFields.Id] == objContext.state.objSelectedListData[objContext.props.NodeFields.Id] ? { ...objListData, "Visible": false } : objListData;
        });
        let objNewSelectedListData = {};
        let intNextIndex = 0;
        objContext.state.arrListData.map((objListData, intIndex) => {
            if (objListData[objContext.props.NodeFields.Id] === objSelectedListData[objContext.props.NodeFields.Id]) {
                if (intIndex === objContext.state.arrListData.length - 1)
                    intNextIndex = intIndex - 1;
                else
                    intNextIndex = intIndex;
            }
        });
        objNewSelectedListData = arrNewListData[intNextIndex];
        console.log("objNewSelectedListData ", objNewSelectedListData);
        objContext.dispatch({
            type: "SET_STATE_VALUES", payload: {
                "arrNodeData": arrNewNodeData,
                "arrListData": arrNewListData,
                "objSelectedListData": objNewSelectedListData
            }
        });
    }
}
/**
* @param {*} objContext
* @summary Places the selected list item one row above its position
*/
export const OnListUp = (objContext) => {
    let intOldIndex = objContext.state.arrListData.findIndex(objListData => objListData[objContext.props.NodeFields.Id] === objContext.state.objSelectedListData[objContext.props.NodeFields.Id]);
    let arrCloneListData = [];
    if (intOldIndex > -1) {
        let intNewIndex = (intOldIndex - 1);

        if (intNewIndex < 0) {
            intNewIndex = 0
        } else if (intNewIndex >= objContext.state.arrListData.length) {
            intNewIndex = objContext.state.arrListData.length
        }

        arrCloneListData = [...objContext.state.arrListData];//.slice();
        arrCloneListData.splice(intOldIndex, 1);
        arrCloneListData.splice(intNewIndex, 0, objContext.state.objSelectedListData);
    }
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrListData": arrCloneListData } });
}

/**
* @param {*} objContext
* @summary Places the selected list item one row below its position
*/
export const OnListDown = (objContext) => {
    let intOldIndex = objContext.state.arrListData.findIndex(objListData => objListData[objContext.props.NodeFields.Id] === objContext.state.objSelectedListData[objContext.props.NodeFields.Id]);
    let arrCloneListData = [];
    if (intOldIndex > -1) {
        let intNewIndex = (intOldIndex + 1);

        if (intNewIndex < 0) {
            intNewIndex = 0
        } else if (intNewIndex >= objContext.state.arrListData.length) {
            intNewIndex = objContext.state.arrListData.length
        }

        arrCloneListData = [...objContext.state.arrListData];//.slice();
        arrCloneListData.splice(intOldIndex, 1);
        arrCloneListData.splice(intNewIndex, 0, objContext.state.objSelectedListData);
    }
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrListData": arrCloneListData } });
}

/**
* @param {*} objContext
* @summary Removes selected item from the list and puts it back to the tree.
*/
export const OnListRemove = (objContext) => {
    let intIndex = objContext.state.arrListData.findIndex(objListData => objListData[objContext.props.NodeFields.Id] === objContext.state.objSelectedListData[objContext.props.NodeFields.Id]);
    let arrCloneListData = [...objContext.state.arrListData];
    arrCloneListData.splice(intIndex, 1); //first argument is my selected item, second is the number of item to remove

    let arrNewNodeData = [...objContext.state.arrNodeData, objContext.state.objSelectedListData];
    let objSelectedListData = { ...objContext.state.objSelectedListData };

    let arrNewListData = objContext.state.arrListData.filter(objListData => objListData[objContext.props.NodeFields.Id] !== objContext.state.objSelectedListData[objContext.props.NodeFields.Id]);
    let objNewSelectedListData = {};
    let intNextIndex = 0;
    objContext.state.arrListData.map((objListData, intIndex) => {
        if (objListData[objContext.props.NodeFields.Id] === objContext.state.objSelectedListData[objContext.props.NodeFields.Id]) {
            if (intIndex === objContext.state.arrListData.length - 1)
                intNextIndex = intIndex - 1;
            else
                intNextIndex = intIndex;
        }
    });
    objNewSelectedListData = arrNewListData[intNextIndex];

    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrListData": arrCloneListData, "arrNodeData": arrNewNodeData, "objSelectedListData": objNewSelectedListData, "objSelectedNode": objSelectedListData } });
    ApplicationState.SetProperty("SelectedNode", objSelectedListData);
}

/**
* @param {*} objContext
* @summary Removes all items from the list and puts them back to the tree.
*/
export const OnListEmpty = (objContext) => {   
    let arrNewNodeData = [...objContext.state.arrNodeData, ...objContext.state.arrListData];
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrListData": [], "objSelectedListData": {}, "arrNodeData": arrNewNodeData } });
}

/**
* @param {*} strValue
* @param {*} objContext
* @summary Handles the text change for the input field
*/
export const HandleChange = (strValue, objContext) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "intNodeId": strValue } });
}

/**
* @param {*} objContext
* @summary On typing the “id” of any item in the tree and pressing add, it removes that item from the tree and adds into the list.
*/
export const AddNode = (objContext) => {
    let arrFilterAddData = objContext.state.arrNodeData.filter(objNodeData => objNodeData[objContext.props.NodeFields.Id].toString() === objContext.state.intNodeId.toString() && objNodeData["movable"]);
    let arrFilterNodeData = objContext.state.arrNodeData.filter(objNodeData => objNodeData[objContext.props.NodeFields.Id].toString() !== objContext.state.intNodeId.toString());

    if (arrFilterAddData.length > 0) {
        objContext.dispatch({
            type: "SET_STATE_VALUES", payload: {
                "arrListData": [...objContext.state.arrListData, ...arrFilterAddData],
                "arrNodeData": arrFilterNodeData,
                "objSelectedListData": arrFilterAddData[0]
            }
        });
    }
}

export const ToggleShowListData = (objContext) => {    
    objContext.dispatch({
        type: "SET_STATE_VALUES", payload: {
            "blnHideListData": objContext.state.blnHideListData ? false : true          
        }
    });
}

export const OnMatchedAssignedData = (arrModifiedAssignedData, objContext) => {
    console.log("OnMatchedAssignedData ", arrModifiedAssignedData)
   // objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrListData": arrModifiedAssignedData} });

}

export function GetInitialState() {
    return {
        objNodeFields: {},
        arrNodeData: [],
        objSelectedNode: {},
        objSelectedListData: {},
        arrListData: [],
        arrLeafNodes: [],
        arrSiblingNodes: [],
        intNodeId: null,
        blnHideListData: false,
        arrAssignedData: []
    };
}

export const Reducer = (state, action) => {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE":
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
        case "SET_STATE_VALUES":
            return {
                ...state,
                ...action.payload
            };
    }
}
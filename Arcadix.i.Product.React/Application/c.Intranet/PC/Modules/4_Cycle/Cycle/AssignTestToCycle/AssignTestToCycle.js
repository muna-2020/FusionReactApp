// React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import AssignTestToCycle_ModuleProcessor from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/AssignTestToCycle/AssignTestToCycle_ModuleProcessor';
import * as AssignTestToCycle_Hook from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/AssignTestToCycle/AssignTestToCycle_Hook';


//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';


/**
 * @name AssignTestToCycle
 * @param {object} props props
 * @summary This component is used to Assign Task To Test.
 * @returns {object} React.Fragement that contains the content to be added in popup required for AssignTestToCycle.
 */
const AssignTestToCycle = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AssignTestToCycle_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["AssignTestToCycle_ModuleProcessor"]: new AssignTestToCycle_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditTask_Hook, that contains all the custom hooks.
      * @returns null
      */
    AssignTestToCycle_Hook.Initialize(objContext);

    /**
   * @name GetList
   * @summary Forms the JSX for the list.
   * @returns {object} div
   */
    function GetList() {
        let arrSortedList = state.arrTestListData;
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle/AssignTestToCycle", objContext.props);
        return <div className="single-level-tree">
            <ul>
                <li>
                    <span>
                        <span className="expand-icon" onClick={() => TreeToListBusinessLogic.ToggleShowListData(objContext)}>{state.blnHideListData ? "+" : "-"}</span>
                        <img src={props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/Folder.gif"} />
                        <span>{objTextResource["Tests"]}</span>
                    </span>
                </li>
                <ul className="nested" style={{ display: state.blnHideListData ? "none" : "block" }}>
                    {arrSortedList.map((objListData, intIndex) => {
                        let strIsListDataSelected = objListData["uTestId"] == state.objSelectedTestInList["uTestId"] ? "#fdeeb3" : "";
                        return objListData["vAction"] != "Delete"
                            ?
                            <li
                                style={{ "backgroundColor": strIsListDataSelected }}
                                onClick={() => objContext.AssignTestToCycle_ModuleProcessor.OnSelectListNode(objListData, intIndex, objContext)}
                            //onDoubleClick={() => { TreeToListBusinessLogic.OnDoubleClickRemoveFromList(objListData, objContext) }}
                            //style={objStyle}
                            >
                                <span className="spacer" />
                                <img src={props.ListItemIconPath} />
                                <span>{objListData["vTestName"]}</span>
                            </li>
                            :
                            <React.Fragment />
                    })}
                </ul>
            </ul>
        </div>
    }



    /**
   * @summary JSX for AssignTaskToTest
   */
    function GetContent() {
        let objTreeData = objContext.AssignTestToCycle_ModuleProcessor.GetTreeData(objContext);
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle/AssignTestToCycle", objContext.props);
        return <div className='tree-to-list-wrapper'>
            <div className="tree-to-list">
                <div className="tree-to-list-flex">
                    <div className="left-panel">
                        <h3>{objTextResource["TreeName"]}</h3>
                        <div className="single-level-tree">
                            <WrapperComponent
                                ComponentName={"Tree"}
                                Id={"Tree_Sample1"}
                                Meta={objTreeData.Meta}
                                Data={objTreeData.Data}
                                Events={objTreeData.Events}
                                CallBacks={objTreeData.CallBacks}
                                Resource={objTreeData.Resource}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                    <div className="arrows">
                        <img src={props.JConfiguration.IntranetSkinPath + '/Images/Common/General/ArrowRight.gif'} alt="Logo" onClick={() => objContext.AssignTestToCycle_ModuleProcessor.AddToList(objContext)} />
                        <img src={props.JConfiguration.IntranetSkinPath + '/Images/Common/General/ArrowLeft.gif'} alt="Logo" onClick={() => objContext.AssignTestToCycle_ModuleProcessor.RemoveFromList(objContext)} />
                    </div>
                    <div className="right-panel">
                        {/*<h3>{objTextResource["ListName"]}</h3>*/}
                        <div className="toolbar">
                            <img src={props.JConfiguration.IntranetSkinPath + '/Images/Common/Toolbar/Icon_Listup.svg'} alt="Logo" onClick={() => { objContext.AssignTestToCycle_ModuleProcessor.OnListUp(objContext) }} />

                            <img src={props.JConfiguration.IntranetSkinPath + '/Images/Common/Toolbar/Icon_Listdown.svg'} alt="Logo" onClick={() => { objContext.AssignTestToCycle_ModuleProcessor.OnListDown(objContext) }} />

                            <img src={props.JConfiguration.IntranetSkinPath + '/Images/Common/Toolbar/Icon_delete.svg'} alt="Logo" onClick={() => { objContext.AssignTestToCycle_ModuleProcessor.RemoveFromList(objContext) }} />

                            <img src={props.JConfiguration.IntranetSkinPath + '/Images/Common/Toolbar/Icon_reset.svg'} alt="Logo" onClick={() => { objContext.AssignTestToCycle_ModuleProcessor.OnListEmpty(objContext) }} />

                            "-(NI)-"
                        </div>

                        {GetList()}

                        <div className="form-block">
                            <input id="NodeId" type="text" onChange={(e) => { objContext.AssignTestToCycle_ModuleProcessor.HandleChange(e.target.value, objContext) }} value={state.intNodeId} />
                            <button id="ButtonId" type="button" className="btn" onClick={(e) => { objContext.AssignTestToCycle_ModuleProcessor.AddNode(objContext) }}>{objTextResource["Add"] + "-(NI)-"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment></React.Fragment>

}

/**
* @name InitialDataParams
* @param {object} props props
* @summary required for SSR
* @returns {object} InitialDataParams
*/
AssignTestToCycle.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new AssignTestToCycle_ModuleProcessor()).InitialDataParams(props));
};

export default connect(IntranetBase_Hook.MapStoreToProps(AssignTestToCycle_ModuleProcessor.StoreMapList()))(AssignTestToCycle);

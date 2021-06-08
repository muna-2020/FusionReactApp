// React related imports.
import React, { useReducer, useEffect } from "react";
import { connect } from "react-redux";

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Component Specific import
import * as ContextMenu_Hook from '@shared/Framework/Controls/ContextMenu/ContextMenu_Hook.js';
import ContextMenu_ComponentProcessor from "@shared/Framework/Controls/ContextMenu/ContextMenu_ComponentProcessor.js";

//Components used.
import SingleLevelContextMenu from "@root/Framework/Controls/ContextMenu/SingleLevelContextMenu";

/**
* @name ContextMenu
* @param {object} props props
* @summary This component displays the ContextMenu.
* @returns {object} React.Fragement that encapsulated the ContextMenu.
*/
const ContextMenu = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, ContextMenu_Hook.GetInitialState(props));

    /**
    * @name objContext.
    * @summary Groups state.dispatch and module object(s) in objContext. 
    * @returns {object} objContext.
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["ContextMenu_ComponentProcessor"]: new ContextMenu_ComponentProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.ContextMenu_ComponentProcessor.Initialize(objContext, objContext.ContextMenu_ComponentProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Subject_Hook, that contains all the custom hooks.
    * @returns null
    */
    ContextMenu_Hook.Initialize(objContext);

    /**
     * @name AddContextMenu 
     * @param {*} event 
     * @param {*} objNode 
     * @param {*} objPrevContextDimentions 
     * @param {*} objLevel 
     * @summary Based on the event(x and y dimensions), second and further levels are added.
     */
    const AddContextMenu = (event, objNode, objPrevContextDimentions, objLevel) => {
        // debugger
        let arrRemovedContextMenu = [...state.arrReactContList.filter(a => a.level <= objLevel.level)];
        if (state.arrReactContList.find(a => a.ParentId === objNode.Id) === undefined) {   // dont add if already added
            objContext.ContextMenu_ComponentProcessor.RemoveRightSideContextMenus(objLevel.level, objContext);      // removing right side context menus on change of menu
            if (state.arrContextList.filter(a => a.ParentId === objNode.Id).length > 0) {  // add only if childrens are there
                let arrNewReactContList = [...arrRemovedContextMenu, {
                    ParentId: objNode.Id,
                    level: parseInt(objContext.ContextMenu_ComponentProcessor.GetLastLevelContextMenu(objContext).level) + 1,
                    righAligned: objPrevContextDimentions.righAligned,
                    bottomAligned: objPrevContextDimentions.bottomAligned,
                    isRoot: false,
                    clientX: event.clientX,
                    clientY: event.clientY,
                    boundingClient: { ...objPrevContextDimentions },
                    contentList: [...state.arrContextList.filter(a => a.ParentId === objNode.Id)]
                }];
                dispatch({ type: "SET_STATE", payload: { "arrReactContList": arrNewReactContList } });
            }
        }
    }


    /**
     * @name GetContent
     * @summary To form the JSX
     * @returns {object} JSX
     */
    const GetContent = () => {
        var ContextMent = state.arrReactContList.map((objItem, intIndex) => {
            return <SingleLevelContextMenu
                key={intIndex}
                Data={{
                    SingleLevelContextMenuDetails: objItem,
                    IsSubLevelsPresent: (strId) => objContext.ContextMenu_ComponentProcessor.IsSubLevelsPresent(strId,objContext),
                    NodeId: props.ContextMenuDetails.strNodeId
                }}
                CallBacks={{
                    AddContextMenu: AddContextMenu
                }}
                ParentProps={props.ParentProps}
            />
        })
        return ContextMent;
    }

    return (
        <div>
            {props.ContextMenuDetails && props.ContextMenuDetails.Data ? GetContent() : <React.Fragment />}
        </div>
    )

}

export default connect(Base_Hook.MapStoreToProps(ContextMenu_ComponentProcessor.StoreMapList()))(ContextMenu);
// React related imports.
import React, { useReducer, useEffect } from "react";

//Module related imports
import * as ContextMenu_Hooks from "@shared/Framework/Controls/ContextMenu_New/ContextMenu_Hooks";
import ContextMenu_ModuleProcessor from "@shared/Framework/Controls/ContextMenu_New/ContextMenu_ModuleProcessor";
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Components used.
import ContextMenuList from "@root/Framework/Controls/ContextMenu_New/ContextMenuList/ContextMenuList";

//Store related imports.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name ContextMenu
 * @param {object} props props
 * @summary A context menu (also called contextual, shortcut, and pop up or pop-up menu) is a menu in a graphical user interface (GUI) that appears upon user interaction, such as a right-click mouse operation.
 * @returns {object} React.Fragement that encapsulated the ContextMenu.
 */
const ContextMenu = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, ContextMenu_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    const objContext = { props, state, dispatch, ["ModuleName"]: props.Id, ["ContextMenu_ModuleProcessor"]: new ContextMenu_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.ContextMenu_ModuleProcessor.Initialize(objContext, objContext.ContextMenu_ModuleProcessor);

    /**
     * @name RemoveContextMenu
     * @param {object} objContext { state, dispatch, ["ContextMenu_ModuleProcessor"] }.
     * @summary To reset the Context menu.
     */
    const RemoveContextMenu = () => {      
        document.removeEventListener('click', RemoveContextMenu);
        document.removeEventListener('scroll', RemoveContextMenu);
        objContext.dispatch({ type: "SET_STATE", payload: { "arrActivemenuList": [] } });
    }

    /**
     * @name ShowContextMenu
     * @param {object} objContext { state, dispatch, ["ContextMenu_ModuleProcessor"] }
     * @param {object} objContextMenuAndEvent contains x,y coordinates and Context menu list.
     * @summary this method extract the ClientX and ClientY from the event and stop the propagation and display custom context-menu.
     */
    const ShowContextMenu = (objContext, objContextMenuAndEvent) => {
        document.addEventListener('click', RemoveContextMenu);
        document.addEventListener('scroll', RemoveContextMenu);
        objContext.ContextMenu_ModuleProcessor.ShowContextMenu(objContext, objContextMenuAndEvent.Data, objContextMenuAndEvent.objEvent);
    };

    /**
     * @name useEffect.
     * @summary This effect is responsible for adding ShowContextMenu to the store.
     */
    useEffect(() => {
        ApplicationState.SetProperty("ShowContextMenu", (objContextMenuAndEvent) => ShowContextMenu(objContext, objContextMenuAndEvent));
    }, [objContext.state, objContext.props]);

    /**
     * @name useEffect
     * @summary Adds event Listener for click and scroll to remove context menu when clicked or scrolled.
     */
    //useEffect(() => {
    //    document.addEventListener('click', () => objContext.ContextMenu_ModuleProcessor.RemoveContextMenu(objContext));
    //    document.addEventListener('scroll', () => objContext.ContextMenu_ModuleProcessor.RemoveContextMenu(objContext));
    //    return () => {
    //        document.removeEventListener('click', () => objContext.ContextMenu_ModuleProcessor.RemoveContextMenu(objContext));
    //        document.removeEventListener('scroll', () => objContext.ContextMenu_ModuleProcessor.RemoveContextMenu(objContext));
    //    }
    //}, []);

    /**
     * @name GetContent
     * @summary Render the ContextMenus.
     * @returns {JSX} Returns the JSX for the ContextMenu.
     */
    const GetContent = () => {
        return (
            <React.Fragment>
                {
                    objContext.state.arrActivemenuList.map((objSingleContextMenu) => {
                        return (
                            <ContextMenuList
                                ContextMenuListData={objSingleContextMenu}
                                key={objSingleContextMenu.intKey}
                                AddSubContextMenu={(objClientXY, objNode, objPrevContextMenuDimentions, objLevel) => {
                                    objContext.ContextMenu_ModuleProcessor.AddSubContextMenu(objContext, objClientXY, objNode, objPrevContextMenuDimentions, objLevel)
                                }}
                                JConfiguration={props.JConfiguration}
                                HasSubMenu={(intId) => objContext.ContextMenu_ModuleProcessor.HasSubMenu(objContext, intId)}
                                Resource={props.Resource}
                            />
                        )
                    })
                }
            </React.Fragment>
        );
    };

    /**
     * @summary call the GetContent to render the jsx if context menu detail is present.
     */
    return (objContext.state.arrActivemenuList && objContext.state.arrMenuList && objContext.state.arrActivemenuList.length > 0) ? GetContent() : ""
}

export default ContextMenu;
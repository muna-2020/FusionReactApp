// React related imports.
import React, { useRef, useLayoutEffect, useReducer } from "react";

//Module related imports
import * as ContextMenuList_Hooks from "@shared/Framework/Controls/ContextMenu_New/ContextMenuList/ContextMenuList_Hooks";
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Inline Images import
import ArrowImage from '@inlineimage/Framework/ReactJs/PC/Controls/ContextMenu/Arrow.gif?inline';

/**
* @name ContextMenuList
* @param {object} props props
* @summary This component displays the ContextMenuList.
* @returns {object} React.Fragement that encapsulated the ContextMenuList.
*/
const ContextMenuList = (props) => {

    /**
     * @name ContextMenuListRootRef
     * @summary root dom ref of context-menu.
     * */
    const ContextMenuListRootRef = useRef(null);

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, ContextMenuList_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    const objContext = { props, state, dispatch };

    /**
     * @name HandleContextMenu
     * @param {object} objContext { state, dispatch,props }.
     * @summary Based on the objContent from the HOC(from the mouse point, window dimensions and other stuffs), to align the Context menu.
     * @returns {object} React.Fragement that encapsulated the Tree.
     */
    const HandleContextMenu = (objContext) => {
        let { objClientXY, blnIsRoot, objParentMenuDimentions } = objContext.props.ContextMenuListData;
        let blnRighAligned, blnBottomAligned;
        if (!blnIsRoot) {
            let prevNodeRight = objParentMenuDimentions.intRight;
            let prevNodeLeft = objParentMenuDimentions.intLeft;
            let prevNodeTop = objParentMenuDimentions.intTop;
            let prevNodeBottom = objParentMenuDimentions.intBottom;
            let screenW = window.innerWidth;
            let screenH = window.innerHeight;
            let ElWidth = ContextMenuListRootRef.current.offsetWidth;
            let ElHeight = ContextMenuListRootRef.current.offsetHeight;
            let blnPrevNodeRightAligned = objParentMenuDimentions.blnRighAligned;
            const intWidthTolerance = 4;
            let intLeft = 0, intTop = 0;

            if (blnPrevNodeRightAligned) { // if previous menu is right aligned
                if ((ElWidth + prevNodeRight - intWidthTolerance) < screenW) { // check space in right
                    intLeft = prevNodeRight - intWidthTolerance;  // display to the right.
                    blnRighAligned = true;
                } else if ((ElWidth + intWidthTolerance) < prevNodeLeft) { // check space in left
                    intLeft = (prevNodeLeft - ElWidth) + intWidthTolerance;  // dispaly in the left
                    blnRighAligned = false
                } else {
                    intLeft = prevNodeLeft;
                    blnRighAligned = true;
                }
            } else {
                if ((ElWidth + intWidthTolerance) < prevNodeLeft) { // check space in left
                    intLeft = (prevNodeLeft - ElWidth) + intWidthTolerance;
                    blnRighAligned = false;
                } else if ((ElWidth + prevNodeRight - intWidthTolerance) < screenW) { // check space in right
                    intLeft = prevNodeRight - intWidthTolerance; // display to the right.
                    blnRighAligned = true;
                } else {
                    intLeft = prevNodeLeft;
                    blnRighAligned = true;
                }
            }
            if (true) { // if previous menu is bottom aligned. // always fist check for bottom space availability.
                if ((prevNodeTop + ElHeight) < screenH) { // check space availability in bottom.
                    intTop = prevNodeTop;  // display in bottom.
                    blnBottomAligned = true;
                } else if (prevNodeBottom > ElHeight) {  // check space availability in top.
                    intTop = prevNodeBottom - ElHeight;
                    blnBottomAligned = false;
                } else {
                    intTop = screenH - ElHeight; // fill from bottom
                    blnBottomAligned = true;
                }
            }
            ContextMenuListRootRef.current.style.left = `${intLeft}px`;
            ContextMenuListRootRef.current.style.top = `${intTop}px`;
        }
        else {
            if (objClientXY === undefined) {
                objClientXY = {};
                objClientXY.clientX = objClientXY.clickX ? objClientXY.clickX : 0;
                objClientXY.clientY = objClientXY.clickY ? objClientXY.clickY : 0;
            }
            let clickX = objClientXY.clientX;
            let clickY = objClientXY.clientY;
            let screenW = window.innerWidth;
            let screenH = window.innerHeight;
            let rootW = ContextMenuListRootRef.current.offsetWidth;
            let rootH = ContextMenuListRootRef.current.offsetHeight;
            let intLeft = 0, intTop = 0;

            if (screenW - clickX > rootW) { // available width is more than content then display right.
                intLeft = clickX;
                blnRighAligned = true;
            } else {   // available width is less than display left.
                intLeft = clickX - rootW;
                blnRighAligned = false;
                if (intLeft < 0)
                    intLeft = (screenW - rootW)
            }
            if (screenH - clickY > rootH) {
                intTop = clickY;
                blnBottomAligned = true;
            } else {
                intTop = clickY - rootH;
                blnBottomAligned = false;
                if (intTop < 0) {  // fill from the bottom.
                    intTop = (screenH - rootH);
                    blnBottomAligned = true;
                }
            }
            ContextMenuListRootRef.current.style.left = `${intLeft + 2}px`;
            ContextMenuListRootRef.current.style.top = `${intTop + 2}px`;
        }
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "blnRighAligned": blnRighAligned,
                "blnBottomAligned": blnBottomAligned
            }
        });
    };

    /**
    * @name useLayoutEffect
    * @summary To set the dimensions before the rendering happens.
    */
    useLayoutEffect(() => {
        HandleContextMenu(objContext);
        return () => {
        };
    }, []);

    /**
     * @name OnMouseOverEvent
     * @param {HTML event} event html mouse over event.
     * @param {object} objMenu menu object.
     * @summary Takes the event details and calls props.addContextMenu to add sub levels.
     */
    const OnMouseOverEvent = (objEvent, objMenu) => {
        let objDimensions = {
            intRight: objEvent.target.getBoundingClientRect().right,
            intLeft: objEvent.target.getBoundingClientRect().left,
            intTop: objEvent.target.getBoundingClientRect().top,
            intBottom: objEvent.target.getBoundingClientRect().bottom,
            blnRighAligned: objContext.state.blnRighAligned,
            blnBottomAligned: objContext.state.blnBottomAligned
        }
        let objLevel = {
            intLevel: objContext.props.ContextMenuListData.intLevel
        }
        let objClientXY = {
            clientX: parseInt(ContextMenuListRootRef.current.style.left.split("px")[0]),
            clientY: parseInt(ContextMenuListRootRef.current.style.top.split("px")[0])
        }
        objContext.props.AddSubContextMenu(objClientXY, objMenu, objDimensions, objLevel);
    };

    /**
     * @name GetPosition
     * @summary returns the {clientX,clientY} which represents the position of the contex-tmenu.
     * @returns {object} objClientYX.
     * */
    const GetPosition = () => {
        let objClientXY = {
            clientX: 0,
            clientY: 0
        };
        objClientXY.clientX = parseInt(ContextMenuListRootRef.current.style.left.split("px")[0]);
        objClientXY.clientY = parseInt(ContextMenuListRootRef.current.style.top.split("px")[0]);
        return objClientXY;
    };

    /**
     * @name RunContextEvent
     * @param {object} objMenu menu object.
     * @summary To bind event passed from the data.
     */
    const RunContextEvent = (objEvent, objMenu) => {
        objEvent.preventDefault();
        objEvent.stopPropagation();
        if (objMenu.ClickEvent && !objMenu.Disable) {
            objMenu.ClickEvent({
                ...objMenu.params,
                ["objTextResource"]: objMenu["objTextResource"],
                ["objClientXY"]: {
                    ...GetPosition()
                }
            }); // pending : review objTextResources need to be removed (added to support existing functionality for editor).
        }
    };

    /**
     * @name OnContextMenu
     * @param {HTML Event} objEvent context-menu event.
     * @summary this prevent opening of browser context-menu over the custom context-menu.
     */
    const OnContextMenu = (objEvent) => {
        objEvent.preventDefault();
        objEvent.stopPropagation();
    };

    /**
     * @name GetContent
     * @summary Render the ContextMenus.
     * @returns {JSX} Returns the JSX for the single ContextMenu.
     */
    const GetContent = () => {
        const { arrContentList } = objContext.props.ContextMenuListData;
        return (
            <ul ref={ContextMenuListRootRef} className="contextMenu" onContextMenu={objEvent => OnContextMenu(objEvent)}>
                {
                    arrContentList.map((objMenu) => {
                        let objDisableStyle = { opacity: "0.7" };
                        return objMenu.Type && objMenu.Type.toLowerCase() == "separator" ?
                            <li className="separator" />
                            :
                            objMenu.HideMenu == true ? <React.Fragment></React.Fragment> :
                            <li className="contextMenu-option" style={objMenu.Disable ? objDisableStyle : {}}
                                onMouseOver={(objEvent) => OnMouseOverEvent(objEvent, objMenu)}
                                onMouseDown={(objEvent) => RunContextEvent(objEvent, objMenu)}>
                                {objMenu.Image && objMenu.Image !== null ? <img src={props.Resource.SkinPath + objMenu.Image} /> : <React.Fragment />}
                                <span>{objMenu.Text}</span>
                                    {objContext.props.HasSubMenu(objMenu.Id) ? <img src={ArrowImage} className="has-children" /> : <React.Fragment />}
                            </li>

                    })
                }
            </ul>
        )
    };

    /**
     * @name GetContent
     * @summary call the GetContent to render the jsx.
     */
    return GetContent();
}

ContextMenuList.DynamicStyles = props => {
    var arrStyles = [props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css"];
    return arrStyles;
};

export default ContextMenuList;
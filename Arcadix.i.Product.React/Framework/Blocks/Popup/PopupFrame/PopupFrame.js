// React related imports.
import React, { useReducer, useRef, useMemo } from 'react';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Component related fies.
import * as PopupFrame_Hook from '@shared/Framework/Blocks/Popup/PopupFrame/PopupFrame_Hook';
import PopupTypeController from '@root/Framework/Blocks/Popup/PopupType/PopupTypeController';

//Helper files.
import * as Popup_TextResource from '@shared/Framework/Blocks/Popup/Popup_TextResource';

//Inline Images import
import MaximizeImage from '@inlineimage/Framework/ReactJs/Pc/Blocks/Popup/Icon_Maximize.png?inline';
import CloseImage from '@inlineimage/Framework/ReactJs/Pc/Blocks/Popup/Icon_Close.png?inline';

const PopupFrame = (props) => {

    const refFrame = useRef(null);
    const gridX = props.gridX || 1;
    const gridY = props.gridY || 1;

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, PopupFrame_Hook.GetInitialState(props));

    /**
     * @name OnMouseMove
     * @param {event} objEvent Mouse event
     * @param {object} objState State
     * @summary Sets the the position of the popup in state. i.e.,dragging the popup when the attribute of the Frame is "clicked".
     */
    const OnMouseMove = (objEvent, objState) => {
        if (refFrame.current.getAttribute('isClicked') === 'clicked') {
            console.log('OnMouseMove and dragging');
            const left = Math.trunc((objEvent.pageX - objState.relX) / gridX) * gridX;
            const top = Math.trunc((objEvent.pageY - objState.relY) / gridY) * gridY;
            if (left !== objState.left || top !== objState.top) {
                dispatch({ type: "SET_STATE", payload: { left: left, top: top } });
            }
        }
        else {
            //console.log('OnMouseMove');
        }
       // objEvent.preventDefault();
    };

    /**
     * @name OnMouseDown
     * @param {event} objEvent Mouse event
     * @summary Sets the the position of the popup in state where the header is clicked(OnMouseDown). Sets the attribute of the Frame to "clicked".So that, OnMouseMove will change the position of the popup when the attribute is set to "clicked".(dragging the popup)
     */
    const OnMouseDown = (objEvent) => {
        if (objEvent.button !== 0) return;
        const body = document.body;
        const box = refFrame.current.getBoundingClientRect();
        let relX = objEvent.pageX - (box.left + body.scrollLeft - body.clientLeft);
        let relY = objEvent.pageY - (box.top + body.scrollTop - body.clientTop);
        refFrame.current.setAttribute('isClicked', 'clicked');
        dispatch({ type: "SET_STATE", payload: { relX: relX, relY: relY } });
      //  objEvent.preventDefault();
        console.log('OnMouseDown');
    };

    /**
     * @name OnMouseUp
     * @param {event} objEvent Mouse event
     * @summary Sets the attribute of the Frame to ""
     */
    const OnMouseUp = (objEvent) => {
        refFrame.current.setAttribute('isClicked', "");
       // objEvent.preventDefault();
        console.log('OnMouseUp');
    };

    /**
    * @name ToggleMaximize
    * @summary Handles event to Toggle Mazimize/Minimize the popup
    */
    const ToggleMaximize = () => {
        if (state.Height == "100%" && state.Width == "100%") {
            dispatch({ type: "SET_STATE", payload: { Height: state.OriginalHeight, Width: state.OriginalWidth, blnIsMaximized: false } });
        }
        else {
            dispatch({ type: "SET_STATE", payload: { Height: "100%", Width: "100%", blnIsMaximized: true } });
        }
    }

    const GetContent = () => {
        let PopupComponent = useMemo(() => PopupTypeController.GetComponent(props.Meta.PopupType), []);
        if (!state.IsLoadComplete)
            PopupComponent.load().then(LoadedComponent => {
                let objDimensions = LoadedComponent.default.GetDimensions(props.Data.PopupData);
                dispatch({ type: "SET_STATE", payload: { ...objDimensions, OriginalHeight: objDimensions.Height, OriginalWidth: objDimensions.Width, IsLoadComplete: true } });
            });
        if (state.IsLoadComplete) {
            let objPopupFrameStyles = {
                position: 'relative',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                left: state.left,
                top: state.top
            };
            let objPopupContainerStyles = {
                height: state.Height,
                width: state.Width,
                position: 'relative'
            };
            return (
                <div className="modal" style={{ display: "block", zIndex: props.zIndex }} >
                    <div style={objPopupFrameStyles} ref={refFrame} onMouseMove={objEvt => OnMouseMove(objEvt, state)} onMouseUp={objEvt => OnMouseUp(objEvt)}>
                        <div className={"popup-container" + (" " + props.Meta?.PopupType?.toLowerCase() + "-parent ") + (props.Data?.PopupData?.Meta?.CssClassName?.toLowerCase() ?? "") + (state.blnIsMaximized ? " maximized " : "")} style={objPopupContainerStyles} id={'PopupParent' + props.Id}>
                            <div style={{ height: "inherit" }}>
                                <div style={{ height: "inherit" }}>
                                    <div className="popup-header" id={'Popup_Header_Id' + props.Id} >
                                        {
                                            props.Data.PopupData.Meta.ShowHeader ?
                                                <div className="popupFrame-title">
                                                    <h3>{Popup_TextResource.GetResouceText(props.Data.PopupData.Resource, "Title")}</h3>
                                                    <span>{Popup_TextResource.GetResouceText(props.Data.PopupData.Resource, "Subtitle")}</span>
                                                </div>
                                                :
                                                <React.Fragment />
                                        }           
                                        <div className="popupFrame-title-controls" onMouseDown={OnMouseDown}>
                                                {
                                                    props.Data.PopupData.Meta.ShowToggleMaximizeIcon ?
                                                    <img onClick={() => ToggleMaximize()} src={props.ImageMeta ? props.ImageMeta["MaximizeImage"] : MaximizeImage} />
                                                        :
                                                        <React.Fragment />
                                                }
                                                {
                                                    props.Data.PopupData.Meta.ShowCloseIcon ?
                                                    <img onClick={() => {
                                                        if (props.Data.PopupData && props.Data.PopupData.Events && props.Data.PopupData.Events.OnClosePopup) {
                                                            props.Data.PopupData.Events.OnClosePopup(props.Id);
                                                        }
                                                        props.Events.ClosePopup(props.Id)
                                                    }} src={props.ImageMeta ? props.ImageMeta["CloseImage"] : CloseImage} />
                                                        :
                                                        <React.Fragment />
                                                }                                                            
                                            </div>                                         
                                    </div>
                                    <PopupComponent
                                        Id={props.Id}
                                        {...props.Data.PopupData}
                                        CallBacks={{ ...props.Data.PopupData.CallBacks, GetResouceText: props.CallBacks.GetResouceText }}
                                        Events={
                                            {
                                                ...props.Data.PopupData.Events,
                                                ["CloseParentPopup"]: () => {
                                                    props.Events.ClosePopup(props.Id);
                                                }
                                                ,
                                                //["ToggleMaximize"]: () => {
                                                //    if (state.Height == "100%" && state.Width == "100%") {
                                                //        dispatch({ type: "SET_STATE", payload: { Height: state.OriginalHeight, Width: state.OriginalWidth, blnIsMaximized: false } });
                                                //    }
                                                //    else {
                                                //        dispatch({ type: "SET_STATE", payload: { Height: "100%", Width: "100%", blnIsMaximized: true } });
                                                //    }
                                                //}
                                            }
                                        }
                                        ParentProps={props.ParentProps}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return <React.Fragment />;
        }

    };

    return GetContent();
};

export default React.memo((props) => {
    return <PopupFrame {...props} />;
}, (prevProps, nextProps) => {
    return prevProps.Id === nextProps.Id;
});

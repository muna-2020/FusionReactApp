//React imports
import React, { useLayoutEffect } from 'react';

//Common Drag - Drop controls.
import DragZone from '@root/Framework/Controls/Dragdrop/DragZone/DragZone';

//Element Template
import CMSElement from '@root/Application/e.Editor/PC/Modules/6_CMSElement/CMSElement';

/**
 * @name CMSMoveableElementHolder_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSMoveableElementHeader
 * @returns {any} Common Component
 */
const CMSMoveableElementHolder_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    const RenderElement = (objValue, intCount) => {
        let objMappedElement = Context.state.ElementJson["MappedElements"].find(x => x["iElementId"] === objValue["iElement" + objValue["vElementTypeName"] + "Id"]);
        let objMappedElementProps = Callbacks.GetMappedElementProps(objMappedElement);
        let objStyle1 = {
            "position": "absolute",
            "top": objValue["Top"],
            "left": objValue["Left"],
            "maxHeight": Context.state.ElementJson["vElementJson"]["iHeight"] - objValue["Top"],
            "maxWidth": Context.state.ElementJson["vElementJson"]["iWidth"] - objValue["Left"],
            "zIndex": intCount,
            "padding-top": "20px"
        };
        let objStyle2 = {
            "height": "20px",
            "text-align": "center",
            "cursor": "move",
            "display": Context.state.ElementFocused && Context.state.ElementFocused !== null && Context.state.ElementFocused === objValue["iElement" + objValue["vElementTypeName"] + "Id"] ? "block" : "none",

        };
        let objStyle3 = {
            "outline": Context.state.ElementFocused && Context.state.ElementFocused !== null && Context.state.ElementFocused === objValue["iElement" + objValue["vElementTypeName"] + "Id"] ? "1px dotted #0072c6" : "none",
            "height": objValue["Height"] !== null ? objValue["Height"] + "px" : "calc(100% - 20px)",
            "width": objValue["Width"] !== null ? objValue["Width"] + "px" : undefined,
            "marginLeft": "1px",
            "marginRight": "1px",
        };
        if (Context.state.ElementFocused && Context.state.ElementFocused !== null && Context.state.ElementFocused === objValue["iElement" + objValue["vElementTypeName"] + "Id"]) {
            objStyle3 = {
                ...objStyle3,
                "overflow": "hidden",
                "resize": "both",
            };
        }
        return (
            <div
                className="meh-mapped-element"
                mappedelementid={objMappedElement["iElementId"]}
                style={objStyle1}
                ref={objMappedElement["DivRef"]}
                id={`${objMappedElement["iElementId"]}_mappedelement`}
                onMouseUp={Events.Resize ? (event) => { Events.Resize(event, objMappedElement, "MappedElement"); } : Events.Resize}
                onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event, objValue); } : Events.OpenContextMenu}
                onClick={Events.ActivateElement ? (event) => { Events.ActivateElement(event, objMappedElement["iElementId"]); } : Events.ActivateElement}
            >
                {
                    AppType === "Editor" ?
                        <div className="meh-move-cursor" style={objStyle2} DragDrop_DragElementType="Element">
                            {
                                Context.state.ElementFocused && Context.state.ElementFocused !== null && Context.state.ElementFocused === objValue["iElement" + objValue["vElementTypeName"] + "Id"] ?
                                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/MoveArrows.png"} /> : ""
                            }
                        </div> : ""
                }
                <div type="meh-element" style={objStyle3}>
                    <CMSElement ElementProps={objMappedElementProps} />
                </div>
            </div>
        );
    };

    /**
     * @name GetContent
     * @summary Render the body
     * @returns {any} JSX.
     */
    const GetContent = () => {
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Callbacks.GetTextElementProps(objElementHeader["iElementTextId"]);
        }
        let objStyle = {
            "height": Context.state.ElementJson["vElementJson"]["iHeight"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iHeight"],
            "width": Context.state.ElementJson["vElementJson"]["iWidth"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iWidth"],
            "border": AppType === "Editor" ? "1px dotted gray" : "none",
        };
        if (AppType === "Editor") {
            objStyle = {
                ...objStyle,
                "resize": "both",
                "overflow": "hidden"
            };
        }
        let objDragZoneProps = {
            "Meta": {
                "GroupId": Context.state.ElementJson["iElementId"],
                "Disable": Context.state.ElementFocused && Context.state.ElementFocused != null ? false : true,
                "DraggableElementType": "Element",
                "DragAreaType": "Holder",
                "DropAreaType": "Holder",
                "IsBoundRestricted": true
            },
            "Events": {
                "OnDrag": Events.OnInternalDrag,
                "OnDrop": Events.OnInternalDrop
            },
            "CallBacks": {
                "OnErrorDrag": Events.OnErrorDrag,
                "OnErrorDrop": Events.OnErrorDrop,
            },
            "Data": {}
        };
        let strClassName = "meh-containe-div";
        return (
            <div
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                className={strClassName}
                onContextMenu={Events.OpenContextMenu}
                onMouseUp={Events.Resize ? (event) => { Events.Resize(event, null, "HolderArea"); } : Events.Resize}
                apptype={AppType}
            >
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <div style={{ height: "min-content" }}>
                            <TextElement {...objTextElementProps} />
                        </div> : ""
                }
                <div style={objStyle}>
                    <DragZone {...objDragZoneProps}>
                        <div
                            ref={Context.HolderArea}
                            onDragOver={objEvent => {
                                objEvent.preventDefault();
                                objEvent.stopPropagation();
                            }}
                            onDrop={Events.OnDropFromSidebar}
                            DragDrop_DragAreaType="Holder"
                            DragDrop_DropAreaType="Holder"
                            style={{ "height": "100%", "width": "100%" }}
                        >
                            {
                                Context.state.ElementJson["vElementJson"]["Values"].map((x, intIndex) => {
                                    return RenderElement(x, intIndex + 1)
                                })
                            }
                        </div>
                    </DragZone>
                </div>
            </div>
        );
    };

    return GetContent();
};

export default CMSMoveableElementHolder_Common;

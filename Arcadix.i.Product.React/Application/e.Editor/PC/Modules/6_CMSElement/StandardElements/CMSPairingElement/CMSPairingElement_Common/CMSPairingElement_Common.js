//React imports
import React from 'react';

//Common Drag - Drop controls.
import DragZone from '@root/Framework/Controls/Dragdrop/DragZone/DragZone';

//Element Template
import CMSElement from '@root/Application/e.Editor/PC/Modules/6_CMSElement/CMSElement';
import { element } from 'prop-types';

/**
 * @name CMSPairingElement_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSPairingElement
 * @returns {any} Common Component
 */
const CMSPairingElement_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    const RenderPairingElements = (objValue, intCount) => {
        if (objValue["vPairingElementTypeName"].toLowerCase() === "circle") {
            return (
                <circle id={objValue["iPairingElementId"]}
                    ref={objValue["PairingElementRef"]}
                    DragDrop_DragElementType="Pairing-Drag-Element"
                    key={objValue["iPairingElementId"]}
                    onClick={(event) => { Events.HandlePairingCircleClick(objValue["iPairingElementId"], objValue["PairingElementRef"]) }}
                    cx={objValue["StyleProperties"].left}
                    cy={objValue["StyleProperties"].top}
                    r="5"
                    stroke="black"
                    stroke-width="2"
                    onContextMenu={(event) => { Events.OpenContextMenu(event, { "Value": objValue["iPairingElementId"], "type": "Circle" }) }}
                    fill={Context.state.iSelectedPairingElement !== objValue["iPairingElementId"] ? "#000" : "red"}
                />
            );
        }
    };

    const RenderPolylines = (objValue, index) => {
        var objPairingStart = Context.state.ElementJson.vElementJson.PairingElements.find(e => e.iPairingElementId === objValue["iStartPairingId"]);
        var objPairingEnd = Context.state.ElementJson.vElementJson.PairingElements.find(e => e.iPairingElementId === objValue["iEndPairingId"]);
        if (objPairingStart && objPairingEnd && objPairingStart["StyleProperties"] && objPairingEnd["StyleProperties"]) {
            return (
                <line
                    id={objValue["iPolylineId"]}
                    //ref={objValue["PolylineRef"]}
                    key={`polyline-${index}`}
                    x1={objPairingStart["StyleProperties"]["left"]}
                    y1={objPairingStart["StyleProperties"]["top"]} //+ parseInt(objPairingStart["PairingElementRef"].current.getAttribute("r") / 2)}
                    x2={objPairingEnd["StyleProperties"]["left"]}
                    y2={objPairingEnd["StyleProperties"]["top"]} // + parseInt(objPairingStart["PairingElementRef"].current.getAttribute("r") / 2)}
                    stroke-width="2"
                    stroke={objValue["cIsCorrectValue"] ? objValue["cIsCorrectValue"] === "Y" ? "green" : "red" : Context.state.iSelectedPairingElement !== objValue["iPolylineId"] ? "#000" : "red"}
                    onClick={(event) => { Events.HandlePolylineClick(objValue["iPolylineId"]) }}
                />
            );
        }
    }

    const RenderElements = (objValue, index, iHeaderTextId) => {
        let objStyle = {
            "position": "absolute",
            "top": objValue["StyleProperties"]["top"] - Context["Adjustment"].top,
            "left": objValue["StyleProperties"]["left"] - Context["Adjustment"].left,
            "zIndex": Context.state.cIsEditEnabled === "Y" ? index : objValue["cIsSetAsBackground"] === "Y" ? 0 : index,
        };
        if (AppType === "Editor") {
            objStyle = {
                ...objStyle,
                "padding": "2px",
                "border": Context.state.cIsEditEnabled === "Y" ? "none" : objValue["cIsSetAsBackground"] === "Y" ? "2px dotted red" : "none",
                //"boxShadow": Context.state.cIsEditEnabled === "Y" ? " 0 0 10px grey" : "none",
                "cursor": Context.state.cIsEditEnabled === "Y" ? "grab" : "pointer"
            };
        }
        if (objValue["vPairingElementTypeName"].toLowerCase() === "text") {
            if (iHeaderTextId !== objValue["iPairingElementId"]) {
                let objTextElementProps = Callbacks.GetTextElementProps(objValue["iPairingElementId"]);
                if (objValue["StyleProperties"]["width"] && objValue["StyleProperties"]["height"]) {
                    objStyle = { ...objStyle, "width": `${objValue["StyleProperties"]["width"]}px`, "height": `${objValue["StyleProperties"]["height"]}px` };
                }
                else {
                    objStyle = { ...objStyle, "width": "50px", "height": "34px" }
                }
                if (AppType === "Editor") {
                    return (
                        <div
                            className="pe-mapped-element"
                            key={objValue["iPairingElementId"]}
                            pairingelementid={objValue["iPairingElementId"]}
                            style={objStyle}
                            id={objValue["iPairingElementId"]}
                            className="pe-move-cursor"
                            DragDrop_DragElementType="Pairing-Drag-Element"
                            ref={objValue["PairingElementRef"]}
                            onMouseUp={(event) => { Events.HandleTextResizeMouseUp(event, objValue) }}
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                if (event.detail === 2) {
                                    Events.RemoveDrag(objValue, objValue["vPairingElementTypeName"].toLowerCase());
                                    objValue["PairingElementRef"].current.style.overflow = "hidden";
                                    objValue["PairingElementRef"].current.style.resize = "both";
                                    objValue["PairingElementRef"].current.style.boxShadow = "0 0 10px grey";
                                    objValue["PairingElementRef"].current.setAttribute("TextEditEnabled", true);
                                    return;
                                }
                                objValue["PairingElementRef"].current.style.overflow = "none";
                                objValue["PairingElementRef"].current.style.resize = "none";
                                objValue["PairingElementRef"].current.style.boxShadow = "none";
                                Events.AddDrag(objValue, "Pairing-Drag-Element");
                            }}
                        >
                            <TextElement {...objTextElementProps} />
                        </div>
                    );
                }
                else {
                    return (
                        <div
                            className="pe-mapped-element"
                            key={objValue["iPairingElementId"]}
                            pairingelementid={objValue["iPairingElementId"]}
                            style={objStyle}
                            id={objValue["iPairingElementId"]}
                            className="pe-move-cursor"
                            DragDrop_DragElementType="Pairing-Drag-Element"
                            ref={objValue["PairingElementRef"]}
                        >
                            <TextElement {...objTextElementProps} />
                        </div>
                    );
                }
            }
        }
        else if (objValue["vPairingElementTypeName"].toLowerCase() === "image") {
            let objElement = Context.state.ElementJson["MappedElements"].find(x => x["iElementId"] === objValue["iPairingElementId"]);
            let objElementProps = Callbacks.GetMappedElementProps(objElement);
            objElementProps = {
                ...objElementProps,
                "ShowEditOptions_FromParent": () => {
                    Events.RemoveDrag(objValue, objValue["vPairingElementTypeName"].toLowerCase());
                },
                "RemoveEditOptions_FromParent": () => {
                    Events.AddDrag(objValue, "Pairing-Drag-Element");
                }
            }
            return (
                <div ref={objValue["PairingElementRef"]}
                    className="pe-mapped-element"
                    key={objValue["iPairingElementId"]}
                    pairingelementid={objValue["iPairingElementId"]}
                    style={objStyle}
                    id={objValue["iPairingElementId"]}
                    className="pe-move-cursor"
                    DragDrop_DragElementType="Pairing-Drag-Element"
                >
                    <CMSElement draggable={false} ElementProps={objElementProps} />
                </div>
            );
        }
    }

    /**
     * @name GetContent
     * @summary Render the body
     * @returns {any} JSX.
     */
    const GetContent = () => {
        let objTextElementProps = {}; let iHeaderTextId = -1;
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            iHeaderTextId = objElementHeader["iElementTextId"];
            objTextElementProps = Callbacks.GetTextElementProps(objElementHeader["iElementTextId"]);
        }
        let objStyle = {
            "height": Context.state.ElementJson["vElementJson"]["iHeight"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iHeight"],
            "width": Context.state.ElementJson["vElementJson"]["iWidth"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iWidth"],
            "border": AppType === "Editor" ? Context.state.cIsEditEnabled === "Y" ? "1px dotted red" : "1px dotted gray" : "none",
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
                "Disable": AppType === "Editor" ? false : true,
                "DraggableElementType": "Pairing-Drag-Element",
                "DragAreaType": "Pairing-Drag-Container",
                "DropAreaType": "Pairing-Drag-Container",
                "IsBoundRestricted": true
            },
            "Events": {
                "OnDrag": Events.OnInternalDrag,
                "OnDrop": Events.OnInternalDrop
            },
            "CallBacks": {
                "ErrorOnDrop": Events.ErrorOnDrop,
                "OnErrorDrag": Events.OnErrorDrag
            },
            "Data": {}
        };
        return (
            <div className="pe-container-div"
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}>
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? <TextElement {...objTextElementProps} /> : null
                }
                <button className="pe-reset-button" onClick={() => { Events.ResetPairingElementValues() }}> Reset </button>
                <div onContextMenu={(event) => { Events.OpenContextMenu(event, null) }}
                    className="pe-container-div"
                    style={{ "height": "calc(100% - 32px)" }}
                    //onMouseUp={Events.Resize ? (event) => { Events.Resize(event, null, "HolderArea"); } : (event) => { event.preventDefault() }}
                    onClick={Events.HandlePairingContainerClick ? (event) => { Events.HandlePairingContainerClick(event) } : (event) => { event.preventDefault() }}
                    apptype={AppType}
                >
                    <div style={objStyle} ref={Context.HolderArea}>
                        <DragZone {...objDragZoneProps}>
                            <div
                                onDragOver={objEvent => {
                                    objEvent.preventDefault();
                                    objEvent.stopPropagation();
                                }}
                                DragDrop_DragAreaType="Pairing-Drag-Container"
                                DragDrop_DropAreaType="Pairing-Drag-Container"
                                style={{ "height": "100%", "width": "100%", "position": "relative" }}>
                                {
                                    Context.state.ElementJson["vElementJson"]["PairingElements"].map((x, intIndex) => {
                                        return RenderElements(x, intIndex + 3, iHeaderTextId)
                                    })
                                }
                                <svg width="100%" height="100%" style={{ "zIndex": 2, "position": "relative" }}>
                                    {
                                        Context.state.ElementJson["vElementJson"]["Values"].map((x, intIndex) => {
                                            return RenderPolylines(x, intIndex + 1)
                                        })
                                    }
                                    {
                                        Context.state.ElementJson["vElementJson"]["PairingElements"].map((x, intIndex) => {
                                            return RenderPairingElements(x, intIndex + 1)
                                        })
                                    }
                                </svg>
                            </div>
                        </DragZone>
                    </div>
                </div>
            </div>
        );
    };

    return GetContent();
};

export default CMSPairingElement_Common;

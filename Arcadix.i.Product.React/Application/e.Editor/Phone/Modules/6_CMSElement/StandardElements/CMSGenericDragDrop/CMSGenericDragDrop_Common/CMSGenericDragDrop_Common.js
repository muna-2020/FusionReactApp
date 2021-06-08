//React imports
import React from 'react';

//Common Drag - Drop controls.
import DragZone from '@root/Framework/Controls/Dragdrop/DragZone/DragZone';

//Element Template
import CMSElement from '@root/Application/e.Editor/PC/Modules/6_CMSElement/CMSElement';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name CMSGenericDragDrop_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSGenericDragDrop
 * @returns {any} Common Component
 */
const CMSGenericDragDrop_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    const RenderDragobject = (objValue, intCount, blnShowSolution = false) => {
        let objMappedElement = Context.state.ElementJson["MappedElements"].find(x => x["iElementId"] === objValue["iElement" + objValue["vElementTypeName"] + "Id"]);
        let objMappedElementProps = Callbacks.GetMappedElementProps(objMappedElement);
        let objStyle = {
            "position": !blnShowSolution ? "absolute" : "relative",
            "top": objValue["Top"],
            "left": objValue["Left"],
            "zIndex": intCount
        };
        let strClassName = "gdd-object";
        if (objValue["cIsDraggable"] === "Y") {
            strClassName += " gdd-drag-object";
        }
        if (objValue["vElementTypeName"].toLowerCase() === "image") {
            let strPath = `${Context.props.JConfiguration.WebDataPath}Repo/Image/${Context.props.JConfiguration.MainClientId}/${objMappedElement.iElementId}_Image_${objMappedElement.vElementJson["iImageFileVersion"]}.${objMappedElement.vElementJson["vImageType"]}`;
            if (AppType === "Editor") {
                objMappedElementProps = {
                    ...objMappedElementProps,
                    "ShowEditOptions_FromParent": () => {
                        Events.RemoveDrag(objValue, "image");
                    },
                    "RemoveEditOptions_FromParent": () => {
                        Events.AddDrag(objValue, "image");
                    }
                };
                if (objValue["cIsDraggable"] === "Y") {
                    objStyle = {
                        ...objStyle,
                        "outline": "2px dotted red"
                    };
                }
            }
            let objStyle2 = {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": "100%",
                "height": "100%"
            };
            return (
                AppType === "Editor" || objValue["cIsDraggable"] === "N" || objValue["cIsDraggable"] === "Y" && objValue["cIsUsed"] === "N" ?
                    <div
                        className={strClassName}
                        style={objStyle}
                        ref={objValue["DivRef"]}
                        gdd_id={!blnShowSolution ? objValue["iElementGenericDragObjectId"] : undefined}
                        gdd_type={!blnShowSolution ? "drag_object" : undefined}
                        onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event, objValue) } : Events.OpenContextMenu}
                        onClick={Events.ActivateObject ? (event) => { Events.ActivateObject(event, "DragObejct", objValue["DivRef"].current) } : Events.ActivateObject}
                        DragDrop_DisplayGhost={!blnShowSolution ? objValue["cIsDraggable"] === "Y" && objValue["cIsUsed"] === "N" ? "Y" : null : null}
                        DragDrop_DragElementType={!blnShowSolution ? "GDDElement" : undefined}
                    >
                        {/* <img src={strPath} /> */}
                        <CMSElement ElementProps={objMappedElementProps} />
                        {/* < div
                            style={objStyle2}
                            gdd_id={objValue["iElementGenericDragObjectId"]}
                            gdd_type="drag_object"
                            ghost={objValue["cIsDraggable"] === "Y" && objValue["cIsUsed"] === "N" ? "Y" : null}
                            DragDrop_DragElementType="GDDElement"
                        /> */}
                    </div> : ""
            );
        }
        else {
            objStyle = {
                ...objStyle,
                "width": objValue["iWidth"],
                "height": objValue["iHeight"],
                "overflow": "hidden"
            };
            if (AppType === "Editor") {
                objMappedElementProps = {
                    ...objMappedElementProps,
                    "ShowEditOptions_FromParent": () => {
                        Events.RemoveDrag(objValue, "text");
                    },
                    "RemoveEditOptions_FromParent": () => {
                        Events.AddDrag(objValue, "text");
                    }
                };
            }
            return (
                <div
                    className={strClassName}
                    style={objStyle}
                    ref={objValue["DivRef"]}
                    gdd_id={AppType === "Editor" ? objValue["iElementGenericDragObjectId"] : undefined}
                    gdd_type={AppType === "Editor" ? "drag_object" : undefined}
                    onClick={Events.ActivateObject ? (event) => { Events.ActivateObject(event, "DragObejct", objValue["DivRef"].current) } : Events.ActivateObject}
                    DragDrop_DragElementType={AppType === "Editor" ? "GDDElement" : undefined}
                >
                    <CMSElement ElementProps={objMappedElementProps} />
                </div>
            );
        }
    };

    const RenderDropobject = (objValue, intCount, blnShowSolution = false) => {
        let objStyle = {
            "position": !blnShowSolution ? "absolute" : "relative",
            "top": objValue["Top"],
            "left": objValue["Left"],
            "height": objValue["iHeight"],
            "width": objValue["iWidth"],
            "zIndex": intCount,
            "border": AppType === "Editor" ? "2px dotted green" : "1px dotted green",
            "overflow": "hidden"
        };
        let objStyle2 = {
            "width": "100%",
            "height": "100%",
            "padding": "6px"
        };
        return (
            <div
                style={objStyle}
                ref={objValue["DivRef"]}
                className="gdd-drop-obejct"
                gdd_id={!blnShowSolution ? objValue["iElementGenericDropObjectId"] : undefined}
                gdd_type={!blnShowSolution ? "drop_object" : undefined}
                DragDrop_DragElementType={AppType === "Editor" && objValue["DraggedObjects"].length === 0 ? "GDDElement" : undefined}
                onClick={Events.ActivateObject ? (event) => { Events.AddDrag(objValue, "DropObejct"); Events.ActivateObject(event, "DropObejct", objValue["DivRef"].current); } : Events.ActivateObject}
                onDoubleClick={Events.RemoveDrag ? (event) => { Events.RemoveDrag(objValue, "DropObejct") } : Events.ActivateObject}
            >
                {
                    objValue["DraggedObjects"].map(y => {
                        let objDragObject = Context.state.ElementJson["vElementJson"]["DragObjects"].find(x => x["iElementGenericDragObjectId"] === y);
                        let objMappedElement = Context.state.ElementJson["MappedElements"].find(x => x["iElementId"] === objDragObject["iElement" + objDragObject["vElementTypeName"] + "Id"]);
                        let strPath = `${Context.props.JConfiguration.WebDataPath}Repo/Image/${Context.props.JConfiguration.MainClientId}/${objMappedElement.iElementId}_Image_${objMappedElement.vElementJson["iImageFileVersion"]}.${objMappedElement.vElementJson["vImageType"]}`;
                        return (
                            <span
                                style={{ "opacity": "0.8" }}
                                gdd_dropobjectid={!blnShowSolution ? objValue["iElementGenericDropObjectId"] : undefined}
                                gdd_id={!blnShowSolution ? objDragObject["iElementGenericDragObjectId"] : undefined}
                                gdd_type={!blnShowSolution ? "drag_object" : undefined}
                                DragDrop_DragElementType={!blnShowSolution ? "GDDElement" : undefined}
                            >
                                <img src={strPath} />
                            </span>
                        );
                    })
                }
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
            "outline": AppType === "Editor" ? "1px dotted gray" : "none",
            "position": "relative"
        };
        let objSolutionDivStyles = {
            "margin-top": "5px",
            "height": Context.state.ElementJson["vElementJson"]["iHeight"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iHeight"],
            "width": Context.state.ElementJson["vElementJson"]["iWidth"] === null ? "100%" : Context.state.ElementJson["vElementJson"]["iWidth"],
            "outline": "2px solid green"
        };
        let blnShowSolution = false;
        if (Context.state.ElementStatus !== null && Context.state.ViewComparison) {
            objStyle = {
                ...objStyle,
                "outline": Context.state.ElementStatus === 1 ? "2px solid green" : "2px solid red"
            };
        }
        if (AppType === "Editor") {
            objStyle = {
                ...objStyle,
                "resize": "both",
                "overflow": "hidden"
            };
        }
        else {
            if (Context.state.ViewSolution || (Context.state.ElementStatus !== null && Context.state.ViewComparison && (Context.state.ElementStatus === 2 || Context.state.ElementStatus === 3))) {
                blnShowSolution = true;
            }
        }
        let objDragZoneProps = {
            "Meta": {
                "GroupId": Context.state.ElementJson["iElementId"],
                "DraggableElementType": "GDDElement",
                "DragAreaType": "GDDHolder",
                "DropAreaType": "GDDHolder",
                "IsBoundRestricted": true
            },
            "Events": {
                "OnDrag": Events.OnInternalDrag,
                "OnDrop": Events.OnInternalDrop
            },
            "CallBacks": {
                "OnErrorDrag": Events.ErrorOnDrag,
                "ErrorOnDrop": Events.ErrorOnDrop
            },
            "Data": {}
        };
        let strClassName = "gdd-container-div";
        return (
            <div
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                className={strClassName}
                onContextMenu={Events.OpenContextMenu}
                onMouseUp={Events.ActivateObject ? (event) => { Events.ActivateObject(event, "HolderArea"); } : Events.Resize}
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
                        {
                            AppType === "Editor" ?
                                <div
                                    ref={Context.HolderArea}
                                    className="gdd-holder-area"
                                    DragDrop_DragAreaType="GDDHolder"
                                    DragDrop_DropAreaType="GDDHolder"
                                    onDragOver={(event) => { event.preventDefault(); }}
                                    onDrop={(event) => { event.preventDefault(); Events.OnDrop(event.dataTransfer.getData("ActiveDragElement_GenericDragDrop")); }}
                                >
                                    {
                                        Context.state.ElementJson["vElementJson"]["DragObjects"].map((x, intIndex) => {
                                            return RenderDragobject(x, intIndex + 1)
                                        })
                                    }
                                    {
                                        Context.state.ElementJson["vElementJson"]["DropObjects"].map((x, intIndex) => {
                                            return RenderDropobject(x, intIndex + 1)
                                        })
                                    }
                                </div>
                                :
                                <div
                                    ref={Context.HolderArea}
                                    className="gdd-holder-area"
                                    DragDrop_DragAreaType="GDDHolder"
                                    DragDrop_DropAreaType="GDDHolder"
                                >
                                    {
                                        Context.state.ElementJson["vElementJson"]["DragObjects"].map((x, intIndex) => {
                                            return RenderDragobject(x, intIndex + 1)
                                        })
                                    }
                                    {
                                        Context.state.ElementJson["vElementJson"]["DropObjects"].map((x, intIndex) => {
                                            return RenderDropobject(x, intIndex + 1)
                                        })
                                    }
                                </div>
                        }
                    </DragZone>
                </div>
                {
                    blnShowSolution ?
                        <div className="gdd-holder-area" style={objSolutionDivStyles}>
                            {
                                Context.state.ElementJsonWithAnswer["vElementJson"]["DragObjects"].map((x, intIndex) => {
                                    return RenderDragobject(x, intIndex + 1, blnShowSolution)
                                })
                            }
                            {
                                Context.state.ElementJsonWithAnswer["vElementJson"]["DropObjects"].map((x, intIndex) => {
                                    return RenderDropobject(x, intIndex + 1, blnShowSolution)
                                })
                            }
                        </div>
                        : ""
                }
            </div>
        );
    };

    return GetContent();
};

export default CMSGenericDragDrop_Common;

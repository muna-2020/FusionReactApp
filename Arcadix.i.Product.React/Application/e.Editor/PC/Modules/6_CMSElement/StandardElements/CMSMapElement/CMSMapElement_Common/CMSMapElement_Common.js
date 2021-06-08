//React imports
import React from 'react';

//Common Drag - Drop controls.
// import DragZone from '@root/Framework/Controls/Dragdrop/DragZone/DragZone';

/**
 * @name CMSMapElement_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSMapElement
 * @returns {any} returns the cms MapElement's JSX
 */
const CMSMapElement_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary Render the MapElement body
     * @returns {any} Returns the JSX for the MapElement.
     */
    const GetContent = () => {
        let objTextElementProps = {};
        Context.state.ElementJson["vElementJson"]["HeaderValues"].map(objTempHeaderValue => {
            if (objTempHeaderValue["vHeaderType"] === "ElementHeader") {
                if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
                    objTextElementProps = Callbacks.GetTextElementProps(objTempHeaderValue["iElementTextId"]);
                }
            }
        });
        let objMapValue = Context.state.ElementJson["vElementJson"]["Values"].find(y => y["UseAs"].toLowerCase() === "map");
        let objPenValue = Context.state.ElementJson["vElementJson"]["Values"].find(y => y["UseAs"].toLowerCase() === "pen");
        let objMapImage = { ...Context.state.ElementJson["MappedElements"].find(x => x["iElementId"] === objMapValue["iElementImageId"]) };
        let objPenImage = { ...Context.state.ElementJson["MappedElements"].find(x => x["iElementId"] === objPenValue["iElementImageId"]) };
        let strMapImagePath = `${Context.props.JConfiguration.WebDataPath}Repo/Image/${Context.props.JConfiguration.MainClientId}/${objMapImage["iElementId"]}_Image_${objMapImage["vElementJson"]["iImageFileVersion"]}.${objMapImage["vElementJson"]["vImageType"]}`.trim();
        let strPenImagePath = `${Context.props.JConfiguration.WebDataPath}Repo/Image/${Context.props.JConfiguration.MainClientId}/${objPenImage["iElementId"]}_Image_${objPenImage["vElementJson"]["iImageFileVersion"]}.${objPenImage["vElementJson"]["vImageType"]}`.trim();
        let blnShowSolution = false;
        if (Context.state.ViewSolution || (Context.state.ElementStatus !== null && Context.state.ViewComparison && (Context.state.ElementStatus === 2 || Context.state.ElementStatus === 3))) {
            blnShowSolution = true;
        }
        // let objDragZoneProps = {
        //     "Meta": {
        //         "GroupId": Context.state.ElementJson["iElementId"],
        //         "DraggableElementType": "MapElement_Pen",
        //         "DragAreaType": "MapElement_ConatinerDiv",
        //         "DropAreaType": "MapElement_ConatinerDiv",
        //         "IsBoundRestricted": true
        //     },
        //     "Events": {
        //         "OnDragStart": Events.OnDragStart,
        //         "OnDrag": Events.OnDrag,
        //         "OnDrop": Events.OnDrop
        //     },
        //     "CallBacks": {},
        //     "Data": {
        //         "iElementId": Context.state.ElementJson["iElementId"],
        //         "iElementTypeId": Context.state.ElementJson["iElementTypeId"]
        //     }
        // };
        return (
            <div
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                className="map-element-main"
                onContextMenu={(event) => { event.preventDefault(); event.stopPropagation(); }}
            >
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                {
                    AppType === "Editor" || (AppType === "TestApplication" && Context.state.ElementJson["vElementJson"]["cIsTaskType"] === "Y") ?
                        <div onContextMenu={(event) => { event.preventDefault(); event.stopPropagation(); }} style={{ marginBottom: "10px" }}>
                            <span className="btn" onClick={() => { Events.OnReset(); }}>
                                Clear
                            </span>
                        </div> : ""
                }
                <div
                    className="map-element-container"
                    onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event); } : Events.OpenContextMenu}
                >
                    {
                        Context.state.ElementStatus !== null && Context.state.ViewComparison ?
                            Context.state.ElementStatus === 2 || Context.state.ElementStatus === 3 ?
                                <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/FlashWrong.gif"} alt="Worng" />
                                : <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/FlashRight.gif"} alt="Correct" />
                            : ""
                    }
                    {/* <DragZone {...objDragZoneProps}> */}
                    <div
                        DragDrop_DragAreaType="MapElement_ConatinerDiv"
                        DragDrop_DropAreaType="MapElement_ConatinerDiv"
                        style={{
                            position: "relative",
                        }}
                    >
                        {
                            AppType === "Editor" || (AppType === "TestApplication" && Context.state.ElementJson["vElementJson"]["cIsTaskType"] === "Y") ?
                                <img
                                    ref={Context["MarkerImage_Ref"]}
                                    style={{
                                        position: "absolute",
                                        top: objPenValue["Y"],
                                        left: objPenValue["X"],
                                        height: objPenImage["vElementJson"]["iElementImageHeight"],
                                        width: objPenImage["vElementJson"]["iElementImageWidth"],
                                        zIndex: 2,
                                    }}
                                    src={strPenImagePath}
                                    DragDrop_DragElementType="MapElement_Pen"
                                    onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event); } : Events.OpenContextMenu}
                                /> : ""
                        }
                        <canvas
                            ref={Context["Canvas_Ref"]}
                            height={objMapImage["vElementJson"]["iElementImageHeight"]}
                            width={objMapImage["vElementJson"]["iElementImageWidth"]}
                            style={{
                                position: "absolute",
                                border: "1px solid black",
                                zIndex: 3,
                            }}
                            onMouseDown={Events.OnMouseDown}
                            onMouseOut={Events.OnMouseUp}
                        />
                        <img
                            ref={Context["MapImage_Ref"]}
                            style={{
                                zIndex: 1,
                                height: objMapImage["vElementJson"]["iElementImageHeight"],
                                width: objMapImage["vElementJson"]["iElementImageWidth"],
                            }}
                            src={strMapImagePath}
                        />
                    </div>
                    {/* </DragZone> */}
                </div>
                {
                    blnShowSolution ?
                        <div
                            className="map-element-container map-element-solution"
                            onContextMenu={(event) => { event.preventDefault(); event.stopPropagation(); }}
                        >
                            <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/FlashRight.gif"} alt="Correct" />
                            <div>
                                <canvas
                                    ref={Context["CanvasSolution_Ref"]}
                                    height={objMapImage["vElementJson"]["iElementImageHeight"]}
                                    width={objMapImage["vElementJson"]["iElementImageWidth"]}
                                    style={{
                                        position: "absolute",
                                        border: "1px solid black",
                                    }}
                                    onMouseDown={Events.OnMouseDown}
                                />
                                <img
                                    ref={Context["ImageSolution_Ref"]}
                                    src={strMapImagePath}
                                    style={{
                                        height: objMapImage["vElementJson"]["iElementImageHeight"],
                                        width: objMapImage["vElementJson"]["iElementImageWidth"],
                                    }}
                                />
                            </div>
                        </div> : ""
                }
            </div>
        );
    };

    return GetContent();
};

export default CMSMapElement_Common;

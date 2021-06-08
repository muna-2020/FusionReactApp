//React imports
import React from "react";

//Module related fies.
import InteractionElementsTab_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionElementsTab_ModuleProcessor";
import * as InteractionElementsTab_MetaData from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionElementsTab_MetaData";

// Component used. 
import Slider from '@root/Framework/Controls/Slider/Slider';

//Application State classes/methods
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

/**
 * @name InterSectionElement
 * @param {object} props props from parent
 * @summary Contains InterSection elements JSX
 * @returns {any} InteractionElements
 */
const InteractionElements = (props) => {

    /**
     * @summary Combines the props, and other objects that are required throughout the component.
     * */
    let objContext = { props, "InteractionElementsTab_ModuleProcessor": new InteractionElementsTab_ModuleProcessor() };

    /**
     * @name SetAnswersFromTextMarker
     * @summary Mark the right and wrong answers by using the textmarker json.
     * @param {any} strOperation Set right or wrong answer.
     */
    const SetAnswersFromTextMarker = async (strOperation) => {
        const objRef = EditorState.GetReference("ActiveTextMark");
        if (objRef && objRef.current && objRef.current.GetElementJson) {
            let objElementJson = await objRef.current.GetElementJson(false);
            if (objElementJson["vElementTypeName"].toUpperCase() === "TEXTMARK") {
                objElementJson.Ref.current.SetAnswer(strOperation);
            }
        }
    };

    /**
     * @name SetPolylineElements
     * @summary Sends the clicked element to the polyline.
     * @param {string} strElementType Polyline element type.
     */
    const SetPolylineElements = (strElementType) => {
        const objRef = EditorState.GetReference("ActivePolyline");
        if (objRef && objRef.current) {
            objRef.current.ElementClicked(strElementType);
        }
    };

    const GenericDragDropHandle = (strOperation) => {
        const objRef = EditorState.GetReference("ActiveGenericDragDrop");
        if (objRef && objRef.current && objRef.current.GenericDragDropHandle) {
            objRef.current.GenericDragDropHandle(strOperation);
        }
    };

    /**
     * @param {object} objEvent drage event.
     * @param {string} strType element type.
     * @summary set dataTranser value with key ActiveDragElement and type of element being dragged.
     */
    const OnElementDragStart = (objEvent, strType) => {
        objEvent.dataTransfer.setData("ActiveDragElement", strType);
    };

    const OnDragGenericDragDropElement = (event, strElementType) => {
        event.dataTransfer.setData("ActiveDragElement_GenericDragDrop", strElementType);
    };

    /**
     * @name GetContent
     * @sumamry contain the JSX of the component.
     * @returns {any} JSX
     * */
    const GetContent = () => {
        let objTextResource = EditorState.GetProperty("CommonTextResource");
        let objImageMeta = InteractionElementsTab_MetaData.GetImageMeta();
        return (
            <div className="office-ribbon interaction-elements editor-office-ribbon" id="EditorOfficeRibbon" style={{ overflow: 'hidden' }}>
                <div className="ribbon-slider" id="EditorSliderDiv">
                    <div className="type">
                        <div className="items" onClick={(event) => objContext.InteractionElementsTab_ModuleProcessor.OnTypeClick(objContext)}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.TypeImage
                                }}
                                ParentProps={props}
                            />
                            <span>Type</span>
                        </div>
                    </div>
                    <div className="formular">
                        <div className="rows-and-columns-flex">
                            <div
                                className="items"
                                onClick={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputTextDragStart("CLICKED")}
                                onDragStart={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputTextDragStart("DRAGGED")}
                                draggable={true}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.TextFieldImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Textfield</span>
                            </div>
                            <div
                                className="items"
                                onClick={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputWordOnlyDragStart("CLICKED")}
                                onDragStart={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputWordOnlyDragStart("DRAGGED")}
                                draggable={true}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Field_WordImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Wordfield</span>
                            </div>
                            <div
                                className="items"
                                onClick={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputNumberOnlyDragStart("CLICKED")}
                                onDragStart={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputNumberOnlyDragStart("DRAGGED")}
                                draggable={true}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Field_NumbersImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Numberfield</span>
                            </div>

                            <div
                                className="items"
                                onClick={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputLetterOnlyDragStart("CLICKED")}
                                onDragStart={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputLetterOnlyDragStart("DRAGGED")}
                                draggable={true}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Field_LettersImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Letterfield</span>
                            </div>
                            <div
                                className="items"
                                onClick={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnDropdownDragStart("CLICKED")}
                                onDragStart={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnDropdownDragStart("DRAGGED")}
                                draggable={true}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.DropdownImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Dropdownlist</span>
                            </div>

                            <div
                                className="items"
                                onClick={objEvt => objContext.InteractionElementsTab_ModuleProcessor.AddTextAreaJson("textarea", "CLICKED")}
                                onDragStart={objEvt => objContext.InteractionElementsTab_ModuleProcessor.AddTextAreaJson("DRAGGED")}
                                draggable={true}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.TextareaImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Textarea</span>
                            </div>
                            <div
                                className="items"
                                onClick={objEvt => objContext.InteractionElementsTab_ModuleProcessor.AddTextAreaJson("dictation", "CLICKED")}
                                onDragStart={objEvt => objContext.InteractionElementsTab_ModuleProcessor.AddTextAreaJson("dictation", "DRAGGED")}
                                draggable={true}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.DictationImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Diktat</span>
                            </div>
                        </div>
                        <div className="bottom-text">
                            Form
                        </div>
                    </div>

                    <div className="link punctuation-mark">
                        <div className="link-block">
                            <div
                                className="items"
                                onClick={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputDotFieldDragStart("CLICKED")}
                                onDragStart={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputDotFieldDragStart("DRAGGED")}
                                draggable={true}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.InsertLinkImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Point</span>
                            </div>
                            <div
                                className="items"
                                onClick={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputCommaFieldDragStart("CLICKED")}
                                onDragStart={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputCommaFieldDragStart("DRAGGED")}
                                draggable={true}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.EmailImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Comma</span>
                            </div>
                            <div
                                className="items"
                                onClick={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputSemiColonFieldDragStart("CLICKED")}
                                onDragStart={objEvt => objContext.InteractionElementsTab_ModuleProcessor.OnInputSemiColonFieldDragStart("DRAGGED")}
                                draggable={true}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.DeleteLinkImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Semicolon</span>
                            </div>
                        </div>
                        <div className="bottom-text">
                            Punctuationmarks
                           </div>
                    </div>

                    <div className="font hotspot">
                        <div className="font-block">
                            <div className="items" onClick={() => { objContext.InteractionElementsTab_ModuleProcessor.SaveSelectedShape("Rectangle") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.RectangleImage
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={() => { objContext.InteractionElementsTab_ModuleProcessor.SaveSelectedShape("Polygon") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.PolygonImage
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                        </div>
                        <div className="font-block">
                            <div className="items" onClick={() => { objContext.InteractionElementsTab_ModuleProcessor.SaveSelectedShape("Ellipse") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.EllipseImage
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={() => { objContext.InteractionElementsTab_ModuleProcessor.SaveSelectedShape("Remove") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.RemoveHotspotImage
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                        </div>
                        <div className="bottom-text">
                            Hotspot
                        </div>
                    </div>

                    <div className="font hotspot text-fragment">
                        <div className="font-block">
                            <div className="items" onClick={() => { SetAnswersFromTextMarker("TextCorrect") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.TextCorrectioneImage
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={() => { SetAnswersFromTextMarker("WordIncorrect") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.WordIncorrectImage
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                        </div>
                        <div className="font-block">
                            <div className="items" onClick={() => { SetAnswersFromTextMarker("TextIncorrect") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.TextIncorrectImage
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={() => { SetAnswersFromTextMarker("Remove") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.ValidateImage
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                        </div>
                        <div className="bottom-text">
                            Textfragments
                       </div>
                    </div>

                    <div className="font hotspot text-fragment polyline">
                        <div className="font-block">
                            <div className="items" onClick={() => { objContext.InteractionElementsTab_ModuleProcessor.SetPolylineElements("Text") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.TextPairingImage,
                                    }}
                                    Meta={{
                                        Draggable: false
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={() => { objContext.InteractionElementsTab_ModuleProcessor.SetPolylineElements("Circle") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.PairingCircleImage,
                                    }}
                                    Meta={{
                                        Draggable: false
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={() => { objContext.InteractionElementsTab_ModuleProcessor.SetPolylineElements("Delete") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.PairingDeleteImage,
                                    }}
                                    Meta={{
                                        Draggable: false
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                        </div>
                        <div className="font-block">
                            <div className="items" onClick={() => { objContext.InteractionElementsTab_ModuleProcessor.SetPolylineElements("Image") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.PairingImageImage,
                                    }}
                                    Meta={{
                                        Draggable: false
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={() => { objContext.InteractionElementsTab_ModuleProcessor.SetPolylineElements("Line") }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.PairingLineImage,
                                    }}
                                    Meta={{
                                        Draggable: false
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items"></div>
                        </div>
                        <div className="bottom-text">
                            Pairing Element
                        </div>
                    </div>

                    <div className="font hotspot text-fragment  polyline drag-drop">
                        <div className="font-block">
                            <div className="items"
                                onDragStart={(event) => OnDragGenericDragDropElement(event, "IMAGE")}
                                draggable={true}
                                onClick={(event) => { event.preventDefault(); event.stopPropagation(); GenericDragDropHandle("AddImage"); }}
                            >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.AddImageImage,
                                        ToolTipText: objContext.InteractionElementsTab_ModuleProcessor.TextFormatter(objTextResource, "OfficeRibbon_InteractionElement_DragDropGeneric_Image")
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={(event) => { event.preventDefault(); event.stopPropagation(); GenericDragDropHandle("SetDrag"); }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.SetDragImage,
                                        ToolTipText: objContext.InteractionElementsTab_ModuleProcessor.TextFormatter(objTextResource, "OfficeRibbon_InteractionElement_DragDropGeneric_DragObject")
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={(event) => { event.preventDefault(); event.stopPropagation(); GenericDragDropHandle("Clear"); }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.DragDropDeactivateImage,
                                        ToolTipText: objContext.InteractionElementsTab_ModuleProcessor.TextFormatter(objTextResource, "OfficeRibbon_InteractionElement_DragDropGeneric_ClearDrag")
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                        </div>
                        <div className="font-block">
                            <div
                                className="items"
                                onDragStart={(event) => OnDragGenericDragDropElement(event, "TEXT")}
                                draggable={true}
                                onClick={(event) => { event.preventDefault(); event.stopPropagation(); GenericDragDropHandle("AddText"); }}
                            >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.AddTextImage,
                                        ToolTipText: objContext.InteractionElementsTab_ModuleProcessor.TextFormatter(objTextResource, "OfficeRibbon_InteractionElement_DragDropGeneric_Text")
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={(event) => { event.preventDefault(); event.stopPropagation(); GenericDragDropHandle("SetDrop"); }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.SetDropImage,
                                        ToolTipText: objContext.InteractionElementsTab_ModuleProcessor.TextFormatter(objTextResource, "OfficeRibbon_InteractionElement_DragDropGeneric_DropObject")
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={(event) => { event.preventDefault(); event.stopPropagation(); GenericDragDropHandle("DeleteDropArea"); }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.DeleteDragDropImage,
                                        ToolTipText: objContext.InteractionElementsTab_ModuleProcessor.TextFormatter(objTextResource, "OfficeRibbon_InteractionElement_DragDropGeneric_ClearDrop")
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                        </div>
                        <div className="bottom-text">
                            {objContext.InteractionElementsTab_ModuleProcessor.TextFormatter(objTextResource, "OfficeRibbon_InteractionElement_DragDropGeneric")}
                        </div>
                    </div>

                    {/*  
                     <div className="formular">
                        <div className="rows-and-columns-flex">
                            <div className="items">
                                <img src={
                                    props.JConfiguration.IntranetSkinPath +
                                    "/Images/editor/ImageBringForward.svg"} alt="" />
                                <span>Bild vorrücken</span>
                            </div>
                            <div className="items">
                                <img src={
                                    props.JConfiguration.IntranetSkinPath +
                                    "/Images/editor/ImageSendBackward.svg"} alt="" />
                                <span>Bild zurück</span>
                            </div>
                        </div>
                    </div>
                    */}
                    <div className="formular math">
                        <div className="rows-and-columns-flex">
                            <div className="items"
                                draggable={true} onDragStart={objEvent => OnElementDragStart(objEvent, "Addition")}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.AdditionImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Addition</span>
                            </div>
                            <div className="items"
                                draggable={true} onDragStart={objEvent => OnElementDragStart(objEvent, "Subtraction")}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.SubtractionImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Subtraction</span>
                            </div>
                            <div className="items"
                                draggable={true} onDragStart={objEvent => OnElementDragStart(objEvent, "Multiplication")}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.MultiplicationImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Multiplication</span>
                            </div>
                            <div className="items"
                                draggable={true} onDragStart={objEvent => OnElementDragStart(objEvent, "Division")}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.DivisionImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Division</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return GetContent();
};

export default InteractionElements;
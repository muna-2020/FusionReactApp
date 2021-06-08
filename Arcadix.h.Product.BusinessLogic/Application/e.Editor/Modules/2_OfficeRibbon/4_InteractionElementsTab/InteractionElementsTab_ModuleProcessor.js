//Base classes.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

//Module realted classes.
import * as InteractionElementsTab_MetaData from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionElementsTab_MetaData";

//BaseCMSElement import
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name InteractionElementsTab_ModuleProcessor
 * @summary This is the module processor for the IntersectionElements component.
 * */
class InteractionElementsTab_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name OnInputTextDragStart
     * @param {string} strDragOrClick if the element is clicked or dragged
     * @summary Sets the element json of input element(Text box) to EditorState.
     */
    OnInputTextDragStart(strDragOrClick) {
        let objNewElement = BaseCMSElement.AttachRef(InteractionElementsTab_MetaData.GetInputTextOnlyDragStartJson());
        if (strDragOrClick === "DRAGGED") {
            EditorState.SetProperty("ActiveDragSubElement", objNewElement);
        }
        else {
            const objTextEditorRef = EditorState.GetReference("CurrentTextRef");
            if (objTextEditorRef && objTextEditorRef.current && objTextEditorRef.current.AddSubElement) {
                objTextEditorRef.current.AddSubElement(objNewElement);
            }
        }
    }

    /**
     * @name OnInputWordOnlyDragStart
     * @param {string} strDragOrClick if the element is clicked or dragged
     * @summary Sets the element json of input element(WordOnly) to EditorState.
     */
    OnInputWordOnlyDragStart(strDragOrClick) {
        let objNewElement = BaseCMSElement.AttachRef(InteractionElementsTab_MetaData.GetInputWordOnlyDragStartJson());
        if (strDragOrClick === "DRAGGED") {
            EditorState.SetProperty("ActiveDragSubElement", objNewElement);
        }
        else {
            const objTextEditorRef = EditorState.GetReference("CurrentTextRef");
            if (objTextEditorRef && objTextEditorRef.current && objTextEditorRef.current.AddSubElement) {
                objTextEditorRef.current.AddSubElement(objNewElement);
            }
        }
    }

    /**
     * @name OnInputNumberOnlyDragStart
     * @param {string} strDragOrClick if the element is clicked or dragged
     * @summary Sets the element json of input element(NumberOnly) to EditorState.
     */
    OnInputNumberOnlyDragStart(strDragOrClick) {
        let objNewElement = BaseCMSElement.AttachRef(InteractionElementsTab_MetaData.GetInputNumberOnlyDragStartJson());
        if (strDragOrClick === "DRAGGED") {
            EditorState.SetProperty("ActiveDragSubElement", objNewElement);
        }
        else {
            const objTextEditorRef = EditorState.GetReference("CurrentTextRef");
            if (objTextEditorRef && objTextEditorRef.current && objTextEditorRef.current.AddSubElement) {
                objTextEditorRef.current.AddSubElement(objNewElement);
            }
        }
    }

    /**
     * @name OnInputLetterOnlyDragStart
     * @param {string} strDragOrClick if the element is clicked or dragged
     * @summary Sets the element json of input element(Letter Box) to EditorState.
     */
    OnInputLetterOnlyDragStart(strDragOrClick) {
        let objNewElement = BaseCMSElement.AttachRef(InteractionElementsTab_MetaData.GetInputLetterOnlyJson());
        if (strDragOrClick === "DRAGGED") {
            EditorState.SetProperty("ActiveDragSubElement", objNewElement);
        }
        else {
            const objTextEditorRef = EditorState.GetReference("CurrentTextRef");
            if (objTextEditorRef && objTextEditorRef.current && objTextEditorRef.current.AddSubElement) {
                objTextEditorRef.current.AddSubElement(objNewElement);
            }
        }
    }

    /**
     * @name OnInputDotFieldDragStart
     * @param {string} strDragOrClick if the element is clicked or dragged
     * @summary Sets the element json of input element(Dot Field) to EditorState.
     */
    OnInputDotFieldDragStart(strDragOrClick) {
        let objNewElement = BaseCMSElement.AttachRef(InteractionElementsTab_MetaData.GetInputDotOnlyDragStartJson());
        if (strDragOrClick === "DRAGGED") {
            EditorState.SetProperty("ActiveDragSubElement", objNewElement);
        }
        else {
            const objTextEditorRef = EditorState.GetReference("CurrentTextRef");
            if (objTextEditorRef && objTextEditorRef.current && objTextEditorRef.current.AddSubElement) {
                objTextEditorRef.current.AddSubElement(objNewElement);
            }
        }
    }

    /**
     * @name OnInputCommaFieldDragStart
     * @param {string} strDragOrClick if the element is clicked or dragged
     * @summary Sets the element json of input element(Comma Field) to EditorState.
     */
    OnInputCommaFieldDragStart(strDragOrClick) {
        let objNewElement = BaseCMSElement.AttachRef(InteractionElementsTab_MetaData.GetInputCommaOnlyDragStartJson());
        if (strDragOrClick === "DRAGGED") {
            EditorState.SetProperty("ActiveDragSubElement", objNewElement);
        }
        else {
            const objTextEditorRef = EditorState.GetReference("CurrentTextRef");
            if (objTextEditorRef && objTextEditorRef.current && objTextEditorRef.current.AddSubElement) {
                objTextEditorRef.current.AddSubElement(objNewElement);
            }
        }
    }

    /**
     * @name OnInputSemiColonFieldDragStart
     * @param {string} strDragOrClick if the element is clicked or dragged
     * @summary Sets the element json of input element(SemiColon Field) to EditorState.
     */
    OnInputSemiColonFieldDragStart(strDragOrClick) {
        let objNewElement = BaseCMSElement.AttachRef(InteractionElementsTab_MetaData.GetInputSemicolonOnlyDragStartJson());
        if (strDragOrClick === "DRAGGED") {
            EditorState.SetProperty("ActiveDragSubElement", objNewElement);
        }
        else {
            const objTextEditorRef = EditorState.GetReference("CurrentTextRef");
            if (objTextEditorRef && objTextEditorRef.current && objTextEditorRef.current.AddSubElement) {
                objTextEditorRef.current.AddSubElement(objNewElement);
            }
        }
    }

    /**
     * @name OnDropdownDragStart
     * @param {string} strDragOrClick if the element is clicked or dragged
     * @summary Sets the element json of dropdown element to EditorState.
     */
    OnDropdownDragStart(strDragOrClick) {
        let objNewElement = BaseCMSElement.AttachRef(InteractionElementsTab_MetaData.GetDropDownDragStartJson());
        if (strDragOrClick === "DRAGGED") {
            EditorState.SetProperty("ActiveDragSubElement", objNewElement);
        }
        else {
            const objTextEditorRef = EditorState.GetReference("CurrentTextRef");
            if (objTextEditorRef && objTextEditorRef.current && objTextEditorRef.current.AddSubElement) {
                objTextEditorRef.current.AddSubElement(objNewElement);
            }
        }
    }

    /**
     * @name AddTextAreaJson
     * @param {any} strSelectedTextArea Decides between insertion fo Dictate and Textarea
     * @param {string} strDragOrClick if the element is clicked or dragged
     * @summary This method Adds a new text area to the page
     */
    AddTextAreaJson(strSelectedTextArea, strDragOrClick) {
        var objNewElement = strSelectedTextArea === "textarea" ? InteractionElementsTab_MetaData.GetTextAreaJson() : InteractionElementsTab_MetaData.GetDictateJson();
        if (strDragOrClick === "DRAGGED") {
            EditorState.SetProperty("ActiveDragSubElement", objNewElement);
        }
        else {
            const objTextEditorRef = EditorState.GetReference("CurrentTextRef");
            if (objTextEditorRef && objTextEditorRef.current && objTextEditorRef.current.AddSubElement) {
                objTextEditorRef.current.AddSubElement(objNewElement);
            }
        }
    }

    /**
     * @name SaveSelectedShape
     * @param {string} strSelectedShape  The type of shape to be saved.
     * @summary This method saves the selected shape in a hotspot element.
     */
    SaveSelectedShape(strSelectedShape) {
        var hotspotRef = EditorState.GetReference("HotspotRef");
        if (hotspotRef.current.SaveSelectedShape) {
            hotspotRef.current.SaveSelectedShape(strSelectedShape);
        }
    }

    /**
     * @name SetPolylineElements
     * @param {string} strPairingElementType  selected element type.
     * @summary This method gets the selected element type to be added in pairing element.
     */
    SetPolylineElements(strPairingElementType) {
        var PairingElementRef = EditorState.GetReference("PairingElementRef");
        if (PairingElementRef.current.GetPairingElementType) {
            PairingElementRef.current.GetPairingElementType(strPairingElementType);
        }
    }

    /**
     * @name OnTypeClick
     * @param {object} objContext {state, props, dispatch}
     * @summary Calls the "ShowElementTypeSidebar" to open the sidebar for element type sidebar.
     */
    OnTypeClick(objContext) {
        objContext.InteractionElementsTab_ModuleProcessor.ShowInteractionTypeSidebar(objContext);
    }

    /**
     * @name ShowElementTypeSidebar
     * @param {object} objContext {state, props, dispatch}
     * @summary Opens up the side bar.
     */
    ShowInteractionTypeSidebar(objContext) {
        objContext.InteractionElementsTab_ModuleProcessor.CloseInputSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            "PassedEvents": {
                "CloseSidebar": () => {
                    objContext.InteractionElementsTab_ModuleProcessor.CloseInputSidebar();
                }
            },
            "SidebarProps": {
                "SidebarName": "InteractionTypeSidebar",
                "Header": "Interaction Type",
                "Title": "Interaction Type",
                "Status": 1,
                "Position": "left",
                "AutoHide": false
            }
        });
    }

    /**
     * @name CloseInputSidebar
     * @summary Closes the side bar.
     */
    CloseInputSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }
}

export default InteractionElementsTab_ModuleProcessor;

//React Imports.
import React, { useReducer, useRef } from "react";
import { connect } from 'react-redux';

//Module related fies.
import * as Notes_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/Notes/Notes_Hook';
import Notes_ModuleProcessor from "@shared/Application/d.Extranet/2_School/Phone/Modules/Notes/Notes_ModuleProcessor";
import EditableDiv from "@root/Application/d.Extranet/2_School/Phone/Modules/Notes/EditableDiv/EditableDiv";

//Inline Images import
import imgBoldIcon from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Notes/bold_icon.svg?inline';
import imgItalicIcon from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Notes/italic_bold.svg?inline';
import imgUnderlineIcon from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Notes/underline_icon.svg?inline';

/**
 * @name Notes
 * @param {any} props
 * @summary Component for Phone Notes.
 */
function Notes(props) {

    /**
    * @name Initializing Reducer
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Notes_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Notes", ["Notes_ModuleProcessor"]: new Notes_ModuleProcessor() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.Notes_ModuleProcessor.Initialize(objContext, objContext.Notes_ModuleProcessor);

    /**
    * @name Initialize
    * @summary Initialize Custom hooks
    */
    Notes_Hook.Initialize(objContext);

    const notesRefs = useRef([]);

    /**
    * @name HandleOnClickFonts
    * @param {*} strButtonCode strButtonCode
    * @summary Sets the font styles to the note.
    */
    function HandleOnClickFonts(strButtonCode) {
        switch (strButtonCode) {
            case "bold": document.execCommand("bold");
                break;
            case "italics": document.execCommand("italic");
                break;
            case "underline": document.execCommand("underline");
                break;
        }
    }

    /**
    * @name GetContent
    * @summary returns the JSX for component.
    * */
    function GetContent() {
        let arrOrders = [1, 2, 3];
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Notes", props);
        let arrNotes = objContext.Notes_ModuleProcessor.GetNotesJson(objContext);
        notesRefs.current = arrOrders.map(
            (ref, index) => notesRefs.current[index] = React.createRef()
        )
        return (
            <div className="notes">
                <div className="notes-title">
                    <span>Notes</span>
                    <span className="text-close">
                        Schliessen
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/closeSmall.svg")}

                        />
                    </span>
                </div>

                <div className="notes-main-wrapper">
                    <div className="notes-main">
                        {
                            arrOrders.map((intId, index) => {
                                let objNote = objContext.Notes_ModuleProcessor.GetNotesForOrder(objContext, arrNotes, intId);
                                let refCurrentNote = notesRefs.current[index]
                                return (
                                    <div key={intId} className="notes-block">
                                        <div className="edit-icon">
                                            <span className="notes-image" onClick={() => { HandleOnClickFonts("bold"); }}>
                                                <img src={imgBoldIcon} alt="" />
                                            </span>
                                            <span className="notes-image" onClick={() => { HandleOnClickFonts("italics"); }}>
                                                <img src={imgItalicIcon} alt="" />
                                            </span>
                                            <span className="notes-image" onClick={() => { HandleOnClickFonts("underline"); }}>
                                                <img src={imgUnderlineIcon} alt="" />
                                            </span>
                                        </div>
                                        <EditableDiv NoteObject={objNote} NoteId={intId} ref={refCurrentNote} onClick={() => { objContext.Notes_ModuleProcessor.HandleSave(objNote, intId, objContext, refCurrentNote); }} />
                                        <div className="brown-btn-main" id={intId} onClick={() => { objContext.Notes_ModuleProcessor.HandleSave(objNote, intId, objContext, refCurrentNote); }}>
                                            <button>{Localization.TextFormatter(objTextResource, 'SaveButtonText')}</button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
}

export default connect(ExtranetBase_Hook.MapStoreToProps(Notes_ModuleProcessor.StoreMapList()))(Notes);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Notes_ModuleProcessor; 
//React related imports
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as Notes_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/Notes/Notes_Hook';
import Notes_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/Notes/Notes_ModuleProcessor";
import EditableDiv from "@root/Application/d.Extranet/2_School/PC/Modules/Notes/EditableDiv/EditableDiv";

//Inline Images import
import imgBoldIcon from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Notes/bold_icon.svg?inline';
import imgItalicIcon from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Notes/italic_bold.svg?inline';
import imgUnderlineIcon from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/Notes/underline_icon.svg?inline';

/**
 * @name Notes
 * @param {object} props props
 * @summary This component consists of three editable notes.
 * @returns {object} React.Fragement that encapsulated notes div.
 */
const Notes = (props) => {

    /**
     * @name Initializing Reducer
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Notes_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Notes",  ["Notes_ModuleProcessor"]: new Notes_ModuleProcessor() };

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
     * @name GetContent
     * @summary Returns the required jsx for component
     * @returns {*} jsx
     */
    function GetContent() {
        let arrOrders = [1, 2, 3];
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Notes", props);
        let arrNotes = objContext.Notes_ModuleProcessor.GetNotesJson(objContext);
        notesRefs.current = arrOrders.map(
            (ref, index) => notesRefs.current[index] = React.createRef()
        )
        return (
            <WrapperComponent
                ComponentName={"FillHeight"}
                Id="FillHeightSchoolNotes" Meta={objContext.Notes_ModuleProcessor.GetMetaDataFillheightSchoolNotes()} ParentProps={{ ...props }}>
                <div className="light-brown-bg notes-wrapper">
                    <PerformanceProfiler ComponentName={'NotesEditableDiv'} JConfiguration={props.JConfiguration} >
                    <div className="notes-grid padding-top-20">
                        {
                            arrOrders.map((intId, index) => {   
                                let objNote = objContext.Notes_ModuleProcessor.GetNotesForOrder(objContext, arrNotes, intId);
                                let refCurrentNote = notesRefs.current[index]
                                return (
                                    <div key={intId} className="notes-block">
                                        <div className="editor-icons">
                                            <span className="notes-img" onClick={() => { HandleOnClickFonts("bold"); }}>
                                                <img src={imgBoldIcon} alt="" />
                                            </span>
                                            <span className="notes-img" onClick={() => { HandleOnClickFonts("italics"); }}>
                                                <img src={imgItalicIcon} alt="" />
                                            </span>
                                            <span className="notes-img" onClick={() => { HandleOnClickFonts("underline"); }}>
                                                <img src={imgUnderlineIcon} alt="" />
                                            </span>
                                        </div>
                                        <EditableDiv NoteObject={objNote} NoteId={intId} ref={refCurrentNote} />
                                        <span id={intId} className="button brown-button" onClick={() => { objContext.Notes_ModuleProcessor.HandleSave(objNote, intId, objContext, refCurrentNote); }}>
                                            {Localization.TextFormatter(objTextResource, 'SaveButtonText')}
                                        </span>
                                    </div>
                                );
                            })
                        }
                        </div>
                    </PerformanceProfiler>
                </div>
            </WrapperComponent>
        );

        //if (typeof Performance !== "undefined") {
        //    Performance.LogPerformance('Notes_Render');
        //    Performance.LogPerformance("Notes");  
        //}
    }

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

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment/>;
};

export default connect(ExtranetBase_Hook.MapStoreToProps(Notes_ModuleProcessor.StoreMapList()))(Notes);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Notes_ModuleProcessor; 
import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import * as NotesBusinessLogic from '@shared/Application/d.Extranet/2_School/Modules/Notes/NotesBusinessLogic';
import { DataRef } from '@shared/Framework/DataService/TestDriveFetchAndCacheData/TestDriveFetchAndCacheData';
import FillHeight from '@root/Framework/Controls/FillHeight/FillHeight';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

const Notes = (props) => {
    /**
     * @summary Provides satate and dispatch.
     */
    const[state, dispatch] = useReducer(NotesBusinessLogic.Reducer, NotesBusinessLogic.GetInitialState());

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = {state, props, dispatch};

    /**
     * @summary Custom hook that makes the request for the data.
     */
    NotesBusinessLogic.useDataLoader(objContext);

    /**
     * @summary Custom hook that Checks if the data is loaded to props.
     */
    NotesBusinessLogic.useDataLoaded(objContext);

    /**
     * @summary   This is used to set the contents of the notes.
     */
    useEffect(() => {
        if(state && state.arrNotes && state.arrNotes.length > 0)
        {
            let intCount = 0;
            state.arrNotes.map(objNote=>{
                intCount++;
                let strNoteId = "note_" + intCount;
                if(document.getElementById(strNoteId) && document.getElementById(strNoteId) !== null)
                {
                    document.getElementById(strNoteId).innerHTML = objNote.vNote;
                }
            });
        }
    }, [state.arrNotes]);

    /**
     * 
     * @param {*} intButtonCode 
     * @summary   Sets the font to the note.
     */
    function HandleOnClickFonts(strButtonCode)
    {
        if(strButtonCode === "bold")
        {
            document.execCommand("bold");
        }
        else
        if(strButtonCode === "italics")
        {
            document.execCommand("italic");
        }
        else
        if(strButtonCode === "underline")
        {
            document.execCommand("underline");
        }
    }

    /**
     * 
     * @param {*} intNoteId 
     * @summary   Used to save the note. Gets the content of all the notes and send it to HandleSave in BusinessLogic which sets it to state.
     */
    function HandleSave(intNoteId)
    {
        let intCount = 0;
        let arrNotes = state.arrNotes.map(objNote=>{
            intCount++;
            let strNoteId = "note_" + intCount;
            return {...objNote, ["vNote"]: document.getElementById(strNoteId).innerHTML};
        });
        NotesBusinessLogic.HandleSave(objContext, parseInt(intNoteId), arrNotes);
    }

    /**
     * returns the required jsx for component
     */
    function GetContent(){
        let objTextResource = DataRef(props.textresource, "textresource;id;" + props.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/notes").Data[0]["Notes"];
        let intId = 0;
        var jsxReturn = (
            <FillHeight HeaderIds={["Header", "outletBand"]}  className="bgStyle" scrollStyle={{ overflow: "auto" }}>
                <div className="light-brown-bg notes-wrapper">
                    <div className="notes-grid padding-top-20">
                      {
                            state && state.arrNotes && state.arrNotes.map(objNote=>{
                            intId++;
                            let strNoteId = "note_" + intId;
                            let strSaveButtonId = "saveNote_" + intId;
                            return(
                                <div className="notes-block">
                                    <div>
                                        <span className="notes-img" onClick={() => { HandleOnClickFonts("bold"); }}>
                                            <img src={ props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/bold_icon.svg" } alt="" />
                                        </span>
                                        <span className="notes-img" onClick={() => { HandleOnClickFonts("italics"); }}>
                                            <img src={ props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/italic_bold.svg" } alt="" />
                                        </span>
                                        <span className="notes-img" onClick={() => { HandleOnClickFonts("underline"); }}>
                                            <img src={ props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/underline_icon.svg" } alt="" />
                                        </span>
                                    </div>
                                    <div id={strNoteId} contentEditable={true} className="notes-text">
                                    </div>
                                    <span id={strSaveButtonId} className="button brown-button" onClick={(event) => { HandleSave(event.target.id.split("_")[1]); }}>
                                    {Localization.TextFormatter(objTextResource,'SaveButtonText')}
                                    </span>
                                </div>
                                );
                            })
                        }
                    </div>
                </div>
            </FillHeight>
        );
        return jsxReturn;
    }

    /**
     * @summary renders the jsx.
     */
    return (<React.Fragment>{props.isLoadComplete || state.isLoadComplete ? GetContent():<React.Fragment></React.Fragment>}</React.Fragment>);
};

/**
 * @summary Gets dynamic styles for the component.
 */
Notes.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/Notes/Notes.css"
    ];
    return arrStyles;
};

/**
 * @summary used by SSR.
 */
Notes.InitialDataParams = (JConfiguration, props) => {
    return NotesBusinessLogic.InitialDataParams(JConfiguration, props);
};

/**
 * calls mapStateToProps of business logic and exports the component.
 */
export default connect(NotesBusinessLogic.mapStateToProps)(Notes);
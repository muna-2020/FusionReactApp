//Module Objects
import Object_Extranet_School_Notes from '@shared/Object/d.Extranet/2_School/Notes/Notes';


/**
 * @name Notes_ModuleProcessor
 * @summary Class for Notes module display and manipulate.
 */
class Notes_ModuleProcessor extends ExtranetBase_ModuleProcessor {
    
    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @returns {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_School_Notes", "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/Notes"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the QueueAndExecute method from ObjectQueue class
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this,objContext.props);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {Array} return arrDataRequest
     */
    InitialDataParams(props) {
        let arrDataRequest = [];
        let objNotesParams = {};
        if (props.JConfiguration.ApplicationTypeId === "1") //Teacher Extranet
        {
            objNotesParams = {
                "ForeignKeyFilter": {
                    "uUserId": props.ClientUserDetails.UserId
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "cIsTeacher": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsSchool": "N"
                            }
                        },
                        {
                            "match": {
                                "cIsPupil": "N"
                            }
                        }
                    ]
                },
                "SortKeys": [
                    {
                        "iOrder": {
                            "order": "asc"
                        }
                    }
                ]
            };
        }
        else if (props.JConfiguration.ApplicationTypeId === "6") {
            objNotesParams = {
                "ForeignKeyFilter": {
                    "uUserId": props.ClientUserDetails.UserId
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "cIsTeacher": "N"
                            }
                        },
                        {
                            "match": {
                                "cIsSchool": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsPupil": "N"
                            }
                        }
                    ]
                },
                "SortKeys": [
                    {
                        "iOrder": {
                            "order": "asc"
                        }
                    }
                ]
            };
        }

        //Notes
        Object_Extranet_School_Notes.Initialize(objNotesParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_Notes];

        //TextResource
        let arrResourceParams = ["/d.Extranet/2_School/Modules/Notes"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/Notes/Notes.css"
        ];
    }

    /**
     * @name GetNotesJson
     * @param {*} objContext objContext
     * @summary Gets the data from store and returns array with Notes data.Checks for application type id.
     * @returns {Array} arrNotes if the data exists else it will be empty array
     */
    GetNotesJson(objContext) {
        let arrNotes = [];
        if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
            arrNotes = DataRef(objContext.props.Object_Extranet_School_Notes, "Object_Extranet_School_Notes;uUserId;" + objContext.props.ClientUserDetails.UserId + ";cIsTeacher;Y;cIsSchool;N;cIsPupil;N")["Data"];
        }
        else
            if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
                arrNotes = DataRef(objContext.props.Object_Extranet_School_Notes, "Object_Extranet_School_Notes;uUserId;" + objContext.props.ClientUserDetails.UserId + ";cIsTeacher;N;cIsSchool;Y;cIsPupil;N")["Data"];
            }
        return arrNotes;
    }
    
    /**
     * @name GetNotesForOrder
     * @param {*} objContext objContext
     * @param {Array} arrNotes arrNotes
     * @param {var} intOrder intOrder
     * @summary Used to get the each note from the arrNotes
     * @returns {object} Default note is returned
     */
    GetNotesForOrder(objContext,arrNotes, intOrder) {
        let objReturn = {};

        if (arrNotes !== undefined) {
            let arrFilteredNotes = arrNotes.filter(objNotes => objNotes["iOrder"] === intOrder);
            if (arrFilteredNotes.length === 0) {
                objReturn = objContext.Notes_ModuleProcessor.GetDefaultNote(objContext, intOrder);
            }
            else {
                objReturn = arrFilteredNotes[0];
            }
        }        
        return objReturn;
    }

    /**
     * @name GetDefaultNote
     * @param {*} objContext objContext
     * @param {*} orderId orderId
     * @summary Return an object with default value of note
     * @returns {object} objNote
     */
    GetDefaultNote(objContext, orderId) {
        let objNote = {
            "uNoteId": "00000000-0000-0000-0000-000000000000",
            "vNote": "",
            "uUserId": objContext.props.ClientUserDetails.UserId,
            "cIsSchool": "",
            "cIsTeacher": "",
            "cIsPupil": "",
            "iOrder": orderId
        };
        if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
            return { ...objNote, "cIsSchool": "N", "cIsTeacher": "Y", "cIsPupil": "N" };
        }
        else
            if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
                return { ...objNote, "cIsSchool": "Y", "cIsTeacher": "N", "cIsPupil": "N" };
            }
    }
    
    /** 
     * @name HandleSave
     * @param {*} objNote objNote
     * @param {*} intNoteId intNoteId
     * @param {*} objContext objContext
     * @summary Used to save the note. Gets the content of all the notes and send it to SaveNote.
     */
    HandleSave(objNote, intNoteId, objContext, refCurrentNote) {
        //let objEditedNote = { ...objNote, ["vNote"]: document.getElementById(intNoteId).innerHTML };
        let objEditedNote = { ...objNote, ["vNote"]: refCurrentNote.current.innerHTML };
        objContext.Notes_ModuleProcessor.SaveNote(objContext, objEditedNote);
    }

    /**
     * @name SaveNote
     * @param {*} objContext objContext
     * @param {*} objNote objNote
     * @summary Save or Edit a note.
     */
    SaveNote(objContext, objNote) {
        let objDataParams = {};
        if (objContext.props.JConfiguration.ApplicationTypeId === "1") {
            objDataParams = {
                "ForeignKeyFilter": {
                    "uUserId": objContext.props.ClientUserDetails.UserId
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "cIsTeacher": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsSchool": "N"
                            }
                        },
                        {
                            "match": {
                                "cIsPupil": "N"
                            }
                        }
                    ]
                }
            };
        }
        else if (objContext.props.JConfiguration.ApplicationTypeId === "6") {
            objDataParams = {
                "ForeignKeyFilter": {
                    "uUserId": objContext.props.ClientUserDetails.UserId
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "cIsTeacher": "N"
                            }
                        },
                        {
                            "match": {
                                "cIsSchool": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsPupil": "N"
                            }
                        }
                    ]
                }
            };
        }
        objDataParams = { ...objDataParams, "vEditData": objNote };
        Object_Extranet_School_Notes.EditData(objDataParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
        ApplicationState.SetProperty("blnShowAnimation", true);
    }

    /**
    * @name GetMetaDataFillheightSchoolNotes
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
   */
    GetMetaDataFillheightSchoolNotes() {
        return {
            HeaderIds: ["Header", "outletBand"]
        };
    }

}

export default Notes_ModuleProcessor;


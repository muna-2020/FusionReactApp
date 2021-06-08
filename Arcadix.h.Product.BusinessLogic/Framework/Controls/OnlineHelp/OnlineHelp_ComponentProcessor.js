//Base classes.
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Objects required for module.
import Object_Framework_Services_Help from '@shared/Object/a.Framework/Services/Help/Help';
import Object_Framework_Services_HelpGroup from '@shared/Object/a.Framework/Services/Help/HelpGroup/HelpGroup';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
* @name OnlineHelp_ComponentProcessor
* @summary Class for OnlineHelp module display and manipulate.
*/
class OnlineHelp_ComponentProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Framework_Services_Help", "Object_Framework_Services_HelpGroup", { StoreKey: "ApplicationState", DataKey: "OnlineHelpGroupObject" },
            { "StoreKey": "ApplicationState", "DataKey": "ShowHelp" }
        ];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.OnlineHelp_ComponentProcessor.InitialDataParams(objContext.props));
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //HelpGroup
        let objHelpGroupParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iApplicationTypeId": "1"//ClientUserDetails.ApplicationTypeId
                        }
                    }
                ]
            }
        };

        Object_Framework_Services_HelpGroup.Initialize(objHelpGroupParam);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_HelpGroup];

        return arrDataRequest;
    }

    /**
    * @name GetHelpGroup
    * @param {object} objContext Context object
    * @summary Finds the HelpGroup object based on the OnlineHelpGroupKey using the OnlineHelpGroupObject application stated mapped in the module.
    * @returns {object} HelpGroup object
    */
    GetHelpGroup(objContext) {
        let strOnlineHelpGroupkey = objContext.props.OnlineHelpGroupObject.OnlineHelpGroupKey;
        //let arrHelpGroup = DataRef(objContext.props.Object_Framework_Services_HelpGroup, "Object_Framework_Services_HelpGroup;iApplicationTypeId;" + ClientUserDetails.ApplicationTypeId)["Data"];
        let arrHelpGroup = DataRef(objContext.props.Object_Framework_Services_HelpGroup, "Object_Framework_Services_HelpGroup;iApplicationTypeId;1")["Data"];
        arrHelpGroup = [...arrHelpGroup, ...objContext.OnlineHelp_ComponentProcessor.GetTempHelpGroupArray()]; //remove it
        let objHelpGroup = arrHelpGroup.filter(objHelpGroup => objHelpGroup["vHelpGroupKey"] == strOnlineHelpGroupkey)[0];
        return objHelpGroup;
    }

    /**
    * @name InitialDataParams
    * @param {object} objContext Context object
    * @param {object} objHelpGroup HelpGroup object
    * @summary makes a webAPI call for Help object
    */
    GetHelp(objContext, objHelpGroup) {
        //Help
        let objHelpParams = {
            "ForeignKeyFilter": {
                "uHelpGroupId" : objHelpGroup["uHelpGroupId"]
            }
        };

        //ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Framework_Services_Help.GetData(objHelpParams, (objReturnData) => {
           // ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
    * @name OnBackwardArrowClick
    * @param {object} objContext Context object
    * @summary On back arrow click, it removes the last object from the arrHelpHistory, and replaces the OnlineHelpKey to the previous key.
    */
    OnBackwardArrowClick(objContext) {
        let intHistoryIndex = objContext.state.intHistoryIndex - 1;
        let intArrHistoryLastIndex = objContext.state.arrHelpHistory.length - 1;
        let arrHelpKeys = objContext.state.arrHelpHistory[intArrHistoryLastIndex - 1].split("_");
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "strPreviousHelpGroupKey": arrHelpKeys[0],
                "strPreviousHelpKey": arrHelpKeys[1],
                "arrHelpHistory": objContext.state.arrHelpHistory.filter((strHelpHistory, index) => index != intArrHistoryLastIndex),
                "intHistoryIndex": intHistoryIndex
            }
        });
        //this.OnHelpIconClick(arrHelpKeys[0], arrHelpKeys[1]);
        if (objContext.state.intHistoryIndex == 0) {
            //objContext.state.arrHelpHistory = [];
            objContext.dispatch({ type: "SET_STATE", payload: {"arrHelpHistory": []}});
        }

        let objOnlineHelp = ApplicationState.GetProperty("OnlineHelpGroupObject");
        let objOnlineHelpObject = {
            blnShowOnlineHelp: true,
            OnlineHelpGroupKey: objOnlineHelp["OnlineHelpGroupKey"],
            OnlineHelpKey: arrHelpKeys[1]
        };
        ApplicationState.SetProperty("OnlineHelpGroupObject", objOnlineHelpObject);
    }

    //Delete it later after the data is inserted into the db
    GetTempHelpGroupArray() {
        let arrTemp = [
            {
                uHelpGroupId: "00",
                iApplicationTypeId: 1,
                vHelpGroupKey: "TeacherStartPage",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10",
                    uHelpGroupId: "00",
                    iLanguageId: 3,
                    vHelpGroupText: "abc"
                }]
            },
            {
                uHelpGroupId: "01",
                iApplicationTypeId: 1,
                vHelpGroupKey: "TeacherNews",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "11",
                    uHelpGroupId: "01",
                    iLanguageId: 3,
                    vHelpGroupText: "xyz"
                }]
            }, 
            {
                uHelpGroupId: "02",
                iApplicationTypeId: 1,
                vHelpGroupKey: "PupilLearningTest",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "100",
                    uHelpGroupId: "02",
                    iLanguageId: 3,
                    vHelpGroupText: "std"
                }]
            },
            {
                uHelpGroupId: "03",
                iApplicationTypeId: 1,
                vHelpGroupKey: "PupilProfile",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "101",
                    uHelpGroupId: "03",
                    iLanguageId: 3,
                    vHelpGroupText: "fff"
                }]
            },
            {
                uHelpGroupId: "04",
                iApplicationTypeId: 1,
                vHelpGroupKey: "PupilToPlan",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "110",
                    uHelpGroupId: "04",
                    iLanguageId: 3,
                    vHelpGroupText: "fff"
                }]
            },
            {
                uHelpGroupId: "05",
                iApplicationTypeId: 1,
                vHelpGroupKey: "PupilThink",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "111",
                    uHelpGroupId: "05",
                    iLanguageId: 3,
                    vHelpGroupText: "facf"
                }]
            },
            {
                uHelpGroupId: "06",
                iApplicationTypeId: 1,
                vHelpGroupKey: "LearnProfile",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "1000",
                    uHelpGroupId: "06",
                    iLanguageId: 3,
                    vHelpGroupText: "ffacaf"
                }]
            },
            {
                uHelpGroupId: "07",
                iApplicationTypeId: 1,
                vHelpGroupKey: "PupilNews",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "1001",
                    uHelpGroupId: "07",
                    iLanguageId: 3,
                    vHelpGroupText: "facascff"
                }]
            },
            {
                uHelpGroupId: "09",
                iApplicationTypeId: 1,
                vHelpGroupKey: "PupilDocument",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "1010",
                    uHelpGroupId: "09",
                    iLanguageId: 3,
                    vHelpGroupText: "ffvdsrtf"
                }]
            }, 
            {
                uHelpGroupId: "001",
                iApplicationTypeId: 1,
                vHelpGroupKey: "TestResults",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "1011",
                    uHelpGroupId: "001",
                    iLanguageId: 3,
                    vHelpGroupText: "ffvdawsfdsrtf"
                }]
            },
            {
                uHelpGroupId: "002",
                iApplicationTypeId: 1,
                vHelpGroupKey: "Interpretation",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "1100",
                    uHelpGroupId: "002",
                    iLanguageId: 3,
                    vHelpGroupText: "ffvdawascacsfdsrtf"
                }]
            },
            {
                uHelpGroupId: "003",
                iApplicationTypeId: 1,
                vHelpGroupKey: "LearningTestSystem",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "1101",
                    uHelpGroupId: "003",
                    iLanguageId: 3,
                    vHelpGroupText: "vasv"
                }]
            },
            {
                uHelpGroupId: "004",
                iApplicationTypeId: 1,
                vHelpGroupKey: "LearningTestTeacher",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "1110",
                    uHelpGroupId: "004",
                    iLanguageId: 3,
                    vHelpGroupText: "vasvascac"
                }]
            },
            {
                uHelpGroupId: "005",
                iApplicationTypeId: 1,
                vHelpGroupKey: "LearningJournal",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "1111",
                    uHelpGroupId: "005",
                    iLanguageId: 3,
                    vHelpGroupText: "vasvacascascac"
                }]
            },
            {
                uHelpGroupId: "006",
                iApplicationTypeId: 1,
                vHelpGroupKey: "LearningJournalArchive",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10000",
                    uHelpGroupId: "006",
                    iLanguageId: 3,
                    vHelpGroupText: "vasvacascascac"
                }]
            },
            {
                uHelpGroupId: "007",
                iApplicationTypeId: 1,
                vHelpGroupKey: "AssignClassType",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10000",
                    uHelpGroupId: "007",
                    iLanguageId: 3,
                    vHelpGroupText: "vasvacascascac"
                }]
            },
            {
                uHelpGroupId: "008",
                iApplicationTypeId: 1,
                vHelpGroupKey: "HighStakeTestLogins",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10001",
                    uHelpGroupId: "008",
                    iLanguageId: 3,
                    vHelpGroupText: "vasvacascascascac"
                }]
            },
            {
                uHelpGroupId: "009",
                iApplicationTypeId: 1,
                vHelpGroupKey: "HighStakeTestResults",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10010",
                    uHelpGroupId: "009",
                    iLanguageId: 3,
                    vHelpGroupText: "vasvacascascascac"
                }]
            },
            {
                uHelpGroupId: "010",
                iApplicationTypeId: 1,
                vHelpGroupKey: "ArchiveTestResultsHighStake",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10011",
                    uHelpGroupId: "010",
                    iLanguageId: 3,
                    vHelpGroupText: "vasvacascascascac"
                }]
            },
            {
                uHelpGroupId: "011",
                iApplicationTypeId: 1,
                vHelpGroupKey: "TeacherDocument",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10100",
                    uHelpGroupId: "011",
                    iLanguageId: 3,
                    vHelpGroupText: "vasvacascasccac"
                }]
            },
            {
                uHelpGroupId: "012",
                iApplicationTypeId: 1,
                vHelpGroupKey: "Notes",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10101",
                    uHelpGroupId: "012",
                    iLanguageId: 3,
                    vHelpGroupText: "cascasccac"
                }]
            },
            {
                uHelpGroupId: "013",
                iApplicationTypeId: 1,
                vHelpGroupKey: "Contact",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10110",
                    uHelpGroupId: "013",
                    iLanguageId: 3,
                    vHelpGroupText: "cascascccac"
                }]
            },
            {
                uHelpGroupId: "014",
                iApplicationTypeId: 1,
                vHelpGroupKey: "ProgressReport",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10111",
                    uHelpGroupId: "014",
                    iLanguageId: 3,
                    vHelpGroupText: "cascascccac"
                }]
            },
            {
                uHelpGroupId: "015",
                iApplicationTypeId: 1,
                vHelpGroupKey: "ClassAndPupil",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10112",
                    uHelpGroupId: "015",
                    iLanguageId: 3,
                    vHelpGroupText: "cascascccac"
                }]
            },
            {
                uHelpGroupId: "016",
                iApplicationTypeId: 1,
                vHelpGroupKey: "PupilLogin",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10113",
                    uHelpGroupId: "016",
                    iLanguageId: 3,
                    vHelpGroupText: "cascxascccac"
                }]
            },
            {
                uHelpGroupId: "017",
                iApplicationTypeId: 1,
                vHelpGroupKey: "CoTeacherAndSubjectExpert",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10113",
                    uHelpGroupId: "017",
                    iLanguageId: 3,
                    vHelpGroupText: "cascxasacccac"
                }]
            },
            {
                uHelpGroupId: "018",
                iApplicationTypeId: 1,
                vHelpGroupKey: "TimeTableSchedule",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10113",
                    uHelpGroupId: "018",
                    iLanguageId: 3,
                    vHelpGroupText: "cascxasaxcccac"
                }]
            },
            {
                uHelpGroupId: "019",
                iApplicationTypeId: 1,
                vHelpGroupKey: "TeacherProfile",
                iMainClientId: 97,
                t_Framework_Help_Group_Data: [{
                    uHelpGroupDataId: "10113",
                    uHelpGroupId: "019",
                    iLanguageId: 3,
                    vHelpGroupText: "axcccac"
                }]
            }
        ];
        return arrTemp;
    }

    GetTempHelpArray(strHelpGroupText) {
        let arrTemp = [];
        switch (strHelpGroupText) {
            case "TeacherStartPage":
                arrTemp = [
                    {
                        "iHelpId": 0,
                        "vHelpKey": "TeacherStartPage", //default
                        "uHelpGroupId": "00",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 11111,
                                "iHelpId": 0,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "TeacherStartPageTitle",
                                "vHelpContentHtml": "<div>TeacherStartPageContent<span linkkey='TeacherStartPageHelpKey2' type='link'>TeacherStartPage2</span><span linkkey='TeacherStartPageHelpKey3' type='link'>TeacherStartPage3</span></div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    },
                    {
                        "iHelpId": 101,
                        "vHelpKey": "TeacherStartPageHelpKey2",
                        "uHelpGroupId": "00",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 11111,
                                "iHelpId": 0,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "TeacherStartPageTitle2",
                                "vHelpContentHtml": "<div>TeacherStartPageContent2 <span linkkey='TeacherStartPageHelpKey2_1' type='link'>TeacherStartPageTitle2_1</span> </div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    },
                    {
                        "iHelpId": 201,
                        "vHelpKey": "TeacherStartPageHelpKey3",
                        "uHelpGroupId": "00",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 11111,
                                "iHelpId": 0,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "TeacherStartPageTitle3",
                                "vHelpContentHtml": "<div>TeacherStartPageContent3</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    },
                    {
                        "iHelpId": 102,
                        "vHelpKey": "TeacherStartPageHelpKey2_1",
                        "uHelpGroupId": "00",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 11111,
                                "iHelpId": 0,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "TeacherStartPageTitle2_1",
                                "vHelpContentHtml": "<div>TeacherStartPageContent2_1</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "TeacherNews":
                arrTemp = [
                    {
                        "iHelpId": 1,
                        "vHelpKey": "TeacherNews",
                        "uHelpGroupId": "01",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 22222,
                                "iHelpId": 1,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "TeacherNewsTitle",
                                "vHelpContentHtml": "<div>TeacherNewsContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "PupilLearningTest":
                arrTemp = [
                    {
                        "iHelpId": 2,
                        "vHelpKey": "PupilLearningTest",
                        "uHelpGroupId": "02",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 33333,
                                "iHelpId": 2,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "PupilLearningTestTitle",
                                "vHelpContentHtml": "<div>PupilLearningTestContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "PupilProfile":
                arrTemp = [
                    {
                        "iHelpId": 3,
                        "vHelpKey": "PupilProfile",
                        "uHelpGroupId": "03",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 44444,
                                "iHelpId": 3,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "PupilProfileTitle",
                                "vHelpContentHtml": "<div>PupilProfileTestContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "PupilToPlan":
                arrTemp = [
                    {
                        "iHelpId": 4,
                        "vHelpKey": "PupilToPlan",
                        "uHelpGroupId": "04",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 55555,
                                "iHelpId": 4,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "PupilToPlanTitle",
                                "vHelpContentHtml": "<div>PupilToPlanContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "PupilThink":
                arrTemp = [
                    {
                        "iHelpId": 5,
                        "vHelpKey": "PupilThink",
                        "uHelpGroupId": "05",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 6666,
                                "iHelpId": 5,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "PupilThinkTitle",
                                "vHelpContentHtml": "<div>PupilThinkContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "LearnProfile":
                arrTemp = [
                    {
                        "iHelpId": 6,
                        "vHelpKey": "LearnProfile",
                        "uHelpGroupId": "06",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 77777,
                                "iHelpId": 6,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "LearnProfileTitle",
                                "vHelpContentHtml": "<div>LearnProfileContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "PupilNews":
                arrTemp = [
                    {
                        "iHelpId": 7,
                        "vHelpKey": "PupilNews",
                        "uHelpGroupId": "07",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 88888,
                                "iHelpId": 7,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "PupilNewsTitle",
                                "vHelpContentHtml": "<div>PupilNewsContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "PupilDocument":
                arrTemp = [
                    {
                        "iHelpId": 8,
                        "vHelpKey": "PupilDocument",
                        "uHelpGroupId": "08",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 99999,
                                "iHelpId": 8,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "PupilDocumentTitle",
                                "vHelpContentHtml": "<div>PupilDocumentContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "TestResults":
                arrTemp = [
                    {
                        "iHelpId": 9,
                        "vHelpKey": "TestResults",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111111,
                                "iHelpId": 9,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "TestResultsTitle",
                                "vHelpContentHtml": "<div>TestResultsContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "Interpretation":
                arrTemp = [
                    {
                        "iHelpId": 10,
                        "vHelpKey": "Interpretation",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111112,
                                "iHelpId": 10,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "InterpretationTitle",
                                "vHelpContentHtml": "<div>InterpretationContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "LearningTestSystem":
                arrTemp = [
                    {
                        "iHelpId": 11,
                        "vHelpKey": "LearningTestSystem",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111113,
                                "iHelpId": 11,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "LearningTestSystemTitle",
                                "vHelpContentHtml": "<div>LearningTestSystemContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "LearningTestTeacher":
                arrTemp = [
                    {
                        "iHelpId": 12,
                        "vHelpKey": "LearningTestTeacher",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111114,
                                "iHelpId": 12,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "LearningTestTeacherTitle",
                                "vHelpContentHtml": "<div>LearningTestTeacherContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "LearningJournal":
                arrTemp = [
                    {
                        "iHelpId": 13,
                        "vHelpKey": "LearningJournal",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111115,
                                "iHelpId": 13,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "LearningJournalTitle",
                                "vHelpContentHtml": "<div>LearningJournalContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "LearningJournalArchive":
                arrTemp = [
                    {
                        "iHelpId": 14,
                        "vHelpKey": "LearningJournalArchive",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111115,
                                "iHelpId": 14,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "LearningJournalArchiveTitle",
                                "vHelpContentHtml": "<div>LearningJournalArchiveContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "AssignClassType":
                arrTemp = [
                    {
                        "iHelpId": 15,
                        "vHelpKey": "AssignClassType",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111116,
                                "iHelpId": 15,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "AssignClassTypeTitle",
                                "vHelpContentHtml": "<div>AssignClassTypeContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "HighStakeTestLogins":
                arrTemp = [
                    {
                        "iHelpId": 16,
                        "vHelpKey": "HighStakeTestLogins",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111117,
                                "iHelpId": 16,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "HighStakeTestLoginsTitle",
                                "vHelpContentHtml": "<div>HighStakeTestLoginsContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "HighStakeTestResults":
                arrTemp = [
                    {
                        "iHelpId": 17,
                        "vHelpKey": "HighStakeTestResults",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111118,
                                "iHelpId": 17,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "HighStakeTestResultsTitle",
                                "vHelpContentHtml": "<div>HighStakeTestResultsContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "ArchiveTestResultsHighStake":
                arrTemp = [
                    {
                        "iHelpId": 18,
                        "vHelpKey": "ArchiveTestResultsHighStake",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111119,
                                "iHelpId": 18,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "ArchiveTestResultsHighStakeTitle",
                                "vHelpContentHtml": "<div>ArchiveTestResultsHighStakeContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break; 
            case "TeacherDocument":
                arrTemp = [
                    {
                        "iHelpId": 19,
                        "vHelpKey": "TeacherDocument",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111120,
                                "iHelpId": 19,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "TeacherDocumentTitle",
                                "vHelpContentHtml": "<div>TeacherDocumentContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "Notes":
                arrTemp = [
                    {
                        "iHelpId": 20,
                        "vHelpKey": "Notes",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111121,
                                "iHelpId": 20,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "NotesTitle",
                                "vHelpContentHtml": "<div>NotesContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "Contact":
                arrTemp = [
                    {
                        "iHelpId": 21,
                        "vHelpKey": "Contact",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111122,
                                "iHelpId": 21,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "ContactTitle",
                                "vHelpContentHtml": "<div>ContactContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "ProgressReport":
                arrTemp = [
                    {
                        "iHelpId": 22,
                        "vHelpKey": "ProgressReport",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111123,
                                "iHelpId": 22,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "ProgressReportTitle",
                                "vHelpContentHtml": "<div>ProgressReportContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "ClassAndPupil":
                arrTemp = [
                    {
                        "iHelpId": 23,
                        "vHelpKey": "ClassAndPupil",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111124,
                                "iHelpId": 23,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "ClassAndPupilTitle",
                                "vHelpContentHtml": "<div>ClassAndPupilContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "PupilLogin":
                arrTemp = [
                    {
                        "iHelpId": 24,
                        "vHelpKey": "PupilLogin",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111125,
                                "iHelpId": 24,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "PupilLoginTitle",
                                "vHelpContentHtml": "<div>PupilLoginContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "CoTeacherAndSubjectExpert":
                arrTemp = [
                    {
                        "iHelpId": 25,
                        "vHelpKey": "CoTeacherAndSubjectExpert",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111126,
                                "iHelpId": 25,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "CoTeacherAndSubjectExpertTitle",
                                "vHelpContentHtml": "<div>CoTeacherAndSubjectExpertContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "TimeTableSchedule":
                arrTemp = [
                    {
                        "iHelpId": 26,
                        "vHelpKey": "TimeTableSchedule",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111127,
                                "iHelpId": 26,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "TimeTableScheduleTitle",
                                "vHelpContentHtml": "<div>TimeTableScheduleContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
            case "TeacherProfile":
                arrTemp = [
                    {
                        "iHelpId": 27,
                        "vHelpKey": "TeacherProfile",
                        "uHelpGroupId": "09",
                        "t_Framework_Help_Data": [
                            {
                                "iHelpDataId": 111126,
                                "iHelpId": 27,
                                "iLanguageId": 3,
                                "vHelpTitleHtml": "TeacherProfileTitle",
                                "vHelpContentHtml": "<div>TeacherProfileContent</div>",
                                "cIsTranslatedBySystem": null
                            }
                        ]
                    }
                ];
                break;
        }
       
        return arrTemp;
    }

}

export default OnlineHelp_ComponentProcessor;
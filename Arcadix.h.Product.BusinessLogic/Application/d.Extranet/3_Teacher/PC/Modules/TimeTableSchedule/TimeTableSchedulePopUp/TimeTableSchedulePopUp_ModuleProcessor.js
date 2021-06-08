
/**
* @name TimeTableSchedulePopUp_ModuleProcessor
* @summary Class for TimeTableSchedule module display and manipulate.
*/
class TimeTableSchedulePopUp_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_TimeTableSegment"];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) { return []; }

    /**
    * @name ToggleColorPicker
    * @param {object} objPopUpContext Passes Context object
    * @summary Toggles the color picker
    */
    ToggleColorPicker(objPopUpContext) {
        objPopUpContext.pdispatch({ type: 'SET_STATE', payload: { "blnShowColorPicker": !objPopUpContext.popUpState.blnShowColorPicker } });
    }

    /**
   * @name GetDynamicStyles
   * @param {object} props props
   * @summary Required for css
   * @returns {object} arrStyles
   */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TimeTableSchedule/TimeTableSchedulePopup/TimeTableSchedulePopup.css"
        ];
    }

    /**
    * @name FormDataForSave
    * @param {object} objPopUpContext Passes Context object
    * @summary Forms the data for saving
    * @returns {Array} DataForSave
    */
    FormDataForSave(objPopUpContext) {
        let arrDataForSave = [];
        for (let clsTime of objPopUpContext.popUpState.arrTimeTableForDisplay) {
            for (let clsDay of clsTime.arrDay) {
                for (let clsSeg of clsDay.arrSegments) {
                    if (clsSeg.isSelectedAll == true || clsSeg.cIsDeleted == 'Y') {
                        let objData = {
                            uSegmentId: clsSeg.uSegmentId,
                            vSegmentName: "",
                            vSegmentDescription: "",
                            iSubjectId: clsSeg.selectedSubject.iSubjectId,
                            vAdditionalSubjectName: "",
                            uClassId: objPopUpContext.popUpState.selClass.uClassId,
                            uClassTimeId: clsTime.uClassTimeId,
                            cIsEveryWeek: "",
                            cIsSpecificDate: "",
                            cIsEveryWeekUnlimited: "",
                            vColor: clsSeg.vColorCode,
                            cIsDeleted: clsSeg.cIsDeleted,
                            cIsSegment: "Y",
                            cIsEvent: "",
                            cIsActivity: "",
                            uTeacherId: clsSeg.selectedTeacher.uTeacherId,
                            uTimeTableDayId: clsDay.uTimeTableDayId,
                            uClassGroupId: '00000000-0000-0000-0000-000000000000',
                            uSchoolYearPeriodId: objPopUpContext.popUpState.selSchoolYearPeriod.uSchoolYearPeriodId
                        };
                        arrDataForSave = [...arrDataForSave, objData];
                    } /*else {*/
                    for (let clsGrp of clsSeg.arrGroups) {
                        if (clsGrp.isSelected == true || clsGrp.cIsDeleted == 'Y') {
                            let objData = {
                                uSegmentId: clsGrp.uSegmentId,
                                vSegmentName: "",
                                vSegmentDescription: "",
                                iSubjectId: clsGrp.selectedSubject.iSubjectId,
                                vAdditionalSubjectName: "",
                                uClassId: objPopUpContext.popUpState.selClass.uClassId,
                                uClassTimeId: clsTime.uClassTimeId,
                                cIsEveryWeek: "",
                                cIsSpecificDate: "",
                                cIsEveryWeekUnlimited: "",
                                vColor: clsGrp.vColorCode,
                                cIsDeleted: clsGrp.cIsDeleted,
                                cIsSegment: "Y",
                                cIsEvent: "",
                                cIsActivity: "",
                                uTeacherId: clsGrp.selectedTeacher.uTeacherId,
                                uTimeTableDayId: clsDay.uTimeTableDayId,
                                uClassGroupId: clsGrp.uClassGroupId,
                                uSchoolYearPeriodId: objPopUpContext.popUpState.selSchoolYearPeriod.uSchoolYearPeriodId
                            };
                            arrDataForSave = [...arrDataForSave, objData];
                        }
                    }
                    // }

                }
            }
        }
        return arrDataForSave;
    }

    /**
    * @name SaveData
    * @param {object} objPopUpContext Passes Context object
    * @summary Saves the data
    */
    SaveData(objPopUpContext) {
        let arrEditData = this.FormDataForSave(objPopUpContext);
        let objSaveParams = {
            ForeignKeyFilter: {
                uClassId: objPopUpContext.popUpState.selClass.uClassId
            },
            SearchQuery: {
                must: [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            vEditData: arrEditData
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        objPopUpContext.props.Object_Extranet_Teacher_TimeTableSegment.EditData(objSaveParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        });
    }

    /**
    * @name SaveData
    * @param {object} objPopUpContext Passes Context object
    * @summary Saves the data
    * @returns {Array} DataForSave
    */
    GetTimeTableData(objPopUpContext) {
        let arrTimeTableData = objPopUpContext.popUpState.arrClassTime.map((clsTime) => {
            return {
                ...clsTime,
                arrDay: objPopUpContext.popUpState.arrDay.map((clsDay) => {
                    let objSegmentGroup = objPopUpContext.popUpState.arrSegmentData.find(seg => seg["uSchoolYearPeriodId"] == objPopUpContext.popUpState.selSchoolYearPeriod.uSchoolYearPeriodId &&
                        seg["uTimeTableDayId"] == clsDay["uTimeTableDayId"] &&
                        seg["uClassTimeId"] == clsTime["uClassTimeId"] &&
                        seg["uClassGroupId"] == '00000000-0000-0000-0000-000000000000');
                    return {
                        ...clsDay,
                        arrSegments: [
                            {
                                uClassGroupId: '00000000-0000-0000-0000-000000000000',
                                vClassGroupName: 'Alle',
                                isSelectedAll: objSegmentGroup ? true : false,
                                selectedSubject: objSegmentGroup ? objPopUpContext.popUpState.arrSubject.find(sub => sub['iSubjectId'] == objSegmentGroup['iSubjectId']) : undefined,
                                selectedTeacher: objSegmentGroup ? objPopUpContext.popUpState.arrTeacher.find(t => t.uTeacherId == objSegmentGroup.uTeacherId) : undefined,
                                vColorCode: objSegmentGroup ? objSegmentGroup["vColor"] : undefined,
                                uSegmentId: objSegmentGroup ? objSegmentGroup["uSegmentId"] : '00000000-0000-0000-0000-000000000000',
                                cIsNew: objSegmentGroup ? false : true,
                                cIsDeleted: 'N',
                                arrGroups: objPopUpContext.popUpState.arrClassGroup.map((clsGrp) => {
                                    let objSegment = objPopUpContext.popUpState.arrSegmentData.find(seg => seg["uSchoolYearPeriodId"] == objPopUpContext.popUpState.selSchoolYearPeriod.uSchoolYearPeriodId &&
                                        seg["uTimeTableDayId"] == clsDay["uTimeTableDayId"] &&
                                        seg["uClassTimeId"] == clsTime["uClassTimeId"] &&
                                        seg["uClassGroupId"] == clsGrp["uClassGroupId"]);
                                    return {
                                        ...clsGrp,
                                        isSelected: objSegment ? true : false,
                                        selectedSubject: objSegment ? objPopUpContext.popUpState.arrSubject.find(sub => sub['iSubjectId'] == objSegment['iSubjectId']) : undefined,
                                        selectedTeacher: objSegment ? objPopUpContext.popUpState.arrTeacher.find(t => t.uTeacherId == objSegment.uTeacherId) : undefined,
                                        vColorCode: objSegment ? objSegment["vColor"] : undefined,
                                        uSegmentId: objSegment ? objSegment["uSegmentId"] : '00000000-0000-0000-0000-000000000000',
                                        cIsNew: objSegment ? false : true,
                                        cIsDeleted: 'N'
                                    };
                                })
                            }
                        ]
                    };
                })
            };
        });
        return arrTimeTableData;
    }

    /**
    * @name UpdateSegmentAll
    * @param {object} objPopUpContext Passes Context object
    * @param {object} objTime Passes Time
    * @param {object} objDay Passes Day
    * @param {Boolean} blnValue Passes Value
    * @summary Updates all the segment
    */
    UpdateSegmentAll(objPopUpContext, objTime, objDay, blnValue) {
        let newState = objPopUpContext.popUpState.arrTimeTableForDisplay.map((clsTime) => {
            return {
                ...clsTime,
                arrDay: clsTime.arrDay.map((clsDay) => {
                    return {
                        ...clsDay,
                        arrSegments: clsDay.arrSegments.map(clsSeg => {
                            if (objTime.uClassTimeId == clsTime.uClassTimeId && objDay.uTimeTableDayId == clsDay.uTimeTableDayId) {
                                if (blnValue == true) {
                                    return {
                                        ...clsSeg,
                                        isSelectedAll: true,
                                        selectedSubject: objPopUpContext.popUpState.selSubject,
                                        selectedTeacher: objPopUpContext.popUpState.selTeacher,
                                        vColorCode: objPopUpContext.popUpState.selColor.vColorCode,
                                        cIsDeleted: 'N',
                                        arrGroups: clsSeg.arrGroups.map(clsGrp => {
                                            if (clsGrp.isSelected && (!clsGrp.cIsNew)) {
                                                return {
                                                    ...clsGrp,
                                                    isSelected: false,
                                                    cIsDeleted: 'Y'
                                                };
                                            } else {
                                                return {
                                                    ...clsGrp,
                                                    isSelected: false,
                                                    selectedSubject: undefined,
                                                    selectedTeacher: undefined,
                                                    vColorCode: undefined
                                                };
                                            }
                                        })
                                    };
                                } else {
                                    return {
                                        ...clsSeg,
                                        isSelectedAll: false,
                                        vColorCode: undefined,
                                        cIsDeleted: clsSeg.cIsNew == true ? 'N' : 'Y',
                                        arrGroups: clsSeg.arrGroups.map(clsGrp => {
                                            return {
                                                ...clsGrp,
                                                isSelected: false,
                                                selectedSubject: undefined,
                                                selectedTeacher: undefined,
                                                vColorCode: undefined
                                            };
                                        })
                                    };
                                }

                            } else {
                                return {
                                    ...clsSeg
                                };
                            }
                        })
                    };
                })
            };
        });
        objPopUpContext.pdispatch({ type: 'SET_STATE', payload: { "arrTimeTableForDisplay": newState, "blnClickedSegment": true } });
    }

    /**
    * @name UpdateGroupSegment
    * @param {object} objPopUpContext Passes Context object
    * @param {object} objTime Passes Time
    * @param {object} objDay Passes Day
    * @param {object} objGrp Passes Group
    * @param {Boolean} blnValue Passes Value
    * @summary Updates the group segment
    */
    UpdateGroupSegment(objPopUpContext, objTime, objDay, objGrp, blnValue) {
        let newState = objPopUpContext.popUpState.arrTimeTableForDisplay.map((clsTime) => {
            return {
                ...clsTime,
                arrDay: clsTime.arrDay.map((clsDay) => {
                    return {
                        ...clsDay,
                        arrSegments: clsDay.arrSegments.map(clsSeg => {
                            return {
                                ...clsSeg,
                                arrGroups: clsSeg.arrGroups.map(clsGrp => {
                                    if (objTime.uClassTimeId == clsTime.uClassTimeId && objDay.uTimeTableDayId == clsDay.uTimeTableDayId && objGrp.uClassGroupId == clsGrp.uClassGroupId) {
                                        if (blnValue == true) {
                                            return {
                                                ...clsGrp,
                                                isSelected: true,
                                                selectedSubject: objPopUpContext.popUpState.selSubject,
                                                selectedTeacher: objPopUpContext.popUpState.selTeacher,
                                                vColorCode: objPopUpContext.popUpState.selColor.vColorCode,
                                                cIsDeleted: 'N'
                                            };
                                        } else {
                                            return {
                                                ...clsGrp,
                                                isSelected: false,
                                                cIsDeleted: clsGrp.cIsNew == true ? 'N' : 'Y'
                                            };
                                        }
                                    } else {
                                        return {
                                            ...clsGrp
                                        };
                                    }
                                })
                            };
                        })
                    };
                })
            };
        });

        objPopUpContext.pdispatch({ type: 'SET_STATE', payload: { "arrTimeTableForDisplay": newState, "blnClickedSegment": true } });
    }

    /**
    * @name GetFillHeightMetaData
    * @param {object} objPopUpContext Context object
    * @summary it returns the object of metadatas
    * @returns {array} MetaData for header
    */
    GetFillHeightMetaData(objPopUpContext) {
        return {
            HeaderIds: [`EditorPopup_Header_Id${objPopUpContext.props.id}`, "TTSHeader"],
            FooterIds: [`EditorPopup_Footer_Id${objPopUpContext.props.id}`, "TTSFooter"]
        };
    }

    /**
    * @name GetSubjectDropdownMetaData
    * @summary Gets the meta data for Subject dropdown
    * @returns {object} Meta data objects for Subject dropdown
    */
    GetSubjectDropdownMetaData() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data"
        };
    }

    /**
    * @name GetSubjectDropdownData
    * @param {object} objPopUpContext Context object
    * @summary Gets the data for Subject dropdown
    * @returns {object} Meta objects for Subject dropdown
    */
    GetSubjectDropdownData(objPopUpContext) {
        return {
            DropdownData: objPopUpContext.popUpState.arrSubject,
            SelectedValue: objPopUpContext.popUpState.selSubject ? objPopUpContext.popUpState.selSubject["iSubjectId"] : objPopUpContext.popUpState.arrSubject[0].iSubjectId
        };
    }

    /**
    * @name GetSubjectDropdownEvents
    * @param {object} objPopUpContext Context object
    * @summary Returns object that contains all the Event methods for Subject dropdown.
    * @returns {object} objEventBasics
    */
    GetSubjectDropdownEvents(objPopUpContext) {
        return {
            OnChangeEventHandler: (objItem) => objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.OnChangeSubjectDropDown(objPopUpContext, objItem)
        };
    }

    /**
    * @name OnChangeSubjectDropDown
    * @param {object} objPopUpContext Passes Context object
    * @param {object} objSelectedItem Passes Selected Item
    * @summary Updates the state on Subject dropdown change
    */
    OnChangeSubjectDropDown(objPopUpContext, objSelectedItem) {
        objPopUpContext.pdispatch({ type: 'SET_STATE', payload: { "selSubject": objSelectedItem } });
    }

    /**
    * @name GetTeacherDropdownMetaData
    * @summary Gets the meta data for Teacher dropdown
    * @returns {object} Meta data objects for Teacher dropdown
    */
    GetTeacherDropdownMetaData() {
        return {
            DisplayColumn: "vFirstName",
            ValueColumn: "uTeacherId"
        };
    }

    /**
    * @name GetTeacherDropdownData
    * @param {object} objPopUpContext Context object
    * @summary Gets the data for Teacher dropdown
    * @returns {object} Meta objects for Teacher dropdown
    */
    GetTeacherDropdownData(objPopUpContext) {
        return {
            DropdownData: objPopUpContext.popUpState.arrTeacher,
            SelectedValue: objPopUpContext.popUpState.selTeacher ? objPopUpContext.popUpState.selTeacher["uTeacherId"] : objPopUpContext.popUpState.arrTeacher[0].uTeacherId
        };
    }

    /**
    * @name GetTeacherDropdownEvents
    * @param {object} objPopUpContext Context object
    * @summary Returns object that contains all the Event methods for Teacher dropdown.
    * @returns {object} objEventBasics
    */
    GetTeacherDropdownEvents(objPopUpContext) {
        return {
            OnChangeEventHandler: (objItem) => objPopUpContext.TimeTableSchedulePopUp_ModuleProcessor.OnChangeTeacherDropDown(objPopUpContext, objItem)
        };
    }

    /**
    * @name OnChangeTeacherDropDown
    * @param {object} objPopUpContext Passes Context object
    * @param {object} objSelectedItem Passes Selected Item
    * @summary Updates the state on Teacher dropdown change
    */
    OnChangeTeacherDropDown(objPopUpContext, objSelectedItem) {
        objPopUpContext.pdispatch({ type: 'SET_STATE', payload: { "selTeacher": objSelectedItem } });
    }

    /**
    * @name GetResourceData
    * @summary Gets the resource data required for the dropdown
    * @returns {object} object carrying the skin path
    */
    GetResourceData() {
        return {
            SkinPath: JConfiguration.ExtranetSkinPath
        };
    }

    /**
    * @name UpdateSelectedColor
    * @param {object} objPopUpContext Passes Context object
    * @param {object} objSelColor Passes Selected Color
    * @summary Updates the state when color is selected
    */
    UpdateSelectedColor(objPopUpContext, objSelColor) {
        objPopUpContext.pdispatch({ type: 'SET_STATE', payload: { "selColor": objSelColor, "blnShowColorPicker": false } });
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown" ],
            "Files": []
        }
    }
}

export default TimeTableSchedulePopUp_ModuleProcessor;
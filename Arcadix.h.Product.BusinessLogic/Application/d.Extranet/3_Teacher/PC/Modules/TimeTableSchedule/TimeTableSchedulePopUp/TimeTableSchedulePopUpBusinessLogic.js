import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
        };
    }
}
export function InitialDataLoad(objContext) {
    let objColorParams = {
    }
        ;
    let arrDataRequest = [
        {
            "URL": "",
            "Params": objColorParams,
            "MethodType": "Get"
        }
    ];
    return arrDataRequest;
}

export function DataCall(objParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
        //Do something
    });
}

export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        DataCall(InitialDataLoad(objContext.props.JConfiguration, objContext.props));
    }
    useLayoutEffect(GetRequiredData, []);
}

export function ToggleColorPicker(objPopUpContext) {
    objPopUpContext.pdispatch({ type: 'Toggle_ColorPicker', payload: !objPopUpContext.popUpState.blnShowColorPicker })
}

function FormDataForSave(objPopUpContext) {
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
                    }
                    arrDataForSave = [...arrDataForSave, objData];
                } else {
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
                            }
                            arrDataForSave = [...arrDataForSave, objData];
                        }
                    }
                }

            }
        }
    }
    return arrDataForSave;
}

export function SaveData(objPopUpContext) {
    let arrEditData = FormDataForSave(objPopUpContext);
    let objSaveParams = {
        ForeignKeyFilter: {
            uClassId: objPopUpContext.popUpState.selClass.uClassId
        },
        SearchQuery: {
            must: [
               {
                   "match": {
                       "cIsDeleted":"N"
                   }
               }
            ]
        },
        vEditData: arrEditData
    }

    let arrDataRequest = [
        {
            URL: "API/Object/Extranet/Teacher/Planner/TimeTableSegment",
            Params: objSaveParams,
            MethodType: "Put"
        }
    ]
    DataCall(arrDataRequest);
}

export function GetTimeTableData(objPopUpContext) {
    let arrTimeTableData = objPopUpContext.popUpState.arrClassTime.map((clsTime) => {
        return {
            ...clsTime,
            arrDay: objPopUpContext.popUpState.arrDay.map((clsDay) => {
                let objSegmentGroup = objPopUpContext.popUpState.arrSegmentData.find(seg => seg["uSchoolYearPeriodId"] == objPopUpContext.popUpState.selSchoolYearPeriod.uSchoolYearPeriodId &&
                    seg["uTimeTableDayId"] == clsDay["uTimeTableDayId"] &&
                    seg["uClassTimeId"] == clsTime["uClassTimeId"] &&
                    seg["uClassGroupId"] == '00000000-0000-0000-0000-000000000000')
                return {
                    ...clsDay,
                    arrSegments: [
                        {
                            uClassGroupId: '00000000-0000-0000-0000-000000000000',
                            vClassGroupName: 'Alle',
                            isSelectedAll: objSegmentGroup ? true : false,
                            selectedSubject: objSegmentGroup ? objPopUpContext.popUpState.arrSubject.find(sub => sub['iSubjectId'] == objSegmentGroup['iSubjectId']) : undefined,
                            selectedTeacher: objSegmentGroup ? objPopUpContext.popUpState.arrTeacher.find(t => t.uTeacherId == objSegmentGroup.uTeacherId):undefined,
                            vColorCode: objSegmentGroup ? objSegmentGroup["vColor"] : undefined,
                            uSegmentId: objSegmentGroup ? objSegmentGroup["uSegmentId"] : '00000000-0000-0000-0000-000000000000',
                            cIsNew:objSegmentGroup ? false : true,
                            cIsDeleted:'N',
                            arrGroups: objPopUpContext.popUpState.arrClassGroup.map((clsGrp) => {
                                let objSegment = objPopUpContext.popUpState.arrSegmentData.find(seg => seg["uSchoolYearPeriodId"] == objPopUpContext.popUpState.selSchoolYearPeriod.uSchoolYearPeriodId &&
                                    seg["uTimeTableDayId"] == clsDay["uTimeTableDayId"] &&
                                    seg["uClassTimeId"] == clsTime["uClassTimeId"] &&
                                    seg["uClassGroupId"] == clsGrp["uClassGroupId"])
                                return {
                                    ...clsGrp,
                                    isSelected: objSegment ? true : false,
                                    selectedSubject: objSegment ? objPopUpContext.popUpState.arrSubject.find(sub => sub['iSubjectId'] == objSegment['iSubjectId']) : undefined,
                                    selectedTeacher: objSegment?  objPopUpContext.popUpState.arrTeacher.find(t => t.uTeacherId == objSegment.uTeacherId): undefined,
                                    vColorCode: objSegment ? objSegment["vColor"] : undefined,
                                    uSegmentId: objSegment ? objSegment["uSegmentId"] : '00000000-0000-0000-0000-000000000000',
                                    cIsNew:objSegment ? false : true,
                                    cIsDeleted:'N',
                                }
                            })
                        }
                    ]
                }
            })
        }
    })
    return arrTimeTableData;
}

export function UpdateSegmentAll(objPopUpContext, objTime, objDay, blnValue) {
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
                                    arrGroups: clsSeg.arrGroups.map(clsGrp => {
                                        return {
                                            ...clsGrp,
                                            isSelected: false,
                                            selectedSubject: undefined,
                                            selectedTeacher: undefined,
                                            vColorCode: undefined
                                        }
                                    })
                                }
                            } else {
                                return {
                                    ...clsSeg,
                                    isSelectedAll: false,
                                    vColorCode: undefined,
                                    cIsDeleted:clsSeg.cIsNew == true ? 'N' :'Y',
                                    arrGroups: clsSeg.arrGroups.map(clsGrp => {
                                        return {
                                            ...clsGrp,
                                            isSelected: false,
                                            selectedSubject: undefined,
                                            selectedTeacher: undefined,
                                            vColorCode: undefined
                                        }
                                    })
                                }
                            }

                        } else {
                            return {
                                ...clsSeg
                            }
                        }
                    })
                }
            })
        }
    })
    objPopUpContext.pdispatch({ type: 'Update_TimeTable', payload: newState })

}

export function UpdateGroupSegment(objPopUpContext, objTime, objDay, objGrp, blnValue) {
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
                                            vColorCode: objPopUpContext.popUpState.selColor.vColorCode

                                        }
                                    } else {
                                        return {
                                            ...clsGrp,
                                            isSelected: false,
                                            vColorCode: undefined,
                                            cIsDeleted:clsGrp.cIsNew == true ? 'N' :'Y',
                                        }
                                    }
                                } else {
                                    return {
                                        ...clsGrp
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    objPopUpContext.pdispatch({ type: 'Update_TimeTable', payload: newState })
}

export function OnChangeSubjectDropDown(objPopUpContext, objSelectedItem) {
    objPopUpContext.pdispatch({ type: 'Update_Subject', payload: objSelectedItem })
}

export function OnChangeTeacherDropDown(objPopUpContext, objSelectedItem) {
    objPopUpContext.pdispatch({ type: 'Update_Teacher', payload: objSelectedItem })
}

export function UpdateSelectedColor(objPopUpContext, objSelColor) {
    objPopUpContext.pdispatch({ type: 'Update_Color', payload: objSelColor })
}

export function GetInitialState(objData) {
    let objDataCopy = {...objData}//JSON.parse(JSON.stringify(objData));
    let objChooseTeacherMsg = {
        vFirstName: "Choose one",
        uTeacherId: '00000000-0000-0000-0000-000000000000'
    }
    let objChooseSubjectMsg = {
        t_TestDrive_Subject_Data: [{
            vSubjectName: "Choose one",
            iLanguageId: 3
        }],
        iSubjectId: -1
    }
    objDataCopy.arrTeacher = [objChooseTeacherMsg, ...objDataCopy.arrTeacher()];
    objDataCopy.arrSubjectData = [objChooseSubjectMsg, ...objDataCopy.arrSubjectData()];
    return {
        arrTeacher: objDataCopy.arrTeacher,
        arrColor: objDataCopy.arrColorData(),
        arrSubject: objDataCopy.arrSubjectData,
        arrDay: objDataCopy.arrDayData(),
        arrTimeTable: objDataCopy.arrTimeTableData(),
        arrClassGroup: objDataCopy.arrClassGroupData(),
        arrClassTime: objDataCopy.arrTimeData(),
        selColor: objDataCopy.arrColorData()[0],
        arrSegmentData: objDataCopy.arrSegmentData(),
        selSubject: objChooseSubjectMsg,
        selTeacher: objChooseTeacherMsg,
        selSchoolYearPeriod: objDataCopy.selSchoolYearPeriod,
        selClass: objDataCopy.selClass,
        selTimeForEdit: objDataCopy.selTimeForEdit,
        selDayForEdit: objDataCopy.selDayForEdit,
        blnShowColorPicker: false,
        blnInitialLoadComplete: false,
        arrTimeTableForDisplay: [],
        blnClickedSegment:false, // to remove cell border
        objTextResource:objDataCopy.objTextResource
    }
}

export function Reducer(state, action) {
    switch (action.type) {
        case 'Update_Color': {
            return {
                ...state,
                selColor: action.payload,
                blnShowColorPicker: false
            }
        }
        case 'Update_Subject': {
            return {
                ...state,
                selSubject: action.payload
            }
        }
        case 'Update_Teacher': {
            return {
                ...state,
                selTeacher: action.payload
            }
        }
        case 'Toggle_ColorPicker': {
            return {
                ...state,
                blnShowColorPicker: action.payload
            }
        }
        case 'Initial_Update': {
            return {
                ...state,
                arrTimeTableForDisplay: action.payload,
                blnInitialLoadComplete: true
            }
        }
        case 'Update_TimeTable': {
            return {
                ...state,
                arrTimeTableForDisplay: action.payload,
                blnClickedSegment:true
            }
        }
    }
}

//React imports 
import { useEffect } from 'react';

/**
* @name GetInitialState
* @summary State of the teacher profile component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let arrCompetencyInterval = [];
    if (
        Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/LearnProfile", props) &&
        DataRef(props.Extranet_Pupil_LearnProfile_Module, "Extranet_Pupil_LearnProfile_Module;uSchoolYearPeriodId;")["Data"]
    ) {
        let arrCompetencyInterval = ["", "I", "II", "III", "IV", "V", "VI"];
        let blnShowSevenCompetencies = ClientUserDetails.MainClientId == "97";
        if (blnShowSevenCompetencies) {
            arrCompetencyInterval = [...arrCompetencyInterval, "VII"];
        }
        blnIsLoadComplete = false;
        ApplicationState.SetProperty("DisplayFor", 4);
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        baloonSubjectId: -1,
        objResult: {
            strTestPoints: "",
            dtTestExecution: '',
            CompetencyLevel: "",
            blnCalculationOver: false //this is done as after the calculation is finished the jsx need to rerender to display the changes. after calculation, the state is set true.
        },
        arrFormLinesSubjectData: [],
        arrCompetencyInterval: arrCompetencyInterval,
        blnMakeCall: false,
        objSchoolYearPeriod: {
            "uSchoolYearPeriodId": ""
        }
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
}

/**
* @name useDataLoader
* @param {object} objContext objContext
* @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.LearnProfile_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
* @name useDataLoaded
* @param {object} objContext objContext
* @summary Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/LearnProfile", objContext.props) &&
            DataRef(objContext.props.Extranet_Pupil_LearnProfile_Module,"Extranet_Pupil_LearnProfile_Module;uSchoolYearPeriodId;")["Data"]
        ) {
           
            let arrCompetencyInterval = ["", "I", "II", "III", "IV", "V", "VI"];
            let blnShowSevenCompetencies = ClientUserDetails.MainClientId == "97";
            if (blnShowSevenCompetencies) {
                arrCompetencyInterval = [...arrCompetencyInterval, "VII"];
            }

            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, arrCompetencyInterval: arrCompetencyInterval } });
            ApplicationState.SetProperty("blnShowAnimation", false);
            ApplicationState.SetProperty("DisplayFor", 4);
        }
    }, [
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/LearnProfile"],
        objContext.props.Extranet_Pupil_LearnProfile_Module
    ]);
}

let data = () => {
    let arrData = [
        {
            "SubjectId": "6257",
            "SubjectName": "Mathematik",
            "SubSubjects": [
                {
                    "SubjectId": "6258",
                    "SubjectName": "Zahl und Variable",
                    "Results": [
                        {
                            "uTestTokenId": "646532DD-A730-4D26-A359-728229EF4EFF",
                            "strTestName": "Test1",
                            "strTestPoints": 435,
                            "dtTestExecution": "27.11.19",
                            "Competency": 2,
                            "CompetencyLevel": "Kompetenzniveau II: 421 - 473",
                            "blnDisplayResultInPopup": false
                        }
                    ]
                },
                {
                    "SubjectId": "6259",
                    "SubjectName": "Form und Raum",
                    "Results": [
                        {
                            "uTestTokenId": "81D93E14-9D06-4E80-B9C9-78C84E91F084",
                            "strTestName": "Test3",
                            "strTestPoints": 286,
                            "dtTestExecution": "26.11.19",
                            "Competency": 0,
                            "CompetencyLevel": ": 200 - 384",
                            "blnDisplayResultInPopup": false
                        },
                        {
                            "uTestTokenId": "8015C429-B5C3-4488-8368-657570C2CB25",
                            "strTestName": "Test2",
                            "strTestPoints": 304,
                            "Competency": 0,
                            "dtTestExecution": "26.11.19",
                            "CompetencyLevel": ": 200 - 384",
                            "blnDisplayResultInPopup": false
                        },
                        {
                            "uTestTokenId": "117AB9EB-1A4A-4523-8952-9C52B5A97B68",
                            "strTestName": "Test1",
                            "strTestPoints": 304,
                            "Competency": 0,
                            "dtTestExecution": "26.11.19",
                            "CompetencyLevel": ": 200 - 384",
                            "blnDisplayResultInPopup": false
                        }
                    ]
                },
                {
                    "SubjectId": "6260",
                    "SubjectName": "Grössen, Funktionen, Daten und Zufall",
                    "Results": [
                        {
                            "uTestTokenId": "883F6680-8858-49B3-88D1-CA88F1FB930F",
                            "strTestName": "Test1",
                            "strTestPoints": 331,
                            "Competency": 0,
                            "dtTestExecution": "26.11.19",
                            "CompetencyLevel": ": 200 - 400",
                            "blnDisplayResultInPopup": false
                        }
                    ]
                }
            ]
        },
        {
            "SubjectId": "6218",
            "SubjectName": "Deutsch",
            "SubSubjects": [
                {
                    "SubjectId": "6233",
                    "SubjectName": "Hören",
                    "Results": [
                        {
                            "uTestTokenId": "188DC52B-8B73-4D2E-95B9-016DEB519CD3",
                            "strTestName": "Test1",
                            "strTestPoints": 279,
                            "Competency": 0,
                            "dtTestExecution": "02.12.19",
                            "CompetencyLevel": ": 200 - 308",
                            "blnDisplayResultInPopup": false
                        }
                    ]
                },
                {
                    "SubjectId": "6235",
                    "SubjectName": "Lesen",
                    "Results": [
                        {
                            "uTestTokenId": "B79C483A-2DDC-4A01-AAF0-A39B2D770BAD",
                            "strTestName": "Test1",
                            "strTestPoints": 281,
                            "dtTestExecution": "25.11.19",
                            "Competency": 0,
                            "CompetencyLevel": ": 200 - 357",
                            "blnDisplayResultInPopup": false
                        }
                    ]
                },
                {
                    "SubjectId": "6237",
                    "SubjectName": "Sprache im Fokus",
                    "Results": []
                }
            ]
        }
    ];

    return arrData;
};
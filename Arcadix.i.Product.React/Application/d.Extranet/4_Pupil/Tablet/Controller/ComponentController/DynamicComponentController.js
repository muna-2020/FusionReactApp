import React from 'react';
import Loadable from 'react-loadable';

const loading = () => <div></div>;

const login = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Login/Login'),
    loading,
    modules: ['login']
});

const pupil = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Master/Master'),
    loading,
    modules: ['pupil']
});

const home = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Home/Home'),
    loading,
    modules: ['home']
});

const pupilprofile = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfile'),
    loading,
    modules: ['pupilprofile']
});


const worktest = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTest'),
    loading,
    modules: ['worktest']
});


const summary_popup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/ProgressReport/ProgressReport_SummaryPopup'),
    loading,
    modules: ['summary_popup']
});

const learningjournal = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan'),
    loading,
    modules: ['learningjournal']
});

const learningjournallist = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/PupilThink'),
    loading,
    modules: ['learningjournallist']
});

const news = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews'),
    loading,
    modules: ['news']
});

const pupiladdcontactpopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/PupilAddContactPopup'),
    loading,
    modules: ['pupiladdcontactpopup']
});


const sharenewspopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/PupilShareNewsPopup'),
    loading,
    modules: ['sharenewspopup']
});


const document = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocument'),
    loading,
    modules: ['document']
});


const createnewfolderpopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/PupilCreateFolderPopUp/PupilCreateFolderPopUp'
    ),
    loading,
    modules: ['createnewfolderpopup']
});

const pupiluploadfilepopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/UploadFilePopup/UploadFilePopup'),
    loading,
    modules: ['pupiluploadfilepopup']
});


const deletefolderpopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup'),
    loading,
    modules: ['deletefolderpopup']
});

const sharefolderpopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/ShareFolderPopup/ShareFolderPopup'),
    loading,
    modules: ['sharefolderpopup']
});

const copyfolderpopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp'),
    loading,
    modules: ['copyfolderpopup']
});

const pupildocumenterrorpopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/ErrorPopUp/ErrorPopUp'),
    loading,
    modules: ['pupildocumenterrorpopup']
});

const errormessagedeletedefaultimage = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfilePopUp/DeleteErrorPopUp/DeleteErrorPopUp'),
    loading,
    modules: ['errormessagedeletedefaultimage']
});

const errorprogressreportpopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/ErrorPopUp/ErrorPopUp'),
    loading,
    modules: ['errorprogressreportpopup']
});

const createnewtaskpopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/CreateNewExercisePopUp/CreateNewExercisePopUp'),
    loading,
    modules: ['createnewtaskpopup']
});

const testpopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/TestPopUp/TestPopUp'),
    loading,
    modules: ['testpopup']
});

const taskimagepopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/TaskImagePopUp/TaskImagePopUp'),
    loading,
    modules: ['testpopup']
});

const test = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilTest/PupilTest'),
    loading,
    modules: ['test']
});
const practicetestdisplay = Loadable({
    loader: () => import('@root/Application/d.Extranet/3_Teacher/PC/Modules/PracticeTestDisplay/PracticeTestDisplay'),
    loading,
    modules: ['practicetestdisplay']
});

const resetresultspopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/ResetResultsPopUp/ResetResultsPopUp'),
    loading,
    modules: ['resetresultspopup']
});

const practicetestpopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTestPopUp/PracticeTestPopUp'),
    loading,
    modules: ['practicetestpopup']
});

const practicetest = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTest'),
    loading,
    modules: ['practicetest']
});



export const components = {
    login: {
        LoadComponent: function () {
            return login;
        }
    },
    pupil: {
        LoadComponent: function () {
            return pupil;
        }
    },
    home: {
        LoadComponent: function () {
            return home;
        }
    },
    pupilprofile: {
        LoadComponent: function () {
            return pupilprofile;
        }
    },
    worktest: {
        LoadComponent: function () {
            return worktest;
        }
    },
    summary_popup: {
        LoadComponent: function () {
            return summary_popup;
        }
    },
    learningjournal: {
        LoadComponent: function () {
            return learningjournal;
        }
    },
    pupiltoplan_popup: {
        LoadComponent: function () {
            return pupiltoplan_popup;
        }
    },
    pupiltask_popup: {
        LoadComponent: function () {
            return pupiltask_popup;
        }
    },
    learningjournallist: {
        LoadComponent: function () {
            return learningjournallist;
        }
    },
    news: {
        LoadComponent: function () {
            return news;
        }
    },
    pupiladdcontactpopup: {
        LoadComponent: function () {
            return pupiladdcontactpopup;
        }
    },
    document: {
        LoadComponent: function () {
            return document;
        }
    },
    createnewfolderpopup: {
        LoadComponent: function () {
            return createnewfolderpopup;
        }
    },
    pupiluploadfilepopup: {
        LoadComponent: function () {
            return pupiluploadfilepopup;
        }
    },
    deletefolderpopup: {
        LoadComponent: function () {
            return deletefolderpopup;
        }
    },
    sharefolderpopup: {
        LoadComponent: function () {
            return sharefolderpopup;
        }
    },
    copyfolderpopup: {
        LoadComponent: function () {
            return copyfolderpopup;
        }
    },
    pupildocumenterrorpopup: {
        LoadComponent: function () {
            return pupildocumenterrorpopup;
        }
    },
    errorpopup: {
        LoadComponent: function () {
            return errorpopup;
        }
    },
    sharenewspopup: {
        LoadComponent: function () {
            return sharenewspopup;
        }
    },
    errormessagedeletedefaultimage: {
        LoadComponent: function () {
            return errormessagedeletedefaultimage;
        }
    },
    errorprogressreportpopup_designtempalte: {
        LoadComponent: function () {
            return errorprogressreportpopup_designtempalte;
        }
    },
    errorprogressreportpopup: {
        LoadComponent: function () {
            return errorprogressreportpopup;
        }
    },
    createnewtaskpopup_designtempalte: {
        LoadComponent: function () {
            return createnewtaskpopup_designtempalte;
        }
    },
    createnewtaskpopup: {
        LoadComponent: function () {
            return createnewtaskpopup;
        }
    },
    testpopup: {
        LoadComponent: function () {
            return testpopup;
        }
    },
    taskimagepopup: {
        LoadComponent: function () {
            return taskimagepopup;
        }
    },
    test: {
        LoadComponent: function () {
            return test;
        }
    },
    test_designtempalte: {
        LoadComponent: function () {
            return test_designtempalte;
        }
    },
    practicetestdisplay: {
        LoadComponent: function () {
            return practicetestdisplay;
        }
    },
    resetresultspopup: {
        LoadComponent: function () {
            return resetresultspopup;
        }
    },
    resetresultspopup_designtempalte: {
        LoadComponent: function () {
            return resetresultspopup_designtempalte;
        }
    },
    practicetestpopup: {
        LoadComponent: function () {
            return practicetestpopup;
        }
    },

    practicetest: {
        LoadComponent: function () {
            return practicetest;
        }
    }
}


const ComponentController = {
    getComponent: function (strComponentName) {
        var fullComponentName = strComponentName.split('?')[0];
        Logger.Log("string", fullComponentName.toLowerCase());
        if (components[fullComponentName.toLowerCase()] != null) {
            return components[fullComponentName.toLowerCase()].LoadComponent();
        }
        else {
            Logger.Log("notfound");
            return undefined;
        }
    }
}

export default ComponentController;






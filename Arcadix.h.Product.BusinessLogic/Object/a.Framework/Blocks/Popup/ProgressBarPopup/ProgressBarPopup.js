import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

var ProgressBarPopup_Component = {

    CancelProgressBar: (objParams, fnCallback) => {
        ArcadixFetchData.Execute([objParams],fnCallback);
    },

    GetProgressBarStatus: (objParams, fnCallback) => {
        ArcadixFetchData.Execute([objParams],fnCallback);
    }   
};

export default ProgressBarPopup_Component;

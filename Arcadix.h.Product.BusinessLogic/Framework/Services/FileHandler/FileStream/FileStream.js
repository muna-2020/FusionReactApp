import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

var FileStream = {

    GetFileURL: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Framework/Services/GetFileURL", "POST", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }

}

export default FileStream;
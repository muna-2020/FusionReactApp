//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Common functionality imports
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

export const HandleError = (Message, FileName, LineNo, ColumnNo, Error) => {
    var objError = {
        Message,
        Description: {
            FileName: FileName,
            LineNo: LineNo,
            ColumnNo: ColumnNo,
            Error
        }
    };
    let objJSErrors = ApplicationState.GetProperty("JSError") ? ApplicationState.GetProperty("JSError") : [];
    ApplicationState.SetProperty("JSError", [...objJSErrors, objError]);
    console.log("FrameworkError", objError);

    //Calling API to Log the Client-side exception
    ArcadixFetchData.ExecuteCustom("API/Framework/Services/FrameworkLogging/LogJsError", "Post", objError).then(response => response.json()).then(objErrorData => { 
        console.log("ErrorLogId :" ,objErrorData["ErrorLogId"]); 
    });

}
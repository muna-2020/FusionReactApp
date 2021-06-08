//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

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
    ApplicationState.SetProperty("JSError", [...objJSErrors, objError ]);
    console.log("FrameworkError", objError);
    fetch(JConfiguration.BaseUrl + "API/Framework/Services/FrameworkException/LogClientExceptionToDatabase?sessionkey=" + JConfiguration.SessionKey, {
        method: "POST",
        body: JSON.stringify(objError),
        headers: { "Content-Type": "application/json" },
        credentials: 'same-origin'
    });
}
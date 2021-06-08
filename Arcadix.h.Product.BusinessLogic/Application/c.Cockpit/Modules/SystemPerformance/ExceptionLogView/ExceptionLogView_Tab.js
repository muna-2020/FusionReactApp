//React related import
import { useEffect } from 'react';

/**
 * @name useInitializeModuleTabData
 * @param {*} objContext objContext
 * @summary useEffect to setTabData with the first tab as selected
 */
export function useInitializeModuleTabData() {
    var arrTabData = [
        { "text": "JSError", "type": "dropdown" },
        { "text": "SQLError", "type": "" },
        { "text": "ServerError", "type": "" },
        { "text": "ElasticException", "type": "" },
        { "text": "ElasticInsertFail", "type": "" },
        { "text": "ElasticUpdateFail", "type": "" },
        { "text": "ElasticDeleteFail", "type": "" },
        { "text": "KeyCloakExceptions", "type": "" }
    ];
    useEffect(() => {
        ApplicationState.SetProperty("ModuleTabData", { "ExceptionLogView": arrTabData });
    }, []);
}

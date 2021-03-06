// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as FTPMemberImport_OfficeRibbon from '@shared/Application/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport/FTPMemberImport_OfficeRibbon';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        intFrom: 1,
        intPageNumber: -1,
        intTotalRowCount: 0,
        arrFTPMemberImportData:[]
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.FTPMemberImport_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            //&& DataRef(objContext.props.Object_Extranet_MemberFtpSync)["Data"]
            && objContext.state.arrFTPMemberImportData.length > 0
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport", objContext.props)
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [           
            //objContext.props.Object_Extranet_MemberFtpSync,  
            objContext.state.arrFTPMemberImportData,
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport"],            
    ]);
}

/**
 * @name useSetRibbonData
 * @param {object} objContext objContext
 * @summary Setting up TabData and RibbonData
 */
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            var objRibbonData = {
                objContext,
                "FileContentPopup": () => objContext.FTPMemberImport_ModuleProcessor.OpenFileContentPopup(objContext),
                "AuditPopup": () => objContext.FTPMemberImport_ModuleProcessor.OpenFTPAuditPopup(objContext)
            };
            ApplicationState.SetProperty("OfficeRibbonData", FTPMemberImport_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
        }
    }, [objContext.state]);
}
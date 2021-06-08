import * as Localization from '@root/Framework/Blocks/Localization/Localization';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

class Base_ModuleProcessor {

    TextFormatter(objTextResource, strKey) {
        return Localization.TextFormatter(objTextResource, strKey);
    }

    /**
     * @param {array} arrMainClientLanguageData
     * @param {array} LanguageData
     * @param {int} iApplicationTypeForLanguageData
     * @returns {array} MultiLanguageData
     * Forms the multi language data and returns it.
     */
    GetMultiLanguageData(arrMainClientLanguageData, arrLanguageData, iApplicationTypeForLanguageData) {
        let arrMultiLanguageData = [];
        if (arrMainClientLanguageData && arrLanguageData) {
            let arrClientLanguageId = [];
            arrMainClientLanguageData.map((objMainClientLanguage) => {
                if ((objMainClientLanguage["iApplicationTypeId"] == (iApplicationTypeForLanguageData ? iApplicationTypeForLanguageData : 2)) && objMainClientLanguage["cIsDeleted"] === "N")
                    arrClientLanguageId = [...arrClientLanguageId, objMainClientLanguage["iLanguageId"]];
            });
            arrLanguageData.map((objLanguage) => {
                if (objLanguage["cIsActive"] == "Y" && arrClientLanguageId.includes(objLanguage["iFrameworkLanguageId"])) {
                    arrMultiLanguageData = [...arrMultiLanguageData, { ["iLanguageId"]: objLanguage["iFrameworkLanguageId"], ...objLanguage }];
                }
            });
        }
        let objInterfaceLanguage = arrMultiLanguageData.find(obj => obj["iLanguageId"] == JConfiguration.InterfaceLanguageId);
        arrMultiLanguageData = [...(objInterfaceLanguage ? [objInterfaceLanguage] : []), ...arrMultiLanguageData.filter(obj => obj["iLanguageId"] != JConfiguration.InterfaceLanguageId)];
        return arrMultiLanguageData;
    }

    /**
    * @param {array} arrRowData row data
    * @param {object} objFilter object conatins filters
    * get the filtered data as per givern filter
    */
    GetFilteredData(arrRowData, objFilter) {
        let arrFilteredData = arrRowData.filter(objRowData => {
            let blnIsFiltered = true;
            Object.keys(objFilter).map((strFilterKey) => {
                if (objFilter[strFilterKey] != objRowData[strFilterKey])
                    blnIsFiltered = false
            })
            return blnIsFiltered;
        });
        return arrFilteredData;
    }

    /**
     * @name Initialize
     * @summary updating the DataRefAPICall and DynamicStyles
     * @param {object} objContext objContext
     */
    Initialize(objContext, objModuleProcessor) {
        this.InitializeSSR(objContext, objModuleProcessor)
        Base_Hook.InitializeCss(objContext, objModuleProcessor);

        //will be called if performance enabled.
        if (JConfiguration.Performance) {
            Base_Hook.APICallsForPerformanceLog(objContext, objModuleProcessor);
            this.ModulePropsAndStateForPerformanceLog(objContext);
        }
    }

    /**
     * @name InitializeDataForSSR
     * @param {any} objContext
     * @param {any} objModuleProcessor
     */
    InitializeSSR(objContext, objModuleProcessor) {
        if (objContext.props.IsForServerRenderAPI) {
            if (objModuleProcessor.InitialDataParams || objModuleProcessor.GetDynamicStyles) {
                let InitialDataParams = new ObjectQueue().QueueAPI(objModuleProcessor, objContext.props);
                let arrDataAPICall = ApplicationState.GetProperty('DataAPICall') ? ApplicationState.GetProperty('DataAPICall') : [];
                arrDataAPICall = [...arrDataAPICall, ...InitialDataParams.DataCalls];
                ApplicationState.SetProperty('DataAPICall', arrDataAPICall);
            }
            ApplicationState.SetProperty('CacheHtml', true);
        }
    }

    /**
     * @name ModulePropsAndStateForPerformanceLog
     * @param {any} objContext
     * @summary map the Props and state for module.
     */
    ModulePropsAndStateForPerformanceLog(objContext) {
        if (objContext.ModuleName) {
            let objModuleProps = ApplicationState.GetProperty("ModuleProps");
            objModuleProps = { ...objModuleProps, [objContext.ModuleName.toString().toUpperCase()]: { Props: { ...objContext.props }, State: { ...objContext.state } } };
            ApplicationState.SetProperty("ModuleProps", objModuleProps);
        }
    }

    /**
    * @name ResetGridSelection
    * @summary To Reset Grid row Selection.
    * @param {string} strGridId GridId
    */
    ResetGridSelection(strGridId) {
        let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") && ApplicationState.GetProperty("ResetGridSelection")[strGridId] ? ApplicationState.GetProperty("ResetGridSelection")[strGridId] : null;
        if (fnResetGridSelection) {
            fnResetGridSelection();
        }
    }

    /**
    * @name SelectAdjacentGridRow
    * @summary To Select Adjacent Grid row.
    * @param {string} strGridId GridId
    */
    SelectAdjacentGridRow(strGridId, arrSelectedRows) {
        let fnSelectAdjacentGridRow = ApplicationState.GetProperty("SelectAdjacentGridRow") && ApplicationState.GetProperty("SelectAdjacentGridRow")[strGridId] ? ApplicationState.GetProperty("SelectAdjacentGridRow")[strGridId] : null;
        if (fnSelectAdjacentGridRow) {
            fnSelectAdjacentGridRow(arrSelectedRows);
        }
    }

    /**
    * @name SelectAdjacentGridRow
    * @summary To Select Adjacent Grid row.
    * @param {string} strGridId GridId
    */
    SelectTreeNode(strTreeId, objTreeNode) {
        let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")[strTreeId] ? ApplicationState.GetProperty("SelectTreeNode")[strTreeId] : null;
        if (fnSelectTreeNode) {
            fnSelectTreeNode(objTreeNode);
        }
    }

    /**
    * @name HandleEnterKeyDown
    * @summary To Handle Enter KeyDown event.
    * @param {string} strGridId GridId
    */
    HandleEnterKeyDown(objEvent, objModuleProcessor, objContext) {
        if (objEvent.key === "Enter" && objModuleProcessor.SaveData)
            objModuleProcessor.SaveData(objContext, true);
    }   
}

export default Base_ModuleProcessor;
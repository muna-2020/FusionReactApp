//Core Imports.
import { CreatePrefetchFilesLinkTag, CreateCssPrefetchLinkTag, CreateObjectPrefetchLinkTag } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';

//Component Controller.
import *  as ComponentController from "@root/Application/e.Editor/PC/Controller/ComponentController/ComponentController";
import * as ContainerTemplateController from "@root/Application/e.Editor/PC/Controller/ContainerTemplateController/ContainerTemplateController";
import * as ElementController_Editor from "@root/Application/e.Editor/PC/Controller/ElementController/Editor/ElementController_Editor.js"
import * as ElementController_TestApplication from "@root/Application/e.Editor/PC/Controller/ElementController/TestApplication/ElementController_TestApplication.js"

/**
 * @name LoadPrefetchEditorChunks
 * @param {boolean} blnIsProductManagement IsProductManagement
 * @summary Creates Prefetch link tags to load Chunk Files for Editor.
 */
export const LoadPrefetchEditorChunks = (blnIsProductManagement = false) => {
    if (JConfiguration.IsPrefetchEnabled) {
        let arrPrefetchComponents = ["Editor"];
        arrPrefetchComponents = [...arrPrefetchComponents, ...Object.keys(ComponentController.objComponents)];
        arrPrefetchComponents = [...arrPrefetchComponents, ...Object.keys(ContainerTemplateController.objComponents)];
        arrPrefetchComponents = [...arrPrefetchComponents, ...Object.keys(ElementController_Editor.objComponents)];
        if (blnIsProductManagement) {
            arrPrefetchComponents = [...arrPrefetchComponents, ...Object.keys(ElementController_TestApplication.objComponents)];
        }
        arrPrefetchComponents?.forEach(strComponent => {
            let strComponentPath = JConfiguration.BaseUrl + "Bundle/" + JConfiguration["ApplicationFolderName"] + JConfiguration["DeviceType"] + "/ClientBuild/" + strComponent + ".chunk.js"
            CreatePrefetchFilesLinkTag(strComponent, strComponentPath);
        });
        GetPrefetchEditorResourceList(arrPrefetchComponents);
    }
}

/**
 * @name GetPrefetchEditorResourceList
 * @param {Array} arrPrefetchComponents List of PrefetchComponents
 * @summary Creates Prefetch link tags to get the PrefetchResource List - will be formed in server side.
 */
export const GetPrefetchEditorResourceList = (arrPrefetchComponents) => {
    let arrComponentsToIgnorePrefetch = ["Standard"];
    arrPrefetchComponents = arrPrefetchComponents.filter(strComponent => !arrComponentsToIgnorePrefetch.includes(strComponent));
    let objParams = {
        "IsPrefetch": true,//CHECK
        "JConfiguration": JConfiguration,
        "PrefetchComponents": arrPrefetchComponents
    };
    CreateObjectPrefetchLinkTag("API/Object/Editor/Prefetch", objParams);
} 

/**
 * @name PrefetchEditorResourceData
 * @param {Array} objPrefetchData Resource Data to Prefetch
 * @summary Creates Prefetch link tags for Css and Initial DataCalls.
 */
export const PrefetchEditorResourceData = (objPrefetchData) => {
    //Css Prefetch
    let arrCssList = objPrefetchData["DynamicStyles"] ?? [];
    arrCssList?.forEach(strUrl => {
        var strId = strUrl.substring(strUrl.indexOf("Theme") + 7);
        CreateCssPrefetchLinkTag(strId, strUrl)
    });
    //Initial DataCalls Prefetch
    let arrDataCallParams = objPrefetchData["DataCallParams"] ?? [];
    arrDataCallParams.forEach(objDataCall => {
        CreateObjectPrefetchLinkTag(objDataCall["URL"], objDataCall["Params"]);
    });
}
// React related import
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import * as CMSImage_TestApplication_Hook from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_TestApplication/CMSImage_TestApplication_Hook";
import CMSImage_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_TestApplication/CMSImage_TestApplication_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSImage_TestApplication
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary CMSImage's editor version.
 * @returns {any} returns JSX
 */
const CMSImage_TestApplication = (props, ref) => {

    /**
     * @summary Define state and dispatch for the reducer to set state and also, holds ref's.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSImage_TestApplication_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        props,
        dispatch,
        "ModuleName": "CMSColorFill_TestApplication_" + props.ElementJson.iElementId,
        "CMSImage_TestApplication_ModuleProcessor": new CMSImage_TestApplication_ModuleProcessor()
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objTextElementProps = {};
        if (objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = objContext.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = objContext.CMSImage_TestApplication_ModuleProcessor.GetTextElementProps(objContext, objElementHeader["iElementTextId"]);
        }
        return (
            <div ielementid={objContext.state.ElementJson.iElementId} ielementtypeid={objContext.state.ElementJson.iElementTypeId}>
                {
                    objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? <CMSText_TestApplication {...objTextElementProps} /> : ""
                }
                <div id="image_wrapper">
                    <img
                        draggable="false"
                        src={`${objContext.props.JConfiguration.WebDataPath}Repo/Image/${objContext.props.JConfiguration.MainClientId}/${objContext.state.ElementJson.iElementId}_Image_${objContext.state.ElementJson.vElementJson["iImageFileVersion"]}.${objContext.state.ElementJson.vElementJson["vImageType"]}`}
                        alt={objContext.state.ElementJson["vElementJson"]["vElementImageName"]}
                    />
                </div>
            </div>
        );
    };

    /**
    * @summary Calls the GetContent method.
    * */
    return GetContent();
};

export default CMSImage_TestApplication;

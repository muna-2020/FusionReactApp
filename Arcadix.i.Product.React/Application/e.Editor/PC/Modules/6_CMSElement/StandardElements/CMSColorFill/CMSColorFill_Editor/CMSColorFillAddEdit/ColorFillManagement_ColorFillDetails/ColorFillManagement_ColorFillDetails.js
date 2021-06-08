// React related import
import React, { useEffect, useRef, useState } from 'react';

//Base classes/hooks
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

import ColorFillManagement_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFill/CMSColorFill_Editor/ColorFillAddEdit/ColorFillManagement/ColorFillManagement_ModuleProcessor';

const ColorFillManagement_ColorFillDetails = (props) => {

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
    */
    EditorBase_Hook.InitializeCss(props, new ColorFillManagement_ModuleProcessor());

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        return (
            <div className="object-detail-colorfill-properties">
                <h2>{props.TextResource["Main_Title"]}</h2>
                <h3>{props.TextResource["Sub_Title"]}</h3>
                <table>
                    <tr>
                        <td>{props.TextResource["Name"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["vColorFillName"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["FileSize_Text"]}:</td>
                        <td>{props.ElementDetails["vElementJson"]["iColorFillFileSize"]}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["Created_On"]}:</td>
                        <td>{BaseCMSElement.GetDate(props.ElementDetails.dtCreatedOn)}</td>
                    </tr>
                    <tr>
                        <td>{props.TextResource["Edited_On"]}:</td>
                        <td>{BaseCMSElement.GetDate(props.ElementDetails.dtModifiedOn)}</td>
                    </tr>
                </table>
                <h3>{props.TextResource["Description"]}:</h3>
                <p>{props.ElementDetails["vElementJson"]["vElementColorFillDescription"].length > 0 ? props.ElementDetails["vElementJson"]["vElementColorFillDescription"] : "-"}</p>

                {
                    (props.blnShowColorFill != null ? props.blnShowColorFill : true) && <div>
                        <img src={`${props.JConfiguration.WebDataPath}Repo/ColorFill/${props.JConfiguration.MainClientId}/${props.ElementDetails.iElementId}_ColorFill_${props.ElementDetails.vElementJson.iColorFillFileVersion}.${props.ElementDetails.vElementJson.vColorFillType}`} />
                    </div>
                }
            </div>
        );
    };

    /**
    * @summary Calls the GetContent method.
    * */
    return GetContent();
};

export default ColorFillManagement_ColorFillDetails;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ColorFillManagement_ModuleProcessor; 
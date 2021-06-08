//React imports
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module specific imports
import * as SchoolDataComparison_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/SchoolDataComparison/SchoolDataComparison_Hook';
import SchoolDataComparison_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/Modules/SchoolDataComparison/SchoolDataComparison_ModuleProcessor';

/**
* @name SchoolDataComparison
* @param {object} props props
* @summary This component displays the SchoolDataComparison data in grid.
* @returns {object} React.Fragement that encapsulated the display  SchoolDataComparison details in table.
*/
const SchoolDataComparison = props => {

    /**
    * @name StateInitializer
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, SchoolDataComparison_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, props, dispatch and module-object to one object, and sent as a parameter to functions.
    */
    let objContext = { state, props, dispatch, ["SchoolDataComparison_ModuleProcessor"]: new SchoolDataComparison_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
     * @name HookInitializer
     * @summary Initialize the hooks.
     */
    SchoolDataComparison_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.SchoolDataComparison_ModuleProcessor.Initialize(objContext, objContext.SchoolDataComparison_ModuleProcessor);

    /**
    * @name GetTableData
    * @summary Function that returns html for Initial table data
    * @returns {Array}
    */
    function GetTableData(objData) {
        var arrTableData = objData.Data ? objData.Data.map(objRow => {
            return (
                <tr className={objRow.IsMainSubject == "Y" ? "main-subject" : ""}>
                    <td colSpan="5">
                        <span>{objRow[objData.Header[0]["ClassTypeName"]]}</span>
                    </td>
                    <td>
                        <div className="image-wrapper">
                            <img onClick={() => { dispatch({ type: 'SET_STATE', payload: { showDetailsPopup: true, objPopupRowDetails: objRow, vSubjectName: objRow[objData.Header[0]["ClassTypeName"]] } }) }}
                                src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/plus.svg")}

                            />
                        </div>
                    </td>
                </tr>
            );
        }) : [];
        return arrTableData;
    }

    function GetRowForPopup(objData) {
        let arrHeaders = objData.Header;
        let objActualHeaders = objData.Data[0];
        delete objActualHeaders["vSubjectName"];
        let arrElements = [];
      arrHeaders.map(objHeaders => {
            if (objHeaders["ClassTypeName"] != "vSubjectName") {
                let element = <>
                    <tr>
                        <td className="main-subject">{objActualHeaders[objHeaders["ClassTypeName"]]}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="main-subject">{objActualHeaders[objHeaders["ClassTypeName"]]}</td>
                        <td>{state.objPopupRowDetails[objHeaders["ClassTypeName"]]}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </>
                arrElements = [...arrElements, element]
            }
        })

        return arrElements;
    }

    /**
     * @name GetContent
     * @summary returns the required jsx for component.
     * @returns {Element} 
     * */
    function GetContent() {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/DataComparison", props);
        let objData = {};
        if (Object.keys(state.objData).length == 0) {
            if (DataRef(objContext.props.Extranet_School_SchoolDataComparison_Module) && DataRef(objContext.props.Extranet_School_SchoolDataComparison_Module)["Data"].length > 0)
                objData = DataRef(objContext.props.Extranet_School_SchoolDataComparison_Module)["Data"][0];
        }
        else
            objData = state.objData;
        return (
            <React.Fragment>
                <div className="data-comparison">
                    <div className="data-comparison-title">
                        <span>Leistungsvergleich</span>
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/exclamation_mark.svg")}

                        />
                    </div>

                    <div className="data-comparison-content-wrapper">
                        <div className="top-right-menu">
                            <p class="top-right-label-color">{Localization.TextFormatter(objTextResource, 'TopRightCornerTitle')}</p>
                            <p><label class="top-right-label-color">{Localization.TextFormatter(objTextResource, 'FirstSubTtile')} :</label><span> {Localization.TextFormatter(objTextResource, 'FirstSubTtileDecription')} </span></p>
                            <p><label class="top-right-label-color">{Localization.TextFormatter(objTextResource, 'SecondSubTtile')}:</label><span> {Localization.TextFormatter(objTextResource, 'SecondSubTtileDecription')}</span></p>
                        </div>

                        <div className="data-comparison-table-wrapper">
                            <table className="data-comparison-table">
                                <tbody>
                                    {GetTableData(objData)}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {
                        state.showDetailsPopup ?
                            <div className="data-comparison-popup-modal-main">
                                <div className="data-comparison-popup-modal-inner">
                                    <div className="data-comparison-popup-overlay-main">
                                        <div className="data-comparison-popup-main">
                                            <div className="data-comparison-popup-content">
                                                <div className="data-comparison-popup-header">
                                                    <h3>{state.vSubjectName}</h3>
                                                    <img src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/close.svg")}
                                                        onClick={() => { dispatch({ type: 'SET_STATE', payload: { showDetailsPopup: false } }) }}
                                                    />
                                                </div>
                                                <div className="data-comparison-popup-table-main">
                                                    <table className="data-comparison-popup-table">
                                                        <tbody>
                                                            {GetRowForPopup(objData)}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : <></>

                    }
                    <div className="data-comparison-footer">
                        <button class="button brown-button footerBtn" onClick={() => { objContext.SchoolDataComparison_ModuleProcessor.OpenProgressBarPopup(objContext, objTextResource); }}>{Localization.TextFormatter(objTextResource, 'LoadDataButton')}</button>
                        <button class="button brown-button footerBtn" onClick={() => { objContext.SchoolDataComparison_ModuleProcessor.OpenPrintToPdfProgressBarPopup(objContext, objTextResource); }}> {Localization.TextFormatter(objTextResource, 'PrintToPdf')}</button>
                    </div>

                </div>
            </React.Fragment>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};


/**
 * @name ComponentConnector
 * @summary Connecting Module component to store
 * */
export default connect(ExtranetBase_Hook.MapStoreToProps(SchoolDataComparison_ModuleProcessor.StoreMapList()))(SchoolDataComparison);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SchoolDataComparison_ModuleProcessor; 
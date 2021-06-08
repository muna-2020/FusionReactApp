// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as ImplementationStep_Hook from '@shared/Application/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep_Hook';
import ImplementationStep_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep_ModuleProcessor';
import * as ImplementationStep_MetaData from '@shared/Application/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep_MetaData';
import DocumentDetails from '@root/Application/c.ProductManagement/PC/Modules/7_Shared/DocumentDetails/DocumentDetails';

/**
* @name ImplementationStep
* @param {object} props props
* @summary This component displays the ImplementationStep data
* @returns {object} React.Fragement that contains ImplementationStep details.
*/
const ImplementationStep = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, ImplementationStep_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ImplementationStep", ["ImplementationStep_ModuleProcessor"]: new ImplementationStep_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.ImplementationStep_ModuleProcessor.Initialize(objContext, objContext.ImplementationStep_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    ImplementationStep_Hook.Initialize(objContext);

    /** @CodeTracerStart Teacher Edit1_Display_78 */
    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        let arrImplementationStepData = DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep, "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep;uUseCaseId;" + objContext.props.Data.UseCaseId + ";cIsDeleted;N")["Data"];
        arrImplementationStepData = arrImplementationStepData ? arrImplementationStepData.sort((a, b) => a.iOrderId - b.iOrderId) : [];

        let objSelectedRow = ApplicationState.GetProperty("SelectedRows")?.["ImplementationStepGrid"]?.[0];
        let objPageJson = objContext.state.objPageJson != null ? objContext.state.objPageJson["iPageId"] == objSelectedRow["iPageId"] ? objContext.state.objPageJson : {} : {}

        return <div className="file-explorer-container" id="UseCase">
            <div className="file-explorer-flex">
                <SplitPane
                    Meta={{ SplitDirection: "vertical", MinSize: 50, DefaultSize: "70%" }}
                >
                    <div className="usecase-grid-holder">
                        <Grid
                            Id='ImplementationStepGrid'
                            Meta={{ ...ImplementationStep_MetaData.GetMetaDataForImplementationStep(), Filter: { "cIsDeleted": "N" } }}
                            Resource={objContext.ImplementationStep_ModuleProcessor.GetResourceData(objContext)}
                            Data={{
                                RowData: arrImplementationStepData,
                                DropDownData: objContext.ImplementationStep_ModuleProcessor.GetDependingColumnData(objContext),
                            }}
                            Events={{
                                OnClickRow: (Data, event) => objContext.ImplementationStep_ModuleProcessor.OnClickRow(Data.SelectedRow, objContext),
                            }}
                            CallBacks={objContext.ImplementationStep_ModuleProcessor.GetImplementationStepGridCallBacks(objContext)}
                            ParentProps={{ ...objContext.props.ParentProps }}
                        />
                    </div>
                    <div className="file-explorer-detail">
                        {
                            objSelectedRow
                                ?
                                <DocumentDetails
                                    {...props}
                                    Data={{
                                        ModuleId: objSelectedRow.uUseCaseImplementationStepId,
                                        DisplayData: objSelectedRow,
                                        objPageJson: objPageJson
                                    }}                                    
                                />
                                :
                                <div>Please Select Implementation Step</div>
                        }
                    </div>
                </SplitPane>
            </div>
        </div>;
    }
    /** @CodeTracerEnd Teacher Edit1_Display_78 */

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default connect(CockpitBase_Hook.MapStoreToProps(ImplementationStep_ModuleProcessor.StoreMapList()))(ImplementationStep);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ImplementationStep_ModuleProcessor;
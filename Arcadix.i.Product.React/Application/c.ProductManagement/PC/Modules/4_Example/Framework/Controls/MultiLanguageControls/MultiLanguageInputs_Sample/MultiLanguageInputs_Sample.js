// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import MultiLanguageInputs from '@root/Framework/Controls/MultiLanguageControls/MultiLanguageInputs/MultiLanguageInputs';
import MultiLanguageInputs_Sample_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/MultiLanguageControls/MultiLanguageInputs_Sample/MultiLanguageInputs_Sample_ModuleProcessor';
import * as MultiLanguageInputs_Sample_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/MultiLanguageControls/MultiLanguageInputs_Sample/MultiLanguageInputs_Sample_Hook';

/**
* @name MultiLanguageInputs_Sample
* @param {object} props props
* @summary This component displays the MultiLanguageInputs_Sample.
* @returns {object} React.Fragement that encapsulated the display text boxes for different languages.
*/
const MultiLanguageInputs_Sample = props => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, MultiLanguageInputs_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch };

    /**
    * @name useDataLoaded
    * @param {object} objContext context object
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    MultiLanguageInputs_Sample_Hook.useDataLoaded(objContext);

    /**
     * @name Events
     * @summary contains OnChangeEvent. In OnChange method Recieves the data of Language and the value of textbox from MultiLanguageInputs control and agian updates the state with newly recieved data.
     * */
    let Events = {
        OnChange: (event, objLanguage) => {
            let arrNewData = state.objData[props.Meta.DependingTableName].map(objTableData => {
                if (objTableData.iLanguageId == objLanguage.iLanguageId) {
                    return {
                        ...objTableData,
                        [props.Meta.DisplayColumn]: event.target.value
                    }
                } else {
                    return {
                        ...objTableData
                    }
                }
            })
            let objNewData = {
                ...state.objData,
                [props.Meta.DependingTableName]: arrNewData
            }
            dispatch({ type: "SET_STATE", payload: { objData: objNewData } })
        }
    }

    /**
     * @name Data
     * @summary Data for Control.
     * */
    let Data = {
        ...props.Data,
        DisplayData: state.objData // objData should be in state because to reflect the values in textboxes of control we need to update our local state. 
        //(If we update local state then control rerenders and displays the latest data)
    }

    /**
     * @name GetContent
     * @summary required jsx for component.
     * */
    function GetContent() {
        return (
            <div style={{ paddingLeft: 50 + 'px' }} >
                <div>Displays the multiple inputs.</div>
                <MultiLanguageInputs
                    Id="MultiLanguageInputs_Sample"
                    Data={Data}
                    Meta={props.Meta}
                    Events={Events}
                />
            </div>
        );
    }

    return GetContent();
}

export default connect(MultiLanguageInputs_Sample_ModuleProcessor.GetStoreData())(MultiLanguageInputs_Sample);
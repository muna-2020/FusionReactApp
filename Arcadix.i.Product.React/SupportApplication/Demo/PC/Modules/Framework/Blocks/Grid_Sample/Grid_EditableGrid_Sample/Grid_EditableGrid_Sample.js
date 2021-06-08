// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';
//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
//Module realted fies.
import Grid from '@root/Framework/Blocks/Grid/Grid';
import Grid_EditableGrid_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Blocks/Grid_Sample/Grid_EditableGrid_Sample/Grid_EditableGrid_Sample_ModuleProcessor';
import * as Grid_EditableGrid_Sample_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Blocks/Grid_Sample/Grid_EditableGrid_Sample/Grid_EditableGrid_Sample_Hook';

/**
* @name Display_Sample
* @param {object} props props
* @summary This component displays the Display_Sample.
* @returns {object} React.Fragement that encapsulated the display grid with Display_Sample.
*/
const Grid_EditableGrid_Sample = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Grid_EditableGrid_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["Grid_EditableGrid_Sample_ModuleProcessor"]: new Grid_EditableGrid_Sample_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @param {object} objContext context object
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    Grid_EditableGrid_Sample_Hook.useDataLoaded(objContext);

    const GetContent = () => {

        return (
            <div className="extranet-editable-grid">
            <Grid
                Meta={props.Meta}
                Data={{ ...props.Data, RowData: state.arrRowData }}
                Resource={props.Resource}
                Events={objContext.Grid_EditableGrid_Sample_ModuleProcessor.GetEvents(objContext)}
                CallBacks={objContext.Grid_EditableGrid_Sample_ModuleProcessor.GetCallBacks(objContext)}
                ParentProps={{ ...props }}
                />
            </div>
        );
    }

    return state.IsLoadComplete ? GetContent() : <React.Fragment />

}

Grid_EditableGrid_Sample.DynamicStyles = props => {
    return [
        props.JConfiguration.SupportApplication + "/Demo/PC/Modules/Framework/Blocks/Grid_Sample/Grid_EditableGrid_Sample/Grid_EditableGrid_Sample.css",
        props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDown/DropDown.css"
    ];
};

export default connect(Grid_EditableGrid_Sample_ModuleProcessor.GetStoreData())(Grid_EditableGrid_Sample);
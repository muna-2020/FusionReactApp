// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';
//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
//Module realted fies.
import Grid from '@root/Framework/Blocks/Grid/Grid';
import Grid_DisplayGrid_Sample_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Grid_Sample/Grid_DisplayGrid_Sample/Grid_DisplayGrid_Sample_ModuleProcessor';
import * as Grid_DisplayGrid_Sample_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Grid_Sample/Grid_DisplayGrid_Sample/Grid_DisplayGrid_Sample_Hook';

import * as Grid_DisplayGrid_Sample_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Grid_Sample/Grid_DisplayGrid_Sample/Grid_DisplayGrid_Sample_MetaData';
import * as Grid_DisplayGrid_Sample_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Grid_Sample/Grid_DisplayGrid_Sample/Grid_DisplayGrid_Sample_ResourceData';
import * as Grid_DisplayGrid_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Grid_Sample/Grid_DisplayGrid_Sample/Grid_DisplayGrid_Sample_Data';

/**
* @name Display_Sample
* @param {object} props props
* @summary This component displays the Display_Sample.
* @returns {object} React.Fragement that encapsulated the display grid with Display_Sample.
*/
const Grid_DisplayGrid_Sample = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Grid_DisplayGrid_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["Grid_DisplayGrid_Sample_ModuleProcessor"]: new Grid_DisplayGrid_Sample_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @param {object} objContext context object
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    //Grid_DisplayGrid_Sample_Hook.useDataLoaded(objContext);

    let objData = {
        ["Data"]: Grid_DisplayGrid_Sample_Data.GetData(),
        ["Meta"]: Grid_DisplayGrid_Sample_MetaData.GetMetaData(),
        ["Resource"]: Grid_DisplayGrid_Sample_ResourceData.GetResourceData()
    };

    const GetContent = () => {
        return (
            <Grid
                Meta={objData.Meta}
                Data={objData.Data}
                Resource={objData.Resource}
                Events={objContext.Grid_DisplayGrid_Sample_ModuleProcessor.GetEvents(objContext)}
                CallBacks={objContext.Grid_DisplayGrid_Sample_ModuleProcessor.GetCallBacks(objContext)}
                ParentProps={{ ...props }}
            />
        );
    }

    return state.IsLoadComplete ? GetContent() : <React.Fragment />

}

Grid_DisplayGrid_Sample.DynamicStyles = props => {
    return [
        props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
    ];
};

export default Grid_DisplayGrid_Sample;
//export default connect(Grid_DisplayGrid_Sample_ModuleProcessor.GetStoreData())(Grid_DisplayGrid_Sample);
import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import DisplayGrid from '@root/Framework/Blocks/Grid/Grid';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import * as AdditionalTaskPropertyBusinessLogic from '@shared/Application/c.Intranet/Modules/8_Setting/AdditionalTaskProperty/AdditionalTaskPropertyBusinessLogic';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

const AdditionalTaskProperty = props => {
    /**
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(AdditionalTaskPropertyBusinessLogic.Reducer, AdditionalTaskPropertyBusinessLogic.GetInitialState());

    /**
    * @summary Combines state, props and dispatch to one object, and sent as a parameter to funtions in business logic.
    */
    let objContext = { state, props, dispatch };

    /**
    * @param {*} objContext 
    * @summary   Calls the DataCall method and the InitialDataParams.
    */
    AdditionalTaskPropertyBusinessLogic.useDataLoader(objContext);
    
    /**
     * @summary Custom hook that Checks if the data is loaded to props.
     */
    AdditionalTaskPropertyBusinessLogic.useDataLoaded(objContext);

    /**
    * @param {*} objContext
    * @summary Set RibbonData
    */
   AdditionalTaskPropertyBusinessLogic.useSetRibbonData(objContext);

   AdditionalTaskPropertyBusinessLogic.useOnTaskAdditionalPropertyUpdate(objContext);

    function GetContent(){
        let arrAdditionalPropertyData = DataRef(props.taskadditionalproperty)["Data"];
        let objTextResource = DataRef(props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/taskadditionalproperty").Data["0"].TaskAdditionalProperty;
        let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
        let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");
        return(
            <div>               
                <DisplayGrid RowData={arrAdditionalPropertyData}
                    Header={AdditionalTaskPropertyBusinessLogic.GetObjectGenerator()}
                    ResourceText={Localization.TextFormatter(objTextResource,"EmptyMessage")} 
                    ColumnTextResource={objTextResource}
                    JConfiguration={props.JConfiguration}
                    MainClientLanguageData={arrMainClientlanguageData}
                    LanguageData={arrLanguageData}
                    ImagePath={props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/"}
                    DeleteColumnName="cIsDeleted"
                />
            </div>
            );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

//required for SSR
AdditionalTaskProperty.InitialDataParams = (JConfiguration, props) => {
    return AdditionalTaskPropertyBusinessLogic.InitialDataParams(JConfiguration, props);
};
export default connect(AdditionalTaskPropertyBusinessLogic.mapStateToProps)(AdditionalTaskProperty);
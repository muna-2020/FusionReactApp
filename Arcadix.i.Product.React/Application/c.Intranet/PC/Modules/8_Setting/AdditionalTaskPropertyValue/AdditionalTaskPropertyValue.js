import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import DisplayGrid from '@root/Framework/Blocks/Grid/Grid';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import * as AdditionalTaskValueBusinessLogic from '@shared/Application/c.Intranet/Modules/8_Setting/AdditionalTaskPropertyValue/AdditionalTaskPropertyValueBusinessLogic';
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown.js" 
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

const AdditionalTaskPropertyValue = props => {
     /**
       * @summary Provides state and dispatch.
       */
    const [state, dispatch] = useReducer(AdditionalTaskValueBusinessLogic.Reducer, AdditionalTaskValueBusinessLogic.GetInitialState());

     /**
       * @summary Combines state, props and dispatch to one object, and sent as a parameter to funtions in business logic.
       */
    let objContext = { state, props, dispatch };

    /**
    * @param {*} objContext 
    * @summary   Calls the DataCall method and the InitialDataParams.
    */
    AdditionalTaskValueBusinessLogic.useDataLoader(objContext);
    
    /**
     * @summary Custom hook that Checks if the data is loaded to props.
     */
    AdditionalTaskValueBusinessLogic.useDataLoaded(objContext);
    
    /**
    * @param {*} objContext
    * @summary Set RibbonData
    */
   AdditionalTaskValueBusinessLogic.useSetRibbonData(objContext);

   AdditionalTaskValueBusinessLogic.useOnTaskAdditionalPropertyValueUpdate(objContext);

    function GetContent(){
      let arrAdditionalPropertyData = DataRef(objContext.props.taskadditionalproperty)["Data"];
      let objTextResource =  DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/8_setting/taskadditionalpropertyvalue").Data["0"].TaskAdditionalPropertyValue;
      let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
      let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");
      return(
            <div>
                <DropDown 
                    Data = {arrAdditionalPropertyData} 
                    DisplayColumn = "vAdditionalTaskProperty" 
                    ValueColumn = "iAdditionalTaskPropertyId" 
                    SelectedValue={state.strSelectedPropertyId}
                    IsLanguageDependent = "Y" 
                    DependingTableName = "t_TestDrive_Task_AdditionalTaskProperty_Data" 
                    ImgPath = '/Images/Common/Icons/angle_down.svg' 
                    OnChangeEventHandler = {(objItem) => { AdditionalTaskValueBusinessLogic.OnDropDownChange(objContext,objItem) }}
                    JConfiguration = {props.JConfiguration}
                    ShowDefaultOption = {true}  //if want any default option to be displayed
                    DefaultOptionText = "Please select"
                    DefaultOptionValue = {-1} //give id for default item
                    CheckDeletedDropDownData={AdditionalTaskValueBusinessLogic.CreateItemEventHandler} />

                <DisplayGrid
                    RowData={state.arrSelectedAdditionalPropertyValueData}
                    Header={AdditionalTaskValueBusinessLogic.GetObjectGenerator()}
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
AdditionalTaskPropertyValue.InitialDataParams = (JConfiguration, props) => {
    return AdditionalTaskValueBusinessLogic.InitialDataParams(JConfiguration, props);
};
export default connect(AdditionalTaskValueBusinessLogic.mapStateToProps)(AdditionalTaskPropertyValue);
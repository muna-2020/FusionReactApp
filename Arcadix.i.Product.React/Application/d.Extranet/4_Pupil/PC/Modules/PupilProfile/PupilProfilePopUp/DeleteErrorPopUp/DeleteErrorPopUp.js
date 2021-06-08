//React related imports
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module realted fies.
import * as PupilProfile_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfile_Hook';
import PupilProfile_ModuleProcessor from "@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfile_ModuleProcessor";

const DeleteErrorPopUp = (props) => {
    let objTextResource = props.Resource.Text.objTextResource;

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.PupilProfile_ModuleProcessor.Initialize(objContext, objContext.PupilProfile_ModuleProcessor);

   return (
       <div className="error-image-wrapper">
           <div className="error-image-message">
               <div className="error-image-header">
                   <span> {Localization.TextFormatter(objTextResource, 'ErrorDefaultMessageHeader')}</span> 
               </div>

               <div className="error-default-message">
                   <span>{Localization.TextFormatter(objTextResource, 'ErrorDefaultMessage')}</span> 
               </div>
        
           </div>
           <div className="close-button">
               <span className="button close-default-greenbtn" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'CloseText')}</span> 
           </div>
        </div>
    );
};

//DeleteErrorPopUp.DynamicStyles = () => {
//    var arrStyles = [
//        JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilProfile/PupilProfilePopUp/DeleteErrorMessage.css"
       
//    ];
//    return arrStyles;
//};
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilProfile_ModuleProcessor.StoreMapList()))(DeleteErrorPopUp);

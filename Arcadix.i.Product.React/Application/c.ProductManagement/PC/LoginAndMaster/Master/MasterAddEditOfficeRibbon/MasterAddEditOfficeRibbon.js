// React related impoprts.
import React from "react";
import { connect } from "react-redux";
//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
//Component realted fies...
import MasterAddEditOfficeRibbon_ComponentProcessor from "@shared/Application/c.ProductManagement/LoginAndMaster/Master/MasterAddEditOfficeRibbon/MasterAddEditOfficeRibbon_ComponentProcessor";
//Components used...
import OfficeRibbon from '@root/Framework/Controls/OfficeRibbon/OfficeRibbon';

/**
 * 
 * @param {*} props 
 * This is a wrapper component to load the OfficeRibbon with the data mapped from the store(redux)...
 */
const MasterAddEditOfficeRibbon = props => {

    /**
     * Form the JSX for OfficeRibbon
     */
    const GetOfficeRibbon = () => {
        let domOfficeRibbon = props.PopupOfficeRibbonData && props.PopupOfficeRibbonData[props.ModuleName] ?
            <OfficeRibbon OfficeRibbonData={props.PopupOfficeRibbonData[props.ModuleName]}
                SkinPath={props.JConfiguration.ExtranetSkinPath}
                JConfiguration={props.JConfiguration}
                ComponentController={props.ComponentController}
                isSSRDisabled={false} />
            :
            <React.Fragment />
        return domOfficeRibbon;
    }

    return (
        <div className="nav-bar">
            {GetOfficeRibbon()}
        </div>
    );
};

export default connect(Base_Hook.MapStoreToProps(MasterAddEditOfficeRibbon_ComponentProcessor.StoreMapList()))(MasterAddEditOfficeRibbon);

// React related impoprts.
import React from "react";
import { connect } from "react-redux";
//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
//Component realted fies...
import OfficeRibbon_ComponentProcessor from "@shared/Application/c.ProductManagement/LoginAndMaster/Master/MasterOfficeRibbon/MasterOfficeRibbon_ComponentProcessor";
//Components used...
import OfficeRibbon from '@root/Framework/Controls/OfficeRibbon/OfficeRibbon';

//Inline Images import
import NewImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/New_Large.svg?inline';
import EditImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Edit_Large.svg?inline';
import DeleteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Delete_Large.svg?inline';

/**
 * 
 * @param {*} props 
 * This is a wrapper component to load the OfficeRibbon with the data mapped from the store(redux)...
 */
const MasterOfficeRibbon = props => {

    /**
     * Form the JSX for OfficeRibbon
     */
    const GetOfficeRibbon = () => {
        let arrOfficeRibbonData = (props.IsForServerRenderHtml && props.ApplicationStateData) ? props.ApplicationStateData.OfficeRibbonData : props.OfficeRibbonData;
        let domOfficeRibbon = arrOfficeRibbonData ?
            <OfficeRibbon Data={{ OfficeRibbonData: arrOfficeRibbonData }}
                Resource={{ SkinPath: props.SkinPath }}
                ImageMeta={GetDefaultInlineImages()}
                ParentProps={props}
            />
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

/**
 * @name GetDefaultInlineImages
 * @summary forms the default images for inline import.
 * */
const GetDefaultInlineImages = () => {
    return {
        NewImage: NewImage,
        EditImage: EditImage,
        DeleteImage: DeleteImage
    }
}

export default connect(Base_Hook.MapStoreToProps(OfficeRibbon_ComponentProcessor.StoreMapList()))(MasterOfficeRibbon);

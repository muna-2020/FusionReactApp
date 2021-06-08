//Base class imports
import SchoolDataComparison_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDataComparison/SchoolDataComparison_ModuleProcessor";

/**
 * @nameSchoolDataComparison_ModuleProcessor.
 * @summary business layer for SchoolDataComparison.
 * */
class SchoolDataComparison_ModuleProcessor extends SchoolDataComparison_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/DataComparison/DataComparison.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/DataComparison/DataComparisonPopUp.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/DataComparisonArchive/DataComparisonArchive.css"
        ];
    }
}

export default SchoolDataComparison_ModuleProcessor;
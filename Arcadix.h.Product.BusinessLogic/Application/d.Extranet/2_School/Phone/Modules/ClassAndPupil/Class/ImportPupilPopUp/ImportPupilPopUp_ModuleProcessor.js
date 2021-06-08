//Base class imports
import ImportPupilPopUp_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/ImportPupilPopUp_ModuleProcessor";

/**
 * @name ImportPupilPopUp_ModuleProcessor.
 * @summary business layer for ImportPupilPopUp.
 * */
class ImportPupilPopUp_ModuleProcessor extends ImportPupilPopUp_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/ClassAndPupil/ImportData/ImportData.css"
        ];
    }

}

export default ImportPupilPopUp_ModuleProcessor;
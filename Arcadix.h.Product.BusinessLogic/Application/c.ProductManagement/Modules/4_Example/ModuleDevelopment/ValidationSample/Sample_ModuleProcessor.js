//Objects required for module.
import Object_Demo_Sample from '@shared/Object/SupportApplication/Demo/Sample/Sample';

//Module Related files
import * as Sample_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/ModuleDevelopment/ValidationSample/Sample_MetaData';

/**
* @name Sample_ModuleProcessor
* @summary Class for Country module display.
*/
class Sample_ModuleProcessor extends IntranetBase_ModuleProcessor {

    constructor() {
        super();
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Demo_Sample", "Object_Framework_Services_TextResource"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        //Sample object
        Object_Demo_Sample.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Demo_Sample];

        // Text Resource
        let arrResourceParams = ["/l.Demo/Modules/Sample"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multilanguage input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }

    OnClickValidate(objContext) {
        let objValidationObject = this.Validate(objContext);
        if (!objValidationObject) {
            document.getElementById('ValidationError').innerHTML = "Validated Succesfully";
        }
    }

    /**
   * @name Validate
   * @param {object} objContext takes objContext
   * @param {strColumnName} strColumnName strColumnName
   * @summary Validate
   * @returns {object} objNewValidationObject
   */
    Validate(objContext, strColumnName) {

        let arrMetaData = Sample_MetaData.GetSampleMetaData();
        var objTextResource = Object_Framework_Services_TextResource.GetData("/l.Demo/Modules/Sample", objContext.props);

        var objNewValidationObject = FieldValidator.ValidateClientSide(arrMetaData, objTextResource, objContext.state.objData, strColumnName, true, "ValidationError");
        objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
    }

    /**
    * @name ValidateFocus
    * @param {domValidationMessage} domValidationMessage takes domValidationMessage
    * @param {object} objContext takes objContext
    * @param {strColumnName} strColumnName strColumnName
    * @summary hits the add/edit api after validation succeeds
    */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }
}

export default Sample_ModuleProcessor;
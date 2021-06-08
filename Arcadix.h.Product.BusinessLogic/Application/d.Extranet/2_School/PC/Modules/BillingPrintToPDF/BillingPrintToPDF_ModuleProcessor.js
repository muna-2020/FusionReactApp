//Base classes.
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';

//Objects required for module.
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Extranet_School_Billing from '@shared/Application/d.Extranet/2_School/PC/Modules/Billing/Billing_Module';

/**
* @name BillingPrintToPDF_ModuleProcessor
* @summary Class for Billing module display and manipulate.
*/
class BillingPrintToPDF_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //Billing
        var objParams = {
            "iCycleTypeId": props.iCycleTypeId,
            "cIsEmptyData": props.cIsEmptyData,
            "iStateId": props.ClientUserDetails.SchoolDetails.iStateId,
            "uSchoolId": props.ClientUserDetails.SchoolDetails.uSchoolId,
            "uSchoolYearPeriodId": props.uSchoolYearPeriodId,
            "uCycleId": props.uCycleId,
        };
        Extranet_School_Billing.Initialize(objParams);
        arrDataRequest = [...arrDataRequest, Extranet_School_Billing];

        //Text Resource
        let arrResourceParams = ["/d.Extranet/2_School/Modules/Billing"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //School Year Period.
        let objSchoolYearPeriodParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/Billing/Billing.css"];
    }

    /**
    * @name GetMetaDataFillheightBillingPrintToPDF
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetMetaDataFillheightBillingPrintToPDF() {
        return {
            HeaderIds: ["Header"],
            FooterIds: ["FooterBilling"]
        };
    }

}

export default BillingPrintToPDF_ModuleProcessor;
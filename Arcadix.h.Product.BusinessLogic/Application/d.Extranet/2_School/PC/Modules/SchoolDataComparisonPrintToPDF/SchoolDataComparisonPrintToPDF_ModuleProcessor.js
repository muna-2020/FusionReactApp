
//Objects required for module.
import Extranet_School_SchoolDataComparison_Module from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDataComparison/SchoolDataComparison_Module';
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';

/**
* @name SchoolDataComparisonPrintToPDF_ModuleProcessor
* @summary Class for SchoolDataComparison module display.
*/
class SchoolDataComparisonPrintToPDF_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * strCycleTypeId holds the cycle type id value. based cycle type id server cycle object will be used.
    * blnArchive it holds is archive or not.
    **/
    constructor() {
        super();
        this.strCycleTypeId = "6";
        this.blnArchive = QueryString.GetQueryStringValue("IsArchive") == "Y";
    }

    /**
     * @name InitialDataParams.
     * @param {any} props props
     * @summary Returns initial load requests
     * @returns {Array} array
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        //TextResource
        let arrResourcePath = ["/d.Extranet/2_School/Modules/DataComparison"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //SchoolDataComparison
        let objDataComparisonParams = {
            objSearchData: {
                iCycleTypeId: !this.blnArchive ? this.strCycleTypeId : undefined,
                iStateId: props.ClientUserDetails.SchoolDetails.iStateId,
                uSchoolId: props.ClientUserDetails.SchoolDetails.uSchoolId,
                blnLoadData: props.objSearchData.blnLoadData,
                uCycleId: props.objSearchData.uCycleId
            }
        };
        Extranet_School_SchoolDataComparison_Module.Initialize(objDataComparisonParams);
        arrDataRequest = [...arrDataRequest, Extranet_School_SchoolDataComparison_Module];

        //Cycle (In Archive mode.)
        if (this.blnArchive) {
            let objCycleParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iCycleTypeId": this.strCycleTypeId
                            }
                        },
                        {
                            "match": {
                                "cIsArchiveTeacher": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsActive": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
                },
                "SortKeys": [
                    {
                        "dtCreatedOn": {
                            "order": "asc"
                        }
                    }
                ]
            };

            Object_Intranet_Cycle_Cycle.Initialize(objCycleParams);
            arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];
        }
        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/DataComparison/DataComparison.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/ProgressBar/ProgressBar.css"
        ];
    }

    /**
      * @name GetMetaDataFillheightSchoolDataComparisonPrintToPDF
      * @summary it returns the object of metadatas
      * @returns {array} MetaData
      */
    GetMetaDataFillheightSchoolDataComparisonPrintToPDF() {
        return {
            HeaderIds: ["Header"],
            FooterIds: ["FooterDataComparison"]
        };
    }

}

export default SchoolDataComparisonPrintToPDF_ModuleProcessor;
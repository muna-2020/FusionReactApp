// this file will be present in the Arcadix.h.Product.BusinessLogic project. It will foloow the same folder structure as the original Component

import {useState, useEffect, useLayoutEffect} from 'react';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';


/**
 * this function has to be sent to connect HOC for redux mapping
 * this will contain the Entity/ApplicationState mappings
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        console.log("mapping");
        return {
            selectedItem: state.ApplicationState.selectedItem,
            vacation: (state.Entity["vacation"] != undefined)
                ? (state.Entity["vacation"]["vacation;uVacationGroupId;DBE74512-BAED-44A7-BEAD-A79C172F10D4;uVacationId;22ADC743-CDA3-450D-92D0-11D0AA70ACAB"] != undefined)
                    ? state.Entity["vacation"]["vacation;uVacationGroupId;DBE74512-BAED-44A7-BEAD-A79C172F10D4;uVacationId;22ADC743-CDA3-450D-92D0-11D0AA70ACAB"]
                    : undefined
                : undefined,
            textresource: (state.Entity["textresource"] != undefined && state.Entity["textresource"]["textresource;Id;de/Intranet/Modules/z.Demo/Vacation"] != undefined) ?
                   state.Entity["textresource"]["textresource;Id;de/Intranet/Modules/z.Demo/Vacation"] : undefined
        };
    }
    else {
        console.log(" not mapping");
        return {};
    }
}

export function InitialDataParams(JConfiguration,props){
    var objParams = {
        "ForeignKeyFilter": {
            "uVacationGroupId": "DBE74512-BAED-44A7-BEAD-A79C172F10D4"
        },
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "uVacationId": "22ADC743-CDA3-450D-92D0-11D0AA70ACAB"
                    }
                },
                {
                    "bool": {
                        "should": [
                            {
                                "match": {
                                    "uUserId": "F689D1A0-39B3-4FEC-963E-DE3E632EF8A3"
                                }
                            },
                            {
                                "match": {
                                    "uUserId": "39B3D1A0-F689-963E-4FEC-DE3E632EF8A3"
                                }
                            }
                        ]
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
        ],
        "OutputColumns": [
            "uVacationId",
            "uVacationGroupId",
            "dtModifiedOn",
            "uUserId",
            "t_ZDemo_VacationDetails_Data.iLanguageId",
            "t_ZDemo_VacationDetails_Data.vVacationName",
            "t_ZDemo_VacationDetails_Data.vPlace"
        ]
    }
;
    var objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/Intranet/Modules/z.Demo/Vacation"
                    }
                }
            ]
        }
    };
    var arrDataRequest = [
        {
            "URL": "API/Object/z.Demo/Vacation",
            "Params": objParams,
            "MethodType": "Get"
        }
    ];
    var arrResourceRequest = [
        {
            "URL": "API/Object/Blocks/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        }
    ]
    return { "DataCalls": arrDataRequest, "ResourceCalls": arrResourceRequest };
}

/**
 * This method will make the Execute api call and return a promise. You resolve the same in the custom hook below and carry out any specific operation
 * @param {*} props 
 */
export function dataCall(props){
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    return new Promise(function (resolve, reject) {
        objArcadixFetchAndCacheData.Execute(InitialDataParams(props.JConfiguration, props).DataCalls, function (objReturn) {        
            objArcadixFetchAndCacheData.Execute(InitialDataParams(props.JConfiguration, props).ResourceCalls, function (objReturnResource) {
                resolve({ success: true });
            });
        });
    });
}

/**
 * Custom hook which will carry out the data call portion and take care of re-rendering on prop/state changes
 * @param {*} props 
 */
export function useDataLoader(props){
    const [isLoading, setIsLoading] = useState(true);

    const getRequiredData = () => {
        console.log("getting required data");
        dataCall(props)
        .then(json => {
            if(json.success){
                setIsLoading(false);
            }
        });
    }

    useLayoutEffect(getRequiredData, []);

    return isLoading;
}



 
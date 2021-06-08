import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

export const GetDefaultElementJson = (intOrder) => { //GetDefaultElementJson is called by Editor container
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "SampleTest",
        "iElementTypeId": 86,
        "vElementJson": {
            "Attribute1": "Text1",
            "Attribute2": "Text2"
        }
    };
    return objElementJson;
};

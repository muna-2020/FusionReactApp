//React related imports
import React, { useRef } from 'react';
import Workflow from '@root/Framework/Controls/Workflow/Workflow';


/**
 * @name Intranet
 * @param {object} Props Props
 * @summary imports the module that need to wrapped up in main.
 * @returns {Jsx} Returs the application specific Component to be loaded.
 */
const Workflow_Sample = (props) => {
    let ref = useRef(null);
    return (<div>
        <button onClick={() => {
            console.log(ref);
        }}>ddd</button>
        <Workflow ref={ref} Id="Workflow"
            Data={{
                DropdownData: {
                    ActiveWorkFlowStatuses: [
                        {
                            "iMainClientId": 0,
                            "uWorkflowTypeId": "1C0854B1-6094-461E-9F5B-EB8FA9C5F04D",
                            "uWorkflowStatusId": "9EA32F26-FDD4-49F0-B4B3-05F0C55AA599",
                            "uWorkflowId": "F0E30EA6-D33C-4EDB-AF9F-C8E85205FAF9",
                            "cIsDeleted": "N",
                            "cIsProductionReady": null,
                            "iDisplayOrder": null,
                            "dtCreatedOn": "2018-07-24T14:50:29.563",
                            "dtModifiedOn": "2018-07-24T14:50:29.563",
                            "uUserId": null,
                            "uModifiedByUserId": null,
                            "t_TestDrive_WorkflowStatus_Data": [
                                {
                                    "iLanguageId": 3,
                                    "uWorkflowStatusDataId": "A8198F3A-9770-4FF5-8AE2-F748370D758C",
                                    "uWorkflowStatusId": "9EA32F26-FDD4-49F0-B4B3-05F0C55AA599",
                                    "vWorkflowStatus": "Step2",
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 1,
                                    "uWorkflowStatusDataId": "60911690-501B-42AE-B8B8-3DABA1094845",
                                    "uWorkflowStatusId": "9EA32F26-FDD4-49F0-B4B3-05F0C55AA599",
                                    "vWorkflowStatus": null,
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 7,
                                    "uWorkflowStatusDataId": "A950BC76-0862-4A52-8EB4-803BE46B1F7B",
                                    "uWorkflowStatusId": "9EA32F26-FDD4-49F0-B4B3-05F0C55AA599",
                                    "vWorkflowStatus": null,
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                }
                            ]
                        },
                        {
                            "iMainClientId": 0,
                            "uWorkflowTypeId": "1C0854B1-6094-461E-9F5B-EB8FA9C5F04D",
                            "uWorkflowStatusId": "877CF40C-C813-4FB9-815E-1A5B0C13BB3B",
                            "uWorkflowId": "1DAC5EEA-A28B-4819-B680-28FE20528CDB",
                            "cIsDeleted": "N",
                            "cIsProductionReady": null,
                            "iDisplayOrder": null,
                            "dtCreatedOn": "2018-07-24T14:50:29.563",
                            "dtModifiedOn": "2018-07-24T14:50:29.563",
                            "uUserId": null,
                            "uModifiedByUserId": null,
                            "t_TestDrive_WorkflowStatus_Data": [
                                {
                                    "iLanguageId": 3,
                                    "uWorkflowStatusDataId": "FE8DE782-1B2A-475B-A101-44FDA86E2234",
                                    "uWorkflowStatusId": "877CF40C-C813-4FB9-815E-1A5B0C13BB3B",
                                    "vWorkflowStatus": "Review by Subject Expert",
                                    "vWorkflowStatusDescription": "Review by Subject Expert",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 1,
                                    "uWorkflowStatusDataId": "6A2449DA-073E-4707-AC20-A1A60E50A862",
                                    "uWorkflowStatusId": "877CF40C-C813-4FB9-815E-1A5B0C13BB3B",
                                    "vWorkflowStatus": null,
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 7,
                                    "uWorkflowStatusDataId": "ED46237D-16E4-4ACF-A331-D0382BBE5B6F",
                                    "uWorkflowStatusId": "877CF40C-C813-4FB9-815E-1A5B0C13BB3B",
                                    "vWorkflowStatus": null,
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                }
                            ]
                        },
                        {
                            "iMainClientId": 0,
                            "uWorkflowTypeId": "1C0854B1-6094-461E-9F5B-EB8FA9C5F04D",
                            "uWorkflowStatusId": "DF225FE4-F99F-4D0A-BABA-1BDFFA368F2A",
                            "uWorkflowId": "1DAC5EEA-A28B-4819-B680-28FE20528CDB",
                            "cIsDeleted": "N",
                            "cIsProductionReady": null,
                            "iDisplayOrder": null,
                            "dtCreatedOn": "2018-07-24T14:50:29.563",
                            "dtModifiedOn": "2018-07-24T14:50:29.563",
                            "uUserId": null,
                            "uModifiedByUserId": null,
                            "t_TestDrive_WorkflowStatus_Data": [
                                {
                                    "iLanguageId": 3,
                                    "uWorkflowStatusDataId": "AD7EC881-09ED-4DD8-8B2C-786F90C76F5D",
                                    "uWorkflowStatusId": "DF225FE4-F99F-4D0A-BABA-1BDFFA368F2A",
                                    "vWorkflowStatus": "Ready for final approval",
                                    "vWorkflowStatusDescription": "&nbsp;Ready for final approval",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 1,
                                    "uWorkflowStatusDataId": "5328EF9F-CA4C-42AA-B8C7-841E81C2195E",
                                    "uWorkflowStatusId": "DF225FE4-F99F-4D0A-BABA-1BDFFA368F2A",
                                    "vWorkflowStatus": null,
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 7,
                                    "uWorkflowStatusDataId": "285536C1-4E38-490C-A793-8672AE76D7FE",
                                    "uWorkflowStatusId": "DF225FE4-F99F-4D0A-BABA-1BDFFA368F2A",
                                    "vWorkflowStatus": null,
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                }
                            ]
                        },
                        {
                            "iMainClientId": 97,
                            "uWorkflowTypeId": "1C0854B1-6094-461E-9F5B-EB8FA9C5F04D",
                            "uWorkflowStatusId": "CDCF8E57-98DF-48D2-9962-2BE7D85392D2",
                            "uWorkflowId": "026DB93E-3B75-423B-A0BA-3CD088184728",
                            "cIsDeleted": "N",
                            "cIsProductionReady": null,
                            "iDisplayOrder": null,
                            "dtCreatedOn": "2018-07-24T14:50:29.563",
                            "dtModifiedOn": "2018-07-24T14:50:29.563",
                            "uUserId": null,
                            "uModifiedByUserId": null,
                            "t_TestDrive_WorkflowStatus_Data": [
                                {
                                    "iLanguageId": 3,
                                    "uWorkflowStatusDataId": "05C2BA40-620E-4C59-BDF5-E3637AE5A985",
                                    "uWorkflowStatusId": "CDCF8E57-98DF-48D2-9962-2BE7D85392D2",
                                    "vWorkflowStatus": "For Review",
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                }
                            ]
                        },
                        {
                            "iMainClientId": 97,
                            "uWorkflowTypeId": "1C0854B1-6094-461E-9F5B-EB8FA9C5F04D",
                            "uWorkflowStatusId": "CDCF8E57-98DF-48D2-9962-2BE7D85392D2",
                            "uWorkflowId": "026DB93E-3B75-423B-A0BA-3CD088184728",
                            "cIsDeleted": "N",
                            "cIsProductionReady": null,
                            "iDisplayOrder": null,
                            "dtCreatedOn": "2018-07-24T14:50:29.563",
                            "dtModifiedOn": "2018-07-24T14:50:29.563",
                            "uUserId": null,
                            "uModifiedByUserId": null,
                            "t_TestDrive_WorkflowStatus_Data": [
                                {
                                    "iLanguageId": 3,
                                    "uWorkflowStatusDataId": "05C2BA40-620E-4C59-BDF5-E3637AE5A985",
                                    "uWorkflowStatusId": "CDCF8E57-98DF-48D2-9962-2BE7D85392D2",
                                    "vWorkflowStatus": "For Review",
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                }
                            ]
                        },
                        {
                            "iMainClientId": 0,
                            "uWorkflowTypeId": "1C0854B1-6094-461E-9F5B-EB8FA9C5F04D",
                            "uWorkflowStatusId": "0981E247-61D8-4113-8914-3A938BFCA870",
                            "uWorkflowId": "F0E30EA6-D33C-4EDB-AF9F-C8E85205FAF9",
                            "cIsDeleted": "Y",
                            "cIsProductionReady": "Y",
                            "iDisplayOrder": 1,
                            "dtCreatedOn": "2020-08-27T15:14:35.317",
                            "dtModifiedOn": "2020-08-27T15:15:01.777",
                            "uUserId": null,
                            "uModifiedByUserId": null,
                            "t_TestDrive_WorkflowStatus_Data": [
                                {
                                    "iLanguageId": 3,
                                    "uWorkflowStatusDataId": "4E486AD6-7B69-469A-9020-ED3196FD0B26",
                                    "uWorkflowStatusId": "0981E247-61D8-4113-8914-3A938BFCA870",
                                    "vWorkflowStatus": "sam",
                                    "vWorkflowStatusDescription": "sam",
                                    "vWorkflowStatusShortName": "sam"
                                }
                            ]
                        },
                        {
                            "iMainClientId": 0,
                            "uWorkflowTypeId": "1C0854B1-6094-461E-9F5B-EB8FA9C5F04D",
                            "uWorkflowStatusId": "DB1848FB-7543-4EE0-85DD-4794F8750962",
                            "uWorkflowId": "1DAC5EEA-A28B-4819-B680-28FE20528CDB",
                            "cIsDeleted": "N",
                            "cIsProductionReady": null,
                            "iDisplayOrder": null,
                            "dtCreatedOn": "2018-07-24T14:50:29.563",
                            "dtModifiedOn": "2018-07-24T14:50:29.563",
                            "uUserId": null,
                            "uModifiedByUserId": null,
                            "t_TestDrive_WorkflowStatus_Data": [
                                {
                                    "iLanguageId": 3,
                                    "uWorkflowStatusDataId": "00A674A7-40CD-42DF-94A6-CE4E25CC6914",
                                    "uWorkflowStatusId": "DB1848FB-7543-4EE0-85DD-4794F8750962",
                                    "vWorkflowStatus": "Review completed",
                                    "vWorkflowStatusDescription": "&nbsp;Review completed",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 1,
                                    "uWorkflowStatusDataId": "338D7594-3E96-44E8-89E1-EC688AACA925",
                                    "uWorkflowStatusId": "DB1848FB-7543-4EE0-85DD-4794F8750962",
                                    "vWorkflowStatus": null,
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 7,
                                    "uWorkflowStatusDataId": "005BC29F-2F23-4D3C-8CDB-233E64E67ED0",
                                    "uWorkflowStatusId": "DB1848FB-7543-4EE0-85DD-4794F8750962",
                                    "vWorkflowStatus": null,
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                }
                            ]
                        },
                        {
                            "iMainClientId": 97,
                            "uWorkflowTypeId": "1C0854B1-6094-461E-9F5B-EB8FA9C5F04D",
                            "uWorkflowStatusId": "B5087EB9-472F-4851-A452-48E97E1AC7E4",
                            "uWorkflowId": "026DB93E-3B75-423B-A0BA-3CD088184728",
                            "cIsDeleted": "N",
                            "cIsProductionReady": null,
                            "iDisplayOrder": null,
                            "dtCreatedOn": "2018-07-24T14:50:29.563",
                            "dtModifiedOn": "2018-07-24T14:50:29.563",
                            "uUserId": null,
                            "uModifiedByUserId": null,
                            "t_TestDrive_WorkflowStatus_Data": [
                                {
                                    "iLanguageId": 3,
                                    "uWorkflowStatusDataId": "81A5D04C-228C-46C0-9DB9-367475196963",
                                    "uWorkflowStatusId": "B5087EB9-472F-4851-A452-48E97E1AC7E4",
                                    "vWorkflowStatus": "Reviewed",
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                }
                            ]
                        },
                        {
                            "iMainClientId": 0,
                            "uWorkflowTypeId": "1C0854B1-6094-461E-9F5B-EB8FA9C5F04D",
                            "uWorkflowStatusId": "8DEFAA9C-FB8F-4019-9956-4B6BCE975CC8",
                            "uWorkflowId": "1DAC5EEA-A28B-4819-B680-28FE20528CDB",
                            "cIsDeleted": "N",
                            "cIsProductionReady": null,
                            "iDisplayOrder": null,
                            "dtCreatedOn": "2018-07-24T14:50:29.563",
                            "dtModifiedOn": "2018-07-24T14:50:29.563",
                            "uUserId": null,
                            "uModifiedByUserId": null,
                            "t_TestDrive_WorkflowStatus_Data": [
                                {
                                    "iLanguageId": 3,
                                    "uWorkflowStatusDataId": "4DAEE498-B6F1-424B-8779-02AD71E5C886",
                                    "uWorkflowStatusId": "8DEFAA9C-FB8F-4019-9956-4B6BCE975CC8",
                                    "vWorkflowStatus": "To be reviewed by Reviewer, se",
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 1,
                                    "uWorkflowStatusDataId": "04BDBE9F-ED24-4FDA-B88C-3706F3CBF192",
                                    "uWorkflowStatusId": "8DEFAA9C-FB8F-4019-9956-4B6BCE975CC8",
                                    "vWorkflowStatus": null,
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 7,
                                    "uWorkflowStatusDataId": "EEFC7056-F6A1-45F4-8008-943DA7FD0ECF",
                                    "uWorkflowStatusId": "8DEFAA9C-FB8F-4019-9956-4B6BCE975CC8",
                                    "vWorkflowStatus": null,
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                }
                            ]
                        },
                        {
                            "iMainClientId": 0,
                            "uWorkflowTypeId": "1C0854B1-6094-461E-9F5B-EB8FA9C5F04D",
                            "uWorkflowStatusId": "FA66D530-23AD-452C-84DC-557BDCB91361",
                            "uWorkflowId": "2470356F-8209-48F1-A79F-B1E32A9D0155",
                            "cIsDeleted": "N",
                            "cIsProductionReady": "Y",
                            "iDisplayOrder": 4,
                            "dtCreatedOn": "2018-07-24T14:50:29.563",
                            "dtModifiedOn": "2018-07-24T14:50:29.563",
                            "uUserId": null,
                            "uModifiedByUserId": null,
                            "t_TestDrive_WorkflowStatus_Data": [
                                {
                                    "iLanguageId": 3,
                                    "uWorkflowStatusDataId": "57626043-6007-4D8F-8A59-44E4A1101CD7",
                                    "uWorkflowStatusId": "FA66D530-23AD-452C-84DC-557BDCB91361",
                                    "vWorkflowStatus": "begutachtet und abgeschlossen",
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": "abgeschlossen"
                                },
                                {
                                    "iLanguageId": 2,
                                    "uWorkflowStatusDataId": "34855BC2-76C7-4227-A252-FCF452E1E262",
                                    "uWorkflowStatusId": "FA66D530-23AD-452C-84DC-557BDCB91361",
                                    "vWorkflowStatus": "relire et terminé",
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 4,
                                    "uWorkflowStatusDataId": "E858AA47-621A-4F04-9F1E-F7D14AE91BA2",
                                    "uWorkflowStatusId": "FA66D530-23AD-452C-84DC-557BDCB91361",
                                    "vWorkflowStatus": "correggere le bozze e completa",
                                    "vWorkflowStatusDescription": "&nbsp;",
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 1,
                                    "uWorkflowStatusDataId": "F4C43D18-1090-4031-BA91-C7DB2A2E6A74",
                                    "uWorkflowStatusId": "FA66D530-23AD-452C-84DC-557BDCB91361",
                                    "vWorkflowStatus": "Reviewed",
                                    "vWorkflowStatusDescription": null,
                                    "vWorkflowStatusShortName": null
                                },
                                {
                                    "iLanguageId": 7,
                                    "uWorkflowStatusDataId": "3BFBAB0C-1CFC-44C4-8224-CD4B2F24076B",
                                    "uWorkflowStatusId": "FA66D530-23AD-452C-84DC-557BDCB91361",
                                    "vWorkflowStatus": "Reviewed",
                                    "vWorkflowStatusDescription": null,
                                    "vWorkflowStatusShortName": null
                                }
                            ]
                        }
                    ]
                },
                AssignedWorkflowData: [
                    {
                        "uWorkflowAssignmentId": "2920FBDF-B220-4899-9289-C63413DC9D37",
                        "uWorkflowTypeId": "5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B",
                        "vObjectId": "5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B",
                        "uWorkflowStatusId": "9EA32F26-FDD4-49F0-B4B3-05F0C55AA599",
                        "vComment": "vComment",
                        "cIsLatest": "Y",
                        "uUserId": "447B7C0F-77A8-4528-8EBA-705320B8F58D",
                        "dtCreatedOn": "2020-11-10T17:23:19.117",
                        "dtModifiedOn": "2020-11-10T17:23:19.117"
                    }
                ],
                MultiLanguageData:[],                
            LanguageId:3
            }}
            Resource={{

            }}
ParentProps={props}
            {...props} />

    </div>);
}

export default Workflow_Sample;
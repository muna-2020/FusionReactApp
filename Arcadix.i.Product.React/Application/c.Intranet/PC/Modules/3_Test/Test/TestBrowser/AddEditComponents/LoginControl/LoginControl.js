// React related imports.
import React from 'react';

/**
 * @name LoginControl
 * @param {object} props props
 * @summary This component is used for LoginControl in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const LoginControl = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <React.Fragment>

            <div className="title mt-20">{Localization.TextFormatter(objTextResource, "LoginControl")}</div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "LoginType")}</span>
                    </div>
                    <div className="row-right">
                          <div className="intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iSubjectId"
                                Data={{
                                    DropdownData: [],//props.Data.DropdownData.SubjectData,
                                    SelectedValue: -1 //props.Data.DropdownData.SubjectId
                                }}
                                Meta={{
                                    DependingTableName: "t_TestDrive_Subject_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "iSubjectId",
                                    DisplayColumn: "vSubjectName",
                                    DefaultOptionValue: - 1,
                                    ShowDefaultOption: "true"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                    },
                                    JConfiguration: props.Resource.JConfiguration,
                                    SkinPath: props.Resource.SkinPath
                                }}
                                Events={{
                                    //OnChangeEventHandler: (objChangeData, objDropDownProps) => props.Events.OnDropDownChangeHandler("subject", objChangeData, objDropDownProps),
                                    //CheckDeletedDropDownData: props.Events.CheckDeletedDropDownData
                                }}
                                Callbacks={{
                                    //CheckDeletedDropDownData: (objNode) => {
                                        //return objNode["cIsDeleted"] == "N" && objNode["iParentSubjectId"] == "0" ? true : false}
                                                }}
                                ParentProps={props.ParentProps}                               
                            />
                        </div>
                    </div>
                </div>

               
            </div>

            
        </React.Fragment>
    }

    return (
        //GetContent()
        <React.Fragment>
        <div className="title">{Localization.TextFormatter(objTextResource, "LoginControl")}</div>
        <div className="mb-10" style={{color:"red"}}> To be implemented (Object needs to be created)</div>
        </React.Fragment>    );
};

export default LoginControl;
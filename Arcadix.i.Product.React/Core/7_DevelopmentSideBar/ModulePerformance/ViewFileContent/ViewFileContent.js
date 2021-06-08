//React related imports
import React, { useState } from 'react';
import Viewer,{ Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ViewFileContent = (props) => {

    const GetContent = () => {

        return (
            <React.Fragment>
                <div style={{ "overflow": "scroll", "height": "650px" }}>
                    {
                        props.Data.StrType == "Resource" ? <React.Fragment>
                            <SyntaxHighlighter language="css" >
                                {props.Data.strContent}
                            </SyntaxHighlighter>
                        </React.Fragment> :
                            <React.Fragment>
                                {props.Data.strContent && props.Data.strContent != "" ?
                                    <SyntaxHighlighter language={props.Data.StrType == "Cs" ? "csharp" : "javascript"} style={base16AteliersulphurpoolLight}>
                                        {props.Data.strContent}
                                    </SyntaxHighlighter>
                                    : <span>"FileNotFound"</span>}

                            </React.Fragment>
                    }
                </div>
            </React.Fragment>);
    }

    return GetContent();
}

export default ViewFileContent;
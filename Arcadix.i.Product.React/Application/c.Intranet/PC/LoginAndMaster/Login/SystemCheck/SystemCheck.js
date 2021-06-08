import React from 'react';

const SystemCheck = props => {

    const GetContent = () => {
        return (

            <div id="SystemCheck">
                {/*<h3>SystemCheck</h3>

                <table className="support-table">
                    <tbody>
                        <tr>
                            <td>Browser</td>
                            <td>
                                <img src={props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/Icon_OK_Systemcheck.png"} alt="" />
                                {props.JConfiguration.BrowserName + " " + props.JConfiguration.BrowserVersion} 
                            </td>
                        </tr>
                        <tr>
                            <td>Javascript</td>
                            <td>
                                <img src={props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/Icon_OK_Systemcheck.png"} alt="" />
                                ist aktiviert
                            </td>
                        </tr>
                        <tr>
                            <td>Cookies</td>
                            <td>
                                <img src={props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/Icon_OK_Systemcheck.png"} alt="" />
                                sind aktiviert
                            </td>
                        </tr>
                    </tbody>
                </table >*/}
                    </div >

        );
    }

    return <React.Fragment>{GetContent()}</React.Fragment>

}

export default SystemCheck;


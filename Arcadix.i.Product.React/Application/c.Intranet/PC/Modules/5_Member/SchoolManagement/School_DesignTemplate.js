import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { useState, useEffect, useReducer, useLayoutEffect, useMutationEffect } from 'react';
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown.js";
2
const School = (props) => {
    const data = [
        { a: "1", b: "2", c: "3" },
        { a: "All Lerneden", b: "22", c: "33" }
    ];
    return (
        <div className="school-container">

            <div className="grey-bg">
                <div className="form-wrapper">
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>Organisationseinheit:	</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown">
                                    <DropDown
                                        Data={data}
                                        DisplayColumn="a"
                                        ValueColumn="c"
                                        SelectedValue="33"
                                        JConfiguration={props.JConfiguration}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>Schule:</span></div>
                            <div className="row-right"><input type="text" name="" id="" className="text-input" /></div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>Name:</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown">
                                    <input type="text" name="" id="" className="text-input" />
                                </div>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>Vorname:</span></div>
                            <div className="row-right"><input type="text" name="" id="" className="text-input" />
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>Ort:</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown">
                                    <input type="text" name="" id="" className="text-input" />
                                </div>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>PLZ:</span></div>
                            <div className="row-right"><input type="text" name="" id="" className="text-input" />
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>Telefon:</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown">
                                    <input type="text" name="" id="" className="text-input" />
                                </div>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>E-Mail:</span></div>
                            <div className="row-right"><input type="text" name="" id="" className="text-input" />
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>Schulstatus:</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown">
                                    <input type="text" name="" id="" className="text-input" />
                                </div>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>Strasse:</span></div>
                            <div className="row-right"><input type="text" name="" id="" className="text-input" />
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>Testeinheit:</span>
                            </div>
                            <div className="row-right">
                                <div className="intranet-dropdown">
                                    <label className="checkbox">
                                        <input type="checkbox" name="" id="" />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>Ohne Login:</span></div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input type="checkbox" name="" id="" />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="wrap mt-10">
                        <button className="FR btn">Suchen</button>
                    </div>
                </div>


            </div>

        </div>
    );
}
export default School;

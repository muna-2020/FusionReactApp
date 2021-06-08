import React, { useState } from 'react';
import { NavLink } from "react-router-dom";


const TabletNavigation = (props) => {

    const HandleTabletNav = () => {
        document.querySelector(".tnav-trigger").classList.remove("active");
        document.querySelector(".tnav").classList.remove("show");

    }


    return (
        <div className="tablet-nav-overlay" >
            <div className="tnav">
                <div className="tnav-trigger" onClick={() => {
                    document.querySelector(".tnav-trigger").classList.toggle("active");
                    document.querySelector(".tnav").classList.toggle("show");
                }}>
                    <span className="bars bar1"></span><span className="bars bar2"></span><span
                        className="bars bar3"></span></div>
                <div className="tnav-body">
                    <div className="top">
                        <div className="profile-nav">
                            <div className="dropdown-wrapper">
                                <button className="dropdown-trigger" id="ProfileDropdownTrigger" onClick={function () {
                                    document.getElementById("ProfileDropdownTrigger").classList.toggle("active")
                                    document.getElementById("ProfileDropdownList").classList.toggle("show");
                                }}>
                                    <span title="Vorname">Vorname</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")}
                                        alt="" /></button>
                                <ul className="dropdown-list" id="ProfileDropdownList" onClick={HandleTabletNav}>
                                    <li><NavLink to="/School/Profil" exact>Mein Profil</NavLink></li>
                                    <li><NavLink to="/School/SchoolStartPage">Abmelden</NavLink></li>
                                </ul>
                            </div>
                        </div>
                        <ul className="main-nav" onClick={HandleTabletNav}>
                            <li id="SchoolStartPage" className="IndexRoute">
                                <NavLink to="/School/SchoolStartPage" exact activeClassName="active" onClick={props.CloseServiceNav}>
                                    <span >Übersicht</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" />
                                </NavLink>
                            </li>
                            <li id="Teacher">
                                <NavLink to="/School/Teacher" exact activeClassName="active" onClick={props.CloseServiceNav}>
                                    <span>Lehrperson</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" />
                                </NavLink>
                            </li>
                            <li id="TeacherLogins">
                                <NavLink to="/School/TeacherLogins" exact activeClassName="active" onClick={props.CloseServiceNav}>
                                    <span>Logins Lehrperson</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" />
                                </NavLink>
                            </li>
                            <li id="ClassAndPupil">
                                <NavLink to="/School/ClassAndPupil" exact activeClassName="active" onClick={props.CloseServiceNav}>
                                    <span>Klassen & Lernende</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" />
                                </NavLink>
                            </li>
                            <li id="Licenses">
                                <NavLink to="/School/Licenses" exact activeClassName="active" onClick={props.CloseServiceNav}>
                                    <span>Lizenzen</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" />
                                </NavLink>
                            </li>
                            <li id="TimeTableSettings">
                                <NavLink to="/School/TimeTableSettings" exact activeClassName="active" onClick={props.CloseServiceNav}>
                                    <span>Stundenplan</span> <img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" />
                                </NavLink>
                            </li>
                            <li id="SchoolDataComparison">
                                <NavLink to="/School/SchoolDataComparison" exact activeClassName="active" onClick={props.CloseServiceNav}>
                                    <span>Leistungsvergleich</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" />
                                </NavLink>
                            </li>
                            <li id="SchoolDataComparisonArchive">
                                <NavLink to="/School/SchoolDataComparisonArchive" exact activeClassName="active" onClick={props.CloseServiceNav}>
                                    <span>Leistungsvergleich Archiv</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" />
                                </NavLink>
                            </li>
                            <li id="Billing">
                                <NavLink to="/School/Billing" exact activeClassName="active" onClick={props.CloseServiceNav}>
                                    <span>Konto</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" />
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="bottom">
                        <ul className="service-nav" onClick={HandleTabletNav}>
                            <li><NavLink to="/School/Mitteilungen" exact activeClassName="active" onClick={props.HandleMainNav}><span>Mitteilungen</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" /></NavLink></li>
                            <li><NavLink to="/School/Dokumente" exact activeClassName="active" onClick={props.HandleMainNav}><span>Dokumente</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" /></NavLink></li>
                            <li><NavLink to="/School/Kontakt" exact activeClassName="active" onClick={props.HandleMainNav}><span>Kontakt</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" /></NavLink></li>
                            <li><NavLink to="/School/Notizen" exact activeClassName="active" onClick={props.HandleMainNav}><span>Notizen</span><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.png")} alt="" /></NavLink></li>
                        </ul>
                        <div className="bottom-logo"><img src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/logo.svg")} alt="" /></div>
                    </div>
                </div>
            </div>
        </ div>
    );
}


export default TabletNavigation;
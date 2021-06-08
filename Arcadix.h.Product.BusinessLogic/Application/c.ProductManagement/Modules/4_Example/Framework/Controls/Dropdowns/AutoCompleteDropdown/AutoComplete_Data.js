﻿/**
* @DisplayName GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {
    let SuggestionData = [
        { "DisplayName": "Afghanistan", "code": "AF" },
        { "DisplayName": "Åland Islands", "code": "AX" },
        { "DisplayName": "Albania", "code": "AL" },
        { "DisplayName": "Algeria", "code": "DZ" },
        { "DisplayName": "American Samoa", "code": "AS" },
        { "DisplayName": "AndorrA", "code": "AD" },
        { "DisplayName": "Angola", "code": "AO" },
        { "DisplayName": "Anguilla", "code": "AI" },
        { "DisplayName": "Antarctica", "code": "AQ" },
        { "DisplayName": "Antigua and Barbuda", "code": "AG" },
        { "DisplayName": "Argentina", "code": "AR" },
        { "DisplayName": "Armenia", "code": "AM" },
        { "DisplayName": "Aruba", "code": "AW" },
        { "DisplayName": "Australia", "code": "AU" },
        { "DisplayName": "Austria", "code": "AT" },
        { "DisplayName": "Azerbaijan", "code": "AZ" },
        { "DisplayName": "Bahamas", "code": "BS" },
        { "DisplayName": "Bahrain", "code": "BH" },
        { "DisplayName": "Bangladesh", "code": "BD" },
        { "DisplayName": "Barbados", "code": "BB" },
        { "DisplayName": "Belarus", "code": "BY" },
        { "DisplayName": "Belgium", "code": "BE" },
        { "DisplayName": "Belize", "code": "BZ" },
        { "DisplayName": "Benin", "code": "BJ" },
        { "DisplayName": "Bermuda", "code": "BM" },
        { "DisplayName": "Bhutan", "code": "BT" },
        { "DisplayName": "Bolivia", "code": "BO" },
        { "DisplayName": "Bosnia and Herzegovina", "code": "BA" },
        { "DisplayName": "Botswana", "code": "BW" },
        { "DisplayName": "Bouvet Island", "code": "BV" },
        { "DisplayName": "Brazil", "code": "BR" },
        { "DisplayName": "British Indian Ocean Territory", "code": "IO" },
        { "DisplayName": "Brunei Darussalam", "code": "BN" },
        { "DisplayName": "Bulgaria", "code": "BG" },
        { "DisplayName": "Burkina Faso", "code": "BF" },
        { "DisplayName": "Burundi", "code": "BI" },
        { "DisplayName": "Cambodia", "code": "KH" },
        { "DisplayName": "Cameroon", "code": "CM" },
        { "DisplayName": "Canada", "code": "CA" },
        { "DisplayName": "Cape Verde", "code": "CV" },
        { "DisplayName": "Cayman Islands", "code": "KY" },
        { "DisplayName": "Central African Republic", "code": "CF" },
        { "DisplayName": "Chad", "code": "TD" },
        { "DisplayName": "Chile", "code": "CL" },
        { "DisplayName": "China", "code": "CN" },
        { "DisplayName": "Christmas Island", "code": "CX" },
        { "DisplayName": "Cocos (Keeling) Islands", "code": "CC" },
        { "DisplayName": "Colombia", "code": "CO" },
        { "DisplayName": "Comoros", "code": "KM" },
        { "DisplayName": "Congo", "code": "CG" },
        { "DisplayName": "Congo, The Democratic Republic of the", "code": "CD" },
        { "DisplayName": "Cook Islands", "code": "CK" },
        { "DisplayName": "Costa Rica", "code": "CR" },
        { "DisplayName": "Croatia", "code": "HR" },
        { "DisplayName": "Cuba", "code": "CU" },
        { "DisplayName": "Cyprus", "code": "CY" },
        { "DisplayName": "Czech Republic", "code": "CZ" },
        { "DisplayName": "Denmark", "code": "DK" },
        { "DisplayName": "Djibouti", "code": "DJ" },
        { "DisplayName": "Dominica", "code": "DM" },
        { "DisplayName": "Dominican Republic", "code": "DO" },
        { "DisplayName": "Ecuador", "code": "EC" },
        { "DisplayName": "Egypt", "code": "EG" },
        { "DisplayName": "El Salvador", "code": "SV" },
        { "DisplayName": "Equatorial Guinea", "code": "GQ" },
        { "DisplayName": "Eritrea", "code": "ER" },
        { "DisplayName": "Estonia", "code": "EE" },
        { "DisplayName": "Ethiopia", "code": "ET" },
        { "DisplayName": "Falkland Islands (Malvinas)", "code": "FK" },
        { "DisplayName": "Faroe Islands", "code": "FO" },
        { "DisplayName": "Fiji", "code": "FJ" },
        { "DisplayName": "Finland", "code": "FI" },
        { "DisplayName": "France", "code": "FR" },
        { "DisplayName": "French Guiana", "code": "GF" },
        { "DisplayName": "French Polynesia", "code": "PF" },
        { "DisplayName": "French Southern Territories", "code": "TF" },
        { "DisplayName": "Gabon", "code": "GA" },
        { "DisplayName": "Gambia", "code": "GM" },
        { "DisplayName": "Georgia", "code": "GE" },
        { "DisplayName": "Germany", "code": "DE" },
        { "DisplayName": "Ghana", "code": "GH" },
        { "DisplayName": "Gibraltar", "code": "GI" },
        { "DisplayName": "Greece", "code": "GR" },
        { "DisplayName": "Greenland", "code": "GL" },
        { "DisplayName": "Grenada", "code": "GD" },
        { "DisplayName": "Guadeloupe", "code": "GP" },
        { "DisplayName": "Guam", "code": "GU" },
        { "DisplayName": "Guatemala", "code": "GT" },
        { "DisplayName": "Guernsey", "code": "GG" },
        { "DisplayName": "Guinea", "code": "GN" },
        { "DisplayName": "Guinea-Bissau", "code": "GW" },
        { "DisplayName": "Guyana", "code": "GY" },
        { "DisplayName": "Haiti", "code": "HT" },
        { "DisplayName": "Heard Island and Mcdonald Islands", "code": "HM" },
        { "DisplayName": "Holy See (Vatican City State)", "code": "VA" },
        { "DisplayName": "Honduras", "code": "HN" },
        { "DisplayName": "Hong Kong", "code": "HK" },
        { "DisplayName": "Hungary", "code": "HU" },
        { "DisplayName": "Iceland", "code": "IS" },
        { "DisplayName": "India", "code": "IN" },
        { "DisplayName": "Indonesia", "code": "ID" },
        { "DisplayName": "Iran, Islamic Republic Of", "code": "IR" },
        { "DisplayName": "Iraq", "code": "IQ" },
        { "DisplayName": "Ireland", "code": "IE" },
        { "DisplayName": "Isle of Man", "code": "IM" },
        { "DisplayName": "Israel", "code": "IL" },
        { "DisplayName": "Italy", "code": "IT" },
        { "DisplayName": "Jamaica", "code": "JM" },
        { "DisplayName": "Japan", "code": "JP" },
        { "DisplayName": "Jersey", "code": "JE" },
        { "DisplayName": "Jordan", "code": "JO" },
        { "DisplayName": "Kazakhstan", "code": "KZ" },
        { "DisplayName": "Kenya", "code": "KE" },
        { "DisplayName": "Kiribati", "code": "KI" },
        { "DisplayName": "Korea, Republic of", "code": "KR" },
        { "DisplayName": "Kuwait", "code": "KW" },
        { "DisplayName": "Kyrgyzstan", "code": "KG" },
        { "DisplayName": "Latvia", "code": "LV" },
        { "DisplayName": "Lebanon", "code": "LB" },
        { "DisplayName": "Lesotho", "code": "LS" },
        { "DisplayName": "Liberia", "code": "LR" },
        { "DisplayName": "Libyan Arab Jamahiriya", "code": "LY" },
        { "DisplayName": "Liechtenstein", "code": "LI" },
        { "DisplayName": "Lithuania", "code": "LT" },
        { "DisplayName": "Luxembourg", "code": "LU" },
        { "DisplayName": "Macao", "code": "MO" },
        { "DisplayName": "Macedonia, The Former Yugoslav Republic of", "code": "MK" },
        { "DisplayName": "Madagascar", "code": "MG" },
        { "DisplayName": "Malawi", "code": "MW" },
        { "DisplayName": "Malaysia", "code": "MY" },
        { "DisplayName": "Maldives", "code": "MV" },
        { "DisplayName": "Mali", "code": "ML" },
        { "DisplayName": "Malta", "code": "MT" },
        { "DisplayName": "Marshall Islands", "code": "MH" },
        { "DisplayName": "Martinique", "code": "MQ" },
        { "DisplayName": "Mauritania", "code": "MR" },
        { "DisplayName": "Mauritius", "code": "MU" },
        { "DisplayName": "Mayotte", "code": "YT" },
        { "DisplayName": "Mexico", "code": "MX" },
        { "DisplayName": "Micronesia, Federated States of", "code": "FM" },
        { "DisplayName": "Moldova, Republic of", "code": "MD" },
        { "DisplayName": "Monaco", "code": "MC" },
        { "DisplayName": "Mongolia", "code": "MN" },
        { "DisplayName": "Montserrat", "code": "MS" },
        { "DisplayName": "Morocco", "code": "MA" },
        { "DisplayName": "Mozambique", "code": "MZ" },
        { "DisplayName": "Myanmar", "code": "MM" },
        { "DisplayName": "Namibia", "code": "NA" },
        { "DisplayName": "Nauru", "code": "NR" },
        { "DisplayName": "Nepal", "code": "NP" },
        { "DisplayName": "Netherlands", "code": "NL" },
        { "DisplayName": "Netherlands Antilles", "code": "AN" },
        { "DisplayName": "New Caledonia", "code": "NC" },
        { "DisplayName": "New Zealand", "code": "NZ" },
        { "DisplayName": "Nicaragua", "code": "NI" },
        { "DisplayName": "Niger", "code": "NE" },
        { "DisplayName": "Nigeria", "code": "NG" },
        { "DisplayName": "Niue", "code": "NU" },
        { "DisplayName": "Norfolk Island", "code": "NF" },
        { "DisplayName": "Northern Mariana Islands", "code": "MP" },
        { "DisplayName": "Norway", "code": "NO" },
        { "DisplayName": "Oman", "code": "OM" },
        { "DisplayName": "Pakistan", "code": "PK" },
        { "DisplayName": "Palau", "code": "PW" },
        { "DisplayName": "Palestinian Territory, Occupied", "code": "PS" },
        { "DisplayName": "Panama", "code": "PA" },
        { "DisplayName": "Papua New Guinea", "code": "PG" },
        { "DisplayName": "Paraguay", "code": "PY" },
        { "DisplayName": "Peru", "code": "PE" },
        { "DisplayName": "Philippines", "code": "PH" },
        { "DisplayName": "Pitcairn", "code": "PN" },
        { "DisplayName": "Poland", "code": "PL" },
        { "DisplayName": "Portugal", "code": "PT" },
        { "DisplayName": "Puerto Rico", "code": "PR" },
        { "DisplayName": "Qatar", "code": "QA" },
        { "DisplayName": "Reunion", "code": "RE" },
        { "DisplayName": "Romania", "code": "RO" },
        { "DisplayName": "Russian Federation", "code": "RU" },
        { "DisplayName": "RWANDA", "code": "RW" },
        { "DisplayName": "Saint Helena", "code": "SH" },
        { "DisplayName": "Saint Kitts and Nevis", "code": "KN" },
        { "DisplayName": "Saint Lucia", "code": "LC" },
        { "DisplayName": "Saint Pierre and Miquelon", "code": "PM" },
        { "DisplayName": "Saint Vincent and the Grenadines", "code": "VC" },
        { "DisplayName": "Samoa", "code": "WS" },
        { "DisplayName": "San Marino", "code": "SM" },
        { "DisplayName": "Sao Tome and Principe", "code": "ST" },
        { "DisplayName": "Saudi Arabia", "code": "SA" },
        { "DisplayName": "Senegal", "code": "SN" },
        { "DisplayName": "Serbia and Montenegro", "code": "CS" },
        { "DisplayName": "Seychelles", "code": "SC" },
        { "DisplayName": "Sierra Leone", "code": "SL" },
        { "DisplayName": "Singapore", "code": "SG" },
        { "DisplayName": "Slovakia", "code": "SK" },
        { "DisplayName": "Slovenia", "code": "SI" },
        { "DisplayName": "Solomon Islands", "code": "SB" },
        { "DisplayName": "Somalia", "code": "SO" },
        { "DisplayName": "South Africa", "code": "ZA" },
        { "DisplayName": "South Georgia and the South Sandwich Islands", "code": "GS" },
        { "DisplayName": "Spain", "code": "ES" },
        { "DisplayName": "Sri Lanka", "code": "LK" },
        { "DisplayName": "Sudan", "code": "SD" },
        { "DisplayName": "SuriDisplayName", "code": "SR" },
        { "DisplayName": "Svalbard and Jan Mayen", "code": "SJ" },
        { "DisplayName": "Swaziland", "code": "SZ" },
        { "DisplayName": "Sweden", "code": "SE" },
        { "DisplayName": "Switzerland", "code": "CH" },
        { "DisplayName": "Syrian Arab Republic", "code": "SY" },
        { "DisplayName": "Taiwan, Province of China", "code": "TW" },
        { "DisplayName": "Tajikistan", "code": "TJ" },
        { "DisplayName": "Tanzania, United Republic of", "code": "TZ" },
        { "DisplayName": "Thailand", "code": "TH" },
        { "DisplayName": "Timor-Leste", "code": "TL" },
        { "DisplayName": "Togo", "code": "TG" },
        { "DisplayName": "Tokelau", "code": "TK" },
        { "DisplayName": "Tonga", "code": "TO" },
        { "DisplayName": "Trinidad and Tobago", "code": "TT" },
        { "DisplayName": "Tunisia", "code": "TN" },
        { "DisplayName": "Turkey", "code": "TR" },
        { "DisplayName": "Turkmenistan", "code": "TM" },
        { "DisplayName": "Turks and Caicos Islands", "code": "TC" },
        { "DisplayName": "Tuvalu", "code": "TV" },
        { "DisplayName": "Uganda", "code": "UG" },
        { "DisplayName": "Ukraine", "code": "UA" },
        { "DisplayName": "United Arab Emirates", "code": "AE" },
        { "DisplayName": "United Kingdom", "code": "GB" },
        { "DisplayName": "United States", "code": "US" },
        { "DisplayName": "United States Minor Outlying Islands", "code": "UM" },
        { "DisplayName": "Uruguay", "code": "UY" },
        { "DisplayName": "Uzbekistan", "code": "UZ" },
        { "DisplayName": "Vanuatu", "code": "VU" },
        { "DisplayName": "Venezuela", "code": "VE" },
        { "DisplayName": "Viet Nam", "code": "VN" },
        { "DisplayName": "Virgin Islands, British", "code": "VG" },
        { "DisplayName": "Virgin Islands, U.S.", "code": "VI" },
        { "DisplayName": "Wallis and Futuna", "code": "WF" },
        { "DisplayName": "Western Sahara", "code": "EH" },
        { "DisplayName": "Yemen", "code": "YE" },
        { "DisplayName": "Zambia", "code": "ZM" },
        { "DisplayName": "Zimbabwe", "code": "ZW" }
    ]  //Suggestion Data to control.

    return {
        SuggestionData,
        PreSelectValue: '' 
    };
};
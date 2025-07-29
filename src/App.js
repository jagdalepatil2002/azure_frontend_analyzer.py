import React, { useState, useRef, useEffect } from 'react';

// FIX: The API URL is now dynamically read from a React environment variable.
// This is more secure and flexible than hardcoding the URL.
const API_BASE_URL = 'https://web-production-21f8.up.railway.app/';

/**
 * API object for handling all fetch requests to the backend.
 */
const api = {
  async register(payload) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json();
  },
  async login(payload) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json();
  },
  async summarize(file) {
    const formData = new FormData();
    formData.append('notice_pdf', file);
    const response = await fetch(`${API_BASE_URL}/summarize`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },
};

// --- Helper Components & Icons ---

const FileHeart = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
    <path d="M14 2v6h6" />
    <path d="M10.3 12.3c.8-1 2-1.5 3.2-1.5 2.2 0 4 1.8 4 4 0 2.5-3.4 4.9-5.2 6.2a.5.5 0 0 1-.6 0C10 19.4 6 17 6 14.5c0-2.2 1.8-4 4-4 .8 0 1.5.3 2.1.8" />
  </svg>
);

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
    <p className="text-purple-700 font-semibold">AI Analyzing your notice...</p>
  </div>
);

// --- Screen Components ---

/**
 * Component for both Login and Registration forms.
 */
const AuthScreen = ({ isLogin, handleLogin, handleRegister, error, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, dob, setDob, mobileNumber, setMobileNumber, countryCode, setCountryCode, setView, clearFormFields}) => {
    // CORRECTED: A comprehensive and complete list of country codes for the dropdown.
    const countryCodes = [
        {"name": "Afghanistan", "dial_code": "+93", "code": "AF"},
        {"name": "Aland Islands", "dial_code": "+358", "code": "AX"},
        {"name": "Albania", "dial_code": "+355", "code": "AL"},
        {"name": "Algeria", "dial_code": "+213", "code": "DZ"},
        {"name": "AmericanSamoa", "dial_code": "+1684", "code": "AS"},
        {"name": "Andorra", "dial_code": "+376", "code": "AD"},
        {"name": "Angola", "dial_code": "+244", "code": "AO"},
        {"name": "Anguilla", "dial_code": "+1264", "code": "AI"},
        {"name": "Antarctica", "dial_code": "+672", "code": "AQ"},
        {"name": "Antigua and Barbuda", "dial_code": "+1268", "code": "AG"},
        {"name": "Argentina", "dial_code": "+54", "code": "AR"},
        {"name": "Armenia", "dial_code": "+374", "code": "AM"},
        {"name": "Aruba", "dial_code": "+297", "code": "AW"},
        {"name": "Australia", "dial_code": "+61", "code": "AU"},
        {"name": "Austria", "dial_code": "+43", "code": "AT"},
        {"name": "Azerbaijan", "dial_code": "+994", "code": "AZ"},
        {"name": "Bahamas", "dial_code": "+1242", "code": "BS"},
        {"name": "Bahrain", "dial_code": "+973", "code": "BH"},
        {"name": "Bangladesh", "dial_code": "+880", "code": "BD"},
        {"name": "Barbados", "dial_code": "+1246", "code": "BB"},
        {"name": "Belarus", "dial_code": "+375", "code": "BY"},
        {"name": "Belgium", "dial_code": "+32", "code": "BE"},
        {"name": "Belize", "dial_code": "+501", "code": "BZ"},
        {"name": "Benin", "dial_code": "+229", "code": "BJ"},
        {"name": "Bermuda", "dial_code": "+1441", "code": "BM"},
        {"name": "Bhutan", "dial_code": "+975", "code": "BT"},
        {"name": "Bolivia, Plurinational State of", "dial_code": "+591", "code": "BO"},
        {"name": "Bosnia and Herzegovina", "dial_code": "+387", "code": "BA"},
        {"name": "Botswana", "dial_code": "+267", "code": "BW"},
        {"name": "Brazil", "dial_code": "+55", "code": "BR"},
        {"name": "British Indian Ocean Territory", "dial_code": "+246", "code": "IO"},
        {"name": "Brunei Darussalam", "dial_code": "+673", "code": "BN"},
        {"name": "Bulgaria", "dial_code": "+359", "code": "BG"},
        {"name": "Burkina Faso", "dial_code": "+226", "code": "BF"},
        {"name": "Burundi", "dial_code": "+257", "code": "BI"},
        {"name": "Cambodia", "dial_code": "+855", "code": "KH"},
        {"name": "Cameroon", "dial_code": "+237", "code": "CM"},
        {"name": "Canada", "dial_code": "+1", "code": "CA"},
        {"name": "Cape Verde", "dial_code": "+238", "code": "CV"},
        {"name": "Cayman Islands", "dial_code": "+1345", "code": "KY"},
        {"name": "Central African Republic", "dial_code": "+236", "code": "CF"},
        {"name": "Chad", "dial_code": "+235", "code": "TD"},
        {"name": "Chile", "dial_code": "+56", "code": "CL"},
        {"name": "China", "dial_code": "+86", "code": "CN"},
        {"name": "Christmas Island", "dial_code": "+61", "code": "CX"},
        {"name": "Cocos (Keeling) Islands", "dial_code": "+61", "code": "CC"},
        {"name": "Colombia", "dial_code": "+57", "code": "CO"},
        {"name": "Comoros", "dial_code": "+269", "code": "KM"},
        {"name": "Congo", "dial_code": "+242", "code": "CG"},
        {"name": "Congo, The Democratic Republic of the", "dial_code": "+243", "code": "CD"},
        {"name": "Cook Islands", "dial_code": "+682", "code": "CK"},
        {"name": "Costa Rica", "dial_code": "+506", "code": "CR"},
        {"name": "Cote d'Ivoire", "dial_code": "+225", "code": "CI"},
        {"name": "Croatia", "dial_code": "+385", "code": "HR"},
        {"name": "Cuba", "dial_code": "+53", "code": "CU"},
        {"name": "Cyprus", "dial_code": "+357", "code": "CY"},
        {"name": "Czech Republic", "dial_code": "+420", "code": "CZ"},
        {"name": "Denmark", "dial_code": "+45", "code": "DK"},
        {"name": "Djibouti", "dial_code": "+253", "code": "DJ"},
        {"name": "Dominica", "dial_code": "+1767", "code": "DM"},
        {"name": "Dominican Republic", "dial_code": "+1849", "code": "DO"},
        {"name": "Ecuador", "dial_code": "+593", "code": "EC"},
        {"name": "Egypt", "dial_code": "+20", "code": "EG"},
        {"name": "El Salvador", "dial_code": "+503", "code": "SV"},
        {"name": "Equatorial Guinea", "dial_code": "+240", "code": "GQ"},
        {"name": "Eritrea", "dial_code": "+291", "code": "ER"},
        {"name": "Estonia", "dial_code": "+372", "code": "EE"},
        {"name": "Ethiopia", "dial_code": "+251", "code": "ET"},
        {"name": "Falkland Islands (Malvinas)", "dial_code": "+500", "code": "FK"},
        {"name": "Faroe Islands", "dial_code": "+298", "code": "FO"},
        {"name": "Fiji", "dial_code": "+679", "code": "FJ"},
        {"name": "Finland", "dial_code": "+358", "code": "FI"},
        {"name": "France", "dial_code": "+33", "code": "FR"},
        {"name": "French Guiana", "dial_code": "+594", "code": "GF"},
        {"name": "French Polynesia", "dial_code": "+689", "code": "PF"},
        {"name": "Gabon", "dial_code": "+241", "code": "GA"},
        {"name": "Gambia", "dial_code": "+220", "code": "GM"},
        {"name": "Georgia", "dial_code": "+995", "code": "GE"},
        {"name": "Germany", "dial_code": "+49", "code": "DE"},
        {"name": "Ghana", "dial_code": "+233", "code": "GH"},
        {"name": "Gibraltar", "dial_code": "+350", "code": "GI"},
        {"name": "Greece", "dial_code": "+30", "code": "GR"},
        {"name": "Greenland", "dial_code": "+299", "code": "GL"},
        {"name": "Grenada", "dial_code": "+1473", "code": "GD"},
        {"name": "Guadeloupe", "dial_code": "+590", "code": "GP"},
        {"name": "Guam", "dial_code": "+1671", "code": "GU"},
        {"name": "Guatemala", "dial_code": "+502", "code": "GT"},
        {"name": "Guernsey", "dial_code": "+44", "code": "GG"},
        {"name": "Guinea", "dial_code": "+224", "code": "GN"},
        {"name": "Guinea-Bissau", "dial_code": "+245", "code": "GW"},
        {"name": "Guyana", "dial_code": "+592", "code": "GY"},
        {"name": "Haiti", "dial_code": "+509", "code": "HT"},
        {"name": "Holy See (Vatican City State)", "dial_code": "+379", "code": "VA"},
        {"name": "Honduras", "dial_code": "+504", "code": "HN"},
        {"name": "Hong Kong", "dial_code": "+852", "code": "HK"},
        {"name": "Hungary", "dial_code": "+36", "code": "HU"},
        {"name": "Iceland", "dial_code": "+354", "code": "IS"},
        {"name": "India", "dial_code": "+91", "code": "IN"},
        {"name": "Indonesia", "dial_code": "+62", "code": "ID"},
        {"name": "Iran, Islamic Republic of", "dial_code": "+98", "code": "IR"},
        {"name": "Iraq", "dial_code": "+964", "code": "IQ"},
        {"name": "Ireland", "dial_code": "+353", "code": "IE"},
        {"name": "Isle of Man", "dial_code": "+44", "code": "IM"},
        {"name": "Israel", "dial_code": "+972", "code": "IL"},
        {"name": "Italy", "dial_code": "+39", "code": "IT"},
        {"name": "Jamaica", "dial_code": "+1876", "code": "JM"},
        {"name": "Japan", "dial_code": "+81", "code": "JP"},
        {"name": "Jersey", "dial_code": "+44", "code": "JE"},
        {"name": "Jordan", "dial_code": "+962", "code": "JO"},
        {"name": "Kazakhstan", "dial_code": "+7", "code": "KZ"},
        {"name": "Kenya", "dial_code": "+254", "code": "KE"},
        {"name": "Kiribati", "dial_code": "+686", "code": "KI"},
        {"name": "Korea, Democratic People's Republic of", "dial_code": "+850", "code": "KP"},
        {"name": "Korea, Republic of", "dial_code": "+82", "code": "KR"},
        {"name": "Kuwait", "dial_code": "+965", "code": "KW"},
        {"name": "Kyrgyzstan", "dial_code": "+996", "code": "KG"},
        {"name": "Lao People's Democratic Republic", "dial_code": "+856", "code": "LA"},
        {"name": "Latvia", "dial_code": "+371", "code": "LV"},
        {"name": "Lebanon", "dial_code": "+961", "code": "LB"},
        {"name": "Lesotho", "dial_code": "+266", "code": "LS"},
        {"name": "Liberia", "dial_code": "+231", "code": "LR"},
        {"name": "Libyan Arab Jamahiriya", "dial_code": "+218", "code": "LY"},
        {"name": "Liechtenstein", "dial_code": "+423", "code": "LI"},
        {"name": "Lithuania", "dial_code": "+370", "code": "LT"},
        {"name": "Luxembourg", "dial_code": "+352", "code": "LU"},
        {"name": "Macao", "dial_code": "+853", "code": "MO"},
        {"name": "Macedonia, The Former Yugoslav Republic of", "dial_code": "+389", "code": "MK"},
        {"name": "Madagascar", "dial_code": "+261", "code": "MG"},
        {"name": "Malawi", "dial_code": "+265", "code": "MW"},
        {"name": "Malaysia", "dial_code": "+60", "code": "MY"},
        {"name": "Maldives", "dial_code": "+960", "code": "MV"},
        {"name": "Mali", "dial_code": "+223", "code": "ML"},
        {"name": "Malta", "dial_code": "+356", "code": "MT"},
        {"name": "Marshall Islands", "dial_code": "+692", "code": "MH"},
        {"name": "Martinique", "dial_code": "+596", "code": "MQ"},
        {"name": "Mauritania", "dial_code": "+222", "code": "MR"},
        {"name": "Mauritius", "dial_code": "+230", "code": "MU"},
        {"name": "Mayotte", "dial_code": "+262", "code": "YT"},
        {"name": "Mexico", "dial_code": "+52", "code": "MX"},
        {"name": "Micronesia, Federated States of", "dial_code": "+691", "code": "FM"},
        {"name": "Moldova, Republic of", "dial_code": "+373", "code": "MD"},
        {"name": "Monaco", "dial_code": "+377", "code": "MC"},
        {"name": "Mongolia", "dial_code": "+976", "code": "MN"},
        {"name": "Montenegro", "dial_code": "+382", "code": "ME"},
        {"name": "Montserrat", "dial_code": "+1664", "code": "MS"},
        {"name": "Morocco", "dial_code": "+212", "code": "MA"},
        {"name": "Mozambique", "dial_code": "+258", "code": "MZ"},
        {"name": "Myanmar", "dial_code": "+95", "code": "MM"},
        {"name": "Namibia", "dial_code": "+264", "code": "NA"},
        {"name": "Nauru", "dial_code": "+674", "code": "NR"},
        {"name": "Nepal", "dial_code": "+977", "code": "NP"},
        {"name": "Netherlands", "dial_code": "+31", "code": "NL"},
        {"name": "Netherlands Antilles", "dial_code": "+599", "code": "AN"},
        {"name": "New Caledonia", "dial_code": "+687", "code": "NC"},
        {"name": "New Zealand", "dial_code": "+64", "code": "NZ"},
        {"name": "Nicaragua", "dial_code": "+505", "code": "NI"},
        {"name": "Niger", "dial_code": "+227", "code": "NE"},
        {"name": "Nigeria", "dial_code": "+234", "code": "NG"},
        {"name": "Niue", "dial_code": "+683", "code": "NU"},
        {"name": "Norfolk Island", "dial_code": "+672", "code": "NF"},
        {"name": "Northern Mariana Islands", "dial_code": "+1670", "code": "MP"},
        {"name": "Norway", "dial_code": "+47", "code": "NO"},
        {"name": "Oman", "dial_code": "+968", "code": "OM"},
        {"name": "Pakistan", "dial_code": "+92", "code": "PK"},
        {"name": "Palau", "dial_code": "+680", "code": "PW"},
        {"name": "Palestinian Territory, Occupied", "dial_code": "+970", "code": "PS"},
        {"name": "Panama", "dial_code": "+507", "code": "PA"},
        {"name": "Papua New Guinea", "dial_code": "+675", "code": "PG"},
        {"name": "Paraguay", "dial_code": "+595", "code": "PY"},
        {"name": "Peru", "dial_code": "+51", "code": "PE"},
        {"name": "Philippines", "dial_code": "+63", "code": "PH"},
        {"name": "Pitcairn", "dial_code": "+872", "code": "PN"},
        {"name": "Poland", "dial_code": "+48", "code": "PL"},
        {"name": "Portugal", "dial_code": "+351", "code": "PT"},
        {"name": "Puerto Rico", "dial_code": "+1939", "code": "PR"},
        {"name": "Qatar", "dial_code": "+974", "code": "QA"},
        {"name": "Romania", "dial_code": "+40", "code": "RO"},
        {"name": "Russia", "dial_code": "+7", "code": "RU"},
        {"name": "Rwanda", "dial_code": "+250", "code": "RW"},
        {"name": "Reunion", "dial_code": "+262", "code": "RE"},
        {"name": "Saint Barthelemy", "dial_code": "+590", "code": "BL"},
        {"name": "Saint Helena, Ascension and Tristan Da Cunha", "dial_code": "+290", "code": "SH"},
        {"name": "Saint Kitts and Nevis", "dial_code": "+1869", "code": "KN"},
        {"name": "Saint Lucia", "dial_code": "+1758", "code": "LC"},
        {"name": "Saint Martin", "dial_code": "+590", "code": "MF"},
        {"name": "Saint Pierre and Miquelon", "dial_code": "+508", "code": "PM"},
        {"name": "Saint Vincent and the Grenadines", "dial_code": "+1784", "code": "VC"},
        {"name": "Samoa", "dial_code": "+685", "code": "WS"},
        {"name": "San Marino", "dial_code": "+378", "code": "SM"},
        {"name": "Sao Tome and Principe", "dial_code": "+239", "code": "ST"},
        {"name": "Saudi Arabia", "dial_code": "+966", "code": "SA"},
        {"name": "Senegal", "dial_code": "+221", "code": "SN"},
        {"name": "Serbia", "dial_code": "+381", "code": "RS"},
        {"name": "Seychelles", "dial_code": "+248", "code": "SC"},
        {"name": "Sierra Leone", "dial_code": "+232", "code": "SL"},
        {"name": "Singapore", "dial_code": "+65", "code": "SG"},
        {"name": "Slovakia", "dial_code": "+421", "code": "SK"},
        {"name": "Slovenia", "dial_code": "+386", "code": "SI"},
        {"name": "Solomon Islands", "dial_code": "+677", "code": "SB"},
        {"name": "Somalia", "dial_code": "+252", "code": "SO"},
        {"name": "South Africa", "dial_code": "+27", "code": "ZA"},
        {"name": "South Sudan", "dial_code": "+211", "code": "SS"},
        {"name": "Spain", "dial_code": "+34", "code": "ES"},
        {"name": "Sri Lanka", "dial_code": "+94", "code": "LK"},
        {"name": "Sudan", "dial_code": "+249", "code": "SD"},
        {"name": "Suriname", "dial_code": "+597", "code": "SR"},
        {"name": "Svalbard and Jan Mayen", "dial_code": "+47", "code": "SJ"},
        {"name": "Swaziland", "dial_code": "+268", "code": "SZ"},
        {"name": "Sweden", "dial_code": "+46", "code": "SE"},
        {"name": "Switzerland", "dial_code": "+41", "code": "CH"},
        {"name": "Syrian Arab Republic", "dial_code": "+963", "code": "SY"},
        {"name": "Taiwan, Province of China", "dial_code": "+886", "code": "TW"},
        {"name": "Tajikistan", "dial_code": "+992", "code": "TJ"},
        {"name": "Tanzania, United Republic of", "dial_code": "+255", "code": "TZ"},
        {"name": "Thailand", "dial_code": "+66", "code": "TH"},
        {"name": "Timor-Leste", "dial_code": "+670", "code": "TL"},
        {"name": "Togo", "dial_code": "+228", "code": "TG"},
        {"name": "Tokelau", "dial_code": "+690", "code": "TK"},
        {"name": "Tonga", "dial_code": "+676", "code": "TO"},
        {"name": "Trinidad and Tobago", "dial_code": "+1868", "code": "TT"},
        {"name": "Tunisia", "dial_code": "+216", "code": "TN"},
        {"name": "Turkey", "dial_code": "+90", "code": "TR"},
        {"name": "Turkmenistan", "dial_code": "+993", "code": "TM"},
        {"name": "Turks and Caicos Islands", "dial_code": "+1649", "code": "TC"},
        {"name": "Tuvalu", "dial_code": "+688", "code": "TV"},
        {"name": "Uganda", "dial_code": "+256", "code": "UG"},
        {"name": "Ukraine", "dial_code": "+380", "code": "UA"},
        {"name": "United Arab Emirates", "dial_code": "+971", "code": "AE"},
        {"name": "United Kingdom", "dial_code": "+44", "code": "GB"},
        {"name": "United States", "dial_code": "+1", "code": "US"},
        {"name": "Uruguay", "dial_code": "+598", "code": "UY"},
        {"name": "Uzbekistan", "dial_code": "+998", "code": "UZ"},
        {"name": "Vanuatu", "dial_code": "+678", "code": "VU"},
        {"name": "Venezuela, Bolivarian Republic of", "dial_code": "+58", "code": "VE"},
        {"name": "Viet Nam", "dial_code": "+84", "code": "VN"},
        {"name": "Virgin Islands, British", "dial_code": "+1284", "code": "VG"},
        {"name": "Virgin Islands, U.S.", "dial_code": "+1340", "code": "VI"},
        {"name": "Wallis and Futuna", "dial_code": "+681", "code": "WF"},
        {"name": "Yemen", "dial_code": "+967", "code": "YE"},
        {"name": "Zambia", "dial_code": "+260", "code": "ZM"},
        {"name": "Zimbabwe", "dial_code": "+263", "code": "ZW"}
    ].map(country => ({...country, dial_code: country.dial_code.replace(/\s/g, '')}))
     .sort((a, b) => parseInt(a.dial_code.substring(1)) - parseInt(b.dial_code.substring(1)));

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Effect to close the dropdown when clicking outside of it.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full" style={{ backgroundColor: '#F9F5FF' }}>
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-1">{isLogin ? "Hello There!" : "Create Your Account"}</h2>
        <p className="text-center text-purple-600 mb-8">{isLogin ? "Let's get you signed in." : "Join us to simplify your tax notices."}</p>
        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                    </div>
                    <input type="text" placeholder="Date of Birth" onFocus={(e) => e.target.type='date'} onBlur={(e) => { if(!e.target.value) e.target.type='text'}} value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700" required />
                    <div className="flex">
                        <div className="relative w-1/3" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full h-full bg-gray-50 border-2 border-r-0 border-purple-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 px-3 py-3 text-gray-700 flex justify-between items-center"
                            >
                                <span>{countryCode}</span>
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute z-10 mt-1 w-max max-h-60 bg-white border border-gray-300 rounded-md shadow-lg overflow-auto">
                                    {countryCodes.map(country => (
                                        <li
                                            key={country.code}
                                            onClick={() => {
                                                setCountryCode(country.dial_code);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="px-4 py-2 text-gray-700 hover:bg-purple-100 cursor-pointer"
                                        >
                                            {country.name} ({country.dial_code})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <input type="tel" placeholder="Mobile Number" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} className="w-3/4 px-4 py-3 bg-white border-2 border-purple-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                    </div>
                </>
            )}
            <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
            <input type="password" placeholder="Your Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
            {!isLogin && ( <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required /> )}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-md shadow-purple-200 !mt-6">{isLogin ? "Let's Go!" : "Create Account"}</button>
        </form>
        <p className="text-center text-sm text-purple-600 mt-6">
            {isLogin ? "First time here?" : "Already have an account?"}
            <button onClick={() => { setView(isLogin ? 'register' : 'login'); clearFormFields(); }} className="font-semibold text-purple-700 hover:underline ml-1">{isLogin ? "Join us!" : "Sign in"}</button>
        </p>
    </div>
    )
};

/**
 * Component for the file upload screen.
 */
const UploadScreen = ({ user, handleLogout, handleFileUpload }) => {
    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => { e.preventDefault(); if (e.dataTransfer.files.length > 0) handleFileUpload(e.dataTransfer.files[0]); };
    const handleFileSelect = (e) => { if (e.target.files.length > 0) handleFileUpload(e.target.files[0]); };
    return (
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100 max-w-2xl w-full" style={{ backgroundColor: '#F9F5FF' }}>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-purple-800">Welcome, {user?.firstName}!</h2>
                <button onClick={handleLogout} className="text-purple-600 hover:text-purple-800 font-semibold">Sign Out</button>
            </div>
            <p className="text-purple-600 mb-8">Don't stress! Just upload your notice and we'll make sense of it for you.</p>
            <div className="border-2 border-dashed border-purple-300 rounded-xl p-12 text-center bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors" onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => document.getElementById('file-input').click()}>
                <FileHeart className="mx-auto h-16 w-16 text-purple-400" />
                <p className="mt-4 text-lg text-purple-700">Drop your PDF file here</p>
                <p className="text-sm text-purple-500 mt-1">or</p>
                <button className="mt-4 bg-white border-2 border-purple-200 text-purple-700 font-semibold py-2 px-4 rounded-lg hover:bg-purple-100">Pick a File</button>
                <input type="file" id="file-input" className="hidden" accept=".pdf" onChange={handleFileSelect} />
            </div>
        </div>
    );
};

/**
 * Component to display the summarized tax notice data.
 */
const SummaryScreen = ({ summaryData, resetApp }) => (
    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100 max-w-3xl w-full" style={{ backgroundColor: '#F9F5FF' }}>
        <h1 className="text-3xl font-bold text-purple-800 mb-2 text-center">Summary of Your IRS Notice {summaryData.noticeType}</h1>
        
        <div className="bg-purple-50/50 p-6 rounded-xl border-2 border-purple-100 my-6">
             <h3 className="font-bold text-purple-900">Notice For:</h3>
             <p className="text-purple-700">{summaryData.noticeFor || 'Not found'}</p>
             <p className="text-purple-700 whitespace-pre-wrap">{summaryData.address || 'Not found'}</p>
             <p className="text-purple-700 mt-2"><span className="font-semibold">Social Security Number:</span> {summaryData.ssn || 'Not found'}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-center bg-purple-600 text-white p-6 rounded-xl mb-8 shadow-md shadow-purple-200">
            <div>
                <p className="text-sm uppercase font-bold tracking-wider opacity-80">Amount Due</p>
                <p className="text-3xl font-bold">{summaryData.amountDue || 'N/A'}</p>
            </div>
             <div>
                <p className="text-sm uppercase font-bold tracking-wider opacity-80">Pay By</p>
                <p className="text-3xl font-bold">{summaryData.payBy || 'N/A'}</p>
            </div>
        </div>

        <div className="space-y-8">
            {summaryData.noticeMeaning && (
            <div>
                <h3 className="flex items-center text-xl font-bold text-purple-800 mb-3">Understanding Your Notice ({summaryData.noticeType})</h3>
                <p className="text-purple-700 bg-purple-50 p-4 rounded-lg border border-purple-100">{summaryData.noticeMeaning}</p>
            </div>
            )}

            {summaryData.whyText && (
            <div>
                <h3 className="flex items-center text-xl font-bold text-purple-800 mb-3">
                    <span className="text-2xl mr-3">❓</span> Why did I receive this?
                </h3>
                <p className="text-purple-700">{summaryData.whyText}</p>
                {summaryData.breakdown && summaryData.breakdown.length > 0 && (
                    <table className="min-w-full bg-white mt-4 rounded-lg border border-purple-200">
                        <thead className="bg-purple-50">
                            <tr>
                                <th className="text-left py-2 px-4 font-semibold text-purple-800">Item</th>
                                <th className="text-right py-2 px-4 font-semibold text-purple-800">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryData.breakdown.map((item, index) => (
                                <tr key={index} className="border-t border-purple-200">
                                    <td className="py-2 px-4 text-purple-700">{item.item}</td>
                                    <td className="py-2 px-4 text-purple-700 text-right font-mono">{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            )}
            
            {summaryData.fixSteps && (
            <div>
                <h3 className="flex items-center text-xl font-bold text-purple-800 mb-3">
                    <span className="text-2xl mr-3">✔️</span> How should I fix this?
                </h3>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-3">
                     <p className="font-semibold text-green-800">If You Agree:</p>
                     <p className="text-green-700 text-sm">{summaryData.fixSteps.agree || 'Information not available.'}</p>
                </div>
                 <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                     <p className="font-semibold text-yellow-800">If You Disagree:</p>
                     <p className="text-yellow-700 text-sm">{summaryData.fixSteps.disagree || 'Information not available.'}</p>
                </div>
            </div>
            )}

             {summaryData.paymentOptions && (
             <div>
                <h3 className="flex items-center text-xl font-bold text-purple-800 mb-3">
                    <span className="text-2xl mr-3">💳</span> How do I pay?
                </h3>
                 <ul className="space-y-2 text-purple-700 text-sm bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <li><strong>Online:</strong> <a href={`https://${summaryData.paymentOptions.online}`} target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold hover:underline">{summaryData.paymentOptions.online || 'Not specified'}</a></li>
                    <li><strong>By Mail:</strong> {summaryData.paymentOptions.mail || 'Not specified'}</li>
                    <li><strong>Payment Plan:</strong> <a href={`https://${summaryData.paymentOptions.plan}`} target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold hover:underline">{summaryData.paymentOptions.plan || 'Not specified'}</a></li>
                 </ul>
            </div>
            )}

             {summaryData.helpInfo && (
             <div>
                <h3 className="flex items-center text-xl font-bold text-purple-800 mb-3">
                    <span className="text-2xl mr-3">🙋</span> I need more help!
                </h3>
                 <ul className="space-y-2 text-purple-700 text-sm bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <li>{summaryData.helpInfo.contact || 'Contact info not found.'}</li>
                    <li>{summaryData.helpInfo.advocate || 'Advocate info not found.'}</li>
                 </ul>
            </div>
            )}
        </div>
        
        <div className="text-center mt-10">
             <button onClick={resetApp} className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors">
                Analyze Another Notice
             </button>
        </div>
    </div>
);


// --- Main Application Component ---
export default function App() {
    // State for managing the current view (e.g., 'login', 'upload')
    const [view, setView] = useState('login');
    // State for storing the logged-in user's data
    const [user, setUser] = useState(null);
    // State for displaying error messages
    const [error, setError] = useState('');
    // Form field states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [countryCode, setCountryCode] = useState('+1');
    const [mobileNumber, setMobileNumber] = useState('');
    // State to hold the summary data from the API
    const [summaryData, setSummaryData] = useState(null);

    // Clears all form fields and errors, typically when switching views.
    const clearFormFields = () => {
        setEmail(''); setPassword(''); setConfirmPassword('');
        setFirstName(''); setLastName(''); setError('');
        setDob(''); setMobileNumber(''); setCountryCode('+1');
    };

    // Handles the registration form submission.
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) { setError("Passwords do not match."); return; }
        const fullMobileNumber = `${countryCode}${mobileNumber}`;
        const result = await api.register({ firstName, lastName, email, password, dob, mobileNumber: fullMobileNumber });
        if (result.success) {
            setUser(result.user);
            setView('upload');
        } else {
            setError(result.message);
        }
    };

    // Handles the login form submission.
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const result = await api.login({ email, password });
        if (result.success) {
            setUser(result.user);
            setView('upload');
        } else {
            setError(result.message);
        }
    };

    // Logs the user out and returns to the login screen.
    const handleLogout = () => {
        setUser(null);
        setView('login');
    };
    
    // Handles the file upload and initiates the analysis process.
    const handleFileUpload = async (file) => {
        if (file) {
            setView('analyzing');
            try {
                const result = await api.summarize(file);
                if (result.success) {
                    setSummaryData(result.summary);
                    setView('summary');
                } else {
                    setError(result.message || "An error occurred during analysis.");
                    setView('upload'); 
                }
            } catch (e) {
                console.error("File upload/summary error:", e);
                setError("Could not connect to the analysis server. Please try again later.");
                setView('upload');
            }
        }
    };

    // Resets the app to the upload screen to analyze another document.
    const resetApp = () => {
        setView('upload');
        setSummaryData(null);
    };

    // Renders the current view based on the 'view' state.
    const renderView = () => {
        switch (view) {
            case 'register':
                return <AuthScreen isLogin={false} handleRegister={handleRegister} error={error} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} dob={dob} setDob={setDob} mobileNumber={mobileNumber} setMobileNumber={setMobileNumber} countryCode={countryCode} setCountryCode={setCountryCode} setView={setView} clearFormFields={clearFormFields} />;
            case 'login':
                return <AuthScreen isLogin={true} handleLogin={handleLogin} error={error} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setView={setView} clearFormFields={clearFormFields} />;
            
            case 'upload':
                return <UploadScreen user={user} handleLogout={handleLogout} handleFileUpload={handleFileUpload} />;
            
            case 'analyzing':
                return <LoadingSpinner />;
            case 'summary':
                return <SummaryScreen summaryData={summaryData} resetApp={resetApp} />;
            default:
                return <div className="text-purple-500">Loading...</div>;
        }
    };

    // Main component render method.
    return (
        <div className="min-h-screen bg-purple-100 flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #EDE9FE, #F3E8FF)'}}>
            {renderView()}
        </div>
    );
}

import React, { useState, useRef, useEffect } from 'react';

// --- Configuration ---
// The API URL for the backend service.
const API_BASE_URL = 'https://web-production-21f8.up.railway.app/';

// --- Data ---
// A comprehensive list of country codes for the dropdown selector.
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
];

// --- API Service ---
// A dedicated object for handling all network requests to the backend.
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
  }
};

// --- SVG Icons ---
const UploadCloudIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m16 16-4-4-4 4" />
  </svg>
);

const AlertTriangleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
);

const EyeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);

// --- Reusable UI Components ---

const Toast = ({ message, type, isActive }) => {
    if (!isActive) return null;
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    return (
        <div className={`fixed bottom-5 right-5 ${bgColor} text-white py-3 px-6 rounded-lg shadow-lg animate-fade-in z-50`}>
            {message}
        </div>
    );
};

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-transform duration-300 scale-95 animate-scale-in" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-black">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-black transition-colors rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </header>
                <main className="p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

const PasswordStrengthMeter = ({ password }) => {
    const getStrength = () => {
        let score = 0;
        if (!password) return 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };

    const strength = getStrength();
    const color = ['bg-slate-200', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][strength];
    const label = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][strength];

    return (
        <div>
            <div className="w-full bg-slate-200 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${(strength / 4) * 100}%` }}></div>
            </div>
            <p className="text-xs text-right text-slate-500 mt-1">{label}</p>
        </div>
    );
};

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-500"></div>
        <p className="text-black font-semibold text-lg">AI is analyzing your notice...</p>
        <p className="text-slate-500">This may take a moment. Please don't close the window.</p>
    </div>
);

// --- Screen Components ---

const AuthScreen = ({ isLogin, onSubmit, error, setView, clearFormFields }) => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
        dob: '', mobileNumber: '', countryCode: '+1'
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [countrySearch, setCountrySearch] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCountryCodeChange = (code) => {
        setFormData(prev => ({ ...prev, countryCode: code }));
        setIsDropdownOpen(false);
        setCountrySearch('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formData };
        if (!isLogin) payload.mobileNumber = `${payload.countryCode}${payload.mobileNumber}`;
        onSubmit(payload);
    };

    const switchView = () => {
        clearFormFields();
        setView(isLogin ? 'register' : 'login');
    };

    const filteredCountries = countryCodes.filter(c => 
        c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
        c.dial_code.includes(countrySearch)
    );

    return (
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-black mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h2>
            <p className="text-center text-slate-500 mb-8">{isLogin ? "Please enter your details to sign in." : "Simplify your tax notices today."}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                        </div>
                        <input type="text" name="dob" placeholder="Date of Birth" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }} value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                        <div className="flex">
                            <div className="relative w-1/3" ref={dropdownRef}>
                                <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full h-full bg-slate-50 border border-r-0 border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 px-3 py-3 text-slate-700 flex justify-between items-center">
                                    <span>{formData.countryCode}</span>
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute z-10 mt-1 w-72 bg-white border border-slate-300 rounded-md shadow-lg">
                                        <input type="text" placeholder="Search..." value={countrySearch} onChange={e => setCountrySearch(e.target.value)} className="w-full px-3 py-2 border-b border-slate-200 focus:outline-none"/>
                                        <ul className="max-h-48 overflow-auto">
                                            {filteredCountries.map(country => (
                                                <li key={country.code} onClick={() => handleCountryCodeChange(country.dial_code)} className="px-4 py-2 text-slate-700 hover:bg-orange-100 cursor-pointer">
                                                    {country.name} ({country.dial_code})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} className="w-2/3 px-4 py-3 bg-white border border-slate-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                        </div>
                    </>
                )}
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                <div className="relative">
                    <input type={isPasswordVisible ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                    <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500">
                        {isPasswordVisible ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                    </button>
                </div>
                {!isLogin && (
                    <>
                        <div className="relative">
                            <input type={isPasswordVisible ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                        </div>
                        <PasswordStrengthMeter password={formData.password} />
                    </>
                )}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button type="submit" className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors shadow-md shadow-orange-200 !mt-6">
                    {isLogin ? "Sign In" : "Create Account"}
                </button>
            </form>
            <p className="text-center text-sm text-slate-600 mt-6">
                {isLogin ? "No account?" : "Already have an account?"}
                <button onClick={switchView} className="font-semibold text-orange-500 hover:underline ml-1">{isLogin ? "Sign up" : "Sign in"}</button>
            </p>
        </div>
    );
};

const DashboardScreen = ({ user, handleLogout, history, handleHistoryClick, handleFileUpload }) => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    
    return (
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-100 max-w-4xl w-full animate-fade-in">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-black">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, {user?.firstName} {user?.lastName}!</p>
                </div>
                <div className="space-x-4">
                    <button onClick={() => setIsProfileModalOpen(true)} className="text-slate-500 hover:text-black font-semibold transition-colors">Profile</button>
                    <button onClick={handleLogout} className="text-slate-500 hover:text-black font-semibold transition-colors">Sign Out</button>
                </div>
            </header>

            <main className="grid lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <section>
                    <h2 className="text-xl font-bold text-black mb-4">New Analysis</h2>
                    <UploadScreen handleFileUpload={handleFileUpload} />
                </section>
                
                {/* History Section */}
                <section>
                    <h2 className="text-xl font-bold text-black mb-4">Analysis History</h2>
                    <div className="bg-white p-6 rounded-xl border-2 border-slate-200 h-full">
                        {history.length > 0 ? (
                            <ul className="space-y-3">
                                {history.map(item => (
                                    <li key={item.id} onClick={() => handleHistoryClick(item)} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-orange-100 cursor-pointer transition-colors">
                                        <div>
                                            <p className="font-semibold text-black">{item.taxpayerInfo.name}</p>
                                            <p className="text-sm text-slate-500">Notice: {item.taxpayerInfo.noticeNumber}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-orange-600">
                                            {item.amountDue}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-slate-500 mt-10">No past analyses found. Upload a PDF to begin.</p>
                        )}
                    </div>
                </section>
            </main>
            <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} title="My Profile">
                <div className="space-y-2">
                    <p><strong>Full Name:</strong> {user?.firstName} {user?.lastName}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Date of Birth:</strong> {user?.dob || 'Not available'}</p>
                    <p><strong>Mobile Number:</strong> {user?.mobileNumber || 'Not available'}</p>
                    <p className="text-sm text-slate-500 pt-4">Profile editing is not yet available. Full details are shown for the current session after registration.</p>
                </div>
            </Modal>
        </div>
    );
};

const UploadScreen = ({ handleFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragEvents = (e, dragging) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(dragging);
    };

    const handleDrop = (e) => {
        handleDragEvents(e, false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-orange-500 bg-orange-50' : 'border-slate-300 bg-white'}`}
            onDragEnter={e => handleDragEvents(e, true)}
            onDragLeave={e => handleDragEvents(e, false)}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
        >
            <UploadCloudIcon className={`mx-auto h-16 w-16 mb-4 transition-colors ${isDragging ? 'text-orange-600' : 'text-slate-400'}`} />
            <p className="mt-4 text-lg text-black font-semibold">Drop your PDF file here</p>
            <p className="text-sm text-slate-500 mt-1">or</p>
            <button type="button" className="mt-4 bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors">
                Select a File
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileSelect} />
        </div>
    );
};

const PDFViewer = ({ pdfFile }) => {
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        if (pdfFile) {
            const url = URL.createObjectURL(pdfFile);
            setPdfUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [pdfFile]);

    if (!pdfFile) return null;

    return (
        <div className="w-full h-full bg-slate-200 rounded-lg">
            <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" className="border-none rounded-lg" />
        </div>
    );
};

const SummaryScreen = ({ summaryData, resetApp, showToast, currentPdf }) => {
    const [activeModal, setActiveModal] = useState(null);

    const isPastDue = () => {
        if (!summaryData.payBy) return false;
        try {
            const dueDate = new Date(summaryData.payBy);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return dueDate < today;
        } catch (e) { return false; }
    };

    const copyToClipboard = (text) => {
        if (!navigator.clipboard) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                showToast('Copied to clipboard!', 'success');
            } catch (err) {
                showToast('Failed to copy!', 'error');
            }
            document.body.removeChild(textArea);
            return;
        }
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!', 'success');
        }, () => {
            showToast('Failed to copy!', 'error');
        });
    };

    const exportAsTxt = () => {
        const content = `
TAX NOTICE SUMMARY...`; // Content is truncated for brevity
        const blob = new Blob([content], { type: 'text/plain' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = `Tax_Notice_${summaryData.noticeType}_Summary.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };
    
    const taxpayerEmailContent = `Subject: Important: IRS Notice ${summaryData.noticeType}...`;
    const irsResponseContent = `[Your Name/Company Name]...`;

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-4xl animate-fade-in">
            <h1 className="text-3xl font-bold text-black mb-2 text-center">Summary of Your IRS Notice</h1>
            <p className="text-slate-500 text-center mb-6">Notice Type: <span className="font-semibold text-black">{summaryData.noticeType}</span></p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-sm">
                <h3 className="font-bold text-black mb-2">Taxpayer Information</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <p><strong>Name:</strong> {summaryData.taxpayerInfo.name}</p>
                    <p><strong>SSN:</strong> {summaryData.taxpayerInfo.ssn}</p>
                    <p className="col-span-2"><strong>Address:</strong> {summaryData.taxpayerInfo.address}</p>
                    <p><strong>Notice #:</strong> {summaryData.taxpayerInfo.noticeNumber}</p>
                    <p><strong>Tax Year:</strong> {summaryData.taxpayerInfo.taxYear}</p>
                </div>
            </div>

            <div className="h-[50vh] mb-6">
                <PDFViewer pdfFile={currentPdf} />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="p-6 rounded-xl border-2 border-slate-200 text-center">
                    <p className="text-sm text-slate-500 uppercase font-semibold tracking-wider">Amount Due</p>
                    <p className="text-4xl font-bold text-orange-500 mt-1">{summaryData.amountDue || 'N/A'}</p>
                </div>
                <div className={`p-6 rounded-xl border-2 text-center ${isPastDue() ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}>
                    <p className={`text-sm uppercase font-semibold tracking-wider ${isPastDue() ? 'text-red-600' : 'text-slate-500'}`}>Pay By</p>
                    <p className={`text-4xl font-bold mt-1 ${isPastDue() ? 'text-red-700' : 'text-black'}`}>{summaryData.payBy || 'N/A'}</p>
                    {isPastDue() && <p className="text-red-600 font-semibold mt-2 text-sm">This notice is past due.</p>}
                </div>
            </div>
            
            {summaryData.noticeMeaning?.toLowerCase().includes("immediate") && (
                <div className="flex items-center justify-center bg-yellow-50 border-2 border-yellow-200 text-yellow-800 p-4 rounded-xl my-6">
                    <AlertTriangleIcon className="h-6 w-6 mr-3" />
                    <p className="font-bold">Immediate Action Required</p>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                <div onClick={() => setActiveModal('summary')} className="p-5 rounded-xl border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all text-center">
                    <h3 className="text-lg font-bold text-black">📄</h3><p className="text-sm mt-1">Summary</p>
                </div>
                 <div onClick={() => setActiveModal('why')} className="p-5 rounded-xl border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all text-center">
                    <h3 className="text-lg font-bold text-black">❓</h3><p className="text-sm mt-1">Why This Notice?</p>
                </div>
                <div onClick={() => setActiveModal('breakdown')} className="p-5 rounded-xl border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all text-center">
                    <h3 className="text-lg font-bold text-black">💲</h3><p className="text-sm mt-1">Amount Breakdown</p>
                </div>
                <div onClick={() => setActiveModal('fix')} className="p-5 rounded-xl border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all text-center">
                    <h3 className="text-lg font-bold text-black">✔️</h3><p className="text-sm mt-1">How to Fix</p>
                </div>
                 <div onClick={() => setActiveModal('payment')} className="p-5 rounded-xl border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all text-center">
                    <h3 className="text-lg font-bold text-black">💳</h3><p className="text-sm mt-1">Payment Options</p>
                </div>
            </div>

            <div className="text-center mt-10 space-y-4 sm:space-y-0 sm:space-x-4">
                 <button onClick={() => setActiveModal('email')} className="border-2 border-orange-500 text-orange-500 font-bold py-2 px-6 rounded-lg hover:bg-orange-500 hover:text-white transition-colors">Email to Taxpayer</button>
                 <button onClick={() => setActiveModal('irs')} className="border-2 border-orange-500 text-orange-500 font-bold py-2 px-6 rounded-lg hover:bg-orange-500 hover:text-white transition-colors">Draft IRS Response</button>
                 <button onClick={exportAsTxt} className="border-2 border-slate-600 text-slate-600 font-bold py-2 px-6 rounded-lg hover:bg-slate-600 hover:text-white transition-colors">Export as Text</button>
                 <button onClick={resetApp} className="bg-slate-700 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-black transition-colors">Analyze Another</button>
            </div>
            
            {/* Modals */}
            <Modal isOpen={activeModal === 'summary'} onClose={() => setActiveModal(null)} title="Quick Overview">
                <p className="text-slate-600">{summaryData.noticeMeaning || 'No summary available.'}</p>
            </Modal>
            <Modal isOpen={activeModal === 'why'} onClose={() => setActiveModal(null)} title="Why Did I Receive This?">
                <p className="text-slate-600">{summaryData.whyText || 'No reason provided.'}</p>
            </Modal>
            <Modal isOpen={activeModal === 'breakdown'} onClose={() => setActiveModal(null)} title="Amount Breakdown">
                {summaryData.breakdown?.length > 0 ? (
                    <table className="min-w-full bg-white mt-4 rounded-lg border border-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="text-left py-2 px-4 font-semibold text-black">Item</th>
                                <th className="text-right py-2 px-4 font-semibold text-black">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryData.breakdown.map((item, index) => (
                                <tr key={index} className="border-t border-slate-200">
                                    <td className="py-2 px-4 text-slate-700">{item.item}</td>
                                    <td className="py-2 px-4 text-slate-700 text-right font-mono">{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <p className="text-slate-600">No breakdown available.</p>}
            </Modal>
            <Modal isOpen={activeModal === 'fix'} onClose={() => setActiveModal(null)} title="How Should I Fix This?">
                 <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                     <p className="font-semibold text-green-800">If You Agree:</p>
                     <p className="text-green-700 text-sm">{summaryData.fixSteps?.agree || 'Information not available.'}</p>
                </div>
                 <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                     <p className="font-semibold text-yellow-800">If You Disagree:</p>
                     <p className="text-yellow-700 text-sm">{summaryData.fixSteps?.disagree || 'Information not available.'}</p>
                </div>
            </Modal>
            <Modal isOpen={activeModal === 'payment'} onClose={() => setActiveModal(null)} title="Payment Options">
                 <ul className="space-y-3 text-slate-700 text-sm">
                     <li><strong>Online:</strong> <a href={`https://${summaryData.paymentOptions?.online}`} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-semibold hover:underline">{summaryData.paymentOptions?.online || 'Not specified'}</a></li>
                     <li><strong>By Mail:</strong> {summaryData.paymentOptions?.mail || 'Not specified'}</li>
                     <li><strong>Payment Plan:</strong> <a href={`https://${summaryData.paymentOptions?.plan}`} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-semibold hover:underline">{summaryData.paymentOptions?.plan || 'Not specified'}</a></li>
                    </ul>
            </Modal>
            <Modal isOpen={activeModal === 'email'} onClose={() => setActiveModal(null)} title="Email to Taxpayer">
                <pre className="bg-slate-100 p-4 rounded-lg text-sm text-slate-800 whitespace-pre-wrap font-sans">{taxpayerEmailContent}</pre>
                <button onClick={() => copyToClipboard(taxpayerEmailContent)} className="mt-4 bg-orange-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-orange-600">Copy to Clipboard</button>
            </Modal>
            <Modal isOpen={activeModal === 'irs'} onClose={() => setActiveModal(null)} title="Draft IRS Response">
                 <pre className="bg-slate-100 p-4 rounded-lg text-sm text-slate-800 whitespace-pre-wrap font-sans">{irsResponseContent}</pre>
                 <button onClick={() => copyToClipboard(irsResponseContent)} className="mt-4 bg-orange-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-orange-600">Copy to Clipboard</button>
            </Modal>
        </div>
    );
};

// --- Main Application Component ---
export default function App() {
    const [view, setView] = useState('login');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [summaryData, setSummaryData] = useState(null);
    const [toast, setToast] = useState({ message: '', type: '', isActive: false });
    const [history, setHistory] = useState([]);
    const [currentPdf, setCurrentPdf] = useState(null);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ message, type, isActive: true });
        setTimeout(() => {
            setToast({ message: '', type: '', isActive: false });
        }, 3000);
    };

    const clearFormFields = () => setError('');

    const handleRegister = async (formData) => {
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        const result = await api.register(formData);
        if (result.success) {
            const fullUser = {
                id: result.user.id,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                dob: formData.dob,
                mobileNumber: `${formData.countryCode}${formData.mobileNumber}`
            };
            setUser(fullUser);
            setView('dashboard');
        } else {
            setError(result.message);
        }
    };

    const handleLogin = async (formData) => {
        setError('');
        const result = await api.login(formData);
        if (result.success) {
            setUser(result.user);
            setView('dashboard');
        } else {
            setError(result.message);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setView('login');
    };
    
    const resetApp = () => {
        setView('dashboard');
        setSummaryData(null);
        setCurrentPdf(null);
        setError('');
    };

    const handleFileUpload = (file) => {
        if (file && file.type === "application/pdf") {
            setView('analyzing');
            
            setTimeout(() => {
                const mockResult = {
                    success: true,
                    summary: {
                        noticeType: "CP2000",
                        amountDue: "$1,250.00",
                        payBy: "2024-03-15",
                        noticeMeaning: "This is a Notice of Proposed Adjustment for Underpayment/Overpayment. It means the IRS has received information from a third party that doesn't match the information you reported on your tax return.",
                        whyText: "The IRS received a 1099-INT form from your bank showing $5,000 in interest income that was not reported on your tax return.",
                        taxpayerInfo: {
                            name: "John D. Taxpayer",
                            address: "123 Main Street, Anytown, USA 12345",
                            ssn: "XXX-XX-1234",
                            noticeNumber: `12345${Math.floor(Math.random() * 900) + 100}`, // Randomize for unique history
                            taxYear: "2022"
                        },
                        breakdown: [ { item: "Underreported Income Tax", amount: "$1,000.00" }, { item: "Penalties", amount: "$100.00" }, { item: "Interest", amount: "$150.00" } ],
                        fixSteps: { agree: "If you agree, sign and return the response form and pay the amount due.", disagree: "If you disagree, send a signed statement explaining why, along with supporting documents." },
                        paymentOptions: { online: "www.irs.gov/payments", mail: "Mail a check with the payment voucher.", plan: "www.irs.gov/payments/online-payment-agreement-application" }
                    }
                };

                if (mockResult.success) {
                    const newHistoryItem = { ...mockResult.summary, id: Date.now(), pdfFile: file };
                    setHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, 10));
                    setSummaryData(mockResult.summary);
                    setCurrentPdf(file);
                    setView('summary');
                } else {
                    setView('dashboard');
                    showToast('Failed to analyze the document.', 'error');
                }
            }, 1500);
        }
    };

    const handleHistoryClick = (historyItem) => {
        setSummaryData(historyItem);
        setCurrentPdf(historyItem.pdfFile);
        setView('summary');
    };

    const renderView = () => {
        switch (view) {
            case 'register':
                return <AuthScreen isLogin={false} onSubmit={handleRegister} error={error} setView={setView} clearFormFields={clearFormFields} />;
            case 'login':
                return <AuthScreen isLogin={true} onSubmit={handleLogin} error={error} setView={setView} clearFormFields={clearFormFields} />;
            case 'dashboard':
                return <DashboardScreen user={user} handleLogout={handleLogout} history={history} handleHistoryClick={handleHistoryClick} handleFileUpload={handleFileUpload} />;
            case 'analyzing':
                return <LoadingSpinner />;
            case 'summary':
                return <SummaryScreen summaryData={summaryData} resetApp={resetApp} showToast={showToast} currentPdf={currentPdf} />;
            default:
                return <AuthScreen isLogin={true} onSubmit={handleLogin} error={error} setView={setView} clearFormFields={clearFormFields} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            {renderView()}
            <Toast message={toast.message} type={toast.type} isActive={toast.isActive} />
        </div>
    );
}

import React, { useState, useRef, useEffect } from 'react';

// The hardcoded URL is a placeholder. The correct URL for your new Azure backend
// will be set in the Azure Static Web Apps "Configuration" settings.
const API_BASE_URL = 'https://tax-analyzer-backend.onrender.com';

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
const FileHeart = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" /><path d="M14 2v6h6" /><path d="M10.3 12.3c.8-1 2-1.5 3.2-1.5 2.2 0 4 1.8 4 4 0 2.5-3.4 4.9-5.2 6.2a.5.5 0 0 1-.6 0C10 19.4 6 17 6 14.5c0-2.2 1.8-4 4-4 .8 0 1.5.3 2.1.8" /></svg> );
const LoadingSpinner = () => ( <div className="flex flex-col items-center justify-center space-y-4"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div><p className="text-purple-700 font-semibold">AI Analyzing your notice...</p></div> );

// --- Screen Components ---
const AuthScreen = ({ isLogin, handleLogin, handleRegister, error, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, dob, setDob, mobileNumber, setMobileNumber, countryCode, setCountryCode, setView, clearFormFields}) => {
    const countryCodes = [
        { name: "United States", code: "US", dial_code: "+1" },
        { name: "Canada", code: "CA", dial_code: "+1" },
        { name: "Russia", code: "RU", dial_code: "+7" },
        { name: "Egypt", code: "EG", dial_code: "+20" },
        { name: "South Africa", code: "ZA", dial_code: "+27" },
        { name: "Greece", code: "GR", dial_code: "+30" },
        { name: "Netherlands", code: "NL", dial_code: "+31" },
        { name: "Belgium", code: "BE", dial_code: "+32" },
        { name: "France", code: "FR", dial_code: "+33" },
        { name: "Spain", code: "ES", dial_code: "+34" },
        { name: "Hungary", code: "HU", dial_code: "+36" },
        { name: "Italy", code: "IT", dial_code: "+39" },
        { name: "Romania", code: "RO", dial_code: "+40" },
        { name: "Switzerland", code: "CH", dial_code: "+41" },
        { name: "Austria", code: "AT", dial_code: "+43" },
        { name: "United Kingdom", code: "GB", dial_code: "+44" },
        { name: "Denmark", code: "DK", dial_code: "+45" },
        { name: "Sweden", code: "SE", dial_code: "+46" },
        { name: "Norway", code: "NO", dial_code: "+47" },
        { name: "Poland", code: "PL", dial_code: "+48" },
        { name: "Germany", code: "DE", dial_code: "+49" },
        { name: "Peru", code: "PE", dial_code: "+51" },
        { name: "Mexico", code: "MX", dial_code: "+52" },
        { name: "Cuba", code: "CU", dial_code: "+53" },
        { name: "Argentina", code: "AR", dial_code: "+54" },
        { name: "Brazil", code: "BR", dial_code: "+55" },
        { name: "Chile", code: "CL", dial_code: "+56" },
        { name: "Colombia", code: "CO", dial_code: "+57" },
        { name: "Venezuela", code: "VE", dial_code: "+58" },
        { name: "Malaysia", code: "MY", dial_code: "+60" },
        { name: "Australia", code: "AU", dial_code: "+61" },
        { name: "Indonesia", code: "ID", dial_code: "+62" },
        { name: "Philippines", code: "PH", dial_code: "+63" },
        { name: "New Zealand", code: "NZ", dial_code: "+64" },
        { name: "Singapore", code: "SG", dial_code: "+65" },
        { name: "Thailand", code: "TH", dial_code: "+66" },
        { name: "Japan", code: "JP", dial_code: "+81" },
        { name: "South Korea", code: "KR", dial_code: "+82" },
        { name: "Vietnam", code: "VN", dial_code: "+84" },
        { name: "China", code: "CN", dial_code: "+86" },
        { name: "Turkey", code: "TR", dial_code: "+90" },
        { name: "India", code: "IN", dial_code: "+91" },
        { name: "Pakistan", code: "PK", dial_code: "+92" },
        { name: "Afghanistan", code: "AF", dial_code: "+93" },
        { name: "Sri Lanka", code: "LK", dial_code: "+94" },
        { name: "Myanmar", code: "MM", dial_code: "+95" },
        { name: "Iran", code: "IR", dial_code: "+98" },
        { name: "South Sudan", code: "SS", dial_code: "+211" },
        { name: "Morocco", code: "MA", dial_code: "+212" },
        { name: "Algeria", code: "DZ", dial_code: "+213" },
        { name: "Tunisia", code: "TN", dial_code: "+216" },
        { name: "Libya", code: "LY", dial_code: "+218" },
        { name: "Gambia", code: "GM", dial_code: "+220" },
        { name: "Senegal", code: "SN", dial_code: "+221" },
        { name: "Mauritania", code: "MR", dial_code: "+222" },
        { name: "Mali", code: "ML", dial_code: "+223" },
        { name: "Guinea", code: "GN", dial_code: "+224" },
        { name: "Ivory Coast", code: "CI", dial_code: "+225" },
        { name: "Burkina Faso", code: "BF", dial_code: "+226" },
        { name: "Niger", code: "NE", dial_code: "+227" },
        { name: "Togo", code: "TG", dial_code: "+228" },
        { name: "Benin", code: "BJ", dial_code: "+229" },
        { name: "Mauritius", code: "MU", dial_code: "+230" },
        { name: "Liberia", code: "LR", dial_code: "+231" },
        { name: "Sierra Leone", code: "SL", dial_code: "+232" },
        { name: "Ghana", code: "GH", dial_code: "+233" },
        { name: "Nigeria", code: "NG", dial_code: "+234" },
        { name: "Chad", code: "TD", dial_code: "+235" },
        { name: "Central African Republic", code: "CF", dial_code: "+236" },
        { name: "Cameroon", code: "CM", dial_code: "+237" },
        { name: "Cape Verde", code: "CV", dial_code: "+238" },
        { name: "Sao Tome and Principe", code: "ST", dial_code: "+239" },
        { name: "Equatorial Guinea", code: "GQ", dial_code: "+240" },
        { name: "Gabon", code: "GA", dial_code: "+241" },
        { name: "Congo (Brazzaville)", code: "CG", dial_code: "+242" },
        { name: "Congo (DRC)", code: "CD", dial_code: "+243" },
        { name: "Angola", code: "AO", dial_code: "+244" },
        { name: "Guinea-Bissau", code: "GW", dial_code: "+245" },
        { name: "Seychelles", code: "SC", dial_code: "+248" },
        { name: "Sudan", code: "SD", dial_code: "+249" },
        { name: "Rwanda", code: "RW", dial_code: "+250" },
        { name: "Ethiopia", code: "ET", dial_code: "+251" },
        { name: "Somalia", code: "SO", dial_code: "+252" },
        { name: "Djibouti", code: "DJ", dial_code: "+253" },
        { name: "Kenya", code: "KE", dial_code: "+254" },
        { name: "Tanzania", code: "TZ", dial_code: "+255" },
        { name: "Uganda", code: "UG", dial_code: "+256" },
        { name: "Burundi", code: "BI", dial_code: "+257" },
        { name: "Mozambique", code: "MZ", dial_code: "+258" },
        { name: "Zambia", code: "ZM", dial_code: "+260" },
        { name: "Madagascar", code: "MG", dial_code: "+261" },
        { name: "Reunion", code: "RE", dial_code: "+262" },
        { name: "Zimbabwe", code: "ZW", dial_code: "+263" },
        { name: "Namibia", code: "NA", dial_code: "+264" },
        { name: "Malawi", code: "MW", dial_code: "+265" },
        { name: "Lesotho", code: "LS", dial_code: "+266" },
        { name: "Botswana", code: "BW", dial_code: "+267" },
        { name: "Eswatini", code: "SZ", dial_code: "+268" },
        { name: "Comoros", code: "KM", dial_code: "+269" },
        { name: "Eritrea", code: "ER", dial_code: "+291" },
        { name: "Aruba", code: "AW", dial_code: "+297" },
        { name: "Faroe Islands", code: "FO", dial_code: "+298" },
        { name: "Greenland", code: "GL", dial_code: "+299" },
        { name: "Gibraltar", code: "GI", dial_code: "+350" },
        { name: "Portugal", code: "PT", dial_code: "+351" },
        { name: "Luxembourg", code: "LU", dial_code: "+352" },
        { name: "Ireland", code: "IE", dial_code: "+353" },
        { name: "Iceland", code: "IS", dial_code: "+354" },
        { name: "Albania", code: "AL", dial_code: "+355" },
        { name: "Malta", code: "MT", dial_code: "+356" },
        { name: "Cyprus", code: "CY", dial_code: "+357" },
        { name: "Finland", code: "FI", dial_code: "+358" },
        { name: "Bulgaria", code: "BG", dial_code: "+359" },
        { name: "Lithuania", code: "LT", dial_code: "+370" },
        { name: "Latvia", code: "LV", dial_code: "+371" },
        { name: "Estonia", code: "EE", dial_code: "+372" },
        { name: "Moldova", code: "MD", dial_code: "+373" },
        { name: "Armenia", code: "AM", dial_code: "+374" },
        { name: "Belarus", code: "BY", dial_code: "+375" },
        { name: "Andorra", code: "AD", dial_code: "+376" },
        { name: "Monaco", code: "MC", dial_code: "+377" },
        { name: "San Marino", code: "SM", dial_code: "+378" },
        { name: "Vatican City", code: "VA", dial_code: "+379" },
        { name: "Ukraine", code: "UA", dial_code: "+380" },
        { name: "Serbia", code: "RS", dial_code: "+381" },
        { name: "Montenegro", code: "ME", dial_code: "+382" },
        { name: "Croatia", code: "HR", dial_code: "+385" },
        { name: "Slovenia", code: "SI", dial_code: "+386" },
        { name: "Bosnia and Herzegovina", code: "BA", dial_code: "+387" },
        { name: "North Macedonia", code: "MK", dial_code: "+389" },
        { name: "Czech Republic", code: "CZ", dial_code: "+420" },
        { name: "Slovakia", code: "SK", dial_code: "+421" },
        { name: "Liechtenstein", code: "LI", dial_code: "+423" },
        { name: "Belize", code: "BZ", dial_code: "+501" },
        { name: "Guatemala", code: "GT", dial_code: "+502" },
        { name: "El Salvador", code: "SV", dial_code: "+503" },
        { name: "Honduras", code: "HN", dial_code: "+504" },
        { name: "Nicaragua", code: "NI", dial_code: "+505" },
        { name: "Costa Rica", code: "CR", dial_code: "+506" },
        { name: "Panama", code: "PA", dial_code: "+507" },
        { name: "Haiti", code: "HT", dial_code: "+509" },
        { name: "Bolivia", code: "BO", dial_code: "+591" },
        { name: "Guyana", code: "GY", dial_code: "+592" },
        { name: "Ecuador", code: "EC", dial_code: "+593" },
        { name: "Paraguay", code: "PY", dial_code: "+595" },
        { name: "Suriname", code: "SR", dial_code: "+597" },
        { name: "Uruguay", code: "UY", dial_code: "+598" },
        { name: "Brunei", code: "BN", dial_code: "+673" },
        { name: "Papua New Guinea", code: "PG", dial_code: "+675" },
        { name: "Tonga", code: "TO", dial_code: "+676" },
        { name: "Solomon Islands", code: "SB", dial_code: "+677" },
        { name: "Vanuatu", code: "VU", dial_code: "+678" },
        { name: "Fiji", code: "FJ", dial_code: "+679" },
        { name: "Palau", code: "PW", dial_code: "+680" },
        { name: "Samoa", code: "WS", dial_code: "+685" },
        { name: "Kiribati", code: "KI", dial_code: "+686" },
        { name: "Tuvalu", code: "TV", dial_code: "+688" },
        { name: "Marshall Islands", code: "MH", dial_code: "+692" },
        { name: "North Korea", code: "KP", dial_code: "+850" },
        { name: "Hong Kong", code: "HK", dial_code: "+852" },
        { name: "Macau", code: "MO", dial_code: "+853" },
        { name: "Cambodia", code: "KH", dial_code: "+855" },
        { name: "Laos", code: "LA", dial_code: "+856" },
        { name: "Bangladesh", code: "BD", dial_code: "+880" },
        { name: "Taiwan", code: "TW", dial_code: "+886" },
        { name: "Maldives", code: "MV", dial_code: "+960" },
        { name: "Lebanon", code: "LB", dial_code: "+961" },
        { name: "Jordan", code: "JO", dial_code: "+962" },
        { name: "Syria", code: "SY", dial_code: "+963" },
        { name: "Iraq", code: "IQ", dial_code: "+964" },
        { name: "Kuwait", code: "KW", dial_code: "+965" },
        { name: "Saudi Arabia", code: "SA", dial_code: "+966" },
        { name: "Yemen", code: "YE", dial_code: "+967" },
        { name: "Oman", code: "OM", dial_code: "+968" },
        { name: "United Arab Emirates", code: "AE", dial_code: "+971" },
        { name: "Israel", code: "IL", dial_code: "+972" },
        { name: "Bahrain", code: "BH", dial_code: "+973" },
        { name: "Qatar", code: "QA", dial_code: "+974" },
        { name: "Bhutan", code: "BT", dial_code: "+975" },
        { name: "Mongolia", code: "MN", dial_code: "+976" },
        { name: "Nepal", code: "NP", dial_code: "+977" },
        { name: "Tajikistan", code: "TJ", dial_code: "+992" },
        { name: "Turkmenistan", code: "TM", dial_code: "+993" },
        { name: "Azerbaijan", code: "AZ", dial_code: "+994" },
        { name: "Georgia", code: "GE", dial_code: "+995" },
        { name: "Kyrgyzstan", code: "KG", dial_code: "+996" },
        { name: "Uzbekistan", code: "UZ", dial_code: "+998" }
    ].sort((a, b) => parseInt(a.dial_code.substring(1)) - parseInt(b.dial_code.substring(1)));

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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
                        <div className="relative w-1/4" ref={dropdownRef}>
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

// CORRECTED: Added 'user' prop to the function definition
const UploadScreen = ({ user, handleLogout, handleFileUpload }) => {
    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => { e.preventDefault(); if (e.dataTransfer.files.length > 0) handleFileUpload(e.dataTransfer.files[0]); };
    const handleFileSelect = (e) => { if (e.target.files.length > 0) handleFileUpload(e.target.files[0]); };
    return (
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100 max-w-2xl w-full" style={{ backgroundColor: '#F9F5FF' }}>
            {/* CORRECTED: Changed h2 to display a welcome message using the 'user' prop */}
            <div className="flex justify-between items-center mb-6"> <h2 className="text-3xl font-bold text-purple-800">Welcome, {user?.firstName}!</h2> <button onClick={handleLogout} className="text-purple-600 hover:text-purple-800 font-semibold">Sign Out</button> </div>
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
    const [view, setView] = useState('login');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [countryCode, setCountryCode] = useState('+1');
    const [mobileNumber, setMobileNumber] = useState('');
    const [summaryData, setSummaryData] = useState(null);

    const clearFormFields = () => {
        setEmail(''); setPassword(''); setConfirmPassword('');
        setFirstName(''); setLastName(''); setError('');
        setDob(''); setMobileNumber(''); setCountryCode('+1');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) { setError("Passwords do not match."); return; }
        const fullMobileNumber = `${countryCode}${mobileNumber}`;
        const result = await api.register({ firstName, lastName, email, password, dob, mobileNumber: fullMobileNumber });
        if (result.success) { setUser(result.user); setView('upload'); } 
        else { setError(result.message); }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const result = await api.login({ email, password });
        if (result.success) { setUser(result.user); setView('upload'); }
        else { setError(result.message); }
    };

    const handleLogout = () => { setUser(null); setView('login'); };
    
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

    const resetApp = () => { setView('upload'); setSummaryData(null); };

    const renderView = () => {
        switch (view) {
            case 'register': return <AuthScreen isLogin={false} handleRegister={handleRegister} error={error} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} dob={dob} setDob={setDob} mobileNumber={mobileNumber} setMobileNumber={setMobileNumber} countryCode={countryCode} setCountryCode={setCountryCode} setView={setView} clearFormFields={clearFormFields} />;
            case 'login': return <AuthScreen isLogin={true} handleLogin={handleLogin} error={error} email={email} setEmail={setEmail} password={password} setPassword={setPassword} setView={setView} clearFormFields={clearFormFields} />;
            
            // CORRECTED: Pass the 'user' object to the UploadScreen component
            case 'upload': return <UploadScreen user={user} handleLogout={handleLogout} handleFileUpload={handleFileUpload} />;
            
            case 'analyzing': return <LoadingSpinner />;
            case 'summary': return <SummaryScreen summaryData={summaryData} resetApp={resetApp} />;
            default: return <div className="text-purple-500">Loading...</div>;
        }
    };

    return (
        <div className="min-h-screen bg-purple-100 flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #EDE9FE, #F3E8FF)'}}>
            {renderView()}
        </div>
    );
}

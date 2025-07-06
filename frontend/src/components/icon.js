// src/components/icon.js

export const LibraryIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M8 6C8 4.89543 8.89543 4 10 4H38C39.1046 4 40 4.89543 40 6V8C40 9.10457 39.1046 10 38 10H10C8.89543 10 8 9.10457 8 8V6Z" fill="#4299E1"/>
    <path d="M6 12C6 10.8954 6.89543 10 8 10H40C41.1046 10 42 10.8954 42 12V42C42 43.1046 41.1046 44 40 44H8C6.89543 44 6 43.1046 6 42V12Z" fill="#3182CE"/>
    <path d="M12 16H36V18H12V16Z" fill="white" fillOpacity="0.8"/>
    <path d="M12 22H32V24H12V22Z" fill="white" fillOpacity="0.6"/>
    <path d="M12 28H28V30H12V28Z" fill="white" fillOpacity="0.4"/>
    <circle cx="16" cy="36" r="2" fill="#F6AD55"/>
    <circle cx="24" cy="36" r="2" fill="#38B2AC"/>
    <circle cx="32" cy="36" r="2" fill="#ED8936"/>
  </svg>
);

export const BookListIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="8" y="8" width="32" height="4" rx="2" fill="currentColor"/>
    <rect x="8" y="16" width="32" height="4" rx="2" fill="currentColor" fillOpacity="0.8"/>
    <rect x="8" y="24" width="32" height="4" rx="2" fill="currentColor" fillOpacity="0.6"/>
    <rect x="8" y="32" width="32" height="4" rx="2" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="6" cy="10" r="2" fill="currentColor"/>
  </svg>
);

export const BorrowedBooksIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="12" width="24" height="30" rx="2" fill="#F6AD55"/>
    <rect x="8" y="14" width="20" height="2" fill="white" fillOpacity="0.8"/>
    <rect x="8" y="18" width="16" height="2" fill="white" fillOpacity="0.6"/>
    <rect x="8" y="22" width="12" height="2" fill="white" fillOpacity="0.4"/>
    <path d="M18 12V4C18 2.89543 18.8954 2 20 2H40C41.1046 2 42 2.89543 42 4V32C42 33.1046 41.1046 34 40 34H32" stroke="#ED8936" strokeWidth="2"/>
    <circle cx="36" cy="40" r="6" fill="#38B2AC"/>
    <path d="M33 40L35 42L39 38" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AnalyticsIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="36" width="6" height="8" rx="1" fill="#4299E1"/>
    <rect x="15" y="28" width="6" height="16" rx="1" fill="#38B2AC"/>
    <rect x="24" y="20" width="6" height="24" rx="1" fill="#F6AD55"/>
    <rect x="33" y="24" width="6" height="20" rx="1" fill="#ED8936"/>
    <path d="M4 16L12 8L20 12L28 4L36 8L44 4" stroke="#667EEA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="8" r="3" fill="#667EEA"/>
    <circle cx="20" cy="12" r="3" fill="#667EEA"/>
    <circle cx="28" cy="4" r="3" fill="#667EEA"/>
    <circle cx="36" cy="8" r="3" fill="#667EEA"/>
  </svg>
);

export const FilterIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M6 8C6 6.89543 6.89543 6 8 6H40C41.1046 6 42 6.89543 42 8V12C42 12.7956 41.6839 13.5587 41.1213 14.1213L29 26.2426V38C29 38.5523 28.5523 39 28 39H20C19.4477 39 19 38.5523 19 38V26.2426L6.87868 14.1213C6.31607 13.5587 6 12.7956 6 12V8Z" fill="#4299E1"/>
    <path d="M12 12H36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="38" cy="36" r="8" fill="#38B2AC"/>
    <path d="M34 36L36 38L42 32" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SearchIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="20" cy="20" r="12" stroke="#4299E1" strokeWidth="3" />
    <path d="m29 29 10 10" stroke="#4299E1" strokeWidth="3" strokeLinecap="round" />
    <circle cx="20" cy="20" r="8" fill="#38B2AC" fillOpacity="0.2" />
    <path d="M16 20L18 22L24 16" stroke="#38B2AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

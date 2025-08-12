// Google Sheets Configuration
export const GOOGLE_SHEETS_CONFIG = {
  // Your Google Sheets ID from the URL
  SPREADSHEET_ID: process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '',
  
  // Range to fetch data (A:F for Name, Service Name, Phone, Email, Requested Date, Requested Time)
  DEFAULT_RANGE: process.env.GOOGLE_SHEETS_DEFAULT_RANGE || 'Sheet1!A:F',
  
  // Access configuration
  ACCESS_METHOD: 'private' as 'public' | 'private', // 'public' or 'private'
  
  // Whether to use public access (no API key required)
  IS_PUBLIC: false, // Set to false for private sheets
  
  // Auto-refresh interval in milliseconds (2 minutes to avoid rate limits)
  AUTO_REFRESH_INTERVAL: 120000,
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 5000, // 5 seconds
  
  // Authentication settings
  AUTH: {
    // API Key for Google Sheets API (fallback method)
    API_KEY: process.env.GOOGLE_SHEETS_API_KEY || '',
    
    // Service Account settings (primary method for private sheets)
    SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    SERVICE_ACCOUNT_PRIVATE_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '',
    
    // Service Account JSON file path (DEPRECATED - use environment variables instead)
    SERVICE_ACCOUNT_KEY_FILE: process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY_FILE || '',
  },
  
  // Key metrics columns mapping
  COLUMNS: {
    NAME: 0,           // Column A
    SERVICE_NAME: 1,   // Column B
    PHONE: 2,          // Column C
    EMAIL: 3,          // Column D
    REQUESTED_DATE: 4, // Column E
    REQUESTED_TIME: 5, // Column F
  }
} as const;

// Column headers for the data table
export const COLUMN_HEADERS = [
  'Name',
  'Service Name', 
  'Phone',
  'Email',
  'Requested Date',
  'Requested Time'
] as const; 
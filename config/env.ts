// Environment configuration for Google Sheets and Webhook integration
export const env = {
  // Google Sheets API Configuration
  GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY || '',
  GOOGLE_SHEETS_SPREADSHEET_ID: process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '',
  GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
  GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY_FILE: process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY_FILE || '',
  
  // Webhook Configuration
  WEBHOOK_URL: process.env.WEBHOOK_URL || '',
  WEBHOOK_USERNAME: process.env.WEBHOOK_USERNAME || '',
  WEBHOOK_PASSWORD: process.env.WEBHOOK_PASSWORD || '',
  
  // Google Sheets Default Settings
  DEFAULT_SPREADSHEET_ID: process.env.DEFAULT_SPREADSHEET_ID || '',
  DEFAULT_SHEET_RANGE: process.env.DEFAULT_SHEET_RANGE || 'Sheet1!A:G',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Validation helpers
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Check if required environment variables are set
  hasGoogleSheetsApiKey: !!process.env.GOOGLE_SHEETS_API_KEY,
  hasGoogleSheetsSpreadsheetId: !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  hasGoogleSheetsServiceAccount: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  hasWebhookUrl: !!process.env.WEBHOOK_URL,
  hasWebhookAuth: !!(process.env.WEBHOOK_USERNAME && process.env.WEBHOOK_PASSWORD),
} as const;

// Environment variable validation
export function validateEnvironment() {
  const missingVars: string[] = [];
  
  if (!env.GOOGLE_SHEETS_API_KEY) {
    missingVars.push('GOOGLE_SHEETS_API_KEY');
  }
  
  if (!env.WEBHOOK_URL) {
    missingVars.push('WEBHOOK_URL');
  }
  
  if (missingVars.length > 0) {
    console.warn(`Missing environment variables: ${missingVars.join(', ')}`);
    console.warn('Please create a .env.local file with the required variables');
  }
  
  return missingVars.length === 0;
} 
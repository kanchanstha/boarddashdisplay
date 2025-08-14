import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import path from 'path';

export interface GoogleSheetRow {
  id: number;
  name: string;
  serviceName: string;
  phone: string;
  email: string;
  requestedDate: string;
  requestedTime: string;
}

// Define the scope - what permissions you're requesting
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

// Create the full path to your key file (DEPRECATED - use environment variables instead)
const KEY_FILE_PATH = path.join(process.cwd(), 'key.json');

// Service Account method for private Google Sheets (most secure)
export async function getGoogleSheetsDataWithServiceAccount(spreadsheetId: string, range: string): Promise<GoogleSheetRow[]> {
  try {
    console.log('🔐 Starting service account authentication...');
    console.log(`📁 Key file path: ${KEY_FILE_PATH}`);
    console.log(`📋 Scopes: ${SCOPES.join(', ')}`);
    
    // Check if key file exists
    const fs = await import('fs');
    if (!fs.existsSync(KEY_FILE_PATH)) {
      throw new Error(`Key file not found at: ${KEY_FILE_PATH}`);
    }
    console.log('✅ Key file found');
    
    // Read the key file to get project ID
    const keyFileContent = fs.readFileSync(KEY_FILE_PATH, 'utf8');
    const keyData = JSON.parse(keyFileContent);
    console.log(`📊 Project ID from key file: ${keyData.project_id}`);
    console.log(`📧 Service Account Email: ${keyData.client_email}`);
    
    // Create the auth client with explicit project ID
    const auth = new GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: SCOPES,
      projectId: keyData.project_id, // Explicitly provide project ID
    });
    
    // Get the authenticated client
    console.log('🔄 Getting authenticated client...');
    await auth.getClient();
    console.log('✅ Service account authenticated successfully');
    
    // Get the project ID and email from the auth client
    const projectId = await auth.getProjectId();
    const credentials = await auth.getCredentials();
    console.log(`📊 Project ID from auth: ${projectId}`);
    console.log(`📧 Service Account Email from auth: ${credentials.client_email || 'Not available'}`);
    
    // Get the Sheets API client
    console.log('🔄 Initializing Google Sheets API client...');
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('✅ Google Sheets API client initialized');

    // Now you can make your API call with an established identity
    console.log(`📊 Making API call to spreadsheet: ${spreadsheetId}`);
    console.log(`📋 Range: ${range}`);
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });

    if (!response.data.values || response.data.values.length === 0) {
      console.log('⚠️  No data found in Google Sheets.');
      return [];
    }

    // Skip header row and map data to match key metrics
    const dataRows = response.data.values.slice(1).map((row: string[], index: number) => ({
      id: index + 1,
      name: row[0] || '', // Name
      serviceName: row[1] || '', // Service Name
      phone: row[2] || '', // Phone
      email: row[3] || '', // Email
      requestedDate: row[4] || '', // Requested Date
      requestedTime: row[5] || '', // Requested Time
    }));

    console.log(`✅ Successfully fetched ${dataRows.length} rows using service account`);
    return dataRows;
  } catch (error) {
    console.error('❌ Error fetching Google Sheets data with service account:', error);
    
    // Add more specific error information
    if (error instanceof Error) {
      console.error('❌ Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      
      if (error.message.includes('Method doesn\'t allow unregistered callers')) {
        console.error('🔧 This error suggests the Google Sheets API is not enabled or the service account lacks proper permissions');
      }
    }
    
    throw error;
  }
}

// Primary method using Google Sheets CSV export (most reliable for public sheets)
export async function getPublicGoogleSheetsData(spreadsheetId: string): Promise<GoogleSheetRow[]> {
  try {
    // Use the CSV export URL which is more reliable for public sheets
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=0`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch public sheet: ${response.statusText} (${response.status})`);
    }

    const csvText = await response.text();

    if (!csvText || csvText.trim() === '') {
      console.log('No data found in Google Sheets.');
      return [];
    }

    // Parse CSV data
    const rows = csvText
      .split('\n')
      .map(row => row.split(',').map(cell => cell.replace(/"/g, '').trim()))
      .filter(row => row.length > 0 && row.some(cell => cell !== ''));

    if (rows.length === 0) {
      console.log('No data found in Google Sheets.');
      return [];
    }

    // Skip header row and map data to match key metrics
    const dataRows = rows.slice(1).map((row: string[], index: number) => ({
      id: index + 1,
      name: row[0] || '', // Name
      serviceName: row[1] || '', // Service Name
      phone: row[2] || '', // Phone
      email: row[3] || '', // Email
      requestedDate: row[4] || '', // Requested Date
      requestedTime: row[5] || '', // Requested Time
    }));

    return dataRows;
  } catch (error) {
    console.error('Error fetching public Google Sheets data:', error);
    throw error;
  }
}

// Fallback method using API key (for development/testing)
export async function getGoogleSheetsDataWithApiKey(spreadsheetId: string, range: string): Promise<GoogleSheetRow[]> {
  try {
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Sheets API key not found. Please set GOOGLE_SHEETS_API_KEY in your environment variables.');
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Google Sheets API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      console.log('No data found in Google Sheets.');
      return [];
    }

    // Skip header row and map data
    const dataRows = data.values.slice(1).map((row: string[], index: number) => ({
      id: index + 1,
      name: row[0] || '',
      serviceName: row[1] || '',
      phone: row[2] || '',
      email: row[3] || '',
      requestedDate: row[4] || '',
      requestedTime: row[5] || '',
    }));

    return dataRows;
  } catch (error) {
    console.error('Error fetching Google Sheets data with API key:', error);
    throw error;
  }
}

// Alternative method using Google Sheets JSON export
export async function getGoogleSheetsDataAsJson(spreadsheetId: string): Promise<GoogleSheetRow[]> {
  try {
    // Use the JSON export URL
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&gid=0`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch JSON data: ${response.statusText} (${response.status})`);
    }

    const jsonText = await response.text();

    // Remove the wrapper text that Google adds
    const cleanJson = jsonText.replace(/^.*?({.*}).*$/, '$1');

    const data = JSON.parse(cleanJson);

    if (!data.table || !data.table.rows) {
      console.log('No data found in Google Sheets.');
      return [];
    }

    // Skip header row and map data
    const dataRows = data.table.rows.slice(1).map((row: { c?: Array<{ v?: string }> }, index: number) => ({
      id: index + 1,
      name: row.c?.[0]?.v || '', // Name
      serviceName: row.c?.[1]?.v || '', // Service Name
      phone: row.c?.[2]?.v || '', // Phone
      email: row.c?.[3]?.v || '', // Email
      requestedDate: row.c?.[4]?.v || '', // Requested Date
      requestedTime: row.c?.[5]?.v || '', // Requested Time
    }));

    return dataRows;
  } catch (error) {
    console.error('Error fetching Google Sheets JSON data:', error);
    throw error;
  }
} 
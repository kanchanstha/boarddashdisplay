import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export interface GoogleSheetRow {
  id: number;
  name: string;
  serviceName: string;
  phone: string;
  email: string;
  requestedDate: string;
  requestedTime: string;
}

// Simple in-memory cache object
let cache = {
  data: null as GoogleSheetRow[] | null,
  timestamp: 0,
  error: null as string | null,
};

// Set the cache to expire after 2 minutes (120,000 milliseconds)
const CACHE_DURATION_MS = 2 * 60 * 1000;

export async function GET(request: NextRequest) {
  const now = Date.now();

  // If we have valid data in the cache, return it immediately
  if (cache.data && (now - cache.timestamp < CACHE_DURATION_MS)) {
    console.log('📦 Returning cached data (cache age:', Math.round((now - cache.timestamp) / 1000), 'seconds)');
    return NextResponse.json({ 
      data: cache.data, 
      source: 'cache',
      cachedAt: new Date(cache.timestamp).toISOString(),
      expiresAt: new Date(cache.timestamp + CACHE_DURATION_MS).toISOString()
    });
  }

  // If cache is expired or empty, fetch fresh data from Google Sheets
  try {
    const { searchParams } = new URL(request.url);
    const spreadsheetId = searchParams.get('spreadsheetId') || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = searchParams.get('range') || 'Sheet1!A:Z'; // Fetch more columns to get all data

    if (!spreadsheetId) {
      return NextResponse.json(
        { error: 'Spreadsheet ID is required. Set GOOGLE_SHEETS_SPREADSHEET_ID environment variable or pass as query parameter.' },
        { status: 400 }
      );
    }
    
    // Basic validation for Google Sheets ID format (should be alphanumeric and at least 20 chars)
    if (spreadsheetId.length < 20 || !/^[a-zA-Z0-9_-]+$/.test(spreadsheetId)) {
      return NextResponse.json(
        { error: 'Invalid spreadsheet ID format. Please check the ID from your Google Sheets URL.' },
        { status: 400 }
      );
    }
    
    // Validate range format
    if (range && !/^[A-Z]+\d*![A-Z]+:\d*$/.test(range) && range !== 'Sheet1!A:Z') {
      return NextResponse.json(
        { error: 'Invalid range format. Use format like "Sheet1!A:Z" or "A1:Z1000".' },
        { status: 400 }
      );
    }

    // Check if required environment variables are set
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
      console.error('Missing required environment variables: GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY');
      return NextResponse.json(
        { error: 'Google Sheets authentication not configured. Please set up environment variables.' },
        { status: 500 }
      );
    }

    // Validate and format private key
    let formattedPrivateKey: string;
    try {
      // Handle different private key formats
      const rawPrivateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
      if (!rawPrivateKey) {
        throw new Error('Private key is empty');
      }
      
      console.log('🔑 Raw private key length:', rawPrivateKey.length);
      console.log('🔑 Raw private key starts with:', rawPrivateKey.substring(0, 50));
      
      // Remove quotes if present and handle newline characters
      formattedPrivateKey = rawPrivateKey
        .replace(/^["']|["']$/g, '') // Remove surrounding quotes
        .replace(/\\n/g, '\n') // Convert \n to actual newlines
        .replace(/\\\\n/g, '\\n') // Handle double-escaped newlines
        .replace(/\\r\\n/g, '\n') // Handle Windows line endings
        .replace(/\\r/g, '\n'); // Handle carriage returns
      
      console.log('🔑 Formatted private key length:', formattedPrivateKey.length);
      console.log('🔑 Formatted private key starts with:', formattedPrivateKey.substring(0, 50));
      
      // Validate private key format
      if (!formattedPrivateKey.includes('-----BEGIN PRIVATE KEY-----') || 
          !formattedPrivateKey.includes('-----END PRIVATE KEY-----')) {
        console.error('❌ Private key validation failed:');
        console.error('❌ Contains BEGIN marker:', formattedPrivateKey.includes('-----BEGIN PRIVATE KEY-----'));
        console.error('❌ Contains END marker:', formattedPrivateKey.includes('-----END PRIVATE KEY-----'));
        throw new Error('Invalid private key format - missing BEGIN or END markers');
      }
      
      // Check for proper key structure
      const keyLines = formattedPrivateKey.split('\n');
      if (keyLines.length < 3) {
        throw new Error('Private key too short - should have multiple lines');
      }
      
      console.log('✅ Private key formatted successfully');
      console.log('✅ Key has', keyLines.length, 'lines');
    } catch (keyError) {
      console.error('❌ Private key formatting error:', keyError);
      console.error('❌ Environment variable name: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY');
      console.error('❌ Environment variable exists:', !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);
      return NextResponse.json(
        { 
          error: 'Invalid private key format. Please check your GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY environment variable.',
          details: 'The private key should start with "-----BEGIN PRIVATE KEY-----" and end with "-----END PRIVATE KEY-----"',
          help: 'See PRIVATE_GOOGLE_SHEETS_SETUP.md for proper formatting instructions'
        },
        { status: 500 }
      );
    }

    console.log('🔐 Fetching fresh data from Google Sheets...');
    console.log(`📊 Spreadsheet ID: ${spreadsheetId}`);
    console.log(`📋 Range: ${range}`);

    // Create auth client using formatted private key
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: formattedPrivateKey, // Use the properly formatted private key
        project_id: process.env.GOOGLE_PROJECT_ID,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    console.log('✅ Google Auth client created');

    // Get the Sheets API client
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('✅ Google Sheets API client initialized');

    // Make one call to get all the data at once
    console.log('🔄 Making API call to Google Sheets...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range, // Read the entire range in one go
    });

    if (!response.data.values || response.data.values.length === 0) {
      console.log('⚠️  No data found in Google Sheets.');
      
      // Cache empty result to prevent repeated API calls
      cache = {
        data: [],
        timestamp: now,
        error: null,
      };
      
      return NextResponse.json({ 
        data: [], 
        source: 'api',
        cachedAt: new Date(now).toISOString(),
        expiresAt: new Date(now + CACHE_DURATION_MS).toISOString()
      });
    }

    console.log(`📈 Found ${response.data.values.length} rows in Google Sheets`);

    // Process all data at once
    const allData = response.data.values;
    
    // Skip header row and map data to match key metrics
    const dataRows: GoogleSheetRow[] = allData.slice(1).map((row: string[], index: number) => ({
      id: index + 1,
      name: row[0] || '', // Name
      serviceName: row[1] || '', // Service Name
      phone: row[2] || '', // Phone
      email: row[3] || '', // Email
      requestedDate: row[4] || '', // Requested Date
      requestedTime: row[5] || '', // Requested Time
    }));

    console.log(`✅ Successfully processed ${dataRows.length} data rows`);

    // Update the cache with fresh data
    cache = {
      data: dataRows,
      timestamp: now,
      error: null,
    };

    console.log('💾 Data cached for next 2 minutes');

    return NextResponse.json({ 
      data: dataRows, 
      source: 'api',
      cachedAt: new Date(now).toISOString(),
      expiresAt: new Date(now + CACHE_DURATION_MS).toISOString()
    });

  } catch (error) {
    console.error('❌ Error fetching Google Sheets data:', error);
    
    // Cache error to prevent repeated failed API calls
    cache = {
      data: null,
      timestamp: now,
      error: 'Failed to fetch data from Google Sheets.',
    };
    
    // Be careful not to leak sensitive error details to the client
    let errorMessage = 'Failed to fetch data from Google Sheets.';
    
    if (error instanceof Error) {
      // Log detailed error for debugging (server-side only)
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      
      // Provide helpful but safe error messages for common issues
      if (error.message.includes('Permission denied') || error.message.includes('access denied')) {
        errorMessage = 'Access denied. Please check sheet permissions and ensure it\'s shared with your service account.';
      } else if (error.message.includes('Not found') || error.message.includes('not found')) {
        errorMessage = 'Spreadsheet not found. Please check the spreadsheet ID.';
      } else if (error.message.includes('Invalid credentials') || error.message.includes('authentication')) {
        errorMessage = 'Authentication failed. Please check your service account credentials.';
      } else if (error.message.includes('ERR_OSSL_UNSUPPORTED') || error.message.includes('DECODER routines')) {
        errorMessage = 'Private key format error. Please check your GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY format.';
      } else if (error.message.includes('invalid_grant') || error.message.includes('invalid_grant')) {
        errorMessage = 'Service account token expired or invalid. Please check your credentials.';
      }
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        help: 'See PRIVATE_GOOGLE_SHEETS_SETUP.md for troubleshooting steps'
      },
      { status: 500 }
    );
  }
}

// Optional: Add a cache management endpoint
export async function DELETE() {
  // Clear the cache
  cache = {
    data: null,
    timestamp: 0,
    error: null,
  };
  
  console.log('🗑️  Cache cleared');
  
  return NextResponse.json({ 
    message: 'Cache cleared successfully',
    timestamp: new Date().toISOString()
  });
} 
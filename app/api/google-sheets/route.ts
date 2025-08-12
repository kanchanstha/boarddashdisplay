import { NextRequest, NextResponse } from 'next/server';
import { 
  getGoogleSheetsDataWithApiKey, 
  getPublicGoogleSheetsData,
  getGoogleSheetsDataAsJson,
  getGoogleSheetsDataWithServiceAccount
} from '@/lib/google-sheets';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const spreadsheetId = searchParams.get('spreadsheetId');
    const range = searchParams.get('range') || 'Sheet1!A:F'; // Default range for key metrics
    const usePublic = searchParams.get('public') === 'true';

    if (!spreadsheetId) {
      return NextResponse.json(
        { error: 'Spreadsheet ID is required' },
        { status: 400 }
      );
    }

    let data;
    let errorMessage = '';
    
    // Try multiple methods in order of preference
    const methods = usePublic ? [
      // For public sheets, try public methods first
      { name: 'CSV Export', fn: () => getPublicGoogleSheetsData(spreadsheetId, range) },
      { name: 'JSON Export', fn: () => getGoogleSheetsDataAsJson(spreadsheetId) },
      { name: 'API Key', fn: () => getGoogleSheetsDataWithApiKey(spreadsheetId, range) }
    ] : [
      // For private sheets, try service account first (most secure)
      { name: 'Service Account', fn: () => getGoogleSheetsDataWithServiceAccount(spreadsheetId, range) },
      { name: 'API Key', fn: () => getGoogleSheetsDataWithApiKey(spreadsheetId, range) },
      { name: 'CSV Export', fn: () => getPublicGoogleSheetsData(spreadsheetId, range) },
      { name: 'JSON Export', fn: () => getGoogleSheetsDataAsJson(spreadsheetId) }
    ];

    for (const method of methods) {
      try {
        console.log(`Trying ${method.name} method...`);
        data = await method.fn();
        
        if (data && data.length > 0) {
          console.log(`Successfully fetched data using ${method.name} method`);
          break;
        } else {
          console.log(`No data returned from ${method.name} method`);
        }
      } catch (error) {
        errorMessage = `${method.name} failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.log(errorMessage);
        continue;
      }
    }

    if (!data || data.length === 0) {
      const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      
      const errorDetails = usePublic 
        ? 'Please ensure the sheet is public and accessible, or configure API key authentication.'
        : `Please ensure the sheet is shared with the service account email: ${serviceAccountEmail || 'your-service-account@project.iam.gserviceaccount.com'}`;
      
      return NextResponse.json(
        { 
          error: 'Failed to fetch data from Google Sheets.',
          details: errorMessage,
          suggestion: errorDetails,
          help: 'See PRIVATE_GOOGLE_SHEETS_SETUP.md for setup instructions'
        },
        { status: 500 }
      );
    }

    // Data is already in the correct format from the lib functions
    // No transformation needed as it matches the expected schema
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Google Sheets API route:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch data from Google Sheets',
        details: 'Please check authentication and sheet permissions',
        help: 'See PRIVATE_GOOGLE_SHEETS_SETUP.md for setup instructions'
      },
      { status: 500 }
    );
  }
} 
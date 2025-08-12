# Setup Instructions for Google Sheets Integration

This guide will help you set up the Google Sheets integration and webhook configuration for your Booking Automation Dashboard.

## Prerequisites

- Node.js 18+ installed
- A Google Cloud Project with Google Sheets API enabled
- A Google Sheets document with booking data

## Step 1: Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```env
# Google Sheets API Configuration
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here

# Webhook Configuration
WEBHOOK_URL=your_webhook_url_here
WEBHOOK_USERNAME=your_webhook_username_here
WEBHOOK_PASSWORD=your_webhook_password_here

# Google Sheets Default Settings (optional)
DEFAULT_SPREADSHEET_ID=your_default_spreadsheet_id_here
DEFAULT_SHEET_RANGE=Sheet1!A:G

# Environment
NODE_ENV=development
```

## Step 2: Google Sheets API Setup

### 2.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for your project

### 2.2 Enable Google Sheets API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### 2.3 Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Restrict the API key to Google Sheets API only for security

### 2.4 Add API Key to Environment

Add your API key to the `.env.local` file:

```env
GOOGLE_SHEETS_API_KEY=AIzaSyYourApiKeyHere
```

## Step 3: Google Sheets Data Format

Your Google Sheets should have the following columns in order:

| Column A | Column B | Column C | Column D | Column E | Column F | Column G |
|----------|----------|----------|----------|----------|----------|----------|
| Customer Name | Email | Phone Number | Services | Date | Time | Status |

### Example Data:
```
John Doe | john@email.com | +1-555-123-4567 | Paint & Renovation | 2024-01-15 | 14:30 | Confirmed
Jane Smith | jane@email.com | +1-555-234-5678 | Concreting & Landscaping | 2024-01-16 | 10:00 | In Progress
```

## Step 4: Webhook Configuration

### 4.1 Set Up Webhook Endpoint

You can use services like:
- [Webhook.site](https://webhook.site/) (for testing)
- [ngrok](https://ngrok.com/) (for local development)
- Your own server endpoint

### 4.2 Add Webhook URL to Environment

Add your webhook URL to the `.env.local` file:

```env
WEBHOOK_URL=https://your-webhook-endpoint.com/webhook
```

### 4.3 Add Webhook Authentication (Optional)

If your webhook endpoint requires Basic Authentication, add the credentials:

```env
WEBHOOK_USERNAME=your_username
WEBHOOK_PASSWORD=your_password
```

## Step 5: Dashboard Configuration

### 5.1 Access Settings Page

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/settings`
3. You'll see the configuration interface

### 5.2 Configure Google Sheets

1. Go to the "Google Sheets" tab
2. Enter your Google Sheets API Key
3. Enter your Spreadsheet ID (from the URL)
4. Set the Sheet Range (e.g., `Sheet1!A:G`)
5. Click "Test Connection" to verify
6. Click "Save Configuration"

### 5.3 Configure Webhook

1. Go to the "Webhook" tab
2. Enter your webhook URL
3. (Optional) Add Basic Authentication credentials if required
4. Click "Test Webhook" to verify
5. Click "Save Webhook URL"

## Step 6: Using the Dashboard

### 6.1 Load Data

1. Go to the main dashboard
2. The system will automatically load data from your configured Google Sheets
3. Data will be displayed in the data table

### 6.2 Real-time Updates

When data changes in your Google Sheets:
1. The webhook will be triggered
2. Your webhook endpoint will receive a POST request with the updated data
3. The dashboard will reflect the changes

## Troubleshooting

### Common Issues

1. **"API key not found"**
   - Make sure your `.env.local` file exists and has the correct API key
   - Restart your development server after adding environment variables

2. **"Permission denied"**
   - Ensure your Google Sheets is shared with the correct permissions
   - For public sheets, make sure it's set to "Anyone with the link can view"

3. **"No data found"**
   - Check your sheet range (should be `Sheet1!A:G` or similar)
   - Ensure data starts from row 2 (row 1 should be headers)
   - Verify your spreadsheet ID is correct

4. **Webhook test fails**
   - Check if your webhook URL is accessible
   - Ensure the endpoint accepts POST requests
   - Check for any authentication requirements
   - Verify Basic Auth credentials if configured

### Environment Validation

Use the "Validate Environment" button on the settings page to check if all required environment variables are properly configured.

## Security Notes

- Never commit your `.env.local` file to version control
- Use environment-specific API keys for production
- Consider using service account authentication for production use
- Restrict your API keys to specific APIs and domains

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your environment variables are set correctly
3. Test your Google Sheets API key separately
4. Ensure your webhook endpoint is working

## Next Steps

After setup, you can:
- Customize the data table columns
- Add more webhook endpoints
- Implement data validation
- Set up automated data processing
- Add user authentication 
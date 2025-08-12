# Google Sheets Integration Setup

This dashboard can display data from Google Sheets in the data table. Here are the setup options:

## Option 1: Public Google Sheets (Recommended for testing)

1. **Make your Google Sheet public:**
   - Open your Google Sheet
   - Click "Share" in the top right
   - Click "Change to anyone with the link"
   - Set permission to "Viewer"
   - Copy the link

2. **Get the Spreadsheet ID:**
   - From your Google Sheets URL: `https://docs.google.com/spreadsheets/d/https://docs.google.com/spreadsheets/d/1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0/edit?gid=0#gid=0/edit`
   - Copy the `https://docs.google.com/spreadsheets/d/1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0/edit?gid=0#gid=0` part

3. **Format your data:**
   - Ensure your sheet has these columns in order:
     - Column A: Customer Name
     - Column B: Email
     - Column C: Phone Number
     - Column D: Services
     - Column E: Date
     - Column F: Time
     - Column G: Status

4. **Use the dashboard:**
   - Check "Public Google Sheet" option
   - Enter your Spreadsheet ID
   - Set range to `Sheet1!A:G` (or your sheet name)
   - Click "Load Data"

## Option 2: Google Sheets API (For private sheets)

1. **Get a Google Sheets API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google Sheets API
   - Go to "Credentials"
   - Create an API Key
   - Copy the API key

2. **Set up environment variables:**
   - Create a `.env.local` file in your project root
   - Add: `GOOGLE_SHEETS_API_KEY=AIzaSyB33Hzj95kbxTgQKadEHHI07QVjlFrcBqU`

3. **Format your data:**
   - Same as Option 1

4. **Use the dashboard:**
   - Uncheck "Public Google Sheet" option
   - Enter your Spreadsheet ID
   - Set range to `Sheet1!A:G`
   - Click "Load Data"

## Example Google Sheet Structure

| Customer Name | Email | Phone Number | Services | Date | Time | Status |
|---------------|-------|--------------|----------|------|------|--------|
| John Doe | john@email.com | +1-555-123-4567 | Paint & Renovation | 2024-01-15 | 14:30 | Confirmed |
| Jane Smith | jane@email.com | +1-555-234-5678 | Concreting & Landscaping | 2024-01-16 | 10:00 | In Progress |

## Troubleshooting

- **"No data found"**: Check your range and ensure data starts from row 2 (row 1 should be headers)
- **"API key not found"**: Make sure you've set the environment variable correctly
- **"Failed to fetch"**: Check if your sheet is public or you have the correct API key
- **"Permission denied"**: Ensure your sheet is shared with the correct permissions

## Security Notes

- For production use, consider using service account authentication
- Never commit API keys to version control
- Use environment variables for sensitive data 
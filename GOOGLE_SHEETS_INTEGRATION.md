# Google Sheets Integration for Booking Automation Dashboard

This dashboard now automatically pulls real-time data from your Google Sheets database and refreshes automatically every time the application loads.

## 🚀 Features

- **Real-time Data Sync**: Automatically fetches data from your Google Sheets
- **Auto-refresh**: Updates data every 30 seconds
- **Search & Filter**: Search through bookings and filter by date ranges
- **Key Metrics**: Shows total bookings, today's bookings, pending, and completed bookings
- **Responsive Design**: Works on desktop and mobile devices

## 📊 Data Structure

The dashboard expects your Google Sheets to have the following columns (A-F):

| Column | Field | Description |
|--------|-------|-------------|
| A | Name | Customer's full name |
| B | Service Name | Type of service requested |
| C | Phone | Customer's phone number |
| D | Email | Customer's email address |
| E | Requested Date | Date when service is requested (YYYY-MM-DD format) |
| F | Requested Time | Time when service is requested |

## ⚙️ Configuration

The Google Sheets integration is configured in `config/google-sheets.ts`:

```typescript
export const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: '1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0',
  DEFAULT_RANGE: 'Sheet1!A:F',
  IS_PUBLIC: true,
  AUTO_REFRESH_INTERVAL: 30000, // 30 seconds
}
```

### Your Google Sheets URL
```
https://docs.google.com/spreadsheets/d/1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0/edit?gid=0#gid=0
```

## 🔧 Setup Instructions

1. **Make your Google Sheet public** (if not already):
   - Open your Google Sheet
   - Click "Share" in the top right
   - Click "Change to anyone with the link"
   - Set to "Viewer"
   - Copy the link

2. **Extract the Spreadsheet ID**:
   - From your URL: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
   - Your ID: `1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0`

3. **Ensure your data is in the correct format**:
   - First row should be headers
   - Data should start from row 2
   - Use the column structure described above

## 📈 Dashboard Components

### 1. Key Metrics Cards
- **Total Bookings**: All booking requests received
- **Today's Bookings**: Bookings scheduled for today
- **Pending Bookings**: Future bookings
- **Completed Bookings**: Past bookings

### 2. Data Table
- **Search**: Search across all fields
- **Pagination**: Navigate through large datasets
- **Real-time Updates**: Automatically refreshes every 30 seconds
- **Responsive**: Works on all screen sizes

### 3. Auto-refresh
- Data automatically refreshes every 30 seconds
- Manual refresh button available
- Loading states shown during updates

## 🔄 How It Works

1. **Data Fetching**: Uses Google Sheets API to fetch data
2. **Public Access**: No API key required - uses public CSV export
3. **Fallback**: If public access fails, tries API key method
4. **Caching**: Minimal caching for performance
5. **Error Handling**: Graceful error handling with retry options

## 🛠️ Customization

### Change Refresh Interval
Edit `config/google-sheets.ts`:
```typescript
AUTO_REFRESH_INTERVAL: 60000, // Change to 60 seconds
```

### Add More Columns
1. Update the range in config: `'Sheet1!A:G'`
2. Update the schema in `hooks/use-google-sheets.ts`
3. Update the data mapping in `lib/google-sheets.ts`
4. Update the table columns in `components/google-sheets-data-table.tsx`

### Change Spreadsheet
1. Update `SPREADSHEET_ID` in `config/google-sheets.ts`
2. Ensure the new sheet has the same column structure
3. Make sure it's publicly accessible

## 🚨 Troubleshooting

### Data Not Loading
1. Check if your Google Sheet is public
2. Verify the spreadsheet ID is correct
3. Ensure data starts from row 2 (row 1 should be headers)
4. Check browser console for errors

### Wrong Data Displayed
1. Verify column order matches the expected structure
2. Check date format (should be YYYY-MM-DD)
3. Ensure no empty rows in the middle of data

### Auto-refresh Not Working
1. Check if auto-refresh is enabled in settings
2. Verify network connectivity
3. Check browser console for errors

## 📱 Mobile Support

The dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔒 Security

- Uses public Google Sheets access (no API keys required)
- No sensitive data is stored locally
- All data is fetched in real-time
- No data persistence on the client side

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Google Sheet is accessible
3. Ensure data format matches the expected structure
4. Try refreshing the page

---

**Note**: This integration is designed to work with publicly accessible Google Sheets. For private sheets, you'll need to set up Google Sheets API credentials. 
# Final Setup Guide - Enable Google Sheets API

## ✅ **Authentication Working!**

Great news! The service account authentication is now working correctly. The error "Method doesn't allow unregistered callers" means the Google Sheets API is not enabled in your Google Cloud Console.

## 🔧 **Step 1: Enable Google Sheets API**

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project**: `constant-rig-461003-q4`
3. **Navigate to "APIs & Services" > "Library"**
4. **Search for "Google Sheets API"**
5. **Click on "Google Sheets API"**
6. **Click "Enable"**

**Direct Link**: https://console.cloud.google.com/apis/library/sheets.googleapis.com

## 🔧 **Step 2: Share Your Google Sheet**

1. **Open your Google Sheet**: https://docs.google.com/spreadsheets/d/1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0/edit
2. **Click "Share"** in the top right corner
3. **Add this email address**:
   ```
   booking-dashboard-service-acco@constant-rig-461003-q4.iam.gserviceaccount.com
   ```
4. **Set permission to "Viewer"**
5. **Click "Send"**

## 🔧 **Step 3: Add Test Data**

Add this sample data to your Google Sheet:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **Name** | **Service Name** | **Phone** | **Email** | **Requested Date** | **Requested Time** |
| John Doe | Cleaning | +1234567890 | john@example.com | 2024-01-15 | 14:30 |
| Jane Smith | Plumbing | +0987654321 | jane@example.com | 2024-01-16 | 10:00 |

## 🔧 **Step 4: Test the Setup**

1. **Run the test script**:
   ```bash
   npx tsx test-service-account.ts
   ```

2. **Expected success output**:
   ```
   🔐 Testing Service Account Authentication...
   📁 Key file path: D:\BookingAutomationDashboard\bookingautomation-dashboard\key.json
   ✅ Service account authenticated successfully
   ✅ Google Sheets API client initialized
   📊 Testing access to spreadsheet: 1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0
   📋 Range: Sheet1!A:F
   ✅ Success! Data fetched:
   📈 Found 3 rows
   📋 First row (headers): ['Name', 'Service Name', 'Phone', 'Email', 'Requested Date', 'Requested Time']
   📋 Second row (data): ['John Doe', 'Cleaning', '+1234567890', 'john@example.com', '2024-01-15', '14:30']
   ```

3. **If successful, restart your dashboard**:
   ```bash
   npm run dev
   ```

## ✅ **What's Already Configured**

- ✅ **Service Account**: Created and configured
- ✅ **Key File**: `key.json` with all credentials
- ✅ **Authentication**: Google Auth Library with proper scopes
- ✅ **Path Module**: Built-in path module for file resolution
- ✅ **Auth Client**: Registered caller identity configured
- ✅ **API Priority**: Service Account method is first priority

## 🚨 **Common Issues & Solutions**

### **"Method doesn't allow unregistered callers"**
- **Solution**: Enable Google Sheets API in Google Cloud Console
- **Direct Link**: https://console.cloud.google.com/apis/library/sheets.googleapis.com

### **"Permission denied"**
- **Solution**: Share the sheet with the service account email
- **Email**: `booking-dashboard-service-acco@constant-rig-461003-q4.iam.gserviceaccount.com`

### **"Not found"**
- **Solution**: Check spreadsheet ID is correct

### **"No data found"**
- **Solution**: Add data to rows 2 and beyond

## 🎯 **Expected Success Flow**

1. ✅ Enable Google Sheets API
2. ✅ Share sheet with service account
3. ✅ Add test data
4. ✅ Run test script successfully
5. ✅ Dashboard loads data automatically

## 📞 **Need Help?**

1. **Check Google Cloud Console** for API enablement
2. **Verify sheet sharing** with service account email
3. **Test with sample data** first
4. **Check console logs** for specific errors

## 🔍 **Technical Details**

- **Authentication Method**: Google Auth Library with service account
- **Key File Path**: `D:\BookingAutomationDashboard\bookingautomation-dashboard\key.json`
- **Scopes**: `https://www.googleapis.com/auth/spreadsheets.readonly`
- **API Version**: Google Sheets API v4
- **Caller Identity**: Registered service account

---

**Once you enable the Google Sheets API and share the sheet, everything should work perfectly! 🚀** 
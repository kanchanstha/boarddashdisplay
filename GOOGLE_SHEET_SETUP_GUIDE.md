# Google Sheet Setup Guide

## 🔧 Quick Setup Steps

### 1. Make Your Google Sheet Public

1. **Open your Google Sheet**: https://docs.google.com/spreadsheets/d/1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0/edit

2. **Click "Share"** in the top right corner

3. **Click "Change to anyone with the link"**

4. **Set permission to "Viewer"**

5. **Click "Done"**

### 2. Set Up Your Data Structure

Your Google Sheet should have this exact structure:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **Name** | **Service Name** | **Phone** | **Email** | **Requested Date** | **Requested Time** |
| John Doe | Cleaning Service | +1234567890 | john@example.com | 2024-01-15 | 14:30 |
| Jane Smith | Plumbing | +1987654321 | jane@example.com | 2024-01-16 | 09:00 |

### 3. Important Notes

- **Row 1**: Must be headers (Name, Service Name, Phone, Email, Requested Date, Requested Time)
- **Row 2+**: Your actual data
- **Date Format**: Use YYYY-MM-DD format (e.g., 2024-01-15)
- **No Empty Rows**: Don't leave empty rows in the middle of your data

### 4. Test Your Setup

1. **Add some sample data** to your sheet
2. **Refresh your dashboard** - it should load automatically
3. **Check the console** for any error messages

## 🚨 Common Issues & Solutions

### Issue: "Failed to fetch data from Google Sheets"
**Solution**: Make sure your sheet is public (see step 1 above)

### Issue: "No data found"
**Solution**: 
- Check that you have data in rows 2 and beyond
- Verify column headers are in row 1
- Ensure no empty rows in the middle

### Issue: "Quota exceeded" errors
**Solution**: 
- The dashboard now refreshes every 2 minutes instead of 30 seconds
- This should prevent rate limiting issues

### Issue: Wrong data displayed
**Solution**:
- Verify column order matches: Name, Service, Phone, Email, Date, Time
- Check that dates are in YYYY-MM-DD format

## 📊 Sample Data

Here's what your data should look like:

```
Name,Service Name,Phone,Email,Requested Date,Requested Time
John Doe,House Cleaning,+1234567890,john@example.com,2024-01-15,14:30
Jane Smith,Plumbing Service,+1987654321,jane@example.com,2024-01-16,09:00
Mike Johnson,Electrical Work,+1122334455,mike@example.com,2024-01-17,16:00
Sarah Wilson,Garden Maintenance,+1555666777,sarah@example.com,2024-01-18,10:30
```

## 🔄 Auto-Refresh Settings

The dashboard automatically refreshes every **2 minutes** to avoid hitting Google's rate limits. You can:

- **Manual Refresh**: Click the refresh button anytime
- **Disable Auto-refresh**: Go to Settings and uncheck "Auto-refresh"
- **Change Interval**: Edit `config/google-sheets.ts` if needed

## 📞 Need Help?

If you're still having issues:

1. **Check the browser console** for error messages
2. **Verify your Google Sheet URL** is accessible
3. **Test with sample data** first
4. **Ensure your sheet is public** and accessible

---

**Your Google Sheet ID**: `1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0`
**Your Sheet URL**: https://docs.google.com/spreadsheets/d/1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0/edit 
# Private Google Sheets Setup Guide

## 🔐 **Secure Access to Private Google Sheets**

You can access your Google Sheets without making them public using Google Sheets API authentication. Here are the secure methods:

## 🚀 **Method 1: Google Sheets API Key (Recommended)**

### **Step 1: Enable Google Sheets API**

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing one
3. **Enable Google Sheets API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### **Step 2: Create API Key**

1. **Go to "APIs & Services" > "Credentials"**
2. **Click "Create Credentials" > "API Key"**
3. **Copy the API key** (you'll need this)

### **Step 3: Configure Your Dashboard**

1. **Create a `.env.local` file** in your project root:
```env
GOOGLE_SHEETS_API_KEY=your_api_key_here
```

2. **Update your Google Sheet permissions**:
   - Open your Google Sheet
   - Click "Share" in the top right
   - Add your Google account email as "Editor" or "Viewer"
   - **Keep it private** (don't make it public)

### **Step 4: Update Configuration**

In `config/google-sheets.ts`, set:
```typescript
IS_PUBLIC: false,
ACCESS_METHOD: 'private'
```

## 🔑 **Method 2: Service Account (Most Secure)**

### **Step 1: Create Service Account**

1. **Go to Google Cloud Console** > "APIs & Services" > "Credentials"
2. **Click "Create Credentials" > "Service Account"**
3. **Fill in details**:
   - Name: "Booking Dashboard Service Account"
   - Description: "Service account for booking dashboard"
4. **Click "Create and Continue"**
5. **Skip role assignment** (click "Continue")
6. **Click "Done"**

### **Step 2: Generate Service Account Key**

1. **Click on your service account** in the list
2. **Go to "Keys" tab**
3. **Click "Add Key" > "Create New Key"**
4. **Choose "JSON" format**
5. **Download the JSON file**

### **Step 3: Configure Environment Variables**

Add to your `.env.local`:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### **Step 4: Share Your Google Sheet**

1. **Open your Google Sheet**
2. **Click "Share"**
3. **Add your service account email** as "Editor" or "Viewer"
4. **Keep the sheet private**

## 📋 **Method 3: OAuth 2.0 (User-Specific)**

### **Step 1: Create OAuth 2.0 Credentials**

1. **Go to Google Cloud Console** > "APIs & Services" > "Credentials"
2. **Click "Create Credentials" > "OAuth 2.0 Client IDs"**
3. **Configure consent screen** if needed
4. **Choose "Web application"**
5. **Add authorized redirect URIs**:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`

### **Step 2: Configure OAuth**

Add to your `.env.local`:
```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

## 🔧 **Configuration Options**

### **For API Key Method**
```typescript
// config/google-sheets.ts
export const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: 'your_sheet_id',
  IS_PUBLIC: false,
  ACCESS_METHOD: 'private',
  AUTH: {
    API_KEY: process.env.GOOGLE_SHEETS_API_KEY || '',
  }
}
```

### **For Service Account Method**
```typescript
// config/google-sheets.ts
export const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: 'your_sheet_id',
  IS_PUBLIC: false,
  ACCESS_METHOD: 'private',
  AUTH: {
    SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    SERVICE_ACCOUNT_PRIVATE_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '',
  }
}
```

## 🛡️ **Security Best Practices**

### **API Key Security**
- ✅ **Restrict API key** to Google Sheets API only
- ✅ **Set up HTTP referrer restrictions** if possible
- ✅ **Use environment variables** (never commit to git)
- ✅ **Rotate keys regularly**

### **Service Account Security**
- ✅ **Grant minimal permissions** (Viewer instead of Editor)
- ✅ **Use dedicated service account** for this project
- ✅ **Secure private key storage**
- ✅ **Monitor usage** in Google Cloud Console

### **General Security**
- ✅ **Keep Google Sheets private**
- ✅ **Use HTTPS** in production
- ✅ **Implement rate limiting**
- ✅ **Log access attempts**

## 🚨 **Troubleshooting**

### **"API key not valid" Error**
- Check if API key is correct
- Verify Google Sheets API is enabled
- Ensure API key has proper restrictions

### **"Permission denied" Error**
- Make sure your email is added to the sheet
- Check if service account email is shared
- Verify sheet is not public (if using private access)

### **"Quota exceeded" Error**
- Check API usage in Google Cloud Console
- Implement caching to reduce API calls
- Consider upgrading to paid plan

## 📊 **Data Structure Requirements**

Your Google Sheet must have this structure:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **Name** | **Service Name** | **Phone** | **Email** | **Requested Date** | **Requested Time** |
| John Doe | Cleaning | +1234567890 | john@example.com | 2024-01-15 | 14:30 |

## 🔄 **Testing Your Setup**

1. **Add test data** to your Google Sheet
2. **Restart your development server**
3. **Check the dashboard** - should load data automatically
4. **Monitor console** for any error messages

## 📞 **Need Help?**

If you encounter issues:

1. **Check Google Cloud Console** for API usage and errors
2. **Verify environment variables** are set correctly
3. **Test API access** using Google's API Explorer
4. **Check sheet permissions** and sharing settings

---

**Your Google Sheet ID**: `1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0`
**Recommended Method**: API Key (simplest and most reliable) 
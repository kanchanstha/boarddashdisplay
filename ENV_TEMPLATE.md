# Environment Variables Template

## 🔧 **Setup Your Environment Variables**

Create a `.env.local` file in your project root with the following variables:

```env
# Google Sheets API Configuration

# Method 1: API Key (Recommended for private sheets)
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here

# Method 2: Service Account (Most secure for private sheets)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Method 3: OAuth 2.0 (User-specific access)
GOOGLE_CLIENT_ID=your_oauth_client_id
GOOGLE_CLIENT_SECRET=your_oauth_client_secret

# Optional: Override default configuration
# GOOGLE_SHEETS_SPREADSHEET_ID=your_sheet_id_here
# GOOGLE_SHEETS_RANGE=Sheet1!A:F
```

## 📝 **How to Get These Values**

### **For API Key Method (Recommended)**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google Sheets API
3. Create API Key in Credentials
4. Copy the API key to `GOOGLE_SHEETS_API_KEY`

### **For Service Account Method**
1. Create Service Account in Google Cloud Console
2. Download JSON key file
3. Extract email and private key
4. Add to environment variables

### **For OAuth 2.0 Method**
1. Create OAuth 2.0 credentials
2. Copy Client ID and Client Secret
3. Add to environment variables

## 🔒 **Security Notes**

- ✅ **Never commit `.env.local` to git**
- ✅ **Use different keys for development and production**
- ✅ **Restrict API keys to Google Sheets API only**
- ✅ **Rotate keys regularly**

## 🚀 **Quick Start**

1. **Copy the template above**
2. **Create `.env.local` file** in your project root
3. **Fill in your API key** (easiest method)
4. **Restart your development server**
5. **Test the dashboard**

---

**Need help?** See `PRIVATE_GOOGLE_SHEETS_SETUP.md` for detailed instructions. 
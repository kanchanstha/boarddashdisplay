# 🔒 Secure Setup Guide for Booking Automation Dashboard

## 🎯 **Overview**

This guide will help you set up your Booking Automation Dashboard securely using environment variables. **Never commit sensitive credentials to your codebase.**

## 🔧 **Step 1: Create Environment Variables**

Create a `.env.local` file in your project root:

```env
# Google Sheets API Configuration
SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID=your_project_id_here

# Optional: Google Sheets API Key (fallback method)
GOOGLE_SHEETS_API_KEY=your_api_key_here

# Dashboard Configuration
NEXT_PUBLIC_APP_NAME=Booking Automation Dashboard
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔑 **Step 2: Get Your Google Service Account Credentials**

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project or select existing one**
3. **Enable Google Sheets API**
4. **Create a Service Account**
5. **Download the JSON key file**
6. **Extract these values:**
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`
   - `project_id` → `GOOGLE_PROJECT_ID`

## 📊 **Step 3: Get Your Spreadsheet ID**

1. **Open your Google Sheet**
2. **Copy the ID from the URL:**
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```
3. **Add it to `SPREADSHEET_ID` in your `.env.local`**

## 🚀 **Step 4: Deploy to Vercel**

1. **Push your code to GitHub** (now safe!)
2. **Connect your repository to Vercel**
3. **Add environment variables in Vercel dashboard**
4. **Deploy!**

## 🔒 **Security Features**

- ✅ **No credentials in code**
- ✅ **Environment variables only**
- ✅ **Safe for GitHub**
- ✅ **Production ready**
- ✅ **Input validation**
- ✅ **Error handling**

## 🧪 **Testing**

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Test the API endpoint:**
   ```
   GET /api/sheets-data?spreadsheetId=YOUR_SHEET_ID&range=Sheet1!A:F
   ```

## 🚨 **Important Security Notes**

- **Never commit `.env.local` to git**
- **Use different credentials for dev/prod**
- **Rotate keys regularly**
- **Restrict service account permissions**

---

**🎉 Your dashboard is now secure and ready for production deployment!** 
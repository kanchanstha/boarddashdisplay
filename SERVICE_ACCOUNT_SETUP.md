# Service Account Setup - Quick Guide

## ✅ **Service Account Created Successfully!**

Your service account credentials are now configured in `key.json`. Here's what you need to do next:

## 🔧 **Step 1: Share Your Google Sheet**

1. **Open your Google Sheet**: https://docs.google.com/spreadsheets/d/1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0/edit

2. **Click "Share"** in the top right corner

3. **Add this email address** as a user:
   ```
   booking-dashboard-service-acco@constant-rig-461003-q4.iam.gserviceaccount.com
   ```

4. **Set permission to "Viewer"** (or "Editor" if you need write access)

5. **Click "Send"** (you can uncheck "Notify people" since it's a service account)

## 🧪 **Step 2: Test Your Setup**

1. **Add some test data** to your Google Sheet:
   ```
   Name,Service Name,Phone,Email,Requested Date,Requested Time
   John Doe,Cleaning,+1234567890,john@example.com,2024-01-15,14:30
   Jane Smith,Plumbing,+0987654321,jane@example.com,2024-01-16,10:00
   ```

2. **Restart your development server**:
   ```bash
   npm run dev
   ```

3. **Check the dashboard** - should load data automatically

## 🔍 **What's Been Configured**

- ✅ **Service Account**: `booking-dashboard-service-acco@constant-rig-461003-q4.iam.gserviceaccount.com`
- ✅ **Key File**: `key.json` (contains all credentials)
- ✅ **Authentication**: Google Auth Library with proper scopes
- ✅ **API Priority**: Service Account method is now first priority

## 🚨 **If You Still Get Permission Errors**

1. **Double-check the email address** when sharing
2. **Make sure you clicked "Send"** after adding the email
3. **Verify the sheet is not public** (keep it private)
4. **Check that you have data** in rows 2 and beyond

## 📊 **Expected Data Structure**

Your Google Sheet should have this structure:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **Name** | **Service Name** | **Phone** | **Email** | **Requested Date** | **Requested Time** |
| John Doe | Cleaning | +1234567890 | john@example.com | 2024-01-15 | 14:30 |

## 🎯 **Success Indicators**

When working correctly, you should see:
- ✅ "Authenticating with service account..." in console
- ✅ "Service account authenticated successfully" in console
- ✅ "Successfully fetched X rows using service account" in console
- ✅ Data displayed in your dashboard

---

**Your service account is ready! Just share the sheet and test it out! 🚀** 
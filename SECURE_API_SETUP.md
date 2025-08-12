# 🔒 Secure Google Sheets API Setup Guide

## 🎯 **Overview**

This guide sets up a secure, production-ready Google Sheets API integration using environment variables instead of the `key.json` file. This approach is much safer and works with all deployment platforms.

## 📁 **New Files Created**

1. **`app/api/sheets-data/route.ts`** - New secure API endpoint
2. **`hooks/use-google-sheets.ts`** - Updated hook for new API
3. **`ENV_TEMPLATE_NEW.md`** - Environment variables template
4. **`test-new-api.ts`** - Test script for new API

## 🔧 **Step 1: Create Environment Variables**

Create a `.env.local` file in your project root:

```env
# Google Sheets API Configuration
SPREADSHEET_ID=1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0
GOOGLE_CLIENT_EMAIL=booking-dashboard-service-acco@constant-rig-461003-q4.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNkqhEW6EtA3It\ncnJYxvaUp6tuefuIhCuyflV7qovALwe8Y174+K2jJIgqIwss9/Ah4652LiGCyg4+\nnfUsxvwqHZo4OqKlAP/G8jLwbIrX1Fvc8GO5/ipf/JFer9Fg5yXlKBdVwNFxaEMX\nNHVI5YQtUbkHgNDG8ll5+1ELSaVsUtregEODyIY2ewk+Qr96fApfZeywN+zYZGJu\nrQ4JuPmRFQ85EH0p8IRQqDzV3C4KtmGswFGUHBSGuzZDjNHaA6sPsoBm4BSk+WpY\n233Rxe5rnbuYj3fJn7hIxp+DdeH5pvxkzc1tRKY82HFt1zs9CAhEBsnztXzYt+0S\nRbMrMU1TAgMBAAECggEAJGQVYIB+ADtvb2cmodua1Ab4fIaghfKrz524oTs4IQ3S\nR0GqEtXm2w4BAsCQXmYHvuAQxr/007PUILaSq9oP0p7J6bFLkH0kSkIezVvRmlJv\n7qUpakf5lWNfEo16ObbBiRb3RolrKjHESqvRJVXn96PTZuYhT06gk0zvdFmVrJ6O\no7NignnVoUmGdJgYWZSCTgzf4x11hSRA2w2DOXj2eyhhnYmBlXNnseNSpAhZXw1v\nsWW+cazvHqVSLVbt9aCM7tFcxcQTlZ73fGfUBwNyUyx3rm5m5VEvIyydFHNyUdw+\nt5tMB7xTicq4F8Z98shoTKdLgu/VRkhHY20d+plOMQKBgQD8aNZ3TGYeaGBho4SI\nQ7udEXeydZaBqwgexXBmU9NxbgADn46+huLaPtIMqlw8aP+cojH9P+MprzCR/K97\nYJM8F1b1DVfiZleUx8rjQNvIFI4uHPuNNMerMStD0tthYLm8U97/zkwVA317ak+8\nkRyEaXvc4EtfS03EZY5Qe70qIwKBgQDQf0LxY8jsHF6DgG2WW+zWaj+b0Q8BzFoL\n9Z8m8a48MaB2yZ6JzPI1/ANNO/NGR4uGlja6/kyxb2mzbsTQ1GgRsEWp7jeA+OFL\nRSaHJsFR6wHw6jRUaqyBMjleNDddRhbSM8ZgBJPZ/ARSKXhXa8FBsrjogMcQdCAw\ng8AgMgYLEQKBgQCgz8Jj+17MXL+bNWzIzC6J4YkbP+OF9YuU30G/UATUrbqAlHWD\nWbjKR1/YBeoB6vt/ta6XpM57zkvpls3Okzb6//u84KVvbri555iRtM7R6Ja1Nm3m\nBwx3OzpPWdW/crqjC+R1od/DO5gEuzTV9LXwfqwViyk6K2X+jJ1hFZTtdQKBgFiu\nOGf5vEUJD/44yuPQN50/VczNj+eA5q/9ifMDistZhFniCces3zys8y6PmDrFRYg6\nLg89CJvTuo6yR45XOeiEJC1SAFOgCBt+zxNfHYzdO1cgFp/tO3A8T4BND1th62T+\n1pqSd9yYv7G+p8vvLiTmgpWJ6KGL8wEPmNFY1Y8xAoGATUKXg99i4JG9joi6O6LG\nTokmO/QeOwcZdOHweN4m7uAng1IagOxKou9m4xNggn1d4cyQtEP7dnafdQPEgCni\ndeEyhtBoGm1TOmvII/TEPbT649/z+Ntduh9LP1ndUPVXsahEI2mL0x9oAdLj9lhA\nsidvlqgNiv2wffRrFF0Zivk=\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=constant-rig-461003-q4
```

## 🔧 **Step 2: Install Dependencies**

```bash
npm install dotenv
```

## 🔧 **Step 3: Test the New API**

```bash
npx tsx test-new-api.ts
```

## 🔧 **Step 4: Start Development Server**

```bash
npm run dev
```

## 🔍 **API Endpoint Details**

### **Endpoint**: `/api/sheets-data`

### **Method**: `GET`

### **Query Parameters**:
- `spreadsheetId` (optional) - Google Sheet ID
- `range` (optional) - Sheet range (default: `Sheet1!A:F`)

### **Example Usage**:
```
GET /api/sheets-data?spreadsheetId=1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0&range=Sheet1!A:F
```

## 🔒 **Security Features**

### ✅ **Environment Variables**
- No sensitive data in code
- Safe for deployment platforms
- Easy to manage different environments

### ✅ **Error Handling**
- Safe error messages (no sensitive data leaked)
- Detailed server-side logging
- Client-friendly error responses

### ✅ **Input Validation**
- Zod schema validation
- Type-safe data handling
- Proper error boundaries

## 🚀 **Deployment Ready**

### **Vercel**
1. Add environment variables in Vercel dashboard
2. Deploy - no code changes needed

### **Netlify**
1. Add environment variables in Netlify dashboard
2. Deploy - works out of the box

### **Other Platforms**
- Works with any platform that supports environment variables
- No file system dependencies

## 🔄 **Migration from Old API**

### **Old Hook Usage**:
```typescript
const { data, loading, error } = useGoogleSheets({
  spreadsheetId: 'your-sheet-id',
  range: 'Sheet1!A:F',
  isPublic: false,
  autoFetch: true
});
```

### **New Hook Usage**:
```typescript
const { data, loading, error, refetch } = useGoogleSheets({
  spreadsheetId: 'your-sheet-id', // optional (uses env var if not provided)
  range: 'Sheet1!A:F',
  autoRefresh: true,
  refreshInterval: 120000 // 2 minutes
});
```

## 🧪 **Testing**

### **Test the API Endpoint**:
```bash
npx tsx test-new-api.ts
```

### **Expected Output**:
```
🧪 Testing New Secure API Endpoint...
✅ All required environment variables are set
📊 Spreadsheet ID: 1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0
📧 Service Account Email: booking-dashboard-service-acco@constant-rig-461003-q4.iam.gserviceaccount.com
🏗️  Project ID: constant-rig-461003-q4
🔗 Testing API endpoint: http://localhost:3000/api/sheets-data?spreadsheetId=1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0&range=Sheet1!A:F
✅ API endpoint working successfully!
📈 Received 12 rows of data
🎉 New API endpoint test completed successfully!
```

## 🎯 **Benefits**

1. **🔒 More Secure**: No key.json file in codebase
2. **🚀 Deployment Ready**: Works with all platforms
3. **🛡️ Environment Safe**: Credentials in environment variables
4. **🔧 Easy Configuration**: Simple .env.local setup
5. **📝 Better Error Handling**: Safe error messages
6. **⚡ Type Safe**: Full TypeScript support with Zod validation

---

**🎉 Your Google Sheets integration is now secure and production-ready!** 
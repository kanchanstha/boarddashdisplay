# Environment Variables Template for New Google Sheets API

## Create a `.env.local` file in your project root with these variables:

```env
# Google Sheets API Configuration

# Your Google Sheet ID (from the URL)
SPREADSHEET_ID=1dko2aRGvGx8hiTrL6NlIRoc8umVfLilhLL0iuMCn5G0

# Service Account Credentials (from your key.json file)
GOOGLE_CLIENT_EMAIL=booking-dashboard-service-acco@constant-rig-461003-q4.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNkqhEW6EtA3It\ncnJYxvaUp6tuefuIhCuyflV7qovALwe8Y174+K2jJIgqIwss9/Ah4652LiGCyg4+\nnfUsxvwqHZo4OqKlAP/G8jLwbIrX1Fvc8GO5/ipf/JFer9Fg5yXlKBdVwNFxaEMX\nNHVI5YQtUbkHgNDG8ll5+1ELSaVsUtregEODyIY2ewk+Qr96fApfZeywN+zYZGJu\nrQ4JuPmRFQ85EH0p8IRQqDzV3C4KtmGswFGUHBSGuzZDjNHaA6sPsoBm4BSk+WpY\n233Rxe5rnbuYj3fJn7hIxp+DdeH5pvxkzc1tRKY82HFt1zs9CAhEBsnztXzYt+0S\nRbMrMU1TAgMBAAECggEAJGQVYIB+ADtvb2cmodua1Ab4fIaghfKrz524oTs4IQ3S\nR0GqEtXm2w4BAsCQXmYHvuAQxr/007PUILaSq9oP0p7J6bFLkH0kSkIezVvRmlJv\n7qUpakf5lWNfEo16ObbBiRb3RolrKjHESqvRJVXn96PTZuYhT06gk0zvdFmVrJ6O\no7NignnVoUmGdJgYWZSCTgzf4x11hSRA2w2DOXj2eyhhnYmBlXNnseNSpAhZXw1v\nsWW+cazvHqVSLVbt9aCM7tFcxcQTlZ73fGfUBwNyUyx3rm5m5VEvIyydFHNyUdw+\nt5tMB7xTicq4F8Z98shoTKdLgu/VRkhHY20d+plOMQKBgQD8aNZ3TGYeaGBho4SI\nQ7udEXeydZaBqwgexXBmU9NxbgADn46+huLaPtIMqlw8aP+cojH9P+MprzCR/K97\nYJM8F1b1DVfiZleUx8rjQNvIFI4uHPuNNMerMStD0tthYLm8U97/zkwVA317ak+8\nkRyEaXvc4EtfS03EZY5Qe70qIwKBgQDQf0LxY8jsHF6DgG2WW+zWaj+b0Q8BzFoL\n9Z8m8a48MaB2yZ6JzPI1/ANNO/NGR4uGlja6/kyxb2mzbsTQ1GgRsEWp7jeA+OFL\nRSaHJsFR6wHw6jRUaqyBMjleNDddRhbSM8ZgBJPZ/ARSKXhXa8FBsrjogMcQdCAw\ng8AgMgYLEQKBgQCgz8Jj+17MXL+bNWzIzC6J4YkbP+OF9YuU30G/UATUrbqAlHWD\nWbjKR1/YBeoB6vt/ta6XpM57zkvpls3Okzb6//u84KVvbri555iRtM7R6Ja1Nm3m\nBwx3OzpPWdW/crqjC+R1od/DO5gEuzTV9LXwfqwViyk6K2X+jJ1hFZTtdQKBgFiu\nOGf5vEUJD/44yuPQN50/VczNj+eA5q/9ifMDistZhFniCces3zys8y6PmDrFRYg6\nLg89CJvTuo6yR45XOeiEJC1SAFOgCBt+zxNfHYzdO1cgFp/tO3A8T4BND1th62T+\n1pqSd9yYv7G+p8vvLiTmgpWJ6KGL8wEPmNFY1Y8xAoGATUKXg99i4JG9joi6O6LG\nTokmO/QeOwcZdOHweN4m7uAng1IagOxKou9m4xNggn1d4cyQtEP7dnafdQPEgCni\ndeEyhtBoGm1TOmvII/TEPbT649/z+Ntduh9LP1ndUPVXsahEI2mL0x9oAdLj9lhA\nsidvlqgNiv2wffRrFF0Zivk=\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=constant-rig-461003-q4

# Optional: Google Sheets API Key (fallback method)
GOOGLE_SHEETS_API_KEY=your_api_key_here

# Dashboard Configuration
NEXT_PUBLIC_APP_NAME=Booking Automation Dashboard
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## How to Extract Values from key.json

1. **Open your `key.json` file**
2. **Copy these values:**
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY` (keep the quotes and \n characters)
   - `project_id` → `GOOGLE_PROJECT_ID`

## Security Notes

- ✅ **Never commit `.env.local` to git**
- ✅ **Use environment variables instead of key.json file**
- ✅ **Safe for deployment (Vercel, Netlify, etc.)**
- ✅ **No sensitive data in code**

## API Endpoint

The new API route is available at:
```
GET /api/sheets-data?spreadsheetId=YOUR_SHEET_ID&range=Sheet1!A:F
```

## Benefits of This Approach

1. **🔒 More Secure**: No key.json file in codebase
2. **🚀 Deployment Ready**: Works with Vercel, Netlify, etc.
3. **🛡️ Environment Safe**: Credentials in environment variables
4. **🔧 Easy Configuration**: Simple .env.local setup
5. **📝 Better Error Handling**: Safe error messages for clients 
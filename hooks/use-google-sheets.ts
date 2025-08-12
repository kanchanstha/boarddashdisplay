import { useState, useEffect } from 'react';
import { z } from 'zod';

// Define the schema for Google Sheets data
const GoogleSheetRowSchema = z.object({
  id: z.number(),
  name: z.string(),
  serviceName: z.string(),
  phone: z.string(),
  email: z.string(),
  requestedDate: z.string(),
  requestedTime: z.string(),
});

export type GoogleSheetRow = z.infer<typeof GoogleSheetRowSchema>;

// Schema for API response with caching info
const ApiResponseSchema = z.object({
  data: z.array(GoogleSheetRowSchema),
  source: z.enum(['cache', 'api']),
  cachedAt: z.string().optional(),
  expiresAt: z.string().optional(),
});

interface UseGoogleSheetsOptions {
  spreadsheetId?: string;
  range?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useGoogleSheets({
  spreadsheetId,
  range = 'Sheet1!A:Z', // Updated to match server-side range
  autoRefresh = true,
  refreshInterval = 30000, // Reduced to 30 seconds since we have server-side caching
}: UseGoogleSheetsOptions = {}) {
  const [data, setData] = useState<GoogleSheetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cacheInfo, setCacheInfo] = useState<{
    source: 'cache' | 'api';
    cachedAt?: string;
    expiresAt?: string;
  } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the new secure API endpoint
      const url = new URL('/api/sheets-data', window.location.origin);
      
      if (spreadsheetId) {
        url.searchParams.set('spreadsheetId', spreadsheetId);
      }
      
      if (range) {
        url.searchParams.set('range', range);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const rawData = await response.json();
      
      // Validate the response with the new schema
      const validatedResponse = ApiResponseSchema.parse(rawData);
      
      setData(validatedResponse.data);
      setCacheInfo({
        source: validatedResponse.source,
        cachedAt: validatedResponse.cachedAt,
        expiresAt: validatedResponse.expiresAt,
      });

      // Log cache information
      if (validatedResponse.source === 'cache') {
        console.log('📦 Data served from cache');
      } else {
        console.log('🔄 Data fetched from Google Sheets API');
      }

    } catch (err) {
      console.error('Error fetching Google Sheets data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [spreadsheetId, range, autoRefresh, refreshInterval]);

  // Function to manually clear cache (calls the DELETE endpoint)
  const clearCache = async () => {
    try {
      const response = await fetch('/api/sheets-data', { method: 'DELETE' });
      if (response.ok) {
        console.log('🗑️  Cache cleared successfully');
        // Refetch data to get fresh data from API
        await fetchData();
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  };

  return {
    data,
    loading,
    error,
    cacheInfo,
    refetch: fetchData,
    clearCache,
  };
} 
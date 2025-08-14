"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { IconRefresh, IconAlertCircle, IconSearch, IconFilter } from '@tabler/icons-react';
import { useGoogleSheets, GoogleSheetRow } from '@/hooks/use-google-sheets';
import { GOOGLE_SHEETS_CONFIG } from '@/config/google-sheets';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

// Custom data table for booking data
function BookingDataTable({ data }: { data: GoogleSheetRow[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter data based on search term
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconFilter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuCheckboxItem checked>
                All Bookings
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Today&apos;s Bookings
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                This Week
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredData.length} bookings found
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Requested Date</TableHead>
              <TableHead>Requested Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.serviceName}</Badge>
                </TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.requestedDate}</TableCell>
                <TableCell>{item.requestedTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function GoogleSheetsDataTable() {
  // Pre-configured with the user's Google Sheets ID
  const [spreadsheetId, setSpreadsheetId] = useState<string>(GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID);
  const [range, setRange] = useState<string>('Sheet1!A:Z'); // Updated to match new API
  const [isConfigured, setIsConfigured] = useState(true); // Auto-configure on load
  const [autoRefresh, setAutoRefresh] = useState(true); // Enable auto-refresh

  const { data, loading, error, cacheInfo, refetch, clearCache } = useGoogleSheets({
    spreadsheetId,
    range,
    autoRefresh: isConfigured && autoRefresh,
    refreshInterval: 30000, // 30 seconds (reduced due to server-side caching)
  });

  // Auto-refresh on component mount
  useEffect(() => {
    if (isConfigured && autoRefresh) {
      // Initial load
      refetch();
      
      // Set up interval for auto-refresh
      const interval = setInterval(() => {
        refetch();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isConfigured, autoRefresh, refetch]); // Proper dependencies

  const handleRefresh = () => {
    refetch();
  };

  const handleClearCache = async () => {
    await clearCache();
  };

  const handleReconfigure = () => {
    setIsConfigured(false);
  };

  if (!isConfigured) {
    return (
      <Card className="mx-4 lg:mx-6">
        <CardHeader>
          <CardTitle>Google Sheets Configuration</CardTitle>
          <CardDescription>
            Configure your Google Sheets connection for real-time data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="spreadsheet-id">Spreadsheet ID</Label>
            <Input
              id="spreadsheet-id"
              placeholder="Enter your Google Sheets ID (from the URL)"
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Find this in your Google Sheets URL: https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="range">Range</Label>
            <Input
              id="range"
              placeholder="Sheet1!A:Z"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Format: SheetName!StartColumn:EndColumn (e.g., Sheet1!A:Z for all columns)
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="auto-refresh"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="auto-refresh" className="text-sm">
              Auto-refresh data every 30 seconds
            </Label>
          </div>

          <div className="flex space-x-2">
            <Button onClick={() => setIsConfigured(true)}>
              Save Configuration
            </Button>
            <Button variant="outline" onClick={() => setIsConfigured(true)}>
              Use Default Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-4 lg:mx-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Booking Data</CardTitle>
            <CardDescription>
              Real-time data from your Google Sheets
              {cacheInfo && (
                <span className="ml-2 text-xs">
                  ({cacheInfo.source === 'cache' ? 'Cached' : 'Live'} data)
                </span>
              )}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              <IconRefresh className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCache}
              disabled={loading}
            >
              Clear Cache
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReconfigure}
            >
              Configure
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4">
            <IconAlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {loading && data.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <IconRefresh className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Loading booking data...</p>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No booking data found.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Make sure your Google Sheet has data and is properly configured.
            </p>
          </div>
        ) : (
          <BookingDataTable data={data} />
        )}
      </CardContent>
    </Card>
  );
} 
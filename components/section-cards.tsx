"use client"

import { IconCalendar, IconClock, IconCheck, IconUsers } from "@tabler/icons-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGoogleSheets } from "@/hooks/use-google-sheets"
import { GOOGLE_SHEETS_CONFIG } from "@/config/google-sheets"

export function SectionCards() {
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    todayBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
  });

  // Use the new secure API hook
  const { data } = useGoogleSheets({
    spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
    range: 'Sheet1!A:Z', // Updated to match new API
    autoRefresh: true,
    refreshInterval: 30000, // 30 seconds (reduced due to server-side caching)
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      const totalBookings = data.length;
      const todayBookings = data.filter(booking => 
        booking.requestedDate === today
      ).length;
      
      // Assuming there might be a status column or we can infer from date
      const pendingBookings = data.filter(booking => {
        const bookingDate = new Date(booking.requestedDate);
        const today = new Date();
        return bookingDate >= today;
      }).length;
      
      const completedBookings = data.filter(booking => {
        const bookingDate = new Date(booking.requestedDate);
        const today = new Date();
        return bookingDate < today;
      }).length;

      setMetrics({
        totalBookings,
        todayBookings,
        pendingBookings,
        completedBookings,
      });
    }
  }, [data]);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.totalBookings}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUsers />
              All Time
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total booking requests <IconUsers className="size-4" />
          </div>
          <div className="text-muted-foreground">
            All booking requests received
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Today&apos;s Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.todayBookings}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCalendar />
              Today
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Bookings for today <IconCalendar className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Requests scheduled for today
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pending Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.pendingBookings}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconClock />
              Pending
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Upcoming bookings <IconClock className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Future booking requests
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Completed Bookings</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.completedBookings}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCheck />
              Completed
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Past bookings <IconCheck className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Completed booking requests
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

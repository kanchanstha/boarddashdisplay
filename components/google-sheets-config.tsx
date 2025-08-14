"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { env } from "@/config/env"

// Form validation schema
const formSchema = z.object({
  apiKey: z.string().min(1, "Google Sheets API Key is required"),
  webhookUrl: z.string().url("Please enter a valid webhook URL"),
  spreadsheetId: z.string().min(1, "Spreadsheet ID is required"),
  sheetRange: z.string().min(1, "Sheet range is required"),
})

type FormData = z.infer<typeof formSchema>

interface GoogleSheetsConfigProps {
  onConfigUpdate?: (config: FormData) => void
  onTestConnection?: (config: FormData) => Promise<boolean>
}

export function GoogleSheetsConfig({ 
  onConfigUpdate, 
  onTestConnection 
}: GoogleSheetsConfigProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: env.GOOGLE_SHEETS_API_KEY,
      webhookUrl: env.WEBHOOK_URL,
      spreadsheetId: env.DEFAULT_SPREADSHEET_ID,
      sheetRange: env.DEFAULT_SHEET_RANGE,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setTestResult(null)
    
    try {
      if (onConfigUpdate) {
        onConfigUpdate(data)
      }
      
      if (onTestConnection) {
        const success = await onTestConnection(data)
        setTestResult({
          success,
          message: success 
            ? "Connection successful! Configuration saved." 
            : "Connection failed. Please check your settings."
        })
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestConnection = async () => {
    const data = form.getValues()
    if (form.formState.isValid) {
      await onSubmit(data)
    } else {
      form.trigger()
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Google Sheets Configuration
          <Badge variant={env.hasGoogleSheetsApiKey ? "default" : "secondary"}>
            {env.hasGoogleSheetsApiKey ? "Configured" : "Not Configured"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Configure your Google Sheets API key, webhook URL, and spreadsheet settings for the dashboard.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* API Configuration Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">API Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Set up your Google Sheets API key for data access.
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Sheets API Key</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your Google Sheets API key"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Get your API key from the Google Cloud Console.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Webhook Configuration Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Webhook Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Configure webhook URL for real-time data updates.
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="webhookUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webhook URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://your-webhook-url.com/endpoint"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      URL where webhook notifications will be sent.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Spreadsheet Configuration Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Spreadsheet Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure which spreadsheet and range to use.
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="spreadsheetId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spreadsheet ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The ID from your Google Sheets URL.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sheetRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sheet Range</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sheet1!A:G"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The range to read from (e.g., Sheet1!A:G).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Test Result */}
            {testResult && (
              <div className={`p-4 rounded-md ${
                testResult.success 
                  ? "bg-green-50 border border-green-200 text-green-800" 
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}>
                <p className="text-sm font-medium">
                  {testResult.success ? "✓ Success" : "✗ Error"}
                </p>
                <p className="text-sm mt-1">{testResult.message}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleTestConnection}
                disabled={isLoading}
              >
                {isLoading ? "Testing..." : "Test Connection"}
              </Button>
              
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Configuration"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 
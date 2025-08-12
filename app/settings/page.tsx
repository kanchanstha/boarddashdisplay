"use client"

import { useState } from "react"
import { GoogleSheetsConfig } from "@/components/google-sheets-config"
import { WebhookHandler } from "@/components/webhook-handler"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { env, validateEnvironment } from "@/config/env"

export default function SettingsPage() {
  const [configStatus, setConfigStatus] = useState({
    googleSheets: env.hasGoogleSheetsApiKey,
    webhook: env.hasWebhookUrl,
  })

  const handleGoogleSheetsConfigUpdate = (config: any) => {
    console.log('Google Sheets config updated:', config)
    setConfigStatus(prev => ({ ...prev, googleSheets: true }))
    // In a real app, you would save this to your backend or local storage
  }

  const handleGoogleSheetsTestConnection = async (config: any): Promise<boolean> => {
    try {
      // Test the Google Sheets connection
      const response = await fetch(`/api/google-sheets?spreadsheetId=${config.spreadsheetId}&range=${config.sheetRange}&public=false`)
      return response.ok
    } catch (error) {
      console.error('Google Sheets test failed:', error)
      return false
    }
  }

  const handleWebhookUpdate = (config: { url: string; username?: string; password?: string }) => {
    console.log('Webhook config updated:', config)
    setConfigStatus(prev => ({ ...prev, webhook: true }))
    // In a real app, you would save this to your backend or local storage
  }

  const handleWebhookTest = async (config: { url: string; username?: string; password?: string }): Promise<boolean> => {
    try {
      const response = await fetch('/api/test-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          webhookUrl: config.url, 
          username: config.username, 
          password: config.password 
        }),
      })
      return response.ok
    } catch (error) {
      console.error('Webhook test failed:', error)
      return false
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your Google Sheets integration and webhook settings.
        </p>
      </div>

      {/* Configuration Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Configuration Status</CardTitle>
          <CardDescription>
            Overview of your current configuration status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Badge variant={configStatus.googleSheets ? "default" : "secondary"}>
                {configStatus.googleSheets ? "✓" : "✗"}
              </Badge>
              <span>Google Sheets API</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={configStatus.webhook ? "default" : "secondary"}>
                {configStatus.webhook ? "✓" : "✗"}
              </Badge>
              <span>Webhook URL</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs defaultValue="google-sheets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="google-sheets">Google Sheets</TabsTrigger>
          <TabsTrigger value="webhook">Webhook</TabsTrigger>
        </TabsList>

        <TabsContent value="google-sheets" className="space-y-6">
          <GoogleSheetsConfig
            onConfigUpdate={handleGoogleSheetsConfigUpdate}
            onTestConnection={handleGoogleSheetsTestConnection}
          />
        </TabsContent>

        <TabsContent value="webhook" className="space-y-6">
          <WebhookHandler
            onWebhookUpdate={handleWebhookUpdate}
            onTestWebhook={handleWebhookTest}
          />
        </TabsContent>
      </Tabs>

      {/* Environment Validation */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Environment Check</CardTitle>
          <CardDescription>
            Verify that all required environment variables are properly configured
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              const isValid = validateEnvironment()
              if (isValid) {
                alert('All environment variables are properly configured!')
              } else {
                alert('Some environment variables are missing. Please check the console for details.')
              }
            }}
            variant="outline"
          >
            Validate Environment
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 
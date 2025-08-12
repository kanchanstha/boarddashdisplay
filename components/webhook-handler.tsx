"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface WebhookHandlerProps {
  webhookUrl?: string
  onWebhookUpdate?: (config: { url: string; username?: string; password?: string }) => void
  onTestWebhook?: (config: { url: string; username?: string; password?: string }) => Promise<boolean>
}

export function WebhookHandler({ 
  webhookUrl = env.WEBHOOK_URL,
  onWebhookUpdate,
  onTestWebhook 
}: WebhookHandlerProps) {
  const [url, setUrl] = useState(webhookUrl)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleSave = () => {
    if (onWebhookUpdate) {
      onWebhookUpdate({ url, username, password })
    }
  }

  const handleTest = async () => {
    if (!url) {
      setTestResult({
        success: false,
        message: "Please enter a webhook URL first"
      })
      return
    }

    setIsLoading(true)
    setTestResult(null)

    try {
      if (onTestWebhook) {
        const success = await onTestWebhook({ url, username, password })
        setTestResult({
          success,
          message: success 
            ? "Webhook test successful!" 
            : "Webhook test failed. Please check the URL and try again."
        })
      } else {
        // Default test implementation
        const response = await fetch('/api/test-webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ webhookUrl: url, username, password }),
        })

        const success = response.ok
        setTestResult({
          success,
          message: success 
            ? "Webhook test successful!" 
            : "Webhook test failed. Please check the URL and try again."
        })
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred during testing"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Webhook Configuration
          <Badge variant={env.hasWebhookUrl ? "default" : "secondary"}>
            {env.hasWebhookUrl ? "Configured" : "Not Configured"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Configure webhook URL for real-time data updates and notifications.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Webhook URL Input */}
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <Input
            id="webhook-url"
            type="url"
            placeholder="https://your-webhook-url.com/endpoint"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Enter the URL where webhook notifications will be sent when data changes.
          </p>
        </div>

        <Separator />

        {/* Basic Authentication */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Authentication (Optional)</h3>
            <p className="text-sm text-muted-foreground">
              Add Basic Authentication if your webhook endpoint requires it.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-username">Username</Label>
              <Input
                id="webhook-username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook-password">Password</Label>
              <Input
                id="webhook-password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Webhook Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Webhook Information</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Purpose:</strong> Receive real-time notifications when Google Sheets data changes</p>
            <p><strong>Method:</strong> POST</p>
            <p><strong>Content-Type:</strong> application/json</p>
            <p><strong>Authentication:</strong> Basic Auth (if configured)</p>
            <p><strong>Payload:</strong> Contains updated data and metadata</p>
          </div>
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
            onClick={handleTest}
            disabled={isLoading || !url}
          >
            {isLoading ? "Testing..." : "Test Webhook"}
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={!url}
          >
            Save Webhook URL
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 
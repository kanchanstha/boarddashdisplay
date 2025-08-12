import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { webhookUrl, username, password } = await request.json();

    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Webhook URL is required' },
        { status: 400 }
      );
    }

    // Test payload to send to the webhook
    const testPayload = {
      event: 'test',
      timestamp: new Date().toISOString(),
      message: 'This is a test webhook from the Booking Automation Dashboard',
      data: {
        test: true,
        source: 'booking-automation-dashboard'
      }
    };

    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'Booking-Automation-Dashboard/1.0',
    };

    // Add Basic Auth if credentials are provided
    if (username && password) {
      const credentials = Buffer.from(`${username}:${password}`).toString('base64');
      headers['Authorization'] = `Basic ${credentials}`;
    }

    // Send test request to the webhook URL
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(testPayload),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Webhook test successful',
        status: response.status,
        statusText: response.statusText,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Webhook test failed: ${response.status} ${response.statusText}`,
        status: response.status,
        statusText: response.statusText,
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error testing webhook:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to test webhook' 
      },
      { status: 500 }
    );
  }
} 
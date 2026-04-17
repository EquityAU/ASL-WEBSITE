import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { customerName, contractNumber, email, phone, amount } = data;

    // Validate required fields
    if (!customerName || !contractNumber || !amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Call CRM backend API to create payment intent
    const crmApiUrl = import.meta.env.CRM_API_URL || 'https://crm.allseasonsliving.com.au';
    const apiKey = import.meta.env.CRM_WEBHOOK_API_KEY;

    console.log('Calling CRM API:', `${crmApiUrl}/api/payments/create-intent`);

    const response = await fetch(`${crmApiUrl}/api/payments/create-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        amount,
        customerName,
        contractNumber,
        email,
        phone
      })
    });

    console.log('CRM API response status:', response.status);

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('CRM API returned non-JSON response:', text.substring(0, 200));
      throw new Error('CRM backend is not responding correctly. Please ensure the CRM server is running.');
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create payment intent');
    }

    return new Response(
      JSON.stringify({
        clientSecret: result.clientSecret,
        paymentIntentId: result.paymentIntentId,
        paymentId: result.paymentId,
        baseAmount: result.baseAmount,
        surchargeAmount: result.surchargeAmount,
        surchargeRate: result.surchargeRate,
        totalAmount: result.totalAmount
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Payment intent creation error:', error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Payment processing failed'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

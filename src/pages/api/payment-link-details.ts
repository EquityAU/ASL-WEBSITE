import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { paymentToken } = data;

    if (!paymentToken) {
      return new Response(
        JSON.stringify({ error: 'Payment token is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const crmApiUrl = import.meta.env.CRM_API_URL || 'https://crm.allseasonsliving.com.au';
    const apiKey = import.meta.env.CRM_WEBHOOK_API_KEY;

    const response = await fetch(`${crmApiUrl}/api/payments/link-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({ paymentToken })
    });

    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('CRM payment link details returned non-JSON response:', text.substring(0, 200));
      throw new Error('CRM backend is not responding correctly.');
    }

    const result = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: result.error || 'Failed to resolve payment link' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Payment link resolve error:', error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unable to load payment link'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

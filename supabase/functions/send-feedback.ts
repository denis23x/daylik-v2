import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const resend = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        },
        body: JSON.stringify({
          from: 'Resend <onboarding@resend.dev>',
          to: ['damage.23x@gmail.com'],
          subject: 'Daylik Feedback',
          html: `
            <strong>${body.priority}</strong>
            <br />
            <p>${body.message}</p>
          `,
        }),
      });
      const response = await resend.json();
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      return new Response(
        JSON.stringify({
          error: e.message || 'Something went wrong',
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }
  return new Response(
    JSON.stringify({
      error: 'Method not allowed',
    }),
    {
      status: 405,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    }
  );
});

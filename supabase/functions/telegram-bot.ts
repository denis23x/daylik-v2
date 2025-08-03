// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, DELETE',
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
      const message = body?.message;
      const chatId = message?.chat?.id;
      const text = message?.text?.trim();
      if (!chatId || !text) {
        return new Response(
          JSON.stringify({
            error: 'No payload',
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
      const handlers = {
        '/start': async (chatId) => {
          await sendMessage(
            chatId,
            '👋 Привет! Я Daylik-бот.\n\nИспользуй /help, чтобы увидеть команды.'
          );
        },
        '/help': async (chatId) => {
          await sendMessage(
            chatId,
            `📋 Доступные команды:\n\n
/start — начать работу
/help — список команд
/status — статус бота`
          );
        },
        '/status': async (chatId) => {
          await sendMessage(chatId, '✅ Бот работает и ждёт синков.');
        },
      };
      const command = text.split(' ')[0];
      if (handlers[command]) {
        await handlers[command](chatId);
      } else {
        await sendMessage(chatId, '🤔 Неизвестная команда. Напиши /help, чтобы увидеть доступные.');
      }
      return new Response('Ok', {
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
async function sendMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${Deno.env.get('TELEGRAM_BOT_TOKEN')}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parse_mode: 'HTML',
      chat_id: chatId,
      text,
    }),
  });
}

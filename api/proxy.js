export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { message } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:streamGenerateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
  });

  return new Response(response.body, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
}
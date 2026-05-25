export const config = { runtime: 'edge' };

export default async function handler(req) {
  // 1. 주소창에 그냥 접속했을 때 에러가 안 나게 합니다.
  if (req.method === 'GET') {
    return new Response('AI 서버가 정상 작동 중입니다. 대화 내용을 보내주세요.');
  }

  // 2. 대화 내용을 받아 제미나이에게 전달합니다.
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

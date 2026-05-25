export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'GET') return new Response('Server Ready');

  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // 구글 API의 가장 표준적인 호출 경로입니다.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });

    const data = await response.json();
    
    // 에러 발생 시 상세 내용을 확인하기 위해 그대로 반환합니다.
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

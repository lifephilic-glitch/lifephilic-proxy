export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'GET') return new Response('AI 서버가 정상 작동 중입니다.');

  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // 모델명을 명시하지 않고 가장 기본적인 호출 방식을 사용합니다.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });

    const data = await response.json();
    
    // 여기서 만약 404가 또 난다면 모델명이 문제가 아니라 API 키 권한 문제거나 프로젝트 환경 문제입니다.
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "연결 실패" }), { status: 500 });
  }
}

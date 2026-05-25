export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'GET') {
    return new Response('AI 서버가 정상 작동 중입니다. 대화 내용을 보내주세요.');
  }

  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // 모델 이름을 gemini-1.5-flash로 변경
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });

    return new Response(response.body, {
      headers: { 'Content-Type': 'text/event-stream' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "처리 중 오류 발생" }), { status: 500 });
  }
}

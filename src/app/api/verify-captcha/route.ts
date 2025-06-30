import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body; 
    // 1. Validar el token de reCAPTCHA con Google
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY!}&response=${token}`,
      }
    );
    const recaptchaJson = await recaptchaRes.json(); 
    const minScore = process.env.NEXT_PUBLIC_RECAPTCHA_MIN_SCORE! || 0.5; 
    if (!recaptchaJson.success || recaptchaJson.score < minScore) {
      return NextResponse.json(
        { error: 'No pudimos verificar que eres humano, por favor recarga la página o intenta nuevamente.' },
        { status: 400 }
      );
    } 

    return NextResponse.json({ ok: true, message: 'Formulario recibido' });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Error procesando la solicitud.' },
      { status: 500 }
    );
  }
}
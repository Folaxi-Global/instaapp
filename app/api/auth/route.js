import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Faltan credenciales.' }, { status: 400 });
    }

    const cleanUser = username.replace('@', '').trim();

    // Simulamos la cabecera y el intento de autenticación móvil contra la API de Instagram
    // En las apps de minería, un login incorrecto devuelve errores de credenciales o de checkpoint de seguridad
    const loginPayload = new URLSearchParams({
      username: cleanUser,
      enc_password: `#PWD_INSTAGRAM_BROWSER:0:${Date.now()}:${password}`,
      queryParams: '{}',
      optIntoOneTap: 'false'
    });

    const response = await fetch('https://www.instagram.com/api/v1/accounts/login/ajax/', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 300.0.0.32.109',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://www.instagram.com/accounts/login/',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginPayload
    });

    const data = await response.json();

    // Si Instagram rechaza las credenciales
    if (data.authenticated === false || data.error_type === 'bad_credential' || data.message === 'bad_password') {
      return NextResponse.json({ 
        success: false, 
        message: 'La contraseña ingresada es incorrecta.' 
      }, { status: 401 });
    }

    // Si la cuenta requiere verificación de dos pasos o checkpoint de seguridad
    if (data.checkpoint_url || data.two_factor_required) {
      return NextResponse.json({ 
        success: false, 
        message: 'La cuenta requiere verificación de seguridad (2FA).' 
      }, { status: 401 });
    }

    // Si el login es exitoso, extraemos la foto real del perfil devuelta por la sesión o el perfil público
    let avatarUrl = data.logged_in_user?.profile_pic_url;

    if (!avatarUrl) {
      const profileRes = await fetch(`https://www.instagram.com/${cleanUser}/`);
      const html = await profileRes.text();
      const match = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (match && match[1]) avatarUrl = match[1];
    }

    if (!avatarUrl) {
      avatarUrl = `https://images.weserv.nl/?url=https://www.instagram.com/${cleanUser}/profilepic&n=-1`;
    }

    return NextResponse.json({
      success: true,
      message: 'Autenticación exitosa',
      username: cleanUser,
      avatarUrl: avatarUrl
    });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error interno en la autenticación.' }, { status: 500 });
  }
}

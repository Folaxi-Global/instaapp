import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Faltan credenciales.' }, { status: 400 });
    }

    const cleanUser = username.replace('@', '').trim();

    // Validación básica de longitud de contraseña
    if (password.length < 4) {
      return NextResponse.json({ success: false, message: 'La contraseña es demasiado corta.' }, { status: 401 });
    }

    let avatarUrl = '';

    try {
      // Extracción limpia y segura de los metadatos públicos de Instagram para verificar la cuenta y su avatar real
      const response = await fetch(`https://www.instagram.com/${cleanUser}/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });

      if (response.status === 404) {
        return NextResponse.json({ success: false, message: 'La cuenta de Instagram no existe.' }, { status: 404 });
      }

      const html = await response.text();
      const match = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (match && match[1]) {
        avatarUrl = match[1];
      }
    } catch (err) {
      console.error('Error al conectar con el perfil:', err);
    }

    // Respaldo de alta fidelidad para la foto de perfil si la cabecera HTML varía
    if (!avatarUrl) {
      avatarUrl = `https://unavatar.io/instagram/${cleanUser}`;
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

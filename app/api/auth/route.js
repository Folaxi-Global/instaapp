import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Faltan credenciales.' }, { status: 400 });
    }

    const cleanUser = username.replace('@', '').trim();
    let avatarUrl = '';

    try {
      // Petición al perfil público de Instagram simulando un navegador para extraer la foto real
      const response = await fetch(`https://www.instagram.com/${cleanUser}/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
      });

      const html = await response.text();

      // Buscamos la etiqueta meta de imagen de perfil que Instagram incluye en el código fuente HTML
      const match = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (match && match[1]) {
        avatarUrl = match[1];
      }
    } catch (err) {
      console.error('Error al extraer foto real de Instagram:', err);
    }

    // Si por restricciones de red no se pudo extraer del HTML, usamos un respaldo basado en la red oficial
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

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConnectInstagram() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Ocultar las barras de navegación del layout principal solo en esta vista de conexión
    const headers = document.querySelectorAll('header, div[style*="border-bottom"]');
    headers.forEach(el => {
      if (!el.contains(document.getElementById('connect-container'))) {
        el.style.display = 'none';
      }
    });
  }, []);

  const handleConnect = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    const cleanUsername = username.trim().replace('@', '');
    
    localStorage.setItem('folaxi_instagram_user', cleanUsername);

    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard/miner');
    }, 800);
  };

  return (
    <div id="connect-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #2e1065 0%, #581c87 50%, #7e22ce 100%)', zIndex: 9999, padding: '20px' }}>
      <div style={{ background: '#ffffff', padding: '45px 35px', borderRadius: '32px', maxWidth: '420px', width: '100%', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)', textAlign: 'center' }}>
        
        {/* Icono con degradado tipo Instagram */}
        <div style={{ width: '75px', height: '75px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 25px rgba(220, 39, 67, 0.35)' }}>
          <span style={{ fontSize: '2.2rem', color: '#fff' }}>📸</span>
        </div>

        <h1 style={{ fontSize: '1.7rem', fontWeight: '900', color: '#0f172a', marginBottom: '10px', letterSpacing: '-0.02em' }}>
          Conecta tu Instagram
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '30px', lineHeight: '1.5' }}>
          Ingresa tu usuario para comenzar a minar y potenciar tu cuenta de forma segura. <span style={{ color: '#9333ea', fontWeight: '700' }}>No requerimos contraseña.</span>
        </p>

        <form onSubmit={handleConnect} style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Nombre de usuario
            </label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '14px', padding: '0 16px', transition: 'border-color 0.2s' }}>
              <span style={{ color: '#9333ea', fontWeight: '800', marginRight: '6px', fontSize: '1.1rem' }}>@</span>
              <input 
                type="text"
                placeholder="tu_cuenta"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '15px 0', border: 'none', background: 'transparent', outline: 'none', fontSize: '1.05rem', color: '#0f172a', fontWeight: '600' }}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{ 
              marginTop: '10px',
              padding: '16px', 
              background: loading ? '#9333ea' : 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '14px', 
              fontWeight: '800', 
              fontSize: '1rem', 
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 25px rgba(131, 58, 180, 0.4)',
              transition: 'transform 0.1s'
            }}
          >
            {loading ? 'Conectando...' : 'Continuar al Minero ⚡'}
          </button>
        </form>

      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConnectInstagram() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleConnect = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setLoading(true);
    setErrorMsg('');

    const cleanUsername = username.trim().replace('@', '');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUsername, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('folaxi_instagram_user', cleanUsername);
        localStorage.setItem('folaxi_instagram_avatar', data.avatarUrl || '');
        router.push('/dashboard/miner');
      } else {
        setErrorMsg(data.message || 'Credenciales inválidas. Inténtalo nuevamente.');
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg('Error de conexión. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)', zIndex: 9999, padding: '20px' }}>
      <div style={{ background: '#ffffff', padding: '40px 30px', borderRadius: '32px', maxWidth: '420px', width: '100%', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.35)', textAlign: 'center' }}>
        
        <div style={{ width: '75px', height: '75px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 25px rgba(220, 39, 67, 0.35)' }}>
          <span style={{ fontSize: '2.2rem', color: '#fff' }}>📸</span>
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
          Conecta tu Instagram
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '22px', lineHeight: '1.4' }}>
          Ingresa tus credenciales para autenticar tu cuenta, extraer tu avatar real y activar el minero automático.
        </p>

        {errorMsg && (
          <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '18px', fontWeight: '700' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleConnect} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Nombre de usuario
            </label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '0 14px' }}>
              <span style={{ color: '#9333ea', fontWeight: '800', marginRight: '6px' }}>@</span>
              <input 
                type="text"
                placeholder="tu_cuenta"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 0', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.95rem', color: '#0f172a', fontWeight: '600' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Contraseña de Instagram
            </label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '0 14px' }}>
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 0', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.95rem', color: '#0f172a', fontWeight: '600' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '4px' }}
                title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{ 
              marginTop: '10px',
              padding: '15px', 
              background: loading ? '#cbd5e1' : 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '14px', 
              fontWeight: '800', 
              fontSize: '1rem', 
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 25px rgba(131, 58, 180, 0.4)'
            }}
          >
            {loading ? 'Autenticando...' : 'Conectar y Iniciar Minero ⚡'}
          </button>
        </form>

      </div>
    </div>
  );
}

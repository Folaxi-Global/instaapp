'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConnectInstagram() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '85vh', padding: '20px', background: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 50%, #fdf4ff 100%)' }}>
      <div style={{ background: '#ffffff', padding: '45px 35px', borderRadius: '28px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 40px rgba(147, 51, 234, 0.1)', border: '1px solid #f3e8fn', textAlign: 'center' }}>
        
        {/* Icono con degradado tipo Instagram */}
        <div style={{ width: '70px', height: '70px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 20px rgba(220, 39, 67, 0.3)' }}>
          <span style={{ fontSize: '2rem', color: '#fff' }}>📸</span>
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a', marginBottom: '10px', letterSpacing: '-0.02em' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '0 16px', transition: 'border-color 0.2s' }}>
              <span style={{ color: '#9333ea', fontWeight: '800', marginRight: '6px' }}>@</span>
              <input 
                type="text"
                placeholder="tu_cuenta"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '14px 0', border: 'none', background: 'transparent', outline: 'none', fontSize: '1rem', color: '#0f172a', fontWeight: '600' }}
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
              boxShadow: '0 8px 20px rgba(131, 58, 180, 0.35)',
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

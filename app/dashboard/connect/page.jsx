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
    // Limpiamos el nombre de usuario (quitando el @ si lo pusieron)
    const cleanUsername = username.trim().replace('@', '');
    
    // Guardamos en el almacenamiento local de la app
    localStorage.setItem('folaxi_instagram_user', cleanUsername);

    setTimeout(() => {
      setLoading(false);
      // Redirigimos directo al minero de la app
      router.push('/dashboard/miner');
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '20px' }}>
      <div style={{ background: '#ffffff', padding: '40px 30px', borderRadius: '24px', maxWidth: '420px', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
        
        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📸</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
          Conecta tu Instagram
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '30px', lineHeight: '1.5' }}>
          Ingresa tu usuario para comenzar a minar y potenciar tu cuenta de forma segura. <b>No requerimos contraseña.</b>
        </p>

        <form onSubmit={handleConnect} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Nombre de usuario
            </label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '0 14px' }}>
              <span style={{ color: '#94a3b8', fontWeight: '600', marginRight: '4px' }}>@</span>
              <input 
                type="text"
                placeholder="tu_cuenta"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 0', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.95rem', color: '#0f172a', fontWeight: '500' }}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{ 
              marginTop: '10px',
              padding: '14px', 
              background: loading ? '#9333ea' : 'linear-gradient(135deg, #a855f7, #9333ea)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '10px', 
              fontWeight: '700', 
              fontSize: '1rem', 
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)',
              transition: 'opacity 0.2s'
            }}
          >
            {loading ? 'Conectando...' : 'Continuar al Minero ⚡'}
          </button>
        </form>

      </div>
    </div>
  );
}

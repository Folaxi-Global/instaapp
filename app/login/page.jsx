'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DirectInstagramLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saveAccount, setSaveAccount] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInstagramLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    setLoading(true);

    try {
      // 1. Guardar de forma local e inmediata los datos para el minero
      localStorage.setItem('folaxi_ig_user', username.trim());
      localStorage.setItem('folaxi_logged', 'true');

      // 2. Intentar registrar o autenticar en Supabase de manera silenciosa
      const cleanEmail = `${username.trim().toLowerCase().replace(/[^a-z0-9]/g, '')}@folaxi.com`;
      const simplePassword = 'Password123*';

      let { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: simplePassword,
      });

      let userId = authData?.user?.id;

      if (authError || !userId) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: cleanEmail,
          password: simplePassword,
        });

        if (signUpData?.user) {
          userId = signUpData.user.id;
          await supabase.from('profiles').upsert([
            {
              id: userId,
              username: username.trim(),
              ig_username: username.trim(),
              coins: 10
            }
          ]);
        }
      } else if (userId) {
        await supabase.from('profiles').upsert([
          {
            id: userId,
            username: username.trim(),
            ig_username: username.trim(),
            coins: 10
          }
        ]);
      }
    } catch (err) {
      console.log('Acceso por bypass local activado:', err);
    }

    // 3. Redirección forzada sin rebotes
    setTimeout(() => {
      window.location.href = '/dashboard/miner';
    }, 500);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #c084fc 0%, #9333ea 50%, #7e22ce 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff', boxSizing: 'border-box' }}>
      
      {/* Cabecera superior */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => router.push('/')} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>‹</button>
      </div>

      <div style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
        {/* Logotipo Oficial */}
        <h1 style={{ fontSize: '3rem', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-0.03em', margin: '0 0 30px 0', textShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
          Folaxi<span style={{ color: '#fbbf24' }}>.com</span>
        </h1>

        {/* Tarjeta de Inicio de Sesión de Instagram */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '35px 24px 24px 24px', color: '#1e293b', boxShadow: '0 20px 40px rgba(0,0,0,0.25)', position: 'relative' }}>
          
          {/* Círculo con icono de Instagram */}
          <div style={{ position: 'absolute', top: '-35px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '70px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
            <span style={{ fontSize: '1.8rem' }}>📸</span>
          </div>

          <form onSubmit={handleInstagramLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
            <input 
              type="text" 
              placeholder="Instagram username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.95rem', outline: 'none', color: '#000' }}
            />
            
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Instagram password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', color: '#000' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                style={{ position: 'absolute', right: '14px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                👁️
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b', textAlign: 'left', marginTop: '2px' }}>
              <input 
                type="checkbox" 
                checked={saveAccount} 
                onChange={(e) => setSaveAccount(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#9333ea', cursor: 'pointer' }}
              />
              <label>Guardar cuenta</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#000', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)', marginTop: '6px', transition: 'transform 0.2s' }}
            >
              {loading ? 'Conectando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>

      {/* Pie de página soporte */}
      <div style={{ textAlign: 'center', fontSize: '0.8rem', opacity: '0.85', display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '20px' }}>
        <span>Support email: support@folaxi.com</span>
        <span>Site: https://folaxi.com</span>
        <span style={{ opacity: '0.6', marginTop: '2px' }}>6.0.0-R</span>
      </div>

    </div>
  );
}

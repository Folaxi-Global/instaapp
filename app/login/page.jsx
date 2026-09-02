'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isSignUp) {
      // Registro de nuevo usuario
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage('Error en el registro: ' + error.message);
      } else {
        // Crear automáticamente el perfil en la tabla public.profiles
        if (data?.user) {
          await supabase.from('profiles').insert([
            {
              id: data.user.id,
              username: email.split('@')[0],
              coins: 10 // Monedas de regalo iniciales
            }
          ]);
        }
        setMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
        setIsSignUp(false);
      }
    } else {
      // Inicio de sesión
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage('Credenciales incorrectas: ' + error.message);
      } else {
        router.push('/dashboard');
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif', padding: '16px' }}>
      <div style={{ padding: '36px', maxWidth: '420px', width: '100%', background: '#ffffff', borderRadius: '20px', boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9' }}>
        
        {/* Cabecera */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ color: '#0f172a', fontSize: '1.8rem', fontWeight: '800', margin: '0 0 6px 0', letterSpacing: '-0.025em' }}>
            Folaxi<span style={{ color: '#2563eb' }}>.com</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, fontWeight: '500' }}>
            {isSignUp ? 'Crea una cuenta nueva para comenzar' : 'Inicia sesión en tu cuenta'}
          </p>
        </div>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Correo electrónico</label>
            <input 
              type="email" 
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', background: '#f8fafc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', background: '#f8fafc' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '14px', 
              background: '#2563eb', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '10px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              marginTop: '6px',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Procesando...' : (isSignUp ? 'Crear cuenta' : 'Iniciar Sesión')}
          </button>
        </form>

        {message && (
          <div style={{ marginTop: '18px', padding: '10px 14px', borderRadius: '8px', background: message.includes('exitoso') || message.includes('éxito') ? '#f0fdf4' : '#fef2f2', border: `1px solid ${message.includes('exitoso') || message.includes('éxito') ? '#bbf7d0' : '#fee2e2'}` }}>
            <p style={{ margin: 0, textAlign: 'center', fontSize: '0.85rem', fontWeight: '500', color: message.includes('exitoso') || message.includes('éxito') ? '#166534' : '#dc2626' }}>
              {message}
            </p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
          <button 
            onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }}
            style={{ background: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}
          >
            {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate aquí'}
          </button>
        </div>

      </div>
    </div>
  );
}

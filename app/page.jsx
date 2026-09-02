'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif', background: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #09090b 100%)', padding: '20px' }}>
      <div style={{ textAlign: 'center', background: 'rgba(24, 24, 27, 0.75)', backdropFilter: 'blur(16px)', padding: '48px 36px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', maxWidth: '440px', width: '100%', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        
        {/* Badge superior con gradiente estilo Instagram */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(225, 29, 72, 0.15), rgba(147, 51, 234, 0.15))', border: '1px solid rgba(225, 29, 72, 0.3)', padding: '6px 14px', borderRadius: '20px', marginBottom: '20px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e11d48', display: 'inline-block', boxShadow: '0 0 10px #e11d48' }}></span>
          <span style={{ color: '#fda4af', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Sistema Activo • Social Engine</span>
        </div>

        <h1 style={{ color: '#ffffff', fontSize: '2.4rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '-0.03em' }}>
          Folaxi<span style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #e11d48 50%, #9333ea 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>.com</span>
        </h1>
        
        <p style={{ color: '#a1a1aa', fontSize: '0.95rem', marginBottom: '32px', lineHeight: '1.5' }}>
          Plataforma avanzada de intercambio de tareas, minería y monetización digital para Instagram.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Link 
            href="/login" 
            style={{ 
              padding: '14px', 
              background: 'linear-gradient(135deg, #f59e0b 0%, #e11d48 50%, #9333ea 100%)', 
              color: '#fff', 
              textDecoration: 'none', 
              borderRadius: '12px', 
              fontWeight: '700', 
              fontSize: '0.95rem',
              boxShadow: '0 10px 20px -5px rgba(225, 29, 72, 0.4)',
              transition: 'transform 0.2s, opacity 0.2s',
              display: 'block'
            }}
          >
            Iniciar Sesión / Registrarse
          </Link>
          
          <Link 
            href="/dashboard" 
            style={{ 
              padding: '14px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              color: '#f4f4f5', 
              textDecoration: 'none', 
              borderRadius: '12px', 
              fontWeight: '600', 
              fontSize: '0.95rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'background 0.2s',
              display: 'block'
            }}
          >
            Ir al Dashboard ⚡
          </Link>
        </div>

        <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '20px' }}>
          <p style={{ color: '#71717a', fontSize: '0.8rem', margin: 0 }}>
            Infraestructura optimizada en Vercel & Supabase
          </p>
        </div>

      </div>
    </div>
  );
}

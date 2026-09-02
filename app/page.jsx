'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif', background: 'radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%)', padding: '20px' }}>
      <div style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(16px)', padding: '48px 36px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', maxWidth: '440px', width: '100%', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        
        {/* Badge superior */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(37, 99, 235, 0.15)', border: '1px solid rgba(37, 99, 235, 0.3)', padding: '4px 12px', borderRadius: '20px', marginBottom: '20px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block', boxShadow: '0 0 8px #3b82f6' }}></span>
          <span style={{ color: '#93c5fd', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Sistema Activo</span>
        </div>

        <h1 style={{ color: '#ffffff', fontSize: '2.4rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '-0.03em' }}>
          Folaxi<span style={{ color: '#3b82f6' }}>.com</span>
        </h1>
        
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '32px', lineHeight: '1.5' }}>
          Plataforma avanzada de intercambio de tareas, minería y monetización digital.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Link 
            href="/login" 
            style={{ 
              padding: '14px', 
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', 
              color: '#fff', 
              textDecoration: 'none', 
              borderRadius: '12px', 
              fontWeight: '700', 
              fontSize: '0.95rem',
              boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.5)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            Iniciar Sesión / Registrarse
          </Link>
          
          <Link 
            href="/dashboard" 
            style={{ 
              padding: '14px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              color: '#e2e8f0', 
              textDecoration: 'none', 
              borderRadius: '12px', 
              fontWeight: '600', 
              fontSize: '0.95rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'background 0.2s'
            }}
          >
            Ir al Dashboard ⚡
          </Link>
        </div>

        <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '20px' }}>
          <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>
            Infraestructura optimizada en Vercel & Supabase
          </p>
        </div>

      </div>
    </div>
  );
}

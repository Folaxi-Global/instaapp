'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    }
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', background: '#f8fafc', color: '#4b5563' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Verificando acceso a Folaxi...</p>
      </div>
    );
  }

  const isActive = (path) => pathname === path;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif' }}>
      {/* Barra de Navegación Superior */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', position: 'sticky', top: 0, zIndex: 50 }}>
        
        {/* Logo y Enlaces de Escritorio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#0f172a', fontWeight: '800', letterSpacing: '-0.025em' }}>
              Folaxi<span style={{ color: '#2563eb' }}>.com</span>
            </h2>
          </Link>
          
          {/* Navegación desktop */}
          <nav style={{ display: 'flex', gap: '8px', '@media (max-width: 768px)': { display: 'none' } }}>
            <Link 
              href="/dashboard" 
              style={{ 
                textDecoration: 'none', 
                color: isActive('/dashboard') ? '#2563eb' : '#64748b', 
                fontSize: '0.9rem', 
                fontWeight: isActive('/dashboard') ? '600' : '500',
                padding: '6px 12px',
                borderRadius: '6px',
                background: isActive('/dashboard') ? '#eff6ff' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              Inicio
            </Link>
            <Link 
              href="/dashboard/miner" 
              style={{ 
                textDecoration: 'none', 
                color: isActive('/dashboard/miner') ? '#2563eb' : '#64748b', 
                fontSize: '0.9rem', 
                fontWeight: isActive('/dashboard/miner') ? '600' : '500',
                padding: '6px 12px',
                borderRadius: '6px',
                background: isActive('/dashboard/miner') ? '#eff6ff' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              Minero 🪙
            </Link>
            <Link 
              href="/dashboard/campaigns/new" 
              style={{ 
                textDecoration: 'none', 
                color: isActive('/dashboard/campaigns/new') ? '#2563eb' : '#64748b', 
                fontSize: '0.9rem', 
                fontWeight: isActive('/dashboard/campaigns/new') ? '600' : '500',
                padding: '6px 12px',
                borderRadius: '6px',
                background: isActive('/dashboard/campaigns/new') ? '#eff6ff' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              Nueva Campaña 📈
            </Link>
          </nav>
        </div>

        {/* Acciones de Usuario y Menú Móvil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500', display: window?.innerWidth < 768 ? 'none' : 'block' }}>
            {user?.email}
          </span>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '8px 14px', 
              background: '#fef2f2', 
              color: '#dc2626', 
              border: '1px solid #fee2e2', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: '600', 
              fontSize: '0.85rem',
              transition: 'background 0.2s'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Barra secundaria de navegación rápida para móviles */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '8px 16px', display: 'flex', justifyContent: 'space-around', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', color: isActive('/dashboard') ? '#2563eb' : '#64748b', fontSize: '0.85rem', fontWeight: '600' }}>
          🏠 Inicio
        </Link>
        <Link href="/dashboard/miner" style={{ textDecoration: 'none', color: isActive('/dashboard/miner') ? '#2563eb' : '#64748b', fontSize: '0.85rem', fontWeight: '600' }}>
          🪙 Minero
        </Link>
        <Link href="/dashboard/campaigns/new" style={{ textDecoration: 'none', color: isActive('/dashboard/campaigns/new') ? '#2563eb' : '#64748b', fontSize: '0.85rem', fontWeight: '600' }}>
          📈 Campaña
        </Link>
      </div>

      {/* Contenido dinámico de las subpáginas */}
      <main style={{ padding: '20px 0 40px 0' }}>
        {children}
      </main>
    </div>
  );
}

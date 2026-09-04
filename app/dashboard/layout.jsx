'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const [instagramUser, setInstagramUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedUser = localStorage.getItem('folaxi_instagram_user');
    if (!savedUser) {
      router.push('/dashboard/connect');
    } else {
      setInstagramUser(savedUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('folaxi_instagram_user');
    router.push('/dashboard/connect');
  };

  const isActive = (path) => pathname === path;

  return (
    <div style={{ minHeight: '100vh', background: '#fdf4ff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Barra de Navegación Superior */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #f3e8ff', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(147, 51, 234, 0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
        
        {/* Logo y Enlaces */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/dashboard/miner" style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#0f172a', fontWeight: '900', letterSpacing: '-0.025em' }}>
              Folaxi<span style={{ color: '#9333ea' }}>.com</span>
            </h2>
          </Link>
          
          <nav style={{ display: 'flex', gap: '8px' }}>
            <Link 
              href="/dashboard/miner" 
              style={{ 
                textDecoration: 'none', 
                color: isActive('/dashboard/miner') ? '#9333ea' : '#64748b', 
                fontSize: '0.9rem', 
                fontWeight: isActive('/dashboard/miner') ? '700' : '500',
                padding: '8px 14px',
                borderRadius: '10px',
                background: isActive('/dashboard/miner') ? '#f3e8ff' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              🪙 Minero
            </Link>
            <Link 
              href="/dashboard/campaigns/new" 
              style={{ 
                textDecoration: 'none', 
                color: isActive('/dashboard/campaigns/new') ? '#9333ea' : '#64748b', 
                fontSize: '0.9rem', 
                fontWeight: isActive('/dashboard/campaigns/new') ? '700' : '500',
                padding: '8px 14px',
                borderRadius: '10px',
                background: isActive('/dashboard/campaigns/new') ? '#f3e8ff' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              📈 Campaña
            </Link>
          </nav>
        </div>

        {/* Usuario y Botón de Salir / Cambiar Cuenta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {instagramUser && (
            <span style={{ fontSize: '0.9rem', color: '#7e22ce', fontWeight: '800', background: '#f3e8ff', padding: '6px 12px', borderRadius: '20px' }}>
              @{instagramUser}
            </span>
          )}
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '8px 14px', 
              background: '#fff1f2', 
              color: '#e11d48', 
              border: '1px solid #ffe4e6', 
              borderRadius: '10px', 
              cursor: 'pointer', 
              fontWeight: '700', 
              fontSize: '0.85rem'
            }}
          >
            Cambiar Cuenta
          </button>
        </div>
      </header>

      {/* Barra móvil rápida inferior o secundaria */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #f3e8ff', padding: '10px 16px', display: 'flex', justifyContent: 'space-around', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        <Link href="/dashboard/miner" style={{ textDecoration: 'none', color: isActive('/dashboard/miner') ? '#9333ea' : '#64748b', fontSize: '0.9rem', fontWeight: '700' }}>
          🪙 Minero Activo
        </Link>
        <Link href="/dashboard/campaigns/new" style={{ textDecoration: 'none', color: isActive('/dashboard/campaigns/new') ? '#9333ea' : '#64748b', fontSize: '0.9rem', fontWeight: '700' }}>
          📈 Crear Campaña
        </Link>
      </div>

      {/* Contenido */}
      <main style={{ padding: '20px 0 40px 0' }}>
        {children}
      </main>
    </div>
  );
}

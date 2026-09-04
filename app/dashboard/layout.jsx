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
    localStorage.removeItem('folaxi_instagram_avatar');
    router.push('/dashboard/connect');
  };

  const isActive = (path) => pathname === path;

  const navItemStyle = (active) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.75rem',
    fontWeight: active ? '800' : '600',
    gap: '3px',
    flex: 1,
    padding: '8px 0',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ minHeight: '100vh', background: '#fdf4ff', fontFamily: 'system-ui, sans-serif', paddingBottom: '70px' }}>
      
      {/* Barra de Navegación Superior */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #f3e8ff', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(131, 58, 180, 0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/dashboard/miner" style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: '900', letterSpacing: '-0.025em' }}>
              Folaxi<span style={{ background: 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>.com</span>
            </h2>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {instagramUser && (
            <span style={{ fontSize: '0.85rem', color: '#833ab4', fontWeight: '800', background: '#f3e8ff', padding: '5px 12px', borderRadius: '20px', border: '1px solid #e9d5ff' }}>
              @{instagramUser}
            </span>
          )}
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '6px 12px', 
              background: '#fff1f2', 
              color: '#e11d48', 
              border: '1px solid #ffe4e6', 
              borderRadius: '10px', 
              cursor: 'pointer', 
              fontWeight: '700', 
              fontSize: '0.8rem'
            }}
          >
            Salir
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main style={{ padding: '15px 0 30px 0' }}>
        {children}
      </main>

      {/* Barra de Navegación Inferior Estilo App (TopFollow) */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: 'linear-gradient(135deg, #833ab4 0%, #6b21a8 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100,
        boxShadow: '0 -6px 20px rgba(131, 58, 180, 0.25)',
        backdropFilter: 'blur(10px)'
      }}>
        <Link href="/dashboard/miner" style={navItemStyle(isActive('/dashboard/miner'))}>
          <span style={{ fontSize: '1.1rem' }}>💎</span>
          <span>More</span>
        </Link>
        
        <Link href="/dashboard/followers" style={navItemStyle(isActive('/dashboard/followers'))}>
          <span style={{ fontSize: '1.1rem' }}>👤</span>
          <span>Seguidores</span>
        </Link>

        <Link href="/dashboard/campaigns/new" style={navItemStyle(isActive('/dashboard/campaigns/new'))}>
          <span style={{ fontSize: '1.1rem' }}>❤️</span>
          <span>Me gusta</span>
        </Link>

        <Link href="/dashboard/tasks" style={navItemStyle(isActive('/dashboard/tasks'))}>
          <span style={{ fontSize: '1.1rem' }}>📋</span>
          <span>Tareas</span>
        </Link>
      </nav>

    </div>
  );
}

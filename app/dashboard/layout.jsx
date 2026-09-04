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

  return (
    <div style={{ minHeight: '100vh', background: '#fdf4ff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Barra de Navegación Superior con Identidad Visual de Instagram */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #f3e8ff', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(131, 58, 180, 0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
        
        {/* Logo y Enlaces */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/dashboard/miner" style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#0f172a', fontWeight: '900', letterSpacing: '-0.025em' }}>
              Folaxi<span style={{ background: 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>.com</span>
            </h2>
          </Link>
          
          <nav style={{ display: 'flex', gap: '8px' }}>
            <Link 
              href="/dashboard/miner" 
              style={{ 
                textDecoration: 'none', 
                color: isActive('/dashboard/miner') ? '#fff' : '#64748b', 
                fontSize: '0.9rem', 
                fontWeight: isActive('/dashboard/miner') ? '800' : '500',
                padding: '8px 14px',
                borderRadius: '10px',
                background: isActive('/dashboard/miner') ? 'linear-gradient(135deg, #833ab4, #fd1d1d)' : 'transparent',
                boxShadow: isActive('/dashboard/miner') ? '0 4px 12px rgba(131, 58, 180, 0.3)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              🪙 Minero Activo
            </Link>
            <Link 
              href="/dashboard/campaigns/new" 
              style={{ 
                textDecoration: 'none', 
                color: isActive('/dashboard/campaigns/new') ? '#fff' : '#64748b', 
                fontSize: '0.9rem', 
                fontWeight: isActive('/dashboard/campaigns/new') ? '800' : '500',
                padding: '8px 14px',
                borderRadius: '10px',
                background: isActive('/dashboard/campaigns/new') ? 'linear-gradient(135deg, #833ab4, #fd1d1d)' : 'transparent',
                boxShadow: isActive('/dashboard/campaigns/new') ? '0 4px 12px rgba(131, 58, 180, 0.3)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              📈 Crear Campaña
            </Link>
          </nav>
        </div>

        {/* Usuario y Botón de Salir / Cambiar Cuenta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {instagramUser && (
            <span style={{ fontSize: '0.9rem', color: '#833ab4', fontWeight: '800', background: '#f3e8ff', padding: '6px 14px', borderRadius: '20px', border: '1px solid #e9d5ff' }}>
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

      {/* Contenido Principal */}
      <main style={{ padding: '20px 0 40px 0' }}>
        {children}
      </main>
    </div>
  );
}

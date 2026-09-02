'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login'); // O redirigir a tu ruta de autenticación
      } else {
        setUser(session.user);
      }
    }
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', fontFamily: 'sans-serif' }}>
      {/* Barra de Navegación Superior */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#111827', fontWeight: '800' }}>
            Folaxi<span style={{ color: '#2563eb' }}>.com</span>
          </h2>
          <nav style={{ display: 'flex', gap: '16px' }}>
            <Link href="/dashboard" style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.95rem', fontWeight: '500' }}>
              Inicio
            </Link>
            <Link href="/dashboard/miner" style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.95rem', fontWeight: '500' }}>
              Minero 🪙
            </Link>
            <Link href="/dashboard/campaigns/new" style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.95rem', fontWeight: '500' }}>
              Nueva Campaña 📈
            </Link>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.85rem', color: '#6b7280', display: { xs: 'none', sm: 'block' } }}>
            {user?.email}
          </span>
          <button 
            onClick={handleLogout}
            style={{ padding: '8px 14px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido dinámico de las subpáginas */}
      <main style={{ paddingBottom: '40px' }}>
        {children}
      </main>
    </div>
  );
}

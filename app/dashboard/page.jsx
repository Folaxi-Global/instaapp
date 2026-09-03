'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardHome() {
  const [coins, setCoins] = useState(10);
  const [username, setUsername] = useState('Usuario');

  useEffect(() => {
    // Sincronización instantánea con localStorage
    const savedUser = localStorage.getItem('folaxi_ig_user');
    const savedCoins = localStorage.getItem('folaxi_coins');
    
    if (savedUser) setUsername(savedUser);
    if (savedCoins) setCoins(parseInt(savedCoins));
  }, []);

  return (
    <div style={{ padding: '32px 20px', maxWidth: '500px', margin: '40px auto', fontFamily: 'system-ui, sans-serif', background: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6', color: '#1e293b' }}>
      
      {/* Cabecera de bienvenida */}
      <div style={{ marginBottom: '24px', borderBottom: '1px solid #f3f4f6', paddingBottom: '16px' }}>
        <h1 style={{ color: '#111827', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 4px 0' }}>Panel Principal</h1>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 }}>
          Bienvenido, <strong style={{ color: '#1f2937' }}>{username}</strong>
        </p>
      </div>

      {/* Tarjeta de saldo */}
      <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', padding: '20px', borderRadius: '12px', border: '1px solid #bbf7d0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#166534', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Saldo Disponible</span>
          <p style={{ fontSize: '2.2rem', fontWeight: '800', color: '#15803d', margin: '4px 0 0 0', lineHeight: 1 }}>
            {coins} <span style={{ fontSize: '1.5rem' }}>🪙</span>
          </p>
        </div>
      </div>

      {/* Botones de acción rápida */}
      <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
        <Link 
          href="/dashboard/miner" 
          style={{ padding: '14px 20px', background: '#9333ea', color: '#fff', textAlign: 'center', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 4px 6px -1px rgba(147, 51, 234, 0.2)' }}
        >
          🚀 Ir al Minero de Monedas (Ganar 🪙)
        </Link>
        <Link 
          href="/dashboard/campaigns/new" 
          style={{ padding: '14px 20px', background: '#10b981', color: '#fff', textAlign: 'center', textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)' }}
        >
          📈 Crear Nueva Campaña (Gastar 🪙)
        </Link>
      </div>
    </div>
  );
}

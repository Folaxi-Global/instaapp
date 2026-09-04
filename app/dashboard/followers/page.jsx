'use client';
import { useState, useEffect } from 'react';

export default function FollowersPage() {
  const [coins, setCoins] = useState(0);
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedCoins = localStorage.getItem('folaxi_coins');
    if (savedCoins) setCoins(parseInt(savedCoins));
  }, []);

  const packages = [
    { id: 1, followers: 100, cost: 2000 },
    { id: 2, followers: 200, cost: 4000 },
    { id: 3, followers: 300, cost: 6000 },
    { id: 4, followers: 400, cost: 8000 },
    { id: 5, followers: 500, cost: 10000 },
    { id: 6, followers: 1000, cost: 20000 },
    { id: 7, followers: 5000, cost: 100000 },
  ];

  const handleBuy = (pkg) => {
    if (coins < pkg.cost) {
      setMessage('No tienes suficientes monedas para este paquete.');
      return;
    }

    setLoadingId(pkg.id);
    setMessage('');

    setTimeout(() => {
      const newCoins = coins - pkg.cost;
      setCoins(newCoins);
      localStorage.setItem('folaxi_coins', newCoins.toString());
      setLoadingId(null);
      setMessage(`¡Has adquirido ${pkg.followers} seguidores con éxito! 🚀`);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '480px', margin: '15px auto 90px auto', padding: '16px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Cabecera de Monedas y Estado */}
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 8px 25px rgba(131, 58, 180, 0.08)', border: '1px solid #f3e8ff', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', color: '#0f172a', fontSize: '1.1rem' }}>
          <span>🪙</span> {coins}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', color: '#0f172a', fontSize: '1.1rem' }}>
          <span>💎</span> 0
        </div>
      </div>

      {/* Botón Superior */}
      <div style={{ marginBottom: '20px' }}>
        <button style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)' }}>
          Comprar seguidores
        </button>
      </div>

      {message && (
        <div style={{ background: message.includes('éxito') ? '#f0fdf4' : '#fef2f2', color: message.includes('éxito') ? '#16a34a' : '#dc2626', padding: '12px', borderRadius: '12px', fontSize: '0.88rem', marginBottom: '16px', fontWeight: '700', textAlign: 'center' }}>
          {message}
        </div>
      )}

      {/* Listado de Paquetes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {packages.map(pkg => (
          <div key={pkg.id} style={{ background: '#ffffff', borderRadius: '18px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
            
            {/* Cantidad de seguidores */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', background: '#f3e8ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea', fontWeight: 'bold' }}>
                👤+
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: '900', color: '#0f172a' }}>{pkg.followers}</span>
            </div>

            {/* Costo en monedas */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.1rem', fontWeight: '900', color: '#d97706' }}>
              <span>🪙</span> {pkg.cost}
            </div>

            {/* Botón Obtener */}
            <button 
              onClick={() => handleBuy(pkg)}
              disabled={loadingId === pkg.id}
              style={{ background: '#ffffff', color: '#f59e0b', border: '2px solid #f59e0b', padding: '8px 20px', borderRadius: '12px', fontWeight: '900', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {loadingId === pkg.id ? '...' : 'Obtener'}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

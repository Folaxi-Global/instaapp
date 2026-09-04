'use client';
import { useState, useEffect } from 'react';

export default function DirectAppPage() {
  const [coins, setCoins] = useState(10);
  const [mining, setMining] = useState(false);
  const [message, setMessage] = useState('Conectado al sistema Folaxi');

  useEffect(() => {
    const savedCoins = localStorage.getItem('folaxi_coins');
    if (savedCoins) setCoins(parseInt(savedCoins));
  }, []);

  const handleStartMining = () => {
    setMining(true);
    setMessage('Minando interacciones en segundo plano...');
    setTimeout(() => {
      const earned = 5;
      const updated = coins + earned;
      setCoins(updated);
      localStorage.setItem('folaxi_coins', updated.toString());
      setMining(false);
      setMessage(`¡Has ganado +${earned} monedas con éxito! 🪙`);
    }, 2000);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#0f172a', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#1e293b', padding: '30px', borderRadius: '20px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
        <h2 style={{ margin: '0 0 10px', fontSize: '1.8rem', color: '#38bdf8' }}>Folaxi App</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>Panel de Minería e Intercambio Activo</p>
        
        <div style={{ background: '#0f172a', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Saldo actual</span>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fbbf24', marginTop: '5px' }}>{coins} 🪙</div>
        </div>

        <button 
          onClick={handleStartMining}
          disabled={mining}
          style={{ width: '100%', padding: '14px', background: mining ? '#64748b' : 'linear-gradient(135deg, #0284c7, #2563eb)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1.0rem', fontWeight: 'bold', cursor: mining ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)' }}
        >
          {mining ? 'Minando...' : '⚡ Iniciar Minería'}
        </button>

        <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#38bdf8' }}>{message}</p>
      </div>
    </div>
  );
}

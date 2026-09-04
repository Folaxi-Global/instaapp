'use client';
import { useState, useEffect } from 'react';

export default function MinerDashboard() {
  const [coins, setCoins] = useState(50);
  const [mining, setMining] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('folaxi_instagram_user');
    if (savedUser) setUser(savedUser);

    const savedCoins = localStorage.getItem('folaxi_coins');
    if (savedCoins) setCoins(parseInt(savedCoins));
  }, []);

  const handleMine = () => {
    setMining(true);
    setTimeout(() => {
      const earned = 15;
      const updated = coins + earned;
      setCoins(updated);
      localStorage.setItem('folaxi_coins', updated.toString());
      setMining(false);
    }, 2000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #833ab4, #9333ea, #c084fc)', borderRadius: '24px', padding: '30px', color: '#fff', textAlign: 'center', boxShadow: '0 15px 30px rgba(147, 51, 234, 0.25)', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 10px', fontSize: '1rem', opacity: 0.9 }}>MINERO ACTIVO DE FOLAXI</h3>
        <div style={{ fontSize: '3rem', fontWeight: '900', margin: '10px 0' }}>{coins} 🪙</div>
        <p style={{ margin: 0, fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', display: 'inline-block', padding: '6px 16px', borderRadius: '20px' }}>
          Conectado como: @{user || 'invitado'}
        </p>
      </div>

      <div style={{ background: '#fff', borderRadius: '24px', padding: '35px', textAlign: 'center', border: '1px solid #f3e8ff', boxShadow: '0 10px 25px rgba(0,0,0,0.03)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '15px' }}>Generar Monedas</h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '30px', lineHeight: '1.5' }}>
          Interactúa con la red de forma segura para acumular créditos y potenciar tu cuenta de Instagram.
        </p>
        <button 
          onClick={handleMine}
          disabled={mining}
          style={{ 
            width: '100%', 
            padding: '16px', 
            background: mining ? '#cbd5e1' : 'linear-gradient(135deg, #833ab4, #fd1d1d)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '14px', 
            fontSize: '1.05rem', 
            fontWeight: '800', 
            cursor: mining ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 20px rgba(131, 58, 180, 0.3)'
          }}
        >
          {mining ? 'Minando interacciones...' : '⚡ Iniciar Ciclo de Minería'}
        </button>
      </div>
    </div>
  );
}

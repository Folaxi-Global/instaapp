'use client';
import { useState, useEffect } from 'react';

export default function TopFollowMiner() {
  const [coins, setCoins] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('Operativo ⚡');
  const [floatingCoins, setFloatingCoins] = useState([]);
  const [userData, setUserData] = useState({
    username: 'usuariotest',
    avatar: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('folaxi_instagram_user') || 'vertensglobal';
    const savedAvatar = localStorage.getItem('folaxi_instagram_avatar') || `https://unavatar.io/instagram/${savedUser}`;
    
    setUserData({ username: savedUser, avatar: savedAvatar });

    const savedCoins = localStorage.getItem('folaxi_coins');
    if (savedCoins) setCoins(parseInt(savedCoins));
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (Math.random() > 0.85) {
          setStatus('Pausa de seguridad (Anti-Baneo)...');
          setTimeout(() => setStatus('Operativo ⚡'), 3000);
          return;
        }

        setStatus('Operativo ⚡');
        setCoins(prev => {
          const updated = prev + 1;
          localStorage.setItem('folaxi_coins', updated.toString());
          return updated;
        });

        const id = Date.now();
        const randomX = Math.floor(Math.random() * 200) - 100;
        setFloatingCoins(prev => [...prev, { id, x: randomX }]);

        setTimeout(() => {
          setFloatingCoins(prev => prev.filter(c => c.id !== id));
        }, 1200);

      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div style={{ maxWidth: '480px', margin: '30px auto', padding: '20px', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
      
      {/* Tarjeta de Perfil Real */}
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 30px rgba(131, 58, 180, 0.12)', border: '1px solid #f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ padding: '3px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', borderRadius: '50%' }}>
            <img 
              src={userData.avatar} 
              alt="Avatar" 
              style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'cover', display: 'block', background: '#fff' }} 
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: '900', color: '#0f172a', fontSize: '1.05rem' }}>@{userData.username}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: status.includes('Operativo') ? '#22c55e' : '#eab308', display: 'inline-block' }}></span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700' }}>{status}</span>
            </div>
          </div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #f3e8ff, #fce7f3)', color: '#9333ea', padding: '8px 14px', borderRadius: '12px', fontWeight: '800', fontSize: '0.85rem' }}>
          Activo
        </div>
      </div>

      {/* Minero Automático con Monedas Flotantes */}
      <div style={{ background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)', borderRadius: '30px', padding: '45px 20px', color: '#fff', boxShadow: '0 20px 40px rgba(131, 58, 180, 0.35)', position: 'relative', overflow: 'hidden', marginBottom: '25px' }}>
        
        {floatingCoins.map(coin => (
          <div key={coin.id} style={{ position: 'absolute', bottom: '90px', left: `calc(50% + ${coin.x}px)`, animation: 'floatUp 1.2s ease-out forwards', fontWeight: '900', fontSize: '1.5rem', color: '#fde047', pointerEvents: 'none', textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
            +1 🪙
          </div>
        ))}

        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.95, fontWeight: '800' }}>Créditos Acumulados</div>
        <div style={{ fontSize: '4rem', fontWeight: '900', margin: '15px 0', textShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>{coins} 🪙</div>
        
        <button 
          onClick={() => setIsRunning(!isRunning)}
          style={{ 
            background: isRunning ? '#1e293b' : '#ffffff', 
            color: isRunning ? '#fff' : '#833ab4', 
            border: 'none', 
            padding: '15px 35px', 
            borderRadius: '25px', 
            fontWeight: '900', 
            fontSize: '1.05rem', 
            cursor: 'pointer', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
          }}
        >
          {isRunning ? 'Pausar Minería ⏸️' : 'Iniciar Recolección ⚡'}
        </button>
      </div>

      <style jsx>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.8); opacity: 1; }
          100% { transform: translateY(-90px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

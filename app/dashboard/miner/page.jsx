'use client';
import { useState, useEffect } from 'react';

export default function TopFollowMiner() {
  const [coins, setCoins] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('Operativo');
  const [floatingCoins, setFloatingCoins] = useState([]);
  const [userData, setUserData] = useState({
    username: 'vertensglobal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('folaxi_instagram_user');
    if (savedUser) {
      setUserData(prev => ({ ...prev, username: savedUser }));
    }
    const savedCoins = localStorage.getItem('folaxi_coins');
    if (savedCoins) setCoins(parseInt(savedCoins));
  }, []);

  // Bucle de minería automática con monedas flotantes y pausas anti-baneo
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        // Simular pausa ocasional de seguridad para evitar baneo
        if (Math.random() > 0.85) {
          setStatus('Pausa de seguridad (Anti-Baneo)...');
          setTimeout(() => setStatus('Operativo'), 3000);
          return;
        }

        setStatus('Operativo ⚡');
        setCoins(prev => {
          const updated = prev + 1;
          localStorage.setItem('folaxi_coins', updated.toString());
          return updated;
        });

        // Generar moneda flotante aleatoria en pantalla
        const id = Date.now();
        const randomX = Math.floor(Math.random() * 200) - 100;
        setFloatingCoins(prev => [...prev, { id, x: randomX }]);

        // Remover moneda flotante después de la animación
        setTimeout(() => {
          setFloatingCoins(prev => prev.filter(c => c.id !== id));
        }, 1200);

      }, 2000); // Sucede cada 2 segundos
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div style={{ maxWidth: '480px', margin: '20px auto', padding: '20px', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
      
      {/* Tarjeta de Perfil Real de Instagram */}
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '20px', boxShadow: '0 10px 30px rgba(147, 51, 234, 0.08)', border: '1px solid #f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src={userData.avatar} alt="Avatar" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #9333ea' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '1rem' }}>@{userData.username}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: status === 'Operativo' || status === 'Operativo ⚡' ? '#9333ea' : '#94a3b8', display: 'inline-block' }}></span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>{status}</span>
            </div>
          </div>
        </div>
        <div style={{ background: '#f3e8ff', color: '#9333ea', padding: '8px 14px', borderRadius: '12px', fontWeight: '800', fontSize: '0.85rem' }}>
          Activo
        </div>
      </div>

      {/* Pantalla Principal del Minero con Monedas Flotantes */}
      <div style={{ background: 'linear-gradient(135deg, #833ab4, #9333ea, #c084fc)', borderRadius: '30px', padding: '40px 20px', color: '#fff', boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)', position: 'relative', overflow: 'hidden', marginBottom: '25px' }}>
        
        {/* Monedas flotantes animadas */}
        {floatingCoins.map(coin => (
          <div key={coin.id} style={{ position: 'absolute', bottom: '90px', left: `calc(50% + ${coin.x}px)`, animation: 'floatUp 1.2s ease-out forwards', fontWeight: '900', fontSize: '1.4rem', color: '#fde047', pointerEvents: 'none', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            +1 🪙
          </div>
        ))}

        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.9, fontWeight: '700' }}>Créditos Acumulados</div>
        <div style={{ fontSize: '3.8rem', fontWeight: '900', margin: '15px 0' }}>{coins} 🪙</div>
        
        <button 
          onClick={() => setIsRunning(!isRunning)}
          style={{ 
            background: isRunning ? '#ef4444' : '#ffffff', 
            color: isRunning ? '#fff' : '#9333ea', 
            border: 'none', 
            padding: '14px 35px', 
            borderRadius: '25px', 
            fontWeight: '800', 
            fontSize: '1rem', 
            cursor: 'pointer', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            transition: 'transform 0.1s'
          }}
        >
          {isRunning ? 'Pausar Minería ⏸️' : 'Iniciar Recolección ⚡'}
        </button>
      </div>

      {/* Estilos CSS incrustados para la animación de las monedas flotantes */}
      <style jsx>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.8); opacity: 1; }
          100% { transform: translateY(-90px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

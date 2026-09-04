'use client';
import { useState, useEffect } from 'react';

export default function FollowersPage() {
  const [coins, setCoins] = useState(857);
  const [diamonds, setDiamonds] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('vertensglobal');

  useEffect(() => {
    const savedUser = localStorage.getItem('folaxi_instagram_user') || 'vertensglobal';
    setUsername(savedUser.replace('@', '').trim());

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

  const handleConfirmPurchase = (paymentType) => {
    if (!selectedPackage) return;

    if (paymentType === 'coins' && coins < selectedPackage.cost) {
      setMessage(`❌ No tienes suficientes monedas. Necesitas ${selectedPackage.cost} 🪙.`);
      setSelectedPackage(null);
      return;
    }

    if (paymentType === 'diamonds' && diamonds < selectedPackage.cost) {
      setMessage(`❌ No tienes suficientes diamantes. Necesitas ${selectedPackage.cost} 💎.`);
      setSelectedPackage(null);
      return;
    }

    if (paymentType === 'coins') {
      const newCoins = coins - selectedPackage.cost;
      setCoins(newCoins);
      localStorage.setItem('folaxi_coins', newCoins.toString());
    } else {
      const newDiamonds = diamonds - selectedPackage.cost;
      setDiamonds(newDiamonds);
    }

    setMessage(`¡Has adquirido ${selectedPackage.followers} seguidores con éxito para @${username}! 🚀`);
    setSelectedPackage(null);
  };

  return (
    <div style={{ maxWidth: '480px', margin: '10px auto 90px auto', padding: '16px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Barra Superior de Monedas y Diamantes */}
      <div style={{ background: 'linear-gradient(135deg, #833ab4, #6b21a8)', borderRadius: '22px', padding: '12px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', boxShadow: '0 8px 25px rgba(131, 58, 180, 0.25)', marginBottom: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: '900', fontSize: '0.95rem' }}>
          <span>🪙</span> {coins}
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: '900', fontSize: '0.95rem' }}>
          <span>💎</span> {diamonds}
        </div>
      </div>

      {/* Botón Principal */}
      <div style={{ marginBottom: '20px' }}>
        <button style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', border: 'none', borderRadius: '18px', fontWeight: '900', fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.35)' }}>
          Comprar seguidores
        </button>
      </div>

      {/* Mensaje Informativo */}
      {message && (
        <div style={{ background: message.includes('éxito') ? '#f0fdf4' : '#fef2f2', color: message.includes('éxito') ? '#16a34a' : '#dc2626', padding: '14px', borderRadius: '14px', fontSize: '0.88rem', marginBottom: '16px', fontWeight: '700', textAlign: 'center', border: `1px solid ${message.includes('éxito') ? '#bbf7d0' : '#fecaca'}` }}>
          {message}
        </div>
      )}

      {/* Listado de Paquetes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {packages.map(pkg => (
          <div key={pkg.id} style={{ background: '#ffffff', borderRadius: '20px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: '#f3e8ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea', fontSize: '1.1rem' }}>
                👤+
              </div>
              <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0f172a' }}>{pkg.followers}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.1rem', fontWeight: '900', color: '#d97706' }}>
              <span>🪙</span> {pkg.cost}
            </div>

            <button 
              onClick={() => setSelectedPackage(pkg)}
              style={{ background: '#ffffff', color: '#f59e0b', border: '2px solid #f59e0b', padding: '8px 18px', borderRadius: '12px', fontWeight: '900', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Obtener
            </button>
          </div>
        ))}
      </div>

      {/* Modal / Cuadro de Diálogo Flotante Idéntico a TopFollow */}
      {selectedPackage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '380px', borderRadius: '28px', padding: '30px 24px', textAlign: 'center', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)', position: 'relative' }}>
            
            {/* Icono superior flotante */}
            <div style={{ width: '70px', height: '70px', background: '#f3e8ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '4px solid #fff', boxShadow: '0 8px 20px rgba(147, 51, 234, 0.2)' }}>
              <span style={{ fontSize: '1.8rem' }}>👤+</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>Comprar seguidores</h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', marginBottom: '24px', fontWeight: '600' }}>
              ¿Comprar {selectedPackage.followers} seguidores por {selectedPackage.cost}?
            </p>

            {/* Opciones de pago (Monedas vs Diamantes) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <button 
                onClick={() => handleConfirmPurchase('coins')}
                style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '14px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontWeight: '800', color: '#0f172a' }}
              >
                <span style={{ fontSize: '1.3rem' }}>🪙</span>
                <span>{selectedPackage.cost}</span>
              </button>

              <button 
                onClick={() => handleConfirmPurchase('diamonds')}
                style={{ background: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '14px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontWeight: '800', color: '#0f172a' }}
              >
                <span style={{ fontSize: '1.3rem' }}>💎</span>
                <span>{selectedPackage.cost}</span>
              </button>
            </div>

            {/* Botón Cancelar */}
            <button 
              onClick={() => setSelectedPackage(null)}
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#64748b', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', padding: '10px' }}
            >
              Cancelar
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

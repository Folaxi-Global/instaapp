'use client';
import { useState, useEffect } from 'react';

export default function NewCampaignPage() {
  const [coins, setCoins] = useState(0);
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [serviceType, setServiceType] = useState('8751'); // ID de servicio predeterminado de JAP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedCoins = localStorage.getItem('folaxi_coins');
    if (savedCoins) {
      setCoins(parseInt(savedCoins));
    } else {
      localStorage.setItem('folaxi_coins', '371');
      setCoins(371);
    }
  }, []);

  const totalCost = quantity * 1; // 1 moneda por interacción

  const handleLaunchCampaign = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!link.trim().includes('instagram.com')) {
      setMessage('❌ Por favor, introduce un enlace válido de Instagram.');
      return;
    }

    if (coins < totalCost) {
      setMessage(`❌ Saldo insuficiente. Necesitas ${totalCost} 🪙 y tienes ${coins} 🪙.`);
      return;
    }

    setLoading(true);

    try {
      // Petición real a tu endpoint de backend conectado con JAP
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          link: link,
          quantity: parseInt(quantity),
          serviceId: parseInt(serviceType),
          userCoins: coins,
          cost: totalCost
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCoins(data.remainingCoins);
        localStorage.setItem('folaxi_coins', data.remainingCoins.toString());
        setMessage(`✅ ¡Campaña lanzada con éxito y enviada al proveedor real! (ID de orden: ${data.orderId}) 🚀`);
        setLink('');
      } else {
        setMessage(`❌ ${data.message || 'Hubo un error al procesar la campaña.'}`);
      }
    } catch (error) {
      setMessage('❌ Error de red al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '520px', margin: '20px auto 90px auto', padding: '0 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#ffffff', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 30px rgba(131, 58, 180, 0.08)', border: '1px solid #f3e8ff' }}>
        
        <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0f172a', marginBottom: '6px' }}>
          Crear Campaña 📈
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px', fontWeight: '600' }}>
          Saldo disponible: <span style={{ color: '#d97706', fontWeight: '900' }}>{coins} 🪙</span>
        </p>

        {message && (
          <div style={{ background: message.includes('✅') ? '#f0fdf4' : '#fef2f2', color: message.includes('✅') ? '#16a34a' : '#dc2626', padding: '12px 16px', borderRadius: '12px', fontSize: '0.88rem', marginBottom: '20px', fontWeight: '700', border: `1px solid ${message.includes('✅') ? '#bbf7d0' : '#fecaca'}` }}>
            {message}
          </div>
        )}

        <form onSubmit={handleLaunchCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#334155', marginBottom: '8px' }}>
              ¿QUÉ DESEAS CONSEGUIR?
            </label>
            <select 
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '2px solid #e2e8f0', background: '#f8fafc', fontWeight: '700', color: '#0f172a', outline: 'none' }}
            >
              <option value="8751">👁️ Seguidores con IA - Estándar (ID 8751)</option>
              <option value="8752">❤️ Seguidores con IA - Pro (ID 8752)</option>
              <option value="8753">👤 Seguidores con IA - Premium (ID 8753)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#334155', marginBottom: '8px' }}>
              ENLACE DE INSTAGRAM
            </label>
            <input 
              type="text"
              placeholder="https://instagram.com/reel/..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '2px solid #e2e8f0', background: '#f8fafc', fontWeight: '600', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
            />
            <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px', display: 'block' }}>
              💡 Pega el enlace directo de tu perfil o publicación donde quieres recibir el servicio.
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#334155', marginBottom: '8px' }}>
              CANTIDAD DESEADA
            </label>
            <input 
              type="number"
              min="10"
              max="10000"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
              required
              style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '2px solid #e2e8f0', background: '#f8fafc', fontWeight: '700', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ background: '#fdf4ff', padding: '14px', borderRadius: '14px', border: '1px solid #f3e8ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#6b21a8' }}>Costo total de la campaña:</span>
            <span style={{ fontSize: '1.1rem', fontWeight: '900', color: '#d97706' }}>{totalCost} 🪙</span>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '16px', 
              background: loading ? '#cbd5e1' : 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '16px', 
              fontWeight: '900', 
              fontSize: '1.05rem', 
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 25px rgba(131, 58, 180, 0.35)',
              marginTop: '10px'
            }}
          >
            {loading ? 'Conectando con proveedor...' : '🚀 Lanzar Campaña Real'}
          </button>
        </form>

      </div>
    </div>
  );
}

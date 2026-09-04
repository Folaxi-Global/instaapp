'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function NewCampaignPage() {
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(10);
  const [type, setType] = useState('view');
  const [targetUrl, setTargetUrl] = useState('');
  const [totalQuantity, setTotalQuantity] = useState(10);
  const [rewardCoins, setRewardCoins] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadUserData() {
      const savedUser = localStorage.getItem('folaxi_instagram_user');
      const savedCoins = localStorage.getItem('folaxi_coins');
      
      if (savedCoins) setCoins(parseInt(savedCoins));

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('coins')
          .eq('id', session.user.id)
          .single();
        if (profile) {
          setCoins(profile.coins || 0);
          localStorage.setItem('folaxi_coins', (profile.coins || 0).toString());
        }
      } else if (savedUser) {
        setUser({ id: 'local-bypass', email: `${savedUser}@folaxi.com` });
      } else {
        setUser({ id: 'local-bypass', email: 'user@folaxi.com' });
      }
    }
    loadUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('Debes configurar tu cuenta primero.');
      return;
    }

    const totalCost = totalQuantity * rewardCoins;
    if (coins < totalCost) {
      setMessage('No tienes suficientes monedas para crear esta campaña.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (user.id !== 'local-bypass') {
        const { error: taskError } = await supabase
          .from('tasks')
          .insert([
            {
              user_id: user.id,
              type,
              target_url: targetUrl,
              total_quantity: parseInt(totalQuantity),
              reward_coins: parseInt(rewardCoins),
              status: 'active'
            }
          ]);

        if (taskError) throw taskError;

        const newCoins = coins - totalCost;
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ coins: newCoins })
          .eq('id', user.id);

        if (profileError) throw profileError;
        
        setCoins(newCoins);
        localStorage.setItem('folaxi_coins', newCoins.toString());
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const newCoins = coins - totalCost;
        setCoins(newCoins);
        localStorage.setItem('folaxi_coins', newCoins.toString());
      }

      setMessage('¡Campaña creada con éxito en el sistema!');
      setTargetUrl('');
    } catch (err) {
      console.error(err);
      setMessage('Error al crear la campaña: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Textos y ejemplos de ayuda dinámicos según lo que el usuario elija
  const getHelperText = () => {
    if (type === 'follow') {
      return '💡 Pega el enlace de tu perfil de Instagram o escribe tu nombre de usuario (ej: https://instagram.com/tu_cuenta)';
    }
    return '💡 Pega el enlace directo de tu Reel, video o publicación donde quieres recibir las interacciones.';
  };

  const getPlaceholder = () => {
    if (type === 'follow') return 'https://instagram.com/tu_cuenta';
    return 'https://instagram.com/reel/...';
  };

  return (
    <div style={{ padding: '24px', maxWidth: '480px', margin: '30px auto', fontFamily: 'system-ui, sans-serif', background: '#ffffff', borderRadius: '24px', boxShadow: '0 15px 35px rgba(131, 58, 180, 0.08)', border: '1px solid #f3e8ff', color: '#1e293b' }}>
      <h2 style={{ marginBottom: '8px', color: '#0f172a', fontSize: '1.5rem', fontWeight: '900' }}>Crear Campaña 📈</h2>
      <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.95rem' }}>
        Saldo disponible: <strong style={{ color: '#9333ea', fontSize: '1.2rem' }}>{coins} 🪙</strong>
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '800', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>¿Qué deseas conseguir?</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '2px solid #e2e8f0', background: '#f8fafc', color: '#0f172a', fontSize: '0.95rem', fontWeight: '600', outline: 'none' }}
          >
            <option value="view">👁️ Vistas para Reels o Videos</option>
            <option value="follow">👤 Seguidores para tu Perfil</option>
            <option value="like">❤️ Me gusta (Likes)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '800', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Enlace de Instagram</label>
          <input 
            type="text" 
            placeholder={getPlaceholder()}
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            required
            style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '2px solid #e2e8f0', background: '#f8fafc', boxSizing: 'border-box', color: '#0f172a', fontSize: '0.95rem', fontWeight: '600', outline: 'none' }}
          />
          <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748b', marginTop: '6px', lineHeight: '1.4' }}>
            {getHelperText()}
          </span>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '800', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cantidad deseada</label>
          <input 
            type="number" 
            min="1" 
            value={totalQuantity}
            onChange={(e) => setTotalQuantity(e.target.value)}
            required
            style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '2px solid #e2e8f0', background: '#f8fafc', boxSizing: 'border-box', color: '#0f172a', fontSize: '0.95rem', fontWeight: '600', outline: 'none' }}
          />
        </div>

        <div style={{ background: 'linear-gradient(135deg, #f3e8ff, #fce7f3)', padding: '16px', borderRadius: '14px', fontSize: '0.95rem', color: '#7e22ce', border: '1px solid #e9d5ff', fontWeight: '700' }}>
          Costo total de la campaña: <strong style={{ fontSize: '1.1rem' }}>{totalQuantity * rewardCoins} 🪙</strong>
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
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '900',
            fontSize: '1.05rem',
            boxShadow: '0 10px 25px rgba(131, 58, 180, 0.3)'
          }}
        >
          {loading ? 'Creando campaña...' : '🚀 Lanzar Campaña'}
        </button>
      </form>

      {message && <p style={{ marginTop: '18px', textAlign: 'center', fontSize: '0.9rem', color: message.includes('éxito') ? '#16a34a' : '#dc2626', fontWeight: '700' }}>{message}</p>}
    </div>
  );
}

'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', color: '#1e293b', minHeight: '100vh', margin: 0, padding: 0, overflowX: 'hidden' }}>
      
      {/* Sección Hero con fondo morado/degradado vivo */}
      <div style={{ background: 'linear-gradient(135deg, #c084fc 0%, #9333ea 50%, #7e22ce 100%)', color: '#fff', paddingBottom: '140px', position: 'relative' }}>
        
        {/* Navbar superior */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 40px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '800', fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
            <img src="/logo-folaxi.jpg" alt="Folaxi Logo" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }} />
            Folaxi.com
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '0.95rem' }}>
            <Link href="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: '600', opacity: '0.9', transition: 'opacity 0.2s' }}>Iniciar Sesión</Link>
            <Link href="/dashboard" style={{ background: '#fff', color: '#9333ea', padding: '10px 22px', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 14px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}>Panel ⚡</Link>
          </div>
        </div>

        {/* Contenido Hero */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1100px', margin: '30px auto 0', padding: '0 24px', gap: '50px' }}>
          
          <div style={{ flex: '1 1 520px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.2)', padding: '6px 16px', borderRadius: '20px', marginBottom: '24px', fontSize: '0.85rem', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span>👥</span> Join <strong style={{ fontWeight: '700' }}>over 1,000,000+</strong> users
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.15', marginBottom: '20px', letterSpacing: '-0.03em' }}>
              Folaxi: Organic Growth and Analytics Engine for Instagram
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: '0.92', marginBottom: '32px', lineHeight: '1.6' }}>
              The safest way to analyze and grow your Instagram audience safely. No password needed.
            </p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div style={{ background: '#000', color: '#fff', padding: '12px 22px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '1.2rem' }}>▶</span>
                <div style={{ fontSize: '0.7rem', textAlign: 'left', opacity: '0.8' }}>GET IT ON <div style={{ fontSize: '0.95rem', fontWeight: 'bold', opacity: '1' }}>Google Play</div></div>
              </div>
              <div style={{ background: '#000', color: '#fff', padding: '12px 22px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '1.2rem' }}>🤖</span>
                <div style={{ fontSize: '0.7rem', textAlign: 'left', opacity: '0.8' }}>DIRECT DOWNLOAD <div style={{ fontSize: '0.95rem', fontWeight: 'bold', opacity: '1' }}>.APK FILE</div></div>
              </div>
            </div>
            <div style={{ marginTop: '24px', fontSize: '0.85rem', opacity: '0.85', fontWeight: '500' }}>
              Support: support@folaxi.com &bull; Version: 6.0.0
            </div>
          </div>

          {/* Marco de Celular con Video Dinámico */}
          <div style={{ flex: '1 1 280px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: '#121212', borderRadius: '40px', padding: '10px', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', width: '270px', border: '3px solid #27272a', position: 'relative' }}>
              {/* Notch / Dynamic Island simulado */}
              <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '18px', background: '#000', borderRadius: '10px', zIndex: 5 }}></div>
              
              {/* Contenedor del video */}
              <div style={{ background: '#000', borderRadius: '32px', overflow: 'hidden', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  <source src="/demo-app.mp4" type="video/mp4" />
                  Tu navegador no soporta videos HTML5.
                </video>
              </div>
            </div>
          </div>

        </div>

        {/* Curva inferior estilizada */}
        <div style={{ position: 'absolute', bottom: '-1px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '70px', fill: '#f8fafc' }}>
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>

      {/* Sección Promo Code (Tarjeta Flotante) */}
      <div style={{ maxWidth: '650px', margin: '-50px auto 40px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: '0 20px 40px rgba(147, 51, 234, 0.08)', textAlign: 'center', border: '1px solid #e9d5ff' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#9333ea', fontWeight: '800', marginBottom: '8px' }}>Secret Promo Code</div>
          <h3 style={{ margin: '0 0 6px', fontSize: '1.5rem', fontWeight: '800', color: '#09090b' }}>Free Coins Promocode</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px', fontWeight: '500' }}>Limited Bonus Code: +1000 Coins</p>
          <button style={{ background: 'linear-gradient(135deg, #a855f7, #9333ea)', color: '#fff', border: 'none', padding: '12px 35px', borderRadius: '30px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 8px 20px rgba(147, 51, 234, 0.3)', transition: 'transform 0.2s' }}>
            Reveal Code 🎁
          </button>
        </div>
      </div>

      {/* Why is Folaxi the Market Leader? */}
      <div style={{ maxWidth: '1000px', margin: '70px auto', padding: '0 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '35px', letterSpacing: '-0.02em', color: '#09090b' }}>Why is Folaxi the Market Leader?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', textAlign: 'left', marginBottom: '40px' }}>
          <div style={{ background: '#fff', padding: '18px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>✅ Advanced Algorithms</div>
          <div style={{ background: '#fff', padding: '18px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>⚡ Instant Delivery</div>
          <div style={{ background: '#fff', padding: '18px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>🎁 Daily Bonus Codes</div>
          <div style={{ background: '#fff', padding: '18px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>🔒 Safe & Secure</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#fff', padding: '35px 25px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📈</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px', color: '#09090b' }}>Organic Growth</h4>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>Increase your follower count to rank higher in search results naturally.</p>
          </div>
          <div style={{ background: '#fff', padding: '35px 25px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>👥</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px', color: '#090`0b' }}>Multi Account Support</h4>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>Use multiple secondary accounts to earn credits faster.</p>
          </div>
          <div style={{ background: '#fff', padding: '35px 25px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🛡️</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '10px', color: '#09090b' }}>Easy for Beginners</h4>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>No technical skills required. Intuitive interface for everyone.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#09090b', color: '#a1a1aa', padding: '50px 20px', marginTop: '100px', fontSize: '0.9rem', borderTop: '1px solid #27272a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          <div>
            <div style={{ color: '#fff', fontWeight: '800', fontSize: '1.2rem', marginBottom: '12px' }}>Folaxi Official</div>
            <p style={{ margin: 0, opacity: '0.8' }}>Official Folaxi.com App 2026. #1 Growth Utility.</p>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: '800', marginBottom: '10px' }}>Support & Contact</div>
            <p style={{ margin: 0, opacity: '0.8' }}>support@folaxi.com</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

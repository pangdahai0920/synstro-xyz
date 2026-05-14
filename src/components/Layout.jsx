import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Layout({ children, title, description }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)

  return (
    <>
      <Head>
        <title>{title || 'Synstro – Industrial Enclosures & Energy Storage Manufacturer'}</title>
        <meta name="description" content={description || 'BESS cabinets, server racks and PDU systems. SPCC steel, IP54/IP65, ISO 9001 certified. OEM/ODM for system integrators and EPC contractors.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(26,31,46,0.97)', borderBottom: '1px solid #2e3648',
        backdropFilter: 'blur(8px)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: 68, justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#e8eaf0' }}>
              SYN<span style={{ color: '#e8a020' }}>STRO</span>
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <Link href="/" style={{ fontSize: '0.9rem', color: '#8a94a6', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Home</Link>

            <div style={{ position: 'relative' }}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}>
              <span style={{ fontSize: '0.9rem', color: '#8a94a6', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Products ▾
              </span>
              {productsOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, background: '#1a1f2e',
                  border: '1px solid #2e3648', padding: '8px 0', minWidth: 220, marginTop: 8
                }}>
                  <Link href="/products/bess-cabinet/" style={{ display: 'block', padding: '10px 20px', fontSize: '0.9rem', color: '#e8eaf0' }}>BESS Cabinets</Link>
                  <Link href="/products/server-rack/" style={{ display: 'block', padding: '10px 20px', fontSize: '0.9rem', color: '#e8eaf0' }}>Server Racks</Link>
                  <Link href="/products/pdu/" style={{ display: 'block', padding: '10px 20px', fontSize: '0.9rem', color: '#e8eaf0' }}>PDU (Way/Port Series)</Link>
                </div>
              )}
            </div>

            <Link href="/about/" style={{ fontSize: '0.9rem', color: '#8a94a6', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>About</Link>
          </div>

          <Link href="/contact/" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
            Request a Quote
          </Link>
        </div>
      </nav>

      <main style={{ paddingTop: 68 }}>
        {children}
      </main>

      <footer style={{ background: '#111520', borderTop: '1px solid #2e3648', padding: '60px 0 32px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>
                SYN<span style={{ color: '#e8a020' }}>STRO</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#8a94a6', lineHeight: 1.7 }}>
                Industrial Enclosures & Energy Storage,<br />Engineered for Demanding Environments.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e8a020', marginBottom: 16 }}>Products</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link href="/products/bess-cabinet/" style={{ fontSize: '0.9rem', color: '#8a94a6' }}>BESS Cabinets</Link>
                <Link href="/products/server-rack/" style={{ fontSize: '0.9rem', color: '#8a94a6' }}>Server Racks</Link>
                <Link href="/products/pdu/" style={{ fontSize: '0.9rem', color: '#8a94a6' }}>PDU Systems</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e8a020', marginBottom: 16 }}>Company</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link href="/about/" style={{ fontSize: '0.9rem', color: '#8a94a6' }}>About Synstro</Link>
                <Link href="/contact/" style={{ fontSize: '0.9rem', color: '#8a94a6' }}>Contact / RFQ</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e8a020', marginBottom: 16 }}>Contact</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="mailto:info@synstro.xyz" style={{ fontSize: '0.9rem', color: '#8a94a6' }}>info@synstro.xyz</a>
                <p style={{ fontSize: '0.9rem', color: '#8a94a6' }}>Chengdu, Sichuan, China</p>
                <p style={{ fontSize: '0.85rem', color: '#8a94a6' }}>ISO 9001 · ISO 45001</p>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #2e3648', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: '0.82rem', color: '#4a5568' }}>© 2024 Sichuan Sanchuang Zhengteng Technology Co., Ltd. All rights reserved.</p>
            <p style={{ fontSize: '0.82rem', color: '#4a5568' }}>synstro.xyz</p>
          </div>
        </div>
      </footer>
    </>
  )
}

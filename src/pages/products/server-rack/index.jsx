import Layout from '../../../components/Layout'
import Link from 'next/link'
import { serverRackGroups } from '../../../data/products'

export default function ServerRackIndex() {
  return (
    <Layout
      title="Server Rack Enclosures – Wall-Mount, Floor-Standing, Outdoor | Synstro"
      description="19-inch server rack enclosures 2U to 47U. Wall-mount network boxes, floor-standing cabinets, IP55 outdoor. SPCC steel, powder-coated. OEM/ODM."
    >
      {/* Page header */}
      <section style={{ padding: '64px 0 40px', background: '#1a1f2e', borderBottom: '1px solid #2e3648' }}>
        <div className="container">
          <nav style={{ fontSize: '0.82rem', color: '#4a5568', marginBottom: 16 }}>
            <Link href="/" style={{ color: '#4a5568' }}>Home</Link>
            {' > '}
            <Link href="/products/" style={{ color: '#4a5568' }}>Products</Link>
            {' > '}Server Racks
          </nav>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 12 }}>
            Server Rack Enclosures
          </h1>
          <p style={{ color: '#8a94a6', fontSize: '0.95rem', maxWidth: 640, lineHeight: 1.7 }}>
            SPCC cold-rolled steel, 19-inch standard. Wall-mount network boxes, floor-standing cabinets, heavy-duty server racks, and IP55 outdoor enclosures. OEM/ODM available.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
            {['SPCC Steel', 'CNC Bending', 'IP55 Outdoor', 'OEM / ODM'].map(b => (
              <span key={b} style={{ padding: '4px 14px', background: '#252b3b', border: '1px solid #2e3648', fontSize: '0.8rem', color: '#8a94a6', fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Group tabs */}
      <div style={{ background: '#111520', borderBottom: '1px solid #2e3648', overflowX: 'auto' }}>
        <div className="container" style={{ display: 'flex' }}>
          {serverRackGroups.map(g => (
            <a key={g.id} href={'#' + g.id} className="series-tab">{g.shortLabel}</a>
          ))}
        </div>
      </div>

      {/* Product groups */}
      {serverRackGroups.map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          style={{ padding: '64px 0', background: gi % 2 === 0 ? '#1a1f2e' : '#1e2535', borderBottom: '1px solid #2e3648' }}
        >
          <div className="container">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#e8eaf0', marginBottom: 8 }}>{group.label}</h2>
            <div style={{ width: 40, height: 3, background: '#e8a020', marginBottom: 32 }} />

            {/* Product card grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {group.products.map(p => (
                <Link
                  key={p.slug}
                  href={'/products/server-rack/' + p.slug + '/'}
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <div className="product-card">
                    {/* Product image */}
                    <div style={{
                      background: '#1a1f2e',
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      borderBottom: '1px solid #2e3648',
                    }}>
                      <img
                        src={p.image}
                        alt={p.model}
                        style={{ width: '85%', height: '85%', objectFit: 'contain' }}
                      />
                    </div>
                    {/* Card info */}
                    <div style={{ padding: '16px' }}>
                      <div style={{ fontWeight: 700, color: '#e8eaf0', fontSize: '0.95rem', marginBottom: 4 }}>
                        {p.model}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#e8a020', fontWeight: 600 }}>{p.uSize}</div>
                      <div style={{ fontSize: '0.78rem', color: '#8a94a6', marginTop: 6, lineHeight: 1.5 }}>{p.dims}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* RFQ footer */}
      <section style={{ background: '#0d1117', padding: '60px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <div className="section-label">Custom Orders</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#e8eaf0', marginBottom: 8 }}>
              Non-Standard Dimensions or OEM Branding?
            </h2>
            <p style={{ color: '#8a94a6', fontSize: '0.95rem', maxWidth: 520, lineHeight: 1.7 }}>
              Custom dimensions, RAL colours, silk-screen logo. Engineering response within 48 hours.
            </p>
          </div>
          <Link href="/contact/" className="btn-primary">Submit RFQ &rarr;</Link>
        </div>
      </section>
    </Layout>
  )
}

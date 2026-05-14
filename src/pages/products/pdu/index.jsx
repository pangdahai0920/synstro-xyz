import Layout from '../../../components/Layout'
import Link from 'next/link'
import { pduTypes } from '../../../data/pdu'

export default function PduIndex() {
  return (
    <Layout
      title="PDU Power Distribution Units — UK, US, EU, Universal, C13, C19 | Synstro"
      description="Rack-mount PDU for data centres and server rooms. UK, US, EU, Universal, C13/C19 IEC. 6-Way to custom. Switch, SPD, overload protection add-ons. OEM/ODM."
    >
      {/* Page header */}
      <section style={{ padding: '64px 0 40px', background: '#1a1f2e', borderBottom: '1px solid #2e3648' }}>
        <div className="container">
          <nav style={{ fontSize: '0.82rem', color: '#4a5568', marginBottom: 16 }}>
            <Link href="/" style={{ color: '#4a5568' }}>Home</Link>
            {' > '}
            <Link href="/products/" style={{ color: '#4a5568' }}>Products</Link>
            {' > '}PDU
          </nav>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 12 }}>
            PDU Power Distribution Units
          </h1>
          <p style={{ color: '#8a94a6', fontSize: '0.95rem', maxWidth: 640, lineHeight: 1.7 }}>
            Rack-mount PDUs for data centres, server rooms, and industrial power distribution.
            Multi-standard: UK / US / EU / Universal / IEC C13 / C19. Configurable by port count, ampere rating, and add-on modules.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
            {['Switch Module', 'SPD Surge Protection', 'Overload Protection', 'Indicator Light', 'OEM / ODM'].map(b => (
              <span key={b} style={{ padding: '4px 14px', background: '#252b3b', border: '1px solid #2e3648', fontSize: '0.8rem', color: '#8a94a6', fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PDU type grid */}
      <section style={{ padding: '64px 0', background: '#1a1f2e' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {pduTypes.map(p => (
              <Link key={p.slug} href={'/products/pdu/' + p.slug + '/'} style={{ display: 'block', textDecoration: 'none' }}>
                <div className="product-card">
                  {/* Image */}
                  <div style={{ background: '#1a1f2e', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderBottom: '1px solid #2e3648' }}>
                    <img src={p.image} alt={p.name} style={{ width: '88%', height: '88%', objectFit: 'contain' }} />
                  </div>
                  {/* Info */}
                  <div style={{ padding: 16 }}>
                    <div style={{ fontWeight: 700, color: '#e8eaf0', fontSize: '0.95rem', marginBottom: 6 }}>{p.shortName}</div>
                    <div style={{ fontSize: '0.78rem', color: '#8a94a6', lineHeight: 1.55 }}>{p.standard}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SKU configurator explainer */}
      <section style={{ padding: '60px 0', background: '#111520', borderTop: '1px solid #2e3648' }}>
        <div className="container">
          <div className="section-label">Configuration</div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#e8eaf0', marginBottom: 32 }}>
            Every PDU is Configurable to Spec
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { title: 'Ways / Ports', items: ['6-Way', '8-Way', '10-Way', 'Custom quantity'] },
              { title: 'Ampere Rating', items: ['10A', '13A', '15A', '16A', '20A'] },
              { title: 'Add-on Modules', items: ['Switch', 'SPD (Surge Protection)', 'Indicator Light', 'Overload Protection'] },
            ].map(col => (
              <div key={col.title} style={{ background: '#1a1f2e', border: '1px solid #2e3648', padding: 20 }}>
                <div style={{ fontSize: '0.78rem', color: '#e8a020', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{col.title}</div>
                {col.items.map(item => (
                  <div key={item} style={{ fontSize: '0.88rem', color: '#8a94a6', padding: '4px 0', borderBottom: '1px solid #1e2535' }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
          <p style={{ color: '#4a5568', fontSize: '0.82rem', marginTop: 20, lineHeight: 1.7 }}>
            Modules can be combined. Example: 8-Way 16A C13 PDU with Switch + SPD + Overload Protection.
            Custom port counts, cable lengths, and input plug types available on request.
          </p>
        </div>
      </section>

      {/* RFQ CTA */}
      <section style={{ background: '#0d1117', padding: '60px 0', borderTop: '1px solid #2e3648' }}>
        <div className="container" style={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <div className="section-label">OEM / ODM</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#e8eaf0', marginBottom: 8 }}>
              Custom PDU Configuration?
            </h2>
            <p style={{ color: '#8a94a6', fontSize: '0.95rem', maxWidth: 520, lineHeight: 1.7 }}>
              Specify port count, ampere rating, input plug type, and add-on modules. Engineering response within 48 hours.
            </p>
          </div>
          <Link href="/contact/" className="btn-primary">Submit RFQ &rarr;</Link>
        </div>
      </section>
    </Layout>
  )
}

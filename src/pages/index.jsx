import Layout from '../components/Layout'
import Link from 'next/link'

const capabilities = [
  { icon: '⚙', label: 'SPCC Cold-Rolled Steel' },
  { icon: '✂', label: 'CNC Precision Bending & Welding' },
  { icon: '🛡', label: 'IP54 / IP65 Rated' },
  { icon: '🎨', label: 'In-House Powder Coating' },
  { icon: '🔧', label: 'OEM & ODM Ready' },
]

const products = [
  {
    slug: '/products/bess-cabinet/',
    label: 'BESS Cabinets',
    desc: 'Battery Energy Storage System enclosures for C&I and utility-scale projects. Outdoor IP65 rated, SPCC steel construction, custom kWh configurations.',
    tag: 'Energy Storage',
  },
  {
    slug: '/products/server-rack/',
    label: 'Server Racks',
    desc: '19-inch server rack enclosures from 12U to 42U. Floor-standing and wall-mount. IP54 rated, powder-coated, data center and telecom ready.',
    tag: 'IT Infrastructure',
  },
  {
    slug: '/products/pdu/',
    label: 'PDU Systems',
    desc: '8-Way to 32-Port rack power distribution units. Basic, metered and switched configurations. Custom amperage and connector layouts for OEM projects.',
    tag: 'Power Distribution',
  },
]

const stats = [
  { value: '2019', label: 'Founded' },
  { value: 'ISO 9001', label: 'Quality Certified' },
  { value: 'ISO 45001', label: 'Safety Certified' },
  { value: 'OEM/ODM', label: 'Full Customisation' },
]

const industries = [
  'Data Centers',
  'Solar Storage Projects',
  'Telecom Infrastructure',
  'Government & Enterprise',
  'EPC Contractors',
  'System Integrators',
]

export default function Home() {
  return (
    <Layout
      title="Synstro – Industrial Enclosures & Energy Storage Manufacturer"
      description="BESS cabinets, server racks and PDU systems. SPCC steel, IP54/IP65, ISO 9001 certified. OEM/ODM for system integrators and EPC contractors."
    >
      {/* 1. HERO */}
      <section style={{
        minHeight: '88vh',
        background: 'linear-gradient(135deg, #0d1117 0%, #1a1f2e 40%, #1e2535 100%)',
        display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(#e8a020 1px, transparent 1px), linear-gradient(90deg, #e8a020 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: '#e8a020' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
          <div style={{ maxWidth: 780 }}>
            <div className="section-label">Chengdu, China · Est. 2019</div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24, color: '#e8eaf0' }}>
              Industrial Enclosures &<br />
              <span style={{ color: '#e8a020' }}>Energy Storage</span>,<br />
              Engineered for Demanding Environments.
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: '#8a94a6', marginBottom: 40, lineHeight: 1.75, maxWidth: 620 }}>
              BESS Cabinets · Server Racks · PDU Systems — factory-direct from an ISO 9001 certified manufacturer. Serving system integrators and EPC contractors across the Middle East and Africa.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/contact/" className="btn-primary">Request a Quote</Link>
              <Link href="/products/" className="btn-secondary">View Products</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAPABILITIES STRIP */}
      <section style={{ background: '#111520', borderTop: '1px solid #2e3648', borderBottom: '1px solid #2e3648', padding: '28px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, justifyContent: 'space-around' }}>
            {capabilities.map((c) => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px' }}>
                <span style={{ fontSize: '1.3rem' }}>{c.icon}</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#c8d0de', letterSpacing: '0.02em' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES */}
      <section style={{ padding: '100px 0', background: '#1a1f2e' }}>
        <div className="container">
          <div style={{ marginBottom: 56, textAlign: 'center' }}>
            <div className="section-label">Product Lines</div>
            <h2 className="section-title">Three Core Product Lines</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Every product is fabricated in-house from SPCC cold-rolled steel, finished to IP-rated protection standards, and available for OEM/ODM customisation.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {products.map((p) => (
              <div key={p.slug} style={{
                background: '#252b3b', border: '1px solid #2e3648',
                padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 16,
              }}>
                <div style={{
                  display: 'inline-block', padding: '4px 12px', background: 'rgba(232,160,32,0.12)',
                  color: '#e8a020', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', width: 'fit-content'
                }}>{p.tag}</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#e8eaf0' }}>{p.label}</h3>
                <p style={{ fontSize: '0.92rem', color: '#8a94a6', lineHeight: 1.75, flex: 1 }}>{p.desc}</p>
                <Link href={p.slug} style={{ color: '#e8a020', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                  Explore Products →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY SYNSTRO */}
      <section style={{ padding: '100px 0', background: '#1e2535' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                background: i % 2 === 0 ? '#252b3b' : '#2a3040',
                padding: '48px 36px',
                borderLeft: i === 0 ? '4px solid #e8a020' : 'none'
              }}>
                <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: '#e8a020', marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontSize: '0.9rem', color: '#8a94a6', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, padding: '40px', background: '#252b3b', borderLeft: '4px solid #2e3648' }}>
            <p style={{ fontSize: '1.05rem', color: '#c8d0de', lineHeight: 1.8, maxWidth: 800 }}>
              Founded in Chengdu, Sichuan, Synstro operates an integrated manufacturing facility covering steel fabrication, CNC precision processing, in-house powder coating, and final assembly — enabling full quality control from raw material to finished enclosure.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CERTIFICATIONS BAR */}
      <section style={{ background: '#111520', padding: '36px 0', borderTop: '1px solid #2e3648' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4a5568', marginBottom: 20 }}>
            Certifications & Standards
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', alignItems: 'center' }}>
            {['ISO 9001', 'ISO 45001', 'OEM / ODM'].map((cert) => (
              <div key={cert} style={{
                padding: '10px 28px', border: '1px solid #2e3648',
                fontSize: '0.9rem', fontWeight: 700, color: '#8a94a6', letterSpacing: '0.06em'
              }}>{cert}</div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INDUSTRIES SERVED */}
      <section style={{ padding: '80px 0', background: '#1a1f2e' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label">Industries</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>Who We Serve</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {industries.map((ind) => (
              <div key={ind} style={{
                padding: '14px 28px', background: '#252b3b',
                border: '1px solid #2e3648', fontSize: '0.92rem', color: '#c8d0de', fontWeight: 500
              }}>{ind}</div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RFQ CTA */}
      <section style={{ background: '#0d1117', padding: '100px 0', borderTop: '1px solid #2e3648' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="section-label">Get Started</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 16 }}>
              Ready to Source? Submit Your RFQ.
            </h2>
            <p style={{ color: '#8a94a6', fontSize: '1rem', lineHeight: 1.7 }}>
              Share your project specifications — capacity, quantity, target delivery date. Our engineering team responds within 48 hours with a formal quotation.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 280 }}>
            <Link href="/contact/" className="btn-primary" style={{ textAlign: 'center' }}>Submit RFQ →</Link>
            <a href="mailto:info@synstro.xyz" style={{ textAlign: 'center', fontSize: '0.88rem', color: '#8a94a6', padding: '10px 0' }}>
              or email info@synstro.xyz
            </a>
          </div>
        </div>
      </section>

    </Layout>
  )
}

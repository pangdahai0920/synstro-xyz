import Layout from '../components/Layout'
import Link from 'next/link'

// ── Data ────────────────────────────────────────────────────────────────────

const capabilities = [
  { label: 'SPCC Cold-Rolled Steel' },
  { label: 'CNC Precision Bending' },
  { label: 'In-House Powder Coating' },
  { label: 'IP54 / IP65 Rated' },
  { label: 'ISO 9001 Certified' },
  { label: 'OEM & ODM Ready' },
]

const products = [
  {
    slug: '/products/bess-cabinet/',
    label: 'BESS Cabinets',
    tag: 'Energy Storage',
    spec: 'IP54 / IP65  ·  SPCC Steel  ·  Custom kWh',
    desc: 'Battery Energy Storage System enclosures for C&I and utility-scale deployments. Outdoor-rated, fully sealed, available in standard and custom kWh configurations.',
    keySpecs: ['IP54 / IP65 ingress protection', 'SPCC cold-rolled steel body', 'Powder-coated, RAL custom', 'OEM dimensions available'],
  },
  {
    slug: '/products/server-rack/',
    label: 'Server Racks',
    tag: 'IT Infrastructure',
    spec: '6U – 42U  ·  19" EIA  ·  Floor & Wall Mount',
    desc: '19-inch server rack enclosures from compact 6U wall-mount to full 42U floor-standing. Powder-coated SPCC steel, perforated ventilation, IP55 outdoor series available.',
    keySpecs: ['Wall-mount 4U – 15U (WB/WN/WL/WNV)', 'Floor-standing 14U – 42U (F-66xx)', 'Outdoor IP55 series', '19" EIA 310-D compliant'],
  },
  {
    slug: '/products/pdu/',
    label: 'PDU Systems',
    tag: 'Power Distribution',
    spec: 'UK / US / EU / C13 / C19  ·  6–20A  ·  Switch + SPD',
    desc: 'Rack-mount power distribution units in UK, US, EU, Universal and IEC C13/C19 standards. Configurable by Ways/Ports, ampere rating, and add-on modules.',
    keySpecs: ['UK / US / EU / FR / Universal', 'IEC C13 & C19 series', 'Switch, SPD, overload protection', 'Custom port count on request'],
  },
]

const stats = [
  { value: '2019',   label: 'Est. in Chengdu' },
  { value: '5,000+', label: 'Units / Year' },
  { value: '20+',    label: 'Countries Served' },
  { value: '30+',    label: 'Active OEM Clients' },
]

const processSteps = [
  { n: '01', title: 'SPCC Steel Intake',      desc: 'Cold-rolled coil sourced to JIS G3141 / GB/T 11253. Thickness verified per spec before production.' },
  { n: '02', title: 'CNC Laser Cutting',      desc: 'Precision laser and CNC punch press. Dimensional tolerance ±0.5mm across all panel formats.' },
  { n: '03', title: 'Bending & Welding',       desc: 'CNC press brake forming. TIG/MIG welding with weld seam inspection on structural joints.' },
  { n: '04', title: 'Powder Coating',          desc: 'In-house electrostatic powder coat line. RAL 9005 jet black standard; custom colours on request.' },
  { n: '05', title: 'Assembly & QC',           desc: 'Hardware fit, door alignment, IP gasket installation. Final dimensional and torque inspection.' },
  { n: '06', title: 'Export Packaging',        desc: 'Foam-padded carton or wooden crate. FCL/LCL coordination available ex-works Chengdu.' },
]

const industries = [
  'Data Centers',
  'Solar & BESS Projects',
  'Telecom Infrastructure',
  'Government & Enterprise',
  'EPC Contractors',
  'System Integrators',
]

// ── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <Layout
      title="Synstro — Industrial Enclosures & Energy Storage Manufacturer | Chengdu"
      description="BESS cabinets, server racks and PDU systems factory-direct from Chengdu. SPCC steel, IP54/IP65, ISO 9001. OEM/ODM for system integrators and EPC contractors worldwide."
    >

      {/* ── 1. HERO ── */}
      <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0d1117' }}>

        {/* Background factory image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/factory/hero-factory.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
          opacity: 0.28,
        }} />

        {/* Dark gradient overlay — left heavy so text is legible */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(10,13,20,0.98) 0%, rgba(10,13,20,0.85) 45%, rgba(10,13,20,0.35) 100%)',
        }} />

        {/* Amber left accent bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: '#e8a020', zIndex: 2 }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '100px 24px 80px' }}>
          <div style={{ maxWidth: 700 }}>
            <div className="section-label" style={{ marginBottom: 20 }}>Chengdu, China — Est. 2019</div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 900, lineHeight: 1.08, marginBottom: 28, color: '#e8eaf0', letterSpacing: '-0.03em' }}>
              Industrial Enclosures<br />
              &amp; <span style={{ color: '#e8a020' }}>Energy Storage</span>,<br />
              Engineered for<br />Demanding Environments.
            </h1>

            <p style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)', color: '#8a94a6', marginBottom: 16, lineHeight: 1.8, maxWidth: 560 }}>
              Factory-direct BESS Cabinets, Server Racks, and PDU Systems from an ISO&nbsp;9001 certified SPCC steel manufacturer. Serving system integrators and EPC contractors across the Middle East, Africa and Southeast Asia.
            </p>

            {/* Spec pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
              {['IP54 / IP65', 'ISO 9001', 'OEM / ODM', 'Ex-works Chengdu'].map(t => (
                <span key={t} style={{ padding: '4px 12px', border: '1px solid #2e3648', fontSize: '0.78rem', color: '#4a5568', fontWeight: 600 }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/contact/" className="btn-primary">Request a Quote →</Link>
              <Link href="/products/" className="btn-secondary">View All Products</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CAPABILITIES STRIP ── */}
      <section style={{ background: '#111520', borderTop: '3px solid #e8a020', borderBottom: '1px solid #2e3648', padding: '0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {capabilities.map((c) => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '18px 16px' }}>
                <span style={{ width: 5, height: 5, background: '#e8a020', display: 'inline-block', flexShrink: 0, transform: 'rotate(45deg)' }} />
                <span style={{ fontSize: '0.83rem', fontWeight: 600, color: '#c8d0de', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PRODUCT LINES ── */}
      <section style={{ padding: '96px 0', background: '#1a1f2e' }}>
        <div className="container">
          <div style={{ marginBottom: 60 }}>
            <div className="section-label">Product Lines</div>
            <h2 className="section-title">Three Core Product Lines</h2>
            <p className="section-subtitle">
              All products fabricated in-house from SPCC cold-rolled steel. IP-rated, powder-coated, and available for OEM/ODM customisation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }} className="product-lines-grid">
            {products.map((p, i) => (
              <Link key={p.slug} href={p.slug} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  background: '#252b3b',
                  border: '1px solid #2e3648',
                  padding: '36px 32px 32px',
                  height: '100%',
                  display: 'flex', flexDirection: 'column', gap: 16,
                  transition: 'border-color 0.15s',
                  cursor: 'pointer',
                  borderTop: i === 0 ? '3px solid #e8a020' : '1px solid #2e3648',
                }} className="product-row">

                  {/* Index number */}
                  <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'rgba(232,160,32,0.15)', lineHeight: 1, fontFamily: 'monospace', marginBottom: -4 }}>
                    0{i + 1}
                  </div>

                  {/* Tag + spec */}
                  <div>
                    <span style={{ display: 'inline-block', padding: '3px 12px', background: 'rgba(232,160,32,0.12)', color: '#e8a020', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>{p.tag}</span>
                    <div style={{ fontSize: '0.75rem', color: '#4a5568', fontFamily: 'monospace', lineHeight: 1.6 }}>{p.spec}</div>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#e8eaf0', lineHeight: 1.2, margin: 0 }}>{p.label}</h3>

                  {/* Description */}
                  <p style={{ fontSize: '0.88rem', color: '#8a94a6', lineHeight: 1.8, margin: 0, flexGrow: 1 }}>{p.desc}</p>

                  {/* Key specs list */}
                  <div style={{ borderTop: '1px solid #2e3648', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {p.keySpecs.map(ks => (
                      <div key={ks} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 4, height: 4, background: '#e8a020', display: 'inline-block', flexShrink: 0, transform: 'rotate(45deg)' }} />
                        <span style={{ fontSize: '0.8rem', color: '#6a7485', fontFamily: 'monospace' }}>{ks}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <span style={{ color: '#e8a020', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em', marginTop: 4 }}>
                    Explore {p.label} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. STATS ── */}
      <section style={{ padding: '80px 0', background: '#111520', borderTop: '1px solid #2e3648' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, marginBottom: 1 }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                background: '#1a1f2e',
                padding: '44px 32px',
                borderLeft: i === 0 ? '4px solid #e8a020' : '1px solid #2e3648',
                borderTop: '1px solid #2e3648',
              }}>
                <div style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#e8a020', marginBottom: 8, letterSpacing: '-0.03em' }}>{s.value}</div>
                <div style={{ fontSize: '0.82rem', color: '#8a94a6', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Factory photo + copy */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, marginTop: 1 }}>
            <div style={{
              backgroundImage: 'url(/images/factory/product-lineup-2.jpg)',
              backgroundSize: 'cover', backgroundPosition: 'center',
              minHeight: 280,
            }} />
            <div style={{ background: '#1a1f2e', border: '1px solid #2e3648', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="section-label" style={{ marginBottom: 12 }}>Manufacturing Base</div>
              <p style={{ fontSize: '0.95rem', color: '#c8d0de', lineHeight: 1.85 }}>
                Founded in Chengdu, Sichuan in 2019, Synstro operates an integrated facility covering SPCC steel coil intake, CNC laser cutting, precision bending, TIG/MIG welding, in-house powder coating, and final assembly — full quality control from raw material to finished enclosure.
              </p>
              <p style={{ fontSize: '0.88rem', color: '#4a5568', marginTop: 12, lineHeight: 1.7 }}>
                ISO 9001 · ISO 45001 · OEM &amp; ODM capacity available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. MANUFACTURING PROCESS ── */}
      <section style={{ padding: '96px 0', background: '#1a1f2e', borderTop: '1px solid #2e3648' }}>
        <div className="container">
          <div style={{ marginBottom: 56 }}>
            <div className="section-label">How We Build</div>
            <h2 className="section-title">Integrated Manufacturing Process</h2>
            <p className="section-subtitle">
              Every enclosure passes through six in-house production stages before leaving the factory. No subcontracting on structural fabrication.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1 }}>
            {processSteps.map((s) => (
              <div key={s.n} style={{ background: '#252b3b', border: '1px solid #2e3648', padding: '28px 28px 28px 24px', borderLeft: '3px solid #2e3648', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 24, right: 24, fontSize: '1.8rem', fontWeight: 900, color: 'rgba(232,160,32,0.12)', lineHeight: 1, fontFamily: 'monospace' }}>{s.n}</div>
                <div style={{ fontSize: '0.72rem', color: '#e8a020', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Step {s.n}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e8eaf0', marginBottom: 10 }}>{s.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#8a94a6', lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FACTORY PHOTO STRIP ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: '#0d1117' }}>
        {['/images/factory/hero-factory-2.jpg', '/images/factory/factory-interior-2.jpg'].map((img, i) => (
          <div key={i} style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            height: 320,
          }} />
        ))}
      </div>

      {/* ── 7. CERTIFICATIONS (badge strip) ── */}
      <section style={{ background: '#111520', padding: '20px 0', borderTop: '1px solid #2e3648' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4a5568', marginRight: 8, whiteSpace: 'nowrap' }}>
              Standards
            </span>
            {['ISO 9001 : 2015', 'ISO 14001 : 2015', 'ISO 45001 : 2018', 'IP54 / IP65', 'EIA 19"'].map((cert) => (
              <div key={cert} style={{ padding: '6px 16px', border: '1px solid #2e3648', fontSize: '0.78rem', fontWeight: 600, color: '#6a7485', letterSpacing: '0.04em' }}>
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. INDUSTRIES ── */}
      <section style={{ padding: '80px 0', background: '#1a1f2e', borderTop: '1px solid #2e3648' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="section-label">Markets</div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>Who We Serve</h2>
              <p style={{ color: '#8a94a6', fontSize: '0.95rem', lineHeight: 1.8 }}>
                Primary export markets: Middle East &amp; Africa, Southeast Asia, Europe. Procurement managers, system integrators, and EPC contractors sourcing directly from the manufacturer.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {industries.map((ind) => (
                <div key={ind} style={{ padding: '12px 22px', background: '#252b3b', border: '1px solid #2e3648', fontSize: '0.88rem', color: '#c8d0de', fontWeight: 500 }}>
                  {ind}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. CERTIFICATES ── */}
      <section style={{ padding: '80px 0', background: '#111520', borderTop: '1px solid #2e3648' }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div className="section-label">Third-Party Audited</div>
            <h2 className="section-title">Quality &amp; Compliance Certifications</h2>
            <p className="section-subtitle" style={{ maxWidth: 560 }}>
              Issued by Beijing Head International Certification Co., Ltd. (CNAS C046-M). Valid through 2027-12-12.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="certs-grid">
            {[
              {
                img: '/images/certs/iso-9001.png',
                standard: 'ISO 9001 : 2015',
                title: 'Quality Management System',
                no: '04624Q15981R0S',
                scope: 'Sales of Metal Products, Electronic Components and Communication Equipment',
              },
              {
                img: '/images/certs/iso-14001.png',
                standard: 'ISO 14001 : 2015',
                title: 'Environmental Management System',
                no: '04624E12980R0S',
                scope: 'Sales of Metal Products, Electronic Components and Communication Equipment and Related Management Activities',
              },
              {
                img: '/images/certs/iso-45001.png',
                standard: 'ISO 45001 : 2018',
                title: 'Occupational Health & Safety Management System',
                no: '04624S12905R0S',
                scope: 'Sales of Metal Products, Electronic Components and Communication Equipment and Related Management Activities',
              },
            ].map((c) => (
              <div key={c.standard} style={{ background: '#1a1f2e', border: '1px solid #2e3648', overflow: 'hidden' }}>
                {/* Certificate thumbnail */}
                <div style={{ background: '#0d1117', borderBottom: '1px solid #2e3648', padding: '20px', display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={c.img}
                    alt={c.standard + ' Certificate — Sichuan Sanchuang Zhengteng Technology'}
                    style={{ width: '100%', maxWidth: 240, aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  />
                </div>
                {/* Info */}
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#e8a020', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                    {c.standard}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e8eaf0', marginBottom: 10, lineHeight: 1.3 }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#4a5568', fontFamily: 'monospace', marginBottom: 10 }}>
                    Cert No. {c.no}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#6a7485', lineHeight: 1.65 }}>
                    {c.scope}
                  </div>
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #2e3648', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#4a5568' }}>
                    <span>Issued: 2024-12-13</span>
                    <span>Valid: 2027-12-12</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Issuing body note */}
          <div style={{ marginTop: 20, padding: '14px 20px', background: '#1a1f2e', border: '1px solid #2e3648', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: '#4a5568', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Issued By</span>
            <span style={{ fontSize: '0.82rem', color: '#6a7485' }}>Beijing Head International Certification Co., Ltd. &nbsp;·&nbsp; CNAS Accredited (C046-M) &nbsp;·&nbsp; IAF MLA Signatory</span>
          </div>
        </div>
      </section>

      {/* ── 10. RFQ CTA ── */}
      <section style={{ background: '#0d1117', padding: '96px 0', borderTop: '3px solid #e8a020', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(#e8a020 1px, transparent 1px), linear-gradient(90deg, #e8a020 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center', flexWrap: 'wrap' }} className="cta-grid">
            <div>
              <div className="section-label">Get Started</div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', fontWeight: 900, color: '#e8eaf0', marginBottom: 16, lineHeight: 1.15 }}>
                Ready to Source?<br />Submit Your RFQ.
              </h2>
              <p style={{ color: '#8a94a6', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 480 }}>
                Share your project specifications — product type, quantity, target delivery. Engineering team responds within 48 hours with a formal quotation.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 240 }}>
              <Link href="/contact/" className="btn-primary" style={{ textAlign: 'center' }}>Submit RFQ →</Link>
              <a href="mailto:ztsc1030@gmail.com" style={{ textAlign: 'center', fontSize: '0.82rem', color: '#4a5568', padding: '8px 0', fontFamily: 'monospace' }}>
                ztsc1030@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  )
}

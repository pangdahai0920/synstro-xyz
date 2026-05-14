import Layout from '../components/Layout'
import Link from 'next/link'

const timeline = [
  { year: '2019', event: 'Founded in Chengdu, Sichuan. Commenced production of network cabinet enclosures.' },
  { year: '2020', event: 'Achieved ISO 9001 Quality Management System certification.' },
  { year: '2021', event: 'ISO 45001 Occupational Safety certification. Launched export operations on Alibaba International.' },
  { year: '2023', event: 'Expanded product lines to include BESS cabinet fabrication for C&I energy storage projects.' },
  { year: '2024', event: 'Established supply partnerships with system integrators in the Middle East and Africa.' },
]

const certifications = [
  { name: 'ISO 9001', desc: 'Quality Management System' },
  { name: 'ISO 45001', desc: 'Occupational Health & Safety' },
]

export default function About() {
  return (
    <Layout
      title="About Synstro – ISO 9001 Certified Enclosure Manufacturer"
      description="Founded 2019 in Chengdu, China. ISO 9001 & ISO 45001 certified manufacturer of BESS cabinets, server racks and PDU systems."
    >
      <section style={{ padding: '80px 0 60px', background: '#1a1f2e', borderBottom: '1px solid #2e3648' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="section-label">About Us</div>
          <h1 className="section-title">Built on Precision.<br />Proven in the Field.</h1>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#1e2535' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 60, alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '1.05rem', color: '#c8d0de', lineHeight: 1.85, marginBottom: 24 }}>
                Synstro is a China-based manufacturer specializing in industrial-grade enclosures and energy storage systems for mission-critical infrastructure projects across the Middle East and Africa.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#c8d0de', lineHeight: 1.85, marginBottom: 24 }}>
                Our product lines cover BESS (Battery Energy Storage System) cabinets, server rack enclosures, and PDU systems — all fabricated from SPCC cold-rolled steel with CNC precision bending and welding, powder-coated in-house to IP54/IP65 ingress protection standards.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#c8d0de', lineHeight: 1.85, marginBottom: 24 }}>
                We serve system integrators, EPC contractors, and data center procurement teams who require proven OEM/ODM manufacturing flexibility combined with verifiable production capability.
              </p>
              <p style={{ fontSize: '1.05rem', color: '#c8d0de', lineHeight: 1.85 }}>
                Every cabinet we ship is built to withstand demanding site environments — from desert heat to high-humidity coastal installations — without compromising structural integrity or thermal performance.
              </p>
              <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid #2e3648' }}>
                <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#e8a020', fontStyle: 'italic' }}>
                  "Our capacity. Your project timeline."
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: '#252b3b', border: '1px solid #2e3648', padding: 28 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e8a020', marginBottom: 20 }}>Company Facts</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    ['Founded', '2019'],
                    ['Headquarters', 'Chengdu, Sichuan, China'],
                    ['Legal Entity', 'Sichuan Sanchuang Zhengteng Technology Co., Ltd.'],
                    ['Certifications', 'ISO 9001 · ISO 45001'],
                    ['Capability', 'OEM & ODM'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ borderBottom: '1px solid #2e3648', paddingBottom: 12 }}>
                      <div style={{ fontSize: '0.75rem', color: '#4a5568', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
                      <div style={{ fontSize: '0.92rem', color: '#c8d0de', fontWeight: 500 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/contact/" className="btn-primary" style={{ textAlign: 'center' }}>Request a Quote</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#1a1f2e' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="section-label">History</div>
          <h2 className="section-title" style={{ marginBottom: 48 }}>Company Timeline</h2>
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: '#2e3648' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {timeline.map((t, i) => (
                <div key={t.year} style={{ display: 'flex', gap: 24, paddingBottom: 40, position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: -38, top: 4, width: 14, height: 14,
                    background: i === timeline.length - 1 ? '#e8a020' : '#2e3648',
                    border: '2px solid', borderColor: i === timeline.length - 1 ? '#e8a020' : '#4a5568',
                    borderRadius: '50%'
                  }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#e8a020', letterSpacing: '0.06em', marginBottom: 6 }}>{t.year}</div>
                    <div style={{ fontSize: '0.95rem', color: '#8a94a6', lineHeight: 1.7 }}>{t.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#111520', borderTop: '1px solid #2e3648' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="section-label" style={{ textAlign: 'center' }}>Standards</div>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>Certifications</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {certifications.map(c => (
              <div key={c.name} style={{
                background: '#252b3b', border: '1px solid #2e3648',
                padding: '32px 48px', textAlign: 'center', minWidth: 200
              }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#e8a020', marginBottom: 8 }}>{c.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#8a94a6' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  )
}

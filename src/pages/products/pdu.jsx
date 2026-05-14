import Layout from '../../components/Layout'
import Link from 'next/link'

const pduSeries = [
  {
    id: 'basic',
    tag: 'Basic PDU',
    title: 'Basic Rackmount PDU',
    subtitle: 'Non-metered, 1U horizontal rackmount — 8-Way to 24-Way',
    desc: 'Horizontal rackmount power distribution units for server rack and network cabinet applications. Cold-rolled steel housing with universal socket configurations. No metering — designed for simple, reliable power distribution.',
    products: [
      { model: 'PDU-8W-10A',  ports: '8-Way',  current: '10A', voltage: '100-250V AC', input: 'IEC C14 / C20', output: 'IEC C13 x8',  protection: 'Surge / Fuse', dim: '482x44x60 mm',  notes: '1U, horizontal mount, 0.5m inlet cable' },
      { model: 'PDU-8W-16A',  ports: '8-Way',  current: '16A', voltage: '100-250V AC', input: 'IEC C20',       output: 'IEC C13 x8',  protection: 'Surge / Fuse', dim: '482x44x60 mm',  notes: '1U, 16A heavy-duty version' },
      { model: 'PDU-12W-10A', ports: '12-Way', current: '10A', voltage: '100-250V AC', input: 'IEC C14',       output: 'IEC C13 x12', protection: 'Surge / Fuse', dim: '482x44x80 mm',  notes: '1U, extended 12-port layout' },
      { model: 'PDU-12W-16A', ports: '12-Way', current: '16A', voltage: '100-250V AC', input: 'IEC C20',       output: 'IEC C13 x12', protection: 'Surge / Fuse', dim: '482x44x80 mm',  notes: '1U, 16A' },
      { model: 'PDU-16W-16A', ports: '16-Way', current: '16A', voltage: '100-250V AC', input: 'IEC C20',       output: 'IEC C13 x16', protection: 'Surge / Fuse', dim: '482x44x100 mm', notes: '1U, 16-port high-density' },
      { model: 'PDU-24W-32A', ports: '24-Way', current: '32A', voltage: '100-250V AC', input: 'IEC C20',       output: 'IEC C13 x24', protection: 'Surge / Fuse', dim: '482x44x120 mm', notes: '1U, 32A three-phase compatible' },
    ],
  },
  {
    id: 'metered',
    tag: 'Metered PDU',
    title: 'Metered Rackmount PDU',
    subtitle: 'LED power metering — 8-Way to 16-Way',
    desc: 'Rackmount PDUs with front-panel LED display for real-time voltage, current, and power (kWh) monitoring. Ideal for data centre power audits and remote power management.',
    products: [
      { model: 'MPDU-8W-10A',  ports: '8-Way',  current: '10A', voltage: '100-250V AC', input: 'IEC C14', output: 'IEC C13 x8',  protection: 'Surge + LED meter', dim: '482x44x60 mm',  notes: 'Voltage/current display, 0.5m inlet cable' },
      { model: 'MPDU-8W-16A',  ports: '8-Way',  current: '16A', voltage: '100-250V AC', input: 'IEC C20', output: 'IEC C13 x8',  protection: 'Surge + LED meter', dim: '482x44x60 mm',  notes: '16A, kWh energy monitoring' },
      { model: 'MPDU-12W-16A', ports: '12-Way', current: '16A', voltage: '100-250V AC', input: 'IEC C20', output: 'IEC C13 x12', protection: 'Surge + LED meter', dim: '482x44x80 mm',  notes: 'Per-port LED indicator' },
      { model: 'MPDU-16W-32A', ports: '16-Way', current: '32A', voltage: '100-250V AC', input: 'IEC C20', output: 'IEC C13 x16', protection: 'Surge + LED meter + CB', dim: '482x44x100 mm', notes: '32A, circuit breaker protection, kWh display' },
    ],
  },
  {
    id: 'switched',
    tag: 'Switched PDU',
    title: 'Individually Switched PDU',
    subtitle: 'Per-port on/off switching',
    desc: 'Switched PDUs with individual port relay control. Remote power cycling via front-panel button. Suitable for unmanned server rooms and remote site power management.',
    products: [
      { model: 'SPDU-8W-10A',  ports: '8-Way',  current: '10A', voltage: '100-250V AC', input: 'IEC C14', output: 'IEC C13 x8',  protection: 'Surge + per-port switch', dim: '482x44x60 mm',  notes: 'Physical switch per port, LED status' },
      { model: 'SPDU-8W-16A',  ports: '8-Way',  current: '16A', voltage: '100-250V AC', input: 'IEC C20', output: 'IEC C13 x8',  protection: 'Surge + per-port switch', dim: '482x44x60 mm',  notes: '16A per-port switching' },
      { model: 'SPDU-16W-16A', ports: '16-Way', current: '16A', voltage: '100-250V AC', input: 'IEC C20', output: 'IEC C13 x16', protection: 'Surge + per-port switch + LED meter', dim: '482x44x100 mm', notes: 'Full metering + switching' },
    ],
  },
  {
    id: 'vertical',
    tag: 'Vertical 0U PDU',
    title: '0U Vertical PDU',
    subtitle: 'Side-mount installation — does not occupy rack U-space',
    desc: '0U vertical PDUs mount inside the side channel of 19-inch racks, preserving full rack U-space for equipment. Available in 12-Port and 24-Port configurations with mixed IEC C13/C19 output.',
    products: [
      { model: 'VPDU-12P-16A', ports: '12-Port', current: '16A', voltage: '100-250V AC', input: 'IEC C20', output: 'IEC C13 x12', protection: 'Surge + CB', dim: '1730x52x52 mm', notes: '0U vertical, fits standard 42U racks' },
      { model: 'VPDU-20P-32A', ports: '20-Port', current: '32A', voltage: '100-250V AC', input: 'IEC C20', output: 'IEC C13 x16 + C19 x4', protection: 'Surge + CB', dim: '1730x52x52 mm', notes: '0U vertical, mixed C13/C19' },
      { model: 'VPDU-24P-32A', ports: '24-Port', current: '32A', voltage: '100-250V AC', input: 'IEC C20', output: 'IEC C13 x20 + C19 x4', protection: 'Surge + CB + LED meter', dim: '1730x52x52 mm', notes: '0U vertical, full metering, 24-port high-density' },
    ],
  },
]

const specCols = ['Model', 'Ports', 'Current', 'Voltage', 'Input', 'Output', 'Protection', 'Dimensions', 'Notes']

const selectionGuide = [
  { type: 'Basic PDU', use: 'Standard power distribution, no monitoring required', current: '10A-32A', form: '1U horizontal' },
  { type: 'Metered PDU', use: 'Power auditing, energy monitoring, kWh tracking', current: '10A-32A', form: '1U horizontal' },
  { type: 'Switched PDU', use: 'Remote power cycling, per-port control', current: '10A-32A', form: '1U horizontal' },
  { type: 'Vertical 0U PDU', use: 'Space-critical racks, side-channel installation', current: '16A-32A', form: '0U vertical' },
]

const standards = [
  { label: 'Input Connectors', value: 'IEC 60320 C14 (10A) / IEC 60320 C20 (16A / 32A)' },
  { label: 'Output Connectors', value: 'IEC 60320 C13 / IEC 60320 C19' },
  { label: 'Voltage Range', value: '100-250V AC, 50/60Hz (auto-sensing)' },
  { label: 'Protection', value: 'Surge suppression / Overcurrent fuse/CB / EMI filtering' },
  { label: 'Rack Compatibility', value: '19-inch EIA-310-D standard / 1U horizontal / 0U vertical' },
  { label: 'OEM Options', value: 'Custom amperage, cable length, RAL colour, logo, connector region' },
]

export default function PDU() {
  return (
    <Layout
      title="Rackmount PDU Manufacturer – 8-Way to 24-Way, Basic Metered Switched | Synstro"
      description="19-inch rackmount PDU 8-Way to 24-Way. Basic, metered, switched, and vertical 0U configurations. IEC C13/C19 outputs. OEM/ODM for data centre and server rack power distribution."
    >
      {/* Hero */}
      <section style={{ padding: '80px 0 60px', background: '#1a1f2e', borderBottom: '1px solid #2e3648' }}>
        <div className="container">
          <div className="section-label">Products / PDU</div>
          <nav style={{ fontSize: '0.82rem', color: '#4a5568', marginBottom: 24 }}>
            <Link href="/" style={{ color: '#4a5568' }}>Home</Link>
            {' > '}
            <Link href="/products/" style={{ color: '#4a5568' }}>Products</Link>
            {' > '}Power Distribution Units
          </nav>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 16, lineHeight: 1.2 }}>
            Power Distribution Units (PDU)
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#8a94a6', maxWidth: 700, lineHeight: 1.75, marginBottom: 32 }}>
            19-inch rackmount PDUs in 8-Way to 24-Way configurations — basic, metered, switched, and vertical 0U. Steel housing, IEC C13/C19 outputs, surge protection standard. OEM/ODM with custom amperage and connector types.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['8-Way to 24-Way', 'IEC C13 / C19', 'Metered and Switched', '0U Vertical Option', 'OEM / ODM'].map(b => (
              <span key={b} style={{ padding: '6px 16px', background: '#252b3b', border: '1px solid #2e3648', fontSize: '0.82rem', color: '#8a94a6', fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Series navigation */}
      <section style={{ background: '#111520', borderBottom: '1px solid #2e3648', overflowX: 'auto' }}>
        <div className="container" style={{ display: 'flex' }}>
          {pduSeries.map(s => (
            <a key={s.id} href={'#' + s.id} className="series-tab">{s.tag}</a>
          ))}
        </div>
      </section>

      {/* Selection Guide */}
      <section style={{ background: '#111520', padding: '60px 0', borderBottom: '1px solid #2e3648' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e8eaf0', marginBottom: 24 }}>PDU Type Selection Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {selectionGuide.map(g => (
              <div key={g.type} style={{ background: '#1a1f2e', border: '1px solid #2e3648', padding: '20px' }}>
                <div style={{ fontWeight: 700, color: '#e8a020', fontSize: '0.9rem', marginBottom: 8 }}>{g.type}</div>
                <div style={{ color: '#8a94a6', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: 10 }}>{g.use}</div>
                <div style={{ fontSize: '0.8rem', color: '#4a5568' }}>Current: {g.current} / Form: {g.form}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Series */}
      {pduSeries.map((s, si) => (
        <section key={s.id} id={s.id} style={{ padding: '80px 0', background: si % 2 === 0 ? '#1a1f2e' : '#1e2535', borderBottom: '1px solid #2e3648' }}>
          <div className="container">
            <div style={{ marginBottom: 40 }}>
              <span style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(232,160,32,0.12)', color: '#e8a020', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{s.tag}</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 6 }}>{s.title}</h2>
              <div style={{ color: '#e8a020', fontSize: '0.9rem', fontWeight: 600, marginBottom: 12 }}>{s.subtitle}</div>
              <p style={{ fontSize: '0.95rem', color: '#8a94a6', maxWidth: 700, lineHeight: 1.75 }}>{s.desc}</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#111520' }}>
                    {specCols.map(col => (
                      <th key={col} style={{ padding: '12px 16px', textAlign: 'left', color: '#e8a020', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '2px solid #2e3648', whiteSpace: 'nowrap' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.products.map((p, i) => (
                    <tr key={p.model} className="spec-row" style={{ background: i % 2 === 0 ? '#252b3b' : '#1e2535', borderBottom: '1px solid #2e3648' }}>
                      <td style={{ padding: '14px 16px', color: '#e8eaf0', fontWeight: 700, whiteSpace: 'nowrap' }}>{p.model}</td>
                      <td style={{ padding: '14px 16px', color: '#e8a020', fontWeight: 600, whiteSpace: 'nowrap' }}>{p.ports}</td>
                      <td style={{ padding: '14px 16px', color: '#c8d0de', whiteSpace: 'nowrap' }}>{p.current}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', whiteSpace: 'nowrap' }}>{p.voltage}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', whiteSpace: 'nowrap' }}>{p.input}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6' }}>{p.output}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6' }}>{p.protection}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', whiteSpace: 'nowrap', fontFamily: 'monospace', fontSize: '0.83rem' }}>{p.dim}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', fontSize: '0.82rem' }}>{p.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* Standards */}
      <section style={{ background: '#111520', padding: '60px 0', borderBottom: '1px solid #2e3648' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#e8eaf0', marginBottom: 24 }}>Standards and Compatibility</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {standards.map(item => (
              <div key={item.label} style={{ borderLeft: '3px solid #e8a020', paddingLeft: 16 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e8a020', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#8a94a6', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RFQ CTA */}
      <section style={{ background: '#0d1117', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="section-label">Custom Orders</div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 16 }}>
                Custom Amperage, Connector Type, or Private Label?
              </h2>
              <p style={{ color: '#8a94a6', fontSize: '1rem', lineHeight: 1.7, maxWidth: 600 }}>
                OEM PDU production available from 100 units. Custom inlet/outlet connector types, cable lengths, surge ratings, and branding. Provide your spec sheet — quotation within 48 hours.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 200 }}>
              <Link href="/contact/" className="btn-primary" style={{ textAlign: 'center' }}>Submit RFQ</Link>
              <a href="mailto:ztsc1030@gmail.com" style={{ textAlign: 'center', fontSize: '0.85rem', color: '#8a94a6', padding: '8px 0' }}>ztsc1030@gmail.com</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

import Layout from '../../components/Layout'
import Link from 'next/link'

const bessSeries = [
  {
    id: 'outdoor-bess',
    tag: 'Outdoor BESS',
    title: 'Outdoor Battery Energy Storage Cabinet',
    desc: 'IP54-rated freestanding enclosures for outdoor BESS installations. SPCC 2.0mm cold-rolled steel, electrostatic powder coating, internal battery module slots with bus-bar access, and integrated ventilation/thermal management ports.',
    products: [
      { model: 'BESS-50kWh-OD',  capacity: '50 kWh',  dims: '800x1000x1900 mm', steel: 'SPCC 2.0mm', ip: 'IP54', thermal: 'Natural ventilation', finish: 'Epoxy powder, RAL 7035', notes: 'Single-door, 1x50kWh module bay' },
      { model: 'BESS-100kWh-OD', capacity: '100 kWh', dims: '1000x1000x2100 mm', steel: 'SPCC 2.0mm', ip: 'IP54', thermal: 'Forced ventilation (fans)', finish: 'Epoxy powder, RAL 7035', notes: 'Double-door, 2x50kWh module bays' },
      { model: 'BESS-200kWh-OD', capacity: '200 kWh', dims: '2000x1000x2200 mm', steel: 'SPCC 2.0mm', ip: 'IP54', thermal: 'Forced ventilation + thermostat', finish: 'Epoxy powder, RAL 7035', notes: '4x50kWh module bays, cable tray integrated' },
    ],
  },
  {
    id: 'container-bess',
    tag: 'Container-Type',
    title: 'Container-Type BESS Enclosure',
    desc: 'Containerised battery storage enclosures compatible with 20ft and 40ft ISO frame dimensions. Suitable for C&I and utility-scale BESS projects. Custom bus-bar layout, cable entry, and HVAC interface per project specification.',
    products: [
      { model: 'BESS-500kWh-CT', capacity: '500 kWh', dims: '6058x2438x2591 mm (20ft)', steel: 'SPCC 3.0mm + structural frame', ip: 'IP54', thermal: 'HVAC interface (customer-supplied)', finish: 'RAL 9005 black / custom', notes: 'ISO 20ft frame compatible, 10x50kWh bays' },
      { model: 'BESS-1MWh-CT',   capacity: '1 MWh',   dims: '12192x2438x2591 mm (40ft)', steel: 'SPCC 3.0mm + structural frame', ip: 'IP54', thermal: 'HVAC interface (customer-supplied)', finish: 'RAL 9005 black / custom', notes: 'ISO 40ft frame, 20x50kWh bays, PCS interface panel' },
    ],
  },
  {
    id: 'indoor-bess',
    tag: 'Indoor BESS',
    title: 'Indoor Battery Energy Storage Cabinet',
    desc: 'Wall-mount and freestanding indoor BESS enclosures for commercial and C&I applications. Designed for LiFePO4 and NMC module integration. Includes bus-bar compartment, BMS wiring tray, and lockable front access panel.',
    products: [
      { model: 'BESS-10kWh-IN', capacity: '10 kWh', dims: '600x600x1200 mm', steel: 'SPCC 1.5mm', ip: 'IP20', thermal: 'Passive / side vents', finish: 'Powder coat, RAL 7016', notes: 'Freestanding, 1x10kWh module bay, BMS compartment' },
      { model: 'BESS-20kWh-IN', capacity: '20 kWh', dims: '600x700x1600 mm', steel: 'SPCC 1.5mm', ip: 'IP20', thermal: 'Passive + optional fan tray', finish: 'Powder coat, RAL 7016', notes: 'Freestanding, 2x10kWh bays' },
      { model: 'BESS-WM-5kWh',  capacity: '5 kWh',  dims: '600x250x900 mm',  steel: 'SPCC 1.2mm', ip: 'IP20', thermal: 'Passive', finish: 'Powder coat, white/black', notes: 'Wall-mount, residential / small C&I' },
    ],
  },
]

const bessCols = ['Model', 'Capacity', 'Dimensions (W x D x H)', 'Steel Gauge', 'IP Rating', 'Thermal Management', 'Finish', 'Notes']

const techHighlights = [
  { title: 'SPCC Cold-Rolled Steel', desc: '1.2-3.0mm SPCC structural steel. CNC laser-cut, precision-bent to ±0.5mm tolerance. No brittle weld seams on load-bearing panels.' },
  { title: 'IP54 / IP65 Rating', desc: 'Dust-tight and splash-proof gasket sealing on all door frames and cable entry glands. Certified test reports available for procurement.' },
  { title: 'In-House Powder Coating', desc: 'Electrostatic powder coat in any RAL colour. 80-100 micron film thickness, salt-spray tested to 500 hours. Suitable for coastal and desert environments.' },
  { title: 'OEM / ODM Engineering', desc: 'Custom bus-bar layout, cable entry patterns, BMS compartment sizing, and branding. DXF drawing review within 5 business days.' },
  { title: 'Documentation Package', desc: 'Material certificates (SPCC mill certificates), coating thickness reports, dimensional inspection reports, and packing list per shipment.' },
  { title: 'Export Experience', desc: 'Shipped to Middle East, Africa, Southeast Asia, and Europe. FCL and LCL consolidation. CIF / FOB / EXW terms available.' },
]

export default function BESSCabinet() {
  return (
    <Layout
      title="BESS Cabinet Manufacturer – Outdoor IP54, Container-Type, Indoor | Synstro"
      description="Battery energy storage system (BESS) enclosures — outdoor IP54, container-type 20ft/40ft, and indoor cabinets. SPCC 2.0mm steel, powder-coated. OEM/ODM for EPC and system integrators."
    >
      {/* Hero */}
      <section style={{ padding: '80px 0 60px', background: '#1a1f2e', borderBottom: '1px solid #2e3648' }}>
        <div className="container">
          <div className="section-label">Products / BESS Cabinets</div>
          <nav style={{ fontSize: '0.82rem', color: '#4a5568', marginBottom: 24 }}>
            <Link href="/" style={{ color: '#4a5568' }}>Home</Link>
            {' > '}
            <Link href="/products/" style={{ color: '#4a5568' }}>Products</Link>
            {' > '}BESS Cabinets
          </nav>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 16, lineHeight: 1.2 }}>
            Battery Energy Storage System (BESS) Cabinets
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#8a94a6', maxWidth: 700, lineHeight: 1.75, marginBottom: 32 }}>
            Structural enclosures for BESS installations — outdoor IP54 freestanding, ISO container-type, and indoor configurations. SPCC cold-rolled steel, in-house powder coating, custom bus-bar and cable entry layouts. Designed for EPC contractors, system integrators, and C&I project developers.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['SPCC 2.0-3.0mm Steel', 'IP54 / IP65 Rated', 'ISO Container Compatible', '10 kWh to 1 MWh+', 'OEM / ODM'].map(b => (
              <span key={b} style={{ padding: '6px 16px', background: '#252b3b', border: '1px solid #2e3648', fontSize: '0.82rem', color: '#8a94a6', fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Series nav */}
      <section style={{ background: '#111520', borderBottom: '1px solid #2e3648', overflowX: 'auto' }}>
        <div className="container" style={{ display: 'flex' }}>
          {bessSeries.map(s => (
            <a key={s.id} href={'#' + s.id} className="series-tab">{s.tag}</a>
          ))}
        </div>
      </section>

      {/* Product Series */}
      {bessSeries.map((s, si) => (
        <section key={s.id} id={s.id} style={{ padding: '80px 0', background: si % 2 === 0 ? '#1a1f2e' : '#1e2535', borderBottom: '1px solid #2e3648' }}>
          <div className="container">
            <div style={{ marginBottom: 40 }}>
              <span style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(232,160,32,0.12)', color: '#e8a020', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{s.tag}</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 12 }}>{s.title}</h2>
              <p style={{ fontSize: '0.95rem', color: '#8a94a6', maxWidth: 700, lineHeight: 1.75 }}>{s.desc}</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#111520' }}>
                    {bessCols.map(col => (
                      <th key={col} style={{ padding: '12px 16px', textAlign: 'left', color: '#e8a020', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '2px solid #2e3648', whiteSpace: 'nowrap' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.products.map((p, i) => (
                    <tr key={p.model} className="spec-row" style={{ background: i % 2 === 0 ? '#252b3b' : '#1e2535', borderBottom: '1px solid #2e3648' }}>
                      <td style={{ padding: '14px 16px', color: '#e8eaf0', fontWeight: 700, whiteSpace: 'nowrap' }}>{p.model}</td>
                      <td style={{ padding: '14px 16px', color: '#e8a020', fontWeight: 700, whiteSpace: 'nowrap' }}>{p.capacity}</td>
                      <td style={{ padding: '14px 16px', color: '#c8d0de', fontFamily: 'monospace', fontSize: '0.83rem', whiteSpace: 'nowrap' }}>{p.dims}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', whiteSpace: 'nowrap' }}>{p.steel}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ display: 'inline-block', padding: '3px 10px', background: 'rgba(232,160,32,0.12)', color: '#e8a020', fontSize: '0.82rem', fontWeight: 700 }}>{p.ip}</span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', fontSize: '0.87rem' }}>{p.thermal}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', fontSize: '0.87rem' }}>{p.finish}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', fontSize: '0.82rem' }}>{p.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* Technical Highlights */}
      <section style={{ background: '#111520', padding: '80px 0', borderBottom: '1px solid #2e3648' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="section-label">Manufacturing Capability</div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#e8eaf0' }}>Why Procure BESS Enclosures from Synstro?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {techHighlights.map(h => (
              <div key={h.title} style={{ background: '#1a1f2e', border: '1px solid #2e3648', padding: '28px', borderTop: '3px solid #e8a020' }}>
                <div style={{ fontWeight: 700, color: '#e8eaf0', marginBottom: 8, fontSize: '1rem' }}>{h.title}</div>
                <div style={{ color: '#8a94a6', fontSize: '0.9rem', lineHeight: 1.7 }}>{h.desc}</div>
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
              <div className="section-label">Project RFQ</div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 16 }}>
                Custom BESS Enclosure for Your Project?
              </h2>
              <p style={{ color: '#8a94a6', fontSize: '1rem', lineHeight: 1.7, maxWidth: 640 }}>
                Send us your project capacity (kWh), battery module dimensions, IP requirement, and installation environment. We will provide a structural design proposal, DXF drawing, and EXW quotation within 5 business days.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 200 }}>
              <Link href="/contact/" className="btn-primary" style={{ textAlign: 'center' }}>Submit Project RFQ</Link>
              <a href="mailto:ztsc1030@gmail.com" style={{ textAlign: 'center', fontSize: '0.85rem', color: '#8a94a6', padding: '8px 0' }}>ztsc1030@gmail.com</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

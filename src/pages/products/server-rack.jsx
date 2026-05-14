import Layout from '../../components/Layout'
import Link from 'next/link'

const series = [
  {
    id: 'wall-box',
    tag: 'Wall-Mount Box',
    title: 'Wall-Mount Network Box',
    desc: 'Compact wall-mount enclosures for small switch and patch panel installations. SPCC steel construction, 0.5–0.8mm thickness.',
    products: [
      { model: 'WNV-2U', size: '530×120×350 mm', volume: '0.028 CBM', material: 'SPCC 0.5–0.8mm', door: 'Steel / Perforated', color: 'Black / Grey-White', notes: 'Welded, non-disassemblable' },
      { model: 'WNV-4U', size: '530×210×350 mm', volume: '0.047 CBM', material: 'SPCC 0.5–0.8mm', door: 'Steel / Perforated', color: 'Black / Grey-White', notes: 'Welded, non-disassemblable' },
      { model: 'WN-4U',  size: '520×400×210 mm', volume: '0.011 CBM', material: 'SPCC 0.5–0.8mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: '4 mounting profiles, movable side panels' },
      { model: 'WN-6U',  size: '520×400×300 mm', volume: '0.016 CBM', material: 'SPCC 0.5–0.8mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: 'Shelf x1 included' },
      { model: 'WN-9U',  size: '520×400×450 mm', volume: '0.017 CBM', material: 'SPCC 0.5–0.8mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: 'Shelf x1 included' },
      { model: 'WN-12U', size: '520×400×600 mm', volume: '0.034 CBM', material: 'SPCC 0.5–0.8mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: 'Shelf x1 included' },
    ],
  },
  {
    id: 'wall-cabinet',
    tag: 'Wall-Mount Cabinet',
    title: 'Wall-Mount Network Cabinet (WL Series)',
    desc: '19-inch wall-mount cabinets with 1.0mm mounting columns and 0.6mm body steel. Movable side panels for flexible cable routing.',
    products: [
      { model: 'WL-6U',  size: '600×450×368 mm', volume: '0.050 CBM', material: 'SPCC 1.0/0.6mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: '4 mounting profiles, movable side panels' },
      { model: 'WL-9U',  size: '600×450×500 mm', volume: '0.068 CBM', material: 'SPCC 1.0/0.6mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: '4 mounting profiles, movable side panels' },
      { model: 'WL-12U', size: '600×450×635 mm', volume: '0.086 CBM', material: 'SPCC 1.0/0.6mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: '4 mounting profiles, movable side panels' },
      { model: 'WL-15U', size: '600×450×770 mm', volume: '0.104 CBM', material: 'SPCC 1.0/0.6mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: '4 mounting profiles, movable side panels' },
      { model: 'WL-18U', size: '600×600×905 mm', volume: '0.130 CBM', material: 'SPCC 1.0/0.6mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: 'Deep version, 600mm depth' },
    ],
  },
  {
    id: 'floor-600',
    tag: 'Floor-Standing 600mm',
    title: 'Floor-Standing Network Cabinet — Depth 600mm',
    desc: 'Standard 19-inch floor-standing cabinets, 600mm depth. Suitable for network equipment, patch panels, and light server loads.',
    products: [
      { model: 'NL-18U-600', size: '600×600×1000 mm', volume: '0.072 CBM', material: 'SPCC 1.2/0.8mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: 'Caster wheels included' },
      { model: 'NL-22U-600', size: '600×600×1155 mm', volume: '0.083 CBM', material: 'SPCC 1.2/0.8mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: 'Caster wheels included' },
      { model: 'NL-27U-600', size: '600×600×1400 mm', volume: '0.101 CBM', material: 'SPCC 1.2/0.8mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: 'Caster wheels included' },
      { model: 'NL-32U-600', size: '600×600×1600 mm', volume: '0.115 CBM', material: 'SPCC 1.2/0.8mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: 'Caster wheels included' },
      { model: 'NL-37U-600', size: '600×600×1800 mm', volume: '0.130 CBM', material: 'SPCC 1.2/0.8mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: 'Caster wheels included' },
      { model: 'NL-42U-600', size: '600×600×2000 mm', volume: '0.144 CBM', material: 'SPCC 1.2/0.8mm', door: 'Tempered Glass / Perforated', color: 'Black / Grey-White', notes: 'Caster wheels included' },
    ],
  },
  {
    id: 'floor-deep',
    tag: 'Floor-Standing 800-1000mm',
    title: 'Floor-Standing Network Cabinet — Depth 800–1000mm',
    desc: 'Deep-depth floor-standing cabinets for full-size server installations. Available in 800mm, 900mm, and 1000mm depth configurations.',
    products: [
      { model: 'NL-32U-800',  size: '600×800×1600 mm',  volume: '0.154 CBM', material: 'SPCC 1.2/1.0mm', door: 'Perforated front and rear', color: 'Black / Grey-White', notes: '800mm depth, dual-rail cable management' },
      { model: 'NL-37U-800',  size: '600×800×1800 mm',  volume: '0.173 CBM', material: 'SPCC 1.2/1.0mm', door: 'Perforated front and rear', color: 'Black / Grey-White', notes: '800mm depth' },
      { model: 'NL-42U-800',  size: '600×800×2000 mm',  volume: '0.192 CBM', material: 'SPCC 1.2/1.0mm', door: 'Perforated front and rear', color: 'Black / Grey-White', notes: '800mm depth' },
      { model: 'NL-42U-1000', size: '600×1000×2000 mm', volume: '0.240 CBM', material: 'SPCC 1.2/1.0mm', door: 'Perforated front and rear', color: 'Black / Grey-White', notes: '1000mm depth, heavy-duty server rack' },
      { model: 'NL-47U-1000', size: '600×1000×2200 mm', volume: '0.264 CBM', material: 'SPCC 1.2/1.0mm', door: 'Perforated front and rear', color: 'Black / Grey-White', notes: '1000mm depth' },
    ],
  },
  {
    id: 'server',
    tag: 'Server Cabinet',
    title: 'Server Cabinet (Heavy-Duty)',
    desc: 'Reinforced server cabinets with 1.5–2.0mm structural steel, designed for high-density server and storage equipment.',
    products: [
      { model: 'SC-37U', size: '600×1000×1800 mm', volume: '0.216 CBM', material: 'SPCC 2.0/1.5mm', door: 'Perforated mesh front and rear', color: 'Black', notes: 'Load capacity 1000kg, 4-point leveling feet' },
      { model: 'SC-42U', size: '600×1000×2000 mm', volume: '0.240 CBM', material: 'SPCC 2.0/1.5mm', door: 'Perforated mesh front and rear', color: 'Black', notes: 'Load capacity 1000kg, 4-point leveling feet' },
      { model: 'SC-45U', size: '600×1000×2133 mm', volume: '0.256 CBM', material: 'SPCC 2.0/1.5mm', door: 'Perforated mesh front and rear', color: 'Black', notes: 'Load capacity 1200kg' },
      { model: 'SC-47U', size: '600×1000×2200 mm', volume: '0.264 CBM', material: 'SPCC 2.0/1.5mm', door: 'Perforated mesh front and rear', color: 'Black', notes: 'Load capacity 1200kg' },
    ],
  },
  {
    id: 'outdoor',
    tag: 'Outdoor Waterproof',
    title: 'Outdoor Waterproof Cabinet',
    desc: 'IP55-rated outdoor enclosures for telecom, surveillance, and field deployment. Wall-mount and floor-standing options with integrated air conditioning available.',
    products: [
      { model: 'OW-WM-6U',  size: '600×450×450 mm',  volume: '0.122 CBM', material: 'SPCC 1.5mm', door: 'IP55 sealed steel door', color: 'Grey / Custom RAL', notes: 'Wall-mount, IP55, weatherproof seal' },
      { model: 'OW-WM-9U',  size: '600×450×585 mm',  volume: '0.159 CBM', material: 'SPCC 1.5mm', door: 'IP55 sealed steel door', color: 'Grey / Custom RAL', notes: 'Wall-mount, IP55' },
      { model: 'OW-FS-18U', size: '600×600×1000 mm', volume: '0.180 CBM', material: 'SPCC 1.5mm', door: 'IP55 sealed steel door', color: 'Grey / Custom RAL', notes: 'Floor-standing, IP55, ventilation fans' },
      { model: 'OW-FS-27U', size: '600×600×1400 mm', volume: '0.252 CBM', material: 'SPCC 1.5mm', door: 'IP55 sealed steel door', color: 'Grey / Custom RAL', notes: 'Floor-standing, IP55' },
      { model: 'OW-AC-27U', size: '700×600×1400 mm', volume: '0.294 CBM', material: 'SPCC 1.5mm', door: 'IP55 with AC unit', color: 'Grey / Custom RAL', notes: 'Integrated air conditioning, thermostat control' },
    ],
  },
]

const specCols = ['Model', 'Dimensions (W x D x H)', 'Volume', 'Material', 'Door Options', 'Color', 'Notes']

export default function ServerRack() {
  return (
    <Layout
      title="Server Rack Manufacturer – 6U to 47U Floor and Wall Mount | Synstro"
      description="19-inch server rack enclosures, 6U to 47U. SPCC cold-rolled steel, IP54/IP55 rated, powder-coated. Wall-mount, floor-standing, outdoor and server cabinet variants. OEM/ODM."
    >
      {/* Hero */}
      <section style={{ padding: '80px 0 60px', background: '#1a1f2e', borderBottom: '1px solid #2e3648' }}>
        <div className="container">
          <div className="section-label">Products / Server Racks</div>
          <nav style={{ fontSize: '0.82rem', color: '#4a5568', marginBottom: 24 }}>
            <Link href="/" style={{ color: '#4a5568' }}>Home</Link>
            {' > '}
            <Link href="/products/" style={{ color: '#4a5568' }}>Products</Link>
            {' > '}Server Racks
          </nav>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 16, lineHeight: 1.2 }}>
            Server Rack Enclosures
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#8a94a6', maxWidth: 700, lineHeight: 1.75, marginBottom: 32 }}>
            19-inch rack enclosures from 6U to 47U — wall-mount network boxes, floor-standing cabinets, heavy-duty server racks, and IP55-rated outdoor enclosures. All fabricated from SPCC cold-rolled steel with in-house powder coating. OEM/ODM available.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['SPCC Cold-Rolled Steel', 'CNC Precision Bending', 'IP55 Outdoor Option', 'OEM / ODM', 'ISO 9001 Certified'].map(b => (
              <span key={b} style={{ padding: '6px 16px', background: '#252b3b', border: '1px solid #2e3648', fontSize: '0.82rem', color: '#8a94a6', fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Series navigation */}
      <section style={{ background: '#111520', borderBottom: '1px solid #2e3648', overflowX: 'auto' }}>
        <div className="container" style={{ display: 'flex' }}>
          {series.map(s => (
            <a key={s.id} href={'#' + s.id} className="series-tab">{s.tag}</a>
          ))}
        </div>
      </section>

      {/* Product Series Sections */}
      {series.map((s, si) => (
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
                    {specCols.map(col => (
                      <th key={col} style={{ padding: '12px 16px', textAlign: 'left', color: '#e8a020', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '2px solid #2e3648', whiteSpace: 'nowrap' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.products.map((p, i) => (
                    <tr key={p.model} className="spec-row" style={{ background: i % 2 === 0 ? '#252b3b' : '#1e2535', borderBottom: '1px solid #2e3648' }}>
                      <td style={{ padding: '14px 16px', color: '#e8eaf0', fontWeight: 700, whiteSpace: 'nowrap' }}>{p.model}</td>
                      <td style={{ padding: '14px 16px', color: '#c8d0de', whiteSpace: 'nowrap', fontFamily: 'monospace', fontSize: '0.85rem' }}>{p.size}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', whiteSpace: 'nowrap' }}>{p.volume}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', whiteSpace: 'nowrap' }}>{p.material}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6' }}>{p.door}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', whiteSpace: 'nowrap' }}>{p.color}</td>
                      <td style={{ padding: '14px 16px', color: '#8a94a6', fontSize: '0.82rem' }}>{p.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* OEM / RFQ CTA */}
      <section style={{ background: '#0d1117', padding: '80px 0', borderTop: '1px solid #2e3648' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="section-label">Custom Orders</div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 16 }}>
                Non-Standard Dimensions? OEM Branding?
              </h2>
              <p style={{ color: '#8a94a6', fontSize: '1rem', lineHeight: 1.7, maxWidth: 600 }}>
                Custom rack dimensions, RAL colour matching, logo silk-screen printing, and modified cable entry points are all available. Submit your RFQ with dimensions and quantity — engineering response within 48 hours.
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

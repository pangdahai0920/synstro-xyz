import { useState, useEffect, useCallback } from 'react'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { pduTypes, pduConfig, getPduBySlug } from '../../../data/pdu'

// ── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 28,
          background: 'none', border: 'none', color: '#e8eaf0',
          fontSize: '2rem', cursor: 'pointer', lineHeight: 1, padding: 0,
        }}
      >×</button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', cursor: 'default', boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
      />
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: pduTypes.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const product = getPduBySlug(params.slug)
  if (!product) return { notFound: true }
  return { props: { product } }
}

// ── SKU Configurator ───────────────────────────────────────────────────────
function PduConfigurator({ product }) {
  const [selectedWay, setSelectedWay]       = useState(pduConfig.ways[1].value)    // default 8-Way
  const [selectedAmp, setSelectedAmp]       = useState(pduConfig.amperes[3].value) // default 16A
  const [selectedMods, setSelectedMods]     = useState(['switch', 'spd'])          // default Switch+SPD

  const toggleMod = (val) => {
    setSelectedMods(prev =>
      prev.includes(val) ? prev.filter(m => m !== val) : [...prev, val]
    )
  }

  const wayLabel  = pduConfig.ways.find(w => w.value === selectedWay)?.label || selectedWay
  const modsLabel = selectedMods.length
    ? pduConfig.modules.filter(m => selectedMods.includes(m.value)).map(m => m.label).join(' + ')
    : 'Base unit (no add-ons)'

  const configSummary = `${wayLabel} | ${selectedAmp} | ${modsLabel}`

  const mailSubject = encodeURIComponent(`PDU Inquiry: ${product.name} — ${configSummary}`)
  const mailBody = encodeURIComponent(
    `Hi Synstro,\n\nI am interested in the following PDU configuration:\n\n` +
    `Type: ${product.name}\n` +
    `Standard: ${product.standard}\n` +
    `Ways/Ports: ${wayLabel}\n` +
    `Ampere Rating: ${selectedAmp}\n` +
    `Add-on Modules: ${modsLabel}\n\n` +
    `Required quantity:\nTarget delivery:\nProject/application details:\n\nPlease send your best quote.`
  )

  return (
    <div>
      {/* Ways / Ports */}
      <div style={{ marginBottom: 28 }}>
        <div style={labelStyle}>Ways / Ports</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {pduConfig.ways.map(w => (
            <button key={w.value} onClick={() => setSelectedWay(w.value)} style={btnStyle(w.value === selectedWay)}>
              {w.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ampere */}
      <div style={{ marginBottom: 28 }}>
        <div style={labelStyle}>Ampere Rating</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {pduConfig.amperes.map(a => (
            <button key={a.value} onClick={() => setSelectedAmp(a.value)} style={btnStyle(a.value === selectedAmp)}>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add-on modules (multi-select) */}
      <div style={{ marginBottom: 32 }}>
        <div style={labelStyle}>Add-on Modules <span style={{ color: '#4a5568', fontWeight: 400, fontSize: '0.75rem' }}>(select all that apply)</span></div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {pduConfig.modules.map(m => (
            <button key={m.value} onClick={() => toggleMod(m.value)} style={btnStyle(selectedMods.includes(m.value))} title={m.desc}>
              {m.label}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#4a5568', marginTop: 6 }}>Hover each module to see description. Modules can be combined.</div>
      </div>

      {/* Config summary */}
      <div style={{ padding: '14px 16px', background: '#111520', border: '1px solid #2e3648', marginBottom: 28 }}>
        <div style={{ fontSize: '0.75rem', color: '#4a5568', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Your Configuration</div>
        <div style={{ fontSize: '0.9rem', color: '#e8eaf0', fontWeight: 600 }}>{configSummary}</div>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a
          href={`mailto:ztsc1030@gmail.com?subject=${mailSubject}&body=${mailBody}`}
          style={{ display: 'inline-block', padding: '14px 32px', background: '#e8a020', color: '#000', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.05em' }}
        >
          Request Quote for This Config &rarr;
        </a>
        <Link href="/contact/" style={{ display: 'inline-block', padding: '14px 28px', border: '1px solid #2e3648', color: '#8a94a6', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
          Submit RFQ Form
        </Link>
      </div>
      <p style={{ fontSize: '0.78rem', color: '#4a5568', marginTop: 12, lineHeight: 1.6 }}>
        Ex-works Chengdu. MOQ, lead time, and freight on request. Custom cable length, plug type, and branding available.
      </p>
    </div>
  )
}

const labelStyle = {
  fontSize: '0.78rem', color: '#8a94a6', fontWeight: 600,
  letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10,
}
const btnStyle = (active) => ({
  padding: '8px 18px',
  border: active ? '2px solid #e8a020' : '1px solid #2e3648',
  background: active ? 'rgba(232,160,32,0.1)' : '#1a1f2e',
  color: active ? '#e8a020' : '#8a94a6',
  fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
  letterSpacing: '0.04em', transition: 'all 0.15s',
})

// ── Page ──────────────────────────────────────────────────────────────────
export default function PduDetail({ product }) {
  const [lightbox, setLightbox] = useState(false)
  const closeLightbox = useCallback(() => setLightbox(false), [])
  return (
    <Layout
      title={product.name + ' — Configurable Rack PDU | Synstro'}
      description={product.name + '. ' + product.standard + '. Configurable: 6/8/10-Way, 10–20A, Switch/SPD/Overload. OEM/ODM. Contact Synstro.'}
    >
      {/* Breadcrumb */}
      <div style={{ background: '#111520', padding: '12px 0', borderBottom: '1px solid #2e3648' }}>
        <div className="container" style={{ fontSize: '0.82rem', color: '#4a5568' }}>
          <Link href="/" style={{ color: '#4a5568' }}>Home</Link>{' > '}
          <Link href="/products/" style={{ color: '#4a5568' }}>Products</Link>{' > '}
          <Link href="/products/pdu/" style={{ color: '#4a5568' }}>PDU</Link>{' > '}
          <span style={{ color: '#8a94a6' }}>{product.shortName}</span>
        </div>
      </div>

      {/* Main */}
      <section style={{ padding: '60px 0', background: '#1a1f2e' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 420px) 1fr', gap: 48, alignItems: 'start' }} className="detail-grid">

            {/* LEFT — image (click to enlarge) */}
            <div
              onClick={() => setLightbox(true)}
              style={{ background: '#252b3b', border: '1px solid #2e3648', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, aspectRatio: '1', cursor: 'zoom-in', position: 'relative' }}
            >
              <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              <span style={{ position: 'absolute', bottom: 10, right: 12, fontSize: '0.7rem', color: '#4a5568', fontWeight: 600, letterSpacing: '0.06em', pointerEvents: 'none' }}>
                CLICK TO ENLARGE
              </span>
            </div>
            {lightbox && <Lightbox src={product.image} alt={product.name} onClose={closeLightbox} />}

            {/* RIGHT */}
            <div>
              <div style={{ fontSize: '0.82rem', color: '#e8a020', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                Power Distribution Unit
              </div>
              <h1 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 4 }}>
                {product.name}
              </h1>
              <div style={{ color: '#8a94a6', fontSize: '0.9rem', marginBottom: 8 }}>{product.standard}</div>
              <div style={{ color: '#8a94a6', fontSize: '0.85rem', marginBottom: 4 }}>
                <span style={{ color: '#4a5568' }}>Input plug:</span> {product.plug}
              </div>
              <div style={{ color: '#8a94a6', fontSize: '0.85rem', marginBottom: 32 }}>
                <span style={{ color: '#4a5568' }}>Voltage note:</span> {product.voltageNote}
              </div>

              {/* Configurator */}
              <PduConfigurator product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Common SKU highlights */}
      {product.highlightSkus && (
        <section style={{ padding: '48px 0', background: '#111520', borderTop: '1px solid #2e3648' }}>
          <div className="container">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#e8eaf0', marginBottom: 20 }}>Common Configurations for This Type</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {product.highlightSkus.map(sku => (
                <span key={sku} style={{ padding: '6px 14px', background: '#1a1f2e', border: '1px solid #2e3648', fontSize: '0.82rem', color: '#8a94a6' }}>
                  {sku}
                </span>
              ))}
            </div>
            {product.notes && (
              <p style={{ color: '#4a5568', fontSize: '0.82rem', marginTop: 16 }}>{product.notes}</p>
            )}
          </div>
        </section>
      )}

      {/* Other PDU types */}
      <section style={{ padding: '48px 0', background: '#1a1f2e', borderTop: '1px solid #2e3648' }}>
        <div className="container">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#e8eaf0', marginBottom: 20 }}>Other PDU Standards</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {pduTypes.filter(p => p.slug !== product.slug).map(p => (
              <Link key={p.slug} href={'/products/pdu/' + p.slug + '/'} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#252b3b', border: '1px solid #2e3648', textDecoration: 'none', minWidth: 130 }}>
                <img src={p.image} alt={p.shortName} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#e8eaf0' }}>{p.shortName}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back */}
      <div style={{ background: '#0d1117', padding: '24px 0', borderTop: '1px solid #2e3648' }}>
        <div className="container">
          <Link href="/products/pdu/" style={{ color: '#8a94a6', fontSize: '0.88rem', textDecoration: 'none' }}>
            &larr; Back to PDU Products
          </Link>
        </div>
      </div>
    </Layout>
  )
}

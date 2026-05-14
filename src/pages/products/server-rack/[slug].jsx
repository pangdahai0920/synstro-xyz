import { useState } from 'react'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { allServerRackProducts, getProductBySlug, serverRackGroups } from '../../../data/products'

export async function getStaticPaths() {
  const paths = allServerRackProducts.map(p => ({ params: { slug: p.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug)
  if (!product) return { notFound: true }
  const group = serverRackGroups.find(g => g.id === product.groupId)
  const siblings = group ? group.products : []
  return { props: { product, siblings } }
}

// ── Standard spec rows (non-WB products) ──────────────────────────────────
function SpecTable({ product }) {
  const rows = [
    { key: 'Model',                  value: product.model },
    { key: 'Rack Size',              value: product.uSize },
    { key: 'Dimensions (W × D × H)', value: product.dims },
    { key: 'Net Weight',             value: product.weight },
    { key: 'Volume',                 value: product.volume },
    { key: 'Material',               value: product.material },
    { key: 'Door',                   value: product.door },
    { key: 'Color',                  value: product.color },
    { key: 'Accessories',            value: product.accessories },
    { key: 'Notes',                  value: product.notes },
  ].filter(r => r.value && r.value !== 'N/A' && !r.value.startsWith('Contact'))

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 40 }}>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.key} style={{ borderBottom: '1px solid #2e3648', background: i % 2 === 0 ? 'transparent' : 'rgba(37,43,59,0.5)' }}>
            <td style={{ padding: '10px 12px', fontSize: '0.82rem', color: '#8a94a6', fontWeight: 600, whiteSpace: 'nowrap', width: '42%' }}>{row.key}</td>
            <td style={{ padding: '10px 12px', fontSize: '0.88rem', color: '#e8eaf0' }}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ── Variant selector + spec table (WB: depth / FS: grade) ─────────────────
function VariantPanel({ product }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const v = product.variants[activeIdx]

  // Detect variant key: WB uses 'depth', FS uses 'grade'
  const variantKey = v.depth ? 'depth' : 'grade'
  const selectorLabel = variantKey === 'depth' ? 'Select Depth' : 'Select Grade'

  // Build spec rows — filter keys that exist on this variant type
  const commonRows = [
    { key: 'Rack Size', value: product.uSize },
    { key: 'Door',      value: product.door },
    { key: 'Color',     value: product.color },
    product.notes ? { key: 'Notes', value: product.notes } : null,
  ].filter(Boolean)

  const variantRows = [
    { key: 'Model No.',              value: v.model },
    v.dims   ? { key: 'Dimensions (W × D × H)', value: v.dims } : null,
    v.weight ? { key: 'Net Weight',  value: v.weight !== 'N/A' ? v.weight : '— (contact for data)' } : null,
    v.volume ? { key: 'Volume',      value: v.volume } : null,
    { key: 'Material',               value: v.material },
    { key: 'Accessories',            value: v.accessories },
  ].filter(Boolean)

  const allRows = [...variantRows, ...commonRows]

  return (
    <div>
      {/* Variant selector */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: '0.78rem', color: '#8a94a6', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
          {selectorLabel}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {product.variants.map((variant, idx) => (
            <button
              key={variant[variantKey]}
              onClick={() => setActiveIdx(idx)}
              style={{
                padding: '8px 20px',
                border: idx === activeIdx ? '2px solid #e8a020' : '1px solid #2e3648',
                background: idx === activeIdx ? 'rgba(232,160,32,0.1)' : '#1a1f2e',
                color: idx === activeIdx ? '#e8a020' : '#8a94a6',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.15s',
              }}
            >
              {variant[variantKey]}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#4a5568', marginTop: 8 }}>
          Selected: <span style={{ color: '#e8eaf0', fontWeight: 600 }}>{v.model}</span>
        </div>
      </div>

      {/* Spec table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 40 }}>
        <tbody>
          {allRows.map((row, i) => (
            <tr key={row.key} style={{ borderBottom: '1px solid #2e3648', background: i % 2 === 0 ? 'transparent' : 'rgba(37,43,59,0.5)' }}>
              <td style={{ padding: '10px 12px', fontSize: '0.82rem', color: '#8a94a6', fontWeight: 600, whiteSpace: 'nowrap', width: '42%' }}>{row.key}</td>
              <td style={{ padding: '10px 12px', fontSize: '0.88rem', color: '#e8eaf0' }}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Page component ─────────────────────────────────────────────────────────
export default function ProductDetail({ product, siblings }) {
  const hasVariants = Boolean(product.variants)
  const isWB = hasVariants  // keep alias for JSX below

  const mailSubject = encodeURIComponent('Inquiry: ' + (isWB ? product.model : product.model))
  const mailBody = encodeURIComponent(
    'Hi Synstro,\n\nI am interested in the ' + product.label + '.\n\n' +
    (product.variants
      ? (product.variants[0].depth
          ? 'Preferred depth (D450 / D600 / D800 / D1000):\n'
          : 'Preferred grade (FM / FD / FB / FK):\n')
      : '') +
    'Required quantity:\nTarget delivery:\nProject details:\n\nPlease send your best quote.'
  )

  return (
    <Layout
      title={product.label + ' | Synstro Industrial Enclosures'}
      description={
        product.model + ' ' + product.uSize + ' wall-mount cabinet. ' +
        product.material + '. Contact Synstro for OEM quote.'
      }
    >
      {/* Breadcrumb */}
      <div style={{ background: '#111520', padding: '12px 0', borderBottom: '1px solid #2e3648' }}>
        <div className="container" style={{ fontSize: '0.82rem', color: '#4a5568' }}>
          <Link href="/" style={{ color: '#4a5568' }}>Home</Link>
          {' > '}
          <Link href="/products/" style={{ color: '#4a5568' }}>Products</Link>
          {' > '}
          <Link href="/products/server-rack/" style={{ color: '#4a5568' }}>Server Racks</Link>
          {' > '}
          <span style={{ color: '#8a94a6' }}>{product.model}</span>
        </div>
      </div>

      {/* Main detail block */}
      <section style={{ padding: '60px 0', background: '#1a1f2e' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 460px) 1fr', gap: 48, alignItems: 'start' }} className="detail-grid">

            {/* LEFT — product image */}
            <div style={{
              background: '#252b3b',
              border: '1px solid #2e3648',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 32,
              aspectRatio: '1',
            }}>
              <img src={product.image} alt={product.model} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>

            {/* RIGHT — info + specs */}
            <div>
              <div style={{ fontSize: '0.82rem', color: '#e8a020', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                {product.groupLabel}
              </div>
              <h1 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, color: '#e8eaf0', marginBottom: 4 }}>
                {product.model}
              </h1>
              <div style={{ color: '#8a94a6', fontSize: '0.95rem', marginBottom: 32 }}>{product.label}</div>

              {/* Spec block — variant products get selector, others get flat table */}
              {isWB ? <VariantPanel product={product} /> : <SpecTable product={product} />}

              {/* CTA */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={`mailto:ztsc1030@gmail.com?subject=${mailSubject}&body=${mailBody}`}
                  style={{
                    display: 'inline-block',
                    padding: '14px 32px',
                    background: '#e8a020',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                  }}
                >
                  Request Quote &rarr;
                </a>
                <Link
                  href="/contact/"
                  style={{
                    display: 'inline-block',
                    padding: '14px 28px',
                    border: '1px solid #2e3648',
                    color: '#8a94a6',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                  }}
                >
                  Submit RFQ Form
                </Link>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#4a5568', marginTop: 12, lineHeight: 1.6 }}>
                Prices are ex-works Chengdu. MOQ, lead time, and freight quote on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Siblings */}
      {siblings.length > 1 && (
        <section style={{ padding: '56px 0', background: '#111520', borderTop: '1px solid #2e3648' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e8eaf0', marginBottom: 24 }}>Other Models in This Series</h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {siblings.filter(s => s.slug !== product.slug).map(s => (
                <Link
                  key={s.slug}
                  href={'/products/server-rack/' + s.slug + '/'}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#1a1f2e', border: '1px solid #2e3648', textDecoration: 'none', minWidth: 140 }}
                >
                  <img src={s.image} alt={s.model} style={{ width: 40, height: 40, objectFit: 'contain' }} />
                  <span>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#e8eaf0' }}>{s.model}</div>
                    <div style={{ fontSize: '0.78rem', color: '#e8a020' }}>{s.uSize}</div>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div style={{ background: '#0d1117', padding: '24px 0', borderTop: '1px solid #2e3648' }}>
        <div className="container">
          <Link href="/products/server-rack/" style={{ color: '#8a94a6', fontSize: '0.88rem', textDecoration: 'none' }}>
            &larr; Back to Server Rack Enclosures
          </Link>
        </div>
      </div>
    </Layout>
  )
}

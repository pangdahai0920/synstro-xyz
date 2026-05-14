import Layout from '../../../components/Layout'
import Link from 'next/link'
import { allServerRackProducts, getProductBySlug, serverRackGroups } from '../../../data/products'

export async function getStaticPaths() {
  const paths = allServerRackProducts.map(p => ({
    params: { slug: p.slug },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug)
  if (!product) return { notFound: true }
  const group = serverRackGroups.find(g => g.id === product.groupId)
  const siblings = group ? group.products : []
  return { props: { product, siblings } }
}

export default function ProductDetail({ product, siblings }) {
  const specRows = [
    { key: 'Model', value: product.model },
    { key: 'Rack Size', value: product.uSize },
    { key: 'Dimensions (W x D x H)', value: product.dims },
    { key: 'Net Weight', value: product.weight },
    { key: 'Volume', value: product.volume },
    { key: 'Material', value: product.material },
    { key: 'Door', value: product.door },
    { key: 'Color', value: product.color },
    { key: 'Accessories', value: product.accessories },
    { key: 'Notes', value: product.notes },
  ].filter(r => r.value && r.value !== 'TBC' && r.value !== 'TBC — awaiting confirmed data')

  return (
    <Layout
      title={product.label + ' – Wall-Mount Cabinet | Synstro'}
      description={
        product.model + ' ' + product.uSize + ' server rack enclosure. ' +
        product.dims + '. ' + product.material + '. Contact Synstro for quote.'
      }
    >
      {/* breadcrumb */}
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 460px) 1fr',
            gap: 48,
            alignItems: 'start',
          }}
            className="detail-grid"
          >
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
              <img
                src={product.image}
                alt={product.model}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
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

              {/* Spec table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 40 }}>
                <tbody>
                  {specRows.map((row, i) => (
                    <tr key={row.key} style={{ borderBottom: '1px solid #2e3648', background: i % 2 === 0 ? 'transparent' : 'rgba(37,43,59,0.5)' }}>
                      <td style={{ padding: '10px 12px', fontSize: '0.82rem', color: '#8a94a6', fontWeight: 600, whiteSpace: 'nowrap', width: '40%' }}>
                        {row.key}
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: '0.88rem', color: '#e8eaf0' }}>
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Email CTA */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={'mailto:ztsc1030@gmail.com?subject=Inquiry: ' + product.model + '&body=Hi Synstro,%0A%0AI am interested in the ' + product.model + '.%0A%0ARequired quantity:%0ATarget delivery:%0AProject details:%0A%0APlease send your best quote.'}
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

      {/* Siblings / Related models */}
      {siblings.length > 1 && (
        <section style={{ padding: '56px 0', background: '#111520', borderTop: '1px solid #2e3648' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e8eaf0', marginBottom: 24 }}>Other Models in This Series</h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {siblings.filter(s => s.slug !== product.slug).map(s => (
                <Link
                  key={s.slug}
                  href={'/products/server-rack/' + s.slug + '/'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 16px',
                    background: '#1a1f2e',
                    border: '1px solid #2e3648',
                    textDecoration: 'none',
                    minWidth: 140,
                  }}
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

      {/* Back to series */}
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

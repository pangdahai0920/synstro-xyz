import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../../components/Layout'
import { Breadcrumbs, CtaBand, ProductCard, SpecTable } from '../../../components/ui'
import { allServerRackProducts, getProductBySlug, serverRackGroups } from '../../../data/products'

export async function getStaticPaths() {
  return {
    paths: allServerRackProducts.map((product) => ({ params: { slug: product.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug)
  if (!product) return { notFound: true }
  const group = serverRackGroups.find((item) => item.id === product.groupId)
  return { props: { product, siblings: group ? group.products : [] } }
}

function VariantSelector({ product }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const variant = product.variants[activeIndex]
  const variantKey = variant.depth ? 'depth' : 'grade'

  const rows = [
    { key: 'Model', value: variant.model },
    { key: variantKey === 'depth' ? 'Depth' : 'Grade', value: variant[variantKey] },
    { key: 'Rack Size', value: product.uSize },
    { key: 'Dimensions', value: variant.dims },
    { key: 'Net Weight', value: variant.weight && variant.weight !== 'N/A' ? variant.weight : null },
    { key: 'Volume', value: variant.volume },
    { key: 'Material', value: variant.material || product.material },
    { key: 'Door', value: product.door },
    { key: 'Color', value: product.color },
    { key: 'Accessories', value: variant.accessories },
    { key: 'Notes', value: product.notes },
  ]

  return (
    <>
      <p className="eyebrow">{variantKey === 'depth' ? 'Select Depth' : 'Select Grade'}</p>
      <div className="option-row">
        {product.variants.map((item, index) => (
          <button
            className={`option-button ${index === activeIndex ? 'is-active' : ''}`}
            type="button"
            key={item[variantKey]}
            onClick={() => setActiveIndex(index)}
          >
            {item[variantKey]}
          </button>
        ))}
      </div>
      <SpecTable rows={rows} />
    </>
  )
}

export default function ServerRackDetail({ product, siblings }) {
  const hasVariants = Boolean(product.variants)
  const rows = [
    { key: 'Model', value: product.model },
    { key: 'Rack Size', value: product.uSize },
    { key: 'Dimensions', value: product.dims },
    { key: 'Net Weight', value: product.weight },
    { key: 'Volume', value: product.volume },
    { key: 'Material', value: product.material },
    { key: 'Door', value: product.door },
    { key: 'Color', value: product.color },
    { key: 'Accessories', value: product.accessories },
    { key: 'Notes', value: product.notes },
  ]
  const subject = encodeURIComponent(`Server Rack RFQ: ${product.model}`)
  const body = encodeURIComponent(`Hi Synstro,\n\nPlease quote the following server rack:\n\nModel: ${product.model}\nSeries: ${product.groupLabel}\nQuantity:\nTarget delivery:\nProject requirements:\n\nThank you.`)

  return (
    <Layout
      title={`${product.model} | Synstro Server Rack Enclosure`}
      description={`${product.label}. ${product.material}. Contact Synstro for OEM/ODM server rack quotations.`}
    >
      <div className="container">
        <Breadcrumbs items={[
          { label: 'Products', href: '/products/' },
          { label: 'Server Racks', href: '/products/server-rack/' },
          { label: product.model },
        ]} />
      </div>

      <section className="section">
        <div className="container detail-grid">
          <div className="detail-media">
            <img src={product.image} alt={product.model} />
          </div>
          <div>
            <p className="eyebrow">{product.groupLabel}</p>
            <h1>{product.model}</h1>
            <p style={{ color: 'var(--muted)', marginTop: -24, marginBottom: 28 }}>{product.label}</p>
            {hasVariants ? <VariantSelector product={product} /> : <SpecTable rows={rows} />}
            <div className="button-row" style={{ marginTop: 24 }}>
              <a className="btn-primary" href={`mailto:ztsc1030@gmail.com?subject=${subject}&body=${body}`}>Email RFQ</a>
              <Link className="btn-secondary" href="/contact/">Submit RFQ Form</Link>
            </div>
          </div>
        </div>
      </section>

      {siblings.length > 1 && (
        <section className="section section--dark">
          <div className="container">
            <p className="eyebrow">Same Series</p>
            <h2>Other models in this series</h2>
            <div className="grid-4">
              {siblings.filter((item) => item.slug !== product.slug).map((item) => (
                <ProductCard
                  key={item.slug}
                  href={`/products/server-rack/${item.slug}/`}
                  image={item.image}
                  title={item.model}
                  meta={item.uSize}
                  text={item.dims || item.label}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Need this rack with a custom depth, door, or finish?"
        text="Send model, quantity, project site, and any drawing requirements. Synstro will confirm feasibility and quote lead time."
        buttonText="Submit Rack RFQ"
      />
    </Layout>
  )
}

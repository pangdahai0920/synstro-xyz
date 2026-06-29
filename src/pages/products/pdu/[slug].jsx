import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../../components/Layout'
import { Breadcrumbs, CtaBand, ProductCard, SpecTable } from '../../../components/ui'
import { getPduBySlug, pduConfig, pduTypes } from '../../../data/pdu'

export async function getStaticPaths() {
  return {
    paths: pduTypes.map((product) => ({ params: { slug: product.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const product = getPduBySlug(params.slug)
  if (!product) return { notFound: true }
  return { props: { product } }
}

function PduConfigurator({ product }) {
  const [way, setWay] = useState('8')
  const [amp, setAmp] = useState('16A')
  const [modules, setModules] = useState(['switch', 'spd'])
  const wayLabel = pduConfig.ways.find((item) => item.value === way)?.label || way
  const moduleLabels = pduConfig.modules
    .filter((item) => modules.includes(item.value))
    .map((item) => item.label)
  const summary = `${wayLabel} / ${amp} / ${moduleLabels.length ? moduleLabels.join(' + ') : 'Base unit'}`
  const subject = encodeURIComponent(`PDU RFQ: ${product.name} / ${summary}`)
  const body = encodeURIComponent(`Hi Synstro,\n\nPlease quote this PDU configuration:\n\nType: ${product.name}\nStandard: ${product.standard}\nWays/Ports: ${wayLabel}\nAmpere: ${amp}\nModules: ${moduleLabels.join(', ') || 'Base unit'}\nQuantity:\nCable length:\nTarget delivery:\n\nThank you.`)

  const toggleModule = (value) => {
    setModules((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  }

  return (
    <div>
      <p className="eyebrow">Configure for RFQ</p>
      <div className="option-row">
        {pduConfig.ways.map((item) => (
          <button type="button" className={`option-button ${way === item.value ? 'is-active' : ''}`} key={item.value} onClick={() => setWay(item.value)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="option-row">
        {pduConfig.amperes.map((item) => (
          <button type="button" className={`option-button ${amp === item.value ? 'is-active' : ''}`} key={item.value} onClick={() => setAmp(item.value)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="option-row">
        {pduConfig.modules.map((item) => (
          <button type="button" className={`option-button ${modules.includes(item.value) ? 'is-active' : ''}`} key={item.value} onClick={() => toggleModule(item.value)}>
            {item.label}
          </button>
        ))}
      </div>
      <SpecTable rows={[{ key: 'Selected Configuration', value: summary }]} />
      <div className="button-row" style={{ marginTop: 22 }}>
        <a className="btn-primary" href={`mailto:ztsc1030@gmail.com?subject=${subject}&body=${body}`}>Email This Config</a>
        <Link className="btn-secondary" href="/contact/">Submit RFQ Form</Link>
      </div>
    </div>
  )
}

export default function PduDetail({ product }) {
  const specRows = [
    { key: 'PDU Type', value: product.name },
    { key: 'Standard', value: product.standard },
    { key: 'Input Plug', value: product.plug },
    { key: 'Voltage Note', value: product.voltageNote },
    { key: 'Notes', value: product.notes },
  ]

  return (
    <Layout
      title={`${product.name} | Configurable Rack PDU`}
      description={`${product.name}. Configurable rack PDU with port count, amperage, switch, SPD, overload protection, and OEM options from Synstro.`}
    >
      <div className="container">
        <Breadcrumbs items={[
          { label: 'Products', href: '/products/' },
          { label: 'PDU Systems', href: '/products/pdu/' },
          { label: product.shortName },
        ]} />
      </div>
      <section className="section">
        <div className="container detail-grid">
          <div className="detail-media">
            <img src={product.image} alt={product.name} />
          </div>
          <div>
            <p className="eyebrow">Power Distribution Unit</p>
            <h1>{product.name}</h1>
            <SpecTable rows={specRows} />
            <PduConfigurator product={product} />
          </div>
        </div>
      </section>

      {product.highlightSkus && (
        <section className="section section--dark">
          <div className="container">
            <p className="eyebrow">Common Configurations</p>
            <div className="grid-3">
              {product.highlightSkus.map((sku) => (
                <div className="info-card" key={sku}>
                  <h3>{sku}</h3>
                  <p>Available for quotation with custom cable length, input plug, and packaging requirements.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <p className="eyebrow">Other Standards</p>
          <div className="grid-4">
            {pduTypes.filter((item) => item.slug !== product.slug).map((item) => (
              <ProductCard
                key={item.slug}
                href={`/products/pdu/${item.slug}/`}
                image={item.image}
                title={item.shortName}
                meta={item.name}
                text={item.standard}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need this PDU built to your market standard?"
        text="Send plug type, way/port count, amperage, module requirements, cable length, and target delivery date."
        buttonText="Submit PDU RFQ"
      />
    </Layout>
  )
}

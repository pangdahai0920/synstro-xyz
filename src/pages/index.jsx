import Layout from '../components/Layout'
import { CtaBand, PageHero, ProductLineCard, SectionHeader } from '../components/ui'
import { companyStats, manufacturingSteps, markets, productLines, trustSignals } from '../data/catalog'

export default function Home() {
  return (
    <Layout
      title="Synstro | BESS Cabinets, Server Racks and PDU Manufacturer"
      description="Factory-direct industrial enclosures from Chengdu, China. BESS cabinets, server racks, and PDU systems for EPC contractors, system integrators, and data center projects."
    >
      <PageHero
        eyebrow="Chengdu, China / Industrial Enclosure Manufacturer"
        title="BESS cabinets, server racks and PDU systems built for project procurement."
        text="Synstro manufactures SPCC steel enclosures and power distribution hardware for energy storage, telecom, data center, and industrial infrastructure projects. OEM/ODM drawings, custom dimensions, and export packing are available."
        image="/images/factory/hero-factory.jpg"
      >
        <div className="button-row">
          <a href="/contact/" className="btn-primary">Request a Quote</a>
          <a href="/products/" className="btn-secondary">View Products</a>
        </div>
      </PageHero>

      <section className="section section--alt">
        <div className="container grid-4">
          {companyStats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Product Lines"
            title="Three procurement-ready product families"
            text="Keep sourcing simple: one manufacturer for battery storage enclosures, IT racks, and rack power distribution."
          />
          <div className="grid-3">
            {productLines.map((product) => <ProductLineCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container grid-2">
          <div>
            <SectionHeader
              eyebrow="Manufacturing Base"
              title="From steel sheet to packed enclosure"
              text="Synstro controls fabrication, coating, assembly, and inspection in-house, giving procurement teams a cleaner path from drawing review to shipment."
            />
            <ul className="clean-list">
              {trustSignals.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="grid-2">
            {manufacturingSteps.map((step) => (
              <div className="info-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="product-line-card__media">
            <img src="/images/factory/product-lineup-2.jpg" alt="Synstro enclosure product lineup" />
          </div>
          <div>
            <SectionHeader
              eyebrow="Markets Served"
              title="Built for export projects and demanding sites"
              text="Our enclosure lines are used by buyers who need repeatable manufacturing, clear specifications, and fast quote response for infrastructure projects."
            />
            <div className="choice-row">
              {markets.map((market) => <span className="choice-button" key={market}>{market}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHeader
            eyebrow="Certifications"
            title="Audited management systems"
            text="ISO certificates are available for procurement review, with certificate images shown for buyer verification."
          />
          <div className="grid-3">
            {[
              ['ISO 9001 : 2015', '/images/certs/iso-9001.png', 'Quality Management System'],
              ['ISO 14001 : 2015', '/images/certs/iso-14001.png', 'Environmental Management System'],
              ['ISO 45001 : 2018', '/images/certs/iso-45001.png', 'Occupational Health and Safety'],
            ].map(([standard, image, desc]) => (
              <div className="product-card" key={standard}>
                <div className="product-card__image">
                  <img src={image} alt={`${standard} certificate`} />
                </div>
                <div className="product-card__body">
                  <h3>{standard}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Send drawings, target quantity, or a project spec."
        text="Synstro responds with product recommendations, configuration options, and an EXW quotation for your procurement review."
      />
    </Layout>
  )
}

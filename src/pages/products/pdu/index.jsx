import Layout from '../../../components/Layout'
import { Breadcrumbs, CtaBand, PageHero, ProductCard, SectionHeader } from '../../../components/ui'
import { pduConfig, pduTypes } from '../../../data/pdu'

export default function PduIndex() {
  return (
    <Layout
      title="PDU Power Distribution Units | UK, US, EU, Universal, C13 and C19"
      description="Rack-mount PDU systems for data centers and server rooms. UK, US, EU, FR/DE, Universal, C13 and C19 configurations with switch, SPD and overload modules."
    >
      <div className="container">
        <Breadcrumbs items={[{ label: 'Products', href: '/products/' }, { label: 'PDU Systems' }]} />
      </div>
      <PageHero
        eyebrow="Products / PDU Systems"
        title="Configurable rack power distribution for global plug standards."
        text="Choose a plug standard, port count, ampere rating, and protection modules. Synstro supports OEM cable length, branding, and packaging for export orders."
        image="/images/pdu/pdu-universal.jpg"
      >
        <div className="button-row">
          <a href="/contact/" className="btn-primary">Submit PDU RFQ</a>
          <a href="#standards" className="btn-secondary">View Standards</a>
        </div>
      </PageHero>

      <section id="standards" className="section">
        <div className="container">
          <SectionHeader
            eyebrow="PDU Standards"
            title="Select the regional or IEC configuration"
            text="Each PDU type can be quoted with different way/port counts, amperage, input plugs, cable lengths, and add-on modules."
          />
          <div className="grid-4">
            {pduTypes.map((product) => (
              <ProductCard
                key={product.slug}
                href={`/products/pdu/${product.slug}/`}
                image={product.image}
                title={product.shortName}
                meta={product.name}
                text={product.standard}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHeader
            eyebrow="Configuration"
            title="Common options for RFQ"
            text="Use these options as a baseline. Custom port counts and mixed C13/C19 configurations are available on request."
          />
          <div className="grid-3">
            <div className="info-card">
              <h3>Ways / Ports</h3>
              <ul className="clean-list">{pduConfig.ways.map((item) => <li key={item.value}>{item.label}</li>)}</ul>
            </div>
            <div className="info-card">
              <h3>Ampere Rating</h3>
              <ul className="clean-list">{pduConfig.amperes.map((item) => <li key={item.value}>{item.label}</li>)}</ul>
            </div>
            <div className="info-card">
              <h3>Add-on Modules</h3>
              <ul className="clean-list">{pduConfig.modules.map((item) => <li key={item.value}>{item.label}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need a custom PDU configuration?"
        text="Send plug standard, way/port count, amperage, module requirements, cable length, quantity, and target delivery date."
        buttonText="Submit PDU RFQ"
      />
    </Layout>
  )
}

import Layout from '../components/Layout'
import { Breadcrumbs, CtaBand, PageHero, SectionHeader } from '../components/ui'
import { companyStats, manufacturingSteps, trustSignals } from '../data/catalog'

const facts = [
  ['Founded', '2019'],
  ['Headquarters', 'Chengdu, Sichuan, China'],
  ['Legal Entity', 'Sichuan Sanchuang Zhengteng Technology Co., Ltd.'],
  ['Core Products', 'BESS cabinets, server racks, PDU systems'],
  ['Capability', 'OEM / ODM fabrication and export support'],
]

export default function About() {
  return (
    <Layout
      title="About Synstro | Industrial Enclosure Manufacturer in Chengdu"
      description="Synstro is a Chengdu-based manufacturer of BESS cabinets, server rack enclosures and PDU systems for global infrastructure procurement."
    >
      <div className="container">
        <Breadcrumbs items={[{ label: 'About' }]} />
      </div>
      <PageHero
        eyebrow="About Synstro"
        title="A practical manufacturing partner for enclosure procurement."
        text="Synstro serves EPC contractors, system integrators, and data center procurement teams that need stable enclosure manufacturing, clear specifications, and fast RFQ response."
        image="/images/factory/factory-interior.jpg"
      />
      <section className="section">
        <div className="container grid-2">
          <div>
            <SectionHeader
              eyebrow="Company"
              title="Built around SPCC steel fabrication and export projects"
              text="Our product scope covers battery energy storage enclosures, 19-inch rack cabinets, and power distribution units. The site is structured so buyers can move quickly from product review to RFQ."
            />
            <ul className="clean-list">
              {trustSignals.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="info-card">
            <p className="eyebrow">Company Facts</p>
            <SpecFacts />
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container">
          <div className="grid-4">
            {companyStats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Process" title="How production is organized" />
          <div className="grid-4">
            {manufacturingSteps.map((step) => (
              <div className="info-card" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Want to verify capability before ordering?"
        text="Ask for certificates, product photos, drawing review, packing details, or a formal quotation for your procurement file."
      />
    </Layout>
  )
}

function SpecFacts() {
  return (
    <div className="clean-list">
      {facts.map(([label, value]) => (
        <div key={label} style={{ paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
          <p className="eyebrow" style={{ marginBottom: 4 }}>{label}</p>
          <p style={{ margin: 0, color: 'var(--soft)' }}>{value}</p>
        </div>
      ))}
    </div>
  )
}

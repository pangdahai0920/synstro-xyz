import Layout from '../../components/Layout'
import { Breadcrumbs, CtaBand, DataTable, PageHero, SectionHeader } from '../../components/ui'
import { bessSeries } from '../../data/catalog'

const columns = [
  { key: 'model', label: 'Model' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'dims', label: 'Dimensions' },
  { key: 'steel', label: 'Steel' },
  { key: 'ip', label: 'IP Rating' },
  { key: 'thermal', label: 'Thermal' },
  { key: 'finish', label: 'Finish' },
]

const capabilities = [
  { title: 'Custom Layout', text: 'Bus-bar access, BMS wiring trays, cable entry plates, and module spacing can be adjusted to project drawings.' },
  { title: 'Outdoor Protection', text: 'Door gaskets, sealed cable entry, powder-coated SPCC steel, and IP54/IP65 design options for demanding sites.' },
  { title: 'Export Documentation', text: 'Packing lists, inspection notes, material references, and certificate files can be prepared for procurement review.' },
]

export default function BessCabinet() {
  return (
    <Layout
      title="BESS Cabinet Manufacturer | Outdoor, Indoor and Container-Type Enclosures"
      description="Synstro manufactures BESS cabinets and battery energy storage enclosures with SPCC steel, IP-rated sealing, custom module layout, and OEM/ODM support."
    >
      <div className="container">
        <Breadcrumbs items={[{ label: 'Products', href: '/products/' }, { label: 'BESS Cabinets' }]} />
      </div>
      <PageHero
        eyebrow="Products / BESS Cabinets"
        title="Battery energy storage enclosures for C&I and utility projects."
        text="Outdoor freestanding cabinets, container-type structures, and indoor battery cabinets fabricated from SPCC steel with custom bus-bar, cable entry, and module bay layouts."
        image="/images/outdoor/outdoor-cabinet.png"
      >
        <div className="button-row">
          <a href="/contact/" className="btn-primary">Submit Project RFQ</a>
          <a href="#series" className="btn-secondary">View Series</a>
        </div>
      </PageHero>

      <div className="tab-strip">
        <div className="container tab-strip__inner">
          {bessSeries.map((series) => <a key={series.id} href={`#${series.id}`} className="series-tab">{series.tag}</a>)}
        </div>
      </div>

      <section id="series" className="section">
        <div className="container">
          <SectionHeader
            eyebrow="BESS Series"
            title="Standard cabinet families, customizable by drawing"
            text="The models below are procurement baselines. Dimensions, steel thickness, color, cable entry, ventilation, and packing can be adjusted for the project."
          />
          {bessSeries.map((series) => (
            <div className="info-card" id={series.id} key={series.id} style={{ marginBottom: 24 }}>
              <p className="eyebrow">{series.tag}</p>
              <h3>{series.title}</h3>
              <p>{series.desc}</p>
              <DataTable columns={columns} rows={series.products} />
            </div>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHeader
            eyebrow="Engineering Support"
            title="Built around the battery system, not a generic box"
            text="Share battery module size, PCS layout, installation environment, target IP rating, and target capacity. Synstro will map the enclosure requirements before quoting."
          />
          <div className="grid-3">
            {capabilities.map((item) => (
              <div className="info-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need a project-specific BESS enclosure?"
        text="Send capacity, module dimensions, installation environment, IP requirement, and target quantity. Engineering response is typically within 48 hours."
        buttonText="Submit BESS RFQ"
      />
    </Layout>
  )
}

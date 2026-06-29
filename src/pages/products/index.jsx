import Layout from '../../components/Layout'
import { Breadcrumbs, CtaBand, PageHero, ProductLineCard, SectionHeader } from '../../components/ui'
import { productLines } from '../../data/catalog'

export default function ProductsIndex() {
  return (
    <Layout
      title="Products | Synstro BESS Cabinets, Server Racks and PDU Systems"
      description="Explore Synstro product lines: BESS cabinets, server rack enclosures, and configurable PDU systems for industrial and infrastructure procurement."
    >
      <div className="container">
        <Breadcrumbs items={[{ label: 'Products' }]} />
      </div>
      <PageHero
        eyebrow="Products"
        title="Industrial enclosures and rack power systems for project buyers."
        text="Browse Synstro's core product families, then send an RFQ with quantity, installation environment, target delivery, and any custom drawing requirements."
        image="/images/factory/factory-interior-2.jpg"
      />
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Catalog"
            title="Choose a product line"
            text="Each line includes procurement-focused specifications, product images, and direct RFQ entry points."
          />
          <div className="grid-3">
            {productLines.map((product) => <ProductLineCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>
      <CtaBand
        title="Need a non-standard dimension or private label build?"
        text="Send your drawing or target specification. Synstro supports OEM sizing, RAL colors, branding, packing, and export documentation."
      />
    </Layout>
  )
}

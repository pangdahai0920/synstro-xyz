import Layout from '../../../components/Layout'
import { Breadcrumbs, CtaBand, PageHero, ProductCard, SectionHeader } from '../../../components/ui'
import { serverRackGroups } from '../../../data/products'

export default function ServerRackIndex() {
  return (
    <Layout
      title="Server Rack Enclosures | Wall-Mount, Floor-Standing and Outdoor Cabinets"
      description="19-inch server rack enclosures from Synstro: wall-mount network boxes, heavy-duty wall cabinets, floor-standing cabinets, and IP55 outdoor options."
    >
      <div className="container">
        <Breadcrumbs items={[{ label: 'Products', href: '/products/' }, { label: 'Server Racks' }]} />
      </div>
      <PageHero
        eyebrow="Products / Server Racks"
        title="19-inch rack enclosures for data, telecom and industrial infrastructure."
        text="Wall-mount, floor-standing, and outdoor cabinet series with SPCC steel construction, powder-coated finish, ventilation options, and OEM sizing."
        image="/images/server-rack/wb-26u.jpg"
      >
        <div className="button-row">
          <a href="/contact/" className="btn-primary">Request Rack Quote</a>
          <a href="#catalog" className="btn-secondary">Browse Models</a>
        </div>
      </PageHero>

      <div className="tab-strip">
        <div className="container tab-strip__inner">
          {serverRackGroups.map((group) => <a key={group.id} href={`#${group.id}`} className="series-tab">{group.shortLabel}</a>)}
        </div>
      </div>

      <section id="catalog" className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Catalog"
            title="Server rack series and models"
            text="Open any model for detailed specifications, variant options, product images, and RFQ shortcuts."
          />
          {serverRackGroups.map((group) => (
            <div id={group.id} key={group.id} style={{ marginBottom: 52 }}>
              <SectionHeader eyebrow={group.shortLabel} title={group.label} text={group.material} />
              <div className="grid-4">
                {group.products.map((product) => (
                  <ProductCard
                    key={product.slug}
                    href={`/products/server-rack/${product.slug}/`}
                    image={product.image}
                    title={product.model}
                    meta={product.uSize}
                    text={product.dims || product.label}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Non-standard rack size, color, or branding?"
        text="Synstro supports custom dimensions, RAL colors, perforation changes, logo printing, export packing, and accessory configuration."
        buttonText="Submit Rack RFQ"
      />
    </Layout>
  )
}

import Link from 'next/link'

export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((item) => (
        <span key={item.label}>
          <span className="breadcrumb-sep">/</span>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}

export function SectionHeader({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'section-heading--center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export function PageHero({ eyebrow, title, text, image, children }) {
  return (
    <section className="page-hero">
      {image && <div className="page-hero__image" style={{ backgroundImage: `url(${image})` }} />}
      <div className="page-hero__overlay" />
      <div className="container page-hero__content">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {children}
      </div>
    </section>
  )
}

export function ProductLineCard({ product }) {
  return (
    <Link className="product-line-card" href={product.href}>
      <div className="product-line-card__media">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-line-card__body">
        <p className="eyebrow">{product.eyebrow}</p>
        <h3>{product.title}</h3>
        <p>{product.summary}</p>
        <ul className="clean-list">
          {product.specs.map((spec) => <li key={spec}>{spec}</li>)}
        </ul>
        <span className="text-link">View products &rarr;</span>
      </div>
    </Link>
  )
}

export function ProductCard({ href, image, title, meta, text }) {
  return (
    <Link className="product-card" href={href}>
      <div className="product-card__image">
        <img src={image} alt={title} />
      </div>
      <div className="product-card__body">
        <h3>{title}</h3>
        {meta && <p className="product-card__meta">{meta}</p>}
        {text && <p>{text}</p>}
      </div>
    </Link>
  )
}

export function CtaBand({ eyebrow = 'Project RFQ', title, text, buttonText = 'Submit RFQ', href = '/contact/' }) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <Link href={href} className="btn-primary">{buttonText}</Link>
      </div>
    </section>
  )
}

export function SpecTable({ rows }) {
  return (
    <div className="table-wrap">
      <table className="spec-table">
        <tbody>
          {rows.filter((row) => row.value).map((row) => (
            <tr key={row.key}>
              <th>{row.key}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DataTable({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>{columns.map((col) => <th key={col.key}>{col.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.model || row.name}>
              {columns.map((col) => <td key={col.key}>{row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

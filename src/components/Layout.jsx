import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { productLines } from '../data/catalog'

const defaultTitle = 'Synstro | Industrial Enclosures, Server Racks and BESS Cabinets'
const defaultDescription =
  'Synstro manufactures BESS cabinets, server racks, and PDU systems for EPC contractors, system integrators, and data center projects.'

export default function Layout({ children, title, description }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="brand" aria-label="Synstro home">
            SYN<span>STRO</span>
          </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>
          <nav id="primary-navigation" className={`primary-nav ${menuOpen ? 'is-open' : ''}`}>
            <Link href="/">Home</Link>
            <Link href="/products/">Products</Link>
            {productLines.map((line) => <Link key={line.slug} href={line.href}>{line.title}</Link>)}
            <Link href="/about/">About</Link>
            <Link href="/contact/" className="btn-primary btn-primary--small">Request a Quote</Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div>
            <div className="brand brand--footer">SYN<span>STRO</span></div>
            <p>Industrial enclosures and power infrastructure manufactured for demanding project environments.</p>
          </div>
          <div>
            <h3>Products</h3>
            {productLines.map((line) => <Link key={line.slug} href={line.href}>{line.title}</Link>)}
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/about/">About Synstro</Link>
            <Link href="/contact/">Contact / RFQ</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="mailto:ztsc1030@gmail.com">ztsc1030@gmail.com</a>
            <p>Chengdu, Sichuan, China</p>
            <p>ISO 9001 / ISO 14001 / ISO 45001</p>
          </div>
        </div>
        <div className="container site-footer__bottom">
          <p>Copyright 2024 Sichuan Sanchuang Zhengteng Technology Co., Ltd.</p>
          <p>synstro.xyz</p>
        </div>
      </footer>
    </>
  )
}

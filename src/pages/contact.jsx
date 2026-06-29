import { useState } from 'react'
import Layout from '../components/Layout'
import { Breadcrumbs, PageHero } from '../components/ui'
import { productLines } from '../data/catalog'

const WEB3FORMS_KEY = 'a8aff6d9-89fe-41b8-ab20-c0e222067d1b'

const initialForm = {
  company: '',
  country: '',
  name: '',
  email: '',
  phone: '',
  products: [],
  quantity: '',
  delivery: '',
  requirements: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const productOptions = productLines.map((line) => line.title)

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const toggleProduct = (product) => {
    setForm((current) => ({
      ...current,
      products: current.products.includes(product)
        ? current.products.filter((item) => item !== product)
        : [...current.products, product],
    }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const productInterest = form.products.join(', ') || 'General inquiry'
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `[Synstro RFQ] ${form.company} / ${productInterest}`,
      from_name: form.name,
      replyto: form.email,
      Company: form.company,
      Country: form.country,
      'Contact Name': form.name,
      Email: form.email,
      'WhatsApp / Phone': form.phone || 'N/A',
      'Product Interest': productInterest,
      'Quantity Required': form.quantity,
      'Target Delivery': form.delivery || 'Not specified',
      'Project Requirements': form.requirements || 'N/A',
      botcheck: '',
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!data.success) throw new Error(data.message || 'Submission failed')
      setStatus('success')
      setMessage('RFQ received. Synstro will respond to your email within 48 hours.')
      setForm(initialForm)
    } catch {
      setStatus('error')
      setMessage('Submission failed. Please email ztsc1030@gmail.com directly with your RFQ details.')
    }
  }

  return (
    <Layout
      title="Contact Synstro | Submit RFQ for BESS Cabinets, Server Racks and PDU"
      description="Submit a project RFQ to Synstro for BESS cabinets, server rack enclosures, PDU systems, OEM dimensions, custom finish and export orders."
    >
      <div className="container">
        <Breadcrumbs items={[{ label: 'Contact' }]} />
      </div>
      <PageHero
        eyebrow="Contact / RFQ"
        title="Send your project requirements for a factory quotation."
        text="Include product type, quantity, installation environment, target delivery, and any drawing or certification requirements. Synstro will reply with the next procurement steps."
        image="/images/factory/product-lineup-2.jpg"
      />

      <section className="section">
        <div className="container grid-2">
          <form className="info-card" onSubmit={submit}>
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
            <div className="form-grid">
              <Field label="Company Name *">
                <input required value={form.company} onChange={(event) => update('company', event.target.value)} />
              </Field>
              <Field label="Country / Region *">
                <input required placeholder="e.g. Saudi Arabia, Nigeria" value={form.country} onChange={(event) => update('country', event.target.value)} />
              </Field>
              <Field label="Contact Name *">
                <input required value={form.name} onChange={(event) => update('name', event.target.value)} />
              </Field>
              <Field label="Email Address *">
                <input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} />
              </Field>
              <Field label="WhatsApp / Phone">
                <input placeholder="+1 234 567 890" value={form.phone} onChange={(event) => update('phone', event.target.value)} />
              </Field>
              <Field label="Quantity Required *">
                <input required placeholder="e.g. 50 units" value={form.quantity} onChange={(event) => update('quantity', event.target.value)} />
              </Field>
              <Field label="Target Delivery">
                <input placeholder="e.g. 2026/08/30" value={form.delivery} onChange={(event) => update('delivery', event.target.value)} />
              </Field>
              <div className="field field--full">
                <label>Product Interest</label>
                <div className="choice-row">
                  {productOptions.map((product) => (
                    <button
                      type="button"
                      className={`choice-button ${form.products.includes(product) ? 'is-active' : ''}`}
                      key={product}
                      onClick={() => toggleProduct(product)}
                    >
                      {product}
                    </button>
                  ))}
                </div>
              </div>
              <Field label="Detailed Requirements" full>
                <textarea
                  rows={6}
                  placeholder="Dimensions, IP rating, installation environment, plug standard, drawings, certifications, packing, branding, or other procurement requirements."
                  value={form.requirements}
                  onChange={(event) => update('requirements', event.target.value)}
                />
              </Field>
            </div>

            {message && (
              <div className={`form-alert ${status === 'error' ? 'form-alert--error' : 'form-alert--success'}`} style={{ marginTop: 18 }}>
                {message}
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={status === 'loading'} style={{ width: '100%', marginTop: 22 }}>
              {status === 'loading' ? 'Sending...' : 'Submit RFQ'}
            </button>
            <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: 0 }}>
              You can also email <a href="mailto:ztsc1030@gmail.com" style={{ color: 'var(--accent)' }}>ztsc1030@gmail.com</a> directly.
            </p>
          </form>

          <aside>
            <div className="info-card" style={{ marginBottom: 18 }}>
              <p className="eyebrow">Best RFQ Details</p>
              <ul className="clean-list">
                <li>Product line and model if known</li>
                <li>Quantity and target delivery date</li>
                <li>Dimensions, IP rating, and installation environment</li>
                <li>Required certificates, drawings, packing, or branding</li>
              </ul>
            </div>
            <div className="info-card">
              <p className="eyebrow">Response</p>
              <h3>Typical reply within 48 hours</h3>
              <p>For custom enclosures, Synstro may request drawings, battery module dimensions, plug standard, or site environment details before final quotation.</p>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  )
}

function Field({ label, children, full = false }) {
  return (
    <div className={`field ${full ? 'field--full' : ''}`}>
      <label>{label}</label>
      {children}
    </div>
  )
}

import Layout from '../components/Layout'
import { useState } from 'react'

const WEB3FORMS_KEY = 'a8aff6d9-89fe-41b8-ab20-c0e222067d1b'

export default function Contact() {
  const [form, setForm] = useState({
    company: '', country: '', name: '', email: '', phone: '',
    products: [], quantity: '', delivery: '', requirements: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const productOptions = ['BESS Cabinets', 'Server Racks', 'PDU Systems']

  const toggleProduct = (p) => {
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(p)
        ? prev.products.filter(x => x !== p)
        : [...prev.products, p]
    }))
  }

  // Format date from yyyy-mm-dd to yyyy/mm/dd
  const formatDate = (val) => {
    if (!val) return 'Not specified'
    return val.replace(/-/g, '/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `[Synstro RFQ] ${form.company} — ${form.products.join(', ') || 'General Inquiry'}`,
      from_name: form.name,
      replyto: form.email,
      Company: form.company,
      Country: form.country,
      'Contact Name': form.name,
      Email: form.email,
      'WhatsApp / Phone': form.phone || 'N/A',
      'Product Interest': form.products.join(', ') || 'Not specified',
      'Quantity Required': form.quantity,
      'Target Delivery Date': formatDate(form.delivery),
      'Detailed Requirements': form.requirements || 'N/A',
      botcheck: '',
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError('Submission failed. Please email us directly at ztsc1030@gmail.com')
      }
    } catch {
      setError('Network error. Please email us directly at ztsc1030@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', background: '#252b3b', border: '1px solid #2e3648',
    color: '#e8eaf0', padding: '12px 16px', fontSize: '0.95rem',
    outline: 'none', fontFamily: 'inherit'
  }
  const labelStyle = {
    fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: '#8a94a6', display: 'block', marginBottom: 8
  }

  return (
    <Layout
      title="Contact Synstro – Request a Quote for Custom Enclosures"
      description="Submit your RFQ for BESS cabinets, server racks or PDU systems. OEM/ODM available. Fast pre-sales response from Synstro engineering team."
    >
      <section style={{ padding: '80px 0', background: '#1a1f2e', minHeight: '90vh' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-label">Get in Touch</div>
          <h1 className="section-title" style={{ marginBottom: 12 }}>Request a Quote</h1>
          <p className="section-subtitle" style={{ marginBottom: 56 }}>
            Submit your project specifications below. Our engineering team will respond within 48 hours with a formal quotation. NDA available upon request.
          </p>

          {submitted ? (
            <div style={{ background: '#252b3b', border: '1px solid #e8a020', padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>✓</div>
              <h2 style={{ color: '#e8a020', marginBottom: 12 }}>RFQ Received</h2>
              <p style={{ color: '#8a94a6' }}>
                Our engineering team will contact you within 48 hours at the email address provided.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

              {/* honeypot — spam protection */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Company Name *</label>
                  <input required style={inputStyle} value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Country / Region *</label>
                  <input required style={inputStyle} placeholder="e.g. Saudi Arabia, Nigeria"
                    value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Contact Name *</label>
                  <input required style={inputStyle} value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input required type="email" style={inputStyle} value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>WhatsApp / Phone</label>
                <input style={inputStyle} placeholder="+1 234 567 890" value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Product Interest (select all that apply)</label>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {productOptions.map(p => (
                    <button type="button" key={p} onClick={() => toggleProduct(p)} style={{
                      padding: '10px 20px', border: '1px solid',
                      borderColor: form.products.includes(p) ? '#e8a020' : '#2e3648',
                      background: form.products.includes(p) ? 'rgba(232,160,32,0.1)' : 'transparent',
                      color: form.products.includes(p) ? '#e8a020' : '#8a94a6',
                      fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
                    }}>{p}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Quantity Required *</label>
                  <input required style={inputStyle} placeholder="e.g. 50 units" value={form.quantity}
                    onChange={e => setForm({ ...form, quantity: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Target Delivery Date</label>
                  <input type="text" style={inputStyle} placeholder="e.g. 2025/06/30"
                    value={form.delivery} onChange={e => setForm({ ...form, delivery: e.target.value })} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Detailed Requirements</label>
                <textarea rows={5} style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="Specifications, dimensions, certifications required, installation environment, power requirements, custom branding, etc."
                  value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} />
              </div>

              {error && (
                <div style={{ padding: '14px 20px', background: 'rgba(220,50,50,0.1)', border: '1px solid rgba(220,50,50,0.3)', color: '#f87171', fontSize: '0.9rem' }}>
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%', textAlign: 'center', fontSize: '1rem', padding: '16px 32px', opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
                >
                  {loading ? 'Sending...' : 'Submit RFQ'}
                </button>
                <p style={{ marginTop: 12, fontSize: '0.82rem', color: '#4a5568', textAlign: 'center' }}>
                  By submitting, you agree to be contacted by Synstro regarding your enquiry. NDA available upon request.
                </p>
              </div>

            </form>
          )}
        </div>
      </section>
    </Layout>
  )
}

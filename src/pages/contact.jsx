import Layout from '../components/Layout'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    company: '', country: '', name: '', email: '', phone: '',
    products: [], quantity: '', delivery: '', requirements: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const productOptions = ['BESS Cabinets', 'Server Racks', 'PDU Systems']

  const toggleProduct = (p) => {
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(p)
        ? prev.products.filter(x => x !== p)
        : [...prev.products, p]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('RFQ submitted:', form)
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%', background: '#252b3b', border: '1px solid #2e3648',
    color: '#e8eaf0', padding: '12px 16px', fontSize: '0.95rem',
    outline: 'none', fontFamily: 'inherit'
  }
  const labelStyle = { fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a94a6', display: 'block', marginBottom: 8 }

  return (
    <Layout
      title="Contact Synstro 鈥?Request a Quote for Custom Enclosures"
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
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>鉁?/div>
              <h2 style={{ color: '#e8a020', marginBottom: 12 }}>RFQ Received</h2>
              <p style={{ color: '#8a94a6' }}>Our engineering team will contact you within 48 hours at the email address provided.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Company Name *</label>
                  <input required style={inputStyle} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Country / Region *</label>
                  <input required style={inputStyle} placeholder="e.g. Saudi Arabia, Nigeria" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Contact Name *</label>
                  <input required style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input required type="email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>WhatsApp / Phone</label>
                <input style={inputStyle} placeholder="+1 234 567 890" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Product Interest (select all that apply) *</label>
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
                  <input required style={inputStyle} placeholder="e.g. 50 units" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Target Delivery Date</label>
                  <input type="date" style={inputStyle} value={form.delivery} onChange={e => setForm({ ...form, delivery: e.target.value })} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Detailed Requirements</label>
                <textarea rows={5} style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="Specifications, dimensions, certifications required, installation environment, power requirements, custom branding, etc."
                  value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} />
              </div>

              <div>
                <button type="submit" className="btn-primary" style={{ width: '100%', textAlign: 'center', fontSize: '1rem', padding: '16px 32px' }}>
                  Submit RFQ
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


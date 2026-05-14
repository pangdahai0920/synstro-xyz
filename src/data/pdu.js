// ─────────────────────────────────────────────────────────────────────────────
// SYNSTRO PDU Data
// SKU configurator: Ways/Ports × Ampere × Add-on Modules
// PDU terminology: always "Way" / "Port" — never "Outlet"
// ─────────────────────────────────────────────────────────────────────────────

// Shared configurator options (apply to all PDU types)
export const pduConfig = {
  ways: [
    { value: '6',      label: '6-Way / 6-Port' },
    { value: '8',      label: '8-Way / 8-Port' },
    { value: '10',     label: '10-Way / 10-Port' },
    { value: 'custom', label: 'Custom (specify qty)' },
  ],
  amperes: [
    { value: '10A', label: '10A' },
    { value: '13A', label: '13A' },
    { value: '15A', label: '15A' },
    { value: '16A', label: '16A' },
    { value: '20A', label: '20A' },
  ],
  modules: [
    { value: 'switch',    label: 'Switch',            desc: 'Individual port on/off switch' },
    { value: 'spd',       label: 'SPD (Surge Protection)', desc: 'Surge protection device / lightning arrester' },
    { value: 'indicator', label: 'Indicator Light',   desc: 'Power-on LED per port' },
    { value: 'overload',  label: 'Overload Protection', desc: 'Circuit breaker auto-trip on overload' },
  ],
}

// PDU product types
export const pduTypes = [
  {
    slug: 'uk-pdu',
    name: 'UK Standard PDU',
    shortName: 'UK PDU',
    standard: 'BS 1363 — 13A / 230V~250V / 50Hz',
    plug: 'BS 1363 Type G input',
    voltageNote: 'UK official standard: 13A / 230–250V / 50Hz',
    image: '/images/pdu/uk-pdu.png',
    // Default SKU combinations shown in PDF for this type
    highlightSkus: [
      '6-Way 13A + Switch + Overload',
      '6-Way 13A + Switch + SPD',
      '8-Way 13A + Indicator Light',
    ],
  },
  {
    slug: 'us-pdu',
    name: 'US Standard PDU',
    shortName: 'US PDU',
    standard: 'NEMA — 15A / 120V / 60Hz (residential) | 20A / 120V / 60Hz (commercial)',
    plug: 'NEMA 5-15P or NEMA 5-20P input',
    voltageNote: 'Common voltages: 110V / 115V / 125V. Residential 15A / Commercial 20A.',
    image: '/images/pdu/us-pdu.png',
    highlightSkus: [
      '8-Way 15A + Switch + Overload',
      '8-Way 15A + Switch + SPD',
      '8-Way 20A + Switch + Overload',
      '8-Way 20A + Switch + SPD',
    ],
  },
  {
    slug: 'eu-pdu',
    name: 'EU Standard PDU',
    shortName: 'EU PDU',
    standard: 'CEE 7/4 (Schuko) — 10A or 16A / 230V / 50Hz',
    plug: 'CEE 7/6 Schuko input',
    voltageNote: 'Low power: 10A / 230V. High power: 16A / 230V.',
    image: '/images/pdu/eu-pdu.png',
    highlightSkus: [
      '8-Way 10A + Switch + Overload',
      '8-Way 10A + Switch + SPD',
      '8-Way 16A + Switch + Overload',
      '8-Way 16A + Switch + SPD',
    ],
  },
  {
    slug: 'fr-pdu',
    name: 'French / German Standard PDU',
    shortName: 'FR/DE PDU',
    standard: 'CEE 7/5 (FR) / CEE 7/4 (DE) — 16A / 230V / 50Hz',
    plug: 'CEE 7/6 or Type E input',
    voltageNote: 'French and German official standard: 16A / 230V / 50Hz.',
    image: '/images/pdu/fr-pdu.png',
    highlightSkus: [
      '8-Way 16A + Switch + Overload',
      '8-Way 16A + Switch + SPD',
    ],
  },
  {
    slug: 'universal-pdu',
    name: 'Universal PDU',
    shortName: 'Universal',
    standard: 'Multi-standard — 250V (compatible with US 110V/120V) / 50–60Hz',
    plug: 'Universal input plug (region-configurable)',
    voltageNote: 'Universal: 250V / 10A, 13A, 16A / 50–60Hz. Compatible worldwide.',
    image: '/images/pdu/universal-pdu.png',
    highlightSkus: [
      '6-Way 10A + Switch + Overload',
      '6-Way 10A + Switch + SPD',
      '8-Way 10A + Switch + Overload',
      '8-Way 10A + Switch + SPD',
      '8-Way 16A + Switch + Overload',
      '8-Way 16A + Switch + SPD',
      '10-Way 10A + Indicator Light',
      '10-Way 16A + Indicator Light',
    ],
  },
  {
    slug: 'c13-pdu',
    name: 'C13 IEC PDU',
    shortName: 'C13 PDU',
    standard: 'IEC 60320 C13 — 10A or 16A / 250V / 50–60Hz',
    plug: 'C14 input (compatible with standard server PSU cables)',
    voltageNote: 'IEC standard: 10A or 16A / 250V / 50–60Hz. C14 plug compatible.',
    image: '/images/pdu/c13c19-pdu.jpg',
    highlightSkus: [
      '8-Way C13 10A + Switch + SPD',
      '8-Way C13 16A + Switch + SPD',
      'X×C13 + X×C19 + Switch + SPD',
    ],
    notes: 'Mixed C13/C19 configurations available. C14 or C20 input plug optional.',
  },
  {
    slug: 'c19-pdu',
    name: 'C19 IEC PDU',
    shortName: 'C19 PDU',
    standard: 'IEC 60320 C19 — 16A or 20A / 250V / 50–60Hz',
    plug: 'C20 input (high-current server and UPS applications)',
    voltageNote: 'IEC standard: 16A or 20A / 250V / 50–60Hz. C20 plug compatible.',
    image: '/images/pdu/c13c19-pdu.jpg',
    highlightSkus: [
      '8-Way C19 16A + Switch + SPD',
      'X×C13 + X×C19 + Switch + SPD',
    ],
    notes: 'Mixed C13/C19 configurations available on request.',
  },
]

export function getPduBySlug(slug) {
  return pduTypes.find(p => p.slug === slug) || null
}

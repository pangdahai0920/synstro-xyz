export const productLines = [
  {
    slug: 'bess-cabinet',
    href: '/products/bess-cabinet/',
    title: 'BESS Cabinets',
    eyebrow: 'Energy Storage Enclosures',
    image: '/images/factory/product-lineup.jpg',
    summary:
      'Outdoor, indoor, and container-type battery energy storage enclosures for EPC contractors and system integrators.',
    specs: ['IP54 / IP65 options', 'SPCC 1.2-3.0mm steel', '10 kWh to 1 MWh+', 'Custom bus-bar and cable entry'],
  },
  {
    slug: 'server-rack',
    href: '/products/server-rack/',
    title: 'Server Racks',
    eyebrow: 'IT Infrastructure',
    image: '/images/server-rack/wb-12u.jpg',
    summary:
      '19-inch wall-mount, floor-standing, and outdoor server rack enclosures with OEM dimensions and finish options.',
    specs: ['2U to 42U range', 'Wall and floor mount', 'IP55 outdoor series', 'EIA 310-D compatible'],
  },
  {
    slug: 'pdu',
    href: '/products/pdu/',
    title: 'PDU Systems',
    eyebrow: 'Power Distribution',
    image: '/images/pdu/pdu-modules.png',
    summary:
      'Rack power distribution units for UK, US, EU, Universal, C13, and C19 standards with configurable modules.',
    specs: ['6/8/10-way options', '10A to 20A', 'Switch, SPD, overload', 'Custom plug and cable length'],
  },
]

export const companyStats = [
  { value: '2019', label: 'Founded in Chengdu' },
  { value: '5,000+', label: 'Units per year' },
  { value: '20+', label: 'Export markets' },
  { value: '30+', label: 'OEM clients' },
]

export const manufacturingSteps = [
  { title: 'Steel Processing', text: 'SPCC cold-rolled sheet intake, thickness verification, CNC laser cutting, and punching.' },
  { title: 'Forming and Welding', text: 'CNC press brake forming with TIG/MIG welding and dimensional inspection on structural joints.' },
  { title: 'Surface Treatment', text: 'In-house electrostatic powder coating with custom RAL color support for export projects.' },
  { title: 'Assembly and QC', text: 'Hardware fit, gasket installation, torque checks, packing inspection, and export documentation.' },
]

export const trustSignals = [
  'ISO 9001 certified quality management',
  'ISO 14001 and ISO 45001 certificates available',
  'OEM / ODM drawings reviewed by engineering',
  'EXW Chengdu with FCL/LCL export support',
]

export const markets = [
  'Data centers',
  'Telecom infrastructure',
  'Solar and BESS projects',
  'EPC contractors',
  'System integrators',
  'Government and enterprise facilities',
]

export const bessSeries = [
  {
    id: 'outdoor-bess',
    tag: 'Outdoor BESS',
    title: 'Outdoor Battery Energy Storage Cabinets',
    desc: 'Freestanding IP-rated cabinets for C&I battery systems, outdoor power sites, and distributed storage projects.',
    products: [
      { model: 'BESS-50kWh-OD', capacity: '50 kWh', dims: '800 x 1000 x 1900 mm', steel: 'SPCC 2.0mm', ip: 'IP54', thermal: 'Natural ventilation', finish: 'RAL 7035 powder coat' },
      { model: 'BESS-100kWh-OD', capacity: '100 kWh', dims: '1000 x 1000 x 2100 mm', steel: 'SPCC 2.0mm', ip: 'IP54', thermal: 'Forced ventilation', finish: 'RAL 7035 powder coat' },
      { model: 'BESS-200kWh-OD', capacity: '200 kWh', dims: '2000 x 1000 x 2200 mm', steel: 'SPCC 2.0mm', ip: 'IP54', thermal: 'Fans + thermostat', finish: 'Custom RAL available' },
    ],
  },
  {
    id: 'container-bess',
    tag: 'Container-Type',
    title: 'Container-Type BESS Enclosures',
    desc: '20ft and 40ft-compatible structures with custom bus-bar layout, cable entry, HVAC interface, and PCS access panels.',
    products: [
      { model: 'BESS-500kWh-CT', capacity: '500 kWh', dims: '6058 x 2438 x 2591 mm', steel: 'SPCC 3.0mm + frame', ip: 'IP54', thermal: 'HVAC interface', finish: 'RAL 9005 / custom' },
      { model: 'BESS-1MWh-CT', capacity: '1 MWh', dims: '12192 x 2438 x 2591 mm', steel: 'SPCC 3.0mm + frame', ip: 'IP54', thermal: 'HVAC interface', finish: 'RAL 9005 / custom' },
    ],
  },
  {
    id: 'indoor-bess',
    tag: 'Indoor BESS',
    title: 'Indoor Battery Cabinets',
    desc: 'Compact wall-mount and freestanding cabinets for commercial storage, BMS compartments, and module integration.',
    products: [
      { model: 'BESS-10kWh-IN', capacity: '10 kWh', dims: '600 x 600 x 1200 mm', steel: 'SPCC 1.5mm', ip: 'IP20', thermal: 'Passive vents', finish: 'RAL 7016 powder coat' },
      { model: 'BESS-20kWh-IN', capacity: '20 kWh', dims: '600 x 700 x 1600 mm', steel: 'SPCC 1.5mm', ip: 'IP20', thermal: 'Optional fan tray', finish: 'RAL 7016 powder coat' },
      { model: 'BESS-WM-5kWh', capacity: '5 kWh', dims: '600 x 250 x 900 mm', steel: 'SPCC 1.2mm', ip: 'IP20', thermal: 'Passive', finish: 'White / black powder coat' },
    ],
  },
]

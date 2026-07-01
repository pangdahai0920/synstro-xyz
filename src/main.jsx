import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const products = [
  {
    slug: 'network-cabinets',
    en: { title: 'Network Cabinets & Server Racks', eyebrow: 'Indoor infrastructure', body: 'Wall-mount cabinets, floor-standing network cabinets, and server racks for structured cabling, edge rooms, data closets, and equipment integration.', items: ['Wall-mount network cabinets', 'Floor-standing network cabinets', 'Server racks with ventilated doors'] },
    zh: { title: '网络机柜与服务器机柜', eyebrow: '室内基础设施', body: '覆盖壁挂机柜、落地网络机柜和服务器机柜，适用于综合布线、边缘机房、弱电间和设备集成场景。', items: ['壁挂式网络机柜', '落地式网络机柜', '前后网孔门服务器机柜'] }
  },
  {
    slug: 'pdu-power',
    en: { title: 'PDU, Smart PDU & Mining PDU', eyebrow: 'Power distribution', body: 'Rack PDUs, intelligent metered PDUs for remote monitoring, and high-load mining PDUs for dense equipment rooms.', items: ['Basic rack PDUs', 'Metered and switched smart PDUs', 'High-current mining PDUs'] },
    zh: { title: 'PDU、智能 PDU 与矿机 PDU', eyebrow: '电源分配', body: '提供机柜配套 PDU、支持远程监控的智能 PDU，以及适合高负载设备间的矿机 PDU。', items: ['基础机柜 PDU', '计量型与开关型智能 PDU', '大电流矿机 PDU'] }
  },
  {
    slug: 'outdoor-telecom',
    en: { title: 'Outdoor Weatherproof Cabinets & Telecom Boxes', eyebrow: 'Outdoor protection', body: 'Weatherproof outdoor enclosures, energy storage cabinets, and telecom boxes for sealed, durable equipment protection.', items: ['Outdoor rainproof cabinets', 'Energy storage enclosures', 'Telecom cabinets and wall boxes'] },
    zh: { title: '户外防雨柜、储能柜与电信箱柜', eyebrow: '户外防护', body: '面向户外站点的防雨柜、储能柜和电信箱柜，为设备提供密封、耐用且便于维护的防护空间。', items: ['户外防雨柜', '储能柜', '电信柜与电信箱'] }
  }
];

const copy = {
  en: {
    nav: ['Products', 'Applications', 'Strengths', 'Inquiry'], switch: '中文',
    heroEyebrow: 'Network cabinets and power infrastructure for B2B projects',
    heroTitle: 'Cabinets, PDUs, and outdoor enclosures built for reliable equipment rooms.',
    heroBody: 'Synstro helps integrators, distributors, and project buyers source rack cabinets, intelligent power distribution, mining PDUs, and weatherproof telecom enclosures with flexible specifications.',
    cta: 'Send an inquiry', details: 'View details', applicationsTitle: 'Built for practical deployment scenarios', strengthsTitle: 'Why buyers work with Synstro', contactTitle: 'Tell us what your project needs.',
    apps: ['Data closets, office networks, and campus cabling rooms', 'Edge data centers, telecom nodes, and outdoor equipment stations', 'Mining facilities, power rooms, and high-density electrical loads', 'Energy storage, industrial control, and system integration projects'],
    strengths: ['Clear product families for cabinets, PDUs, and outdoor enclosures', 'Custom dimensions, colors, ventilation, power layouts, and accessory matching', 'Procurement-friendly specs, drawings, and quote-ready details', 'Bilingual structure for international buyers and Chinese documentation']
  },
  zh: {
    nav: ['产品', '应用', '优势', '询盘'], switch: 'English',
    heroEyebrow: '面向 B2B 项目的网络机柜与配电基础设施',
    heroTitle: '为可靠设备间打造网络机柜、PDU 与户外防护箱柜。',
    heroBody: 'Synstro 面向集成商、经销商和项目采购，提供机柜、智能配电、矿机 PDU 与户外电信防护箱柜，支持灵活规格配置。',
    cta: '发送询盘', details: '查看详情', applicationsTitle: '适用于实际部署场景', strengthsTitle: '为什么项目采购选择 Synstro', contactTitle: '告诉我们您的项目需求。',
    apps: ['弱电间、办公网络和园区综合布线机房', '边缘数据中心、通信节点和户外设备站点', '矿机场景、配电房和高密度电力负载', '储能、工业控制和系统集成项目'],
    strengths: ['覆盖机柜、PDU 和户外箱柜的清晰产品系列', '支持尺寸、颜色、通风、配电布局和附件匹配定制', '围绕规格、图纸和报价信息进行项目化沟通', '中英双语站点结构，方便海外采购与中文资料并行']
  }
};

function parseRoute() {
  const parts = location.pathname.split('/').filter(Boolean);
  const locale = parts[0] === 'zh' ? 'zh' : 'en';
  const product = parts[1] === 'products' ? products.find(p => p.slug === parts[2]) : null;
  const contact = parts[1] === 'contact';
  return { locale, product, contact };
}

function App() {
  const [route, setRoute] = React.useState(parseRoute());
  React.useEffect(() => {
    if (location.pathname === '/') history.replaceState({}, '', '/en');
    const onPop = () => setRoute(parseRoute());
    addEventListener('popstate', onPop);
    document.documentElement.lang = route.locale === 'zh' ? 'zh-CN' : 'en';
    document.title = route.locale === 'zh' ? 'Synstro 网络机柜、PDU、户外防雨柜与电信箱柜' : 'Synstro Network Cabinets, PDUs, Outdoor Telecom Enclosures';
    return () => removeEventListener('popstate', onPop);
  }, [route.locale]);
  const t = copy[route.locale];
  const other = route.locale === 'en' ? 'zh' : 'en';
  const nav = path => { history.pushState({}, '', path); setRoute(parseRoute()); scrollTo({ top: 0, behavior: 'smooth' }); };
  return <div className="shell"><Backdrop/><header><button className="brand" onClick={() => nav('/'+route.locale)}><span>S</span><b>Synstro</b><small>Cabinet Infrastructure</small></button><nav><a href={'/'+route.locale+'#products'}>{t.nav[0]}</a><a href={'/'+route.locale+'#applications'}>{t.nav[1]}</a><a href={'/'+route.locale+'#strengths'}>{t.nav[2]}</a><button onClick={() => nav(location.pathname.replace(/^\/(en|zh)/,'/'+other))}>{t.switch}</button><button className="primary small" onClick={() => nav('/'+route.locale+'/contact')}>{t.nav[3]}</button></nav></header>{route.product ? <Product locale={route.locale} product={route.product} nav={nav}/> : route.contact ? <Contact locale={route.locale}/> : <Home locale={route.locale} nav={nav}/>}<footer><b>Synstro</b><span>sales@synstro.xyz</span></footer></div>;
}
function Backdrop(){return <div className="backdrop"><i/><i/><i/></div>}
function HeroArt(){return <div className="hero-art"><div className="rack"><em/><em/><em/><em/><em/><em/><em/></div><div className="pdu"><span/><span/><span/><span/><b/></div><div className="outdoor"><span/><span/><b/></div><strong>Cabinet + PDU + Outdoor</strong></div>}
function Home({locale, nav}){const t=copy[locale];return <main><section className="hero reveal"><div><p className="eyebrow">{t.heroEyebrow}</p><h1>{t.heroTitle}</h1><p className="lead">{t.heroBody}</p><div className="actions"><button className="primary" onClick={()=>nav('/'+locale+'/contact')}>{t.cta}</button><a href="#products">{locale==='en'?'View product series':'查看产品系列'}</a></div><div className="chips"><span>Indoor + outdoor</span><span>OEM/ODM ready</span><span>Project-based specs</span></div></div><HeroArt/></section><section id="products"><p className="eyebrow">{t.nav[0]}</p><h2>{locale==='en'?'Product series':'产品系列'}</h2><div className="quick">{products.map(p=><button key={p.slug} onClick={()=>nav('/'+locale+'/products/'+p.slug)}><small>{p[locale].eyebrow}</small>{p[locale].title}</button>)}</div><div className="cards">{products.map(p=><article key={p.slug}><ProductVisual/><small>{p[locale].eyebrow}</small><h3>{p[locale].title}</h3><p>{p[locale].body}</p><button onClick={()=>nav('/'+locale+'/products/'+p.slug)}>{t.details} →</button></article>)}</div></section><section id="applications" className="split"><h2>{t.applicationsTitle}</h2><div>{t.apps.map(x=><p key={x}>✓ {x}</p>)}</div></section><section id="strengths" className="strength"><p className="eyebrow">{t.nav[2]}</p><h2>{t.strengthsTitle}</h2><div>{t.strengths.map(x=><p key={x}>{x}</p>)}</div></section><section className="cta"><h2>{locale==='en'?'Send your cabinet or PDU requirements.':'发送您的机柜或 PDU 项目需求。'}</h2><button className="primary" onClick={()=>nav('/'+locale+'/contact')}>{t.cta}</button></section></main>}
function ProductVisual(){return <div className="visual"><span/><span/><span/></div>}
function Product({locale, product, nav}){return <main><section className="detail"><div><p className="eyebrow">{product[locale].eyebrow}</p><h1>{product[locale].title}</h1><p className="lead">{product[locale].body}</p><button className="primary" onClick={()=>nav('/'+locale+'/contact')}>{locale==='en'?'Ask for specifications':'咨询规格'}</button></div><HeroArt/></section><section className="cards three">{product[locale].items.map(x=><article key={x}><h3>{x}</h3><p>{locale==='en'?'Project specifications, dimensions, finish, and accessories can be adjusted by request.':'规格、尺寸、表面处理和附件可根据项目需求调整。'}</p></article>)}</section></main>}
function Contact({locale}){const t=copy[locale];return <main><section className="contact"><p className="eyebrow">{t.nav[3]}</p><h1>{t.contactTitle}</h1><p className="lead">{locale==='en'?'Email us your cabinet type, size, PDU layout, quantity, destination, and drawings if available.':'请提供机柜类型、尺寸、PDU 布局、数量、目的地，以及已有图纸或招标要求。'}</p><div className="contact-box"><a href="mailto:sales@synstro.xyz">sales@synstro.xyz</a><span>WhatsApp TODO</span></div></section></main>}

createRoot(document.getElementById('root')).render(<App />);

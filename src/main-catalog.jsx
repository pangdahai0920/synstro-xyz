import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { catalogSeries, seriesForProduct, seriesTitle, findSeries } from './catalog.js';

const productAssets = {
  hero: '/assets/products/hero-cabinet-lineup.svg',
  network: '/assets/products/network-cabinet.svg',
  pdu: '/assets/products/pdu-power.svg',
  outdoor: '/assets/products/outdoor-telecom.svg'
};

const products = [
  {
    slug: 'network-cabinets',
    asset: productAssets.network,
    en: { title: 'Network Cabinets & Server Racks', eyebrow: 'Indoor infrastructure', body: 'Wall-mount cabinets, floor-standing cabinets, server cabinets, and data center racks based on the model list from the product parameter sheet.' },
    zh: { title: '网络机柜与服务器机柜', eyebrow: '室内基础设施', body: '根据产品参数表整理壁挂机柜、落地机柜、服务器机柜和数据中心机柜系列，并按型号展示尺寸、体积、重量和配件。' }
  },
  {
    slug: 'pdu-power',
    asset: productAssets.pdu,
    en: { title: 'Rack PDU by Socket Standard', eyebrow: 'Power distribution', body: 'PDU directory organized by socket type, copper wire specification, rated current, outlet quantity, switch, and cable description.' },
    zh: { title: '按插座标准分类的 PDU', eyebrow: '电源分配', body: '根据参数表按 Multi Universal、英标、美标、欧标、C13、C19 分类，展示线缆规格、额定电流和配置描述。' }
  },
  {
    slug: 'outdoor-telecom',
    asset: productAssets.outdoor,
    en: { title: 'Outdoor Waterproof Cabinets', eyebrow: 'Outdoor protection', body: 'Outdoor waterproof network cabinets and air-conditioning waterproof battery cabinets organized by model and cabinet size.' },
    zh: { title: '户外防水柜与电池柜', eyebrow: '户外防护', body: '根据参数表整理户外防水网络机柜、空调防水电池柜，按型号展示柜体尺寸。' }
  }
];

const copy = {
  en: {
    nav: { home: 'Home', products: 'Products', applications: 'Applications', advantages: 'Advantages', reviews: 'Reviews', about: 'About us', inquiry: 'Inquiry' },
    switch: '中文',
    heroEyebrow: 'Network cabinets and power infrastructure for B2B projects',
    heroTitle: 'Network cabinets, PDUs, and outdoor enclosures organized by product series and model.',
    heroBody: 'Synstro helps buyers compare cabinet series, PDU socket standards, model dimensions, volume, weight, accessories, and project requirements from one structured catalog.',
    cta: 'Send inquiry', view: 'View models', catalog: 'Product catalog', modelCount: 'models', series: 'Series', productModels: 'Product models', contactTitle: 'Tell us what your project needs.',
    apps: ['Data closets, office networks, and campus cabling rooms', 'Edge data centers, telecom nodes, and outdoor equipment stations', 'Rack power distribution and PDU replacement projects', 'Energy storage, outdoor power, and industrial integration projects'],
    advantages: ['Catalog is organized by real model data from the parameter sheet', 'Model tables show size, volume, weight, accessories, wire, current, and description', 'Each product series has a direct inquiry path', 'Bilingual structure supports overseas buyers and Chinese specification work'],
    form: { name: 'Name', company: 'Company', email: 'Email', phone: 'WhatsApp / phone', country: 'Country / region', product: 'Product / series', quantity: 'Quantity', message: 'Project message', submit: 'Prepare inquiry email', note: 'The form opens your email client with the inquiry details. You can also email sales@synstro.xyz directly.' }
  },
  zh: {
    nav: { home: '首页', products: '产品', applications: '应用', advantages: '优势', reviews: '客户评价', about: '关于我们', inquiry: '询盘' },
    switch: 'English',
    heroEyebrow: '面向 B2B 项目的网络机柜与配电基础设施',
    heroTitle: '按产品系列和型号整理网络机柜、PDU 与户外柜。',
    heroBody: 'Synstro 帮助采购客户快速比较机柜系列、PDU 插座标准、型号尺寸、体积、重量、配件和项目需求。',
    cta: '发送询盘', view: '查看型号', catalog: '产品目录', modelCount: '个型号', series: '系列', productModels: '产品型号', contactTitle: '告诉我们您的项目需求。',
    apps: ['弱电间、办公网络和园区综合布线机房', '边缘数据中心、通信节点和户外设备站点', '机柜配电和 PDU 替换项目', '储能、户外电源和工业集成项目'],
    advantages: ['产品目录基于真实参数表整理', '型号表展示尺寸、体积、重量、配件、线缆、电流和描述', '每个产品系列都有直接询盘路径', '中英双语结构方便海外采购和中文规格沟通'],
    form: { name: '姓名', company: '公司', email: '邮箱', phone: 'WhatsApp / 电话', country: '国家 / 地区', product: '产品 / 系列', quantity: '数量', message: '项目留言', submit: '生成询盘邮件', note: '表单会打开您的邮箱并带入询盘内容，也可以直接发送邮件至 sales@synstro.xyz。' }
  }
};

const reviews = {
  en: ['Clear dimensions helped our team select rack cabinets faster.', 'PDU current and cable descriptions are easy for procurement review.', 'The outdoor cabinet model table makes project comparison much clearer.'],
  zh: ['尺寸参数清楚，方便我们快速筛选机柜。', 'PDU 电流和线缆描述明确，适合采购审核。', '户外柜型号表让项目对比更清晰。']
};

const pageSet = new Set(['products', 'applications', 'advantages', 'reviews', 'about']);

function productBySlug(slug) { return products.find((product) => product.slug === slug) || null; }
function seriesPath(locale, series) { return `/${locale}/products/${series.parent}/${series.slug}`; }
function productPath(locale, product) { return `/${locale}/products/${product.slug}`; }
function productSeries(product) { return seriesForProduct(product.slug); }
function totalModels(product) { return productSeries(product).reduce((sum, series) => sum + series.models.length, 0); }

function parseRoute() {
  const parts = location.pathname.split('/').filter(Boolean);
  const locale = parts[0] === 'zh' ? 'zh' : 'en';
  const product = parts[1] === 'products' && parts[2] ? productBySlug(parts[2]) : null;
  const series = product && parts[3] ? findSeries(product.slug, parts[3]) : null;
  const page = !product && pageSet.has(parts[1]) ? parts[1] : null;
  return { locale, product, series, page, contact: parts[1] === 'contact' };
}

function activeNavIndex(route) {
  if (route.contact) return 6;
  if (route.product || route.page === 'products') return 1;
  if (route.page === 'applications') return 2;
  if (route.page === 'advantages') return 3;
  if (route.page === 'reviews') return 4;
  if (route.page === 'about') return 5;
  return 0;
}

function applySeo(route) {
  const isZh = route.locale === 'zh';
  const title = route.series ? `${seriesTitle(route.series, route.locale)} | Synstro` : route.product ? `${route.product[route.locale].title} | Synstro` : isZh ? 'Synstro 网络机柜、PDU 与户外柜产品目录' : 'Synstro Network Cabinet, PDU, Outdoor Cabinet Catalog';
  const description = route.series ? `${seriesTitle(route.series, route.locale)} model table and specifications from Synstro.` : route.product ? route.product[route.locale].body : isZh ? 'Synstro 产品目录按分类、系列和型号展示网络机柜、PDU 与户外防水柜参数。' : 'Synstro catalog organized by category, series, model, and specifications for network cabinets, PDUs, and outdoor cabinets.';
  document.documentElement.lang = isZh ? 'zh-CN' : 'en';
  document.title = title;
  const meta = document.querySelector('meta[name="description"]') || document.head.appendChild(document.createElement('meta'));
  meta.name = 'description';
  meta.content = description;
}

function App() {
  const [route, setRoute] = useState(parseRoute());
  useEffect(() => {
    if (location.pathname === '/') history.replaceState({}, '', '/en');
    const sync = () => setRoute(parseRoute());
    addEventListener('popstate', sync);
    return () => removeEventListener('popstate', sync);
  }, []);
  useEffect(() => applySeo(route), [route]);

  const t = copy[route.locale];
  const other = route.locale === 'en' ? 'zh' : 'en';
  const navItems = useMemo(() => [
    { label: t.nav.home, href: `/${route.locale}` },
    { label: t.nav.products, href: `/${route.locale}/products` },
    { label: t.nav.applications, href: `/${route.locale}/applications` },
    { label: t.nav.advantages, href: `/${route.locale}/advantages` },
    { label: t.nav.reviews, href: `/${route.locale}/reviews` },
    { label: t.nav.about, href: `/${route.locale}/about` },
    { label: t.nav.inquiry, href: `/${route.locale}/contact` }
  ], [route.locale, t]);
  const nav = (path) => { history.pushState({}, '', path); setRoute(parseRoute()); setTimeout(() => scrollTo({ top: 0, behavior: 'smooth' }), 0); };
  const languagePath = `${location.pathname.replace(/^\/(en|zh)/, '/' + other)}${location.search}`;
  const page = route.contact ? <Contact locale={route.locale} /> : route.series ? <SeriesPage locale={route.locale} product={route.product} series={route.series} nav={nav} /> : route.product ? <ProductPage locale={route.locale} product={route.product} nav={nav} /> : route.page ? <StaticPage locale={route.locale} page={route.page} nav={nav} /> : <Home locale={route.locale} nav={nav} />;

  return <div className="shell"><Backdrop /><header><button className="brand" onClick={() => nav('/' + route.locale)}><span>S</span><b>SYNSTRO</b></button><nav className="plain-nav" aria-label="Primary navigation">{navItems.map((item, index) => <a key={item.href} className={activeNavIndex(route) === index ? 'active' : ''} href={item.href} onClick={(event) => { event.preventDefault(); nav(item.href); }}>{item.label}</a>)}</nav><div className="header-actions"><button className="language" onClick={() => nav(languagePath)}>{t.switch}</button><button className="primary small" onClick={() => nav('/' + route.locale + '/contact')}>{t.nav.inquiry}</button></div></header>{page}<footer><b>SYNSTRO</b><span>sales@synstro.xyz</span></footer></div>;
}

function Backdrop() { return <div className="backdrop"><i /><i /><i /></div>; }
function ProductImage({ src, alt }) { return <div className="product-photo"><img src={src} alt={alt} loading="lazy" /><span>{alt}</span></div>; }
function HeroShowcase({ locale }) { return <div className="hero-showcase"><img src={productAssets.hero} alt={locale === 'en' ? 'Synstro product lineup' : 'Synstro 产品组合'} /><div className="showcase-tags"><b>{locale === 'en' ? 'Catalog by model' : '按型号建目录'}</b><span>{catalogSeries.length} series</span></div></div>; }

function Home({ locale, nav }) {
  const t = copy[locale];
  return <main><section className="hero reveal"><div><p className="eyebrow">{t.heroEyebrow}</p><h1>{t.heroTitle}</h1><p className="lead">{t.heroBody}</p><div className="actions"><button className="primary" onClick={() => nav('/' + locale + '/contact')}>{t.cta}</button><a href={'/' + locale + '/products'} onClick={(event) => { event.preventDefault(); nav('/' + locale + '/products'); }}>{locale === 'en' ? 'Open catalog' : '打开产品目录'}</a></div><div className="chips"><span>{catalogSeries.length} {t.series}</span><span>{catalogSeries.reduce((sum, s) => sum + s.models.length, 0)} {locale === 'en' ? 'models' : '个型号'}</span><span>OEM / ODM</span></div></div><HeroShowcase locale={locale} /></section><ProductsOverview locale={locale} nav={nav} compact /><InfoSections locale={locale} /><Testimonials locale={locale} /><CTA locale={locale} nav={nav} /></main>;
}

function ProductsOverview({ locale, nav, compact = false }) {
  const t = copy[locale];
  return <section id="products" className={compact ? '' : 'catalog-page'}><p className="eyebrow">{t.catalog}</p><h2>{locale === 'en' ? 'Product directory under Products' : '“产品”下的目录结构'}</h2><div className="cards product-grid">{products.map((product) => <ProductCard key={product.slug} product={product} locale={locale} nav={nav} />)}</div></section>;
}

function ProductCard({ product, locale, nav }) {
  const t = copy[locale];
  const series = productSeries(product);
  return <article className="product-card"><ProductImage src={product.asset} alt={product[locale].title} /><small>{product[locale].eyebrow}</small><h3>{product[locale].title}</h3><p>{product[locale].body}</p><ul><li><b>{copy[locale].series}</b><span>{series.length}</span></li><li><b>{locale === 'en' ? 'Models' : '型号'}</b><span>{totalModels(product)}</span></li><li><b>{locale === 'en' ? 'Directory' : '目录'}</b><span>/products/{product.slug}</span></li></ul><button onClick={() => nav(productPath(locale, product))}>{t.view} →</button></article>;
}

function ProductPage({ locale, product, nav }) {
  const t = copy[locale];
  const series = productSeries(product);
  return <main><section className="page-hero product-family-hero"><div><p className="eyebrow">{product[locale].eyebrow}</p><h1>{product[locale].title}</h1><p className="lead">{product[locale].body}</p><button className="primary" onClick={() => nav('/' + locale + '/contact?product=' + product.slug)}>{t.cta}</button></div><ProductImage src={product.asset} alt={product[locale].title} /></section><section className="catalog-section"><div className="section-head"><p className="eyebrow">{t.series}</p><h2>{locale === 'en' ? 'Choose a series to view models' : '选择系列查看型号'}</h2></div><div className="catalog-grid">{series.map((item) => <button key={item.slug} className="series-card" onClick={() => nav(seriesPath(locale, item))}><span>{seriesTitle(item, locale)}</span><b>{item.models.length} {t.modelCount}</b><small>/products/{item.parent}/{item.slug}</small></button>)}</div></section><CTA locale={locale} nav={nav} product={product[locale].title} /></main>;
}

function SeriesPage({ locale, product, series, nav }) {
  const t = copy[locale];
  const isPdu = series.parent === 'pdu-power';
  return <main><section className="page-hero"><p className="eyebrow">{product[locale].title}</p><h1>{seriesTitle(series, locale)}</h1><p className="lead">{locale === 'en' ? 'Model-level data imported from the product parameter sheet for buyer comparison and inquiry preparation.' : '从产品参数表导入的型号级参数，用于客户对比选型和询盘准备。'}</p><div className="actions"><button className="primary" onClick={() => nav('/' + locale + '/contact?product=' + encodeURIComponent(seriesTitle(series, locale)))}>{t.cta}</button><a href={productPath(locale, product)} onClick={(event) => { event.preventDefault(); nav(productPath(locale, product)); }}>{locale === 'en' ? 'Back to series' : '返回系列目录'}</a></div></section><section className="model-section"><div className="section-head"><p className="eyebrow">{t.productModels}</p><h2>{series.models.length} {t.modelCount}</h2></div><ModelTable models={series.models} locale={locale} isPdu={isPdu} /></section><CTA locale={locale} nav={nav} product={seriesTitle(series, locale)} /></main>;
}

function ModelTable({ models, locale, isPdu }) {
  const labels = isPdu ? (locale === 'en' ? ['Wire', 'Rated current', 'Description'] : ['线缆规格', '额定电流', '配置描述']) : (locale === 'en' ? ['Model', 'Size W*D*H', 'Volume CBM', 'Weight', 'Accessories'] : ['型号', '尺寸 W*D*H', '体积 CBM', '重量', '配件']);
  return <div className="model-table-wrap"><table className="model-table"><thead><tr>{labels.map((label) => <th key={label}>{label}</th>)}</tr></thead><tbody>{models.map((model, index) => isPdu ? <tr key={index}><td>{model.wire}</td><td>{model.current}</td><td>{model.description}</td></tr> : <tr key={model.model}><td>{model.model}</td><td>{model.size}</td><td>{model.volume}</td><td>{model.weight}</td><td>{model.accessories}</td></tr>)}</tbody></table></div>;
}

function InquiryForm({ locale, productTitle = '' }) {
  const t = copy[locale];
  const params = new URLSearchParams(location.search);
  const initialProduct = params.get('product') || productTitle;
  const [status, setStatus] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const subject = encodeURIComponent(`Synstro inquiry - ${data.product || 'project'}`);
    const body = encodeURIComponent([`Name: ${data.name || ''}`, `Company: ${data.company || ''}`, `Email: ${data.email || ''}`, `WhatsApp/Phone: ${data.phone || ''}`, `Country/Region: ${data.country || ''}`, `Product: ${data.product || ''}`, `Quantity: ${data.quantity || ''}`, '', data.message || ''].join('\n'));
    setStatus(locale === 'en' ? 'Opening your email client with inquiry details.' : '正在打开邮箱并带入询盘内容。');
    location.href = `mailto:sales@synstro.xyz?subject=${subject}&body=${body}`;
  };
  return <form className="inquiry-form" onSubmit={submit}><div className="form-grid"><label>{t.form.name}<input name="name" required /></label><label>{t.form.company}<input name="company" /></label><label>{t.form.email}<input type="email" name="email" required /></label><label>{t.form.phone}<input name="phone" /></label><label>{t.form.country}<input name="country" /></label><label>{t.form.product}<select name="product" defaultValue={initialProduct}>{products.map((product) => <option key={product.slug}>{product[locale].title}</option>)}{catalogSeries.map((series) => <option key={series.parent + series.slug}>{seriesTitle(series, locale)}</option>)}</select></label><label>{t.form.quantity}<input name="quantity" placeholder={locale === 'en' ? 'Example: 50 pcs' : '例如：50 台'} /></label></div><label>{t.form.message}<textarea name="message" rows="5" placeholder={locale === 'en' ? 'Model, size, quantity, destination, and project notes.' : '型号、尺寸、数量、目的地和项目说明。'} /></label><div className="form-actions"><button className="primary" type="submit">{t.form.submit}</button><span>{t.form.note}</span></div>{status ? <p className="status-note">{status}</p> : null}</form>;
}

function Contact({ locale }) { const t = copy[locale]; return <main><section className="contact contact-page"><div><p className="eyebrow">{t.nav.inquiry}</p><h1>{t.contactTitle}</h1><p className="lead">{locale === 'en' ? 'Send model, size, quantity, destination, and drawings if available.' : '请提供型号、尺寸、数量、目的地，以及已有图纸或招标要求。'}</p><div className="contact-box"><a href="mailto:sales@synstro.xyz">sales@synstro.xyz</a><span>WhatsApp TODO</span></div></div><InquiryForm locale={locale} /></section></main>; }
function InfoSections({ locale }) { const t = copy[locale]; return <><section id="applications" className="split"><h2>{t.nav.applications}</h2><div>{t.apps.map((x) => <p key={x}>✓ {x}</p>)}</div></section><section id="strengths" className="strength"><p className="eyebrow">{t.nav.advantages}</p><h2>{locale === 'en' ? 'Why this catalog works for buyers' : '为什么这个目录适合采购客户'}</h2><div>{t.advantages.map((x) => <p key={x}>{x}</p>)}</div></section></>; }
function Testimonials({ locale }) { const t = copy[locale]; return <section id="testimonials" className="testimonials"><div className="testimonial-panel"><div className="testimonial-top"><span>{locale === 'en' ? 'REVIEWS' : '客户评价'}</span><span>(03)</span></div><div className="testimonial-heading"><h2>{t.nav.reviews}</h2><p>{locale === 'en' ? 'Feedback around product selection and parameter clarity.' : '围绕产品选型和参数清晰度的反馈。'}</p></div><div className="testimonial-grid">{reviews[locale].map((quote, index) => <article key={quote}><div className="review-head"><span>{index + 1}</span><div><b>{locale === 'en' ? 'Overseas buyer' : '海外采购客户'}</b><small>Synstro catalog</small></div></div><p>{quote}</p></article>)}</div></div></section>; }
function StaticPage({ locale, page, nav }) { const t = copy[locale]; if (page === 'products') return <main><ProductsOverview locale={locale} nav={nav} /></main>; if (page === 'applications') return <main><section className="page-hero"><p className="eyebrow">{t.nav.applications}</p><h1>{locale === 'en' ? 'Applications' : '应用场景'}</h1></section><InfoSections locale={locale} /></main>; if (page === 'advantages') return <main><section className="page-hero"><p className="eyebrow">{t.nav.advantages}</p><h1>{locale === 'en' ? 'Advantages' : '优势能力'}</h1></section><InfoSections locale={locale} /></main>; if (page === 'reviews') return <main><Testimonials locale={locale} /></main>; return <main><section className="page-hero"><p className="eyebrow">{t.nav.about}</p><h1>{locale === 'en' ? 'About Synstro' : '关于 Synstro'}</h1><p className="lead">{locale === 'en' ? 'Synstro focuses on network cabinets, rack power distribution, outdoor cabinet protection, and project-based specification communication.' : 'Synstro 专注于网络机柜、机柜配电、户外柜防护和项目化规格沟通。'}</p><button className="primary" onClick={() => nav('/' + locale + '/contact')}>{t.cta}</button></section></main>; }
function CTA({ locale, nav, product = '' }) { const t = copy[locale]; return <section className="cta"><h2>{locale === 'en' ? 'Send your model and quantity requirements.' : '发送您的型号和数量需求。'}</h2><button className="primary" onClick={() => nav('/' + locale + '/contact' + (product ? '?product=' + encodeURIComponent(product) : ''))}>{t.cta}</button></section>; }

createRoot(document.getElementById('root')).render(<App />);

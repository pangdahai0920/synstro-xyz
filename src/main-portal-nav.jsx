import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { catalogSeries, seriesForProduct, seriesTitle, findSeries } from './catalog.js';
import { IndustrialProductDetailPage } from './IndustrialProductDetailPage.jsx';

const productAssets = {
  hero: '/assets/products/hero-cabinet-lineup.svg',
  network: '/assets/products/network-cabinet.svg',
  pdu: '/assets/products/pdu-power.svg',
  outdoor: '/assets/products/outdoor-telecom.svg'
};

const products = [
  { slug: 'network-cabinets', asset: productAssets.network, en: { title: 'Network Cabinets & Server Racks', eyebrow: 'Indoor infrastructure', body: 'Industrial cabinet systems for wall-mount, floor-standing, server rack, data center, and accessory requirements. Use the Products mega menu to open exact series pages and model tables.' }, zh: { title: '网络机柜与服务器机柜', eyebrow: '室内基础设施', body: '覆盖壁挂机柜、落地机柜、服务器机柜、数据中心机柜和配件需求。请通过顶部产品 Mega Menu 进入具体系列和型号参数页。' } },
  { slug: 'pdu-power', asset: productAssets.pdu, en: { title: 'Rack PDU by Socket Standard', eyebrow: 'Power distribution', body: 'Rack PDU lines organized by socket standard, pure copper wire specification, rated current, cable description, and project configuration.' }, zh: { title: '按插座标准分类的 PDU', eyebrow: '电源分配', body: '按插座标准、纯铜线规格、额定电流、线缆描述和项目配置整理机柜 PDU 产品线。' } },
  { slug: 'outdoor-telecom', asset: productAssets.outdoor, en: { title: 'Outdoor Waterproof Cabinets', eyebrow: 'Outdoor protection', body: 'Outdoor waterproof network cabinets and air-conditioning waterproof battery cabinets for telecom, edge, energy storage, and project sites.' }, zh: { title: '户外防水柜与电池柜', eyebrow: '户外防护', body: '面向通信、边缘节点、储能和项目现场的户外防水网络机柜与空调防水电池柜。' } }
];

const menuCategories = [
  { slug: 'network-cabinets', en: 'Network Cabinets', zh: '网络机柜', items: [['wall-mount-cabinets', 'Wall-mount Cabinets', '壁挂机柜'], ['floor-standing-cabinets', 'Floor-standing Cabinets', '落地机柜'], ['sever-cabinets', 'Server Cabinets', '服务器机柜'], ['network-cabinets', 'Network Cabinets', '网络机柜'], ['data-center-server-rack', 'Data Center Server Rack', '数据中心服务器机柜'], ['packing', 'Packing', '包装']] },
  { slug: 'pdu-power', en: 'PDU', zh: 'PDU', items: [['multi-universal-socket', 'Multi Universal Socket', '多功能通用插座'], ['uk-standard-bs1363', 'UK Standard BS1363', '英标 BS1363'], ['usa-standard', 'USA Standard', '美标'], ['germany-standard', 'Germany Standard', '德标'], ['c13', 'C13', 'C13'], ['c19', 'C19', 'C19']] },
  { slug: 'outdoor-telecom', en: 'Outdoor Waterproof Cabinets', zh: '户外防雨柜', items: [['outdoor-waterproof-network-cabinet', 'Outdoor Waterproof Network Cabinet', '户外防水网络机柜'], ['air-conditioning-waterproof-battery-cabinet', 'Air Conditioning Waterproof Battery Cabinet', '空调防水电池柜']] }
];

const copy = {
  en: {
    nav: { home: 'Home', products: 'Products', applications: 'Applications', advantages: 'Advantages', reviews: 'Reviews', about: 'About us', inquiry: 'Inquiry' },
    switch: '中文', cta: 'Send inquiry', catalog: 'Product catalog', series: 'Series', contactTitle: 'Tell us what your project needs.',
    heroEyebrow: 'Network cabinets and power infrastructure for B2B projects',
    heroTitle: 'Industrial network cabinets, rack PDUs, and outdoor enclosures for project procurement.',
    heroBody: 'Synstro is structured like a B2B product catalog: the header mega menu is the navigation system, category pages explain product families, and series pages provide model-level parameters for inquiry.',
    openCatalog: 'Use Products menu',
    apps: ['Data closets, office networks, and campus cabling rooms', 'Edge data centers, telecom nodes, and outdoor equipment stations', 'Rack power distribution and PDU replacement projects', 'Energy storage, outdoor power, and industrial integration projects'],
    advantages: ['Single-source mega menu prevents duplicated product navigation', 'Series pages show model dimensions, weight, accessories, wire, current, and descriptions', 'Inquiry CTA carries product context into the email draft', 'Bilingual structure supports overseas buyers and Chinese specification work'],
    reviews: ['Clear dimensions helped our team select rack cabinets faster.', 'PDU current and cable descriptions are easy for procurement review.', 'The outdoor cabinet model table makes project comparison much clearer.'],
    form: { name: 'Name', company: 'Company', email: 'Email', phone: 'WhatsApp / phone', country: 'Country / region', product: 'Product / series', quantity: 'Quantity', message: 'Project message', submit: 'Prepare inquiry email', note: 'The form opens your email client with inquiry details. You can also email sales@synstro.xyz directly.' }
  },
  zh: {
    nav: { home: '首页', products: '产品', applications: '应用', advantages: '优势', reviews: '客户评价', about: '关于我们', inquiry: '询盘' },
    switch: 'English', cta: '发送询盘', catalog: '产品目录', series: '系列', contactTitle: '告诉我们您的项目需求。',
    heroEyebrow: '面向 B2B 项目的网络机柜与配电基础设施',
    heroTitle: '面向项目采购的工业网络机柜、机柜 PDU 与户外防护箱柜。',
    heroBody: 'Synstro 按 B2B 产品站结构搭建：顶部 Mega Menu 是唯一产品导航入口，分类页用于说明产品族，系列页提供型号级参数并承接询盘。',
    openCatalog: '使用产品菜单',
    apps: ['弱电间、办公网络和园区综合布线机房', '边缘数据中心、通信节点和户外设备站点', '机柜配电和 PDU 替换项目', '储能、户外电源和工业集成项目'],
    advantages: ['产品 Mega Menu 作为单一导航来源，避免重复目录', '系列页展示尺寸、重量、配件、线缆、电流和描述', '询盘 CTA 自动带入产品上下文', '中英双语结构方便海外采购和中文规格沟通'],
    reviews: ['尺寸参数清楚，方便我们快速筛选机柜。', 'PDU 电流和线缆描述明确，适合采购审核。', '户外柜型号表让项目对比更清晰。'],
    form: { name: '姓名', company: '公司', email: '邮箱', phone: 'WhatsApp / 电话', country: '国家 / 地区', product: '产品 / 系列', quantity: '数量', message: '项目留言', submit: '生成询盘邮件', note: '表单会打开您的邮箱并带入询盘内容，也可以直接发送邮件至 sales@synstro.xyz。' }
  }
};

const pageSet = new Set(['products', 'applications', 'advantages', 'reviews', 'about']);
const isTouchLike = () => window.matchMedia('(hover: none), (pointer: coarse), (max-width: 760px)').matches;

function displayTitle(value) { return String(value || '').replaceAll('Sever', 'Server').replaceAll('\n', ' '); }
function productBySlug(slug) { return products.find((product) => product.slug === slug) || null; }
function productPath(locale, product) { return `/${locale}/products/${product.slug}`; }
function productSeries(product) { return seriesForProduct(product.slug); }
function modelTotal(product) { return productSeries(product).reduce((sum, item) => sum + item.models.length, 0); }
function subcategoryPath(locale, category, item) { return `/${locale}/products/${category.slug}/${item[0]}`; }

function parseRoute() {
  const parts = location.pathname.split('/').filter(Boolean);
  const locale = parts[0] === 'zh' ? 'zh' : 'en';
  const product = parts[1] === 'products' && parts[2] ? productBySlug(parts[2]) : null;
  const series = product && parts[3] ? findSeries(product.slug, parts[3]) : null;
  const productId = parts[1] === 'product' ? parts[2] : null;
  const page = !product && !productId && pageSet.has(parts[1]) ? parts[1] : null;
  return { locale, product, series, productId, page, contact: parts[1] === 'contact' };
}

function activeNavIndex(route) {
  if (route.contact) return 6;
  if (route.product || route.page === 'products' || route.productId) return 1;
  if (route.page === 'applications') return 2;
  if (route.page === 'advantages') return 3;
  if (route.page === 'reviews') return 4;
  if (route.page === 'about') return 5;
  return 0;
}

function applySeo(route) {
  const isZh = route.locale === 'zh';
  const title = route.series ? `${displayTitle(seriesTitle(route.series, route.locale))} | Synstro` : route.product ? `${route.product[route.locale].title} | Synstro` : route.productId ? `Product ${route.productId} | Synstro` : isZh ? 'Synstro 网络机柜、PDU 与户外柜' : 'Synstro Network Cabinet, PDU, Outdoor Cabinet';
  const description = route.series ? `${displayTitle(seriesTitle(route.series, route.locale))} model selector, quote request, and parameter table from Synstro.` : route.product ? route.product[route.locale].body : isZh ? 'Synstro 工业网络机柜、PDU 与户外防护箱柜，产品导航由顶部 Mega Menu 统一承接。' : 'Synstro industrial network cabinets, rack PDUs, and outdoor cabinets with product navigation through a unified mega menu.';
  document.documentElement.lang = isZh ? 'zh-CN' : 'en';
  document.title = title;
  const meta = document.querySelector('meta[name="description"]') || document.head.appendChild(document.createElement('meta'));
  meta.name = 'description'; meta.content = description;
}

function useMegaMenu(locale, nav) {
  const [state, setState] = useState({ open: false, closing: false, activeCategory: 0, hoverLocked: false });
  const openTimer = useRef(0);
  const closeTimer = useRef(0);
  const triggerRef = useRef(null);

  const clearTimers = () => { clearTimeout(openTimer.current); clearTimeout(closeTimer.current); };
  const openMenu = (immediate = false) => {
    clearTimers();
    const apply = () => setState((prev) => ({ ...prev, open: true, closing: false, hoverLocked: true }));
    if (immediate || isTouchLike()) apply();
    else openTimer.current = window.setTimeout(apply, 100);
  };
  const startClose = () => {
    clearTimers();
    setState((prev) => ({ ...prev, closing: true, hoverLocked: false }));
    closeTimer.current = window.setTimeout(() => setState((prev) => ({ ...prev, open: false, closing: false, hoverLocked: false })), 260);
  };
  const toggleMenu = () => {
    if (state.open && !state.closing) startClose();
    else openMenu(true);
  };
  const selectCategory = (index) => setState((prev) => ({ ...prev, activeCategory: index, open: true, closing: false }));
  const navigateSubcategory = (category, item) => {
    clearTimers();
    setState((prev) => ({ ...prev, open: false, closing: false, hoverLocked: false }));
    nav(subcategoryPath(locale, category, item));
  };

  useEffect(() => () => clearTimers(), []);
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') startClose(); };
    const onPointerDown = (event) => {
      if (!state.open) return;
      if (event.target.closest('.product-mega-overlay') || event.target.closest('[data-product-trigger="true"]')) return;
      startClose();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointerDown); };
  }, [state.open]);

  return { state, triggerRef, openMenu, startClose, toggleMenu, selectCategory, navigateSubcategory };
}

function App() {
  const [route, setRoute] = useState(parseRoute());
  useEffect(() => { if (location.pathname === '/') history.replaceState({}, '', '/en'); const sync = () => setRoute(parseRoute()); addEventListener('popstate', sync); return () => removeEventListener('popstate', sync); }, []);
  useEffect(() => applySeo(route), [route]);
  const t = copy[route.locale];
  const other = route.locale === 'en' ? 'zh' : 'en';
  const navItems = useMemo(() => [
    { key: 'home', label: t.nav.home, href: `/${route.locale}` },
    { key: 'products', label: t.nav.products, href: '#products-menu' },
    { key: 'applications', label: t.nav.applications, href: `/${route.locale}/applications` },
    { key: 'advantages', label: t.nav.advantages, href: `/${route.locale}/advantages` },
    { key: 'reviews', label: t.nav.reviews, href: `/${route.locale}/reviews` },
    { key: 'about', label: t.nav.about, href: `/${route.locale}/about` },
    { key: 'inquiry', label: t.nav.inquiry, href: `/${route.locale}/contact` }
  ], [route.locale, t]);
  const nav = (path) => { history.pushState({}, '', path); setRoute(parseRoute()); setTimeout(() => scrollTo({ top: 0, behavior: 'smooth' }), 0); };
  const menu = useMegaMenu(route.locale, nav);
  const languagePath = `${location.pathname.replace(/^\/(en|zh)/, '/' + other)}${location.search}`;
  const page = route.contact ? <Contact locale={route.locale} /> : route.series ? <IndustrialProductDetailPage locale={route.locale} product={route.product} series={route.series} nav={nav} productPath={productPath} /> : route.product ? <CategoryPage locale={route.locale} product={route.product} nav={nav} /> : route.productId ? <ProductPlaceholder locale={route.locale} id={route.productId} nav={nav} /> : route.page ? <StaticPage locale={route.locale} page={route.page} nav={nav} /> : <Home locale={route.locale} nav={nav} />;

  return <div className="shell"><Backdrop /><Navbar route={route} t={t} navItems={navItems} nav={nav} languagePath={languagePath} triggerRef={menu.triggerRef} menuState={menu.state} onProductsEnter={() => menu.openMenu(false)} onProductsLeave={menu.startClose} onProductsClick={menu.toggleMenu} /><MegaMenu locale={route.locale} menu={menu} />{page}<footer><b>SYNSTRO</b><span>sales@synstro.xyz</span></footer></div>;
}

function Navbar({ route, t, navItems, nav, languagePath, triggerRef, menuState, onProductsEnter, onProductsLeave, onProductsClick }) {
  return <header><button className="brand" onClick={() => nav('/' + route.locale)}><span>S</span><b>SYNSTRO</b></button><nav className="plain-nav" aria-label="Primary navigation">{navItems.map((item, index) => item.key === 'products' ? <a key={item.key} ref={triggerRef} className={activeNavIndex(route) === index ? 'active' : ''} href="#products-menu" data-product-trigger="true" aria-haspopup="true" aria-expanded={menuState.open} onPointerEnter={() => { if (!isTouchLike()) onProductsEnter(); }} onPointerLeave={() => { if (!isTouchLike()) onProductsLeave(); }} onClick={(event) => { event.preventDefault(); onProductsClick(); }}>{item.label}</a> : <a key={item.key} className={activeNavIndex(route) === index ? 'active' : ''} href={item.href} onClick={(event) => { event.preventDefault(); nav(item.href); }}>{item.label}</a>)}</nav><div className="header-actions"><button className="language" onClick={() => nav(languagePath)}>{t.switch}</button><button className="primary small" onClick={() => nav('/' + route.locale + '/contact')}>{t.nav.inquiry}</button></div></header>;
}

function MegaMenu({ locale, menu }) {
  const { state, openMenu, startClose, selectCategory, navigateSubcategory } = menu;
  const category = menuCategories[state.activeCategory] || menuCategories[0];
  if (!state.open && !state.closing) return null;
  return createPortal(<div className={`product-mega-overlay ${state.open ? 'open' : ''} ${state.closing ? 'closing' : ''}`} onPointerEnter={() => { if (!isTouchLike()) openMenu(true); }} onPointerLeave={() => { if (!isTouchLike()) startClose(); }}><div className="mega-portal-panel" role="menu"><div className="mega-primary" role="tablist">{menuCategories.map((item, index) => <button key={item.slug} type="button" className={state.activeCategory === index ? 'active' : ''} aria-selected={state.activeCategory === index} onPointerEnter={() => { if (!isTouchLike()) selectCategory(index); }} onFocus={() => selectCategory(index)} onClick={() => selectCategory(index)}>{item[locale]}</button>)}</div><div className="mega-secondary" role="tabpanel"><div className="mega-category-title">{category[locale]}</div><div className="mega-list">{category.items.map((item) => <a key={item[0]} href={subcategoryPath(locale, category, item)} role="menuitem" onClick={(event) => { event.preventDefault(); navigateSubcategory(category, item); }}>{item[locale === 'zh' ? 2 : 1]}</a>)}</div></div></div></div>, document.body);
}

function Backdrop() { return <div className="backdrop"><i /><i /><i /></div>; }
function ProductImage({ src, alt }) { return <div className="product-photo"><img src={src} alt={alt} loading="lazy" /><span>{alt}</span></div>; }
function HeroShowcase({ locale }) { return <div className="hero-showcase"><img src={productAssets.hero} alt={locale === 'en' ? 'Synstro product lineup' : 'Synstro 产品组合'} /><div className="showcase-tags"><b>{locale === 'en' ? 'Mega menu catalog' : 'Mega Menu 产品导航'}</b><span>{catalogSeries.length} series</span></div></div>; }
function Home({ locale, nav }) { const t = copy[locale]; return <main><section className="hero reveal"><div><p className="eyebrow">{t.heroEyebrow}</p><h1>{t.heroTitle}</h1><p className="lead">{t.heroBody}</p><div className="actions"><button className="primary" onClick={() => nav('/' + locale + '/contact')}>{t.cta}</button><span className="soft-action">{t.openCatalog}</span></div><div className="chips"><span>{catalogSeries.length} {t.series}</span><span>{catalogSeries.reduce((sum, s) => sum + s.models.length, 0)} {locale === 'en' ? 'models' : '个型号'}</span><span>OEM / ODM</span></div></div><HeroShowcase locale={locale} /></section><InfoSections locale={locale} /><Testimonials locale={locale} /><CTA locale={locale} nav={nav} /></main>; }
function CategoryPage({ locale, product, nav }) { const t = copy[locale]; const series = productSeries(product); return <main><section className="page-hero product-family-hero"><div><p className="eyebrow">{product[locale].eyebrow}</p><h1>{product[locale].title}</h1><p className="lead">{product[locale].body}</p><div className="category-facts"><span>{series.length} {locale === 'en' ? 'series managed in mega menu' : '个系列由 Mega Menu 管理'}</span><span>{modelTotal(product)} {locale === 'en' ? 'model rows' : '条型号参数'}</span><span>{locale === 'en' ? 'Series pages hold model tables and quote CTAs.' : '系列页承接型号参数表和询盘 CTA。'}</span></div><button className="primary" onClick={() => nav('/' + locale + '/contact?product=' + product.slug)}>{t.cta}</button></div><ProductImage src={product.asset} alt={product[locale].title} /></section><section className="split"><h2>{locale === 'en' ? 'Category role' : '分类页作用'}</h2><div><p>{locale === 'en' ? 'This page is a content page for the product family. It intentionally does not duplicate the category and subcategory navigation from the header mega menu.' : '该页面是产品族内容页，刻意不重复顶部 Mega Menu 中的分类和二级分类导航。'}</p><p>{locale === 'en' ? 'Use the Products menu to move into a specific series PDP, then compare models and send an inquiry.' : '请使用顶部“产品”菜单进入具体系列 PDP，再比较型号并发送询盘。'}</p></div></section><CTA locale={locale} nav={nav} product={product[locale].title} /></main>; }
function ProductLanding({ locale }) { return <main><section className="page-hero"><p className="eyebrow">{copy[locale].catalog}</p><h1>{locale === 'en' ? 'Products are organized from the header mega menu.' : '产品目录由顶部 Mega Menu 统一承接。'}</h1><p className="lead">{locale === 'en' ? 'This page is kept as a lightweight SEO landing page. It does not duplicate category cards or subcategory navigation. Hover Products in the header to choose a category and series.' : '该页面作为轻量 SEO 落地页保留，不再重复展示分类卡片或二级目录。请悬停顶部“产品”选择分类和系列。'}</p><div className="chips"><span>Network Cabinets</span><span>PDU</span><span>Outdoor Waterproof Cabinets</span></div></section></main>; }
function ProductPlaceholder({ locale, id, nav }) { return <main><section className="page-hero"><p className="eyebrow">/product/{id}</p><h1>{locale === 'en' ? 'Product ID route reserved' : '单品 ID 路由已预留'}</h1><p className="lead">{locale === 'en' ? 'Individual product pages can be connected when real SKU-level photos and IDs are ready. Current product navigation uses category and series PDP routes.' : '后续有真实 SKU 图片和 ID 后可接入单品页。当前产品导航使用分类和系列 PDP 路由。'}</p><button className="primary" onClick={() => nav('/' + locale + '/contact')}>{copy[locale].cta}</button></section></main>; }
function InquiryForm({ locale, productTitle = '' }) { const t = copy[locale]; const params = new URLSearchParams(location.search); const initialProduct = params.get('product') || productTitle; const [status, setStatus] = useState(''); const submit = (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget).entries()); const subject = encodeURIComponent(`Synstro inquiry - ${data.product || 'project'}`); const body = encodeURIComponent([`Name: ${data.name || ''}`, `Company: ${data.company || ''}`, `Email: ${data.email || ''}`, `WhatsApp/Phone: ${data.phone || ''}`, `Country/Region: ${data.country || ''}`, `Product: ${data.product || ''}`, `Quantity: ${data.quantity || ''}`, '', data.message || ''].join('\n')); setStatus(locale === 'en' ? 'Opening your email client with inquiry details.' : '正在打开邮箱并带入询盘内容。'); location.href = `mailto:sales@synstro.xyz?subject=${subject}&body=${body}`; }; return <form className="inquiry-form" onSubmit={submit}><div className="form-grid"><label>{t.form.name}<input name="name" required /></label><label>{t.form.company}<input name="company" /></label><label>{t.form.email}<input type="email" name="email" required /></label><label>{t.form.phone}<input name="phone" /></label><label>{t.form.country}<input name="country" /></label><label>{t.form.product}<select name="product" defaultValue={initialProduct}>{products.map((product) => <option key={product.slug}>{product[locale].title}</option>)}{catalogSeries.map((series) => <option key={series.parent + series.slug}>{displayTitle(seriesTitle(series, locale))}</option>)}</select></label><label>{t.form.quantity}<input name="quantity" placeholder={locale === 'en' ? 'Example: 50 pcs' : '例如：50 台'} /></label></div><label>{t.form.message}<textarea name="message" rows="5" placeholder={locale === 'en' ? 'Model, size, quantity, destination, and project notes.' : '型号、尺寸、数量、目的地和项目说明。'} /></label><div className="form-actions"><button className="primary" type="submit">{t.form.submit}</button><span>{t.form.note}</span></div>{status ? <p className="status-note">{status}</p> : null}</form>; }
function Contact({ locale }) { const t = copy[locale]; return <main><section className="contact contact-page"><div><p className="eyebrow">{t.nav.inquiry}</p><h1>{t.contactTitle}</h1><p className="lead">{locale === 'en' ? 'Send model, size, quantity, destination, and drawings if available.' : '请提供型号、尺寸、数量、目的地，以及已有图纸或招标要求。'}</p><div className="contact-box"><a href="mailto:sales@synstro.xyz">sales@synstro.xyz</a><span>WhatsApp TODO</span></div></div><InquiryForm locale={locale} /></section></main>; }
function InfoSections({ locale }) { const t = copy[locale]; return <><section id="applications" className="split"><h2>{t.nav.applications}</h2><div>{t.apps.map((x) => <p key={x}>✓ {x}</p>)}</div></section><section id="strengths" className="strength"><p className="eyebrow">{t.nav.advantages}</p><h2>{locale === 'en' ? 'Why this structure works for buyers' : '为什么这个结构适合采购客户'}</h2><div>{t.advantages.map((x) => <p key={x}>{x}</p>)}</div></section></>; }
function Testimonials({ locale }) { const t = copy[locale]; return <section id="testimonials" className="testimonials"><div className="testimonial-panel"><div className="testimonial-top"><span>{locale === 'en' ? 'REVIEWS' : '客户评价'}</span><span>(03)</span></div><div className="testimonial-heading"><h2>{t.nav.reviews}</h2><p>{locale === 'en' ? 'Feedback around product selection and parameter clarity.' : '围绕产品选型和参数清晰度的反馈。'}</p></div><div className="testimonial-grid">{t.reviews.map((quote, index) => <article key={quote}><div className="review-head"><span>{index + 1}</span><div><b>{locale === 'en' ? 'Overseas buyer' : '海外采购客户'}</b><small>Synstro catalog</small></div></div><p>{quote}</p></article>)}</div></div></section>; }
function StaticPage({ locale, page, nav }) { const t = copy[locale]; if (page === 'products') return <ProductLanding locale={locale} />; if (page === 'applications') return <main><section className="page-hero"><p className="eyebrow">{t.nav.applications}</p><h1>{locale === 'en' ? 'Applications' : '应用场景'}</h1></section><InfoSections locale={locale} /></main>; if (page === 'advantages') return <main><section className="page-hero"><p className="eyebrow">{t.nav.advantages}</p><h1>{locale === 'en' ? 'Advantages' : '优势能力'}</h1></section><InfoSections locale={locale} /></main>; if (page === 'reviews') return <main><Testimonials locale={locale} /></main>; return <main><section className="page-hero"><p className="eyebrow">{t.nav.about}</p><h1>{locale === 'en' ? 'About Synstro' : '关于 Synstro'}</h1><p className="lead">{locale === 'en' ? 'Synstro focuses on network cabinets, rack power distribution, outdoor cabinet protection, and project-based specification communication.' : 'Synstro 专注于网络机柜、机柜配电、户外柜防护和项目化规格沟通。'}</p><button className="primary" onClick={() => nav('/' + locale + '/contact')}>{t.cta}</button></section></main>; }
function CTA({ locale, nav, product = '' }) { const t = copy[locale]; return <section className="cta"><h2>{locale === 'en' ? 'Send your model and quantity requirements.' : '发送您的型号和数量需求。'}</h2><button className="primary" onClick={() => nav('/' + locale + '/contact' + (product ? '?product=' + encodeURIComponent(product) : ''))}>{t.cta}</button></section>; }

createRoot(document.getElementById('root')).render(<App />);

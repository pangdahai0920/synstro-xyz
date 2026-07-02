import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { catalogSeries, seriesForProduct, seriesTitle, findSeries } from './catalog.js';
import './journey-rebuild.css';

const EMAIL = 'sales@synstro.xyz';
const IMAGE = {
  hero: '/assets/products/hero-cabinet-lineup.svg',
  network: '/assets/products/network-cabinet.svg',
  pdu: '/assets/products/pdu-power.svg',
  outdoor: '/assets/products/outdoor-telecom.svg'
};

const categories = [
  { slug: 'network-cabinets', asset: IMAGE.network, en: ['Network Cabinets', 'Network Cabinets and Server Racks'], zh: ['\u7f51\u7edc\u673a\u67dc', '\u7f51\u7edc\u673a\u67dc\u4e0e\u670d\u52a1\u5668\u673a\u67dc'] },
  { slug: 'pdu-power', asset: IMAGE.pdu, en: ['Rack PDU', 'Rack PDU by Socket Standard'], zh: ['PDU', '\u6309\u63d2\u5ea7\u6807\u51c6\u5206\u7c7b\u7684\u673a\u67dc PDU'] },
  { slug: 'outdoor-telecom', asset: IMAGE.outdoor, en: ['Outdoor Cabinets', 'Outdoor Waterproof Cabinets'], zh: ['\u6237\u5916\u9632\u96e8\u67dc', '\u6237\u5916\u9632\u6c34\u67dc\u4e0e\u7535\u4fe1\u50a8\u80fd\u67dc'] }
];

const copy = {
  en: {
    nav: ['Home', 'Products', 'Applications', 'Advantages', 'Reviews', 'About', 'Inquiry'],
    lang: '\u4e2d\u6587',
    heroKicker: 'B2B network cabinet and power infrastructure catalog',
    heroTitle: 'Network cabinets, rack PDUs, and outdoor enclosures organized for project buyers.',
    heroText: 'A single Journey-style product navigation system leads buyers from category to series to model-level inquiry pages.',
    trust: ['OEM / ODM ready', 'Drawing confirmation', 'Export packaging', 'Project specification support'],
    quote: 'Request a Quote',
    send: 'Send Inquiry',
    productsTitle: 'Products are selected from the header mega menu.',
    productsText: 'This page is kept for SEO only. Product category navigation lives exclusively in the Products mega menu to avoid duplicate catalog systems.',
    familyText: 'Category pages explain the product family. Series pages show model parameters and quote actions.',
    model: 'Model', size: 'Size', volume: 'Volume', weight: 'Weight', accessories: 'Accessories', wire: 'Pure copper wire', current: 'Rated current', description: 'Description', qty: 'Inquiry quantity', confirm: 'Confirm by project',
    apps: ['Data closets and structured cabling rooms', 'Telecom and edge network stations', 'Rack power distribution replacement', 'Outdoor power and energy storage projects'],
    reviews: ['Clear model tables shortened our procurement comparison.', 'PDU current and cable details are easy to review.', 'Outdoor cabinet dimensions are easier to confirm with the project team.'],
    notFound: 'The requested catalog page was not found.'
  },
  zh: {
    nav: ['\u9996\u9875', '\u4ea7\u54c1', '\u5e94\u7528', '\u4f18\u52bf', '\u5ba2\u6237\u8bc4\u4ef7', '\u5173\u4e8e\u6211\u4eec', '\u8be2\u76d8'],
    lang: 'English',
    heroKicker: '\u9762\u5411 B2B \u9879\u76ee\u7684\u7f51\u7edc\u673a\u67dc\u4e0e\u914d\u7535\u76ee\u5f55',
    heroTitle: '\u4e3a\u9879\u76ee\u91c7\u8d2d\u6574\u7406\u7f51\u7edc\u673a\u67dc\u3001\u673a\u67dc PDU \u4e0e\u6237\u5916\u9632\u62a4\u7bb1\u67dc\u3002',
    heroText: '\u5355\u4e00 Journey \u98ce\u683c\u4ea7\u54c1\u5bfc\u822a\u7cfb\u7edf\uff0c\u5e26\u91c7\u8d2d\u5ba2\u6237\u4ece\u5206\u7c7b\u8fdb\u5165\u7cfb\u5217\uff0c\u518d\u8fdb\u5165\u578b\u53f7\u7ea7\u8be2\u76d8\u9875\u9762\u3002',
    trust: ['OEM / ODM \u652f\u6301', '\u56fe\u7eb8\u786e\u8ba4', '\u51fa\u53e3\u5305\u88c5', '\u9879\u76ee\u89c4\u683c\u652f\u6301'],
    quote: '\u83b7\u53d6\u62a5\u4ef7',
    send: '\u53d1\u9001\u8be2\u76d8',
    productsTitle: '\u4ea7\u54c1\u901a\u8fc7\u9876\u90e8\u4ea7\u54c1\u83dc\u5355\u9009\u62e9\u3002',
    productsText: '\u8be5\u9875\u9762\u4ec5\u4fdd\u7559\u4e3a SEO \u843d\u5730\u9875\u3002\u4ea7\u54c1\u5206\u7c7b\u5bfc\u822a\u53ea\u5b58\u5728\u4e8e\u9876\u90e8 Products Mega Menu\uff0c\u907f\u514d\u91cd\u590d\u76ee\u5f55\u7cfb\u7edf\u3002',
    familyText: '\u5206\u7c7b\u9875\u8bf4\u660e\u4ea7\u54c1\u65cf\u3002\u7cfb\u5217\u9875\u5c55\u793a\u578b\u53f7\u53c2\u6570\u548c\u8be2\u76d8\u52a8\u4f5c\u3002',
    model: '\u578b\u53f7', size: '\u5c3a\u5bf8', volume: '\u4f53\u79ef', weight: '\u91cd\u91cf', accessories: '\u914d\u4ef6', wire: '\u7eaf\u94dc\u7ebf', current: '\u989d\u5b9a\u7535\u6d41', description: '\u63cf\u8ff0', qty: '\u8be2\u76d8\u6570\u91cf', confirm: '\u6309\u9879\u76ee\u786e\u8ba4',
    apps: ['\u5f31\u7535\u95f4\u4e0e\u7efc\u5408\u5e03\u7ebf\u673a\u623f', '\u901a\u4fe1\u4e0e\u8fb9\u7f18\u7f51\u7edc\u7ad9\u70b9', '\u673a\u67dc\u914d\u7535\u548c PDU \u66ff\u6362\u9879\u76ee', '\u6237\u5916\u7535\u6e90\u4e0e\u50a8\u80fd\u9879\u76ee'],
    reviews: ['\u6e05\u6670\u7684\u578b\u53f7\u8868\u7f29\u77ed\u4e86\u91c7\u8d2d\u5bf9\u6bd4\u65f6\u95f4\u3002', 'PDU \u7535\u6d41\u548c\u7ebf\u7f06\u7ec6\u8282\u5f88\u65b9\u4fbf\u5ba1\u6838\u3002', '\u6237\u5916\u67dc\u5c3a\u5bf8\u66f4\u5bb9\u6613\u4e0e\u9879\u76ee\u56e2\u961f\u786e\u8ba4\u3002'],
    notFound: '\u672a\u627e\u5230\u5bf9\u5e94\u7684\u4ea7\u54c1\u76ee\u5f55\u9875\u9762\u3002'
  }
};

function clean(value, locale) {
  const text = String(value ?? '').trim();
  return !text || text === '/' ? copy[locale].confirm : text;
}
function title(value) { return String(value || '').replaceAll('Sever', 'Server').replaceAll('\n', ' ').trim(); }
function slugify(value) { return String(value || 'model').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'model'; }
function cat(slug) { return categories.find((item) => item.slug === slug) || null; }
function href(locale, path = '') { return `/${locale}${path}`; }
function routeTo(path) { history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')); scrollTo({ top: 0, behavior: 'smooth' }); }
function modelName(model, index) { return title(model.model || model.description || `Model ${index + 1}`); }
function productId(series, model, index) { return `${series.parent}--${series.slug}--${slugify(modelName(model, index))}--${index + 1}`; }
function isPdu(series) { return series.parent === 'pdu-power'; }
function label(key, locale) { return copy[locale][key] || key; }

function parseRoute() {
  const parts = location.pathname.split('/').filter(Boolean);
  const hasLocale = parts[0] === 'zh' || parts[0] === 'en';
  const locale = hasLocale ? parts[0] : 'en';
  const rest = hasLocale ? parts.slice(1) : parts;
  if (!rest.length) return { locale, page: 'home' };
  if (rest[0] === 'products') return { locale, page: 'products', category: rest[1], series: rest[2] };
  if (rest[0] === 'product') return { locale, page: 'product', id: rest[1] };
  if (['applications', 'advantages', 'reviews', 'about', 'contact'].includes(rest[0])) return { locale, page: rest[0] };
  return { locale, page: 'not-found' };
}

function findProduct(id) {
  for (const series of catalogSeries) {
    const index = series.models.findIndex((model, i) => productId(series, model, i) === id);
    if (index >= 0) return { series, model: series.models[index], index, category: cat(series.parent) };
  }
  return null;
}

function useRoute() {
  const [route, setRoute] = useState(parseRoute());
  useEffect(() => {
    if (location.pathname === '/') history.replaceState({}, '', '/en');
    const update = () => setRoute(parseRoute());
    addEventListener('popstate', update);
    update();
    return () => removeEventListener('popstate', update);
  }, []);
  useEffect(() => {
    document.documentElement.lang = route.locale === 'zh' ? 'zh-CN' : 'en';
    document.title = 'Synstro Network Cabinet, PDU, Outdoor Cabinet Catalog';
  }, [route]);
  return route;
}

function useMega(locale) {
  const [state, setState] = useState({ open: false, closing: false, active: categories[0].slug, hoverLocked: false });
  const timers = React.useRef({ open: 0, close: 0 });
  const clear = () => { clearTimeout(timers.current.open); clearTimeout(timers.current.close); };
  const touch = () => matchMedia('(hover: none), (pointer: coarse), (max-width: 760px)').matches;
  const open = (immediate = false) => {
    clear();
    const run = () => setState((s) => ({ ...s, open: true, closing: false, hoverLocked: true }));
    if (immediate || touch()) run(); else timers.current.open = setTimeout(run, 100);
  };
  const close = () => {
    clear();
    setState((s) => ({ ...s, closing: true, hoverLocked: false }));
    timers.current.close = setTimeout(() => setState((s) => ({ ...s, open: false, closing: false, hoverLocked: false })), 260);
  };
  const toggle = () => state.open && !state.closing ? close() : open(true);
  const setActive = (slug) => setState((s) => ({ ...s, active: slug, open: true, closing: false }));
  const nav = (path) => { clear(); setState((s) => ({ ...s, open: false, closing: false, hoverLocked: false })); routeTo(path); };
  useEffect(() => () => clear(), []);
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && close();
    const onPointer = (event) => {
      if (!state.open) return;
      if (event.target.closest('.mega-overlay') || event.target.closest('[data-products-trigger]')) return;
      close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer); };
  }, [state.open]);
  return { locale, state, open, close, toggle, setActive, nav };
}

function App() {
  const route = useRoute();
  const mega = useMega(route.locale);
  return <><Navbar route={route} mega={mega} /><MegaMenu mega={mega} /><Routes route={route} /></>;
}

function Navbar({ route, mega }) {
  const t = copy[route.locale];
  const other = route.locale === 'en' ? 'zh' : 'en';
  const switchPath = location.pathname.replace(/^\/(en|zh)/, `/${other}`) || `/${other}`;
  const links = [
    ['home', t.nav[0], href(route.locale)],
    ['products', t.nav[1], '#'],
    ['applications', t.nav[2], href(route.locale, '/applications')],
    ['advantages', t.nav[3], href(route.locale, '/advantages')],
    ['reviews', t.nav[4], href(route.locale, '/reviews')],
    ['about', t.nav[5], href(route.locale, '/about')]
  ];
  return <header className="site-header">
    <button className="brand" onClick={() => routeTo(href(route.locale))}><span>S</span><b>SYNSTRO</b></button>
    <nav className="site-nav">{links.map(([key, text, path]) => key === 'products'
      ? <button key={key} data-products-trigger className={route.page === 'products' || route.page === 'product' ? 'active' : ''} onPointerEnter={() => mega.open(false)} onPointerLeave={mega.close} onClick={(event) => { event.preventDefault(); mega.toggle(); }}>{text}</button>
      : <button key={key} className={route.page === key ? 'active' : ''} onClick={() => routeTo(path)}>{text}</button>)}</nav>
    <div className="header-actions"><button className="ghost" onClick={() => routeTo(switchPath)}>{t.lang}</button><button className="primary" onClick={() => routeTo(href(route.locale, '/contact'))}>{t.nav[6]}</button></div>
  </header>;
}

function MegaMenu({ mega }) {
  const active = cat(mega.state.active) || categories[0];
  if (!mega.state.open && !mega.state.closing) return null;
  return createPortal(<div className={`mega-overlay ${mega.state.open ? 'is-open' : ''} ${mega.state.closing ? 'is-closing' : ''}`} onPointerEnter={() => mega.open(true)} onPointerLeave={mega.close}>
    <div className="mega-panel">
      <div className="mega-left">{categories.map((category) => <button key={category.slug} className={active.slug === category.slug ? 'active' : ''} onPointerEnter={() => mega.setActive(category.slug)} onClick={() => mega.setActive(category.slug)}>{category[mega.locale][0]}<span>{seriesForProduct(category.slug).length} {mega.locale === 'en' ? 'series' : '\u7cfb\u5217'}</span></button>)}</div>
      <div className="mega-right">{seriesForProduct(active.slug).map((series) => <button key={series.slug} onClick={() => mega.nav(href(mega.locale, `/products/${series.parent}/${series.slug}`))}><strong>{title(seriesTitle(series, mega.locale))}</strong><span>{series.models.length} {mega.locale === 'en' ? 'models' : '\u578b\u53f7'}</span></button>)}</div>
    </div>
  </div>, document.body);
}

function Routes({ route }) {
  if (route.page === 'home') return <Home locale={route.locale} />;
  if (route.page === 'products' && !route.category) return <ProductsLanding locale={route.locale} />;
  if (route.page === 'products' && route.category && !route.series) return <CategoryPage locale={route.locale} categorySlug={route.category} />;
  if (route.page === 'products' && route.category && route.series) return <SeriesPage locale={route.locale} categorySlug={route.category} seriesSlug={route.series} />;
  if (route.page === 'product') return <ProductPage locale={route.locale} id={route.id} />;
  if (route.page === 'contact') return <Contact locale={route.locale} />;
  if (['applications', 'advantages', 'reviews', 'about'].includes(route.page)) return <Static locale={route.locale} page={route.page} />;
  return <NotFound locale={route.locale} />;
}

function ProductImage({ category, text }) {
  return <div className="product-visual"><img src={category?.asset || IMAGE.network} alt={text} /><span>{text}</span></div>;
}
function Trust({ locale }) { return <div className="trust-bar">{copy[locale].trust.map((item) => <span key={item}>{item}</span>)}</div>; }

function Home({ locale }) {
  const t = copy[locale];
  return <main><section className="hero"><div><p className="eyebrow">{t.heroKicker}</p><h1>{t.heroTitle}</h1><p className="lead">{t.heroText}</p><div className="hero-actions"><button className="primary big" onClick={() => routeTo(href(locale, '/contact'))}>{t.send}</button><button className="text-link" onClick={() => document.querySelector('[data-products-trigger]')?.click()}>{t.nav[1]}</button></div></div><ProductImage category={{ asset: IMAGE.hero }} text="Synstro catalog" /></section><Trust locale={locale} /><section className="family-section"><div className="section-head"><h2>{locale === 'en' ? 'Product families' : '\u4ea7\u54c1\u7cfb\u5217'}</h2><p>{locale === 'en' ? 'Three product families, one navigation system, model-level inquiry pages.' : '\u4e09\u5927\u4ea7\u54c1\u65cf\uff0c\u4e00\u5957\u5bfc\u822a\u7cfb\u7edf\uff0c\u578b\u53f7\u7ea7\u8be2\u76d8\u9875\u9762\u3002'}</p></div><div className="family-grid">{categories.map((category) => <article key={category.slug} onClick={() => routeTo(href(locale, `/products/${category.slug}`))}><ProductImage category={category} text={category[locale][0]} /><h3>{category[locale][1]}</h3><p>{t.familyText}</p><button>{t.quote}</button></article>)}</div></section><Info locale={locale} /><Reviews locale={locale} /><CTA locale={locale} /></main>;
}

function ProductsLanding({ locale }) {
  const t = copy[locale];
  return <main><section className="simple-page"><p className="eyebrow">{t.nav[1]}</p><h1>{t.productsTitle}</h1><p className="lead">{t.productsText}</p><Trust locale={locale} /></section></main>;
}

function CategoryPage({ locale, categorySlug }) {
  const category = cat(categorySlug);
  if (!category) return <NotFound locale={locale} />;
  return <main><section className="category-layout"><Sidebar locale={locale} activeCategory={category.slug} /><div className="category-content"><div className="category-hero"><div><p className="eyebrow">{category[locale][0]}</p><h1>{category[locale][1]}</h1><p>{copy[locale].familyText}</p></div><ProductImage category={category} text={category[locale][0]} /></div><div className="single-list">{seriesForProduct(category.slug).map((series) => <button key={series.slug} onClick={() => routeTo(href(locale, `/products/${series.parent}/${series.slug}`))}><strong>{title(seriesTitle(series, locale))}</strong><span>{series.models.length} {locale === 'en' ? 'models ready for comparison' : '\u4e2a\u578b\u53f7\u53ef\u5bf9\u6bd4'}</span></button>)}</div></div></section></main>;
}

function SeriesPage({ locale, categorySlug, seriesSlug }) {
  const category = cat(categorySlug);
  const series = findSeries(categorySlug, seriesSlug);
  if (!category || !series) return <NotFound locale={locale} />;
  return <main><section className="category-layout"><Sidebar locale={locale} activeCategory={category.slug} activeSeries={series.slug} /><div className="category-content"><div className="series-head"><p className="eyebrow">{category[locale][0]}</p><h1>{title(seriesTitle(series, locale))}</h1><p>{copy[locale].familyText}</p></div><div className="product-list">{series.models.map((model, index) => <ProductRow key={productId(series, model, index)} locale={locale} series={series} model={model} index={index} />)}</div></div></section></main>;
}

function Sidebar({ locale, activeCategory, activeSeries }) {
  return <aside className="category-sidebar"><button className="sidebar-title" onClick={() => document.querySelector('[data-products-trigger]')?.click()}>{copy[locale].nav[1]}</button>{categories.map((category) => <div key={category.slug}><button className={activeCategory === category.slug ? 'active' : ''} onClick={() => routeTo(href(locale, `/products/${category.slug}`))}>{category[locale][0]}</button>{activeCategory === category.slug ? <div className="sidebar-series">{seriesForProduct(category.slug).map((series) => <button key={series.slug} className={activeSeries === series.slug ? 'active' : ''} onClick={() => routeTo(href(locale, `/products/${series.parent}/${series.slug}`))}>{title(seriesTitle(series, locale))}</button>)}</div> : null}</div>)}</aside>;
}

function ProductRow({ locale, series, model, index }) {
  const keys = isPdu(series) ? ['wire', 'current', 'description'] : ['size', 'volume', 'weight', 'accessories'];
  return <article className="product-row" onClick={() => routeTo(href(locale, `/product/${productId(series, model, index)}`))}><ProductImage category={cat(series.parent)} text={modelName(model, index)} /><div><h3>{modelName(model, index)}</h3><p>{title(seriesTitle(series, locale))}</p><dl>{keys.map((key) => <React.Fragment key={key}><dt>{label(key, locale)}</dt><dd>{clean(model[key], locale)}</dd></React.Fragment>)}</dl></div><button>{copy[locale].quote}</button></article>;
}

function ProductPage({ locale, id }) {
  const found = findProduct(id);
  const [qty, setQty] = useState(1);
  if (!found) return <NotFound locale={locale} />;
  const { series, model, index, category } = found;
  const keys = isPdu(series) ? ['wire', 'current', 'description'] : ['size', 'volume', 'weight', 'accessories'];
  const name = modelName(model, index);
  const subject = encodeURIComponent(`Synstro inquiry - ${name}`);
  const body = encodeURIComponent([`Product: ${name}`, `Series: ${title(seriesTitle(series, locale))}`, `Quantity: ${qty}`, ...keys.map((key) => `${label(key, locale)}: ${clean(model[key], locale)}`)].join('\n'));
  return <main><section className="pdp"><div className="gallery"><div className="main-image"><img src={category.asset} alt={name} /></div><div className="thumbs">{[category.asset, IMAGE.hero, category.asset].map((src, i) => <button key={i}><img src={src} alt={`${name} ${i + 1}`} /></button>)}</div></div><aside className="pdp-panel"><p className="crumb">{category[locale][0]} / {title(seriesTitle(series, locale))}</p><h1>{name}</h1><div className="tag-row"><span>OEM / ODM</span><span>{locale === 'en' ? 'Drawing confirmation' : '\u56fe\u7eb8\u786e\u8ba4'}</span><span>{locale === 'en' ? 'Export packaging' : '\u51fa\u53e3\u5305\u88c5'}</span></div><dl className="spec-summary">{keys.map((key) => <React.Fragment key={key}><dt>{label(key, locale)}</dt><dd>{clean(model[key], locale)}</dd></React.Fragment>)}</dl><div className="qty"><span>{copy[locale].qty}</span><button onClick={() => setQty(Math.max(1, qty - 1))}>-</button><input value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} /><button onClick={() => setQty(qty + 1)}>+</button></div><div className="pdp-actions"><a className="primary" href={`mailto:${EMAIL}?subject=${subject}&body=${body}`}>{copy[locale].send}</a><a className="ghost" href={`mailto:${EMAIL}`}>{copy[locale].email}</a></div></aside></section><section className="lower-grid"><ModelTable locale={locale} series={series} /><Support locale={locale} /><Related locale={locale} series={series} /></section></main>;
}

function ModelTable({ locale, series }) {
  const keys = isPdu(series) ? ['wire', 'current', 'description'] : ['model', 'size', 'volume', 'weight', 'accessories'];
  return <div className="table-card"><h2>{locale === 'en' ? 'Model parameters' : '\u578b\u53f7\u53c2\u6570'}</h2><div className="table-scroll"><table><thead><tr>{keys.map((key) => <th key={key}>{label(key, locale)}</th>)}</tr></thead><tbody>{series.models.map((model, index) => <tr key={index}>{keys.map((key) => <td key={key}>{key === 'model' ? modelName(model, index) : clean(model[key], locale)}</td>)}</tr>)}</tbody></table></div></div>;
}
function Support({ locale }) { return <div className="support-card"><h2>{locale === 'en' ? 'Customization and Project Support' : '\u5b9a\u5236\u4e0e\u9879\u76ee\u652f\u6301'}</h2>{copy[locale].trust.map((item) => <p key={item}>{item}</p>)}</div>; }
function Related({ locale, series }) { return <div className="related-card"><h2>{locale === 'en' ? 'Related series' : '\u76f8\u5173\u7cfb\u5217'}</h2>{seriesForProduct(series.parent).filter((item) => item.slug !== series.slug).slice(0, 4).map((item) => <button key={item.slug} onClick={() => routeTo(href(locale, `/products/${item.parent}/${item.slug}`))}>{title(seriesTitle(item, locale))}</button>)}</div>; }
function Info({ locale }) { return <section className="info-grid"><h2>{copy[locale].nav[2]}</h2>{copy[locale].apps.map((item) => <p key={item}>{item}</p>)}</section>; }
function Reviews({ locale }) { return <section className="reviews"><div><span>{copy[locale].nav[4]}</span><span>(03)</span></div><h2>{locale === 'en' ? 'What overseas buyers say' : '\u6d77\u5916\u5ba2\u6237\u8bc4\u4ef7'}</h2><div className="review-grid">{copy[locale].reviews.map((quote, index) => <article key={quote}><b>{locale === 'en' ? 'Project buyer' : '\u9879\u76ee\u91c7\u8d2d'} {index + 1}</b><p>{quote}</p></article>)}</div></section>; }
function CTA({ locale }) { return <section className="cta"><h2>{locale === 'en' ? 'Send your product list and target quantity.' : '\u53d1\u9001\u60a8\u7684\u4ea7\u54c1\u6e05\u5355\u548c\u76ee\u6807\u6570\u91cf\u3002'}</h2><button className="primary big" onClick={() => routeTo(href(locale, '/contact'))}>{copy[locale].send}</button></section>; }
function Static({ locale, page }) { return <main><section className="simple-page"><p className="eyebrow">{copy[locale].nav[['home','products','applications','advantages','reviews','about'].indexOf(page)] || page}</p><h1>{copy[locale].nav[['home','products','applications','advantages','reviews','about'].indexOf(page)] || page}</h1><p className="lead">{copy[locale].heroText}</p></section>{page === 'reviews' ? <Reviews locale={locale} /> : <Info locale={locale} />}<CTA locale={locale} /></main>; }
function Contact({ locale }) { return <main><section className="contact-page"><div><p className="eyebrow">{copy[locale].nav[6]}</p><h1>{locale === 'en' ? 'Send model, size, quantity, destination, and drawings if available.' : '\u8bf7\u53d1\u9001\u578b\u53f7\u3001\u5c3a\u5bf8\u3001\u6570\u91cf\u3001\u76ee\u7684\u5730\uff0c\u4ee5\u53ca\u5df2\u6709\u56fe\u7eb8\u6216\u9879\u76ee\u8981\u6c42\u3002'}</h1><p className="lead">{EMAIL}</p></div><form className="contact-form" onSubmit={(e) => { e.preventDefault(); const data = Object.fromEntries(new FormData(e.currentTarget).entries()); const subject = encodeURIComponent(`Synstro inquiry - ${data.product || 'project'}`); const body = encodeURIComponent(Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n')); location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`; }}><input name="name" placeholder={locale === 'en' ? 'Name' : '\u59d3\u540d'} required /><input name="company" placeholder={locale === 'en' ? 'Company' : '\u516c\u53f8'} /><input name="email" type="email" placeholder={locale === 'en' ? 'Email' : '\u90ae\u7bb1'} required /><input name="phone" placeholder="WhatsApp / Phone" /><input name="country" placeholder={locale === 'en' ? 'Country / Region' : '\u56fd\u5bb6 / \u5730\u533a'} /><input name="product" placeholder={locale === 'en' ? 'Product / Model' : '\u4ea7\u54c1 / \u578b\u53f7'} /><input name="quantity" placeholder={locale === 'en' ? 'Quantity' : '\u6570\u91cf'} /><textarea name="message" rows="5" placeholder={locale === 'en' ? 'Project message' : '\u9879\u76ee\u7559\u8a00'} /><button className="primary">{copy[locale].send}</button></form></section></main>; }
function NotFound({ locale }) { return <main><section className="simple-page"><h1>{copy[locale].notFound}</h1><button className="primary" onClick={() => routeTo(href(locale))}>Home</button></section></main>; }

createRoot(document.getElementById('root')).render(<App />);

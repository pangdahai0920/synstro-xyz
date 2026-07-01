import React, { useEffect, useMemo, useRef, useState } from 'react';
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
    nav: { home: 'Home', products: 'Products', applications: 'Applications', about: 'About us', inquiry: 'Inquiry' },
    switch: '中文',
    heroEyebrow: 'Network cabinets and power infrastructure for B2B projects',
    heroTitle: 'Cabinets, PDUs, and outdoor enclosures built for reliable equipment rooms.',
    heroBody: 'Synstro helps integrators, distributors, and project buyers source rack cabinets, intelligent power distribution, mining PDUs, and weatherproof telecom enclosures with flexible specifications.',
    cta: 'Send an inquiry', details: 'View details', applicationsTitle: 'Built for practical deployment scenarios', strengthsTitle: 'Why buyers work with Synstro', aboutTitle: 'About Synstro', contactTitle: 'Tell us what your project needs.',
    aboutBody: 'Synstro focuses on cabinet infrastructure for network rooms, rack power distribution, outdoor telecom protection, and project-based customization. The site is structured for distributors, integrators, and procurement teams who need clear product ranges and fast specification discussion.',
    apps: ['Data closets, office networks, and campus cabling rooms', 'Edge data centers, telecom nodes, and outdoor equipment stations', 'Mining facilities, power rooms, and high-density electrical loads', 'Energy storage, industrial control, and system integration projects'],
    strengths: ['Clear product families for cabinets, PDUs, and outdoor enclosures', 'Custom dimensions, colors, ventilation, power layouts, and accessory matching', 'Procurement-friendly specs, drawings, and quote-ready details', 'Bilingual structure for international buyers and Chinese documentation']
  },
  zh: {
    nav: { home: '首页', products: '产品', applications: '应用', about: '关于我们', inquiry: '询盘' },
    switch: 'English',
    heroEyebrow: '面向 B2B 项目的网络机柜与配电基础设施',
    heroTitle: '为可靠设备间打造网络机柜、PDU 与户外防护箱柜。',
    heroBody: 'Synstro 面向集成商、经销商和项目采购，提供机柜、智能配电、矿机 PDU 与户外电信防护箱柜，支持灵活规格配置。',
    cta: '发送询盘', details: '查看详情', applicationsTitle: '适用于实际部署场景', strengthsTitle: '为什么项目采购选择 Synstro', aboutTitle: '关于 Synstro', contactTitle: '告诉我们您的项目需求。',
    aboutBody: 'Synstro 专注于网络机房基础设施、机柜配电、户外电信防护和项目化定制。网站结构面向经销商、集成商和采购团队，帮助客户快速了解产品范围并进入规格沟通。',
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

function sectionFromHash() {
  return location.hash.replace('#', '') || 'home';
}

function activeNavIndex(route) {
  if (route.contact) return 4;
  if (route.product) return 1;
  const map = { home: 0, products: 1, applications: 2, about: 3 };
  return map[sectionFromHash()] ?? 0;
}

function GooeyNav({ items, activeIndex, onSelect }) {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const particleCount = 9;

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const updateEffectPosition = element => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = { left: `${pos.x - containerRect.x}px`, top: `${pos.y - containerRect.y}px`, width: `${pos.width}px`, height: `${pos.height}px` };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const makeParticles = element => {
    element.querySelectorAll('.particle').forEach(p => p.remove());
    element.style.setProperty('--time', '720ms');
    for (let i = 0; i < particleCount; i += 1) {
      const start = getXY(34, particleCount - i, particleCount);
      const end = getXY(8 + noise(4), particleCount - i, particleCount);
      const particle = document.createElement('span');
      const point = document.createElement('span');
      particle.className = 'particle';
      point.className = 'point';
      particle.style.setProperty('--start-x', `${start[0]}px`);
      particle.style.setProperty('--start-y', `${start[1]}px`);
      particle.style.setProperty('--end-x', `${end[0]}px`);
      particle.style.setProperty('--end-y', `${end[1]}px`);
      particle.style.setProperty('--scale', `${0.8 + Math.random() * 0.35}`);
      particle.style.setProperty('--rotate', `${noise(120)}deg`);
      particle.appendChild(point);
      element.appendChild(particle);
      requestAnimationFrame(() => element.classList.add('active'));
      setTimeout(() => particle.remove(), 760);
    }
  };

  useEffect(() => {
    const activeLi = navRef.current?.querySelectorAll('li')[activeIndex];
    if (!activeLi) return;
    updateEffectPosition(activeLi);
    textRef.current?.classList.add('active');
    const resizeObserver = new ResizeObserver(() => updateEffectPosition(activeLi));
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav className="gooey-nav" aria-label="Primary navigation">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.label} className={activeIndex === index ? 'active' : ''}>
              <a href={item.href} onClick={event => { event.preventDefault(); const li = event.currentTarget.parentElement; if (li) updateEffectPosition(li); textRef.current?.classList.remove('active'); void textRef.current?.offsetWidth; textRef.current?.classList.add('active'); if (filterRef.current) makeParticles(filterRef.current); onSelect(item.href); }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="gooey-effect filter" ref={filterRef} />
      <span className="gooey-effect text" ref={textRef} />
    </div>
  );
}

function App() {
  const [route, setRoute] = useState(parseRoute());
  const [activeIndex, setActiveIndex] = useState(() => activeNavIndex(parseRoute()));

  useEffect(() => {
    if (location.pathname === '/') history.replaceState({}, '', '/en');
    const syncRoute = () => { const next = parseRoute(); setRoute(next); setActiveIndex(activeNavIndex(next)); };
    addEventListener('popstate', syncRoute);
    addEventListener('hashchange', syncRoute);
    document.documentElement.lang = route.locale === 'zh' ? 'zh-CN' : 'en';
    document.title = route.locale === 'zh' ? 'Synstro 网络机柜、PDU、户外防雨柜与电信箱柜' : 'Synstro Network Cabinets, PDUs, Outdoor Telecom Enclosures';
    return () => { removeEventListener('popstate', syncRoute); removeEventListener('hashchange', syncRoute); };
  }, [route.locale]);

  const t = copy[route.locale];
  const other = route.locale === 'en' ? 'zh' : 'en';
  const navItems = useMemo(() => [
    { label: t.nav.home, href: `/${route.locale}` },
    { label: t.nav.products, href: `/${route.locale}#products` },
    { label: t.nav.applications, href: `/${route.locale}#applications` },
    { label: t.nav.about, href: `/${route.locale}#about` },
    { label: t.nav.inquiry, href: `/${route.locale}/contact` }
  ], [route.locale, t]);

  const nav = path => {
    history.pushState({}, '', path);
    const next = parseRoute();
    setRoute(next);
    setActiveIndex(activeNavIndex(next));
    const hash = path.split('#')[1];
    setTimeout(() => {
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  return <div className="shell"><Backdrop/><header><button className="brand" onClick={() => nav('/'+route.locale)}><span>S</span><b>Synstro</b><small>Cabinet Infrastructure</small></button><GooeyNav items={navItems} activeIndex={activeIndex} onSelect={nav}/><div className="header-actions"><button className="language" onClick={() => nav(location.pathname.replace(/^\/(en|zh)/,'/'+other)+location.hash)}>{t.switch}</button><button className="primary small" onClick={() => nav('/'+route.locale+'/contact')}>{t.nav.inquiry}</button></div></header>{route.product ? <Product locale={route.locale} product={route.product} nav={nav}/> : route.contact ? <Contact locale={route.locale}/> : <Home locale={route.locale} nav={nav}/>}<footer><b>Synstro</b><span>sales@synstro.xyz</span></footer></div>;
}
function Backdrop(){return <div className="backdrop"><i/><i/><i/></div>}
function HeroArt(){return <div className="hero-art"><div className="rack"><em/><em/><em/><em/><em/><em/><em/></div><div className="pdu"><span/><span/><span/><span/><b/></div><div className="outdoor"><span/><span/><b/></div><strong>Cabinet + PDU + Outdoor</strong></div>}
function Home({locale, nav}){const t=copy[locale];return <main><section className="hero reveal"><div><p className="eyebrow">{t.heroEyebrow}</p><h1>{t.heroTitle}</h1><p className="lead">{t.heroBody}</p><div className="actions"><button className="primary" onClick={()=>nav('/'+locale+'/contact')}>{t.cta}</button><a href="#products" onClick={event=>{event.preventDefault();nav('/'+locale+'#products')}}>{locale==='en'?'View product series':'查看产品系列'}</a></div><div className="chips"><span>Indoor + outdoor</span><span>OEM/ODM ready</span><span>Project-based specs</span></div></div><HeroArt/></section><section id="products"><p className="eyebrow">{t.nav.products}</p><h2>{locale==='en'?'Product series':'产品系列'}</h2><div className="quick">{products.map(p=><button key={p.slug} onClick={()=>nav('/'+locale+'/products/'+p.slug)}><small>{p[locale].eyebrow}</small>{p[locale].title}</button>)}</div><div className="cards">{products.map(p=><article key={p.slug}><ProductVisual/><small>{p[locale].eyebrow}</small><h3>{p[locale].title}</h3><p>{p[locale].body}</p><button onClick={()=>nav('/'+locale+'/products/'+p.slug)}>{t.details} →</button></article>)}</div></section><section id="applications" className="split"><h2>{t.applicationsTitle}</h2><div>{t.apps.map(x=><p key={x}>✓ {x}</p>)}</div></section><section id="strengths" className="strength"><p className="eyebrow">{locale==='en'?'Strengths':'优势'}</p><h2>{t.strengthsTitle}</h2><div>{t.strengths.map(x=><p key={x}>{x}</p>)}</div></section><section id="about" className="about"><p className="eyebrow">{t.nav.about}</p><h2>{t.aboutTitle}</h2><p>{t.aboutBody}</p></section><section className="cta"><h2>{locale==='en'?'Send your cabinet or PDU requirements.':'发送您的机柜或 PDU 项目需求。'}</h2><button className="primary" onClick={()=>nav('/'+locale+'/contact')}>{t.cta}</button></section></main>}
function ProductVisual(){return <div className="visual"><span/><span/><span/></div>}
function Product({locale, product, nav}){return <main><section className="detail"><div><p className="eyebrow">{product[locale].eyebrow}</p><h1>{product[locale].title}</h1><p className="lead">{product[locale].body}</p><button className="primary" onClick={()=>nav('/'+locale+'/contact')}>{locale==='en'?'Ask for specifications':'咨询规格'}</button></div><HeroArt/></section><section className="cards three">{product[locale].items.map(x=><article key={x}><h3>{x}</h3><p>{locale==='en'?'Project specifications, dimensions, finish, and accessories can be adjusted by request.':'规格、尺寸、表面处理和附件可根据项目需求调整。'}</p></article>)}</section></main>}
function Contact({locale}){const t=copy[locale];return <main><section className="contact"><p className="eyebrow">{t.nav.inquiry}</p><h1>{t.contactTitle}</h1><p className="lead">{locale==='en'?'Email us your cabinet type, size, PDU layout, quantity, destination, and drawings if available.':'请提供机柜类型、尺寸、PDU 布局、数量、目的地，以及已有图纸或招标要求。'}</p><div className="contact-box"><a href="mailto:sales@synstro.xyz">sales@synstro.xyz</a><span>WhatsApp TODO</span></div></section></main>}

createRoot(document.getElementById('root')).render(<App />);

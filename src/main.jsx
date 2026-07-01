import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

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
    gallery: [productAssets.network, productAssets.hero],
    en: {
      title: 'Network Cabinets & Server Racks',
      eyebrow: 'Indoor infrastructure',
      body: 'Wall-mount cabinets, floor-standing network cabinets, and server racks for structured cabling, edge rooms, data closets, and equipment integration.',
      items: ['Wall-mount network cabinets', 'Floor-standing network cabinets', 'Server racks with ventilated doors'],
      specs: [
        ['Height', '6U to 47U, project sizes available'],
        ['Width', '600 mm / 800 mm'],
        ['Depth', '450 mm to 1200 mm'],
        ['Material', 'Cold-rolled steel'],
        ['Door options', 'Glass, perforated, mesh, removable side panels'],
        ['Load capacity', 'Wall cabinet 60 kg, floor cabinet up to 1200 kg'],
        ['Color', 'Black RAL9005 or custom powder coating'],
        ['Accessories', 'Shelves, fans, cable managers, casters, leveling feet']
      ],
      custom: ['Height, width, depth', 'Door style and lock', 'Fan tray and ventilation', 'Cable entry and brush panel', 'Logo, color, and packaging'],
      applications: ['Office data closets', 'Campus cabling rooms', 'Server rooms', 'Edge equipment rooms']
    },
    zh: {
      title: '网络机柜与服务器机柜',
      eyebrow: '室内基础设施',
      body: '覆盖壁挂机柜、落地网络机柜和服务器机柜，适用于综合布线、边缘机房、弱电间和设备集成场景。',
      items: ['壁挂式网络机柜', '落地式网络机柜', '前后网孔门服务器机柜'],
      specs: [
        ['高度', '6U 至 47U，可按项目规格配置'],
        ['宽度', '600 mm / 800 mm'],
        ['深度', '450 mm 至 1200 mm'],
        ['材质', '冷轧钢'],
        ['门板', '玻璃门、网孔门、前后门、可拆侧板'],
        ['承重', '壁挂机柜约 60 kg，落地柜最高约 1200 kg'],
        ['颜色', '黑色 RAL9005 或定制喷粉'],
        ['配件', '托盘、风扇、理线架、脚轮、支脚']
      ],
      custom: ['高度、宽度、深度', '门板样式和锁具', '风扇和通风结构', '进线孔和毛刷板', 'Logo、颜色和包装'],
      applications: ['办公弱电间', '园区综合布线机房', '服务器机房', '边缘设备间']
    }
  },
  {
    slug: 'pdu-power',
    asset: productAssets.pdu,
    gallery: [productAssets.pdu, productAssets.hero],
    en: {
      title: 'PDU, Smart PDU & Mining PDU',
      eyebrow: 'Power distribution',
      body: 'Rack PDUs, intelligent metered PDUs for remote monitoring, and high-load mining PDUs for dense equipment rooms.',
      items: ['Basic rack PDUs', 'Metered and switched smart PDUs', 'High-current mining PDUs'],
      specs: [
        ['Current', '10A, 16A, 32A, 63A or custom'],
        ['Voltage', '110V to 250V single phase, 380V three phase options'],
        ['Outlets', '4 to 30 ways by rack layout'],
        ['Socket standards', 'IEC, Schuko, UK, US, universal, C13/C19'],
        ['Mounting', 'Horizontal 19 inch or vertical 0U'],
        ['Cable length', '1.8 m, 3 m, custom length'],
        ['Function type', 'Basic, metered, switched, smart monitoring'],
        ['Protection', 'Breaker, surge protection, overload options']
      ],
      custom: ['Plug and socket standard', 'Outlet count and spacing', 'Metering and switching', 'Cable length and color', 'Labeling and packaging'],
      applications: ['Rack power distribution', 'Server rooms', 'Mining containers', 'Remote power monitoring']
    },
    zh: {
      title: 'PDU、智能 PDU 与矿机 PDU',
      eyebrow: '电源分配',
      body: '提供机柜配套 PDU、支持远程监控的智能 PDU，以及适合高负载设备间的矿机 PDU。',
      items: ['基础机柜 PDU', '计量型与开关型智能 PDU', '大电流矿机 PDU'],
      specs: [
        ['电流', '10A、16A、32A、63A 或定制'],
        ['电压', '110V 至 250V 单相，可选 380V 三相'],
        ['插位', '4 位至 30 位，按机柜布局配置'],
        ['插座标准', 'IEC、德标、英标、美标、万用、C13/C19'],
        ['安装方式', '19 英寸横装或 0U 竖装'],
        ['线缆长度', '1.8 m、3 m 或定制长度'],
        ['功能类型', '基础型、计量型、开关型、智能监控型'],
        ['保护功能', '断路器、防浪涌、过载保护可选']
      ],
      custom: ['插头和插座标准', '插位数量与间距', '计量与远程开关', '线缆长度和颜色', '标签与包装'],
      applications: ['机柜配电', '服务器机房', '矿机集装箱', '远程电力监控']
    }
  },
  {
    slug: 'outdoor-telecom',
    asset: productAssets.outdoor,
    gallery: [productAssets.outdoor, productAssets.hero],
    en: {
      title: 'Outdoor Weatherproof Cabinets & Telecom Boxes',
      eyebrow: 'Outdoor protection',
      body: 'Weatherproof outdoor enclosures, energy storage cabinets, and telecom boxes for sealed, durable equipment protection.',
      items: ['Outdoor rainproof cabinets', 'Energy storage enclosures', 'Telecom cabinets and wall boxes'],
      specs: [
        ['Protection rating', 'IP55, IP65 by structure'],
        ['Material', 'Galvanized steel, stainless steel, aluminum options'],
        ['Size', 'Wall box to floor-standing outdoor cabinet'],
        ['Cooling', 'Natural ventilation, fan, heat exchanger, AC option'],
        ['Installation', 'Wall mount, pole mount, floor standing'],
        ['Surface finish', 'Outdoor powder coating, anti-corrosion treatment'],
        ['Structure', 'Rain hood, sealed door, cable gland plate'],
        ['Applications', 'Telecom, CCTV, energy storage, industrial control']
      ],
      custom: ['Cabinet size and mounting', 'Cooling and ventilation', 'IP rating and sealing', 'Battery or equipment layout', 'Outdoor color and coating'],
      applications: ['Telecom base stations', 'Outdoor network nodes', 'Energy storage sites', 'Industrial monitoring stations']
    },
    zh: {
      title: '户外防雨柜、储能柜与电信箱柜',
      eyebrow: '户外防护',
      body: '面向户外站点的防雨柜、储能柜和电信箱柜，为设备提供密封、耐用且便于维护的防护空间。',
      items: ['户外防雨柜', '储能柜', '电信柜与电信箱'],
      specs: [
        ['防护等级', 'IP55、IP65，按结构配置'],
        ['材质', '镀锌钢板、不锈钢、铝材可选'],
        ['尺寸', '壁挂箱至落地式户外柜'],
        ['散热方式', '自然通风、风扇、热交换器、空调可选'],
        ['安装方式', '壁挂、抱杆、落地安装'],
        ['表面处理', '户外喷粉、防腐处理'],
        ['结构', '防雨帽、密封门、进线底板'],
        ['应用场景', '电信、监控、储能、工业控制']
      ],
      custom: ['柜体尺寸和安装方式', '散热与通风结构', '防护等级和密封方案', '电池或设备布局', '户外颜色和涂层'],
      applications: ['通信基站', '户外网络节点', '储能站点', '工业监控站']
    }
  }
];

const productMenus = {
  en: [
    { title: 'Network Cabinets', href: '/en/products/network-cabinets', children: ['Wall-mount cabinets', 'Floor-standing cabinets', 'Server cabinets'] },
    { title: 'PDU', href: '/en/products/pdu-power', children: ['Basic PDU', 'Smart PDU', 'Mining PDU'] },
    { title: 'Outdoor Weatherproof Cabinets', href: '/en/products/outdoor-telecom', children: ['Telecom cabinets', 'Energy storage cabinets'] }
  ],
  zh: [
    { title: '网络机柜', href: '/zh/products/network-cabinets', children: ['壁挂机柜', '落地机柜', '服务器机柜'] },
    { title: 'PDU', href: '/zh/products/pdu-power', children: ['基础 PDU', '智能 PDU', '矿机 PDU'] },
    { title: '户外防雨柜', href: '/zh/products/outdoor-telecom', children: ['电信柜', '储能柜'] }
  ]
};

const reviews = {
  en: [
    { name: 'Michael Turner', role: 'Procurement Manager, UK Data Integrator', quote: 'Synstro gives us clear cabinet dimensions, stable packaging, and fast project communication for batch data room upgrades.' },
    { name: 'Elena Rossi', role: 'Telecom Project Lead, Italy', quote: 'The outdoor weatherproof cabinet structure and ventilation plan were practical, and drawing confirmation was efficient.' },
    { name: 'Daniel Kim', role: 'Operations Director, Korea', quote: 'Smart PDU options are flexible, monitoring parameters are clear, and our rack power selection time is much shorter.' },
    { name: 'Ahmed Al-Farsi', role: 'Infrastructure Buyer, UAE', quote: 'From quote to specification confirmation, Synstro quickly matched the cabinets and accessories our project required.' },
    { name: 'Sofia Martinez', role: 'System Integrator, Mexico', quote: 'Server cabinets and cable management accessories arrived as a complete package, making customer acceptance smoother.' },
    { name: 'Priya Shah', role: 'Data Center Consultant, India', quote: 'The product documentation is clear, the English communication is professional, and it fits overseas procurement workflows.' }
  ],
  zh: [
    { name: 'Michael Turner', role: '英国数据集成商采购经理', quote: 'Synstro 的网络机柜尺寸清晰，包装稳，项目沟通速度快，适合我们做批量机房改造采购。' },
    { name: 'Elena Rossi', role: '意大利电信项目负责人', quote: '户外防雨柜的结构和通风方案很实用，图纸确认过程高效，现场安装反馈很好。' },
    { name: 'Daniel Kim', role: '韩国运营总监', quote: '智能 PDU 配置灵活，监控参数清楚，帮助我们降低了机柜配电选型时间。' },
    { name: 'Ahmed Al-Farsi', role: '阿联酋基础设施采购', quote: '从报价到规格确认都很顺畅，Synstro 能快速匹配项目所需的机柜和配件。' },
    { name: 'Sofia Martinez', role: '墨西哥系统集成商', quote: '服务器机柜和理线附件搭配完整，交付后客户验收很顺利。' },
    { name: 'Priya Shah', role: '印度数据中心顾问', quote: '产品资料清楚，英文沟通专业，适合海外项目采购流程。' }
  ]
};

const copy = {
  en: {
    nav: { home: 'Home', products: 'Products', applications: 'Applications', strengths: 'Advantages', testimonials: 'Reviews', about: 'About us', inquiry: 'Inquiry' },
    switch: '中文',
    heroEyebrow: 'Network cabinets and power infrastructure for B2B projects',
    heroTitle: 'Network cabinets, PDUs, and outdoor enclosures for dependable equipment rooms.',
    heroBody: 'Synstro helps integrators, distributors, and project buyers source rack cabinets, intelligent power distribution, mining PDUs, and weatherproof telecom enclosures with flexible specifications.',
    cta: 'Send inquiry', details: 'View details', applicationsTitle: 'Built for practical deployment scenarios', strengthsTitle: 'Why buyers work with Synstro', aboutTitle: 'About Synstro', contactTitle: 'Tell us what your project needs.',
    testimonialsTitle: 'What overseas customers say', testimonialsBody: 'Feedback from project buyers and integrators using Synstro cabinets, PDUs, and outdoor enclosures in real infrastructure work.',
    aboutBody: 'Synstro focuses on cabinet infrastructure for network rooms, rack power distribution, outdoor telecom protection, and project-based customization. The site is structured for distributors, integrators, and procurement teams who need clear product ranges and fast specification discussion.',
    apps: ['Data closets, office networks, and campus cabling rooms', 'Edge data centers, telecom nodes, and outdoor equipment stations', 'Mining facilities, power rooms, and high-density electrical loads', 'Energy storage, industrial control, and system integration projects'],
    strengths: ['Clear product families for cabinets, PDUs, and outdoor enclosures', 'Custom dimensions, colors, ventilation, power layouts, and accessory matching', 'Procurement-friendly specs, drawings, and quote-ready details', 'Bilingual structure for international buyers and Chinese documentation'],
    form: { name: 'Name', company: 'Company', email: 'Email', phone: 'WhatsApp / phone', country: 'Country / region', product: 'Product category', quantity: 'Quantity', message: 'Project message', submit: 'Prepare inquiry email', note: 'The form opens your email client with the inquiry details. You can also email sales@synstro.xyz directly.' }
  },
  zh: {
    nav: { home: '首页', products: '产品', applications: '应用', strengths: '优势', testimonials: '客户评价', about: '关于我们', inquiry: '询盘' },
    switch: 'English',
    heroEyebrow: '面向 B2B 项目的网络机柜与配电基础设施',
    heroTitle: '可靠设备间所需的网络机柜、PDU 与户外防护箱柜。',
    heroBody: 'Synstro 面向集成商、经销商和项目采购，提供机柜、智能配电、矿机 PDU 与户外电信防护箱柜，支持灵活规格配置。',
    cta: '发送询盘', details: '查看详情', applicationsTitle: '适用于实际部署场景', strengthsTitle: '为什么项目采购选择 Synstro', aboutTitle: '关于 Synstro', contactTitle: '告诉我们您的项目需求。',
    testimonialsTitle: '国外客户评价', testimonialsBody: '来自海外项目采购、集成商和电信工程团队的真实反馈，聚焦机柜、PDU 与户外防护箱柜的项目交付体验。',
    aboutBody: 'Synstro 专注于网络机房基础设施、机柜配电、户外电信防护和项目化定制。网站结构面向经销商、集成商和采购团队，帮助客户快速了解产品范围并进入规格沟通。',
    apps: ['弱电间、办公网络和园区综合布线机房', '边缘数据中心、通信节点和户外设备站点', '矿机场景、配电房和高密度电力负载', '储能、工业控制和系统集成项目'],
    strengths: ['覆盖机柜、PDU 和户外箱柜的清晰产品系列', '支持尺寸、颜色、通风、配电布局和附件匹配定制', '围绕规格、图纸和报价信息进行项目化沟通', '中英双语站点结构，方便海外采购与中文资料并行'],
    form: { name: '姓名', company: '公司', email: '邮箱', phone: 'WhatsApp / 电话', country: '国家 / 地区', product: '产品类别', quantity: '数量', message: '项目留言', submit: '生成询盘邮件', note: '表单会打开您的邮箱并带入询盘内容，也可以直接发送邮件至 sales@synstro.xyz。' }
  }
};

const pageSet = new Set(['products', 'applications', 'advantages', 'reviews', 'about']);

function parseRoute() {
  const parts = location.pathname.split('/').filter(Boolean);
  const locale = parts[0] === 'zh' ? 'zh' : 'en';
  const product = parts[1] === 'products' && parts[2] ? products.find(p => p.slug === parts[2]) : null;
  const contact = parts[1] === 'contact';
  const page = !product && pageSet.has(parts[1]) ? parts[1] : null;
  return { locale, product, contact, page };
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

function absoluteUrl(pathname = location.pathname) {
  return `https://synstro.xyz${pathname}`;
}

function upsertMeta(selector, attrs) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    document.head.appendChild(node);
  }
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
}

function upsertLink(key, attrs) {
  let node = document.head.querySelector(`link[data-seo="${key}"]`);
  if (!node) {
    node = document.createElement('link');
    node.dataset.seo = key;
    document.head.appendChild(node);
  }
  Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value));
}

function seoForRoute(route) {
  const isZh = route.locale === 'zh';
  if (route.product) {
    const p = route.product[route.locale];
    return { title: `${p.title} | Synstro`, description: p.body };
  }
  if (route.contact) return { title: isZh ? '联系询盘 | Synstro 网络机柜' : 'Inquiry | Synstro Network Cabinets', description: isZh ? '提交网络机柜、PDU、户外防雨柜项目需求，获取规格和报价沟通。' : 'Send cabinet, PDU, or outdoor enclosure requirements for specification and quotation discussion.' };
  if (route.page === 'products') return { title: isZh ? '产品系列 | Synstro 网络机柜、PDU、户外柜' : 'Product Series | Synstro Cabinets, PDUs, Outdoor Enclosures', description: isZh ? '查看网络机柜、PDU、智能 PDU、矿机 PDU、户外防雨柜、电信柜与储能柜产品系列。' : 'Explore network cabinets, server racks, PDUs, smart PDUs, mining PDUs, outdoor weatherproof cabinets, telecom boxes, and energy storage enclosures.' };
  if (route.page === 'reviews') return { title: isZh ? '国外客户评价 | Synstro' : 'Customer Reviews | Synstro', description: copy[route.locale].testimonialsBody };
  if (route.page === 'applications') return { title: isZh ? '应用场景 | Synstro' : 'Applications | Synstro', description: isZh ? '网络机柜、PDU 和户外箱柜在弱电间、数据中心、电信站点、矿机和储能项目中的应用。' : 'Deployment scenarios for network cabinets, PDUs, outdoor telecom cabinets, mining facilities, and energy storage projects.' };
  if (route.page === 'advantages') return { title: isZh ? '优势能力 | Synstro' : 'Advantages | Synstro', description: isZh ? '了解 Synstro 在产品系列、规格定制、项目沟通和外贸采购支持方面的优势。' : 'Learn Synstro advantages in product range, customization, project communication, and overseas procurement support.' };
  if (route.page === 'about') return { title: isZh ? '关于我们 | Synstro' : 'About Us | Synstro', description: copy[route.locale].aboutBody };
  return { title: isZh ? 'Synstro 网络机柜、PDU、户外防雨柜与电信箱柜' : 'Synstro Network Cabinets, PDUs, Outdoor Telecom Enclosures', description: isZh ? 'Synstro 面向海外项目采购提供网络机柜、服务器机柜、PDU、智能 PDU、矿机 PDU、户外防雨柜、电信柜和储能柜。' : 'Synstro supplies network cabinets, server racks, PDUs, smart PDUs, mining PDUs, outdoor weatherproof cabinets, telecom boxes, and energy storage enclosures for overseas projects.' };
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
    textRef.current.innerText = element.querySelector(':scope > a')?.innerText || element.innerText;
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
  const activate = (event, item) => {
    event.preventDefault();
    const li = event.currentTarget.parentElement;
    if (li) updateEffectPosition(li);
    textRef.current?.classList.remove('active');
    void textRef.current?.offsetWidth;
    textRef.current?.classList.add('active');
    if (filterRef.current) makeParticles(filterRef.current);
    onSelect(item.href);
  };
  useEffect(() => {
    const activeLi = navRef.current?.querySelectorAll('li')[activeIndex];
    if (!activeLi) return undefined;
    updateEffectPosition(activeLi);
    textRef.current?.classList.add('active');
    const resizeObserver = new ResizeObserver(() => updateEffectPosition(activeLi));
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);
  return <div className="gooey-nav-container" ref={containerRef}><nav className="gooey-nav" aria-label="Primary navigation"><ul ref={navRef}>{items.map((item, index) => <li key={item.label} className={`${activeIndex === index ? 'active' : ''} ${item.children ? 'has-dropdown' : ''}`}><a href={item.href} onClick={event => activate(event, item)}>{item.label}</a>{item.children ? <div className="product-menu" role="menu">{item.children.map(group => <a className="product-menu-group" href={group.href} key={group.title} onClick={event => activate(event, group)}><strong>{group.title}</strong><span>{group.children.join(' / ')}</span></a>)}</div> : null}</li>)}</ul></nav><span className="gooey-effect filter" ref={filterRef} /><span className="gooey-effect text" ref={textRef} /></div>;
}

function App() {
  const [route, setRoute] = useState(parseRoute());
  const [activeIndex, setActiveIndex] = useState(() => activeNavIndex(parseRoute()));
  useEffect(() => {
    if (location.pathname === '/') history.replaceState({}, '', '/en');
    const syncRoute = () => { const next = parseRoute(); setRoute(next); setActiveIndex(activeNavIndex(next)); };
    addEventListener('popstate', syncRoute);
    return () => removeEventListener('popstate', syncRoute);
  }, []);
  useEffect(() => {
    document.documentElement.lang = route.locale === 'zh' ? 'zh-CN' : 'en';
    const seo = seoForRoute(route);
    document.title = seo.title;
    upsertMeta('meta[name="description"]', { name: 'description', content: seo.description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: absoluteUrl(location.pathname) });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertLink('canonical', { rel: 'canonical', href: absoluteUrl(location.pathname) });
    const enPath = location.pathname.replace(/^\/(en|zh)/, '/en');
    const zhPath = location.pathname.replace(/^\/(en|zh)/, '/zh');
    upsertLink('hreflang-en', { rel: 'alternate', hreflang: 'en', href: absoluteUrl(enPath) });
    upsertLink('hreflang-zh', { rel: 'alternate', hreflang: 'zh-CN', href: absoluteUrl(zhPath) });
  }, [route]);
  const t = copy[route.locale];
  const other = route.locale === 'en' ? 'zh' : 'en';
  const navItems = useMemo(() => [
    { label: t.nav.home, href: `/${route.locale}` },
    { label: t.nav.products, href: `/${route.locale}/products`, children: productMenus[route.locale] },
    { label: t.nav.applications, href: `/${route.locale}/applications` },
    { label: t.nav.strengths, href: `/${route.locale}/advantages` },
    { label: t.nav.testimonials, href: `/${route.locale}/reviews` },
    { label: t.nav.about, href: `/${route.locale}/about` },
    { label: t.nav.inquiry, href: `/${route.locale}/contact` }
  ], [route.locale, t]);
  const nav = path => {
    history.pushState({}, '', path);
    const next = parseRoute();
    setRoute(next);
    setActiveIndex(activeNavIndex(next));
    setTimeout(() => scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };
  const languagePath = `${location.pathname.replace(/^\/(en|zh)/, '/' + other)}${location.search}`;
  const page = route.product ? <Product locale={route.locale} product={route.product} nav={nav} /> : route.contact ? <Contact locale={route.locale} /> : route.page ? <Page locale={route.locale} page={route.page} nav={nav} /> : <Home locale={route.locale} nav={nav} />;
  return <div className="shell"><Backdrop /><header><button className="brand" onClick={() => nav('/' + route.locale)}><span>S</span><b>SYNSTRO</b></button><GooeyNav items={navItems} activeIndex={activeIndex} onSelect={nav} /><div className="header-actions"><button className="language" onClick={() => nav(languagePath)}>{t.switch}</button><button className="primary small" onClick={() => nav('/' + route.locale + '/contact')}>{t.nav.inquiry}</button></div></header>{page}<footer><b>SYNSTRO</b><span>sales@synstro.xyz</span></footer></div>;
}

function Backdrop() { return <div className="backdrop"><i /><i /><i /></div>; }
function ProductImage({ src, alt }) { return <div className="product-photo"><img src={src} alt={alt} loading="lazy" /><span>{alt}</span></div>; }
function HeroShowcase({ locale }) { return <div className="hero-showcase"><img src={productAssets.hero} alt={locale === 'en' ? 'Synstro network cabinet PDU and outdoor cabinet product lineup' : 'Synstro 网络机柜 PDU 与户外柜产品组合'} /><div className="showcase-tags"><b>{locale === 'en' ? 'Cabinet + PDU + Outdoor' : '机柜 + PDU + 户外柜'}</b><span>OEM / ODM</span></div></div>; }
function ProductSummary({ product, locale, nav }) { const p = product[locale]; return <article className="product-card"><ProductImage src={product.asset} alt={p.title} /><small>{p.eyebrow}</small><h3>{p.title}</h3><p>{p.body}</p><ul>{p.specs.slice(0, 3).map(([label, value]) => <li key={label}><b>{label}</b><span>{value}</span></li>)}</ul><button onClick={() => nav('/' + locale + '/products/' + product.slug)}>{copy[locale].details} →</button></article>; }
function SpecTable({ product, locale }) { return <div className="spec-table">{product[locale].specs.map(([label, value]) => <div key={label}><b>{label}</b><span>{value}</span></div>)}</div>; }

function ProductsOverview({ locale, nav }) {
  const t = copy[locale];
  return <><section className="page-hero"><p className="eyebrow">{t.nav.products}</p><h1>{locale === 'en' ? 'Product series for cabinet infrastructure projects' : '面向机柜基础设施项目的产品系列'}</h1><p className="lead">{locale === 'en' ? 'Choose a family to review product visuals, core specifications, customization options, applications, and inquiry entry.' : '选择产品系列，查看产品图位、核心参数、可定制项、应用场景和询盘入口。'}</p></section><section className="cards product-grid page-cards">{products.map(p => <ProductSummary key={p.slug} product={p} locale={locale} nav={nav} />)}</section></>;
}

function InquiryForm({ locale, productTitle = '' }) {
  const t = copy[locale];
  const params = new URLSearchParams(location.search);
  const productFromQuery = products.find(p => p.slug === params.get('product'))?.[locale].title || productTitle;
  const [status, setStatus] = useState('');
  const submit = event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const subject = encodeURIComponent(`Synstro inquiry - ${data.product || 'project'}`);
    const body = encodeURIComponent([
      `Name: ${data.name || ''}`,
      `Company: ${data.company || ''}`,
      `Email: ${data.email || ''}`,
      `WhatsApp/Phone: ${data.phone || ''}`,
      `Country/Region: ${data.country || ''}`,
      `Product: ${data.product || ''}`,
      `Quantity: ${data.quantity || ''}`,
      '',
      data.message || ''
    ].join('\n'));
    setStatus(locale === 'en' ? 'Opening your email client with inquiry details.' : '正在打开邮箱并带入询盘内容。');
    location.href = `mailto:sales@synstro.xyz?subject=${subject}&body=${body}`;
  };
  return <form className="inquiry-form" onSubmit={submit}><div className="form-grid"><label>{t.form.name}<input name="name" required /></label><label>{t.form.company}<input name="company" /></label><label>{t.form.email}<input type="email" name="email" required /></label><label>{t.form.phone}<input name="phone" /></label><label>{t.form.country}<input name="country" /></label><label>{t.form.product}<select name="product" defaultValue={productFromQuery}>{products.map(p => <option key={p.slug}>{p[locale].title}</option>)}</select></label><label>{t.form.quantity}<input name="quantity" placeholder={locale === 'en' ? 'Example: 50 pcs' : '例如：50 台'} /></label></div><label>{t.form.message}<textarea name="message" rows="5" placeholder={locale === 'en' ? 'Cabinet size, PDU standard, IP rating, destination, drawings, or project notes.' : '机柜尺寸、PDU 标准、防护等级、目的地、图纸或项目说明。'} /></label><div className="form-actions"><button className="primary" type="submit">{t.form.submit}</button><span>{t.form.note}</span></div>{status ? <p className="status-note">{status}</p> : null}</form>;
}

function Testimonials({ locale }) {
  const t = copy[locale];
  return <section id="testimonials" className="testimonials"><div className="testimonial-panel"><div className="testimonial-top"><span>{locale === 'en' ? 'TESTIMONIALS' : '海外项目反馈'}</span><span>(06)</span></div><div className="testimonial-heading"><h2>{t.testimonialsTitle}</h2><p>{t.testimonialsBody}</p></div><div className="testimonial-grid">{reviews[locale].map(item => <article key={item.name}><div className="review-head"><span>{item.name.slice(0, 1)}</span><div><b>{item.name}</b><small>{item.role}</small></div></div><p>{item.quote}</p></article>)}</div></div></section>;
}

function Page({ locale, page, nav }) {
  const t = copy[locale];
  if (page === 'products') return <main><ProductsOverview locale={locale} nav={nav} /></main>;
  if (page === 'reviews') return <main><section className="page-hero"><p className="eyebrow">{t.nav.testimonials}</p><h1>{t.testimonialsTitle}</h1><p className="lead">{t.testimonialsBody}</p></section><Testimonials locale={locale} /></main>;
  if (page === 'applications') return <main><section className="page-hero"><p className="eyebrow">{t.nav.applications}</p><h1>{t.applicationsTitle}</h1><p className="lead">{locale === 'en' ? 'Typical deployment environments for Synstro network cabinets, PDUs, and outdoor protection systems.' : 'Synstro 网络机柜、PDU 和户外防护系统适用的典型部署环境。'}</p></section><section className="cards page-cards">{t.apps.map(x => <article key={x}><h3>{x}</h3><p>{locale === 'en' ? 'We match cabinet structure, ventilation, power distribution, and accessories by project requirements.' : '可根据项目需求匹配机柜结构、通风方案、配电布局和附件。'}</p></article>)}</section></main>;
  if (page === 'advantages') return <main><section className="page-hero"><p className="eyebrow">{t.nav.strengths}</p><h1>{t.strengthsTitle}</h1><p className="lead">{locale === 'en' ? 'Clear specification communication and flexible project matching for overseas procurement.' : '围绕海外项目采购，提供清晰规格沟通和灵活项目匹配。'}</p></section><section className="cards page-cards">{t.strengths.map(x => <article key={x}><h3>{x}</h3><p>{locale === 'en' ? 'Designed to make project inquiry, comparison, and specification confirmation faster.' : '帮助项目询盘、产品对比和规格确认更快推进。'}</p></article>)}</section></main>;
  return <main><section className="page-hero"><p className="eyebrow">{t.nav.about}</p><h1>{t.aboutTitle}</h1><p className="lead">{t.aboutBody}</p><button className="primary" onClick={() => nav('/' + locale + '/contact')}>{t.cta}</button></section></main>;
}

function Home({ locale, nav }) {
  const t = copy[locale];
  return <main><section className="hero reveal"><div><p className="eyebrow">{t.heroEyebrow}</p><h1>{t.heroTitle}</h1><p className="lead">{t.heroBody}</p><div className="actions"><button className="primary" onClick={() => nav('/' + locale + '/contact')}>{t.cta}</button><a href={'/' + locale + '/products'} onClick={event => { event.preventDefault(); nav('/' + locale + '/products'); }}>{locale === 'en' ? 'View product series' : '查看产品系列'}</a></div><div className="chips"><span>Indoor + outdoor</span><span>OEM/ODM ready</span><span>Project-based specs</span></div></div><HeroShowcase locale={locale} /></section><section id="products"><p className="eyebrow">{t.nav.products}</p><h2>{locale === 'en' ? 'Product series' : '产品系列'}</h2><div className="quick">{products.map(p => <button key={p.slug} onClick={() => nav('/' + locale + '/products/' + p.slug)}><small>{p[locale].eyebrow}</small>{p[locale].title}</button>)}</div><div className="cards product-grid">{products.map(p => <ProductSummary key={p.slug} product={p} locale={locale} nav={nav} />)}</div></section><section id="applications" className="split"><h2>{t.applicationsTitle}</h2><div>{t.apps.map(x => <p key={x}>✓ {x}</p>)}</div></section><section id="strengths" className="strength"><p className="eyebrow">{t.nav.strengths}</p><h2>{t.strengthsTitle}</h2><div>{t.strengths.map(x => <p key={x}>{x}</p>)}</div></section><Testimonials locale={locale} /><section id="about" className="about"><p className="eyebrow">{t.nav.about}</p><h2>{t.aboutTitle}</h2><p>{t.aboutBody}</p></section><section className="cta"><h2>{locale === 'en' ? 'Send your cabinet or PDU requirements.' : '发送您的机柜或 PDU 项目需求。'}</h2><button className="primary" onClick={() => nav('/' + locale + '/contact')}>{t.cta}</button></section></main>;
}

function Product({ locale, product, nav }) {
  const p = product[locale];
  return <main><section className="detail product-detail-hero"><div><p className="eyebrow">{p.eyebrow}</p><h1>{p.title}</h1><p className="lead">{p.body}</p><button className="primary" onClick={() => nav('/' + locale + '/contact?product=' + product.slug)}>{locale === 'en' ? 'Ask for specifications' : '咨询规格'}</button></div><div className="product-gallery">{product.gallery.map((src, index) => <ProductImage key={src} src={src} alt={`${p.title} ${index + 1}`} />)}</div></section><section className="product-section"><div className="section-head"><p className="eyebrow">{locale === 'en' ? 'Core specifications' : '核心参数'}</p><h2>{locale === 'en' ? 'Quote-ready parameters' : '可用于询价沟通的参数'}</h2></div><SpecTable product={product} locale={locale} /></section><section className="cards three product-info-cards"><article><h3>{locale === 'en' ? 'Product types' : '产品类型'}</h3>{p.items.map(x => <p key={x}>✓ {x}</p>)}</article><article><h3>{locale === 'en' ? 'Customization' : '可定制项'}</h3>{p.custom.map(x => <p key={x}>✓ {x}</p>)}</article><article><h3>{locale === 'en' ? 'Applications' : '应用场景'}</h3>{p.applications.map(x => <p key={x}>✓ {x}</p>)}</article></section><section className="inquiry-panel"><div><p className="eyebrow">{locale === 'en' ? 'Project inquiry' : '项目询盘'}</p><h2>{locale === 'en' ? 'Send requirements for this product family' : '发送该产品系列的项目需求'}</h2><p>{locale === 'en' ? 'The product category is pre-selected so buyers can send quantity, destination, and specification details faster.' : '产品类别已自动带入，方便客户快速补充数量、目的地和规格信息。'}</p></div><InquiryForm locale={locale} productTitle={p.title} /></section></main>;
}

function Contact({ locale }) {
  const t = copy[locale];
  return <main><section className="contact contact-page"><div><p className="eyebrow">{t.nav.inquiry}</p><h1>{t.contactTitle}</h1><p className="lead">{locale === 'en' ? 'Send cabinet type, size, PDU layout, quantity, destination, and drawings if available. We will use the details for specification discussion.' : '请提供机柜类型、尺寸、PDU 布局、数量、目的地，以及已有图纸或招标要求，用于规格和报价沟通。'}</p><div className="contact-box"><a href="mailto:sales@synstro.xyz">sales@synstro.xyz</a><span>WhatsApp TODO</span></div></div><InquiryForm locale={locale} /></section></main>;
}

createRoot(document.getElementById('root')).render(<App />);

import React, { useMemo, useState } from 'react';
import { seriesForProduct, seriesTitle } from './catalog.js';

const productAssets = {
  hero: '/assets/products/hero-cabinet-lineup.svg',
  network: '/assets/products/network-cabinet.svg',
  pdu: '/assets/products/pdu-power.svg',
  outdoor: '/assets/products/outdoor-telecom.svg'
};

const labels = {
  en: {
    home: 'Products',
    request: 'Request a Quote',
    inquiry: 'Send Inquiry',
    back: 'Back to series',
    gallery: 'Product media',
    selected: 'Selected model',
    quantity: 'Inquiry quantity',
    keySpecs: 'Core specifications',
    modelTable: 'Full model parameter table',
    support: 'Customization / Project Support',
    applications: 'Applications',
    related: 'Related Series',
    quoteNote: 'Project pricing is confirmed by model, quantity, destination, drawings, and packaging requirements.',
    ctaNote: 'The inquiry email will include the current category, series, model, and quantity.',
    trust: ['OEM / ODM ready', 'Drawing confirmation', 'Export packaging', 'Confirm by project'],
    supportItems: ['Cabinet size, color, door, fan, shelf, and accessory configuration', 'PDU socket standard, cable length, rated current, and switch requirements', 'Outdoor cabinet protection, cooling method, installation, and battery layout'],
    appItems: ['Data rooms and office cabling closets', 'Telecom nodes and edge infrastructure', 'Rack power distribution and project replacement', 'Outdoor equipment, energy storage, and industrial integration'],
    email: 'Email Sales',
    whatsapp: 'WhatsApp',
    empty: 'Confirm by project'
  },
  zh: {
    home: '产品',
    request: '获取报价',
    inquiry: '发送询盘',
    back: '返回系列目录',
    gallery: '产品图片',
    selected: '当前型号',
    quantity: '询盘数量',
    keySpecs: '核心参数',
    modelTable: '完整型号参数表',
    support: '定制 / 项目支持',
    applications: '应用场景',
    related: '相关系列',
    quoteNote: '项目价格根据型号、数量、目的地、图纸和包装要求确认。',
    ctaNote: '询盘邮件会自动带入当前分类、系列、型号和数量。',
    trust: ['OEM / ODM 支持', '图纸确认', '出口包装', '按项目确认'],
    supportItems: ['机柜尺寸、颜色、门板、风扇、层板和配件配置', 'PDU 插座标准、线缆长度、额定电流和开关需求', '户外柜防护等级、散热方式、安装方式和电池布局'],
    appItems: ['弱电间、机房和办公综合布线', '通信节点和边缘基础设施', '机柜配电与项目替换', '户外设备、储能和工业集成'],
    email: '邮件联系',
    whatsapp: 'WhatsApp',
    empty: '按项目确认'
  }
};

function displayTitle(value) {
  return String(value || '').replaceAll('Sever', 'Server').replaceAll('\n', ' ');
}

function cleanValue(value, locale) {
  if (value === undefined || value === null || value === '' || value === '/') return labels[locale].empty;
  return value;
}

function modelName(model) {
  return model.model || model.description || model.wire || 'Model';
}

function getProductAsset(product) {
  if (product?.slug === 'pdu-power') return productAssets.pdu;
  if (product?.slug === 'outdoor-telecom') return productAssets.outdoor;
  return productAssets.network;
}

function getKeySpecs(series, model, locale) {
  if (series.parent === 'pdu-power') {
    return [
      [locale === 'en' ? 'Socket Type' : '插座类型', displayTitle(seriesTitle(series, locale))],
      [locale === 'en' ? 'Pure copper wire' : '纯铜线规格', cleanValue(model.wire, locale)],
      [locale === 'en' ? 'Rated Current' : '额定电流', cleanValue(model.current, locale)],
      [locale === 'en' ? 'Description' : '配置描述', cleanValue(model.description, locale)]
    ];
  }

  return [
    ['Model / 型号', cleanValue(model.model, locale)],
    [locale === 'en' ? 'Size W*D*H' : '尺寸 W*D*H', cleanValue(model.size, locale)],
    [locale === 'en' ? 'Volume CBM' : '体积 CBM', cleanValue(model.volume, locale)],
    [locale === 'en' ? 'Weight' : '重量', cleanValue(model.weight, locale)],
    [locale === 'en' ? 'Accessories' : '配件', cleanValue(model.accessories, locale)]
  ];
}

function buildInquiryMailto({ locale, product, series, model, quantity }) {
  const title = displayTitle(seriesTitle(series, locale));
  const subject = encodeURIComponent(`Synstro inquiry - ${title} - ${modelName(model)}`);
  const specs = getKeySpecs(series, model, locale).map(([key, value]) => `${key}: ${value}`).join('\n');
  const body = encodeURIComponent([
    `Product category: ${product[locale].title}`,
    `Series: ${title}`,
    `Selected model: ${modelName(model)}`,
    `Quantity: ${quantity}`,
    '',
    specs,
    '',
    'Project notes:',
    locale === 'en' ? 'Please quote based on destination, packaging, and customization requirements.' : '请根据目的地、包装和定制要求报价。'
  ].join('\n'));
  return `mailto:sales@synstro.xyz?subject=${subject}&body=${body}`;
}

function ProductMediaGallery({ locale, product, series }) {
  const media = [getProductAsset(product), productAssets.hero, productAssets.outdoor];
  const [active, setActive] = useState(0);
  const title = displayTitle(seriesTitle(series, locale));
  const next = () => setActive((value) => (value + 1) % media.length);
  const prev = () => setActive((value) => (value - 1 + media.length) % media.length);

  return <div className="pdp-gallery" aria-label={labels[locale].gallery}>
    <div className="pdp-main-image">
      <img src={media[active]} alt={title} loading="eager" />
      <button className="gallery-arrow prev" type="button" onClick={prev} aria-label="Previous image">‹</button>
      <button className="gallery-arrow next" type="button" onClick={next} aria-label="Next image">›</button>
      <span className="gallery-badge">{labels[locale].gallery}</span>
    </div>
    <div className="thumbnail-row">
      {media.map((src, index) => <button key={src} type="button" className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
        <img src={src} alt={`${title} ${index + 1}`} loading="lazy" />
      </button>)}
    </div>
  </div>;
}

function ModelSelector({ locale, models, selectedIndex, onSelect }) {
  return <div className="model-selector">
    <div className="mini-heading"><b>{labels[locale].selected}</b><span>{models.length} {locale === 'en' ? 'models' : '个型号'}</span></div>
    <div className="model-button-grid">
      {models.map((model, index) => <button key={`${modelName(model)}-${index}`} type="button" className={selectedIndex === index ? 'active' : ''} onClick={() => onSelect(index)}>{modelName(model)}</button>)}
    </div>
  </div>;
}

function KeySpecSummary({ locale, series, model }) {
  return <div className="key-spec-card">
    <div className="mini-heading"><b>{labels[locale].keySpecs}</b><span>{modelName(model)}</span></div>
    {getKeySpecs(series, model, locale).map(([key, value]) => <div className="key-spec-row" key={key}><span>{key}</span><b>{value}</b></div>)}
  </div>;
}

function InquiryPanel({ locale, product, series, model, quantity, setQuantity }) {
  const mailto = buildInquiryMailto({ locale, product, series, model, quantity });
  return <div className="pdp-inquiry">
    <div className="quantity-row"><span>{labels[locale].quantity}</span><div className="quantity-stepper"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><input value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))} inputMode="numeric" aria-label={labels[locale].quantity} /><button type="button" onClick={() => setQuantity(quantity + 1)}>+</button></div></div>
    <a className="primary quote-button" href={mailto}>{labels[locale].inquiry}</a>
    <div className="contact-links"><a href="mailto:sales@synstro.xyz">{labels[locale].email}</a><a href="https://wa.me/" target="_blank" rel="noreferrer">{labels[locale].whatsapp}</a></div>
    <small>{labels[locale].ctaNote}</small>
  </div>;
}

function ProjectSupport({ locale }) {
  return <section className="pdp-support"><div className="section-head"><p className="eyebrow">{labels[locale].support}</p><h2>{labels[locale].support}</h2></div><div className="cards product-info-cards">{labels[locale].supportItems.map((item) => <article key={item}><h3>{item}</h3><p>{locale === 'en' ? 'Confirm drawings, packing, quantity, lead time, and project requirements before production.' : '生产前确认图纸、包装、数量、交期和项目要求。'}</p></article>)}</div></section>;
}

function Applications({ locale }) {
  return <section className="pdp-support"><div className="section-head"><p className="eyebrow">{labels[locale].applications}</p><h2>{labels[locale].applications}</h2></div><div className="cards product-info-cards">{labels[locale].appItems.map((item) => <article key={item}><h3>{item}</h3><p>{locale === 'en' ? 'Use the model table to match cabinet size, power configuration, and project site conditions.' : '可结合型号表匹配柜体尺寸、配电配置和项目现场条件。'}</p></article>)}</div></section>;
}

function RelatedSeries({ locale, series, nav }) {
  const related = seriesForProduct(series.parent).filter((item) => item.slug !== series.slug).slice(0, 3);
  if (!related.length) return null;
  return <section className="related-series"><div className="section-head"><p className="eyebrow">{labels[locale].related}</p><h2>{labels[locale].related}</h2></div><div className="catalog-grid">{related.map((item) => <button key={item.slug} className="series-card" onClick={() => nav(`/${locale}/products/${item.parent}/${item.slug}`)}><span>{displayTitle(seriesTitle(item, locale))}</span><b>{item.models.length} {locale === 'en' ? 'models' : '个型号'}</b><small>/products/{item.parent}/{item.slug}</small></button>)}</div></section>;
}

function ModelTable({ models, locale, isPdu, series }) {
  const tableLabels = isPdu ? (locale === 'en' ? ['Socket Type', 'Pure copper wire', 'Rated current', 'Description'] : ['插座类型', '纯铜线规格', '额定电流', '配置描述']) : (locale === 'en' ? ['Model', 'Size W*D*H', 'Volume CBM', 'Weight', 'Accessories'] : ['型号', '尺寸 W*D*H', '体积 CBM', '重量', '配件']);
  return <div className="model-table-wrap"><table className="model-table"><thead><tr>{tableLabels.map((label) => <th key={label}>{label}</th>)}</tr></thead><tbody>{models.map((model, index) => isPdu ? <tr key={index}><td>{displayTitle(seriesTitle(series, locale))}</td><td>{cleanValue(model.wire, locale)}</td><td>{cleanValue(model.current, locale)}</td><td>{cleanValue(model.description, locale)}</td></tr> : <tr key={`${model.model}-${index}`}><td>{cleanValue(model.model, locale)}</td><td>{cleanValue(model.size, locale)}</td><td>{cleanValue(model.volume, locale)}</td><td>{cleanValue(model.weight, locale)}</td><td>{cleanValue(model.accessories, locale)}</td></tr>)}</tbody></table></div>;
}

export function IndustrialProductDetailPage({ locale, product, series, nav, productPath }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const selectedModel = series.models[selectedIndex] || series.models[0] || {};
  const isPdu = series.parent === 'pdu-power';
  const title = displayTitle(seriesTitle(series, locale));

  const productHref = useMemo(() => productPath(locale, product), [locale, product, productPath]);

  return <main>
    <section className="industrial-pdp">
      <ProductMediaGallery locale={locale} product={product} series={series} />
      <aside className="pdp-info">
        <div className="breadcrumbs"><a href={`/${locale}/products`} onClick={(event) => { event.preventDefault(); nav(`/${locale}/products`); }}>{labels[locale].home}</a><span>/</span><a href={productHref} onClick={(event) => { event.preventDefault(); nav(productHref); }}>{product[locale].title}</a></div>
        <p className="eyebrow">{product[locale].eyebrow}</p>
        <h1>{title}</h1>
        <div className="trust-row">{labels[locale].trust.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="quote-box"><b>{labels[locale].request}</b><span>{labels[locale].quoteNote}</span></div>
        <ModelSelector locale={locale} models={series.models} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
        <KeySpecSummary locale={locale} series={series} model={selectedModel} />
        <InquiryPanel locale={locale} product={product} series={series} model={selectedModel} quantity={quantity} setQuantity={setQuantity} />
      </aside>
    </section>

    <section className="model-section"><div className="section-head"><p className="eyebrow">{labels[locale].modelTable}</p><h2>{series.models.length} {locale === 'en' ? 'models in this series' : '个型号参数'}</h2></div><ModelTable models={series.models} locale={locale} isPdu={isPdu} series={series} /></section>
    <ProjectSupport locale={locale} />
    <Applications locale={locale} />
    <RelatedSeries locale={locale} series={series} nav={nav} />
    <div className="mobile-sticky-cta"><a className="primary" href={buildInquiryMailto({ locale, product, series, model: selectedModel, quantity })}>{labels[locale].inquiry}</a></div>
  </main>;
}

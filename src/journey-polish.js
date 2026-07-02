const productCards = {
  en: {
    trust: ['OEM / ODM Ready', 'Drawing Confirmation', 'Export Packaging', 'Project Specification Support'],
    eyebrow: 'Product families',
    title: 'Shop the catalog by project requirement',
    body: 'Three core product families cover indoor rack infrastructure, rack power distribution, and outdoor protected cabinets.',
    spec: 'Core spec',
    use: 'Typical use',
    action: 'View family',
    products: [
      ['network-cabinets', '/assets/products/network-cabinet.svg', 'Indoor infrastructure', 'Network Cabinets & Server Racks', 'Wall mount, floor standing, server rack', 'Data rooms, office cabling, campus networks'],
      ['pdu-power', '/assets/products/pdu-power.svg', 'Power distribution', 'Rack PDU by Socket Standard', 'Socket standard, copper wire, rated current', 'Rack power distribution and replacement'],
      ['outdoor-telecom', '/assets/products/outdoor-telecom.svg', 'Outdoor protection', 'Outdoor Waterproof Cabinets', 'Outdoor waterproof cabinet, battery cabinet', 'Telecom, edge, storage, outdoor power']
    ]
  },
  zh: {
    trust: ['OEM / ODM 支持', '图纸确认', '出口包装', '项目规格支持'],
    eyebrow: '产品系列',
    title: '按项目需求查看产品目录',
    body: '三大产品族覆盖室内机柜基础设施、机柜配电和户外防护箱柜。',
    spec: '核心参数',
    use: '典型应用',
    action: '查看分类',
    products: [
      ['network-cabinets', '/assets/products/network-cabinet.svg', '室内基础设施', '网络机柜与服务器机柜', '壁挂、落地、服务器机柜', '弱电间、办公布线、园区网络'],
      ['pdu-power', '/assets/products/pdu-power.svg', '电源分配', '按插座标准分类的 PDU', '插座标准、纯铜线、额定电流', '机柜配电与替换项目'],
      ['outdoor-telecom', '/assets/products/outdoor-telecom.svg', '户外防护', '户外防水柜与电池柜', '户外防水柜、电池柜', '通信、边缘、储能、户外电源']
    ]
  }
};

function currentLocale() {
  return location.pathname.split('/').filter(Boolean)[0] === 'zh' ? 'zh' : 'en';
}

function isHomePage() {
  const parts = location.pathname.split('/').filter(Boolean);
  return parts.length === 0 || (parts.length === 1 && (parts[0] === 'en' || parts[0] === 'zh'));
}

function htmlEscape(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function buildTrust(locale) {
  return `<section class="journey-trust" data-journey-section="trust">${productCards[locale].trust.map((item) => `<span>${htmlEscape(item)}</span>`).join('')}</section>`;
}

function buildProducts(locale) {
  const t = productCards[locale];
  const cards = t.products.map(([slug, image, eyebrow, title, spec, use]) => `
    <article class="journey-product-card">
      <a class="journey-product-image" href="/${locale}/products/${slug}"><img src="${image}" alt="${htmlEscape(title)}" loading="lazy" /></a>
      <div class="journey-product-copy">
        <p>${htmlEscape(eyebrow)}</p>
        <h3>${htmlEscape(title)}</h3>
        <dl>
          <div><dt>${htmlEscape(t.spec)}</dt><dd>${htmlEscape(spec)}</dd></div>
          <div><dt>${htmlEscape(t.use)}</dt><dd>${htmlEscape(use)}</dd></div>
        </dl>
        <a class="primary" href="/${locale}/products/${slug}">${htmlEscape(t.action)}</a>
      </div>
    </article>`).join('');
  return `<section class="journey-products" data-journey-section="products"><div class="journey-section-head"><p class="eyebrow">${htmlEscape(t.eyebrow)}</p><h2>${htmlEscape(t.title)}</h2><p>${htmlEscape(t.body)}</p></div><div class="journey-product-grid">${cards}</div></section>`;
}

function enhanceJourneyHome() {
  document.querySelectorAll('[data-journey-section]').forEach((node) => node.remove());
  if (!isHomePage()) return;
  const hero = document.querySelector('main .hero');
  if (!hero) return;
  const locale = currentLocale();
  hero.insertAdjacentHTML('afterend', buildProducts(locale));
  hero.insertAdjacentHTML('afterend', buildTrust(locale));
}

const observer = new MutationObserver(() => {
  if (!document.querySelector('[data-journey-section]')) enhanceJourneyHome();
});
observer.observe(document.body, { childList: true, subtree: true });
window.addEventListener('popstate', () => requestAnimationFrame(enhanceJourneyHome));
document.addEventListener('click', () => requestAnimationFrame(enhanceJourneyHome), true);
requestAnimationFrame(enhanceJourneyHome);

(() => {
  const categories = [
    {
      slug: 'network-cabinets',
      en: 'Network Cabinets',
      zh: '网络机柜',
      items: [
        ['wall-mount-cabinets', 'Wall-mount Cabinets', '壁挂机柜'],
        ['floor-standing-cabinets', 'Floor-standing Cabinets', '落地机柜'],
        ['sever-cabinets', 'Server Cabinets', '服务器机柜'],
        ['network-cabinets', 'Network Cabinets', '网络机柜'],
        ['data-center-server-rack', 'Data Center Server Rack', '数据中心服务器机柜'],
        ['packing', 'Packing', '包装']
      ]
    },
    {
      slug: 'pdu-power',
      en: 'PDU',
      zh: 'PDU',
      items: [
        ['multi-universal-socket', 'Multi Universal Socket', '多功能通用插座'],
        ['uk-standard-bs1363', 'UK Standard BS1363', '英标 BS1363'],
        ['usa-standard', 'USA Standard', '美标'],
        ['germany-standard', 'Germany Standard', '德标'],
        ['c13', 'C13', 'C13'],
        ['c19', 'C19', 'C19']
      ]
    },
    {
      slug: 'outdoor-telecom',
      en: 'Outdoor Waterproof Cabinets',
      zh: '户外防雨柜',
      items: [
        ['outdoor-waterproof-network-cabinet', 'Outdoor Waterproof Network Cabinet', '户外防水网络机柜'],
        ['air-conditioning-waterproof-battery-cabinet', 'Air Conditioning Waterproof Battery Cabinet', '空调防水电池柜']
      ]
    }
  ];

  const OPEN_DELAY = 120;
  const CLOSE_DELAY = 260;
  let enhanced = false;

  function locale() { return location.pathname.startsWith('/zh') ? 'zh' : 'en'; }
  function pathFor(category, item) { return `/${locale()}/products/${category.slug}/${item[0]}`; }

  function buildMenu(productsLink) {
    const lang = locale();
    const wrapper = document.createElement('div');
    wrapper.className = 'product-mega-nav';
    productsLink.parentNode.insertBefore(wrapper, productsLink);
    wrapper.appendChild(productsLink);
    productsLink.classList.add('product-mega-trigger');
    productsLink.setAttribute('aria-haspopup', 'true');
    productsLink.setAttribute('aria-expanded', 'false');
    productsLink.setAttribute('role', 'button');

    const panel = document.createElement('div');
    panel.className = 'product-mega-panel';
    panel.setAttribute('role', 'menu');
    panel.innerHTML = '<div class="mega-primary" role="tablist"></div><div class="mega-secondary" role="tabpanel"></div>';
    wrapper.appendChild(panel);

    const primary = panel.querySelector('.mega-primary');
    const secondary = panel.querySelector('.mega-secondary');
    let activeIndex = 0;
    let openTimer = 0;
    let closeTimer = 0;

    function setOpen(open) {
      wrapper.classList.toggle('open', open);
      productsLink.setAttribute('aria-expanded', String(open));
    }

    function openWithDelay() {
      clearTimeout(closeTimer);
      openTimer = window.setTimeout(() => setOpen(true), OPEN_DELAY);
    }

    function closeWithDelay() {
      clearTimeout(openTimer);
      closeTimer = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
    }

    function renderSecondary(index) {
      activeIndex = index;
      Array.from(primary.children).forEach((button, buttonIndex) => {
        button.classList.toggle('active', buttonIndex === index);
        button.setAttribute('aria-selected', String(buttonIndex === index));
      });
      const category = categories[index];
      secondary.innerHTML = `<div class="mega-category-title">${category[lang]}</div><div class="mega-list"></div>`;
      const list = secondary.querySelector('.mega-list');
      category.items.forEach((item) => {
        const link = document.createElement('a');
        link.href = pathFor(category, item);
        link.textContent = item[lang === 'zh' ? 2 : 1];
        link.setAttribute('role', 'menuitem');
        list.appendChild(link);
      });
    }

    categories.forEach((category, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = category[lang];
      button.addEventListener('pointerenter', () => renderSecondary(index));
      button.addEventListener('focus', () => renderSecondary(index));
      button.addEventListener('click', () => {
        renderSecondary(index);
        setOpen(true);
      });
      primary.appendChild(button);
    });

    renderSecondary(0);

    wrapper.addEventListener('pointerenter', openWithDelay);
    wrapper.addEventListener('pointerleave', closeWithDelay);
    panel.addEventListener('pointerenter', () => clearTimeout(closeTimer));
    panel.addEventListener('pointerleave', closeWithDelay);

    productsLink.addEventListener('click', (event) => {
      event.preventDefault();
      clearTimeout(closeTimer);
      setOpen(!wrapper.classList.contains('open'));
    });

    productsLink.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(!wrapper.classList.contains('open'));
      }
    });

    document.addEventListener('click', (event) => {
      if (!wrapper.contains(event.target)) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  function enhance() {
    if (enhanced) return;
    const productsLink = document.querySelector('.plain-nav a[data-product-menu="true"], .plain-nav a[href$="/products"]');
    if (!productsLink) return;
    enhanced = true;
    buildMenu(productsLink);
  }

  const observer = new MutationObserver(enhance);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
})();

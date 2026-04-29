(function () {
  const SHARED_CONTACT = {
    mapUrl: "https://www.google.com/maps?q=39.495872,-8.575388&z=13&output=embed",
    buttonText: "Abrir no Google Maps",
    buttonUrl: "https://maps.google.com/?q=39.495872,-8.575388",
    items: [
      { title: "Email", text: "viveralmonda@gmail.com" },
      { title: "Onde nos pode encontrar?", text: "Associacao Viver Almonda esta junto ao rio Almonda, em Torres Novas." }
    ]
  };

  const HOME_ABOUT_CONTENT = {
    title: "Sobre Nos",
    text: "A Associacao Viver Almonda nasceu com uma missao clara e urgente: garantir a dignidade que o rio Almonda merece. Trabalhamos com respeito ao meio ambiente e ao patrimonio natural, criando experiencias desportivas que fazem sentido para toda a comunidade.",
    items: [
      { text: "A Associacao Viver Almonda nasceu com uma missao clara e urgente: garantir a dignidade que o Rio Almonda merece." },
      { text: "O rio e mais do que um curso de agua, e um caminho de vida, um refugio de biodiversidade, um espaco de encontro entre pessoas e natureza." },
      { text: "Cuidar dele e cuidar da identidade de todos os que crescem, vivem e sonham junto as suas margens." },
      { text: "Atuamos onde a vida acontece, no rio, nas suas margens, em tudo o que nasce e floresce, limpando, protegendo, restaurando e educando." },
      { text: "Cada acao e um gesto de respeito, cada projeto uma promessa de futuro." },
      { text: "Acreditamos que o rio so pode ser plenamente vivido quando e bem cuidado e e por isso que unimos a protecao ambiental a praticas desportivas, ludicas e sustentaveis, criando experiencias que aproximam as pessoas a natureza." }
    ],
    highlights: [
      { title: "Remar e mais do que desporto", text: "E um compromisso de ligacao ao rio e ao ambiente." },
      { title: "Caminhar pela margem", text: "E mais que lazer: e vigilancia e amor pelo territorio." },
      { title: "Participar e fazer parte", text: "E assumir o dever de deixar o Almonda melhor do que o encontramos." },
      { title: "A nossa missao", text: "Proteger o rio, inspirar a comunidade e garantir que a vida continue a prosperar tao livre quanto a propria agua." }
    ]
  };

  function cloneSharedContact() {
    return JSON.parse(JSON.stringify(SHARED_CONTACT));
  }

  function cloneHomeAboutContent() {
    return JSON.parse(JSON.stringify(HOME_ABOUT_CONTENT));
  }

  function applySharedContact(block) {
    if (block.type !== "contact") {
      return block;
    }

    return {
      ...block,
      title: "Contactos",
      text: "",
      ...cloneSharedContact()
    };
  }

  const DEFAULT_PAGES = {
    home: {
      name: "Pagina inicial",
      blocks: [
        {
          id: "home-hero",
          type: "hero",
          visible: true,
          title: "Viver Almonda",
          text: "Descubra o Viver Almonda, um espaco que promove qualidade de vida e bem-estar em Torres Novas, com atividades para todas as idades.\n\nParticipe em experiencias que unem desporto, natureza e protecao do rio Almonda.",
          image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=900,fit=crop/ALp2ZqewowIJrN22/site1-N3Ugrgw1kwzy0HHP.jpg",
          alt: "Viver Almonda natureza e rio Almonda",
          cardTitle: "Viver Almonda",
          cardText: "A nossa missao e proteger o rio, inspirar a comunidade e criar experiencias que ligam as pessoas a natureza.",
          buttonText: "Inscreva-se",
          buttonUrl: "inscricoes.html"
        },
        {
          id: "home-what",
          type: "cards",
          visible: true,
          title: "O que fazemos",
          text: "",
          items: [
            { title: "Cuidamos do Rio", text: "O Almonda e a nossa prioridade: cuidar das margens, manter o ecossistema e promover praticas sustentaveis." },
            { title: "Celebramos a forca da Natureza", text: "Respiramos o poder da paisagem e criamos atividades que valorizam a biodiversidade local." },
            { title: "Protegemos o nosso futuro", text: "Cada acao visa deixar o rio melhor do que o encontramos, para as proximas geracoes." },
            { title: "Somos o Viver Almonda", text: "Uma comunidade que junta desporto, educacao ambiental e vontade de viver o Almonda em liberdade." }
          ]
        },
        {
          id: "home-about",
          type: "list",
          visible: true,
          ...cloneHomeAboutContent()
        },
        {
          id: "home-gallery",
          type: "gallery",
          visible: true,
          title: "Galeria",
          text: "",
          items: [
            { image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=889,fit=crop/ALp2ZqewowIJrN22/site6-6DdDB2SzMUmcxA4l.jpg", title: "Atividades Viver Almonda" },
            { image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=900,fit=crop/ALp2ZqewowIJrN22/site1-N3Ugrgw1kwzy0HHP.jpg", title: "Rio Almonda e natureza" }
          ]
        },
        {
          id: "home-cta",
          type: "cta",
          visible: true,
          title: "Quer ser Socio?",
          text: "Junte-se ao Viver Almonda e faca parte de um projeto que protege o rio e promove atividades de bem-estar junto a natureza.",
          buttonText: "Clique aqui",
          buttonUrl: "inscricoes.html"
        },
        {
          id: "home-contact",
          type: "contact",
          visible: true,
          title: "Contactos",
          text: "",
          ...cloneSharedContact()
        }
      ]
    },
    canoagem: {
      name: "Canoagem",
      blocks: [
        {
          id: "canoagem-hero",
          type: "hero",
          visible: true,
          title: "Canoagem",
          text: "Ja imaginaste deslizar calmamente pelas aguas do Almonda, rodeado pela natureza e pelo som tranquilo do rio?\n\nSozinho, com amigos ou em familia, a descida de canoa e o plano perfeito para desligar da rotina.",
          cardTitle: "O melhor do Almonda",
          cardText: "Viver Almonda une desporto, natureza e respeito ambiental num passeio de canoa seguro e emocionante.",
          buttonText: "Reserve aqui",
          buttonUrl: "inscricoes.html"
        },
        {
          id: "canoagem-gallery",
          type: "cards",
          visible: true,
          title: "Galeria de fotos",
          text: "",
          items: [
            { title: "Ano 2026", text: "Aceda as fotos aqui para ver como foi a nossa ultima temporada de canoagem." },
            { title: "Ano 2025", text: "Descobre as imagens da epoca passada e inspira-te para a tua proxima aventura no rio." }
          ]
        },
        {
          id: "canoagem-contact",
          type: "contact",
          visible: true,
          title: "Contactos",
          text: "",
          ...cloneSharedContact()
        }
      ]
    },
    crossTrail: {
      name: "Cross Trail",
      blocks: [
        {
          id: "cross-hero",
          type: "hero",
          visible: true,
          title: "Cross-Trail",
          text: "Sente a energia da natureza e supera-te a cada passo. Vem viver uma experiencia unica no Cross-Trail junto ao rio Almonda.\n\nConnosco, nao e so uma corrida: e uma celebracao do desporto, da comunidade e da beleza natural.",
          cardTitle: "Desafio e Natureza",
          cardText: "O Cross-Trail oferece percurso para todos os niveis, sempre com foco em respeito ambiental e boa disposicao.",
          buttonText: "Reserve aqui",
          buttonUrl: "inscricoes.html"
        },
        {
          id: "cross-gallery",
          type: "cards",
          visible: true,
          title: "Galeria de fotos",
          text: "",
          items: [
            { title: "Ano 2018", text: "Aceda as fotos aqui e veja a emocao dos corredores na trilha do Almonda." },
            { title: "Ano 2019", text: "Revive os melhores momentos do Cross-Trail e inspira-te para a proxima prova." }
          ]
        },
        {
          id: "cross-contact",
          type: "contact",
          visible: true,
          title: "Contactos",
          text: "",
          ...cloneSharedContact()
        }
      ]
    }
  };

  const BLOCK_TYPES = {
    hero: "Hero",
    text: "Texto",
    image: "Imagem",
    cards: "Cartoes",
    gallery: "Galeria",
    list: "Lista",
    cta: "Botao/CTA",
    contact: "Contactos"
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function paragraphs(value) {
    return String(value || "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `<p>${escapeHtml(line)}</p>`)
      .join("");
  }

  function getDefaultPage(pageId) {
    return clone(DEFAULT_PAGES[pageId] || DEFAULT_PAGES.home);
  }

  function normalizePage(pageId, data) {
    const fallback = getDefaultPage(pageId);
    const page = data || fallback;
    return {
      name: page.name || fallback.name,
      blocks: Array.isArray(page.blocks) ? page.blocks.map(normalizeBlock) : fallback.blocks
    };
  }

  function normalizeBlock(block) {
    const normalized = {
      id: block.id || `block-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type: block.type || "text",
      visible: block.visible !== false,
      title: block.title || "",
      text: block.text || "",
      image: block.image || "",
      alt: block.alt || "",
      cardTitle: block.cardTitle || "",
      cardText: block.cardText || "",
      buttonText: block.buttonText || "",
      buttonUrl: block.buttonUrl || "",
      mapUrl: block.mapUrl || "",
      items: Array.isArray(block.items) ? block.items.map((item) => ({ ...item })) : [],
      highlights: Array.isArray(block.highlights) ? block.highlights.map((item) => ({ ...item })) : []
    };

    if (normalized.id === "home-about") {
      const about = cloneHomeAboutContent();
      normalized.title = normalized.title || about.title;
      normalized.text = normalized.text || about.text;
      normalized.items = normalized.items.length >= 4 ? normalized.items : about.items;
      normalized.highlights = normalized.highlights.length ? normalized.highlights : about.highlights;
    }

    return applySharedContact(normalized);
  }

  function renderButton(block) {
    if (!block.buttonText || !block.buttonUrl) {
      return "";
    }

    return `<a class="cms-button" href="${escapeHtml(block.buttonUrl)}">${escapeHtml(block.buttonText)}</a>`;
  }

  function renderHero(block) {
    const media = block.image
      ? `<div class="cms-hero-media"><img src="${escapeHtml(block.image)}" alt="${escapeHtml(block.alt || block.title)}"></div>`
      : "";
    const card = block.cardTitle || block.cardText
      ? `<div class="cms-hero-card"><h2>${escapeHtml(block.cardTitle)}</h2>${paragraphs(block.cardText)}</div>`
      : "";

    return `
      <header class="cms-hero">
        <div class="cms-hero-inner">
          <div>
            <h1>${escapeHtml(block.title)}</h1>
            ${paragraphs(block.text)}
            ${renderButton(block)}
          </div>
          <div>${media}${card}</div>
        </div>
      </header>
    `;
  }

  function renderCards(block, className = "cms-grid") {
    const cards = block.items.map((item) => `
      <article class="cms-card">
        ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}">` : ""}
        <h3>${escapeHtml(item.title)}</h3>
        ${paragraphs(item.text)}
      </article>
    `).join("");

    return renderSection(block, `<div class="${className}">${cards}</div>`);
  }

  function renderGallery(block) {
    const images = block.items.filter((item) => item.image).map((item) => `
      <figure>
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}">
        ${item.title ? `<figcaption>${escapeHtml(item.title)}</figcaption>` : ""}
      </figure>
    `).join("");

    return renderSection(block, `<div class="cms-gallery">${images}</div>`);
  }

  function renderList(block) {
    const items = block.items.map((item) => `<li>${escapeHtml(item.text || item.title)}</li>`).join("");
    const highlights = (block.highlights || []).map((item) => `
      <article class="cms-highlight-box">
        <h3>${escapeHtml(item.title)}</h3>
        ${paragraphs(item.text)}
      </article>
    `).join("");
    const highlightGrid = highlights ? `<div class="cms-about-highlight">${highlights}</div>` : "";

    return renderSection(block, `<ul class="cms-list">${items}</ul>${highlightGrid}`);
  }

  function renderImage(block) {
    const image = block.image
      ? `<div class="cms-image"><img src="${escapeHtml(block.image)}" alt="${escapeHtml(block.alt || block.title)}"></div>`
      : "";
    return renderSection(block, image);
  }

  function renderContact(block) {
    const cards = block.items.map((item) => `
      <article class="cms-card">
        <h3>${escapeHtml(item.title)}</h3>
        ${paragraphs(item.text)}
      </article>
    `).join("");
    const map = block.mapUrl ? `<iframe class="cms-contact-map" src="${escapeHtml(block.mapUrl)}" loading="lazy" allowfullscreen></iframe>` : "";
    return renderSection(block, `<div class="cms-grid">${cards}</div>${map}${renderButton(block)}`);
  }

  function renderSection(block, inner = "") {
    return `
      <section class="cms-section cms-${escapeHtml(block.type)}">
        ${block.title ? `<h2>${escapeHtml(block.title)}</h2>` : ""}
        ${paragraphs(block.text)}
        ${inner}
        ${block.type === "cta" ? renderButton(block) : ""}
      </section>
    `;
  }

  function renderBlock(block) {
    if (block.visible === false) {
      return "";
    }

    switch (block.type) {
      case "hero":
        return renderHero(block);
      case "cards":
        return renderCards(block);
      case "gallery":
        return renderGallery(block);
      case "list":
        return renderList(block);
      case "image":
        return renderImage(block);
      case "contact":
        return renderContact(block);
      case "cta":
      case "text":
      default:
        return renderSection(block);
    }
  }

  function renderCmsPage(page, container) {
    container.classList.remove("is-loading");
    container.innerHTML = page.blocks.map((block) => renderBlock(applySharedContact(block))).join("");
  }

  function getPageRef(pageId) {
    if (!window.db) {
      return null;
    }

    return window.db.collection("sitePages").doc(pageId);
  }

  function ensureCmsMount(pageId) {
    let mount = document.getElementById("siteContent");

    if (!mount) {
      mount = document.createElement("main");
      mount.id = "siteContent";
      const footer = document.querySelector("footer, .footer");
      document.body.insertBefore(mount, footer || null);
    }

    mount.dataset.cmsPage = pageId;
    mount.className = "cms-page is-loading";

    document.querySelectorAll("body > header, body > section").forEach((element) => {
      element.remove();
    });

    return mount;
  }

  function initPublicCmsPage() {
    const pageId = document.body.dataset.cmsPage;

    if (!pageId) {
      return;
    }

    const mount = ensureCmsMount(pageId);
    renderCmsPage(getDefaultPage(pageId), mount);

    const ref = getPageRef(pageId);
    if (!ref) {
      return;
    }

    ref.onSnapshot((snapshot) => {
      renderCmsPage(normalizePage(pageId, snapshot.exists ? snapshot.data() : null), mount);
    }, (error) => {
      console.error("CMS page error:", error);
    });
  }

  window.CMS_BLOCK_TYPES = BLOCK_TYPES;
  window.CMS_DEFAULT_PAGES = DEFAULT_PAGES;
  window.getCmsSharedContact = cloneSharedContact;
  window.cloneCmsDefaultPage = getDefaultPage;
  window.normalizeCmsPage = normalizePage;
  window.normalizeCmsBlock = normalizeBlock;
  window.renderCmsPage = renderCmsPage;
  window.getCmsPageRef = getPageRef;

  document.addEventListener("DOMContentLoaded", initPublicCmsPage);
})();

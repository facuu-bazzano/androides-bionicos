(() => {
  'use strict';

  const content = window.AB_CONTENT;
  if (!content) {
    document.getElementById('app').innerHTML = '<p>No se pudo cargar el contenido del curso.</p>';
    return;
  }

  const STORAGE_KEY = 'androides-bionicos-progress-v1';
  const THEME_KEY = 'ab-theme';
  const modulesById = new Map(content.modules.map((module) => [module.id, module]));
  const examsById = new Map(content.examQuestions.map((question) => [question.id, question]));
  const allQuizQuestions = content.modules.flatMap((module) => module.quiz || []);

  const defaultState = {
    completed: [],
    bookmarks: [],
    quizAnswers: {},
    notes: {},
    examDrafts: {},
    examSelection: [],
    flashcards: {},
    lastModule: null
  };

  let state = loadState();
  const ui = {
    homeFilter: 'all',
    glossaryFilter: 'all',
    glossaryQuery: '',
    flashFilter: 'all',
    flashIndex: 0,
    flashFlipped: false
  };

  const app = document.getElementById('app');
  const main = document.getElementById('main-content');
  const sidebar = document.getElementById('sidebar');
  const menuButton = document.getElementById('menu-button');
  const searchDialog = document.getElementById('search-dialog');
  const globalSearchInput = document.getElementById('global-search-input');
  const globalSearchResults = document.getElementById('global-search-results');

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        ...defaultState,
        ...stored,
        completed: Array.isArray(stored.completed) ? stored.completed : [],
        bookmarks: Array.isArray(stored.bookmarks) ? stored.bookmarks : [],
        quizAnswers: stored.quizAnswers && typeof stored.quizAnswers === 'object' ? stored.quizAnswers : {},
        notes: stored.notes && typeof stored.notes === 'object' ? stored.notes : {},
        examDrafts: stored.examDrafts && typeof stored.examDrafts === 'object' ? stored.examDrafts : {},
        examSelection: Array.isArray(stored.examSelection) ? stored.examSelection : [],
        flashcards: stored.flashcards && typeof stored.flashcards === 'object' ? stored.flashcards : {}
      };
    } catch (error) {
      console.warn('No se pudo recuperar el progreso guardado.', error);
      return { ...defaultState };
    }
  }

  function persistState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderShellProgress();
  }

  function escapeHTML(value = '') {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function normalize(value = '') {
    return String(value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function routeInfo() {
    const raw = location.hash.replace(/^#\/?/, '');
    const parts = raw.split('/').filter(Boolean);
    if (!parts.length || parts[0] === 'inicio') return { page: 'inicio' };
    if (parts[0] === 'modulo' && parts[1]) return { page: 'modulo', id: parts[1] };
    if (['examen', 'glosario', 'tarjetas', 'acerca'].includes(parts[0])) return { page: parts[0] };
    return { page: 'inicio' };
  }

  function navigate(hash) {
    if (location.hash === hash) {
      renderRoute();
    } else {
      location.hash = hash;
    }
  }

  function progressStats() {
    const completed = content.modules.filter((module) => state.completed.includes(module.id)).length;
    const answered = Object.keys(state.quizAnswers).filter((id) => allQuizQuestions.some((question) => question.id === id)).length;
    const correct = allQuizQuestions.filter((question) => state.quizAnswers[question.id] === question.answer).length;
    const known = content.glossary.filter((item) => state.flashcards[item.term] === 'known').length;
    const moduleShare = completed / content.modules.length;
    const quizShare = correct / allQuizQuestions.length;
    const flashShare = known / content.glossary.length;
    const readiness = Math.round(moduleShare * 55 + quizShare * 30 + flashShare * 15);
    return {
      completed,
      totalModules: content.modules.length,
      answered,
      totalQuestions: allQuizQuestions.length,
      correct,
      known,
      totalCards: content.glossary.length,
      readiness,
      coursePercent: Math.round(moduleShare * 100)
    };
  }

  function icon(name, size = 20) {
    const paths = {
      home: '<path d="M3 11.5 12 4l9 7.5V21h-6v-6H9v6H3z"/>',
      target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
      axis: '<path d="M4 20V5m0 15h15M4 20l6-6 4 2 6-9"/><circle cx="10" cy="14" r="1"/><circle cx="14" cy="16" r="1"/><circle cx="20" cy="7" r="1"/>',
      hand: '<path d="M8 12V5a2 2 0 0 1 4 0v6-8a2 2 0 0 1 4 0v8-6a2 2 0 0 1 4 0v8l1-1a2 2 0 0 1 3 2l-4 6a6 6 0 0 1-5 3h-3a7 7 0 0 1-7-7v-4a2 2 0 0 1 3-2l2 2" transform="scale(.8) translate(0 1)"/>',
      pulse: '<path d="M2 13h5l2-7 4 13 3-9 2 3h4"/>',
      network: '<circle cx="5" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="12" r="2"/><path d="m7 11 3-4m-3 6 3 4m4-10 3 4m-3 6 3-4"/>',
      code: '<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12"/>',
      cube: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9"/>',
      optimize: '<path d="M4 7h10m4 0h2M4 17h2m4 0h10M14 4v6M6 14v6"/><circle cx="14" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
      printer: '<path d="M7 8V3h10v5M6 17H4V9h16v8h-2M7 14h10v7H7z"/><circle cx="17" cy="11" r="1"/>',
      exam: '<path d="M6 3h12v18H6zM9 7h6M9 11h6M9 15h3"/><path d="m14 16 1.5 1.5L19 14"/>',
      glossary: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM8 4v13a3 3 0 0 0 3 3"/>',
      cards: '<rect x="4" y="6" width="14" height="14" rx="2"/><path d="M8 3h12v14"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
      chevron: '<path d="m8 10 4 4 4-4"/>',
      reset: '<path d="M4 12a8 8 0 1 0 2-5.3L4 9M4 4v5h5"/>',
      note: '<path d="M5 3h14v18H5zM8 8h8M8 12h8M8 16h5"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      spark: '<path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5zM5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8z"/>',
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      external: '<path d="M14 4h6v6M20 4l-9 9M18 13v7H4V6h7"/>'
    };
    return `<svg class="icon-svg" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.info}</svg>`;
  }

  function confidenceBadge(level) {
    const found = content.meta.confidenceLegend.find((item) => item.id === level) || content.meta.confidenceLegend[2];
    return `<span class="confidence-badge confidence-${escapeHTML(found.id)}" title="${escapeHTML(found.description)}">${escapeHTML(found.label)}</span>`;
  }

  function examBadge(questionId, compact = false) {
    const question = examsById.get(questionId);
    if (!question) return '';
    return `<span class="exam-badge${compact ? ' is-compact' : ''}" title="Relacionado con la pregunta ${question.number}">${compact ? `P${question.number}` : `Pregunta ${question.number}`}</span>`;
  }

  function renderNavigation() {
    const route = routeInfo();
    const primary = document.getElementById('primary-navigation');
    const moduleLinks = content.modules
      .map((module) => {
        const complete = state.completed.includes(module.id);
        const active = route.page === 'modulo' && route.id === module.id;
        return `
          <a class="nav-module${active ? ' is-active' : ''}" href="#/modulo/${module.id}" ${active ? 'aria-current="page"' : ''}>
            <span class="nav-module-index">${complete ? icon('check', 15) : String(module.order).padStart(2, '0')}</span>
            <span>${escapeHTML(module.shortTitle)}</span>
          </a>`;
      })
      .join('');

    primary.innerHTML = `
      <div class="nav-section">
        <p class="nav-label">Estudiar</p>
        <a class="nav-link${route.page === 'inicio' ? ' is-active' : ''}" href="#/inicio" ${route.page === 'inicio' ? 'aria-current="page"' : ''}>
          ${icon('home')}<span>Inicio</span>
        </a>
        <a class="nav-link${route.page === 'examen' ? ' is-active' : ''}" href="#/examen" ${route.page === 'examen' ? 'aria-current="page"' : ''}>
          ${icon('exam')}<span>Preparar examen</span>
        </a>
        <a class="nav-link${route.page === 'tarjetas' ? ' is-active' : ''}" href="#/tarjetas" ${route.page === 'tarjetas' ? 'aria-current="page"' : ''}>
          ${icon('cards')}<span>Tarjetas de estudio</span>
        </a>
        <a class="nav-link${route.page === 'glosario' ? ' is-active' : ''}" href="#/glosario" ${route.page === 'glosario' ? 'aria-current="page"' : ''}>
          ${icon('glossary')}<span>Glosario</span>
        </a>
      </div>
      <div class="nav-section module-nav-section">
        <div class="nav-label-row">
          <p class="nav-label">Los 9 mÃ³dulos</p>
          <span>${progressStats().completed}/9</span>
        </div>
        ${moduleLinks}
      </div>
      <div class="nav-section">
        <a class="nav-link${route.page === 'acerca' ? ' is-active' : ''}" href="#/acerca" ${route.page === 'acerca' ? 'aria-current="page"' : ''}>
          ${icon('info')}<span>Alcance del material</span>
        </a>
      </div>`;

    const mobileNavigation = document.getElementById('mobile-navigation');
    mobileNavigation.innerHTML = `
      <a href="#/inicio" class="mobile-nav-link${route.page === 'inicio' ? ' is-active' : ''}">${icon('home', 19)}<span>Inicio</span></a>
      <a href="#/examen" class="mobile-nav-link${route.page === 'examen' ? ' is-active' : ''}">${icon('exam', 19)}<span>Examen</span></a>
      <a href="#/tarjetas" class="mobile-nav-link${route.page === 'tarjetas' ? ' is-active' : ''}">${icon('cards', 19)}<span>Repaso</span></a>
      <button type="button" class="mobile-nav-link" data-mobile-menu>${icon('menu', 19)}<span>MÃ³dulos</span></button>`;
  }

  function renderShellProgress() {
    const stats = progressStats();
    const topProgress = document.getElementById('top-progress');
    topProgress.innerHTML = `
      <span class="mini-progress-track" aria-hidden="true"><span style="width:${stats.coursePercent}%"></span></span>
      <span>${stats.completed}/9</span>`;

    document.getElementById('sidebar-footer').innerHTML = `
      <div class="sidebar-progress-card">
        <div class="sidebar-progress-copy">
          <span>Avance del recorrido</span>
          <strong>${stats.coursePercent}%</strong>
        </div>
        <div class="progress-track" aria-hidden="true"><span style="width:${stats.coursePercent}%"></span></div>
        <p>${stats.completed === 0 ? 'EmpezÃ¡ por el mÃ³dulo que mÃ¡s necesites.' : `${stats.completed} mÃ³dulo${stats.completed === 1 ? '' : 's'} completado${stats.completed === 1 ? '' : 's'}.`}</p>
      </div>`;
    renderNavigation();
  }

  function renderRoute() {
    closeSidebar();
    const route = routeInfo();
    if (route.page === 'modulo') {
      renderModule(route.id);
    } else if (route.page === 'examen') {
      renderExam();
    } else if (route.page === 'glosario') {
      renderGlossary();
    } else if (route.page === 'tarjetas') {
      renderFlashcards();
    } else if (route.page === 'acerca') {
      renderAbout();
    } else {
      renderHome();
    }
    renderNavigation();
    window.scrollTo({ top: 0, behavior: 'instant' });
    main.focus({ preventScroll: true });
  }

  function renderHome() {
    const stats = progressStats();
    const nextModule = getNextModule();
    app.innerHTML = `
      <div class="page home-page">
        <section class="hero home-hero">
          <div class="hero-content">
            <div class="hero-kicker"><span class="live-dot"></span> Ruta interactiva de estudio</div>
            <h1>EntendÃ© el recorrido completo de un <span>androide biÃ³nico</span></h1>
            <p>${escapeHTML(content.meta.description)}</p>
            <div class="hero-actions">
              <a class="button button-primary" href="#/modulo/${nextModule.id}">
                ${state.completed.length ? 'Continuar estudiando' : 'Empezar la ruta'} ${icon('arrow', 18)}
              </a>
              <a class="button button-secondary" href="#/examen">Ver mapa del examen</a>
            </div>
            <div class="hero-meta">
              <span>${icon('clock', 17)} 9 mÃ³dulos Â· ~3 horas</span>
              <span>${icon('note', 17)} Notas y progreso locales</span>
            </div>
          </div>
          <div class="hero-visual" aria-hidden="true">${renderHeroIllustration()}</div>
        </section>

        <section class="scope-banner">
          ${icon('info', 20)}
          <p><strong>Material reconstruido:</strong> ${escapeHTML(content.meta.disclaimer)}</p>
          <a href="#/acerca">Ver alcance</a>
        </section>

        <section class="dashboard-grid section-block">
          <article class="readiness-card">
            <div class="readiness-ring" style="--value:${stats.readiness}" aria-label="PreparaciÃ³n estimada ${stats.readiness}%">
              <div><strong>${stats.readiness}%</strong><span>preparaciÃ³n</span></div>
            </div>
            <div class="readiness-copy">
              <p class="eyebrow">Tu progreso</p>
              <h2>PreparaciÃ³n estimada</h2>
              <p>Combina mÃ³dulos completados, respuestas correctas y tarjetas dominadas. Es una guÃ­a personal, no una predicciÃ³n del resultado.</p>
              <a href="#/examen" class="text-link">Revisar las cuatro consignas ${icon('arrow', 16)}</a>
            </div>
          </article>
          <article class="metric-card">
            <span class="metric-icon">${icon('check', 21)}</span>
            <strong>${stats.completed}<small>/9</small></strong>
            <span>MÃ³dulos completados</span>
          </article>
          <article class="metric-card">
            <span class="metric-icon">${icon('exam', 21)}</span>
            <strong>${stats.correct}<small>/${stats.totalQuestions}</small></strong>
            <span>Chequeos correctos</span>
          </article>
          <article class="metric-card">
            <span class="metric-icon">${icon('cards', 21)}</span>
            <strong>${stats.known}<small>/${stats.totalCards}</small></strong>
            <span>Conceptos dominados</span>
          </article>
        </section>

        <section class="section-block" id="modules-section">
          <div class="section-heading split-heading">
           ×½ÒÚ$z{-®éÜj×GF–6S¢ ¢ÆF—b6Æ73Ò&ÆV&æ–ær×f—7VÂÆGF–6R×f—7VÂ"&öÆSÒ&–Ör"&–ÖÆ&VÃÒ$6ö×&6œ;6âVçG&RVæ–W¦Ö6—¦’VæW7G'V7GW&ÆGF–6R#à¢ÆF—cãÇ7â6Æ73Ò'6öÆ–B×6†R#ãÂ÷7ããÇ7G&öæsäÖ6—¦Â÷7G&öæsãÇ6ÖÆÃäÜ:2ÖFW&–ÃÂ÷6ÖÆÃãÂöF—cà¢Ç7â6Æ73Ò'fW'7W2#î(i#Â÷7ãà¢ÆF—cãÇ7â6Æ73Ò&ÆGF–6R×6†R#âG´'&’æg&öÒ‡²ÆVæwFƒ¢#ÒÂ‚’ÓâsÆ“ãÂö“âr’æ¦ö–â‚rr—ÓÂ÷7ããÇ7G&öæsäÆGF–6SÂ÷7G&öæsãÇ6ÖÆÃäÖFW&–ÂF—7G&–'V–FóÂ÷6ÖÆÃãÂöF—cà¢ÂöF—cæÀ¢FF—F—fS¢ ¢ÆF—b6Æ73Ò&ÆV&æ–ær×f—7VÂFF—F—fR×f—7VÂ"&öÆSÒ&–Ör"&–ÖÆ&VÃÒ%&ö6W6òFR–×&W6œ;6â4B÷"62#à¢ÆF—b6Æ73Ò'&–çFW"Ö†VB#ãÇ7ããÂ÷7ããÂöF—cà¢ÆF—b6Æ73Ò&W‡G'W6–öâÖÆ–æR#ãÂöF—cà¢ÆF—b6Æ73Ò'&–çFVB×'B#âG´'&’æg&öÒ‡²ÆVæwFƒ¢‚ÒÂ…òÂ–æFW‚’ÓâÇ7â7G–ÆSÒ"ÒÖ“¢G¶–æFW‡Ò#ãÂ÷7ãæ’æ¦ö–â‚rr—ÓÂöF—cà¢ÆF—b6Æ73Ò'&–çBÖ&VB#ãÂöF—cà¢ÆF—b6Æ73Ò&FF—F—fRÖÆ&VÇ2#ãÇ7ãä&÷V–ÆÆÂ÷7ããÇ7ãäÖFW&–ÂgVæF–FóÂ÷7ããÇ7ãä63Â÷7ããÂöF—cà¢ÂöF—cæ ¢Ó°¢&WGW&âf—7VÇ5·G—UÒÇÂrs°¢Ğ ¢gVæ7F–öâv÷&D6÷VçB‡FW‡B’°¢6öç7BG&–ÖÖVBÒ7G&–ær‡FW‡BÇÂrr’çG&–Ò‚“°¢&WGW&âG&–ÖÖVBòG&–ÖÖVBç7Æ—B‚õÇ2²ò’æÆVæwF‚¢°¢Ğ ¢gVæ7F–öâFövvÆT&öö¶Ö&²†ÖöGVÆT–B’°¢6öç7B&öö¶Ö&¶VBÒ7FFRæ&öö¶Ö&·2æ–æ6ÇVFW2†ÖöGVÆT–B“°¢7FFRæ&öö¶Ö&·2Ò&öö¶Ö&¶VBò7FFRæ&öö¶Ö&·2æf–ÇFW"‚†–B’Óâ–BÓÒÖöGVÆT–B’¢²ââç7FFRæ&öö¶Ö&·2ÂÖöGVÆT–EÓ°¢W'6—7E7FFR‚“°¢6†÷uFö7B†&öö¶Ö&¶VBòuV—FFòFRwV&FF÷2r¢tÜ;6GVÆòwV&FFòr“°¢&W&VæFW%&W6W'fU67&öÆÂ‚“°¢Ğ ¢gVæ7F–öâFövvÆT6ö×ÆWFR†ÖöGVÆT–B’°¢6öç7B6ö×ÆWFRÒ7FFRæ6ö×ÆWFVBæ–æ6ÇVFW2†ÖöGVÆT–B“°¢7FFRæ6ö×ÆWFVBÒ6ö×ÆWFRò7FFRæ6ö×ÆWFVBæf–ÇFW"‚†–B’Óâ–BÓÒÖöGVÆT–B’¢²ââç7FFRæ6ö×ÆWFVBÂÖöGVÆT–EÓ°¢W'6—7E7FFR‚“°¢6†÷uFö7B†6ö×ÆWFRòtÜ;6GVÆòÖ&6Fò6öÖòVæF–VçFRr¢tÜ;6GVÆò6ö×ÆWFFòr“°¢&W&VæFW%&W6W'fU67&öÆÂ‚“°¢Ğ ¢gVæ7F–öâ&W&VæFW%&W6W'fU67&öÆÂ‚’°¢6öç7B’Òv–æF÷rç67&öÆÅ“°¢6öç7B&÷WFRÒ&÷WFT–æfò‚“°¢–b‡&÷WFRçvRÓÓÒvÖöGVÆòr’&VæFW$ÖöGVÆR‡&÷WFRæ–B“°¢VÇ6R–b‡&÷WFRçvRÓÓÒvW†ÖVâr’&VæFW$W†Ò‚“°¢VÇ6R–b‡&÷WFRçvRÓÓÒv–æ–6–òr’&VæFW$†öÖR‚“°¢v–æF÷rç67&öÆÅFòƒÂ’“°¢Ğ ¢gVæ7F–öâ÷Vå6–FV&"‚’°¢Fö7VÖVçBæ&öG’æ6Æ74Æ—7BæFB‚w6–FV&"Ö÷Vâr“°¢ÖVçT'WGFöâç6WDGG&–'WFR‚v&–ÖW‡æFVBrÂwG'VRr“°¢Ğ ¢gVæ7F–öâ6Æ÷6U6–FV&"‚’°¢Fö7VÖVçBæ&öG’æ6Æ74Æ—7Bç&VÖ÷fR‚w6–FV&"Ö÷Vâr“°¢ÖVçT'WGFöâç6WDGG&–'WFR‚v&–ÖW‡æFVBrÂvfÇ6Rr“°¢Ğ ¢gVæ7F–öâ÷Vå6V&6‚‚’°¢–b‚6V&6„F–Æöræ÷Vâ’6V&6„F–Æörç6†÷tÖöFÂ‚“°¢vÆö&Å6V&6„–çWBçfÇVRÒrs°¢&VæFW%6V&6…&W7VÇG2‚rr“°¢&WVW7Dæ–ÖF–öäg&ÖR‚‚’ÓâvÆö&Å6V&6„–çWBæfö7W2‚’“°¢Ğ ¢gVæ7F–öâ6Æ÷6U6V&6‚‚’°¢–b‡6V&6„F–Æöræ÷Vâ’6V&6„F–Æöræ6Æ÷6R‚“°¢Ğ ¢gVæ7F–öâ6V&6„—FV×2‡VW'’’°¢6öç7BFW&ÒÒæ÷&ÖÆ—¦R‡VW'’“°¢–b‡FW&ÒæÆVæwF‚Â"’&WGW&âµÓ°¢6öç7B&W7VÇG2ÒµÓ° ¢6öçFVçBæÖöGVÆW2æf÷$V6‚‚†ÖöGVÆR’Óâ°¢6öç7B6V7F–öåFW‡BÒÖöGVÆRç6V7F–öç2æfÆDÖ‚‡6V7F–öâ’Óâ·6V7F–öâçF—FÆRÂâââ‡6V7F–öâç&w&‡2ÇÂµÒ’Ââââ‡6V7F–öâæ'VÆÆWG2ÇÂµÒ•Ò’æ¦ö–â‚rr“°¢6öç7B6öæ6WEFW‡BÒÖöGVÆRæ6öæ6WG2æfÆDÖ‚†6öæ6WB’Óâ¶6öæ6WBçFW&ÒÂ6öæ6WBæFVf–æ—F–öâÂ6öæ6WBæW†×ÆUÒ’æ¦ö–â‚rr“°¢6öç7B6÷'W2Òæ÷&ÖÆ—¦R†G¶ÖöGVÆRçF—FÆWÒG¶ÖöGVÆRç7VÖÖ'—ÒG¶ÖöGVÆRæ¶–6¶W'ÒG·6V7F–öåFW‡GÒG¶6öæ6WEFW‡GÖ“°¢–b†6÷'W2æ–æ6ÇVFW2‡FW&Ò’’°¢6öç7B66÷&RÒæ÷&ÖÆ—¦R†ÖöGVÆRçF—FÆR’æ–æ6ÇVFW2‡FW&Ò’òB¢æ÷&ÖÆ—¦R†6öæ6WEFW‡B’æ–æ6ÇVFW2‡FW&Ò’ò2¢°¢&W7VÇG2çW6‚‡²G—S¢tÜ;6GVÆòrÂF—FÆS¢ÖöGVÆRçF—FÆRÂ6æ—WC¢ÖöGVÆRç7VÖÖ'’Â‡&Vc¢2öÖöGVÆòòG¶ÖöGVÆRæ–GÖÂ–6öã¢ÖöGVÆRæ–6öâÂ66÷&RÒ“°¢Ğ¢Ò“° ¢6öçFVçBævÆ÷76'’æf÷$V6‚‚†—FVÒ’Óâ°¢6öç7B6÷'W2Òæ÷&ÖÆ—¦R†G¶—FVÒçFW&×ÒG¶—FVÒæFVf–æ—F–öçÖ“°¢–b†6÷'W2æ–æ6ÇVFW2‡FW&Ò’’°¢6öç7B66÷&RÒæ÷&ÖÆ—¦R†—FVÒçFW&Ò’ç7F'G5v—F‚‡FW&Ò’òR¢æ÷&ÖÆ—¦R†—FVÒçFW&Ò’æ–æ6ÇVFW2‡FW&Ò’òB¢#°¢&W7VÇG2çW6‚‡²G—S¢t6öæ6WFòrÂF—FÆS¢—FVÒçFW&ÒÂ6æ—WC¢—FVÒæFVf–æ—F–öâÂ‡&Vc¢2öÖöGVÆòòG¶—FVÒæÖöGVÆWÖÂ–6öã¢vvÆ÷76'’rÂ66÷&RÒ“°¢Ğ¢Ò“° ¢6öçFVçBæW†ÕVW7F–öç2æf÷$V6‚‚‡VW7F–öâ’Óâ°¢6öç7B6÷'W2Òæ÷&ÖÆ—¦R†G·VW7F–öâçF—FÆWÒG·VW7F–öâç&ö×GÒG·VW7F–öâæ¶W—ÒG·VW7F–öâç&V6öÖÖVæFVEF÷–72æ¦ö–â‚rr—Ö“°¢–b†6÷'W2æ–æ6ÇVFW2‡FW&Ò’’°¢&W7VÇG2çW6‚‡²G—S¢&VwVçFG·VW7F–öâæçVÖ&W'ÖÂF—FÆS¢VW7F–öâçF—FÆRÂ6æ—WC¢VW7F–öâæ¶W’Â‡&Vc¢r2öW†ÖVârÂ–6öã¢vW†ÒrÂ66÷&S¢"Ò“°¢Ğ¢Ò“° ¢6öç7B6VVâÒæWr6WB‚“°¢&WGW&â&W7VÇG0¢ç6÷'B‚†Â"’Óâ"ç66÷&RÒç66÷&RÇÂçF—FÆRæÆö6ÆT6ö×&R†"çF—FÆRÂvW2r’¢æf–ÇFW"‚†—FVÒ’Óâ°¢6öç7B¶W’ÒG¶—FVÒçG—WÒÒG¶—FVÒçF—FÆWÖ°¢–b‡6VVâæ†2†¶W’’’&WGW&âfÇ6S°¢6VVâæFB†¶W’“°¢&WGW&âG'VS°¢Ò¢ç6Æ–6RƒÂB“°¢Ğ ¢gVæ7F–öâ&VæFW%6V&6…&W7VÇG2‡VW'’’°¢6öç7B&W7VÇG2Ò6V&6„—FV×2‡VW'’“°¢–b†æ÷&ÖÆ—¦R‡VW'’’æÆVæwF‚Â"’°¢vÆö&Å6V&6…&W7VÇG2æ–ææW$…DÔÂÒ ¢ÆF—b6Æ73Ò'6V&6‚×7VvvW7F–öç2#à¢Çå&ö,:6öãÂ÷à¢ÆF—câGµ²tTÔrrÂtFVæf—BÔ†'FVæ&W&rrÂv7VG&ò&'&2rÂtdDÒrÂv6–6ÆòFRÖ&6†uÒæÖ‚‡FW&Ò’ÓâÆ'WGFöâG—SÒ&'WGFöâ"FF×6V&6‚×7VvvW7F–öãÒ"G·FW&×Ò#âG·FW&×ÓÂö'WGFöãæ’æ¦ö–â‚rr—ÓÂöF—cà¢ÂöF—cæ°¢&WGW&ã°¢Ğ¢vÆö&Å6V&6…&W7VÇG2æ–ææW$…DÔÂÒ&W7VÇG2æÆVæwF€¢ò&W7VÇG2æÖ‚‡&W7VÇB’Óâ ¢Æ‡&VcÒ"G·&W7VÇBæ‡&VgÒ"6Æ73Ò'6V&6‚×&W7VÇBÖ—FVÒ"FFÖ6Æ÷6R×6V&6ƒà¢Ç7â6Æ73Ò'6V&6‚×&W7VÇBÖ–6öâ#âG¶–6öâ‡&W7VÇBæ–6öâÂ#—ÓÂ÷7ãà¢Ç7ããÇ6ÖÆÃâG¶W66T…DÔÂ‡&W7VÇBçG—R—ÓÂ÷6ÖÆÃãÇ7G&öæsâG¶W66T…DÔÂ‡&W7VÇBçF—FÆR—ÓÂ÷7G&öæsãÇâG¶W66T…DÔÂ‡&W7VÇBç6æ—WB—ÓÂ÷ãÂ÷7ãà¢G¶–6öâ‚v'&÷rrÂr—Ğ¢Âöæ’æ¦ö–â‚rr¢¢ÆF—b6Æ73Ò&V×G’×7FFR#âG¶–6öâ‚w6V&6‚rÂ#r—ÓÆƒ3å6–â&W7VÇFF÷3Âöƒ3ãÇå&ö,:6öâVâL:—&Ö–æòÜ:2vVæW&ÂãÂ÷ãÂöF—cæ°¢Ğ ¢gVæ7F–öâFövvÆUF†VÖR‚’°¢6öç7B7W'&VçBÒFö7VÖVçBæFö7VÖVçDVÆVÖVçBæFF6WBçF†VÖS°¢6öç7BæW‡BÒ7W'&VçBÓÓÒvF&²ròvÆ–v‡Br¢vF&²s°¢Fö7VÖVçBæFö7VÖVçDVÆVÖVçBæFF6WBçF†VÖRÒæW‡C°¢Æö6Å7F÷&vRç6WD—FVÒ…D„TÔUô´U’ÂæW‡B“°¢Fö7VÖVçBævWDVÆVÖVçD'”–B‚wF†VÖRÖ–6öâr’çFW‡D6öçFVçBÒæW‡BÓÓÒvF&²rò~)ˆr¢~)ys°¢Ğ ¢gVæ7F–öâ6†÷uFö7B†ÖW76vR’°¢6öç7B&Vv–öâÒFö7VÖVçBævWDVÆVÖVçD'”–B‚wFö7B×&Vv–öâr“°¢6öç7BFö7BÒFö7VÖVçBæ7&VFTVÆVÖVçB‚vF—br“°¢Fö7Bæ6Æ74æÖRÒwFö7Bs°¢Fö7Bæ–ææW$…DÔÂÒG¶–6öâ‚v6†V6²rÂr—ÓÇ7ãâG¶W66T…DÔÂ†ÖW76vR—ÓÂ÷7ãæ°¢&Vv–öâæVæD6†–ÆB‡Fö7B“°¢&WVW7Dæ–ÖF–öäg&ÖR‚‚’ÓâFö7Bæ6Æ74Æ—7BæFB‚v—2×f—6–&ÆRr’“°¢6WEF–ÖV÷WB‚‚’Óâ°¢Fö7Bæ6Æ74Æ—7Bç&VÖ÷fR‚v—2×f—6–&ÆRr“°¢6WEF–ÖV÷WB‚‚’ÓâFö7Bç&VÖ÷fR‚’Â##“°¢ÒÂ##“°¢Ğ ¢gVæ7F–öâ&W6WE&öw&W72‚’°¢6öç7B6öæf—&ÖVBÒv–æF÷ræ6öæf—&Ò‚|+õVW,:—2&÷'&"&öw&W6òÂæ÷F2Â&÷'&F÷&W2’F&¦WF2FRW7FRF—7÷6—F—fóòW7F66œ;6âæò6RVVFRFW6†6W"âr“°¢–b‚6öæf—&ÖVB’&WGW&ã°¢7FFRÒ²ââæFVfVÇE7FFRÓ°¢Æö6Å7F÷&vRç&VÖ÷fT—FVÒ…5Dõ$tUô´U’“°¢V’æfÆ6„–æFW‚Ò°¢V’æfÆ6„fÆ—VBÒfÇ6S°¢&VæFW%6†VÆÅ&öw&W72‚“°¢&VæFW$&÷WB‚“°¢6†÷uFö7B‚u&öw&W6ò&V–æ–6–Fòr“°¢Ğ ¢Fö7VÖVçBæFDWfVçDÆ—7FVæW"‚v6Æ–6²rÂ†WfVçB’Óâ°¢6öç7BF&vWBÒWfVçBçF&vWBæ6Æ÷6W7B‚v'WGFöâÂr“°¢–b‚F&vWB’&WGW&ã° ¢–b‡F&vWBæ–BÓÓÒvÖVçRÖ'WGFöârÇÂF&vWBæÖF6†W2‚u¶FFÖÖö&–ÆRÖÖVçUÒr’’°¢WfVçBç&WfVçDFVfVÇB‚“°¢÷Vå6–FV&"‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæ–BÓÓÒw6–FV&"Ö&6¶G&÷r’°¢6Æ÷6U6–FV&"‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæ–BÓÓÒw6V&6‚Ö'WGFöâr’°¢÷Vå6V&6‚‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæ–BÓÓÒw6V&6‚Ö6Æ÷6Rr’°¢6Æ÷6U6V&6‚‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæ–BÓÓÒwF†VÖRÖ'WGFöâr’°¢FövvÆUF†VÖR‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖ6Æ÷6R×6V&6…Òr’’°¢6Æ÷6U6V&6‚‚“°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FF×6V&6‚×7VvvW7F–öåÒr’’°¢6öç7BFW&ÒÒF&vWBæFF6WBç6V&6…7VvvW7F–öã°¢vÆö&Å6V&6„–çWBçfÇVRÒFW&Ó°¢&VæFW%6V&6…&W7VÇG2‡FW&Ò“°¢vÆö&Å6V&6„–çWBæfö7W2‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖ†öÖRÖf–ÇFW%Òr’’°¢V’æ†öÖTf–ÇFW"ÒF&vWBæFF6WBæ†öÖTf–ÇFW#°¢Fö7VÖVçBçVW'•6VÆV7F÷$ÆÂ‚u¶FFÖ†öÖRÖf–ÇFW%Òr’æf÷$V6‚‚†'WGFöâ’Óâ°¢6öç7B7F—fRÒ'WGFöâæFF6WBæ†öÖTf–ÇFW"ÓÓÒV’æ†öÖTf–ÇFW#°¢'WGFöâæ6Æ74Æ—7BçFövvÆR‚v—2Ö7F—fRrÂ7F—fR“°¢'WGFöâç6WDGG&–'WFR‚v&–×&W76VBrÂ7F—fR“°¢Ò“°¢6öç7Bw&–BÒFö7VÖVçBævWDVÆVÖVçD'”–B‚vÖöGVÆRÖw&–Br“°¢–b†w&–B’w&–Bæ–ææW$…DÔÂÒ&VæFW$ÖöGVÆTw&–B‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖ&öö¶Ö&µÒr’’°¢WfVçBç&WfVçDFVfVÇB‚“°¢FövvÆT&öö¶Ö&²‡F&vWBæFF6WBæ&öö¶Ö&²“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖ6ö×ÆWFUÒr’’°¢FövvÆT6ö×ÆWFR‡F&vWBæFF6WBæ6ö×ÆWFR“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FF×7F'B×F…Òr’’°¢æf–vFR†2öÖöGVÆòòG·F&vWBæFF6WBç7F'EF‡Ö“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FF×67&öÆÂ×FõÒr’’°¢6öç7BVÆVÖVçBÒFö7VÖVçBævWDVÆVÖVçD'”–B‡F&vWBæFF6WBç67&öÆÅFò“°¢–b†VÆVÖVçB’VÆVÖVçBç67&öÆÄ–çFõf–Wr‡²&V†f–÷#¢w6Öö÷F‚rÂ&Æö6³¢w7F'BrÒ“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FF×V—¢Ö–EÒr’’°¢6öç7B–BÒF&vWBæFF6WBçV—¤–C°¢6öç7B÷F–öâÒçVÖ&W"‡F&vWBæFF6WBæ÷F–öâ“°¢7FFRçV—¤ç7vW'5¶–EÒÒ÷F–öã°¢W'6—7E7FFR‚“°¢&W&VæFW%&W6W'fU67&öÆÂ‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖW†Ò×6VÆV7EÒr’’°¢6öç7BÖöGVÆT–BÒF&vWBæFF6WBæW†Õ6VÆV7C°¢6öç7B6VÆV7FVBÒ7FFRæW†Õ6VÆV7F–öâæ–æ6ÇVFW2†ÖöGVÆT–B“°¢–b‡6VÆV7FVB’°¢7FFRæW†Õ6VÆV7F–öâÒ7FFRæW†Õ6VÆV7F–öâæf–ÇFW"‚†–B’Óâ–BÓÒÖöGVÆT–B“°¢ÒVÇ6R–b‡7FFRæW†Õ6VÆV7F–öâæÆVæwF‚ÂR’°¢7FFRæW†Õ6VÆV7F–öâÒ²ââç7FFRæW†Õ6VÆV7F–öâÂÖöGVÆT–EÓ°¢ÒVÇ6R°¢6†÷uFö7B‚u–VÆVv—7FR6–æ6òWF2r“°¢&WGW&ã°¢Ğ¢W'6—7E7FFR‚“°¢&W&VæFW%&W6W'fU67&öÆÂ‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FF×7VvvW7BÖf—fUÒr’’°¢7FFRæW†Õ6VÆV7F–öâÒ²w6VÆV66–öârÂvÖöFVÆ÷2ÖÖFVÖF–6÷2rÂvF—6Væò×&ö&÷F–6òrÂvÖ÷F÷&—¦6–öârÂw6–×VÆ6–öâuÓ°¢W'6—7E7FFR‚“°¢&W&VæFW%&W6W'fU67&öÆÂ‚“°¢6†÷uFö7B‚u6VÆV66œ;6â&V6öÖVæFFÆ–6Fr“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖvÆ÷76'’Öf–ÇFW%Òr’’°¢V’ævÆ÷76'”f–ÇFW"ÒF&vWBæFF6WBævÆ÷76'”f–ÇFW#°¢Fö7VÖVçBçVW'•6VÆV7F÷$ÆÂ‚u¶FFÖvÆ÷76'’Öf–ÇFW%Òr’æf÷$V6‚‚†'WGFöâ’Óâ°¢6öç7B7F—fRÒ'WGFöâæFF6WBævÆ÷76'”f–ÇFW"ÓÓÒV’ævÆ÷76'”f–ÇFW#°¢'WGFöâæ6Æ74Æ—7BçFövvÆR‚v—2Ö7F—fRrÂ7F—fR“°¢'WGFöâç6WDGG&–'WFR‚v&–×&W76VBrÂ7F—fR“°¢Ò“°¢WFFTvÆ÷76'•&W7VÇG2‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖfÆ6‚Öf–ÇFW%Òr’’°¢V’æfÆ6„f–ÇFW"ÒF&vWBæFF6WBæfÆ6„f–ÇFW#°¢V’æfÆ6„–æFW‚Ò°¢V’æfÆ6„fÆ—VBÒfÇ6S°¢Fö7VÖVçBçVW'•6VÆV7F÷$ÆÂ‚u¶FFÖfÆ6‚Öf–ÇFW%Òr’æf÷$V6‚‚†'WGFöâ’Óâ°¢6öç7B7F—fRÒ'WGFöâæFF6WBæfÆ6„f–ÇFW"ÓÓÒV’æfÆ6„f–ÇFW#°¢'WGFöâæ6Æ74Æ—7BçFövvÆR‚v—2Ö7F—fRrÂ7F—fR“°¢'WGFöâç6WDGG&–'WFR‚v&–×&W76VBrÂ7F—fR“°¢Ò“°¢&VæFW$fÆ6†6&EæVÂ‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖfÆ—Ö6&EÒr’’°¢V’æfÆ6„fÆ—VBÒV’æfÆ6„fÆ—VC°¢&VæFW$fÆ6†6&EæVÂ‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖ6&BÖæW‡EÒr’’°¢6öç7B6&G2Òf–ÇFW&VDfÆ6†6&G2‚“°¢V’æfÆ6„–æFW‚Ò‡V’æfÆ6„–æFW‚²’R6&G2æÆVæwFƒ°¢V’æfÆ6„fÆ—VBÒfÇ6S°¢&VæFW$fÆ6†6&EæVÂ‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖ6&B×&WeÒr’’°¢6öç7B6&G2Òf–ÇFW&VDfÆ6†6&G2‚“°¢V’æfÆ6„–æFW‚Ò‡V’æfÆ6„–æFW‚Ò²6&G2æÆVæwF‚’R6&G2æÆVæwFƒ°¢V’æfÆ6„fÆ—VBÒfÇ6S°¢&VæFW$fÆ6†6&EæVÂ‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖ6&B×&F–æuÒr’’°¢7FFRæfÆ6†6&G5·F&vWBæFF6WBçFW&ÕÒÒF&vWBæFF6WBæ6&E&F–æs°¢W'6—7E7FFR‚“°¢6öç7B6&G2Òf–ÇFW&VDfÆ6†6&G2‚“°¢–b†6&G2æÆVæwF‚’V’æfÆ6„–æFW‚Ò‡V’æfÆ6„–æFW‚²’R6&G2æÆVæwFƒ°¢V’æfÆ6„fÆ—VBÒfÇ6S°¢&VæFW$fÆ6†6&EæVÂ‚“°¢6†÷uFö7B‡F&vWBæFF6WBæ6&E&F–ærÓÓÒv¶æ÷vâròt6öæ6WFòÖ&6Fò6öÖòFöÖ–æFòr¢tw&VvFò&W6òr“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FF×&W6WB×&öw&W75Òr’’°¢&W6WE&öw&W72‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚v¶‡&VeãÒ"2ò%Òr’’°¢6Æ÷6U6–FV&"‚“°¢Ğ¢Ò“° ¢Fö7VÖVçBæFDWfVçDÆ—7FVæW"‚v–çWBrÂ†WfVçB’Óâ°¢6öç7BF&vWBÒWfVçBçF&vWC°¢–b‡F&vWBæ–BÓÓÒvvÆö&Â×6V&6‚Ö–çWBr’°¢&VæFW%6V&6…&W7VÇG2‡F&vWBçfÇVR“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæ–BÓÓÒvvÆ÷76'’×6V&6‚Ö–çWBr’°¢V’ævÆ÷76'•VW'’ÒF&vWBçfÇVS°¢WFFTvÆ÷76'•&W7VÇG2‚“°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖæ÷FRÖÖöGVÆUÒr’’°¢6öç7BÖöGVÆT–BÒF&vWBæFF6WBææ÷FTÖöGVÆS°¢7FFRææ÷FW5¶ÖöGVÆT–EÒÒF&vWBçfÇVS°¢Æö6Å7F÷&vRç6WD—FVÒ…5Dõ$tUô´U’Â¥4ôâç7G&–æv–g’‡7FFR’“°¢6öç7B6÷VçBÒFö7VÖVçBçVW'•6VÆV7F÷"†¶FFÖæ÷FRÖ6÷VçCÒ"G¶ÖöGVÆT–GÒ%Ö“°¢–b†6÷VçB’6÷VçBçFW‡D6öçFVçBÒG·v÷&D6÷VçB‡F&vWBçfÇVR—ÒÆ'&6°¢&WGW&ã°¢Ğ¢–b‡F&vWBæÖF6†W2‚u¶FFÖW†ÒÖG&gEÒr’’°¢6öç7BVW7F–öä–BÒF&vWBæFF6WBæW†ÔG&gC°¢7FFRæW†ÔG&gG5·VW7F–öä–EÒÒF&vWBçfÇVS°¢Æö6Å7F÷&vRç6WD—FVÒ…5Dõ$tUô´U’Â¥4ôâç7G&–æv–g’‡7FFR’“°¢6öç7B6÷VçBÒFö7VÖVçBçVW'•6VÆV7F÷"†¶FFÖG&gBÖ6÷VçCÒ"G·VW7F–öä–GÒ%Ö“°¢–b†6÷VçB’6÷VçBçFW‡D6öçFVçBÒG·v÷&D6÷VçB‡F&vWBçfÇVR—ÒÆ'&6°¢Ğ¢Ò“° ¢Fö7VÖVçBæFDWfVçDÆ—7FVæW"‚v¶W–F÷vârÂ†WfVçB’Óâ°¢6öç7B—56†÷'F7WBÒ†WfVçBæ7G&Ä¶W’ÇÂWfVçBæÖWF¶W’’bbWfVçBæ¶W’çFôÆ÷vW$66R‚’ÓÓÒv²s°¢–b†—56†÷'F7WB’°¢WfVçBç&WfVçDFVfVÇB‚“°¢÷Vå6V&6‚‚“°¢&WGW&ã°¢Ğ¢–b†WfVçBæ¶W’ÓÓÒtW66RrbbFö7VÖVçBæ&öG’æ6Æ74Æ—7Bæ6öçF–ç2‚w6–FV&"Ö÷Vâr’’°¢6Æ÷6U6–FV&"‚“°¢Ğ¢–b‡&÷WFT–æfò‚’çvRÓÓÒwF&¦WF2rbb²t”åUBrÂuDU…D$TuÒæ–æ6ÇVFW2†Fö7VÖVçBæ7F—fTVÆVÖVçBçFtæÖR’’°¢–b†WfVçBæ¶W’ÓÓÒt'&÷u&–v‡Br’°¢WfVçBç&WfVçDFVfVÇB‚“°¢6öç7B6&G2Òf–ÇFW&VDfÆ6†6&G2‚“°¢–b†6&G2æÆVæwF‚’°¢V’æfÆ6„–æFW‚Ò‡V’æfÆ6„–æFW‚²’R6&G2æÆVæwFƒ°¢V’æfÆ6„fÆ—VBÒfÇ6S°¢&VæFW$fÆ6†6&EæVÂ‚“°¢Ğ¢Ğ¢–b†WfVçBæ¶W’ÓÓÒt'&÷tÆVgBr’°¢WfVçBç&WfVçDFVfVÇB‚“°¢6öç7B6&G2Òf–ÇFW&VDfÆ6†6&G2‚“°¢–b†6&G2æÆVæwF‚’°¢V’æfÆ6„–æFW‚Ò‡V’æfÆ6„–æFW‚Ò²6&G2æÆVæwF‚’R6&G2æÆVæwFƒ°¢V’æfÆ6„fÆ—VBÒfÇ6S°¢&VæFW$fÆ6†6&EæVÂ‚“°¢Ğ¢Ğ¢–b†WfVçBæ¶W’ÓÓÒrr’°¢WfVçBç&WfVçDFVfVÇB‚“°¢V’æfÆ6„fÆ—VBÒV’æfÆ6„fÆ—VC°¢&VæFW$fÆ6†6&EæVÂ‚“°¢Ğ¢Ğ¢Ò“° ¢6V&6„F–ÆöræFDWfVçDÆ—7FVæW"‚v6Æ–6²rÂ†WfVçB’Óâ°¢–b†WfVçBçF&vWBÓÓÒ6V&6„F–Æör’6Æ÷6U6V&6‚‚“°¢Ò“° ¢v–æF÷ræFDWfVçDÆ—7FVæW"‚v†6†6†ævRrÂ&VæFW%&÷WFR“° ¢gVæ7F–öâ–æ—B‚’°¢Fö7VÖVçBævWDVÆVÖVçD'”–B‚wF†VÖRÖ–6öâr’çFW‡D6öçFVçBÒFö7VÖVçBæFö7VÖVçDVÆVÖVçBæFF6WBçF†VÖRÓÓÒvF&²rò~)ˆr¢~)ys°¢&VæFW%6†VÆÅ&öw&W72‚“°¢–b‚Æö6F–öâæ†6‚’Æö6F–öâæ†6‚Òr2ö–æ–6–òs°¢VÇ6R&VæFW%&÷WFR‚“°¢Ğ ¢–æ—B‚“°§Ò’‚“° 
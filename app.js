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
          <p class="nav-label">Los 9 módulos</p>
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
      <button type="button" class="mobile-nav-link" data-mobile-menu>${icon('menu', 19)}<span>Módulos</span></button>`;
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
        <p>${stats.completed === 0 ? 'Empezá por el módulo que más necesites.' : `${stats.completed} módulo${stats.completed === 1 ? '' : 's'} completado${stats.completed === 1 ? '' : 's'}.`}</p>
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
            <h1>Entendé el recorrido completo de un <span>androide biónico</span></h1>
            <p>${escapeHTML(content.meta.description)}</p>
            <div class="hero-actions">
              <a class="button button-primary" href="#/modulo/${nextModule.id}">
                ${state.completed.length ? 'Continuar estudiando' : 'Empezar la ruta'} ${icon('arrow', 18)}
              </a>
              <a class="button button-secondary" href="#/examen">Ver mapa del examen</a>
            </div>
            <div class="hero-meta">
              <span>${icon('clock', 17)} 9 módulos · ~3 horas</span>
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
            <div class="readiness-ring" style="--value:${stats.readiness}" aria-label="Preparación estimada ${stats.readiness}%">
              <div><strong>${stats.readiness}%</strong><span>preparación</span></div>
            </div>
            <div class="readiness-copy">
              <p class="eyebrow">Tu progreso</p>
              <h2>Preparación estimada</h2>
              <p>Combina módulos completados, respuestas correctas y tarjetas dominadas. Es una guía personal, no una predicción del resultado.</p>
              <a href="#/examen" class="text-link">Revisar las cuatro consignas ${icon('arrow', 16)}</a>
            </div>
          </article>
          <article class="metric-card">
            <span class="metric-icon">${icon('check', 21)}</span>
            <strong>${stats.completed}<small>/9</small></strong>
            <span>Módulos completados</span>
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
            <div>
              <p class="eyebrow">Explorar por tema</p>
              <h2>Los nueve módulos</h2>
              <p>Filtrá según la pregunta del examen o el estado de estudio.</p>
            </div>
            <div class="filter-bar" role="group" aria-label="Filtrar módulos">
              ${renderHomeFilter('all', 'Todos')}
              ${renderHomeFilter('q2', 'Pregunta 2')}
              ${renderHomeFilter('q3', 'Pregunta 3')}
              ${renderHomeFilter('q4', 'Pregunta 4')}
              ${renderHomeFilter('bookmarked', 'Guardados')}
            </div>
          </div>
          <div class="module-grid" id="module-grid">${renderModuleGrid()}</div>
        </section>

        <section class="section-block">
          <div class="section-heading">
            <p class="eyebrow">Elegí una estrategia</p>
            <h2>Rutas de aprendizaje</h2>
            <p>No tenés que recorrer el contenido de una sola manera.</p>
          </div>
          <div class="path-grid">
            ${content.studyPaths.map(renderStudyPath).join('')}
          </div>
        </section>

        <section class="exam-preview section-block">
          <div class="exam-preview-copy">
            <p class="eyebrow">Conectar conocimiento con consignas</p>
            <h2>Un mapa claro para el examen</h2>
            <p>Cada consigna está vinculada con los módulos que necesitás estudiar y con una estructura para desarrollar tu propia respuesta.</p>
            <a class="button button-primary" href="#/examen">Abrir preparación guiada ${icon('arrow', 18)}</a>
          </div>
          <div class="exam-question-stack">
            ${content.examQuestions.map((question) => `
              <a href="#/examen" class="exam-mini-card">
                <span>${String(question.number).padStart(2, '0')}</span>
                <div><strong>${escapeHTML(question.title)}</strong><small>${question.points ? `${question.points} puntos` : 'Presentación personal'}</small></div>
                ${icon('arrow', 17)}
              </a>`).join('')}
          </div>
        </section>
      </div>`;
  }

  function getNextModule() {
    if (state.lastModule && modulesById.has(state.lastModule) && !state.completed.includes(state.lastModule)) {
      return modulesById.get(state.lastModule);
    }
    return content.modules.find((module) => !state.completed.includes(module.id)) || content.modules[0];
  }

  function renderHomeFilter(id, label) {
    return `<button type="button" class="filter-chip${ui.homeFilter === id ? ' is-active' : ''}" data-home-filter="${id}" aria-pressed="${ui.homeFilter === id}">${escapeHTML(label)}</button>`;
  }

  function filteredHomeModules() {
    if (ui.homeFilter === 'all') return content.modules;
    if (ui.homeFilter === 'bookmarked') return content.modules.filter((module) => state.bookmarks.includes(module.id));
    return content.modules.filter((module) => module.exam.includes(ui.homeFilter));
  }

  function renderModuleGrid() {
    const modules = filteredHomeModules();
    if (!modules.length) {
      return `<div class="empty-state">${icon('bookmark', 26)}<h3>No hay módulos guardados todavía</h3><p>Usá el marcador de una tarjeta o lección para armar tu lista.</p></div>`;
    }
    return modules.map(renderModuleCard).join('');
  }

  function renderModuleCard(module) {
    const complete = state.completed.includes(module.id);
    const bookmarked = state.bookmarks.includes(module.id);
    const moduleQuestions = module.quiz || [];
    const correct = moduleQuestions.filter((question) => state.quizAnswers[question.id] === question.answer).length;
    return `
      <article class="module-card${complete ? ' is-complete' : ''}">
        <div class="module-card-top">
          <span class="module-number">${String(module.order).padStart(2, '0')}</span>
          <button class="bookmark-button${bookmarked ? ' is-active' : ''}" type="button" data-bookmark="${module.id}" aria-label="${bookmarked ? 'Quitar de guardados' : 'Guardar módulo'}" aria-pressed="${bookmarked}">
            ${icon('bookmark', 18)}
          </button>
        </div>
        <a href="#/modulo/${module.id}" class="module-card-link">
          <span class="module-card-icon">${icon(module.icon, 24)}</span>
          <div class="module-card-badges">${confidenceBadge(module.confidence)}${module.exam.map((id) => examBadge(id, true)).join('')}</div>
          <h3>${escapeHTML(module.title)}</h3>
          <p>${escapeHTML(module.summary)}</p>
          <div class="module-card-footer">
            <span>${icon('clock', 15)} ${module.duration} min</span>
            <span>${correct}/${moduleQuestions.length} chequeos</span>
            <span class="module-card-action">Abrir ${icon('arrow', 16)}</span>
          </div>
        </a>
        ${complete ? `<span class="completion-stamp">${icon('check', 15)} Completado</span>` : ''}
      </article>`;
  }

  function renderStudyPath(path) {
    const completed = path.modules.filter((id) => state.completed.includes(id)).length;
    const firstAvailable = path.modules.find((id) => !state.completed.includes(id)) || path.modules[0];
    return `
      <article class="path-card">
        <div class="path-card-header">
          <span class="path-icon">${icon(path.id === 'exam-fast' ? 'exam' : path.id === 'signals' ? 'pulse' : 'spark', 23)}</span>
          <span>${path.estimatedMinutes} min</span>
        </div>
        <h3>${escapeHTML(path.title)}</h3>
        <p>${escapeHTML(path.description)}</p>
        <div class="path-dots" aria-label="${completed} de ${path.modules.length} módulos completados">
          ${path.modules.map((id) => `<span class="${state.completed.includes(id) ? 'is-complete' : ''}" title="${escapeHTML(modulesById.get(id).shortTitle)}"></span>`).join('')}
        </div>
        <button type="button" class="text-link" data-start-path="${firstAvailable}">${completed ? 'Continuar ruta' : 'Iniciar ruta'} ${icon('arrow', 16)}</button>
      </article>`;
  }

  function renderModule(moduleId) {
    const module = modulesById.get(moduleId);
    if (!module) {
      navigate('#/inicio');
      return;
    }
    if (state.lastModule !== moduleId) {
      state.lastModule = moduleId;
      persistState();
    }
    const complete = state.completed.includes(module.id);
    const bookmarked = state.bookmarks.includes(module.id);
    const currentIndex = content.modules.findIndex((item) => item.id === module.id);
    const previous = content.modules[currentIndex - 1];
    const next = content.modules[currentIndex + 1];

    app.innerHTML = `
      <div class="page lesson-page">
        <div class="breadcrumbs"><a href="#/inicio">Inicio</a><span>/</span><span>Módulo ${module.order}</span></div>
        <header class="lesson-hero">
          <div class="lesson-hero-main">
            <div class="lesson-index">${String(module.order).padStart(2, '0')}</div>
            <div>
              <div class="lesson-badges">${confidenceBadge(module.confidence)}${module.exam.map((id) => examBadge(id)).join('')}</div>
              <p class="eyebrow">${escapeHTML(module.kicker)}</p>
              <h1>${escapeHTML(module.title)}</h1>
              <p class="lesson-summary">${escapeHTML(module.summary)}</p>
            </div>
          </div>
          <div class="lesson-actions">
            <button class="button button-secondary" type="button" data-bookmark="${module.id}" aria-pressed="${bookmarked}">
              ${icon('bookmark', 17)} ${bookmarked ? 'Guardado' : 'Guardar'}
            </button>
            <button class="button ${complete ? 'button-complete' : 'button-primary'}" type="button" data-complete="${module.id}" aria-pressed="${complete}">
              ${icon('check', 17)} ${complete ? 'Módulo completado' : 'Marcar como completado'}
            </button>
          </div>
          <div class="lesson-meta-row">
            <span>${icon('clock', 16)} ${module.duration} min</span>
            <span>${icon('axis', 16)} Nivel ${escapeHTML(module.difficulty)}</span>
            <span>${icon('exam', 16)} ${module.quiz.length} chequeos</span>
          </div>
        </header>

        <div class="lesson-layout">
          <article class="lesson-content">
            <section class="lesson-intro-grid">
              <div class="why-card">
                <span class="why-icon">${icon('spark', 21)}</span>
                <div><h2>Por qué importa</h2><p>${escapeHTML(module.whyItMatters)}</p></div>
              </div>
              <div class="goals-card">
                <h2>Al terminar vas a poder…</h2>
                <ul>${module.learningGoals.map((goal) => `<li>${icon('check', 16)}<span>${escapeHTML(goal)}</span></li>`).join('')}</ul>
              </div>
            </section>

            ${module.sections.map((section, index) => renderLessonSection(section, index)).join('')}

            <section class="lesson-section" id="conceptos-clave">
              <div class="lesson-section-heading">
                <span class="section-count">${String(module.sections.length + 1).padStart(2, '0')}</span>
                <div><p class="eyebrow">Diccionario del módulo</p><h2>Conceptos clave</h2></div>
              </div>
              <div class="concept-list">
                ${module.concepts.map((concept) => `
                  <details class="concept-item">
                    <summary><span>${escapeHTML(concept.term)}</span>${icon('chevron', 18)}</summary>
                    <div class="concept-body"><p>${escapeHTML(concept.definition)}</p><div><strong>Ejemplo</strong><span>${escapeHTML(concept.example)}</span></div></div>
                  </details>`).join('')}
              </div>
            </section>

            <section class="lesson-section" id="proceso">
              <div class="lesson-section-heading">
                <span class="section-count">${String(module.sections.length + 2).padStart(2, '0')}</span>
                <div><p class="eyebrow">Secuencia mental</p><h2>Cómo se aplica</h2></div>
              </div>
              <ol class="process-list">${module.process.map((step, index) => `<li><span>${index + 1}</span><p>${escapeHTML(step)}</p></li>`).join('')}</ol>
              <div class="applied-example"><span>${icon('spark', 22)}</span><div><strong>${escapeHTML(module.appliedExample.title)}</strong><p>${escapeHTML(module.appliedExample.text)}</p></div></div>
            </section>

            <section class="lesson-section" id="comprobacion">
              <div class="lesson-section-heading">
                <span class="section-count">${String(module.sections.length + 3).padStart(2, '0')}</span>
                <div><p class="eyebrow">Autoevaluación</p><h2>Comprobá lo que entendiste</h2></div>
              </div>
              ${renderQuiz(module)}
            </section>

            <section class="lesson-section" id="resumen">
              <div class="lesson-section-heading">
                <span class="section-count">${String(module.sections.length + 4).padStart(2, '0')}</span>
                <div><p class="eyebrow">Antes de continuar</p><h2>Ideas que deberías retener</h2></div>
              </div>
              <div class="takeaway-grid">${module.takeaways.map((takeaway, index) => `<div><span>${index + 1}</span><p>${escapeHTML(takeaway)}</p></div>`).join('')}</div>
            </section>

            <section class="lesson-section notes-section" id="mis-notas">
              <div class="lesson-section-heading">
                <span class="section-count">${icon('note', 18)}</span>
                <div><p class="eyebrow">Se guarda en este dispositivo</p><h2>Mis notas del módulo</h2></div>
              </div>
              <textarea class="notes-area" data-note-module="${module.id}" placeholder="Escribí con tus palabras qué entendiste, qué te genera dudas o cómo lo explicarías…">${escapeHTML(state.notes[module.id] || '')}</textarea>
              <div class="notes-meta"><span>Guardado automático</span><span data-note-count="${module.id}">${wordCount(state.notes[module.id] || '')} palabras</span></div>
            </section>

            <div class="lesson-completion-panel${complete ? ' is-complete' : ''}">
              <div>
                <span class="completion-icon">${icon('check', 23)}</span>
                <div><strong>${complete ? 'Este módulo está completado' : '¿Terminaste de estudiar este módulo?'}</strong><p>${complete ? 'Podés volver a repasarlo cuando quieras.' : 'Marcá el avance para actualizar tu ruta personal.'}</p></div>
              </div>
              <button class="button ${complete ? 'button-secondary' : 'button-primary'}" type="button" data-complete="${module.id}">${complete ? 'Marcar como pendiente' : 'Completar módulo'}</button>
            </div>

            <nav class="lesson-pagination" aria-label="Navegación entre módulos">
              ${previous ? `<a href="#/modulo/${previous.id}" class="lesson-page-link previous">${icon('arrow', 18)}<span><small>Anterior</small><strong>${escapeHTML(previous.shortTitle)}</strong></span></a>` : '<span></span>'}
              ${next ? `<a href="#/modulo/${next.id}" class="lesson-page-link next"><span><small>Siguiente</small><strong>${escapeHTML(next.shortTitle)}</strong></span>${icon('arrow', 18)}</a>` : `<a href="#/examen" class="lesson-page-link next"><span><small>Finalizar ruta</small><strong>Preparar examen</strong></span>${icon('arrow', 18)}</a>`}
            </nav>
          </article>

          <aside class="lesson-rail" aria-label="Contenido del módulo">
            <div class="rail-card">
              <p class="nav-label">En este módulo</p>
              ${module.sections.map((section, index) => `<button type="button" data-scroll-to="seccion-${index + 1}"><span>${String(index + 1).padStart(2, '0')}</span>${escapeHTML(section.title)}</button>`).join('')}
              <button type="button" data-scroll-to="conceptos-clave"><span>•</span>Conceptos clave</button>
              <button type="button" data-scroll-to="comprobacion"><span>•</span>Autoevaluación</button>
              <button type="button" data-scroll-to="mis-notas"><span>•</span>Mis notas</button>
            </div>
            <div class="rail-exam-card">
              <span>${icon('exam', 19)}</span>
              <div><strong>Relación con el examen</strong><p>${module.exam.map((id) => `Pregunta ${examsById.get(id).number}`).join(' · ')}</p></div>
              <a href="#/examen">Ver guía</a>
            </div>
          </aside>
        </div>
      </div>`;
  }

  function renderLessonSection(section, index) {
    return `
      <section class="lesson-section" id="seccion-${index + 1}">
        <div class="lesson-section-heading">
          <span class="section-count">${String(index + 1).padStart(2, '0')}</span>
          <h2>${escapeHTML(section.title)}</h2>
        </div>
        <div class="lesson-prose">
          ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join('')}
          ${section.visual ? renderVisual(section.visual) : ''}
          ${section.bullets ? `<ul class="content-list">${section.bullets.map((bullet) => `<li><span></span>${escapeHTML(bullet)}</li>`).join('')}</ul>` : ''}
          ${section.comparison ? renderComparison(section.comparison) : ''}
          ${section.callout ? `<div class="content-callout"><span>${icon('spark', 20)}</span><div><strong>${escapeHTML(section.callout.title)}</strong><p>${escapeHTML(section.callout.text)}</p></div></div>` : ''}
        </div>
      </section>`;
  }

  function renderComparison(comparison) {
    return `
      <div class="comparison-grid">
        <div><strong>${escapeHTML(comparison.left.title)}</strong><ul>${comparison.left.items.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div>
        <div><strong>${escapeHTML(comparison.right.title)}</strong><ul>${comparison.right.items.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div>
      </div>`;
  }

  function renderQuiz(module) {
    const correct = module.quiz.filter((question) => state.quizAnswers[question.id] === question.answer).length;
    return `
      <div class="quiz-header"><p>Elegí una opción. La explicación aparece inmediatamente.</p><span>${correct}/${module.quiz.length} correctas</span></div>
      <div class="quiz-list">
        ${module.quiz.map((question, questionIndex) => {
          const selected = state.quizAnswers[question.id];
          const answered = Number.isInteger(selected);
          const isCorrect = selected === question.answer;
          return `
            <article class="quiz-card${answered ? (isCorrect ? ' is-correct' : ' is-wrong') : ''}">
              <div class="quiz-question"><span>${questionIndex + 1}</span><h3>${escapeHTML(question.prompt)}</h3></div>
              <div class="quiz-options">
                ${question.options.map((option, optionIndex) => {
                  const selectedClass = selected === optionIndex ? ' is-selected' : '';
                  const revealCorrect = answered && optionIndex === question.answer ? ' is-answer' : '';
                  const revealWrong = answered && selected === optionIndex && optionIndex !== question.answer ? ' is-wrong-answer' : '';
                  return `<button type="button" class="quiz-option${selectedClass}${revealCorrect}${revealWrong}" data-quiz-id="${question.id}" data-option="${optionIndex}"><span>${String.fromCharCode(65 + optionIndex)}</span>${escapeHTML(option)}</button>`;
                }).join('')}
              </div>
              ${answered ? `<div class="quiz-feedback"><strong>${isCorrect ? 'Correcto' : 'Revisá esta idea'}</strong><p>${escapeHTML(question.explanation)}</p></div>` : ''}
            </article>`;
        }).join('')}
      </div>`;
  }

  function renderExam() {
    const stats = progressStats();
    app.innerHTML = `
      <div class="page exam-page">
        <header class="page-hero compact-hero">
          <div>
            <p class="eyebrow">Preparación guiada</p>
            <h1>Del contenido a tus propias respuestas</h1>
            <p>Ubicá qué estudiar para cada consigna, elegí tus cinco etapas y escribí borradores con tus palabras.</p>
          </div>
          <div class="compact-readiness" style="--value:${stats.readiness}">
            <strong>${stats.readiness}%</strong><span>preparación estimada</span>
          </div>
        </header>

        <section class="exam-principle">
          ${icon('info', 21)}
          <p>La guía organiza lo aprendido y marca incertidumbres. No reproduce una respuesta oficial ni reemplaza tu criterio sobre lo que recordó el orador.</p>
        </section>

        <section class="section-block">
          <div class="section-heading">
            <p class="eyebrow">Mapa general</p>
            <h2>Las cuatro consignas</h2>
            <p>Abrí cada bloque para ver la relación con el curso y una estructura de desarrollo.</p>
          </div>
          <div class="exam-card-list">
            ${content.examQuestions.map(renderExamQuestion).join('')}
          </div>
        </section>

        <section class="section-block selection-workshop">
          <div class="section-heading split-heading">
            <div>
              <p class="eyebrow">Taller para la pregunta 2</p>
              <h2>Elegí tus cinco etapas</h2>
              <p>Seleccioná exactamente cinco. La combinación queda guardada en este navegador.</p>
            </div>
            <div class="selection-counter"><strong>${state.examSelection.length}</strong><span>/5 elegidas</span></div>
          </div>
          <div class="selection-toolbar">
            <button type="button" class="button button-secondary" data-suggest-five>Usar selección recomendada</button>
            <span>${state.examSelection.length === 5 ? 'Selección completa' : `Te faltan ${5 - state.examSelection.length}`}</span>
          </div>
          <div class="exam-module-selector">
            ${content.modules.map((module) => {
              const selected = state.examSelection.includes(module.id);
              return `<button type="button" class="exam-select-card${selected ? ' is-selected' : ''}" data-exam-select="${module.id}" aria-pressed="${selected}">
                <span class="exam-select-index">${selected ? icon('check', 17) : String(module.order).padStart(2, '0')}</span>
                <span><strong>${escapeHTML(module.shortTitle)}</strong><small>${escapeHTML(module.kicker)}</small></span>
                ${module.id === 'diseno-robotico' ? '<em>Clave obligatoria</em>' : ''}
              </button>`;
            }).join('')}
          </div>
          ${state.examSelection.length ? `<div class="selection-summary"><strong>Tu recorrido:</strong>${state.examSelection.map((id) => `<a href="#/modulo/${id}">${escapeHTML(modulesById.get(id).shortTitle)}</a>`).join(icon('arrow', 14))}</div>` : ''}
        </section>

        <section class="section-block draft-workshop">
          <div class="section-heading">
            <p class="eyebrow">Espacio de elaboración</p>
            <h2>Mis borradores</h2>
            <p>Escribí primero sin buscar perfección. Después podés revisar precisión, claridad y relación con la consigna.</p>
          </div>
          <div class="draft-grid">
            ${content.examQuestions.map((question) => `
              <article class="draft-card">
                <div class="draft-card-head"><span>Pregunta ${question.number}</span>${question.points ? `<strong>${question.points} pts</strong>` : ''}</div>
                <h3>${escapeHTML(question.title)}</h3>
                <textarea data-exam-draft="${question.id}" placeholder="Escribí acá tu desarrollo…">${escapeHTML(state.examDrafts[question.id] || '')}</textarea>
                <div class="draft-meta"><span>Guardado automático</span><span data-draft-count="${question.id}">${wordCount(state.examDrafts[question.id] || '')} palabras</span></div>
              </article>`).join('')}
          </div>
        </section>

        <section class="section-block final-checklist">
          <div>
            <p class="eyebrow">Antes de entregar</p>
            <h2>Chequeo de calidad</h2>
          </div>
          <ul>
            <li>${icon('check', 18)}<span>Cada respuesta nombra exactamente lo que pide la consigna.</span></li>
            <li>${icon('check', 18)}<span>Las descripciones explican función, proceso y un ejemplo.</span></li>
            <li>${icon('check', 18)}<span>La pregunta 2 incluye Diseño Robótico.</span></li>
            <li>${icon('check', 18)}<span>EMG está asociado con señal muscular y no con fuerza exacta.</span></li>
            <li>${icon('check', 18)}<span>Manufactura aditiva aparece como categoría y FDM/FFF como técnica plástica probable.</span></li>
            <li>${icon('check', 18)}<span>Las partes inciertas no se presentan como hechos confirmados del webinar.</span></li>
          </ul>
        </section>
      </div>`;
  }

  function renderExamQuestion(question) {
    return `
      <details class="exam-detail-card" ${question.id === 'q2' ? 'open' : ''}>
        <summary>
          <span class="exam-detail-number">${String(question.number).padStart(2, '0')}</span>
          <span class="exam-detail-title"><small>${question.points ? `${question.points} puntos` : 'Contexto personal'}</small><strong>${escapeHTML(question.title)}</strong></span>
          ${icon('chevron', 20)}
        </summary>
        <div class="exam-detail-body">
          <blockquote>${escapeHTML(question.prompt)}</blockquote>
          <div class="exam-key"><span>${icon('spark', 19)}</span><p><strong>Idea central:</strong> ${escapeHTML(question.key)}</p></div>
          <div class="exam-detail-columns">
            <div><h3>Qué estudiar</h3><ul>${question.recommendedTopics.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div>
            <div><h3>Cómo estructurarlo</h3><ol>${question.structure.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ol></div>
          </div>
          <div class="mapped-modules"><strong>Módulos relacionados</strong>${question.mappedModules.map((id) => `<a href="#/modulo/${id}">${String(modulesById.get(id).order).padStart(2, '0')} · ${escapeHTML(modulesById.get(id).shortTitle)}</a>`).join('')}</div>
          <div class="uncertainty-note"><strong>Atención</strong><p>${escapeHTML(question.caution)}</p></div>
        </div>
      </details>`;
  }

  function renderGlossary() {
    app.innerHTML = `
      <div class="page glossary-page">
        <header class="page-hero compact-hero glossary-hero">
          <div>
            <p class="eyebrow">Referencia rápida</p>
            <h1>Glosario de conceptos</h1>
            <p>Buscá una palabra, filtrá por consigna y abrí el módulo donde se explica en contexto.</p>
          </div>
          <div class="glossary-count"><strong>${content.glossary.length}</strong><span>conceptos</span></div>
        </header>
        <section class="glossary-controls">
          <label class="glossary-search">${icon('search', 19)}<input id="glossary-search-input" type="search" value="${escapeHTML(ui.glossaryQuery)}" placeholder="Buscar término o definición…" /></label>
          <div class="filter-bar" role="group" aria-label="Filtrar glosario">
            ${renderGlossaryFilter('all', 'Todos')}
            ${renderGlossaryFilter('q2', 'Pregunta 2')}
            ${renderGlossaryFilter('q3', 'Pregunta 3')}
            ${renderGlossaryFilter('q4', 'Pregunta 4')}
          </div>
        </section>
        <div class="glossary-results-meta" id="glossary-results-meta"></div>
        <section class="glossary-grid" id="glossary-results"></section>
      </div>`;
    updateGlossaryResults();
  }

  function renderGlossaryFilter(id, label) {
    return `<button type="button" class="filter-chip${ui.glossaryFilter === id ? ' is-active' : ''}" data-glossary-filter="${id}" aria-pressed="${ui.glossaryFilter === id}">${escapeHTML(label)}</button>`;
  }

  function filteredGlossary() {
    const query = normalize(ui.glossaryQuery);
    return content.glossary.filter((item) => {
      const examMatch = ui.glossaryFilter === 'all' || item.exam.includes(ui.glossaryFilter);
      const textMatch = !query || normalize(`${item.term} ${item.definition}`).includes(query);
      return examMatch && textMatch;
    });
  }

  function updateGlossaryResults() {
    const container = document.getElementById('glossary-results');
    const meta = document.getElementById('glossary-results-meta');
    if (!container || !meta) return;
    const items = filteredGlossary().sort((a, b) => a.term.localeCompare(b.term, 'es'));
    meta.textContent = `${items.length} resultado${items.length === 1 ? '' : 's'}`;
    container.innerHTML = items.length
      ? items.map((item) => {
          const module = modulesById.get(item.module);
          const status = state.flashcards[item.term];
          return `<article class="glossary-card">
            <div class="glossary-card-head"><span>${escapeHTML(item.term.charAt(0).toUpperCase())}</span><div>${item.exam.map((id) => examBadge(id, true)).join('')}</div></div>
            <h2>${escapeHTML(item.term)}</h2>
            <p>${escapeHTML(item.definition)}</p>
            <div class="glossary-card-footer"><a href="#/modulo/${module.id}">${escapeHTML(module.shortTitle)} ${icon('arrow', 14)}</a>${status ? `<span class="card-status status-${status}">${status === 'known' ? 'Dominado' : 'Repasar'}</span>` : ''}</div>
          </article>`;
        }).join('')
      : `<div class="empty-state">${icon('search', 27)}<h3>No encontramos coincidencias</h3><p>Probá con otra palabra o quitá un filtro.</p></div>`;
  }

  function renderFlashcards() {
    app.innerHTML = `
      <div class="page flashcards-page">
        <header class="page-hero compact-hero flash-hero">
          <div>
            <p class="eyebrow">Recuperación activa</p>
            <h1>Tarjetas de estudio</h1>
            <p>Intentá explicar el término antes de revelar la respuesta. Marcá qué dominás y qué necesitás volver a ver.</p>
          </div>
          <div class="flash-score">${icon('cards', 23)}<strong>${progressStats().known}</strong><span>dominadas</span></div>
        </header>
        <section class="flash-toolbar">
          <div class="filter-bar" role="group" aria-label="Filtrar tarjetas">
            ${renderFlashFilter('all', 'Todas')}
            ${renderFlashFilter('q2', 'Pregunta 2')}
            ${renderFlashFilter('q3', 'Pregunta 3')}
            ${renderFlashFilter('q4', 'Pregunta 4')}
            ${renderFlashFilter('review', 'Para repasar')}
          </div>
        </section>
        <section id="flashcard-panel" class="flashcard-panel"></section>
        <section class="study-tip">
          <span>${icon('spark', 21)}</span>
          <div><strong>Cómo aprovecharlas</strong><p>No leas inmediatamente el reverso. Primero formulá una definición y un ejemplo. La dificultad de recordar es parte del aprendizaje.</p></div>
        </section>
      </div>`;
    renderFlashcardPanel();
  }

  function renderFlashFilter(id, label) {
    return `<button type="button" class="filter-chip${ui.flashFilter === id ? ' is-active' : ''}" data-flash-filter="${id}" aria-pressed="${ui.flashFilter === id}">${escapeHTML(label)}</button>`;
  }

  function filteredFlashcards() {
    if (ui.flashFilter === 'all') return content.glossary;
    if (ui.flashFilter === 'review') return content.glossary.filter((item) => state.flashcards[item.term] !== 'known');
    return content.glossary.filter((item) => item.exam.includes(ui.flashFilter));
  }

  function renderFlashcardPanel() {
    const panel = document.getElementById('flashcard-panel');
    if (!panel) return;
    const cards = filteredFlashcards();
    if (!cards.length) {
      panel.innerHTML = `<div class="empty-state">${icon('check', 28)}<h3>No quedan tarjetas en este filtro</h3><p>Probá con otra categoría o reiniciá las marcas desde Alcance del material.</p></div>`;
      return;
    }
    if (ui.flashIndex >= cards.length) ui.flashIndex = 0;
    const item = cards[ui.flashIndex];
    const module = modulesById.get(item.module);
    const status = state.flashcards[item.term];
    const knownCount = cards.filter((card) => state.flashcards[card.term] === 'known').length;
    panel.innerHTML = `
      <div class="flash-progress-row"><span>Tarjeta ${ui.flashIndex + 1} de ${cards.length}</span><span>${knownCount} dominadas en este grupo</span></div>
      <div class="progress-track flash-progress" aria-hidden="true"><span style="width:${((ui.flashIndex + 1) / cards.length) * 100}%"></span></div>
      <button type="button" class="flashcard${ui.flashFlipped ? ' is-flipped' : ''}" data-flip-card aria-label="${ui.flashFlipped ? 'Volver al término' : 'Revelar definición'}">
        <span class="flashcard-side flashcard-front">
          <small>${escapeHTML(module.shortTitle)}</small>
          <strong>${escapeHTML(item.term)}</strong>
          <em>Intentá explicarlo antes de revelar</em>
          <span class="reveal-hint">Tocar para revelar ${icon('arrow', 16)}</span>
        </span>
        <span class="flashcard-side flashcard-back">
          <small>Definición</small>
          <strong>${escapeHTML(item.term)}</strong>
          <p>${escapeHTML(item.definition)}</p>
          <span class="reveal-hint">Tocar para volver</span>
        </span>
      </button>
      <div class="flashcard-rating">
        <button type="button" class="button button-secondary${status === 'review' ? ' is-selected' : ''}" data-card-rating="review" data-term="${escapeHTML(item.term)}">Necesito repasarlo</button>
        <button type="button" class="button button-primary${status === 'known' ? ' is-selected' : ''}" data-card-rating="known" data-term="${escapeHTML(item.term)}">Lo puedo explicar</button>
      </div>
      <div class="flashcard-navigation">
        <button type="button" class="icon-text-button" data-card-prev>${icon('arrow', 17)} Anterior</button>
        <a href="#/modulo/${module.id}" class="text-link">Abrir módulo</a>
        <button type="button" class="icon-text-button" data-card-next>Siguiente ${icon('arrow', 17)}</button>
      </div>`;
  }

  function renderAbout() {
    app.innerHTML = `
      <div class="page about-page">
        <header class="page-hero compact-hero">
          <div>
            <p class="eyebrow">Transparencia del material</p>
            <h1>Qué sabemos y qué estamos reconstruyendo</h1>
            <p>La utilidad de esta academia depende de distinguir explicación técnica, apuntes directos e inferencias sobre el webinar.</p>
          </div>
        </header>

        <section class="about-intro section-block">
          <div class="about-statement"><span>${icon('info', 24)}</span><p>${escapeHTML(content.meta.disclaimer)}</p></div>
          <div class="about-columns">
            <div><h2>Base disponible</h2><ul><li>El temario escrito del webinar.</li><li>La síntesis anotada al final de la exposición.</li><li>Las pistas incluidas en las cuatro consignas.</li><li>Explicaciones técnicas estables de robótica, control y manufactura.</li></ul></div>
            <div><h2>Lo que no tenemos</h2><ul><li>Grabación de la primera hora.</li><li>Diapositivas completas del orador.</li><li>Lista literal y oficial de las nueve etapas.</li><li>Confirmación inequívoca del segundo sensor esperado.</li></ul></div>
          </div>
        </section>

        <section class="section-block">
          <div class="section-heading"><p class="eyebrow">Etiquetas de confianza</p><h2>Cómo leer el contenido</h2></div>
          <div class="confidence-grid">
            ${content.meta.confidenceLegend.map((item) => `<article><span class="confidence-badge confidence-${item.id}">${escapeHTML(item.label)}</span><p>${escapeHTML(item.description)}</p></article>`).join('')}
          </div>
        </section>

        <section class="section-block uncertainty-grid">
          <article>
            <span class="uncertainty-icon">${icon('exam', 23)}</span>
            <h2>Las nueve etapas</h2>
            <p>El temario agrupa “herramientas de simulación y optimización”. Para reconstruir nueve etapas se separan ambos bloques. Es una hipótesis organizativa, no una transcripción.</p>
          </article>
          <article>
            <span class="uncertainty-icon">${icon('pulse', 23)}</span>
            <h2>Los dos sensores</h2>
            <p>EMG queda identificado por la pista de señal muscular. EOG es el segundo candidato más fuerte por los apuntes de electrooculografía; EEG también fue nombrado, pero mide actividad cerebral.</p>
          </article>
          <article>
            <span class="uncertainty-icon">${icon('printer', 23)}</span>
            <h2>La manufactura</h2>
            <p>La categoría segura es manufactura aditiva. FDM/FFF es la técnica más compatible con la pista de plásticos, aunque SLA y SLS también pueden procesar polímeros.</p>
          </article>
        </section>

        <section class="section-block local-data-card">
          <div>
            <p class="eyebrow">Privacidad y control</p>
            <h2>Tus datos quedan en el navegador</h2>
            <p>Progreso, notas, borradores y tarjetas se guardan mediante almacenamiento local. No se envían a un servidor desde esta versión estática.</p>
          </div>
          <button type="button" class="button button-danger" data-reset-progress>${icon('reset', 17)} Reiniciar todo el progreso</button>
        </section>
      </div>`;
  }

  function renderHeroIllustration() {
    return `
      <svg class="android-illustration" viewBox="0 0 520 420">
        <defs>
          <linearGradient id="heroGlow" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8df0df"/><stop offset="1" stop-color="#6f7cff"/></linearGradient>
          <filter id="blur"><feGaussianBlur stdDeviation="22"/></filter>
        </defs>
        <circle cx="280" cy="195" r="140" fill="url(#heroGlow)" opacity=".16" filter="url(#blur)"/>
        <path class="orbit" d="M70 210c75-140 330-145 390 8S190 400 70 210Z" fill="none"/>
        <g class="robot-head">
          <path d="M184 128c0-42 34-76 76-76h18c42 0 76 34 76 76v91c0 45-36 81-81 81h-8c-45 0-81-36-81-81z"/>
          <path d="M199 143h140v72c0 38-31 69-69 69h-2c-38 0-69-31-69-69z" class="face-panel"/>
          <circle cx="235" cy="181" r="10" class="eye"/><circle cx="304" cy="181" r="10" class="eye"/>
          <path d="M245 239c16 9 33 9 49 0" class="mouth"/>
          <path d="M214 82 190 59m114 23 25-23M269 52V23" class="antenna"/>
        </g>
        <g class="data-nodes">
          <circle cx="88" cy="127" r="7"/><circle cx="440" cy="116" r="7"/><circle cx="463" cy="287" r="7"/><circle cx="108" cy="310" r="7"/>
          <path d="m95 132 73 31m262-42-67 36m94 123-91-28M116 302l67-47"/>
        </g>
        <g class="code-lines"><path d="M68 175h62M78 192h38M394 330h62M416 347h30"/></g>
        <g class="labels">
          <text x="46" y="110">BIOSEÑAL</text><text x="405" y="99">MODELO</text><text x="421" y="315">CONTROL</text><text x="61" y="339">DISEÑO</text>
        </g>
      </svg>`;
  }

  function renderVisual(type) {
    const visuals = {
      'selection-map': `
        <div class="learning-visual selection-visual" role="img" aria-label="Mapa de selección del androide">
          <div class="visual-node center"><strong>Objetivo</strong><span>¿Qué debe resolver?</span></div>
          <div class="visual-node node-a"><strong>Usuario</strong><span>Quién interactúa</span></div>
          <div class="visual-node node-b"><strong>Entorno</strong><span>Dónde funciona</span></div>
          <div class="visual-node node-c"><strong>Movimiento</strong><span>Qué necesita hacer</span></div>
          <div class="visual-node node-d"><strong>Restricciones</strong><span>Costo y seguridad</span></div>
          <svg viewBox="0 0 600 280" aria-hidden="true"><path d="M300 140 135 63M300 140 465 63M300 140 135 217M300 140 465 217"/></svg>
        </div>`,
      'dh-chain': `
        <div class="learning-visual svg-visual" role="img" aria-label="Cadena articulada con sistemas de coordenadas">
          <svg viewBox="0 0 680 300">
            <path class="soft-grid" d="M30 250h620M80 40v230M200 40v230M320 40v230M440 40v230M560 40v230M30 190h620M30 130h620M30 70h620"/>
            <path class="mechanism" d="M105 230 255 172 405 96 560 145"/>
            <circle class="joint" cx="105" cy="230" r="15"/><circle class="joint" cx="255" cy="172" r="15"/><circle class="joint" cx="405" cy="96" r="15"/><circle class="end" cx="560" cy="145" r="12"/>
            <g class="axes"><path d="M105 230v-55m0 55h55"/><path d="M255 172v-55m0 55h55"/><path d="M405 96V41m0 55h55"/></g>
            <g class="visual-labels"><text x="87" y="266">Base</text><text x="230" y="205">Art. 1</text><text x="380" y="130">Art. 2</text><text x="535" y="181">Efector</text></g>
          </svg>
          <div class="visual-caption"><span>Sistemas de referencia</span><span>Eslabones</span><span>Transformaciones acumuladas</span></div>
        </div>`,
      bezier: `
        <div class="learning-visual svg-visual" role="img" aria-label="Trayectoria curva de Bézier con puntos de control">
          <svg viewBox="0 0 680 270">
            <path class="soft-grid" d="M25 225h630M70 30v215M190 30v215M310 30v215M430 30v215M550 30v215M25 165h630M25 105h630M25 45h630"/>
            <path class="control-line" d="M80 205 250 30 455 235 600 72"/>
            <path class="bezier-line" d="M80 205C250 30 455 235 600 72"/>
            <circle class="point main" cx="80" cy="205" r="9"/><circle class="point" cx="250" cy="30" r="8"/><circle class="point" cx="455" cy="235" r="8"/><circle class="point main" cx="600" cy="72" r="9"/>
            <g class="visual-labels"><text x="47" y="239">Inicio</text><text x="576" y="54">Destino</text><text x="210" y="60">Control</text><text x="465" y="222">Control</text></g>
          </svg>
        </div>`,
      'robotic-hand': `
        <div class="learning-visual hand-visual" role="img" aria-label="Esquema funcional de una mano robótica">
          <svg viewBox="0 0 680 320">
            <g class="finger f1"><rect x="210" y="38" width="38" height="72" rx="17"/><rect x="210" y="116" width="38" height="78" rx="17"/></g>
            <g class="finger f2"><rect x="270" y="20" width="38" height="82" rx="17"/><rect x="270" y="108" width="38" height="86" rx="17"/></g>
            <g class="finger f3"><rect x="330" y="34" width="38" height="72" rx="17"/><rect x="330" y="112" width="38" height="82" rx="17"/></g>
            <g class="finger f4"><rect x="390" y="64" width="38" height="62" rx="17"/><rect x="390" y="132" width="38" height="66" rx="17"/></g>
            <path class="palm" d="M190 190h255v70c0 28-22 50-50 50H240c-28 0-50-22-50-50z"/>
            <path class="thumb" d="m197 210-80-51c-16-10-20-31-10-47 11-16 32-19 47-8l73 55"/>
            <g class="tendons"><path d="M229 48v208M289 30v226M349 44v212M409 74v182M137 121l94 128"/></g>
            <rect class="servo" x="270" y="240" width="88" height="50" rx="10"/><circle class="servo-wheel" cx="314" cy="265" r="18"/>
            <g class="visual-labels"><text x="470" y="79">Falanges</text><text x="470" y="167">Articulaciones</text><text x="470" y="245">Cables</text><text x="470" y="283">Servomotor</text></g>
            <g class="label-lines"><path d="M454 74h-36M454 161h-69M454 239H350M454 277h-96"/></g>
          </svg>
        </div>`,
      'four-bar': `
        <div class="learning-visual svg-visual" role="img" aria-label="Mecanismo de cuatro barras">
          <svg viewBox="0 0 680 280">
            <path class="ground" d="M90 230h500"/>
            <path class="bar fixed" d="M145 220 525 220"/><path class="bar input" d="M145 220 245 105"/><path class="bar coupler" d="M245 105 465 72"/><path class="bar output" d="M465 72 525 220"/>
            <circle class="joint" cx="145" cy="220" r="13"/><circle class="joint" cx="245" cy="105" r="13"/><circle class="joint" cx="465" cy="72" r="13"/><circle class="joint" cx="525" cy="220" r="13"/>
            <path class="motion-arrow" d="M180 183c-25-15-34-42-22-66"/><path class="motion-arrow" d="m155 121 6-13 12 8"/>
            <g class="visual-labels"><text x="102" y="255">Fija</text><text x="160" y="131">Entrada</text><text x="326" y="72">Acoplador</text><text x="500" y="126">Salida</text></g>
          </svg>
        </div>`,
      'signal-pipeline': `
        <div class="learning-visual pipeline-visual" role="img" aria-label="Cadena de procesamiento de una señal bioeléctrica">
          ${['Cuerpo', 'Electrodos', 'Amplificar y filtrar', 'Interpretar', 'Mover'].map((label, index) => `<div class="pipeline-step"><span>${index + 1}</span><strong>${label}</strong>${index < 4 ? icon('arrow', 18) : ''}</div>`).join('')}
        </div>`,
      'ml-pipeline': `
        <div class="learning-visual pipeline-visual ml-visual" role="img" aria-label="Proceso de aprendizaje automático">
          ${['Ejemplos', 'Etiquetas', 'Entrenar', 'Evaluar', 'Predecir'].map((label, index) => `<div class="pipeline-step"><span>${index + 1}</span><strong>${label}</strong>${index < 4 ? icon('arrow', 18) : ''}</div>`).join('')}
        </div>`,
      canny: `
        <div class="learning-visual canny-visual" role="img" aria-label="Transformación de una imagen a un mapa de bordes">
          <div class="canny-panel original"><div class="canny-object"></div><span>Imagen</span></div>
          <div class="canny-arrow">${icon('arrow', 24)}</div>
          <div class="canny-panel blurred"><div class="canny-object"></div><span>Suavizado</span></div>
          <div class="canny-arrow">${icon('arrow', 24)}</div>
          <div class="canny-panel edges"><div class="canny-object"></div><span>Bordes</span></div>
        </div>`,
      'command-chain': `
        <div class="learning-visual pipeline-visual command-visual" role="img" aria-label="Cadena desde un comando hasta el movimiento">
          ${['Entrada', 'Validar', 'Estado', 'Controlador', 'Actuador'].map((label, index) => `<div class="pipeline-step"><span>${index + 1}</span><strong>${label}</strong>${index < 4 ? icon('arrow', 18) : ''}</div>`).join('')}
        </div>`,
      'control-loop': `
        <div class="learning-visual svg-visual" role="img" aria-label="Diagrama de control en lazo cerrado">
          <svg viewBox="0 0 680 260">
            <g class="control-blocks"><rect x="70" y="94" width="120" height="72" rx="14"/><rect x="280" y="94" width="120" height="72" rx="14"/><rect x="490" y="94" width="120" height="72" rx="14"/></g>
            <g class="visual-labels blocks"><text x="101" y="137">Objetivo</text><text x="304" y="137">Control</text><text x="519" y="137">Robot</text></g>
            <path class="flow" d="M190 130h90M400 130h90"/><path class="flow feedback" d="M550 166v55H130v-55"/>
            <path class="arrow-head" d="m269 124 11 6-11 6m210-12 11 6-11 6M141 172l-11-6 11-6"/>
            <text class="feedback-label" x="299" y="213">Medición / realimentación</text>
          </svg>
        </div>`,
      'gait-cycle': `
        <div class="learning-visual gait-visual" role="img" aria-label="Ciclo de marcha con fase de apoyo y balanceo">
          <div class="gait-track"><span class="support" style="--size:62%"><strong>Apoyo</strong><small>Contacto y transferencia de peso</small></span><span class="swing" style="--size:38%"><strong>Balanceo</strong><small>La pierna avanza</small></span></div>
          <div class="gait-steps">${['Contacto', 'Carga', 'Impulso', 'Despegue', 'Avance', 'Nuevo contacto'].map((step, index) => `<span><i>${index + 1}</i>${step}</span>`).join('')}</div>
        </div>`,
      lattice: `
        <div class="learning-visual lattice-visual" role="img" aria-label="Comparación entre una pieza maciza y una estructura lattice">
          <div><span class="solid-shape"></span><strong>Maciza</strong><small>Más material</small></div>
          <span class="versus">→</span>
          <div><span class="lattice-shape">${Array.from({ length: 20 }, () => '<i></i>').join('')}</span><strong>Lattice</strong><small>Material distribuido</small></div>
        </div>`,
      additive: `
        <div class="learning-visual additive-visual" role="img" aria-label="Proceso de impresión 3D por capas">
          <div class="printer-head"><span></span></div>
          <div class="extrusion-line"></div>
          <div class="printed-part">${Array.from({ length: 8 }, (_, index) => `<span style="--i:${index}"></span>`).join('')}</div>
          <div class="print-bed"></div>
          <div class="additive-labels"><span>Boquilla</span><span>Material fundido</span><span>Capas</span></div>
        </div>`
    };
    return visuals[type] || '';
  }

  function wordCount(text) {
    const trimmed = String(text || '').trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }

  function toggleBookmark(moduleId) {
    const bookmarked = state.bookmarks.includes(moduleId);
    state.bookmarks = bookmarked ? state.bookmarks.filter((id) => id !== moduleId) : [...state.bookmarks, moduleId];
    persistState();
    showToast(bookmarked ? 'Quitado de guardados' : 'Módulo guardado');
    rerenderPreserveScroll();
  }

  function toggleComplete(moduleId) {
    const complete = state.completed.includes(moduleId);
    state.completed = complete ? state.completed.filter((id) => id !== moduleId) : [...state.completed, moduleId];
    persistState();
    showToast(complete ? 'Módulo marcado como pendiente' : 'Módulo completado');
    rerenderPreserveScroll();
  }

  function rerenderPreserveScroll() {
    const y = window.scrollY;
    const route = routeInfo();
    if (route.page === 'modulo') renderModule(route.id);
    else if (route.page === 'examen') renderExam();
    else if (route.page === 'inicio') renderHome();
    window.scrollTo(0, y);
  }

  function openSidebar() {
    document.body.classList.add('sidebar-open');
    menuButton.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  function openSearch() {
    if (!searchDialog.open) searchDialog.showModal();
    globalSearchInput.value = '';
    renderSearchResults('');
    requestAnimationFrame(() => globalSearchInput.focus());
  }

  function closeSearch() {
    if (searchDialog.open) searchDialog.close();
  }

  function searchItems(query) {
    const term = normalize(query);
    if (term.length < 2) return [];
    const results = [];

    content.modules.forEach((module) => {
      const sectionText = module.sections.flatMap((section) => [section.title, ...(section.paragraphs || []), ...(section.bullets || [])]).join(' ');
      const conceptText = module.concepts.flatMap((concept) => [concept.term, concept.definition, concept.example]).join(' ');
      const corpus = normalize(`${module.title} ${module.summary} ${module.kicker} ${sectionText} ${conceptText}`);
      if (corpus.includes(term)) {
        const score = normalize(module.title).includes(term) ? 4 : normalize(conceptText).includes(term) ? 3 : 1;
        results.push({ type: 'Módulo', title: module.title, snippet: module.summary, href: `#/modulo/${module.id}`, icon: module.icon, score });
      }
    });

    content.glossary.forEach((item) => {
      const corpus = normalize(`${item.term} ${item.definition}`);
      if (corpus.includes(term)) {
        const score = normalize(item.term).startsWith(term) ? 5 : normalize(item.term).includes(term) ? 4 : 2;
        results.push({ type: 'Concepto', title: item.term, snippet: item.definition, href: `#/modulo/${item.module}`, icon: 'glossary', score });
      }
    });

    content.examQuestions.forEach((question) => {
      const corpus = normalize(`${question.title} ${question.prompt} ${question.key} ${question.recommendedTopics.join(' ')}`);
      if (corpus.includes(term)) {
        results.push({ type: `Pregunta ${question.number}`, title: question.title, snippet: question.key, href: '#/examen', icon: 'exam', score: 2 });
      }
    });

    const seen = new Set();
    return results
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'es'))
      .filter((item) => {
        const key = `${item.type}-${item.title}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 14);
  }

  function renderSearchResults(query) {
    const results = searchItems(query);
    if (normalize(query).length < 2) {
      globalSearchResults.innerHTML = `
        <div class="search-suggestions">
          <p>Probá con</p>
          <div>${['EMG', 'Denavit-Hartenberg', 'cuatro barras', 'FDM', 'ciclo de marcha'].map((term) => `<button type="button" data-search-suggestion="${term}">${term}</button>`).join('')}</div>
        </div>`;
      return;
    }
    globalSearchResults.innerHTML = results.length
      ? results.map((result) => `
          <a href="${result.href}" class="search-result-item" data-close-search>
            <span class="search-result-icon">${icon(result.icon, 20)}</span>
            <span><small>${escapeHTML(result.type)}</small><strong>${escapeHTML(result.title)}</strong><p>${escapeHTML(result.snippet)}</p></span>
            ${icon('arrow', 17)}
          </a>`).join('')
      : `<div class="empty-state">${icon('search', 27)}<h3>Sin resultados</h3><p>Probá con un término más general.</p></div>`;
  }

  function toggleTheme() {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem(THEME_KEY, next);
    document.getElementById('theme-icon').textContent = next === 'dark' ? '☀' : '◐';
  }

  function showToast(message) {
    const region = document.getElementById('toast-region');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `${icon('check', 17)}<span>${escapeHTML(message)}</span>`;
    region.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 220);
    }, 2200);
  }

  function resetProgress() {
    const confirmed = window.confirm('¿Querés borrar progreso, notas, borradores y tarjetas de este dispositivo? Esta acción no se puede deshacer.');
    if (!confirmed) return;
    state = { ...defaultState };
    localStorage.removeItem(STORAGE_KEY);
    ui.flashIndex = 0;
    ui.flashFlipped = false;
    renderShellProgress();
    renderAbout();
    showToast('Progreso reiniciado');
  }

  document.addEventListener('click', (event) => {
    const target = event.target.closest('button, a');
    if (!target) return;

    if (target.id === 'menu-button' || target.matches('[data-mobile-menu]')) {
      event.preventDefault();
      openSidebar();
      return;
    }
    if (target.id === 'sidebar-backdrop') {
      closeSidebar();
      return;
    }
    if (target.id === 'search-button') {
      openSearch();
      return;
    }
    if (target.id === 'search-close') {
      closeSearch();
      return;
    }
    if (target.id === 'theme-button') {
      toggleTheme();
      return;
    }
    if (target.matches('[data-close-search]')) {
      closeSearch();
    }
    if (target.matches('[data-search-suggestion]')) {
      const term = target.dataset.searchSuggestion;
      globalSearchInput.value = term;
      renderSearchResults(term);
      globalSearchInput.focus();
      return;
    }
    if (target.matches('[data-home-filter]')) {
      ui.homeFilter = target.dataset.homeFilter;
      document.querySelectorAll('[data-home-filter]').forEach((button) => {
        const active = button.dataset.homeFilter === ui.homeFilter;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', active);
      });
      const grid = document.getElementById('module-grid');
      if (grid) grid.innerHTML = renderModuleGrid();
      return;
    }
    if (target.matches('[data-bookmark]')) {
      event.preventDefault();
      toggleBookmark(target.dataset.bookmark);
      return;
    }
    if (target.matches('[data-complete]')) {
      toggleComplete(target.dataset.complete);
      return;
    }
    if (target.matches('[data-start-path]')) {
      navigate(`#/modulo/${target.dataset.startPath}`);
      return;
    }
    if (target.matches('[data-scroll-to]')) {
      const element = document.getElementById(target.dataset.scrollTo);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (target.matches('[data-quiz-id]')) {
      const id = target.dataset.quizId;
      const option = Number(target.dataset.option);
      state.quizAnswers[id] = option;
      persistState();
      rerenderPreserveScroll();
      return;
    }
    if (target.matches('[data-exam-select]')) {
      const moduleId = target.dataset.examSelect;
      const selected = state.examSelection.includes(moduleId);
      if (selected) {
        state.examSelection = state.examSelection.filter((id) => id !== moduleId);
      } else if (state.examSelection.length < 5) {
        state.examSelection = [...state.examSelection, moduleId];
      } else {
        showToast('Ya elegiste cinco etapas');
        return;
      }
      persistState();
      rerenderPreserveScroll();
      return;
    }
    if (target.matches('[data-suggest-five]')) {
      state.examSelection = ['seleccion', 'modelos-matematicos', 'diseno-robotico', 'motorizacion', 'simulacion'];
      persistState();
      rerenderPreserveScroll();
      showToast('Selección recomendada aplicada');
      return;
    }
    if (target.matches('[data-glossary-filter]')) {
      ui.glossaryFilter = target.dataset.glossaryFilter;
      document.querySelectorAll('[data-glossary-filter]').forEach((button) => {
        const active = button.dataset.glossaryFilter === ui.glossaryFilter;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', active);
      });
      updateGlossaryResults();
      return;
    }
    if (target.matches('[data-flash-filter]')) {
      ui.flashFilter = target.dataset.flashFilter;
      ui.flashIndex = 0;
      ui.flashFlipped = false;
      document.querySelectorAll('[data-flash-filter]').forEach((button) => {
        const active = button.dataset.flashFilter === ui.flashFilter;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', active);
      });
      renderFlashcardPanel();
      return;
    }
    if (target.matches('[data-flip-card]')) {
      ui.flashFlipped = !ui.flashFlipped;
      renderFlashcardPanel();
      return;
    }
    if (target.matches('[data-card-next]')) {
      const cards = filteredFlashcards();
      ui.flashIndex = (ui.flashIndex + 1) % cards.length;
      ui.flashFlipped = false;
      renderFlashcardPanel();
      return;
    }
    if (target.matches('[data-card-prev]')) {
      const cards = filteredFlashcards();
      ui.flashIndex = (ui.flashIndex - 1 + cards.length) % cards.length;
      ui.flashFlipped = false;
      renderFlashcardPanel();
      return;
    }
    if (target.matches('[data-card-rating]')) {
      state.flashcards[target.dataset.term] = target.dataset.cardRating;
      persistState();
      const cards = filteredFlashcards();
      if (cards.length) ui.flashIndex = (ui.flashIndex + 1) % cards.length;
      ui.flashFlipped = false;
      renderFlashcardPanel();
      showToast(target.dataset.cardRating === 'known' ? 'Concepto marcado como dominado' : 'Agregado a repaso');
      return;
    }
    if (target.matches('[data-reset-progress]')) {
      resetProgress();
      return;
    }
    if (target.matches('a[href^="#/"]')) {
      closeSidebar();
    }
  });

  document.addEventListener('input', (event) => {
    const target = event.target;
    if (target.id === 'global-search-input') {
      renderSearchResults(target.value);
      return;
    }
    if (target.id === 'glossary-search-input') {
      ui.glossaryQuery = target.value;
      updateGlossaryResults();
      return;
    }
    if (target.matches('[data-note-module]')) {
      const moduleId = target.dataset.noteModule;
      state.notes[moduleId] = target.value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      const count = document.querySelector(`[data-note-count="${moduleId}"]`);
      if (count) count.textContent = `${wordCount(target.value)} palabras`;
      return;
    }
    if (target.matches('[data-exam-draft]')) {
      const questionId = target.dataset.examDraft;
      state.examDrafts[questionId] = target.value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      const count = document.querySelector(`[data-draft-count="${questionId}"]`);
      if (count) count.textContent = `${wordCount(target.value)} palabras`;
    }
  });

  document.addEventListener('keydown', (event) => {
    const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
    if (isShortcut) {
      event.preventDefault();
      openSearch();
      return;
    }
    if (event.key === 'Escape' && document.body.classList.contains('sidebar-open')) {
      closeSidebar();
    }
    if (routeInfo().page === 'tarjetas' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        const cards = filteredFlashcards();
        if (cards.length) {
          ui.flashIndex = (ui.flashIndex + 1) % cards.length;
          ui.flashFlipped = false;
          renderFlashcardPanel();
        }
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const cards = filteredFlashcards();
        if (cards.length) {
          ui.flashIndex = (ui.flashIndex - 1 + cards.length) % cards.length;
          ui.flashFlipped = false;
          renderFlashcardPanel();
        }
      }
      if (event.key === ' ') {
        event.preventDefault();
        ui.flashFlipped = !ui.flashFlipped;
        renderFlashcardPanel();
      }
    }
  });

  searchDialog.addEventListener('click', (event) => {
    if (event.target === searchDialog) closeSearch();
  });

  window.addEventListener('hashchange', renderRoute);

  function init() {
    document.getElementById('theme-icon').textContent = document.documentElement.dataset.theme === 'dark' ? '☀' : '◐';
    renderShellProgress();
    if (!location.hash) location.hash = '#/inicio';
    else renderRoute();
  }

  init();
})();

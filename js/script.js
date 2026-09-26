/* PRAVO — interações em JavaScript puro, compatíveis com abertura local. */
(() => {
  'use strict';
  const config = window.PRAVO_CONFIG || {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = value => Math.min(1, Math.max(0, value));
  const smooth = (start, end, value) => {
    const t = clamp((value - start) / (end - start));
    return t * t * (3 - 2 * t);
  };
  const publicUrl = value => {
    try { const url = new URL(String(value).trim()); return /^https?:$/.test(url.protocol) ? url.href : null; }
    catch { return null; }
  };

  // Os destinos externos são definidos somente em site-config.js.
  document.querySelectorAll('[data-link]').forEach(link => {
    const schedule = link.dataset.link === 'agendamento';
    const url = publicUrl(schedule ? config.schedulingUrl : config.whatsappUrl);
    if (url) { link.href = url; link.hidden = false; }
    else { link.hidden = true; link.removeAttribute('href'); }
    link.addEventListener('click', () => {
      if (typeof window.fbq === 'function') window.fbq('track', schedule ? 'Schedule' : 'Contact');
    });
  });

  // META PIXEL — carregado apenas com ID válido e em site hospedado.
  // Abrir a página no computador não gera eventos de produção.
  const pixel = String(config.metaPixelId || '').trim();
  if (/^\d{5,30}$/.test(pixel) && /^https?:$/.test(location.protocol)) {
    if (!window.fbq) {
      const fbq = window.fbq = function () {
        fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
      };
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
      const script = document.createElement('script');
      script.async = true; script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }
    window.fbq('init', pixel);
    window.fbq('track', 'PageView');
  }

  // Glyph Portal © 2026 Christian Katzmann. MIT. Versão sem framework.
  const section = document.querySelector('[data-glyph-portal]');
  if (section) {
    const pin = section.querySelector('[data-gp-pin]');
    const artwork = section.querySelector('[data-gp-art]');
    const texts = artwork.querySelectorAll('text');
    const clipped = artwork.querySelector('rect');
    const field = section.querySelector('[data-gp-field]');
    const front = section.querySelector('[data-gp-front]');
    const content = section.querySelector('[data-gp-content]');
    let width = window.innerWidth, top = 0, frame = 0;
    const layout = () => {
      const compact = window.innerWidth <= 640;
      if (compact) {
        section.style.setProperty('--gp-pin-height', window.innerHeight + 'px');
        section.style.setProperty('--gp-section-height', window.innerHeight * 1.55 + 'px');
      } else {
        section.style.removeProperty('--gp-pin-height');
        section.style.removeProperty('--gp-section-height');
      }
      artwork.setAttribute('preserveAspectRatio', compact ? 'xMidYMid meet' : 'xMidYMid slice');
      top = section.getBoundingClientRect().top + window.scrollY;
    };
    const paint = () => {
      frame = 0;
      if (reduced.matches) {
        section.classList.remove('portal-ready');
        texts.forEach(text => text.removeAttribute('transform'));
        [field, front, content, clipped].forEach(el => el.removeAttribute('style'));
        content.inert = false;
        return;
      }
      section.classList.add('portal-ready');
      const travel = Math.max(1, section.offsetHeight - pin.offsetHeight);
      const progress = clamp((window.scrollY - top) / travel);
      const scale = Math.exp(Math.log(46) * smooth(.04, .76, progress));
      texts.forEach(text => text.setAttribute('transform', `translate(500 310) scale(${scale}) translate(-500 -310)`));
      clipped.style.opacity = smooth(.08, .22, progress);
      field.style.opacity = smooth(.68, .82, progress);
      front.style.opacity = 1 - smooth(.03, .18, progress);
      front.style.pointerEvents = progress < .08 ? 'auto' : 'none';
      content.style.opacity = smooth(.8, .94, progress);
      content.style.transform = `translateY(${(1 - smooth(.8, .94, progress)) * 28}px)`;
      content.style.pointerEvents = progress > .9 ? 'auto' : 'none';
      content.inert = progress <= .9;
      section.dataset.portalProgress = progress.toFixed(3);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    layout(); paint();
    window.addEventListener('scroll', schedule, {passive:true});
    window.addEventListener('resize', () => {
      // Mantém a altura no celular quando somente a barra do navegador muda.
      if (Math.abs(window.innerWidth - width) >= 48) { width = window.innerWidth; layout(); }
      schedule();
    }, {passive:true});
    reduced.addEventListener('change', () => { layout(); schedule(); });
  }

  const timeline = document.querySelector('.method-timeline');
  const scroller = document.querySelector('.method-timeline-viewport');
  if (scroller) { scroller.tabIndex = 0; scroller.setAttribute('aria-label', 'Etapas do método. Use as setas para explorar.'); }
  if (timeline && 'IntersectionObserver' in window && !reduced.matches) {
    timeline.classList.add('is-waiting');
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        timeline.classList.remove('is-waiting'); observer.disconnect();
      }
    }, {rootMargin:'0px 0px -15% 0px'});
    observer.observe(timeline);
    reduced.addEventListener('change', () => {
      if (reduced.matches) { timeline.classList.remove('is-waiting'); observer.disconnect(); }
    });
  }

  // Globo COBE incluído no pacote; nenhuma biblioteca é baixada para exibir o site.
  const canvas = document.querySelector('.magic-globe canvas');
  if (canvas && typeof window.createPravoGlobe === 'function') {
    let globe;
    try {
      const context = canvas.getContext('webgl2', {alpha:true, antialias:true}) || canvas.getContext('webgl', {alpha:true, antialias:true});
      if (!context) return; // Mantém a ilustração de fallback.
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const size = () => Math.max(1, canvas.offsetWidth);
      globe = window.createPravoGlobe(canvas, {
        width:size(), height:size(), devicePixelRatio:ratio,
        phi:0, theta:.24, dark:0, diffuse:.55, mapSamples:16000,
        mapBrightness:1.35, baseColor:[.96,.96,.97], markerColor:[.08,.08,.09], glowColor:[1,1,1],
        markers:[
          {location:[-23.5505,-46.6333],size:.11}, {location:[19.4326,-99.1332],size:.08},
          {location:[4.711,-74.0721],size:.07}, {location:[-34.6037,-58.3816],size:.07},
          {location:[-12.0464,-77.0428],size:.05}, {location:[40.7128,-74.006],size:.07},
          {location:[40.4168,-3.7038],size:.06}
        ]
      });
      canvas.style.opacity = '1';
      canvas.parentElement.classList.add('globe-ready');
      let phi = 0, dragging = false, lastX = 0, visible = true, frame = 0, lastTime = 0;
      const draw = () => globe.update({phi, width:size(), height:size()});
      const animate = time => {
        frame = 0;
        if (!visible || document.hidden || reduced.matches) { lastTime = 0; return; }
        if (!dragging) phi += Math.min(time - (lastTime || time), 50) * .00027;
        lastTime = time; draw(); frame = requestAnimationFrame(animate);
      };
      const start = () => { draw(); if (!frame) frame = requestAnimationFrame(animate); };
      canvas.addEventListener('pointerdown', event => {
        dragging = true; lastX = event.clientX; canvas.setPointerCapture(event.pointerId); canvas.style.cursor = 'grabbing';
      });
      canvas.addEventListener('pointermove', event => {
        if (dragging) { phi += (event.clientX - lastX) / 220; lastX = event.clientX; draw(); }
      });
      const release = () => { dragging = false; canvas.style.cursor = 'grab'; };
      canvas.addEventListener('pointerup', release); canvas.addEventListener('pointercancel', release);
      canvas.addEventListener('lostpointercapture', release);
      canvas.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault(); phi += event.key === 'ArrowRight' ? .15 : -.15; draw();
        }
      });
      window.addEventListener('resize', draw, {passive:true});
      document.addEventListener('visibilitychange', start); reduced.addEventListener('change', start);
      if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting; if (visible) start();
      }).observe(canvas);
      canvas.addEventListener('webglcontextlost', () => {
        visible = false; canvas.style.opacity = '0'; canvas.parentElement.classList.remove('globe-ready');
      });
      start();
    } catch (error) {
      console.warn('Não foi possível iniciar o globo interativo:', error);
      if (globe) globe.destroy();
      canvas.style.opacity = '0'; canvas.parentElement.classList.remove('globe-ready');
    }
  }
})();

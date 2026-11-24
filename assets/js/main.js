(() => {
  const C = window.CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const G = window.gsap || null; // GSAP vem do CDN; sem ele o site funciona, só sem as animações finas
  const DEMO = new URLSearchParams(location.search).has("demo");
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));
  const start = new Date(C.inicio);
  const nf = new Intl.NumberFormat("pt-BR");
  const fmtDate = (d) => d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
  const DAY = 864e5;
  if (G && window.ScrollTrigger) G.registerPlugin(ScrollTrigger);
  if (G && window.Draggable) G.registerPlugin(Draggable);

  /* ============ conteúdo de exemplo (só com ?demo) ============ */
  const fotos = [...C.fotos];
  const bilhetes = [...(C.bilhetes || [])];
  const marcos = [...(C.marcos || [])];
  if (DEMO) {
    for (let i = 1; i <= 5; i++) fotos.push({ placeholder: true, legenda: "legenda" });
    bilhetes.push(
      "Exemplo: porque você ri das minhas piadas, até das ruins.",
      "Exemplo: pelo jeito que você me olha quando acha que eu não estou vendo.",
      "Exemplo: porque com você até um dia comum vira um dia bom."
    );
    marcos.push(
      { data: "2022-06-12", titulo: "Exemplo: primeiro Dia dos Namorados", texto: "Troque pelos momentos de vocês no config.js.", placeholder: true },
      { data: "2023-12-20", titulo: "Exemplo: nossa primeira viagem", texto: "Um momento sem foto fica assim." }
    );
  }

  /* ============ nomes ============ */
  $$("[data-name-him]").forEach((el) => (el.textContent = C.ele));
  $$("[data-name-her]").forEach((el) => (el.textContent = C.ela));
  document.title = `${C.ele} & ${C.ela}`;
  $("#endSince").textContent = `desde ${fmtDate(start)}`;

  /* ============ contador ============ */
  function addMonths(date, n) {
    const d = new Date(date);
    const day = d.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth() + n);
    d.setDate(Math.min(day, new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()));
    return d;
  }
  function diff(from, to) {
    let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
    if (addMonths(from, months) > to) months--;
    let ms = to - addMonths(from, months);
    const dias = Math.floor(ms / DAY); ms -= dias * DAY;
    const horas = Math.floor(ms / 36e5); ms -= horas * 36e5;
    const minutos = Math.floor(ms / 6e4); ms -= minutos * 6e4;
    return { totalMonths: months, anos: Math.floor(months / 12), meses: months % 12, dias, horas, minutos, segundos: Math.floor(ms / 1e3) };
  }
  const word = { anos: ["ano", "anos"], meses: ["mês", "meses"], dias: ["dia", "dias"] };
  const plural = (n, k) => `${n} ${word[k][n === 1 ? 0 : 1]}`;
  const U = Object.fromEntries($$("[data-u]").map((el) => [el.dataset.u, el]));
  const L = Object.fromEntries($$("[data-l]").map((el) => [el.dataset.l, el]));
  const anniversary = (n) => { const d = new Date(start); d.setFullYear(start.getFullYear() + n); return d; };
  function nextAnniversary(now) {
    let n = 1;
    while (anniversary(n) <= now) n++;
    return { date: anniversary(n), years: n };
  }

  function tick() {
    const now = new Date();
    const t = diff(start, now);
    for (const k of ["anos", "meses", "dias"]) {
      U[k].textContent = t[k];
      L[k].textContent = word[k][t[k] === 1 ? 0 : 1] + (k === "dias" ? "" : ",");
    }
    for (const k of ["horas", "minutos", "segundos"]) U[k].textContent = String(t[k]).padStart(2, "0");
    $("#today").textContent = fmtDate(now);
    $("#spanShort").textContent = `${plural(t.anos, "anos")}, ${plural(t.meses, "meses")} e ${plural(t.dias, "dias")}`;
    const totalDays = Math.floor((now - start) / DAY);
    $("#psDays").textContent = nf.format(totalDays);
    $("#psMonths").textContent = nf.format(t.totalMonths);
    $("#psMoons").textContent = nf.format(Math.floor(totalDays / 29.530589));
    const n = nextAnniversary(now);
    const left = Math.ceil((n.date - now) / DAY);
    $("#psLeft").textContent = left === 1 ? "só 1 dia" : `${nf.format(left)} dias`;
    $("#psYears").textContent = n.years;
    $("#psDate").textContent = fmtDate(n.date);
  }
  tick();
  setInterval(tick, 1000);

  /* ============ foto revelada ============ */
  function makePhoto(p, alt) {
    const fig = document.createElement("figure");
    fig.className = "photo";
    if (p.placeholder) {
      const ph = document.createElement("div");
      ph.className = "photo__ph";
      ph.textContent = "sua foto aqui";
      fig.appendChild(ph);
    } else {
      const img = document.createElement("img");
      img.src = p.src || p.foto;
      img.alt = p.legenda || alt || "";
      img.loading = "lazy";
      img.decoding = "async";
      img.draggable = false;
      fig.appendChild(img);
    }
    const cap = document.createElement("figcaption");
    cap.textContent = p.legenda || "";
    fig.appendChild(cap);
    return fig;
  }

  /* ============ nossa história ============ */
  const storyItems = (() => {
    const now = new Date();
    const key = (d) => d.toISOString().slice(0, 10);
    const map = new Map();
    for (let n = 1; ; n++) {
      const d = anniversary(n);
      if (d <= now) {
        map.set(key(d), { date: d, titulo: n === 1 ? "Nosso primeiro ano" : `${n} anos juntos`, texto: `${nf.format(Math.round((d - start) / DAY))} dias lado a lado.` });
      } else {
        const left = Math.ceil((d - now) / DAY);
        map.set(key(d), { date: d, futuro: true, titulo: `Nossos ${n} anos`, texto: left === 1 ? "Falta só 1 dia." : `Faltam ${nf.format(left)} dias.` });
        break;
      }
    }
    for (const m of marcos) {
      const d = new Date(m.data + "T12:00:00");
      const prev = map.get(key(d));
      map.set(key(d), { ...prev, date: d, titulo: m.titulo, texto: m.texto, foto: m.foto, placeholder: m.placeholder, futuro: false });
    }
    return [...map.values()].sort((a, b) => a.date - b.date);
  })();

  const storyList = $("#storyList");
  storyItems.forEach((m, i) => {
    const li = document.createElement("li");
    li.className = "story__item" + (m.futuro ? " is-future" : "");
    li.innerHTML = '<span class="story__dot" aria-hidden="true"></span><div class="story__text"><time></time><h3></h3><p></p></div>';
    li.querySelector("time").textContent = fmtDate(m.date);
    li.querySelector("time").dateTime = m.date.toISOString().slice(0, 10);
    li.querySelector("h3").textContent = m.titulo;
    li.querySelector("p").textContent = m.texto || "";
    if (m.foto || m.placeholder) {
      const media = document.createElement("div");
      media.className = "story__media";
      const fig = makePhoto({ src: m.foto, placeholder: m.placeholder }, m.titulo);
      fig.style.setProperty("--r", `${i % 2 ? -2.4 : 2.1}deg`);
      fig.dataset.r = i % 2 ? -2.4 : 2.1;
      media.appendChild(fig);
      li.appendChild(media);
    }
    storyList.appendChild(li);
  });

  function initStoryMotion() {
    if (!G || !window.ScrollTrigger || reduceMotion) {
      $$(".story__item").forEach((li) => li.classList.add("is-passed"));
      return;
    }
    G.to("#storyInk", {
      scaleY: 1, ease: "none",
      scrollTrigger: { trigger: ".story__body", start: "top 62%", end: "bottom 62%", scrub: 0.5 },
    });
    $$(".story__item").forEach((li) => {
      const text = li.querySelector(".story__text");
      const photo = li.querySelector(".photo");
      G.set(text, { opacity: 0.25 });
      ScrollTrigger.create({
        trigger: li, start: "top 62%",
        onEnter: () => { li.classList.add("is-passed"); G.to(text, { opacity: 1, duration: 0.6, ease: "power2.out" }); },
        onLeaveBack: () => { li.classList.remove("is-passed"); G.to(text, { opacity: 0.25, duration: 0.4 }); },
      });
      if (photo) {
        const r = +photo.dataset.r;
        G.fromTo(photo,
          { y: -70, rotation: r + (r > 0 ? 9 : -9), scale: 1.1, opacity: 0 },
          { y: 0, rotation: r, scale: 1, opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: li, start: "top 78%", once: true } });
      }
    });
  }

  /* ============ pilha de fotos ============ */
  const stack = $("#stack");
  const cards = [];
  let order = [];
  if (fotos.length >= 2) {
    $("#fotos").hidden = false;
    const tilts = [-3.2, 2.6, -1.4, 3.6, -2.4, 1.8, -3.8, 2.2];
    fotos.forEach((p, i) => {
      const fig = makePhoto(p, `Foto ${i + 1}`);
      fig.dataset.r = tilts[i % tilts.length];
      stack.appendChild(fig);
      cards.push(fig);
      order.push(i);
    });
  }
  const setCard = (el, v, dur) => {
    if (G) return G.to(el, { ...v, duration: reduceMotion ? 0 : dur, ease: "power3.out", overwrite: "auto" });
    el.style.transform = `translate(${v.x}px, ${v.y}px) rotate(${v.rotation}deg) scale(${v.scale})`;
    el.style.opacity = v.opacity;
  };
  function layoutStack(dur = 0.6) {
    order.forEach((idx, pos) => {
      const el = cards[idx];
      el.style.zIndex = cards.length - pos;
      const r = +el.dataset.r;
      setCard(el, {
        x: pos === 0 ? 0 : (pos % 2 ? 10 : -10) * Math.min(pos, 2),
        y: pos * 7,
        rotation: pos === 0 ? r * 0.35 : r,
        scale: 1 - Math.min(pos, 3) * 0.035,
        opacity: pos < 4 ? 1 : 0,
      }, dur);
      el.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
    });
    drags.forEach((d, i) => (i === order[0] ? d.enable() : d.disable()));
    if (cards.length) $("#stackCount").textContent = `${order[0] + 1} de ${cards.length}`;
  }
  let stackBusy = false;
  function throwTop(dir) {
    if (stackBusy || cards.length < 2) return;
    stackBusy = true;
    const el = cards[order[0]];
    const w = stack.offsetWidth;
    play("whisk");
    const done = () => {
      order.push(order.shift());
      el.style.zIndex = 0;
      layoutStack(0.7);
      setTimeout(() => (stackBusy = false), 250);
    };
    if (!G || reduceMotion) return done();
    G.to(el, { x: dir * w * 1.25, y: -24, rotation: dir * 22, duration: 0.42, ease: "power2.in", overwrite: "auto", onComplete: done });
  }
  function bringBack() {
    if (stackBusy || cards.length < 2) return;
    stackBusy = true;
    const idx = order.pop();
    order.unshift(idx);
    const el = cards[idx];
    el.style.zIndex = cards.length + 1;
    play("whisk");
    if (G && !reduceMotion) G.set(el, { x: -stack.offsetWidth * 1.25, y: -24, rotation: -22, opacity: 1 });
    layoutStack(0.6);
    setTimeout(() => (stackBusy = false), 500);
  }
  const drags = [];
  if (cards.length && G && window.Draggable) {
    cards.forEach((el) => {
      const [d] = Draggable.create(el, {
        type: "x",
        allowNativeTouchScrolling: true,
        onDrag() { G.set(this.target, { rotation: +this.target.dataset.r * 0.35 + this.x / 16 }); },
        onRelease() {
          const w = stack.offsetWidth;
          if (Math.abs(this.x) > w * 0.28) throwTop(Math.sign(this.x));
          else layoutStack(0.5);
        },
      });
      drags.push(d);
    });
  }
  $("#stackNext").addEventListener("click", () => throwTop(1));
  $("#stackPrev").addEventListener("click", bringBack);
  stack.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") throwTop(1);
    if (e.key === "ArrowLeft") bringBack();
  });
  if (cards.length) { stack.tabIndex = 0; stack.setAttribute("aria-label", "Pilha de fotos. Use as setas para trocar de foto."); layoutStack(0); }

  /* ============ bilhetes ============ */
  const note = $("#note");
  const noteTop = $(".note__half--top");
  const noteBtn = $("#noteBtn");
  let noteOrder = [];
  let notePos = 0;
  let noteBusy = false;
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  if (bilhetes.length) {
    $("#bilhetes").hidden = false;
    noteOrder = shuffle(bilhetes.map((_, i) => i));
  }
  noteBtn.addEventListener("click", async () => {
    if (noteBusy || !bilhetes.length) return;
    noteBusy = true;
    if (notePos >= noteOrder.length) {
      noteOrder = shuffle(noteOrder);
      notePos = 0;
      $(".notes__pile").classList.remove("is-empty");
    }
    const anim = !!G && !reduceMotion;
    if (!note.hidden && anim) {
      play("whisk");
      await G.to(note, { x: 220, y: -30, rotation: 14, opacity: 0, duration: 0.45, ease: "power2.in" });
    }
    const text = bilhetes[noteOrder[notePos]];
    $$(".note__content", note).forEach((el) => (el.textContent = text));
    notePos++;
    $("#noteCount").textContent = `${notePos} de ${noteOrder.length}`;
    noteBtn.textContent = notePos >= noteOrder.length ? "Ler de novo" : "Tirar outro bilhete";
    if (notePos >= noteOrder.length) $(".notes__pile").classList.add("is-empty");
    note.hidden = false;

    if (!anim) { noteBusy = false; return; }
    const stageH = $("#noteStage").offsetHeight;
    G.set(note, { x: 0, y: stageH - note.offsetHeight * 0.5 - 30, scale: 0.42, rotation: -6, opacity: 1 });
    G.set(noteTop, { rotationX: -180 });
    play("paper", 0.25);
    const tl = G.timeline({ onComplete: () => (noteBusy = false) });
    tl.to(note, { y: 0, scale: 1, rotation: (Math.random() * 3 - 1.5), duration: 0.8, ease: "power3.out" })
      .add(() => play("fold"), "-=0.15")
      .to(noteTop, { rotationX: 0, duration: 0.85, ease: "power2.inOut" }, "-=0.15");
  });

  /* ============ efeitos sonoros (sintetizados) ============ */
  let ac = null;
  function audioCtx() {
    if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (A) ac = new A(); }
    if (ac && ac.state === "suspended") ac.resume();
    return ac;
  }
  let noise = null;
  function noiseBuf(ctx) {
    if (noise) return noise;
    noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return noise;
  }
  function burst(ctx, { at = 0, dur = 0.1, type = "bandpass", freq = 2000, Q = 1, gain = 0.3, attack = 0.002 }) {
    const t = ctx.currentTime + at;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf(ctx);
    const f = ctx.createBiquadFilter();
    f.type = type; f.frequency.value = freq; f.Q.value = Q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(ctx.destination);
    src.start(t, Math.random()); src.stop(t + dur + 0.05);
  }
  const sfx = {
    crack(ctx) {
      burst(ctx, { dur: 0.09, freq: 2600, Q: 0.8, gain: 0.55 });
      burst(ctx, { dur: 0.16, type: "lowpass", freq: 260, Q: 0.7, gain: 0.7 });
      burst(ctx, { at: 0.035, dur: 0.05, freq: 3800, Q: 2, gain: 0.3 });
      burst(ctx, { at: 0.08, dur: 0.04, freq: 3100, Q: 2, gain: 0.18 });
    },
    paper(ctx, len = 0.7) {
      for (let s = 0; s < len; s += 0.03 + Math.random() * 0.05) {
        burst(ctx, { at: s, dur: 0.05 + Math.random() * 0.08, freq: 1500 + Math.random() * 3000, Q: 0.6 + Math.random(), gain: 0.05 + Math.random() * 0.12 });
      }
    },
    fold(ctx) {
      for (let s = 0; s < 0.42; s += 0.02 + Math.random() * 0.04) {
        burst(ctx, { at: s, dur: 0.04 + Math.random() * 0.07, freq: 900 + Math.random() * 2600, Q: 0.7 + Math.random(), gain: 0.06 + Math.random() * 0.14 });
      }
      burst(ctx, { at: 0.5, dur: 0.14, type: "lowpass", freq: 380, Q: 0.6, gain: 0.35 });
    },
    whoosh(ctx) { burst(ctx, { dur: 0.7, type: "lowpass", freq: 700, Q: 0.4, gain: 0.22, attack: 0.25 }); },
    whisk(ctx) { burst(ctx, { dur: 0.3, freq: 2400, Q: 0.5, gain: 0.12, attack: 0.08 }); },
    slide(ctx) {
      burst(ctx, { dur: 1.0, freq: 1100, Q: 0.5, gain: 0.16, attack: 0.35 });
      burst(ctx, { at: 0.1, dur: 0.8, type: "highpass", freq: 4000, Q: 0.3, gain: 0.05, attack: 0.3 });
    },
  };
  function play(name, ...a) { const ctx = audioCtx(); if (ctx) sfx[name](ctx, ...a); }

  /* ============ música (toca-discos) ============ */
  const audio = $("#audio");
  const vinyl = $("#musicBtn");
  const tag = $("#musicTag");
  const vol = C.musica?.volume ?? 0.6;
  if (C.musica?.arquivo) audio.src = C.musica.arquivo;
  tag.textContent = C.musica?.titulo || "";
  function fade(to, ms) {
    const from = audio.volume, t0 = performance.now();
    return new Promise((res) => (function step(t) {
      const k = Math.min(1, (t - t0) / ms);
      audio.volume = from + (to - from) * k;
      k < 1 ? requestAnimationFrame(step) : res();
    })(t0));
  }
  const setPaused = (p) => {
    vinyl.classList.toggle("is-paused", p);
    vinyl.setAttribute("aria-label", p ? "Tocar música" : "Pausar música");
  };
  function primeMusic() {
    if (!audio.src) return;
    audio.volume = 0;
    audio.play().then(() => audio.pause()).catch(() => {});
  }
  async function startMusic() {
    try {
      audio.volume = 0;
      await audio.play();
      vinyl.hidden = false;
      setPaused(false);
      fade(vol, 3000);
      if (tag.textContent) { tag.classList.add("is-shown"); setTimeout(() => tag.classList.remove("is-shown"), 4500); }
    } catch {
      if (DEMO) { vinyl.hidden = false; setPaused(true); }
    }
  }
  vinyl.addEventListener("click", async () => {
    try {
      if (audio.paused) { await audio.play(); setPaused(false); fade(vol, 800); }
      else { await fade(0, 400); audio.pause(); setPaused(true); }
    } catch { setPaused(true); }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !audio.paused) { audio.pause(); audio.dataset.resume = "1"; }
    else if (!document.hidden && audio.dataset.resume) { audio.play().catch(() => {}); delete audio.dataset.resume; }
  });

  /* ============ abrir a carta ============ */
  history.scrollRestoration = "manual";
  const intro = $("#intro");
  const env = $("#envelope");
  const tilt = $("#tilt");
  const seal = $("#seal");
  const envLetter = $("#envLetter");
  const desk = $("#desk");
  const sheet = $("#sheet");
  const waapi = (el, kf, opt) => el.animate(kf, { fill: "forwards", ...opt });
  let opening = false;

  if (!reduceMotion && matchMedia("(hover: hover)").matches) {
    addEventListener("pointermove", (e) => {
      if (opening) return;
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      tilt.style.transform = `rotateX(${(-y * 12).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg)`;
    });
  }

  function breakSeal() {
    const svg = seal.querySelector("svg");
    const halves = ["l", "r"].map((side) => {
      const h = document.createElement("div");
      h.className = `seal-half seal-half--${side}`;
      h.appendChild(svg.cloneNode(true));
      seal.appendChild(h);
      return h;
    });
    svg.style.visibility = "hidden";
    const fall = (el, dx, rot, delay) =>
      waapi(el, [
        { transform: "translate(0,0) rotate(0)" },
        { transform: `translate(${dx * 0.35}px, -6px) rotate(${rot * 0.2}deg)`, offset: 0.18 },
        { transform: `translate(${dx}px, 240px) rotate(${rot}deg)`, opacity: 0 },
      ], { duration: 950, delay, easing: "cubic-bezier(.45,0,.8,.55)" });
    fall(halves[0], -70, -55, 0);
    fall(halves[1], 80, 70, 40);
    const size = seal.offsetWidth;
    for (let i = 0; i < 14; i++) {
      const c = document.createElement("i");
      c.className = "crumb";
      const s = 2 + Math.random() * 5;
      Object.assign(c.style, { width: s + "px", height: s * (0.7 + Math.random() * 0.5) + "px", margin: `${-s / 2}px 0 0 ${-s / 2}px` });
      seal.appendChild(c);
      const a = Math.random() * Math.PI * 2, r = size * (0.35 + Math.random() * 0.6);
      const dx = Math.cos(a) * r, dy = Math.sin(a) * r * 0.6;
      waapi(c, [
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy - 18}px) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: 0.35 },
        { transform: `translate(${dx * 1.3}px, ${dy + 160 + Math.random() * 80}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
      ], { duration: 800 + Math.random() * 400, easing: "cubic-bezier(.3,.5,.6,1)" });
    }
    waapi(tilt, [
      { transform: "translateY(0) scale(1)" },
      { transform: "translateY(4px) scale(.992)", offset: 0.3 },
      { transform: "translateY(0) scale(1)" },
    ], { duration: 380, easing: "ease-out", fill: "none" });
  }

  function buildFold() {
    const sr = sheet.getBoundingClientRect();
    const lr = envLetter.getBoundingClientRect();
    const W = sr.width;
    const ph = Math.round((W * lr.height) / lr.width);
    sheet.style.setProperty("--ph", ph + "px");
    sheet.classList.add("has-creases");

    const fold = document.createElement("div");
    fold.className = "fold";
    Object.assign(fold.style, { left: sr.left + "px", top: sr.top + "px", width: W + "px", height: ph * 3 + "px" });
    const panels = [0, 1, 2].map((k) => {
      const p = document.createElement("div");
      p.className = `fold__panel fold__panel--${k}`;
      Object.assign(p.style, { top: k * ph + "px", height: ph + "px" });
      const inner = document.createElement("div");
      inner.className = "fold__face fold__face--in";
      const clone = sheet.cloneNode(true);
      clone.removeAttribute("id");
      clone.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
      Object.assign(clone.style, { width: W + "px", top: -k * ph + "px" });
      inner.appendChild(clone);
      const shade = document.createElement("i");
      shade.className = "fold__shade";
      inner.appendChild(shade);
      p.appendChild(inner);
      if (k !== 1) {
        const out = document.createElement("div");
        out.className = "fold__face fold__face--out";
        if (k === 0) {
          const name = document.createElement("span");
          name.className = "hand";
          name.textContent = C.ela;
          name.style.fontSize = (parseFloat(getComputedStyle(envLetter).fontSize) * W) / lr.width + "px";
          out.appendChild(name);
        }
        p.appendChild(out);
      }
      fold.appendChild(p);
      return { p, shade };
    });
    panels[0].p.style.transform = "translateZ(2px) rotateX(-180deg)";
    panels[2].p.style.transform = "translateZ(1px) rotateX(180deg)";
    const a = lr.width / W;
    const from = `translate(${lr.left - sr.left}px, ${lr.top - sr.top - ph * a}px) scale(${a})`;
    fold.style.transform = from;
    document.body.appendChild(fold);
    const s0 = Math.min(1, (innerHeight * 0.84) / (ph * 3), (innerWidth * 0.9) / W);
    const center = `translate(${innerWidth / 2 - sr.left - (s0 * W) / 2}px, ${innerHeight / 2 - sr.top - s0 * 1.5 * ph}px) scale(${s0})`;
    const unfold = (i, fromRot) => Promise.all([
      waapi(panels[i].p, [{ transform: `translateZ(${i === 0 ? 2 : 1}px) rotateX(${fromRot}deg)` }, { transform: "translateZ(0) rotateX(0deg)" }],
        { duration: 820, easing: "cubic-bezier(.55,.05,.25,1)" }).finished,
      waapi(panels[i].shade, [{ opacity: 0.6 }, { opacity: 0.25, offset: 0.6 }, { opacity: 0 }], { duration: 820 }).finished,
      waapi(panels[1].shade, [{ opacity: 0.25 }, { opacity: 0 }], { duration: 700, easing: "ease-out" }).finished,
    ]);
    return {
      el: fold,
      toCenter: () => waapi(fold, [{ transform: from }, { transform: center }], { duration: 1000, easing: "cubic-bezier(.6,0,.25,1)" }).finished,
      unfoldTop: () => unfold(0, -180),
      unfoldBottom: () => unfold(2, 180),
      toSheet: () => waapi(fold, [{ transform: center }, { transform: "translate(0,0) scale(1)" }], { duration: 1100, easing: "cubic-bezier(.6,0,.2,1)" }).finished,
    };
  }

  let scrollReady = false;
  function revealDesk() {
    document.body.classList.remove("is-sealed");
    desk.removeAttribute("aria-hidden");
    desk.classList.add("is-in");
    if (!scrollReady) {
      scrollReady = true;
      initStoryMotion();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }
  }

  seal.addEventListener("click", async () => {
    if (opening) return;
    opening = true;
    audioCtx();
    primeMusic();
    window.scrollTo(0, 0);
    tilt.style.transform = "";
    intro.classList.add("is-opening");

    if (reduceMotion) {
      startMusic();
      intro.classList.add("is-gone");
      revealDesk();
      return;
    }

    await waapi(seal, [{ transform: "scale(1)" }, { transform: "scale(.9)" }], { duration: 110, easing: "ease-out" }).finished;
    play("crack");
    breakSeal();
    await wait(420);

    play("paper", 0.6);
    env.classList.add("is-flap-open");
    await wait(520);
    env.classList.add("is-flap-back");
    await wait(420);

    play("slide");
    intro.classList.add("is-rising");
    startMusic();
    await wait(1050);

    const fold = buildFold();
    envLetter.style.visibility = "hidden";
    play("whoosh");
    waapi(env, [{ transform: "translateY(46%)" }, { transform: "translateY(130vh) rotate(9deg)" }], { duration: 1000, easing: "cubic-bezier(.55,0,.8,.4)" });
    $("#hint").style.display = "none";
    await fold.toCenter();
    await wait(150);

    play("fold");
    await fold.unfoldTop();
    await wait(80);
    play("fold");
    await fold.unfoldBottom();
    await wait(250);

    const settle = fold.toSheet();
    setTimeout(revealDesk, 500);
    await settle;
    intro.remove();
    await waapi(fold.el, [{ opacity: 1 }, { opacity: 0 }], { duration: 350 }).finished;
    fold.el.remove();
  });

  $("#again").addEventListener("click", async () => {
    if (!audio.paused) await fade(0, 600);
    window.scrollTo(0, 0);
    location.reload();
  });
})();

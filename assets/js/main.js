(() => {
  const C = window.CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));
  const start = new Date(C.inicio);
  const nf = new Intl.NumberFormat("pt-BR");
  const fmtDate = (d) => d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });

  /* ---------- nomes ---------- */
  $$("[data-name-him]").forEach((el) => (el.textContent = C.ele));
  $$("[data-name-her]").forEach((el) => (el.textContent = C.ela));
  document.title = `${C.ele} & ${C.ela}`;

  /* ---------- diferença de calendário ---------- */
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
    const dias = Math.floor(ms / 864e5); ms -= dias * 864e5;
    const horas = Math.floor(ms / 36e5); ms -= horas * 36e5;
    const minutos = Math.floor(ms / 6e4); ms -= minutos * 6e4;
    return { totalMonths: months, anos: Math.floor(months / 12), meses: months % 12, dias, horas, minutos, segundos: Math.floor(ms / 1e3) };
  }
  const word = { anos: ["ano", "anos"], meses: ["mês", "meses"], dias: ["dia", "dias"] };
  const plural = (n, k) => `${n} ${word[k][n === 1 ? 0 : 1]}`;

  const U = Object.fromEntries($$("[data-u]").map((el) => [el.dataset.u, el]));
  const L = Object.fromEntries($$("[data-l]").map((el) => [el.dataset.l, el]));

  function nextAnniversary(now) {
    const d = new Date(start);
    d.setFullYear(now.getFullYear());
    if (d <= now) d.setFullYear(now.getFullYear() + 1);
    return { date: d, years: d.getFullYear() - start.getFullYear() };
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

    const totalDays = Math.floor((now - start) / 864e5);
    $("#psDays").textContent = nf.format(totalDays);
    $("#psMonths").textContent = nf.format(t.totalMonths);
    $("#psMoons").textContent = nf.format(Math.floor(totalDays / 29.530589));
    const n = nextAnniversary(now);
    const left = Math.ceil((n.date - now) / 864e5);
    $("#psLeft").textContent = left === 1 ? "só 1 dia" : `${nf.format(left)} dias`;
    $("#psYears").textContent = n.years;
    $("#psDate").textContent = fmtDate(n.date);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- linha do tempo ---------- */
  if (C.marcos.length >= 2) {
    const ol = $("#story");
    C.marcos.slice().sort((a, b) => a.data.localeCompare(b.data)).forEach((m) => {
      const li = document.createElement("li");
      li.innerHTML = `<time></time><div><h3></h3><p></p>${m.foto ? '<img loading="lazy" alt="">' : ""}</div>`;
      li.querySelector("time").textContent = fmtDate(new Date(m.data + "T12:00:00"));
      li.querySelector("h3").textContent = m.titulo;
      li.querySelector("p").textContent = m.texto;
      if (m.foto) li.querySelector("img").src = m.foto;
      ol.appendChild(li);
    });
    $("#historia").hidden = false;
  }

  /* ---------- fotos + lightbox ---------- */
  const photos = C.fotos;
  if (photos.length >= 2) {
    const wrap = $("#galeria");
    const tilts = [-2.2, 1.4, -0.8, 2, -1.6, 0.9];
    photos.forEach((p, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.style.setProperty("--r", `${tilts[i % tilts.length]}deg`);
      b.innerHTML = '<img loading="lazy" alt=""><span></span>';
      b.querySelector("img").src = p.src;
      b.querySelector("img").alt = p.legenda || `Foto ${i + 1}`;
      b.querySelector("span").textContent = p.legenda || "";
      b.addEventListener("click", () => openLb(i));
      wrap.appendChild(b);
    });
    wrap.hidden = false;
  }
  const lb = $("#lightbox");
  let lbIdx = 0;
  const showLb = (i) => {
    lbIdx = (i + photos.length) % photos.length;
    $("#lbImg").src = photos[lbIdx].src;
    $("#lbImg").alt = photos[lbIdx].legenda || "";
    $("#lbCap").textContent = photos[lbIdx].legenda || "";
  };
  const openLb = (i) => { showLb(i); lb.hidden = false; $("#lbClose").focus(); };
  const closeLb = () => (lb.hidden = true);
  $("#lbClose").onclick = closeLb;
  $("#lbPrev").onclick = () => showLb(lbIdx - 1);
  $("#lbNext").onclick = () => showLb(lbIdx + 1);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") showLb(lbIdx - 1);
    if (e.key === "ArrowRight") showLb(lbIdx + 1);
  });
  let tx = null;
  lb.addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) showLb(lbIdx + (dx < 0 ? 1 : -1));
    tx = null;
  });

  /* ---------- efeitos sonoros (sintetizados, sem arquivos) ---------- */
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
      burst(ctx, { at: 0.5, dur: 0.14, type: "lowpass", freq: 380, Q: 0.6, gain: 0.35 }); // papel assentando
    },
    whoosh(ctx) {
      burst(ctx, { dur: 0.7, type: "lowpass", freq: 700, Q: 0.4, gain: 0.22, attack: 0.25 });
    },
    slide(ctx) {
      burst(ctx, { dur: 1.0, freq: 1100, Q: 0.5, gain: 0.16, attack: 0.35 });
      burst(ctx, { at: 0.1, dur: 0.8, type: "highpass", freq: 4000, Q: 0.3, gain: 0.05, attack: 0.3 });
    },
  };
  const play = (name, ...a) => { const ctx = audioCtx(); if (ctx) sfx[name](ctx, ...a); };

  /* ---------- música ---------- */
  const audio = $("#audio");
  const musicBtn = $("#musicBtn");
  const vol = C.musica?.volume ?? 0.6;
  if (C.musica?.arquivo) audio.src = C.musica.arquivo;
  function fade(to, ms) {
    const from = audio.volume, t0 = performance.now();
    return new Promise((res) => (function step(t) {
      const k = Math.min(1, (t - t0) / ms);
      audio.volume = from + (to - from) * k;
      k < 1 ? requestAnimationFrame(step) : res();
    })(t0));
  }
  const setPaused = (p) => {
    musicBtn.classList.toggle("is-paused", p);
    musicBtn.setAttribute("aria-label", p ? "Tocar música" : "Pausar música");
  };
  // precisa ser chamado dentro do clique para o celular liberar o áudio
  function primeMusic() {
    if (!audio.src) return Promise.resolve(false);
    audio.volume = 0;
    return audio.play().then(() => { audio.pause(); return true; }).catch(() => false);
  }
  async function startMusic() {
    try { audio.volume = 0; await audio.play(); musicBtn.hidden = false; setPaused(false); fade(vol, 3000); }
    catch { /* sem arquivo: segue sem música */ }
  }
  musicBtn.addEventListener("click", async () => {
    if (audio.paused) { await audio.play(); setPaused(false); fade(vol, 800); }
    else { await fade(0, 400); audio.pause(); setPaused(true); }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !audio.paused) { audio.pause(); audio.dataset.resume = "1"; }
    else if (!document.hidden && audio.dataset.resume) { audio.play().catch(() => {}); delete audio.dataset.resume; }
  });

  /* ---------- abrir a carta ---------- */
  history.scrollRestoration = "manual";
  const intro = $("#intro");
  const env = $("#envelope");
  const tilt = $("#tilt");
  const seal = $("#seal");
  const envLetter = $("#envLetter");
  const desk = $("#desk");
  const sheet = $("#sheet");
  const anim = (el, kf, opt) => el.animate(kf, { fill: "forwards", ...opt });
  let busy = false;

  // o envelope inclina acompanhando o mouse
  if (!reduceMotion && matchMedia("(hover: hover)").matches) {
    addEventListener("pointermove", (e) => {
      if (busy) return;
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
      anim(el, [
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
      anim(c, [
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy - 18}px) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: 0.35 },
        { transform: `translate(${dx * 1.3}px, ${dy + 160 + Math.random() * 80}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
      ], { duration: 800 + Math.random() * 400, easing: "cubic-bezier(.3,.5,.6,1)" });
    }
    anim(tilt, [
      { transform: "translateY(0) scale(1)" },
      { transform: "translateY(4px) scale(.992)", offset: 0.3 },
      { transform: "translateY(0) scale(1)" },
    ], { duration: 380, easing: "ease-out", fill: "none" });
  }

  // monta a carta dobrada em 3 partes, cada uma mostrando um pedaço da folha real
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
      anim(panels[i].p, [{ transform: `translateZ(${i === 0 ? 2 : 1}px) rotateX(${fromRot}deg)` }, { transform: "translateZ(0) rotateX(0deg)" }],
        { duration: 820, easing: "cubic-bezier(.55,.05,.25,1)" }).finished,
      anim(panels[i].shade, [{ opacity: 0.6 }, { opacity: 0.25, offset: 0.6 }, { opacity: 0 }], { duration: 820 }).finished,
      anim(panels[1].shade, [{ opacity: 0.25 }, { opacity: 0 }], { duration: 700, easing: "ease-out" }).finished,
    ]);

    return {
      el: fold,
      toCenter: () => anim(fold, [{ transform: from }, { transform: center }], { duration: 1000, easing: "cubic-bezier(.6,0,.25,1)" }).finished,
      unfoldTop: () => unfold(0, -180),
      unfoldBottom: () => unfold(2, 180),
      toSheet: () => anim(fold, [{ transform: center }, { transform: "translate(0,0) scale(1)" }], { duration: 1100, easing: "cubic-bezier(.6,0,.2,1)" }).finished,
    };
  }

  function revealDesk() {
    document.body.classList.remove("is-sealed");
    desk.removeAttribute("aria-hidden");
    desk.classList.add("is-in");
  }

  seal.addEventListener("click", async () => {
    if (busy) return;
    busy = true;
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

    // 1. o selo cede e racha
    await anim(seal, [{ transform: "scale(1)" }, { transform: "scale(.9)" }], { duration: 110, easing: "ease-out" }).finished;
    play("crack");
    breakSeal();
    await wait(420);

    // 2. a aba abre e mostra o forro
    play("paper", 0.6);
    env.classList.add("is-flap-open");
    await wait(520);
    env.classList.add("is-flap-back");
    await wait(420);

    // 3. a carta sai do envelope
    play("slide");
    intro.classList.add("is-rising");
    startMusic();
    await wait(1050);

    // 4. o envelope cai e a carta vem para o centro
    const fold = buildFold();
    envLetter.style.visibility = "hidden";
    play("whoosh");
    anim(env, [{ transform: "translateY(46%)" }, { transform: "translateY(130vh) rotate(9deg)" }], { duration: 1000, easing: "cubic-bezier(.55,0,.8,.4)" });
    $("#hint").style.display = "none";
    await fold.toCenter();
    await wait(150);

    // 5. desdobra em duas etapas
    play("fold");
    await fold.unfoldTop();
    await wait(80);
    play("fold");
    await fold.unfoldBottom();
    await wait(250);

    // 6. a folha se acomoda na mesa e vira o site
    const settle = fold.toSheet();
    setTimeout(revealDesk, 500);
    await settle;
    intro.remove();
    await anim(fold.el, [{ opacity: 1 }, { opacity: 0 }], { duration: 350 }).finished;
    fold.el.remove();
    busy = false;
  });

  $("#again").addEventListener("click", async () => {
    if (!audio.paused) await fade(0, 600);
    location.reload();
  });
})();

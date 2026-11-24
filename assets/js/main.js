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
  const intro = $("#intro");
  const env = $("#envelope");
  const desk = $("#desk");
  let busy = false;

  $("#seal").addEventListener("click", async () => {
    if (busy) return;
    busy = true;
    audioCtx();
    primeMusic();

    intro.classList.add("is-opening");
    play("crack");
    await wait(420);

    play("paper", 0.6);
    env.classList.add("is-flap-open");
    await wait(480);
    env.classList.add("is-flap-back");
    await wait(380);

    play("slide");
    intro.classList.add("is-rising");
    startMusic();
    await wait(1050);

    window.scrollTo(0, 0);
    document.body.classList.remove("is-sealed");
    desk.removeAttribute("aria-hidden");
    intro.classList.add("is-gone");
    desk.classList.add("is-in");
    play("paper", 0.35);
    busy = false;
  });

  $("#again").addEventListener("click", async () => {
    await fade(0, 600); audio.pause(); musicBtn.hidden = true;
    desk.classList.remove("is-in");
    desk.setAttribute("aria-hidden", "true");
    document.body.classList.add("is-sealed");
    intro.className = "intro";
    env.className = "envelope";
    window.scrollTo(0, 0);
    audio.currentTime = 0;
    $("#seal").focus();
  });
})();

(() => {
  const C = window.CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const start = new Date(C.inicio);
  const nf = new Intl.NumberFormat("pt-BR");
  const fmtDate = (d) =>
    d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });

  /* ---------- nomes e datas fixas ---------- */
  $$("[data-name-him]").forEach((el) => (el.textContent = C.ele));
  $$("[data-name-her]").forEach((el) => (el.textContent = C.ela));
  document.title = `${C.ele} & ${C.ela}`;
  $("#sinceLabel").textContent = fmtDate(start);
  $("#footerSince").textContent = fmtDate(start);

  /* ---------- diferença de calendário real ---------- */
  function addMonths(date, n) {
    const d = new Date(date);
    const day = d.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth() + n);
    const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(day, last));
    return d;
  }

  function diff(from, to) {
    let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
    if (addMonths(from, months) > to) months--;
    const anchor = addMonths(from, months);
    let ms = to - anchor;
    const days = Math.floor(ms / 864e5); ms -= days * 864e5;
    const hours = Math.floor(ms / 36e5); ms -= hours * 36e5;
    const minutes = Math.floor(ms / 6e4); ms -= minutes * 6e4;
    const seconds = Math.floor(ms / 1e3);
    return { totalMonths: months, anos: Math.floor(months / 12), meses: months % 12, dias: days, horas: hours, minutos: minutes, segundos: seconds };
  }

  const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;
  const units = Object.fromEntries($$("[data-u]").map((el) => [el.dataset.u, el]));

  function nextAnniversary(now) {
    let y = now.getFullYear();
    let d = new Date(start); d.setFullYear(y);
    if (d <= now) { y++; d = new Date(start); d.setFullYear(y); }
    const prev = new Date(start); prev.setFullYear(y - 1);
    return { date: d, years: y - start.getFullYear(), prev };
  }

  function tick() {
    const now = new Date();
    const t = diff(start, now);
    for (const k in units) {
      const v = String(t[k]).padStart(k === "anos" || k === "meses" ? 1 : 2, "0");
      if (units[k].textContent !== v) {
        units[k].textContent = v;
        if (!reduceMotion) { units[k].classList.remove("tick"); void units[k].offsetWidth; units[k].classList.add("tick"); }
      }
    }

    const totalDays = Math.floor((now - start) / 864e5);
    $("#statDays").textContent = nf.format(totalDays);
    $("#statMonths").textContent = nf.format(t.totalMonths);
    $("#statMoons").textContent = nf.format(Math.floor(totalDays / 29.530589));
    $("#statWeekends").textContent = nf.format(Math.floor(totalDays / 7));

    const parts = [plural(t.anos, "ano", "anos"), plural(t.meses, "mês", "meses"), plural(t.dias, "dia", "dias")];
    $("#letterSpan").textContent = `${parts[0]}, ${parts[1]} e ${parts[2]}`;

    const n = nextAnniversary(now);
    const left = Math.ceil((n.date - now) / 864e5);
    $("#nextDays").textContent = nf.format(left);
    $("#nextYears").textContent = n.years;
    $("#nextDate").textContent = `${fmtDate(n.date)} · ${n.date.toLocaleDateString("pt-BR", { weekday: "long" })}`;
    $("#nextBar").style.width = `${((now - n.prev) / (n.date - n.prev)) * 100}%`;
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- linha do tempo ---------- */
  if (C.marcos.length >= 2) {
    const ol = $("#timeline");
    C.marcos
      .slice()
      .sort((a, b) => a.data.localeCompare(b.data))
      .forEach((m) => {
        const li = document.createElement("li");
        li.className = "timeline__item reveal";
        const date = new Date(m.data + "T12:00:00");
        li.innerHTML = `
          <span class="timeline__dot" aria-hidden="true"></span>
          <time></time>
          <h3></h3>
          <p></p>
          ${m.foto ? '<img loading="lazy" alt="">' : ""}`;
        li.querySelector("time").textContent = fmtDate(date);
        li.querySelector("h3").textContent = m.titulo;
        li.querySelector("p").textContent = m.texto;
        if (m.foto) li.querySelector("img").src = m.foto;
        ol.appendChild(li);
      });
    $("#historia").hidden = false;
  }

  /* ---------- galeria + lightbox ---------- */
  const photos = C.fotos;
  if (photos.length >= 2) {
    const g = $("#gallery");
    photos.forEach((p, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "gallery__item reveal";
      b.style.setProperty("--d", `${(i % 3) * 80}ms`);
      b.innerHTML = '<img loading="lazy" alt="">';
      b.querySelector("img").src = p.src;
      b.querySelector("img").alt = p.legenda || `Foto ${i + 1}`;
      b.addEventListener("click", () => openLb(i));
      g.appendChild(b);
    });
    $("#galeria").hidden = false;
  }

  const lb = $("#lightbox");
  let lbIdx = 0;
  function showLb(i) {
    lbIdx = (i + photos.length) % photos.length;
    $("#lbImg").src = photos[lbIdx].src;
    $("#lbCap").textContent = photos[lbIdx].legenda || "";
  }
  function openLb(i) { showLb(i); lb.hidden = false; document.body.classList.add("is-locked"); }
  function closeLb() { lb.hidden = true; document.body.classList.remove("is-locked"); }
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
  let touchX = null;
  lb.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLb(lbIdx + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- reveal ao rolar ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  const observeReveals = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));

  /* ---------- música ---------- */
  const audio = $("#audio");
  const btn = $("#musicBtn");
  let hasAudio = false;
  if (C.musica && C.musica.arquivo) {
    audio.src = C.musica.arquivo;
    audio.addEventListener("canplay", () => (hasAudio = true), { once: true });
    audio.addEventListener("error", () => { hasAudio = false; btn.hidden = true; });
  }
  $("#musicLabel").textContent = (C.musica && C.musica.titulo) || "";

  function fadeTo(target, ms = 1500) {
    const from = audio.volume, t0 = performance.now();
    return new Promise((res) => {
      (function step(t) {
        const k = Math.min(1, (t - t0) / ms);
        audio.volume = from + (target - from) * k;
        k < 1 ? requestAnimationFrame(step) : res();
      })(t0);
    });
  }
  async function play() {
    try {
      audio.volume = 0;
      await audio.play();
      btn.hidden = false;
      setPlaying(true);
      fadeTo(C.musica.volume ?? 0.6, 2500);
    } catch { /* sem arquivo ou bloqueado: segue sem som */ }
  }
  function setPlaying(on) {
    btn.classList.toggle("is-paused", !on);
    btn.setAttribute("aria-label", on ? "Pausar música" : "Tocar música");
  }
  btn.addEventListener("click", async () => {
    if (audio.paused) { await audio.play(); setPlaying(true); fadeTo(C.musica.volume ?? 0.6, 800); }
    else { await fadeTo(0, 500); audio.pause(); setPlaying(false); }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !audio.paused) { audio.pause(); audio.dataset.resume = "1"; }
    else if (!document.hidden && audio.dataset.resume) { audio.play().catch(() => {}); delete audio.dataset.resume; }
  });

  /* ---------- abertura ---------- */
  const gate = $("#gate");
  $("#openBtn").addEventListener("click", () => {
    play();
    gate.classList.add("is-open");
    document.body.classList.remove("is-locked");
    setTimeout(() => { gate.remove(); observeReveals(); }, reduceMotion ? 0 : 1100);
    startPetals();
  });

  /* ---------- pétalas/corações discretos ---------- */
  function startPetals() {
    if (reduceMotion) return;
    const cv = $("#petals");
    const ctx = cv.getContext("2d");
    let W, H, dpr;
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    };
    resize(); addEventListener("resize", resize);
    const N = innerWidth < 600 ? 14 : 24;
    const mk = (init) => ({
      x: Math.random() * W, y: init ? Math.random() * H : -20 * dpr,
      s: (4 + Math.random() * 6) * dpr, vy: (0.25 + Math.random() * 0.5) * dpr,
      sway: Math.random() * Math.PI * 2, a: 0.15 + Math.random() * 0.35,
      heart: Math.random() < 0.35,
    });
    const ps = Array.from({ length: N }, () => mk(true));
    function heart(x, y, s) {
      ctx.beginPath();
      ctx.moveTo(x, y + s * 0.3);
      ctx.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.3);
      ctx.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.8, x, y + s);
      ctx.bezierCurveTo(x, y + s * 0.8, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.3);
      ctx.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.3);
      ctx.fill();
    }
    (function loop() {
      ctx.clearRect(0, 0, W, H);
      for (const p of ps) {
        p.y += p.vy; p.sway += 0.01; p.x += Math.sin(p.sway) * 0.3 * dpr;
        if (p.y > H + 20 * dpr) Object.assign(p, mk(false));
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.heart ? "#b3243a" : "#d9b77e";
        if (p.heart) heart(p.x, p.y, p.s * 1.6);
        else { ctx.beginPath(); ctx.arc(p.x, p.y, p.s * 0.25, 0, Math.PI * 2); ctx.fill(); }
      }
      requestAnimationFrame(loop);
    })();
  }
})();

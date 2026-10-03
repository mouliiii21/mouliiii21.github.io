const D = window.DATA;
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h) e.innerHTML = h; return e; };
const chips = a => a.map(t => `<span class="chip">${t}</span>`).join("");

// Render projects
const list = document.getElementById("project-list");
D.projects.forEach((p, i) => {
  const c = el("article", "card reveal");
  c.style.transitionDelay = `${i * 90}ms`;
  c.innerHTML = `<h3>${p.name}</h3><p>${p.summary}</p><div class="chips">${chips(p.tech)}</div>
    <div class="links">${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">code</a>` : ""}${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">live</a>` : ""}</div>`;
  list.appendChild(c);
});

// Render skills
const sl = document.getElementById("skill-list");
Object.entries(D.skills).forEach(([k, v]) => {
  const r = el("div", "skill-row reveal", `<b>${k}</b><div class="chips">${chips(v)}</div>`);
  sl.appendChild(r);
});

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(n => io.observe(n));

// Typing effect
const words = ["agentic AI systems", "RAG pipelines", "full-stack apps"];
const t = document.getElementById("type");
if (matchMedia("(prefers-reduced-motion: reduce)").matches) { t.textContent = words[0]; }
else {
  let w = 0, ch = 0, del = false;
  (function tick() {
    const word = words[w];
    t.textContent = word.slice(0, ch);
    if (!del && ch === word.length) { del = true; return setTimeout(tick, 1800); }
    if (del && ch === 0) { del = false; w = (w + 1) % words.length; }
    ch += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();
}

// Active nav link
const links = [...document.querySelectorAll(".nav nav a")];
const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach(s => so.observe(s));

document.getElementById("year").textContent = new Date().getFullYear();

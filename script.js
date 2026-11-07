(function () {
  const grid = document.getElementById("grid");
  const filters = document.getElementById("filters");
  const lightbox = document.getElementById("lightbox");
  const lbMedia = document.getElementById("lbMedia");
  const lbTitle = document.getElementById("lbTitle");
  const lbDesc = document.getElementById("lbDesc");
  document.getElementById("year").textContent = new Date().getFullYear();

  const ICONS = { "كروشيه": "🧶", "تطريز": "🪡", "رسم": "🎨", "ريزن": "💎" };
  const PALETTES = [
    ["#f6d1c1", "#e7a98f"], ["#cfe3e0", "#8fbcbc"], ["#f3e2b3", "#e2b866"],
    ["#e4d4ee", "#b89ad0"], ["#d7e8c8", "#9cc184"], ["#f5c9cf", "#e08b98"],
  ];

  function media(work, i) {
    if (work.image) {
      return `<img src="${work.image}" alt="${work.title}" loading="lazy">`;
    }
    const [a, b] = PALETTES[i % PALETTES.length];
    return `<div class="placeholder" style="background:linear-gradient(135deg,${a},${b})">${ICONS[work.category] || "✨"}</div>`;
  }

  function render(category) {
    const list = WORKS.map((w, i) => ({ ...w, i }))
      .filter(w => category === "الكل" || w.category === category);
    grid.innerHTML = list.map(w => `
      <button class="card" data-i="${w.i}">
        <div class="media">${media(w, w.i)}</div>
        <div class="info"><span class="tag">${w.category}</span><h3>${w.title}</h3></div>
      </button>`).join("");
  }

  const categories = ["الكل", ...new Set(WORKS.map(w => w.category))];
  filters.innerHTML = categories.map((c, i) =>
    `<button role="tab" aria-selected="${i === 0}" data-c="${c}">${c}</button>`).join("");
  filters.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    filters.querySelectorAll("button").forEach(b => b.setAttribute("aria-selected", b === btn));
    render(btn.dataset.c);
  });

  grid.addEventListener("click", e => {
    const card = e.target.closest(".card");
    if (!card) return;
    const i = +card.dataset.i;
    const w = WORKS[i];
    lbMedia.innerHTML = media(w, i);
    lbTitle.textContent = w.title;
    lbDesc.textContent = w.description || "";
    lightbox.showModal();
  });
  lightbox.querySelector(".close").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.close(); });

  render("الكل");
})();

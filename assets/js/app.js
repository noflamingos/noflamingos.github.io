(function () {
  const $ = (sel) => document.querySelector(sel);

  const searchInput = $("#searchInput");
  const pillsEl = $("#categoryPills");
  const gridEl = $("#drillGrid");
  const countEl = $("#resultsCount");

  // Not on a listing page
  if (!pillsEl || !gridEl || !searchInput) return;

  let allDrills = [];
  let categories = [];
  let selectedCategory = "all";

  function slugToName(slug) {
    const found = categories.find(c => c.slug === slug);
    return found ? found.name : slug;
  }

  function makePill(slug, name) {
    const btn = document.createElement("button");
    btn.className = "pill";
    btn.type = "button";
    btn.textContent = name;
    btn.dataset.slug = slug;
    btn.setAttribute("aria-pressed", slug === selectedCategory ? "true" : "false");
    btn.addEventListener("click", () => {
      selectedCategory = slug;
      [...pillsEl.querySelectorAll(".pill")].forEach(p => p.setAttribute("aria-pressed", p.dataset.slug === selectedCategory ? "true" : "false"));
      render();
    });
    return btn;
  }

  function renderPills() {
    pillsEl.innerHTML = "";
    categories.forEach(c => pillsEl.appendChild(makePill(c.slug, c.name)));
  }

  function matches(drill, query) {
    if (!query) return true;
    const q = query.toLowerCase();
    const hay = (drill.title + " " + (drill.short_description || "")).toLowerCase();
    return hay.includes(q);
  }

  function inCategory(drill) {
    if (selectedCategory === "all") return true;
    const cats = drill.categories || [];
    return cats.includes(selectedCategory);
  }

  function card(drill) {
    const a = document.createElement("a");
    a.className = "card";
    a.href = drill.url;

    const img = document.createElement("img");
    img.className = "card-thumb";
    img.alt = drill.title + " thumbnail";
    img.loading = "lazy";
    img.src = drill.thumbnail || "";

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = drill.title;

    const meta = document.createElement("div");
    meta.className = "card-meta";
    const catNames = (drill.categories || []).map(slugToName);
    meta.textContent = catNames.length ? catNames.join(" • ") : "—";

    const desc = document.createElement("div");
    desc.className = "card-desc";
    desc.textContent = drill.short_description || "";
    
    body.appendChild(desc);
    body.appendChild(title);
    body.appendChild(meta);

    a.appendChild(img);
    a.appendChild(body);

    return a;
  }

  function render() {
    const q = searchInput.value.trim();
    const filtered = allDrills.filter(d => matches(d, q) && inCategory(d));

    gridEl.innerHTML = "";
    filtered.forEach(d => gridEl.appendChild(card(d)));

    if (countEl) countEl.textContent = `${filtered.length} drill${filtered.length === 1 ? "" : "s"}`;
  }

  async function init() {
    // categories (from rendered JSON embedded in HTML via data attr)
    // We'll fetch categories by hitting a tiny inline JSON we generate from the data file:
    // easiest: read from a global injected by layout? We don't have that, so we fetch a small endpoint.
    // We'll instead embed categories into the JS at build-time by using a template in app.js? Not possible as static.
    // So: we fetch categories from a JSON endpoint we generate.
    const [drillRes, catRes] = await Promise.all([
      fetch((window.__NFH_BASEURL || "") + "/assets/drills.json"),
      fetch((window.__NFH_BASEURL || "") + "/assets/categories.json")
    ]);

    allDrills = await drillRes.json();
    categories = await catRes.json();

    // Ensure "All" is first, then alphabetize the rest
    const allItem = categories.find(c => c.slug === "all") || { slug: "all", name: "All" };
    const rest = categories.filter(c => c.slug !== "all").sort((a,b) => a.name.localeCompare(b.name));
    categories = [allItem, ...rest];

    renderPills();
    render();

    searchInput.addEventListener("input", render);
  }

  init().catch((e) => {
    console.error("Failed to initialize drills UI", e);
    if (countEl) countEl.textContent = "Failed to load drills.";
  });
})();

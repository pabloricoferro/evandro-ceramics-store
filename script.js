const yearEl = document.getElementById("year");
const productGridEl = document.getElementById("productGrid");
const typeFilterEl = document.getElementById("typeFilter");
const artistFilterEl = document.getElementById("artistFilter");
const resultsCountEl = document.getElementById("resultsCount");
const emptyStateEl = document.getElementById("emptyState");

const products = window.PRODUCTS || [];

function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]))].sort((a, b) =>
    a.localeCompare(b)
  );
}

function formatEUR(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function fillFilter(selectEl, label, values) {
  const options = [`<option value="all">All ${label}</option>`]
    .concat(values.map((value) => `<option value="${value}">${value}</option>`))
    .join("");

  selectEl.innerHTML = options;
}

function createProductCard(product) {
  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.alt}" loading="lazy" />
      <div class="product-body">
        <div class="meta-row">
          <span class="pill">${product.artist}</span>
          <span class="pill">${product.type}</span>
        </div>
        <h3>${product.title}</h3>
        <div class="product-foot">
          <span class="price">${formatEUR(product.priceEUR)}</span>
          <button class="buy-btn" type="button">Buy piece</button>
        </div>
      </div>
    </article>
  `;
}

function getFilteredProducts() {
  const selectedType = typeFilterEl.value;
  const selectedArtist = artistFilterEl.value;

  return products.filter((product) => {
    const typeMatch = selectedType === "all" || product.type === selectedType;
    const artistMatch =
      selectedArtist === "all" || product.artist === selectedArtist;

    return typeMatch && artistMatch;
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();
  productGridEl.innerHTML = filtered.map(createProductCard).join("");
  resultsCountEl.textContent = `${filtered.length} piece${
    filtered.length === 1 ? "" : "s"
  }`;
  emptyStateEl.classList.toggle("hidden", filtered.length > 0);
}

function initializeStorefront() {
  fillFilter(typeFilterEl, "types", uniqueValues(products, "type"));
  fillFilter(artistFilterEl, "artists", uniqueValues(products, "artist"));
  renderProducts();

  typeFilterEl.addEventListener("change", renderProducts);
  artistFilterEl.addEventListener("change", renderProducts);
}

initializeStorefront();
yearEl.textContent = String(new Date().getFullYear());

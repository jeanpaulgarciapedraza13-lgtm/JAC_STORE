const $ = s => document.querySelector(s);
const money = n => new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
}).format(n);

let cart = [];
try { cart = JSON.parse(localStorage.getItem("ja-cart") || "[]"); } catch (e) {}

const save = () => {
  try { localStorage.setItem("ja-cart", JSON.stringify(cart)); } catch (e) {}
};

const byId = id => PRODUCTS.find(p => p.id === id);
const fotos = p => p.imagenes || [p.imagen];

/* ---------- Imágenes con respaldo ---------- */
function imgEl(src, alt) {
  const i = new Image();
  i.src = src;
  i.alt = alt;
  i.loading = "lazy";
  i.onerror = () => i.remove();
  return i;
}

/* ---------- Catálogo ---------- */
function renderGrid() {
  const grid = $("#grid");
  grid.innerHTML = "";

  if (!PRODUCTS.length) {
    grid.innerHTML = '<p class="empty">Pronto habrá nuevas piezas.</p>';
    return;
  }

  PRODUCTS.forEach(p => {
    const out = p.stock <= 0;
    const card = document.createElement("button");

    card.className = "card" + (out ? " card--out" : "");

    card.innerHTML = `
      <div class="card__img">
        <span class="ph">JAC</span>
        <span class="card__num">${p.numero}</span>
        ${out
          ? '<span class="card__badge">Agotada</span>'
          : p.stock <= 2
            ? `<span class="card__badge">Quedan ${p.stock}</span>`
            : ""}
      </div>
      <div class="card__row">
        <span class="card__name">${p.nombre}</span>
        <span class="card__price">${money(p.precio)}</span>
      </div>`;

    card.querySelector(".card__img").prepend(imgEl(fotos(p)[0], p.nombre));
    card.onclick = () => openProduct(p.id);
    grid.append(card);
  });

  const left = PRODUCTS.reduce((a, p) => a + Math.max(p.stock, 0), 0);
  $("#stockLine").textContent =
    `${left} ${left === 1 ? "pieza disponible" : "piezas disponibles"}`;
}

/* ---------- Sheets ---------- */
const scrim = $("#scrim");

function openSheet(el) {
  closeSheets();
  el.classList.add("open");
  scrim.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeSheets() {
  document.querySelectorAll(".sheet.open").forEach(s => s.classList.remove("open"));
  scrim.classList.remove("open");
  document.body.style.overflow = "";
}

scrim.onclick = closeSheets;
document.querySelectorAll("[data-close]").forEach(b => b.onclick = closeSheets);
addEventListener("keydown", e => e.key === "Escape" && closeSheets());

/* ---------- Producto ---------- */
let selSize = null, selId = null;

function openProduct(id) {
  const p = byId(id);
  if (!p) return;

  selId = id;
  selSize = null;

  $("#pNum").textContent = "Pieza " + p.numero;
  $("#pName").textContent = p.nombre;
  $("#pPrice").textContent = money(p.precio);
  $("#pDesc").textContent = p.descripcion || "";

  /* Fotos: cambio entre frente y respaldo al tocar */
  const lista = fotos(p);
  const img = $("#pImg");
  const thumbs = $("#pThumbs");

  // Ocultar los botones "Frente / Espalda"
  thumbs.innerHTML = "";
  thumbs.hidden = true;

  function show(i) {
    img.innerHTML = "";
    img.dataset.i = i;
    img.append(imgEl(
      lista[i],
      `${p.nombre} ${i === 0 ? "Frente" : "Respaldo"}`
    ));

    // Indicador sutil sobre la imagen
    if (lista.length > 1) {
      const hint = document.createElement("div");
      hint.className = "image-hint";
      hint.innerHTML = i === 0
        ? "↻ Toca la imagen para ver el respaldo"
        : "↻ Toca para volver al frente";
      img.append(hint);
    }
  }

  // Cambiar de frente a respaldo al tocar la imagen
  img.onclick = () => {
    if (lista.length < 2) return;
    const actual = Number(img.dataset.i || 0);
    show((actual + 1) % lista.length);
  };

  // Mostrar inicialmente el frente
  show(0);

  /* Tallas */
  const sizes = $("#pSizes");
  sizes.innerHTML = "";

  const add = $("#pAdd");
  const out = p.stock <= 0;

  add.disabled = out;
  add.textContent = out ? "Agotada" : "Elige una talla";

  p.tallas.forEach(t => {
    const b = document.createElement("button");

    b.className = "size";
    b.textContent = t;
    b.setAttribute("role", "radio");
    b.setAttribute("aria-checked", "false");
    b.disabled = out;

    b.onclick = () => {
      selSize = t;
      sizes.querySelectorAll(".size").forEach(x =>
        x.setAttribute("aria-checked", x === b)
      );
      add.textContent = "Agregar al carrito";
    };

    sizes.append(b);
  });

  openSheet($("#productSheet"));
}

$("#pAdd").onclick = () => {
  if (!selSize) {
    toast("Elige una talla");
    return;
  }

  const p = byId(selId);
  const line = cart.find(l => l.id === selId && l.size === selSize);
  const inCart = cart
    .filter(l => l.id === selId)
    .reduce((a, l) => a + l.qty, 0);

  if (inCart >= p.stock) {
    toast("No hay más unidades disponibles");
    return;
  }

  line ? line.qty++ : cart.push({
    id: selId,
    size: selSize,
    qty: 1
  });

  save();
  updateCart();
  closeSheets();
  toast("Agregada al carrito");
};

/* ---------- Carrito ---------- */
function updateCart() {
  const n = cart.reduce((a, l) => a + l.qty, 0);
  const c = $("#cartCount");

  c.hidden = !n;
  c.textContent = n;

  const list = $("#cartList");
  list.innerHTML = "";

  let total = 0;
  let msg = "Hola JAC STORE, quiero pedir:%0A";

  if (!cart.length) {
    list.innerHTML =
      '<p class="empty" style="padding:28px 0">Tu carrito está vacío. Elige una pieza de la colección.</p>';
  }

  cart.forEach((l, i) => {
    const p = byId(l.id);
    if (!p) return;

    total += p.precio * l.qty;

    msg += encodeURIComponent(
      `• ${p.numero} ${p.nombre}, talla ${l.size} x${l.qty} — ${money(p.precio * l.qty)}`
    ) + "%0A";

    const row = document.createElement("div");
    row.className = "line";

    row.innerHTML = `
      <div class="line__img" style="background-image:url('${fotos(p)[0]}')"></div>
      <div>
        <b>${p.nombre}</b>
        <small>Talla ${l.size} · x${l.qty} · ${money(p.precio * l.qty)}</small>
      </div>
      <button aria-label="Quitar">Quitar</button>`;

    row.querySelector("button").onclick = () => {
      cart.splice(i, 1);
      save();
      updateCart();
    };

    list.append(row);
  });

  $("#cartTotal").textContent = money(total);

  msg += "%0ATotal: " + encodeURIComponent(money(total));

  const go = $("#checkout");
  go.href = `https://wa.me/${WHATSAPP}?text=${msg}`;
  go.setAttribute("aria-disabled", !cart.length);
}

$("#openCart").onclick = () => openSheet($("#cartSheet"));

/* ---------- Toast ---------- */
let tt;

function toast(t) {
  const el = $("#toast");
  el.textContent = t;
  el.classList.add("show");

  clearTimeout(tt);
  tt = setTimeout(() => el.classList.remove("show"), 2200);
}

/* ---------- WhatsApp ---------- */
$("#waLink").href = `https://wa.me/${WHATSAPP}`;

/* ---------- Inicio ---------- */
renderGrid();
updateCart();
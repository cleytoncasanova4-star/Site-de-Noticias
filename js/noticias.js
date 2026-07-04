let todasNoticias = [];

async function carregarNoticias() {
  const { data, error } = await supabaseClient
    .from("noticias")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  todasNoticias = data;
  renderNoticias(data);

  console.log("Categorias encontradas:");
  data.forEach(n => {
    console.log(`[${n.categoria}]`);
  });
}

function renderNoticias(data) {
  const container = document.getElementById("news-container");

  if (!container) return;

  container.innerHTML = "";

  data.forEach((n) => {
    container.innerHTML += `
      <div class="card" data-category="${n.categoria}">

        <img src="${n.imagem}" alt="${n.titulo}" onclick="abrirNoticia(${n.id})">

        <div class="card-content">

          <span>${n.categoria}</span>

          <h3>${n.titulo}</h3>

          <p>${(n.resumo || "").substring(0, 120)}...</p>

          <button class="ler-mais-btn" onclick="abrirNoticia(${n.id})">
            Ver Notícia Completa
          </button>

        </div>

      </div>
    `;
  });
}

function abrirNoticia(id) {
  window.location.href = `noticias.html?id=${id}`;
}

window.addEventListener("DOMContentLoaded", () => {
  carregarNoticias();

  const buttons = document.querySelectorAll(".filters button");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category.toLowerCase();

      const filtradas =
        category === "all"
          ? todasNoticias
          : todasNoticias.filter(n =>
              (n.categoria || "")
                .trim()
                .toLowerCase() === category
            );

      if (filtradas.length === 0) {
        document.getElementById("news-container").innerHTML = `
          <p style="text-align:center;padding:30px;">
            Nenhuma notícia encontrada nesta categoria.
          </p>
        `;
      } else {
        renderNoticias(filtradas);
      }
    });
  });
});
// Registrar o Service Worker da Monetag
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(err => console.error("Erro ao registrar o Service Worker:", err));
}
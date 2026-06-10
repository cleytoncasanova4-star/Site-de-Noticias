let todasNoticias = [];

async function carregarNoticias() {
  const { data, error } = await supabaseClient
    .from("noticias")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  todasNoticias = data;
  renderNoticias(data);
}

function renderNoticias(data) {
  const container = document.getElementById("news-container");

  if (!container) return;

  container.innerHTML = "";

  data.forEach((n) => {
    container.innerHTML += `
      <div class="card">

        <img src="${n.imagem}" onclick="abrirNoticia(${n.id})">

        <div class="card-content">

          <span>${n.categoria}</span>

          <h3>${n.titulo}</h3>

          <p>${(n.resumo || "").substring(0, 120)}...</p>

          <button class="ler-mais-btn"
                  onclick="abrirNoticia(${n.id})">
            Ver Notícia Completa
          </button>

        </div>

      </div>
    `;
  });
}

function filtrar(cat) {
  if (cat === "TODOS") {
    renderNoticias(todasNoticias);
    return;
  }

  const filtradas = todasNoticias.filter((n) => n.categoria === cat);
  renderNoticias(filtradas);
}

function abrirNoticia(id) {
  window.location.href = `noticias.html?id=${id}`;
}

window.addEventListener("DOMContentLoaded", carregarNoticias);

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
  console.log(data.map(n => n.categoria));
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

  const filtradas = (cat === "all")
    ? todasNoticias
    : todasNoticias.filter(n =>
        (n.categoria || "")
          .trim()
          .toLowerCase()
          .includes(cat.toLowerCase())
      );

  renderNoticias(filtradas);
}

const buttons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");


buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    // remove active
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;

    cards.forEach(card => {
      const cardCat = card.dataset.category;

      if (category === "all" || cardCat === category) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });

  });
});

function abrirNoticia(id) {
  window.location.href = `noticias.html?id=${id}`;
}

window.addEventListener("DOMContentLoaded", carregarNoticias);

  document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".filters button");

  buttons.forEach(btn => {

    btn.addEventListener("click", () => {

      const category = btn.dataset.category.toLowerCase();

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filtradas = category === "all"
       ? todasNoticias
       : todasNoticias.filter(n =>
       (n.categoria || "")
        .trim()
        .toLowerCase() === category
      );

renderNoticias(filtradas);

if (filtradas.length === 0) {
  document.getElementById("news-container").innerHTML = `
    <p style="text-align:center;padding:30px;">
      Nenhuma notícia encontrada nesta categoria.
    </p>
  `;
}

       const vantagensHTML = noticia.vantagens
                ? noticia.vantagens
               .split("\n")
               .filter(item => item.trim())
               .map(item => `<li>${item}</li>`)
             .join("")
       : "";


      // 🔥 SE DER ERRO (NÃO FICA PRETO)
      const container = document.getElementById("news-container");

      if (!encontrou) {
        container.innerHTML = `
          <p style="text-align:center;color:cyan;padding:20px">
            Nenhuma notícia nesta categoria
          </p>
        `;
      }

    });

  });

});
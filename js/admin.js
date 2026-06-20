let editandoId = null;
function login() {
  const senha = document.getElementById("senha").value;

  if (senha === "871632577") {
    document.getElementById("login-box").style.display = "none";

    document.getElementById("admin-page").style.display = "block";

    carregarAdmin();
  } else {
    alert("Senha incorreta");
  }
}

/* =========================
   CARREGAR NOTÍCIAS
========================= */
async function carregarAdmin() {
  const { data, error } = await supabaseClient
    .from("noticias")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  const container = document.getElementById("admin-container");

  container.innerHTML = "";

  data.forEach((n) => {
    container.innerHTML += `
      <div class="admin-card">

        <img src="${n.imagem}" class="admin-img">

        <h3>${n.titulo}</h3>

        <p>${n.resumo}</p>

        <small>${n.categoria}</small>

        <div class="admin-buttons">

          <button onclick="editar(${n.id})">
            Editar
          </button>

          <button onclick="apagar(${n.id})">
            Apagar
          </button>

        </div>

      </div>
    `;
  });
}

/* =========================
   UPLOAD IMAGEM
========================= */
async function uploadImagem(file) {
  const nomeArquivo = Date.now() + "-" + file.name;

  const { error } = await supabaseClient.storage
    .from("imagem")
    .upload(nomeArquivo, file);

  if (error) {
    console.log(error);
    return null;
  }

  const { data } = supabaseClient.storage
    .from("imagem")
    .getPublicUrl(nomeArquivo);

  return data.publicUrl;
}

/* =========================
   SALVAR
========================= */
async function salvarNoticia() {
  const titulo = document.getElementById("titulo").value;

  const resumo = document.getElementById("resumo").value;

  const categoria = document.getElementById("categoria").value;
  const vantagens =
  document.getElementById("vantagens").value;

const desvantagens =
  document.getElementById("desvantagens").value;

const sugestoes =
  document.getElementById("sugestoes").value;

const autor =
  document.getElementById("autor").value;

const tempoLeitura =
  document.getElementById("tempoLeitura").value;

  const imagemFile = document.getElementById("imagem").files[0];

  if (!titulo || !resumo || !categoria) {
    alert("Preenche todos os campos");
    return;
  }

  let imagemURL = "";

  /* NOVA IMAGEM */
  if (imagemFile) {
    imagemURL = await uploadImagem(imagemFile);
  }

  /* EDITAR */
  if (editandoId) {
    const updateData = {
  titulo,
  resumo,
  categoria,
  vantagens,
  desvantagens,
  autor,
  tempo_leitura: tempoLeitura,
  sugestoes
};
    if (imagemURL) {
      updateData.imagem = imagemURL;
    }

    const { error } = await supabaseClient
      .from("noticias")
      .update(updateData)
      .eq("id", editandoId);

    if (error) {
      console.log(error);
      return;
    }

    editandoId = null;
  } else {
    /* NOVA */
    const { error } = await supabaseClient.from("noticias").insert([
      {
  titulo,
  resumo,
  categoria,
  imagem: imagemURL,
  vantagens,
  desvantagens,
  autor,
  tempo_leitura: tempoLeitura,
  sugestoes
      },
    ]);

    if (error) {
      console.log(error);
      return;
    }
  }

  limpar();
  carregarAdmin();
}

/* =========================
   EDITAR
========================= */
async function editar(id) {
  const { data } = await supabaseClient
    .from("noticias")
    .select("*")
    .eq("id", id)
    .single();

  document.getElementById("titulo").value = data.titulo;

  document.getElementById("resumo").value = data.resumo;

  document.getElementById("categoria").value = data.categoria;
  document.getElementById("vantagens").value =
  data.vantagens || "";

  document.getElementById("desvantagens").value =
  data.desvantagens || "";

  document.getElementById("sugestoes").value = "";

  document.getElementById("autor").value =
  data.autor || "";

  document.getElementById("tempoLeitura").value =
  data.tempo_leitura || "";

  editandoId = id;
}

/* =========================
   APAGAR
========================= */
async function apagar(id) {
  if (!confirm("Apagar notícia?")) return;

  const { error } = await supabaseClient.from("noticias").delete().eq("id", id);

  if (error) {
    console.log(error);
    return;
  }

  carregarAdmin();
}

/* =========================
   LIMPAR
========================= */
function limpar() {
  document.getElementById("titulo").value = "";
  document.getElementById("resumo").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("imagem").value = "";
  document.getElementById("vantagens").value = "";
  document.getElementById("desvantagens").value = "";
  document.getElementById("sugestoes").value = "";
  document.getElementById("autor").value = "";
  document.getElementById("tempoLeitura").value = "";
}

/* =========================
   INIT
========================= */
window.addEventListener("DOMContentLoaded", carregarAdmin);

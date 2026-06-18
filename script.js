const participantes = [
  {
    nome: "Teste 1",
    foto: "https://picsum.photos/300/400"
  },
  {
    nome: "Teste 2",
    foto: "https://picsum.photos/301/400"
  }
];

const galeria = document.getElementById("galeria");

participantes.forEach(pessoa => {
  galeria.innerHTML += `
    <div class="card">
      <img src="${pessoa.foto}">
      <h3>${pessoa.nome}</h3>
    </div>
  `;
});

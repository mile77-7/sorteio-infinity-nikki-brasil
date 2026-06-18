const URL_API = "https://script.google.com/macros/s/AKfycbyBYI2Mc6KnNA14UVEKifMLvhL-FC4ygGTqTpwwztfv/dev";

fetch(URL_API)
    .then(response => response.json())
    .then(participantes => {

        const galeria =
            document.getElementById("galeria");

        participantes.forEach(pessoa => {

            galeria.innerHTML += `
                <div class="card">
                    <img src="${pessoa.foto}">
                    <h3>${pessoa.nome}</h3>
                </div>
            `;

        });

    })
    .catch(erro => {
        console.error("Erro:", erro);
    });

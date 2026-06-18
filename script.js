const URL_API = "https://script.google.com/macros/s/AKfycbwDIp34LSRo78Xm6TB_yXX4s2UbPs2cinUD8X70YHol4a_yHZRYdypHqLfq_GHMfTwsAg/exec";

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

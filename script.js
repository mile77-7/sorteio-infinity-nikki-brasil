const URL_API = "https://script.google.com/macros/s/AKfycbzJNroXvLQl4RJUOhWxkRhBC5fkKpH2IkijTmE8Pm7t_Q7gTLv7OuRUj1hm_EE3K09-Yg/exec";

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

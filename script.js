const URL_API = "https://script.google.com/macros/s/AKfycbxuXsguovjfys72AmnncnvFGyr_Kj0oHArPwpMQKsd-2Ej_LnEniQfKp7z-NRr9c6P2pA/exec";

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

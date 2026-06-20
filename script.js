const URL_API = "https://script.google.com/macros/s/AKfycbxuXsguovjfys72AmnncnvFGyr_Kj0oHArPwpMQKsd-2Ej_LnEniQfKp7z-NRr9c6P2pA/exec";

document.addEventListener("DOMContentLoaded", () => {
    const galeria = document.getElementById("galeria");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    carregarParticipantes();

    function carregarParticipantes() {
        fetch(URL_API)
            .then(response => response.json())
            .then(participantes => {
                
                const cardsHTML = participantes.map(pessoa => `
                    <div class="card">
                        <img src="${pessoa.foto}" alt="Look de ${pessoa.nome}">
                        <div class="card-info">
                            <span class="card-author">${pessoa.nome}</span>
                        </div>
                    </div>
                `).join('');

                galeria.innerHTML = cardsHTML;
            })
            .catch(erro => {
                console.error("Erro ao carregar participantes:", erro);
                galeria.innerHTML = `<p style="text-align:center; color:rgba(255,255,255,0.5);">Não foi possível carregar a galeria.</p>`;
            });
    }

    galeria.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
            lightbox.classList.add("active");
            lightboxImg.src = e.target.src;
        }
    });

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
        setTimeout(() => { lightboxImg.src = ""; }, 300);
    });
});
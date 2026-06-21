const URL_API = "https://script.google.com/macros/s/AKfycbxuXsguovjfys72AmnncnvFGyr_Kj0oHArPwpMQKsd-2Ej_LnEniQfKp7z-NRr9c6P2pA/exec";
let todosParticipantes = [];
let participantesFiltrados = [];
let indiceAtual = 0;

document.addEventListener("DOMContentLoaded", () => {
    const galeria = document.getElementById("galeria");
    const inputBusca = document.querySelector(".search-box input");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    fetch(URL_API)
        .then(response => response.json())
        .then(participantes => {
            todosParticipantes = participantes;
            participantesFiltrados = [...todosParticipantes];
            renderizarCards(participantesFiltrados);
        })
        .catch(erro => {
            console.error("Erro ao carregar participantes:", erro);
            galeria.innerHTML = `<p style="text-align:center; color:rgba(255,255,255,0.5);">Não foi possível carregar a galeria.</p>`;
        });

    function renderizarCards(lista) {
        if (lista.length === 0) {
            galeria.innerHTML = `<p style="text-align:center; grid-column: 1/-1; color:rgba(255,255,255,0.4); padding: 40px 0;">Nenhum participante encontrado.</p>`;
            return;
        }

        const cardsHTML = lista.map((pessoa, index) => `
            <div class="card" data-index="${index}">
                <img src="${pessoa.foto}" alt="Look de ${pessoa.nome}">
                <div class="card-info">
                    <span class="card-author">${pessoa.nome}</span>
                </div>
            </div>
        `).join('');

        galeria.innerHTML = cardsHTML;
    }

    inputBusca.addEventListener("input", () => {
        const termoPesquisa = inputBusca.value.toLowerCase().trim();
        
        participantesFiltrados = todosParticipantes.filter(pessoa => {
            return pessoa.nome && pessoa.nome.toLowerCase().includes(termoPesquisa);
        });

        renderizarCards(participantesFiltrados);
    });

    function mudarFoto(direcao) {
        if (participantesFiltrados.length === 0) return;

        indiceAtual += direcao;

        if (indiceAtual >= participantesFiltrados.length) {
            indiceAtual = 0;
        } else if (indiceAtual < 0) {
            indiceAtual = participantesFiltrados.length - 1;
        }

        lightboxImg.src = participantesFiltrados[indiceAtual].foto;
    }

    galeria.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (card && e.target.tagName === "IMG") {
            indiceAtual = parseInt(card.getAttribute("data-index"));
            lightbox.classList.add("active");
            lightboxImg.src = e.target.src;
        }
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target.id === "lightbox" || e.target.classList.contains("close-lightbox")) {
            lightbox.classList.remove("active");
            setTimeout(() => { lightboxImg.src = ""; }, 300);
        }
    });

    document.getElementById("prev-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        mudarFoto(-1);
    });

    document.getElementById("next-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        mudarFoto(1);
    });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        
        if (e.key === "ArrowRight") mudarFoto(1);
        if (e.key === "ArrowLeft") mudarFoto(-1);
        if (e.key === "Escape") {
            lightbox.classList.remove("active");
            setTimeout(() => { lightboxImg.src = ""; }, 300);
        }
    });

    lightbox.addEventListener("touchstart", (e) => {
        toqueInicialX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", (e) => {
        toqueFinalX = e.changedTouches[0].screenX;
        verificarDeslize();
    }, { passive: true });

    function verificarDeslize() {
        const limiteDistancia = 50; // Quantos pixels mínimos o dedo deve arrastar para acionar
        
        if (toqueInicialX - toqueFinalX > limiteDistancia) {
            // Arrastou da direita para a esquerda (Próxima Foto)
            mudarFoto(1);
        } else if (toqueFinalX - toqueInicialX > limiteDistancia) {
            // Arrastou da esquerda para a direita (Foto Anterior)
            mudarFoto(-1);
        }
    }
});

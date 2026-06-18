const URL_API = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnSfgIlLl1OPqCTTiUL3o3LRBT2_jrVDpitLsuca_Q9oQkmAHtHvAv3sFY1H8Yp7f1RHFZ3LWRqp3Kf3LIlPyd3ubGJJclZFoG9NJu5WfI8p0EKo7GeaJ2ZDI2_tmftfbvBd__SbhlnZe_XPEJlAAqiT65ixbgr-AI7QPj3ozwH7NvX_kckX-U-rrt5HHyBZBi4SdFxrUtwTEi_1IMsPcnnf0pJHdIIunPJuvz6nXSoSwQlkYx0&lib=MTD_tgdhCgjKJ_vjFY4S5yA9neD2OrHpD";

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


async function cargargarDescripcion(){
    const respuesta = await fetch('../data/db.json');
    const data = await respuesta.json();
    let queryStrings = new URLSearchParams(window.location.search);
    const q = parseInt(queryStrings.get("id"));
    let ul = '<ul>';
    data[q-1].caracteristicas.split('#').forEach(contenido => {
        ul += `<li>${contenido}</li>`
    })
    ul += '</ul>'
    let html = `
    <!-- Section-->
    <div class="container mt-5 mb-5" id=${q}>
        <div class="card">
            <div class="row g-0">
                <div class="col-md-6 border-end">
                    <div class="d-flex flex-column justify-content-center">
                        <div class="main_image">
                            <img src="${data[q-1].img_principal}" id="main_product_image"width="350"/>
                        </div>
                        <div class="thumbnail_images">
                            <ul id="thumbnail">
                                <li>
                                    <img
                                        onclick="changeImage('${data[q-1].img_1}')"
                                        src="${data[q-1].img_1}"
                                        width="70"
                                    />
                                </li>
                                <li>
                                    <img
                                        onclick="changeImage('${data[q-1].img_2}')"
                                        src="${data[q-1].img_2}"
                                        width="70"
                                    />
                                </li>
                                <li>
                                    <img
                                        onclick="changeImage('${data[q-1].img_3}')"
                                        src="${data[q-1].img_3}"
                                        width="70"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="p-3 right-side mt-5">
                        <div class="d-flex justify-content-between align-items-center">
                            <h3>${data[q-1].nombre}</h3>
                            <span class="heart"><i class="bx bx-heart"></i></span>
                        </div>
                        <div class="mt-2 pr-3 content">
                            <h5>Detalles del producto</h5>
                            ${ul}     
                        </div>
                        <h3>$${data[q-1].precio}</h3>
                        <div class="ratings d-flex flex-row align-items-center">
                            <div class="d-flex flex-row">
                                <i class="bx bxs-star"></i> <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i> <i class="bx bxs-star"></i>
                                <i class="bx bx-star"></i>
                            </div>
                            <span>1822 visitas</span>
                        </div>
                    </div>
                    <div class="col">
                        <br>
                        <div class="container1">
                            <!-- adding button and heading to show the digits -->
                            <!--increment() and decrement() functions on button click-->
                            <button id="buttonSum">+</button>  
                            <h2 id="counting">1</h2>
                            <button id="buttonRes">-</button>  
                        </div>
                        <br>
                    </div>
                    <div class="buttons d-flex flex-row mt-5 gap-3 justify-content-center">
                        <button class="btn" onclick="window.history.back();">Atrás</button>
                        <button class="btn" id="agregarCarro" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-content="El producto se añadio al carrito">Comprar</button>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>
    <!--fin de sección-->
    `
    let nueva_data  = await data.filter( e => e.id != q && e.categoria == data[q-1].categoria);
    let data_aleatoria = await nueva_data.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0,3)
    let htmlInteresar = tePuedeInteresar(data_aleatoria);
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    html += htmlInteresar;
    document.getElementById("contenedor").innerHTML = html;
}

function tePuedeInteresar(data){
    let html = `
    <!--inicio mega vendido-->
    <div class="btn-access">
        <section>
            <div class="megavendido">
                <h2><b>Tambien te puede interesar</b></h2>
    `;
    let ul = '<ul class="lista">';
    data.forEach((producto) => {
        producto.caracteristicas.split('#').slice(0,3).forEach( contenido => {
            ul += `<li>${contenido}</li>`
        })
        html += `
                    <div class="card estilo-c"> 
                        <a href="#">
                            <div class="img-container">
                              <img src="${producto.img_principal}" alt="producto 1">
                              <span class="promo">Mega Vendido</span>
                            </div>
                        </a>
                        <div class="info-container">
                            <h3>${producto.nombre}</h3>
                            <strong>$ ${producto.precio}</strong>
                            <div>
                                <!--<p>Soporte y billetera Moft para <br> celular 4,7" a más, marrón</p>-->
                                
                            </div>
                            <div>
                                ${ul}
                            </div>
                            <div class="rating-div"><span class="rating">★★★★☆</span></div>
                            <a href="../components/descripcion.html?id=${producto.id}" class="add-cart">Ver más características</a>
                        </div>
                    </div>       
        `
        ul = '<ul class="lista">';
    })
    html += `
                </div>
                </section>
            </div>
        <!--fin mega vendido-->
        `
    return html;
}

function changeImage(image) {
    var img = document.getElementById("main_product_image");
    img.src = image;
}
  

cargargarDescripcion();
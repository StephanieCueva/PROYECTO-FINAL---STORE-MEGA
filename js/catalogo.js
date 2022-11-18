async function cargarJSON(){
    const respuesta = await fetch('../data/db.json');
    const data = await respuesta.json();
    let queryStrings = new URLSearchParams(window.location.search);
    const categoria = queryStrings.get("categoria");
    let nueva_data = data.filter( e => e.categoria == categoria); 
    let html = `<h3 style="text-align: center; margin-bottom: 40px;">${categoria}</h3>`;
    let ul = '<ul>';
    let border = 'border-bottom:3px solid #ff9138';
    let contador = 0;
    nueva_data.forEach(producto => {
        contador++;
        if(contador == nueva_data.length){
            border = '';
        }
        producto.caracteristicas.split('#').forEach( contenido => {
            ul += `<li>${contenido}</li>`
        })
        ul += '</ul>'
        html += `
            <div style="${border}; width: 70%; margin: 0 auto;" id=${producto.id} class="articulos">
                <div class="container px-4" style="margin-bottom: 30px;">
                    <div class="row gx-5">
                        <div class="col" style="margin-top: 50px;">
                            <center><img src="${producto.img_principal}" alt="Card image" style ="width: 250px;"></center>
                        </div>
                        <div class="col">
                            <h4 class="card-title" style="margin-top:30px;"><b>${producto.nombre}</b></h4>
                            ${ul}
                            <h3 class="card-text">$ ${producto.precio}</h3>
                            <button class="btn">Añadir al carrito</button>
                            <!-- <a href="#" class="btn">Añadir al carrito</a> -->
                            <a href="../components/descripcion.html?id=${producto.id}" class="btn">Ver más características</a>
                        </div>
                    </div>
                </div>
            </div>
        `
        ul = '<ul>';
    });
    document.getElementById('contenedor').innerHTML = html;
}

cargarJSON();
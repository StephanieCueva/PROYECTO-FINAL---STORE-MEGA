function cargarCarrito() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  // let monto = productos.map(item => item.precio*item.cantidad).reduce((prev, curr) => prev + curr, 0);
  // total.innerHTML = `
  //     El total a pagar es : <b>S/. ${monto}</b>
  // `
  let html = "";
  if (productos.length == 0) {
    contenedor.innerHTML = `
            <div class="container">
      <div class="shop-box row">
        <div class="col-sm ">
          <h3 >¡TU CARRITO ESTÁ VACÍO AHORA MISMO!</h3>
          <p  style="text-align: justify;" >
            ¿Aún no te has decidido?. Tenemos productos que te encantarán revisa el menú de arriba.
            Si no sabes dónde empezar te recomiendo <i>la lista de los más vendidos</i>
          </p>

          <button class="btn btn-warning mt-4"><a style="color:black" href="./catalogo.html?categoria=AUDIFONOS">Volver a la tienda</a></button>
        </div>
        <div class="col-sm ">
          <img
            src="../images//empty_card.png"
            alt="Icon"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
        `;
  } else {
    productos.forEach((producto) => {
      html += `
                <div class="col border r-flex flex-md-row align-items-center justify-content-center my-2" id='${producto.id}'>
                    <div class="text-center">
                        <img src="${producto.img}" class="d-block mx-auto" width="120px" alt="">
                    </div>
                    <div class="mx-3 w-25 text-center align-self-center titulo_producto">
                        <h4>${producto.nombre}</h4>
                        <p> $ ${producto.precio}</p>
                    </div>
                    <div class="d-flex justify-content-center justify-content-md-center align-items-center">
                        <span class="btn my-0 mas">+</span>
                        <span class="fs-4 text-primary mx-3 p-2">${producto.cantidad}</span>
                        <span class="btn my-0 menos">-</span>
                        <i class="bi bi-trash-fill btn ms-3 my-0"></i>
                    </div>                    
                </div>
            `;
    });
    html += `
            <a href="pago.html" class="btn my-2 w-50 d-block mx-auto">Comprar</a>
        `;
    contenedor.innerHTML = html;
  }
}

cargarCarrito();

document.getElementById('contenedor').addEventListener('click', async(e) => {
  let carrito = JSON.parse(localStorage.getItem("productos"));
  let id = e.target.parentElement.parentElement.id;
  let index = carrito.findIndex( e => { return e.id == id });
  const respuesta = await fetch("../data/db.json");
  const data = await respuesta.json();
  let total = data[id-1].stock;
  if(e.target.tagName == 'SPAN'){
      if(e.target.classList.contains('mas')){
          total = total - carrito[index].cantidad;
          if(total > 0){
              e.target.nextElementSibling.textContent++;
              carrito[index].cantidad++;
          } else {
              mostraNotificacion('bi','bi-exclamation-circle-fill','text-warning','STOCK','SE ALCANZO EL MAXIMO DE STOCK PERMITIDO PARA EL PRODUCTO');
          }
      }

      if(e.target.classList.contains('menos')){
          valor = eval(e.target.previousElementSibling.textContent);
          if(valor > 1){
              e.target.previousElementSibling.textContent--;
              carrito[index].cantidad--;
          }
      }
  }

  if(e.target.tagName == 'I'){
      carrito.splice(index,1);
      e.target.parentElement.parentElement.remove();
  }

  localStorage.setItem("productos", JSON.stringify(carrito));
  actualizarCantidad();
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  if(productos.length == 0){
      contenedor.innerHTML = `
            <div class="container">
      <div class="shop-box row">
        <div class="col-sm ">
          <h3 >¡TU CARRITO ESTÁ VACÍO AHORA MISMO!</h3>
          <p  style="text-align: justify;" >
            ¿Aún no te has decidido?. Tenemos productos que te encantarán revisa el menú de arriba.
            Si no sabes dónde empezar te recomiendo <i>la lista de los más vendidos</i>
          </p>

          <button class="btn btn-warning mt-4"><a style="color:black" href="./catalogo.html?categoria=AUDIFONOS">Volver a la tienda</a></button>
        </div>
        <div class="col-sm ">
          <img
            src="../images//empty_card.png"
            alt="Icon"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
        `;
  } 
})

// Notificacion : warning
function mostraNotificacion(clase1,clase2,clase3,titulo,mensajeNotif){
  document.getElementById('toast_icono').className = '';
  document.getElementById('toast_icono').classList.add(clase1,clase2,clase3);
  toast_titulo.textContent = titulo;
  toast_mensaje.textContent = mensajeNotif;
  let alerta = document.querySelector('.toast');
  let mensaje = new bootstrap.Toast(alerta);
  mensaje.show()
}
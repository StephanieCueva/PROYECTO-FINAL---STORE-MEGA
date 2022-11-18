function actualizarCantidad(){
    let carrito = JSON.parse(localStorage.getItem("productos")) || [];
    let productosCantidad = 0;
    carrito.forEach( e => {
        productosCantidad += e.cantidad;
    })
    valor_carrito.textContent = productosCantidad;
}

actualizarCantidad();

document.getElementById('contenedor').addEventListener('click',async (e) => {
    let carrito = JSON.parse(localStorage.getItem("productos")) ||  [];
    let id = contenedor.firstElementChild.id;
    const respuesta = await fetch("../data/db.json");
    const data = await respuesta.json();
    let total = data[id-1].stock;
    let valor = 0;
    let index = carrito.findIndex( e => { return e.id == id });
    if(e.target.id == 'buttonSum'){
        e.target.nextElementSibling.textContent++;
    }

    if(e.target.id == 'buttonRes'){
        valor = eval(e.target.previousElementSibling.textContent);
        if(valor > 1){
            e.target.previousElementSibling.textContent--;
        }
    }

    if(e.target.id == 'agregarCarro'){
        if(carrito.length  == 0 || index == -1){
            if(data[id-1].stock >=  parseInt(counting.textContent)){
                producto = {
                    "id" : data[id-1].id,
                    "nombre" : data[id-1].nombre,
                    "img" : data[id-1].img_principal,
                    "precio" : data[id-1].precio,
                    "cantidad" : parseInt(counting.textContent)
                }
                carrito.push(producto);
                mostraNotificacion('bi','bi-check-circle-fill','text-success','AGREGADO','EL PRODUCTO FUE AGREGADO DE MANERA EXITOSA AL CARRITO');
            } else {
                mostraNotificacion('bi','bi-exclamation-circle-fill','text-warning','STOCK','SE ALCANZO EL MAXIMO DE STOCK PERMITIDO PARA EL PRODUCTO');
            }
        } else if(index != -1) {
            if(data[id-1].stock >= (carrito[index].cantidad + parseInt(counting.textContent))){
                carrito[index].cantidad += parseInt(counting.textContent);
                mostraNotificacion('bi','bi-check-circle-fill','text-success','AGREGADO','EL PRODUCTO FUE AGREGADO DE MANERA EXITOSA AL CARRITO');
            } else {
                mostraNotificacion('bi','bi-exclamation-circle-fill','text-warning','STOCK','SE ALCANZO EL MAXIMO DE STOCK PERMITIDO PARA EL PRODUCTO');
            }
        } 
        localStorage.setItem("productos", JSON.stringify(carrito));
        actualizarCantidad();
    }
});

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
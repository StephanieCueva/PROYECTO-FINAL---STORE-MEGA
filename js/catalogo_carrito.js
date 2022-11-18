function actualizarCantidad(){
    let carrito = JSON.parse(localStorage.getItem("productos")) || [];
    let productosCantidad = 0;
    carrito.forEach( e => {
        productosCantidad += e.cantidad;
    })
    valor_carrito.textContent = productosCantidad;
}

actualizarCantidad();

contenedor.addEventListener('click',async(event) => {
    if(event.srcElement.nodeName == 'BUTTON'){
        const id = event.srcElement.parentNode.parentNode.parentNode.parentNode.id;
        let productosCantidad = 1;
        let carrito = JSON.parse(localStorage.getItem("productos")) || [];
        const respuesta = await fetch("../data/db.json");
        const data = await respuesta.json();
        let  index = -1 ;
        // let producto = {}
        let producto = {
            "id" : data[id-1].id,
            "nombre" : data[id-1].nombre,
            "img" : data[id-1].img_principal,
            "precio" : data[id-1].precio,
            "cantidad" : productosCantidad
        }
        
        if(carrito.length == 0){
            carrito.push(producto);
            mostraNotificacion('bi','bi-check-circle-fill','text-success','AGREGADO','EL PRODUCTO FUE AGREGADO DE MANERA EXITOSA AL CARRITO');
        } else {
            carrito.forEach( e => {
                productosCantidad += e.cantidad;
            })
            index = carrito.findIndex( e => { return e.id == id });
            if( index == -1 ){
                producto.cantidad = 1;
                carrito.push(producto);
                mostraNotificacion('bi','bi-check-circle-fill','text-success','AGREGADO','EL PRODUCTO FUE AGREGADO DE MANERA EXITOSA AL CARRITO');
            } else {
                if(data[id-1].stock > carrito[index].cantidad){
                    carrito[index].cantidad++;
                    mostraNotificacion('bi','bi-check-circle-fill','text-success','AGREGADO','EL PRODUCTO FUE AGREGADO DE MANERA EXITOSA AL CARRITO');
                } else if (data[id-1].stock == carrito[index].cantidad) {
                    productosCantidad = data[id-1].stock;
                    mostraNotificacion('bi','bi-exclamation-circle-fill','text-warning','STOCK','SE ALCANZO EL MAXIMO DE STOCK PERMITIDO PARA EL PRODUCTO');
                } 
            }
        }
        valor_carrito.textContent = productosCantidad;
        localStorage.setItem("productos", JSON.stringify(carrito));
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
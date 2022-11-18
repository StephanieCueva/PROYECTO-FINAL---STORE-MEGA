function actualizarCantidad(){
    let carrito = JSON.parse(localStorage.getItem("productos")) || [];
    let productosCantidad = 0;
    carrito.forEach( e => {
        productosCantidad += e.cantidad;
    })
    valor_carrito.textContent = productosCantidad;
}

actualizarCantidad();
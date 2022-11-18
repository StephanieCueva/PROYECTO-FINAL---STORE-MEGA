function cargarCarrito(){
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    let monto = productos.map(item => item.precio*item.cantidad).reduce((prev, curr) => prev + curr, 0);
    let html = '';
    productos.forEach( producto => {
        html += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$ ${producto.precio}</td>
                <td>$ ${producto.cantidad * producto.precio}</td>
            </tr>
        `
    })
    html += `
        <tr>
            <td></td>
            <td></td>
            <td class="text-end"><b>TOTAL</b></td>
            <td class="bg-warning">$ <b>${monto}</b></td>
        </tr>
    `
    contenedor.innerHTML = html;
}

cargarCarrito();
document.addEventListener('keyup',e => {
    if(e.target.matches('#buscador')){
        document.querySelectorAll('.articulos').forEach(producto => {
            producto.textContent.toLocaleLowerCase().includes(e.target.value)
            ? producto.classList.remove('filtro')
            : producto.classList.add('filtro');
        })
    }
})

let formulario = document.getElementById('form')

formulario.addEventListener('submit',(e) => {
    e.preventDefault();
});

import {
    pintarTarjetas,
    imprimirCarrito
} from '../module/funciones.js'

fetch('https://moviestack.onrender.com/api/petshop')
    .then(response => response.json())
    .then(datos => {

        const $jugetes = document.getElementById('juguetes')
        const $busqueda = document.getElementById('busquedaPorProducto')
        const $carrito = document.getElementById('mostrarCarrito')
        const $mostrarCarrito = document.getElementById('carrito')

        const articulosJuguetes = datos.filter(articulo => articulo.categoria == 'jugueteria')
        let carrito = JSON.parse(localStorage.getItem('carrito')) || []

        pintarTarjetas(articulosJuguetes, $jugetes, carrito)
        imprimirCarrito(carrito, $carrito)

        $busqueda.addEventListener('input', ()=> {
            const valorBusqueda = $busqueda.value
            const producto = articulosJuguetes.filter(articulo => articulo.producto.toLowerCase().includes(valorBusqueda.toLowerCase()))
            carrito = JSON.parse(localStorage.getItem('carrito'))
            pintarTarjetas(producto, $jugetes, carrito)
            producto.length == 0 ? $jugetes.innerHTML = '<p class= "text-xl fond-medium px-3">No se encontro el articulo </p>': ''
        })

        $carrito.addEventListener('click', (e) => {
            if (e.target.textContent == 'Eliminar') {
                const ubicacion = carrito.findIndex(articulo => articulo.id == e.target.dataset.id)
                carrito.splice(ubicacion, 1) 
                const $buttons = document.querySelectorAll('.button')
                $buttons.forEach(buton =>{
                    if (buton.dataset.id == e.target.dataset.id) {
                        buton.firstElementChild.classList.replace('bg-green-400', 'bg-slate-400')
                    }
                })
                localStorage.setItem('carrito', JSON.stringify(carrito))
                imprimirCarrito(carrito, $carrito)
            }
            if (e.target.textContent == 'Vaciar Carrito') {
                carrito = []
                localStorage.setItem('carrito', JSON.stringify(carrito))
                imprimirCarrito(carrito, $carrito)
                pintarTarjetas(articulosJuguetes, $jugetes, carrito)
            }
        })

        $mostrarCarrito.addEventListener('click',(e)=>{
            if (e.target.id == 'carrito') {
                $mostrarCarrito.firstElementChild.classList.toggle('hidden')
            }
        })

        $jugetes.addEventListener('click', (e) => {
            if (e.target.classList.contains('bg-slate-400')) {
                e.target.classList.replace('bg-slate-400', 'bg-green-400')
                const idCarrito = {
                    id: e.target.parentElement.dataset.id,
                    producto: e.target.parentElement.dataset.producto,
                    imagen: e.target.parentElement.dataset.imagen,
                    precio: e.target.parentElement.dataset.precio
                }
                carrito.push(idCarrito)
                imprimirCarrito(carrito, $carrito)
                localStorage.setItem('carrito', JSON.stringify(carrito))
            }
        }) 
    }).catch(err => console.log(err))
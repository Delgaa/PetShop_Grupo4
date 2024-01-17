
fetch('https://moviestack.onrender.com/api/petshop')
    .then(response => response.json())
    .then(datos => {

        const $farmacia = document.getElementById('farmacia')
        const $busqueda = document.getElementById('busquedaPorProducto')
        const articulos = datos
        const articulosFarmacia = articulos.filter(articulo => articulo.categoria == 'farmacia')
        let carrito = JSON.parse(localStorage.getItem('carrito')) || []

        pintarTarjetas(articulosFarmacia, $farmacia, carrito)

        $busqueda.addEventListener('input', ()=> {
            const valorBusqueda = $busqueda.value
            const producto = articulosFarmacia.filter(articulo => articulo.producto.toLowerCase().includes(valorBusqueda.toLowerCase()))
            pintarTarjetas(producto, $farmacia)
        })

        $farmacia.addEventListener('click', (e) => {
            if (e.target.classList.contains('bg-slate-400')) {
                e.target.classList.replace('bg-slate-400', 'bg-green-400')
                const idCarrito = {
                    id: e.target.parentElement.dataset.id
                }
                carrito.push(idCarrito)
                localStorage.setItem('carrito', JSON.stringify(carrito))
            }
        }) 

        function crearTarjeta(artFarmacia) {
            return `
            <article class = 'flex flex-col w-[300px] bg-white rounded-xl p-3 gap-2'>
                <img class = 'rounded-t-xl h-[200px] object-contain' src ='${artFarmacia.imagen}' alt = 'imagen de ${artFarmacia.producto}'>
                <h3 class ='text-lg font-bold'>${artFarmacia.producto}</h3>
                <div class ='flex justify-between'>
                    <p id = 'disponibles'>Disponibles: <snap class = " text-green-600">${artFarmacia.disponibles} </snap></p>
                    <p>${artFarmacia.precio.toLocaleString('es-AR',{style:'currency', currency:'ARS'})}</p>
                </div>
                <div class = 'flex justify-around pt-4'>
                    <a class ='p-1 bg-red-600 self-start rounded-lg ' href = '?id=${artFarmacia._id}'>Detalles</a>
                    <div>
                    <button data-id ='${artFarmacia._id}'>
                        <i class="p-2 bg-slate-400 rounded-lg fa-solid fa-cart-shopping"></i>
                    </button>
                    </div>
                </div>
            </article>`
        }

        function pintarTarjetas(arrArticulos, elemento, carrito_p) {
            let tarjetas = ""
            arrArticulos.forEach(articulo => {
                    tarjetas += crearTarjeta(articulo)

            });
            elemento.innerHTML = tarjetas

            const $buttons = document.querySelectorAll('button')
            $buttons.forEach(button => {
                for (const articulo of carrito_p) {
                    button.dataset.id == articulo.id ? button.firstElementChild.classList.replace('bg-slate-400', 'bg-green-400'): ''
                }
            }) 

            const $disponibilidad = document.querySelectorAll('#disponibles>snap')
            $disponibilidad.forEach( disponible => {
                if (disponible.textContent == 0) {
                    disponible.textContent = 'Sin Stock!'
                    disponible.classList.replace('text-green-600', 'text-red-600') 
                    disponible.parentElement.parentElement.nextElementSibling.lastElementChild.innerHTML = ''
                }

                if (disponible.textContent == 1) {
                    disponible.textContent += 'unidad!'
                    disponible.classList.replace('text-green-600', 'text-red-600')
                }

                if (disponible.textContent < 5) {
                    disponible.textContent += 'unidades!'
                    disponible.classList.replace('text-green-600', 'text-red-600')
                } 
                disponible.textContent >= 5? disponible.textContent += 'unidades!': ''
            })
        }
        

    }).catch(err => console.log(err))

fetch('https://moviestack.onrender.com/api/petshop')
    .then(response => response.json())
    .then(datos => {

        const $farmacia = document.getElementById('farmacia')
        const $busqueda = document.getElementById('busquedaPorProducto')
        const $carrito = document.getElementById('mostrarCarrito')
        const $mostrarCarrito = document.getElementById('carrito')
        const articulos = datos
        const articulosFarmacia = articulos.filter(articulo => articulo.categoria == 'farmacia')
        let carrito = JSON.parse(localStorage.getItem('carrito')) || []

        pintarTarjetas(articulosFarmacia, $farmacia, carrito)
        imprimirCarrito(carrito, $carrito)

        $busqueda.addEventListener('input', ()=> {
            const valorBusqueda = $busqueda.value
            const producto = articulosFarmacia.filter(articulo => articulo.producto.toLowerCase().includes(valorBusqueda.toLowerCase()))
            pintarTarjetas(producto, $farmacia)
        })
        $mostrarCarrito.addEventListener('click',()=>{
            $mostrarCarrito.firstElementChild.classList.toggle('hidden')
        })

        $farmacia.addEventListener('click', (e) => {
            if (e.target.classList.contains('bg-slate-400')) {
                console.log(e.target.parentElement);
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
        
        function crearTarjeta(artFarmacia) {
            return `
            <article data-disponibles='${artFarmacia.disponibles}' class = 'flex flex-col w-[300px] bg-white rounded-xl p-3 gap-2'>
                <span class='absolute bg-red-600 text-white px-1 rounded-lg'></span>
                <img class = 'rounded-t-xl h-[200px] object-contain' src ='${artFarmacia.imagen}' alt = 'imagen de ${artFarmacia.producto}'>
                <h3 class ='text-lg font-bold'>${artFarmacia.producto}</h3>
                <div class ='flex justify-between'>
                    <p id = 'disponibles'>Unidades disponibles: <snap class = " text-green-600">${artFarmacia.disponibles} </snap></p>
                    <p>$ ${artFarmacia.precio}</p>
                </div>
                <div class = 'flex justify-around pt-4'>
                    <a class ='p-1 bg-blue-500 self-start rounded-lg text-white' href = '?id=${artFarmacia._id}'>Mas detalles</a>
                    <div>
                    <button data-id ='${artFarmacia._id}' data-producto = '${artFarmacia.producto}' data-precio= '${artFarmacia.precio}' data-imagen = '${artFarmacia.imagen}'>
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

            const $articles =  document.querySelectorAll('article')
            console.log($articles[0].lastElementChild.previousElementSibling.firstElementChild.firstElementChild.classList);
            $articles.forEach(article => {
                if (article.dataset.disponibles == 0) {
                    article.firstElementChild.textContent = 'Sin Stock!'
                    article.lastElementChild.lastElementChild.innerHTML =''
                    article.lastElementChild.previousElementSibling.firstElementChild.firstElementChild.classList.replace('text-green-600', 'text-red-500')
                }else if (article.dataset.disponibles < 5) {
                    article.firstElementChild.textContent = 'Ultimas unidades!'
                }
            })

            const $buttons = document.querySelectorAll('button')
            $buttons.forEach(button => {
                for (const articulo of carrito_p) {
                    button.dataset.id == articulo.id ? button.firstElementChild.classList.replace('bg-slate-400', 'bg-green-400'): ''
                }
            }) 
        }
        
        

        function tarjetaCarrito(carrito_p) {
            return `
            <article class='flex items-center border  justify-between hover:bg-gray-200'>
            <img class = ' w-[50px] ' src ='${carrito_p.imagen}' alt = 'imagen de ${carrito_p.producto}'>
            <h3 class = 'w-[100px] text-xs font-thin'>${carrito_p.producto}</h3>
            <p class = 'text-xs font-thin'>$${carrito_p.precio}</p>
            <button class = 'text-blue-400 text-xs font-thin'>Eliminiar</button>
            </article>
            `
        }
        function imprimirCarrito(arrCarrito, elemento) {
            let tarjeta = ""
            arrCarrito.forEach(articulo =>
                tarjeta += tarjetaCarrito(articulo)
            )
            elemento.innerHTML = tarjeta
            elemento.innerHTML += '<button class="mt-auto text-blue-400 text-xs font-thin py-2 hover:bg-gray-200">Vaciar Carrito</button>'
        }
        

    }).catch(err => console.log(err))
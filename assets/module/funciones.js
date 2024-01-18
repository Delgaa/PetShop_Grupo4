export function pintarTarjetas(arrArticulos, elemento, carrito_p) {
    let tarjetas = ""
    arrArticulos.forEach(articulo => {
            tarjetas += crearTarjeta(articulo)

    });
    elemento.innerHTML = tarjetas

    const $articles =  document.querySelectorAll('article')
    $articles.forEach(article => {
        if (article.dataset.disponibles == 0) {
            article.firstElementChild.textContent = '¡Sin Stock!'
            article.lastElementChild.lastElementChild.innerHTML =''

            article.lastElementChild.previousElementSibling.firstElementChild.firstElementChild.classList.replace('text-green-300', 'text-white')

        }else if (article.dataset.disponibles < 5) {
            article.firstElementChild.textContent = '¡Ultimas unidades!'
        }
    })

    const $buttons = document.querySelectorAll('.button')
    $buttons.forEach(button => {
        for (const articulo of carrito_p) {
            button.dataset.id == articulo.id ? button.firstElementChild.classList.replace('bg-slate-400', 'bg-green-400'): ''
        }
    }) 
}



export function tarjetaCarrito(carrito_p) {
    return `
    <article class='flex items-center border  justify-between hover:bg-gray-200'>
        <img class = ' w-[50px] ' src ='${carrito_p.imagen}' alt = 'imagen de ${carrito_p.producto}'>
        <h3 class = 'w-[100px] text-xs font-thin'>${carrito_p.producto}</h3>
        <p class = 'text-xs font-thin'>$${carrito_p.precio}</p>
        <button data-id ='${carrito_p.id}' class = 'text-blue-600 text-xs font-thin hover:text-red-600'>Eliminar</button>
    </article>
    `
}
export function imprimirCarrito(arrCarrito, elemento) {
    let tarjeta = ""
    arrCarrito.forEach(articulo =>
        tarjeta += tarjetaCarrito(articulo)
    )
    elemento.innerHTML = tarjeta
    elemento.innerHTML += '<button class="mt-auto text-blue-600 text-xs font-thin py-2 hover:bg-gray-200">Vaciar Carrito</button>'
}

export function crearTarjeta(artJuguetes) {
    return `
    <article data-disponibles='${artJuguetes.disponibles}' class = ' bg-[#643392] shadow-2xl flex flex-col w-[300px] rounded-xl  gap-2'>
        <span class='absolute bg-red-600 text-white px-1 rounded-lg ml-3'></span>
        <div class='bg-white flex justify-center rounded-t-xl'>
        <img class = 'rounded-t-xl h-[200px] object-contain' src ='${artJuguetes.imagen}' alt = 'imagen de ${artJuguetes.producto}'>
        </div>
        <h3 class =' mx-auto text-lg text-white font-bold'>${artJuguetes.producto}</h3>
        <div class ='flex justify-around'>
            <p class= 'text-white' id = 'disponibles'>Unidades disponibles: <snap class = " text-green-300">${artJuguetes.disponibles} </snap></p>
            <p class= 'text-white'>$ ${artJuguetes.precio}</p>
        </div>
        <div class = 'flex justify-center gap-10 mx-auto pt-4 pb-4'>
            <a class ='p-1 bg-blue-500 self-start rounded-lg text-white' href = './detalles.html?id=${artJuguetes._id}'>Mas detalles</a>
            <div>
            <button class = 'button' data-id ='${artJuguetes._id}' data-producto = '${artJuguetes.producto}' data-precio= '${artJuguetes.precio}' data-imagen = '${artJuguetes.imagen}'>
                <i class="p-2 bg-slate-400 rounded-lg fa-solid fa-cart-shopping"></i>
            </button>
            </div>
        </div>
    </article>`
}
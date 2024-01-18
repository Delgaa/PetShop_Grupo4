fetch("https://moviestack.onrender.com/api/petshop")
  .then(response => response.json())
  .then(json => {
    const $contenedorDeLosProductos = document.getElementById("detallesDelProducto")
    const queryParams = new URLSearchParams(location.search);
    const idProd = queryParams.get("id") 
    const idProducto = json.find(producto => producto._id === idProd) 

    if (idProducto) {
        $contenedorDeLosProductos.innerHTML = `
        <div class="flex flex-wrap gap-20  ">
        <img class="w-1/3 rounded-lg border border-2 border-gray-800 object-cover" src="${idProducto.imagen}" alt="Imágenes de los productos">
    <div class="    ">
        <h3 class="font-bold text-4xl m-5  ">${idProducto.producto}</h3>
        <p class="inline-block m-5 text-2xl text-green-700 border-white border bg-white p-[5px] rounded-lg">PRECIO: ${idProducto.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
        <p class="m-5 text-xl ">Productos Disponibles: ${idProducto.disponibles}</p>
    </div>
     
    <p class="w-full self-center text-justify p-10 rounded-lg bg-white border border-2 border-gray-800">
        <span class="md:w-1/3 font-bold rounded-lg bg-white">DESCRIPCIÓN:</span> ${idProducto.descripcion}
    </p>
</div>
         `  
    } else {
      $contenedorDeLosProductos.innerHTML = '<p>Producto no encontrado</p>'
    }
  })
  .catch(err => console.log("Solicitud error", err))


 
 
 
 




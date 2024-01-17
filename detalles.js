fetch("https://moviestack.onrender.com/api/petshop")
  .then(response => response.json())
  .then(json => {
    const $contenedorDeLosProductos = document.getElementById("detallesDelProducto")
    const queryParams = new URLSearchParams(location.search);
    const idProd = queryParams.get("id") 
    const idProducto = json.find(producto => producto._id === idProd) 

    if (idProducto) {
        $contenedorDeLosProductos.innerHTML = `
      <div class="flex flex-wrap justify-around">
      <img class="w-1/3" src="${idProducto.imagen}" alt="">
      <p class="w-1/3  m-10  self-center text-justify"> <span class="font-bold "> DESCRIPCIÓN: </span>  ${idProducto.descripcion}</p>
      </div>
      <div class=" m-14">
      <h3 class="text-4xl my-5">${idProducto.producto}</h3>
      <p class=" text-2xl">Precio: ${idProducto.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
        <p>Productos Disponibles: ${idProducto.disponibles}</p>
        </div>
         `  
    } else {
      $contenedorDeLosProductos.innerHTML = '<p>Producto no encontrado</p>'
    }
  })
  .catch(err => console.log("Solicitud error", err))


 
 
 
 



